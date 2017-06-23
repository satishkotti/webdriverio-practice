var test = require('./../../../../common/functions/functions');
var redirectActions = require("./../../../../common/actions/redirecttool.actions")
randomstring = require('randomstring');

var invalidformatfile = "test\\pb2\\fe\\jira\\release29\\ppe-105234\\test.txt";
var invalidbulkfile = "test\\pb2\\fe\\jira\\release29\\ppe-105234\\"+ global.testEnv+"_bulkimport_invalid.xlsx";
var bulk300file = "test\\pb2\\fe\\jira\\release29\\ppe-105234\\"+global.testEnv+"_bulk_300.xls"
var bulkimportvalid = "test\\pb2\\fe\\jira\\release29\\ppe-105234\\"+global.testEnv+"_bulkimport.xlsx"


var numberOfRows = 0;
describe('PPE-105234: Verify Bulk Import functionality', function() {
    before(() => {
        //Launch App
        test.LaunchAppAndLogin();
    });

    it('Go to Redirect Tool Page', function() {
        redirectActions.GoToRedirectToolPage();
    }); 

    it("Verify the application accepts only xls and xlsx files", function() {
        redirectActions.BulkImport();
        redirectActions.UploadRedirects(invalidformatfile);
        expect(browser.element("//section/ul/li").isVisible()).to.be.false;
    });
        /**
         * This test covers the following tests.
         * Verify user is not able to create redirects with loop redirects
         * Verify user is not able to create redirects with multihop redirects
         * Verify user is not able to create redirects with wrongly formatted data
         * Verify user is able to edit the form accordingly
         * Verify user is able to delete a row from the form
         * Verify user is able to submit the form after deleting a row
         * Verify the form shows API errors(if any) apprpriately after the submission.
         * Verify user is able to bulk import from xlsx file
         */
    it("Verify import form validation", function() {
       redirectActions.UploadRedirects(invalidbulkfile);
       browser.pause(3000);
       expect(redirectActions.CheckCreateButtonEnabled()).to.be.false;
       expect(redirectActions.CheckImportError('multihop', 4)).to.be.true;
       expect(redirectActions.CheckImportError('multihop', 5)).to.be.true;
       expect(redirectActions.CheckImportError('unique', 7)).to.be.true;
       expect(redirectActions.CheckImportError('multihop', 8)).to.be.true;
       expect(redirectActions.CheckImportError('multihop', 9)).to.be.true;
       expect(redirectActions.CheckImportError('unique', 10)).to.be.true;
       expect(redirectActions.CheckImportError('invalid', 11)).to.be.true;
       expect(redirectActions.CheckImportError('invalid', 12)).to.be.true;
       var rstring = randomstring.generate(7);
       //Delete wrongly formatted data
       redirectActions.DeleteImportRow(11);
       redirectActions.DeleteImportRow(11);
       //Update the multihop url
       var fromUrl = redirectActions.GetImportRow(5).from;
       redirectActions.ModifyImportRow(5, {'from':fromUrl+"/"+rstring, 'to':null});
       expect(redirectActions.CheckImportError('multihop', 4)).to.be.false;
       expect(redirectActions.CheckImportError('multihop', 5)).to.be.false;
       //Update loop redirect
       fromUrl = redirectActions.GetImportRow(8).from;
       redirectActions.ModifyImportRow(8, {'from':fromUrl+"/"+rstring, 'to':null});
       fromUrl = redirectActions.GetImportRow(9).from;
       redirectActions.ModifyImportRow(9, {'from':fromUrl+"/"+rstring, 'to':null});
       expect(redirectActions.CheckImportError('multihop', 8)).to.be.false;
       expect(redirectActions.CheckImportError('multihop', 9)).to.be.false;
       //Delete duplicate row
       //fromUrl = redirectActions.GetImportRow(7).from; //to remove
       redirectActions.DeleteImportRow(7);
       expect(redirectActions.CheckImportError('unique', 9)).to.be.false;//to uncomment
       //redirectActions.ModifyImportRow(9, {'from':fromUrl, 'to':null});//to remove
       //Check that Create Redirects button is enabled once the form is Valid
       expect(redirectActions.CheckCreateButtonEnabled()).to.be.true;
       //Submit the form
       redirectActions.SubmitBulkRedirect();
       expect(redirectActions.CheckCreateButtonEnabled()).to.be.false;
       browser.waitForVisible("//div[@class='modal-content']/div[@class='pb-overlay-content ng-scope']", 50000);
       expect(browser.element("//div[@class='modal-content']/div[@class='pb-overlay-content ng-scope']/div").getText()).to.equal("Redirect Import Failure");
       browser.element("#modal-ok").click();
       browser.element("//section[@class='pb-module pb-module-bottom-pad ng-scope']/ul/li").waitForVisible();
    });
    
    it("Verify user is able to submit the form after resolving API errors", function() {
        var fromUrlList = [];
        var toUrlList=[];
        var le = browser.elements("//section/ul/li").value.length;
        for (i=1;i<=le;i++){
            var rstring = randomstring.generate(7);
            var fromUrl = redirectActions.GetImportRow(i).from + "/"+rstring;
            var toUrl = redirectActions.GetImportRow(i).to + "/"+rstring;
            fromUrlList.push(fromUrl);
            toUrlList.push(toUrl);
            redirectActions.ModifyImportRow(i, {'from':fromUrl, 'to': toUrl});
        }
        redirectActions.SubmitBulkRedirect();
        expect(redirectActions.CheckCreateButtonEnabled()).to.be.false;
        browser.waitForVisible("section.pb-notification-container.success");
        redirectActions.ShowCriteria();
        redirectActions.Search({'from':fromUrlList[0], 'to':null});
        browser.pause(3000);
        expect(redirectActions.GetRowFromResultGrid(1).fromUrl).to.equal(fromUrlList[0].toLowerCase());
        expect(redirectActions.GetRowFromResultGrid(1).toUrl).to.equal(toUrlList[0].toLowerCase());
    });

    it("Verify bulk upload for 300 redirects", function() {
        var fromUrlList = [];
        var toUrlList=[];
        redirectActions.GoToRedirectToolPage();
        redirectActions.BulkImport();
        redirectActions.UploadRedirects(bulk300file);
        browser.element("//section/ul/li").waitForVisible();
        fromUrlList.push(redirectActions.GetImportRow(1).from);
        toUrlList.push(redirectActions.GetImportRow(1).to);
        fromUrlList.push(redirectActions.GetImportRow(2).from);
        toUrlList.push(redirectActions.GetImportRow(2).from);
        redirectActions.SubmitBulkRedirect();
        browser.waitForVisible("section.pb-notification-container.success", 1000000);
        for(i=0; i<2; i++){
            redirectActions.ShowCriteria();
            redirectActions.Search({'from':fromUrlList[i], 'to':null});
            expect(redirectActions.GetRowFromResultGrid(1).fromUrl).to.equal(fromUrlList[i].toLowerCase());
            expect(redirectActions.GetRowFromResultGrid(1).toUrl).to.equal(toUrlList[i].toLowerCase());
        }
    });

    it.only("Verify redirect form updates automatically if few redirects are submitted succesfully and few have errors ", function() {
        redirectActions.GoToRedirectToolPage();
        redirectActions.BulkImport();
        redirectActions.UploadRedirects(bulkimportvalid);
        browser.pause(3000);
        var fromUrl = redirectActions.GetImportRow(1).from;
        redirectActions.GoToRedirectToolPage();
        //browser.refresh();
        //browser.pause()
        redirectActions.Search({'from':fromUrl, 'to':null});
        var rstring = randomstring.generate(7);
        browser.pause(3000);
        if(!(browser.element("//tbody[@role='rowgroup']//td[3]/a").isVisible())){
            redirectActions.CreateRedirects();
            browser.element("//form[@name= 'redirectForm']/div/div[1]/label/input").setValue(fromUrl);
            browser.element("//form[@name= 'redirectForm']/div/div[2]/label/input").setValue(fromUrl+"/"+rstring);
            browser.element("//form[@name= 'redirectForm']//button").click();
            browser.waitForVisible("section.pb-notification-container.success", 40000);
        }
            redirectActions.BulkImport();
            redirectActions.UploadRedirects(bulkimportvalid);
            browser.element("//section/ul/li").waitForVisible();
            redirectActions.SubmitBulkRedirect();
            browser.element("//div[@class='modal-content']/div[@class='pb-overlay-content ng-scope']").waitForVisible();
            expect(browser.element("//div[@class='modal-content']/div[@class='pb-overlay-content ng-scope']/div").getText()).to.equal("Redirect Import Failure");
            browser.element("#modal-ok").click();
            expect(redirectActions.GetImportRow(2)).to.be.false;
            expect(redirectActions.GetImportRow(1).from).to.equal(fromUrl);
        });
});
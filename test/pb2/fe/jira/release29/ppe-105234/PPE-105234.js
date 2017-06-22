var assert = require('assert');
//const Promise = require('bluebird');
var test = require('./../../../../common/functions/functions');
var redirectActions = require("./../../../../common/actions/redirecttool.actions")
var testEnv = global.testEnv;
var correctEnvUrl = "http://www." + testEnv + ".webmd.com/food-recipes/*";

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
        redirectActions.UploadRedirects("test\\pb2\\fe\\jira\\release29\\ppe-105234\\test.txt");
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
         */

    it("Verify import form validation", function() {
       redirectActions.UploadRedirects("test\\pb2\\fe\\jira\\release29\\ppe-105234\\dev03_bulkimport_invalid.xlsx");
       browser.pause(3000);
       expect(browser.element("//button[contains(text(),'Create')]").isEnabled()).to.be.false;
       expect(browser.element("//section/ul/li[4]/div/div[3]/span/span[contains(text(),'Multi-hop redirects are not allowed')]").isVisible()).to.be.true;
       expect(browser.element("//section/ul/li[5]/div/div[3]/span/span[contains(text(),'Multi-hop redirects are not allowed')]").isVisible()).to.be.true;
       expect(browser.element("//section/ul/li[7]/div/div[3]/span/span").isVisible()).to.be.true;
       expect(browser.element("//section/ul/li[7]/div/div[3]/span/span").getText()).to.equal('All from values must be unique');
       expect(browser.element("//section/ul/li[9]/div/div[3]/span/span[contains(text(),'Multi-hop redirects are not allowed')]").isVisible()).to.be.true;
       expect(browser.element("//section/ul/li[9]/div/div[3]/span/span[contains(text(),'Multi-hop redirects are not allowed')]").isVisible()).to.be.true;
       expect(browser.element("//section/ul/li[10]/div/div[3]/span/span").isVisible()).to.be.true;
       expect(browser.element("//section/ul/li[10]/div/div[3]/span/span").getText()).to.equal('All from values must be unique');

       //Delete wrongly formatted data
       let location = browser.element("//section/ul/li[12]/button").getLocation('y');
       browser.element("//section/ul/li[12]/button").scroll(0, parseInt(location) - 200);
       browser.element("//section/ul/li[11]/button").click();
       browser.element("//section/ul/li[11]/button").click();
       //Update the multihop url
       var toUrl = browser.element("//section/ul/li[5]/div/div/label/input").getValue();
       browser.element("//section/ul/li[5]/div/div/label/input").setValue(toUrl+"/test");
       //Update loop redirect
       toUrl = browser.element("//section/ul/li[8]/div/div/label/input").getValue();
       browser.element("//section/ul/li[8]/div/div/label/input").setValue(toUrl+"/test");
       toUrl = browser.element("//section/ul/li[9]/div/div/label/input").getValue();
       browser.element("//section/ul/li[9]/div/div/label/input").setValue(toUrl+"/test");
       //Delete duplicate row
       toUrl = browser.element("//section/ul/li[7]/div/div/label/input").getValue();
       browser.element("//section/ul/li[7]/button").click();
       //expect(browser.element("//section/ul/li[10]/div/div[3]/span/span").isVisible()).to.be.false;
       browser.element("//section/ul/li[9]/div/div/label/input").setValue(toUrl);
       //Check that Create Redirects button is enabled once the form is Valid
       expect(browser.element("//button[contains(text(),'Create')]").isEnabled()).to.be.true;
       //Submit the form
       browser.element("//button[contains(text(),'Create')]").click();
       expect(browser.element("//button[contains(text(),'Create')]").isEnabled()).to.be.false;
       browser.pause(50000);
       browser.element("//div[@class='modal-content']/div[@class='pb-overlay-content ng-scope']").waitForVisible();
       expect(browser.element("//div[@class='modal-content']/div[@class='pb-overlay-content ng-scope']/div").getText()).to.equal("Redirect Import Failure");
       browser.element("#modal-ok").click();
       browser.element("//section[@class='pb-module pb-module-bottom-pad ng-scope']/ul/li").waitForVisible();
    });
    
    it("Verify user is able to submit the form after resolving API errors", function() {
        var fromUrlList = [];
        var toUrlList=[];
        for (i=1;i<10;i++){
            var fromUrl = browser.element("//section/ul/li[" + i + "]/div/div[1]/label/input").getValue() + "/qaactivity031823062017";
            fromUrlList.push(fromUrl);
            browser.element("//section/ul/li[" + i +"]/div/div[1]/label/input").setValue(fromUrl);

            var toUrl = browser.element("//section/ul/li[" + i + "]/div/div[2]/label/input").getValue() + "/qaactivity031823062017";
            toUrlList.push(toUrl);
            browser.element("//section/ul/li[" + i +"]/div/div[2]/label/input").setValue(toUrl);
        }
        browser.element("//button[contains(text(),'Create')]").click();
        expect(browser.element("//button[contains(text(),'Create')]").isEnabled()).to.be.false;
        browser.waitForVisible("section.pb-notification-container.success");  
        if(browser.element("=Search Criteria").isVisible())
            browser.element("=Search Criteria").click();
        redirectActions.Search({'from':fromUrlList[0], 'to':null});
        browser.pause(3000);
        expect(browser.getText("//tbody[@role='rowgroup']//td[3]/a")).to.equal(fromUrlList[0]);
        expect(browser.getText("//tbody[@role='rowgroup']//td[6]/a")).to.equal(toUrlList[0]);
    });
});
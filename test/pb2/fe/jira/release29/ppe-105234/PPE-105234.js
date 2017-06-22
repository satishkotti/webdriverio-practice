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
       test.ImportRedirects("test\\pb2\\fe\\jira\\release29\\ppe-105234\\dev03_bulkimport_invalid.xlsx");
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
       browser.pause(120000);
       browser.element("//div[@class='modal-content']/div[@class='pb-overlay-content ng-scope']").waitForVisible();
       expect(browser.element("//div[@class='modal-content']/div[@class='pb-overlay-content ng-scope']/div").getText()).to.equal("Redirect Import Failure");
       browser.element("#modal-ok").click();
       browser.element("//section[@class='pb-module pb-module-bottom-pad ng-scope']/ul/li").waitForVisible();
    });
    
    it("Verify user is able to submit the form after resolving API errors", function() {
       //section/ul/li[8]/div/div[1]/label/input"
       //section/ul/li[8]/div/div[2]/label/input"
        for (i=1;i<10;i++){
            console.log(i);
            var fromUrl = browser.element("//section/ul/li[" + i + "]/div/div[1]/label/input").getValue();
            console.log(fromUrl);
            browser.element("//section/ul/li[" + i +"]/div/div/label/input").setValue(fromUrl+"/testing_purpose");
            var toUrl = browser.element("//section/ul/li[" + i + "]/div/div[2]/label/input").getValue();
            console.log(toUrl);
            browser.element("//section/ul/li[" + i +"]/div/div/label/input").setValue(toUrl+"/test_purpose");
        }
        browser.element("//button[contains(text(),'Create')]").click();
        expect(browser.element("//button[contains(text(),'Create')]").isEnabled()).to.be.false;
        browser.element("//div[@class='modal-content']/div[@class='pb-overlay-content ng-scope']").waitForVisible();
    });


    /*
    it("Verify user is not able to create redirects with bulk import", function() {
       test.ImportRedirects("test\\pb2\\fe\\jira\\release29\\ppe-105234\\dev03_bulkimport_valid.xlsx");
    });

    it("User should be able to delete single record from the result", function() {
         browser.refresh();
        //from
        redirectActions.SearchFromUrl(correctEnvUrl);
        browser.pause(5000);
        //Check first chechbox if available
        if(browser.isVisible('//*[@id="redirectListGrid"]/div[3]/table/tbody/tr[1]/td[4]')){
            var chronID=browser.getText('//*[@id="redirectListGrid"]/div[3]/table/tbody/tr[1]/td[4]'); 
            //checkbox.checked=true
            browser.element('//*[@id="redirectListGrid"]/div[3]/table/tbody/tr[1]/td[1]/input').click();        
            if(browser.isVisible("/html/body/main/section[1]/button")){
                // click delete button
                browser.element("/html/body/main/section[1]/button").leftClick();
                //confirm delete
                browser.element('//*[@id="modal-ok"]').leftClick(); 
                browser.waitForVisible("section.pb-notification-container.success");  

                browser.refresh();
                 redirectActions.SearchFromUrl(chronID);
                 browser.pause(5000);
                 //verify deletion completed   
                 browser.waitForVisible('//*[@id="redirectListGrid"]/div[4]/span');    
                 var result = (browser.isVisible('tbody > tr:first-child > td:first-child > input.pb-checkbox'));
                 assert.equal(result, false); 

            }
        }        
       
        
    });

    it("User should be able to delete multiple records from the result", function() {
         browser.refresh();
        //from
        redirectActions.SearchFromUrl(correctEnvUrl);
        browser.pause(5000);
        //Check first chechbox if available
        if(browser.isVisible('//*[@id="redirectListGrid"]/div[3]/table/tbody/tr[2]/td[4]')){
            var chronID1=browser.getText('//*[@id="redirectListGrid"]/div[3]/table/tbody/tr[1]/td[4]'); 
            var chronID2=browser.getText('//*[@id="redirectListGrid"]/div[3]/table/tbody/tr[2]/td[4]'); 
            //checkbox.checked=true
            browser.element('//*[@id="redirectListGrid"]/div[3]/table/tbody/tr[1]/td[1]/input').click();  
            browser.element('//*[@id="redirectListGrid"]/div[3]/table/tbody/tr[2]/td[1]/input').click();       
            if(browser.isVisible("/html/body/main/section[1]/button")){
                // click delete button
                browser.element("/html/body/main/section[1]/button").leftClick();
                //confirm delete
                browser.element('//*[@id="modal-ok"]').leftClick();      
                 browser.waitForVisible("section.pb-notification-container.success");  

                 browser.refresh();
                 redirectActions.SearchFromUrl(chronID1);
                 browser.pause(5000);
                 //verify deletion completed   
                 browser.waitForVisible('//*[@id="redirectListGrid"]/div[4]/span');    
                 var result1 = (browser.isVisible('tbody > tr:first-child > td:first-child > input.pb-checkbox'));
                 assert.equal(result1, false); 

                 browser.refresh();
                 redirectActions.SearchFromUrl(chronID2);
                 browser.pause(5000);
                 //verify deletion completed   
                 browser.waitForVisible('//*[@id="redirectListGrid"]/div[4]/span');    
                 var result2 = (browser.isVisible('tbody > tr:first-child > td:first-child > input.pb-checkbox'));
                 assert.equal(result2, false);  

            }
        }        
        
    });

      it("User should be able to select and delete all data available in page", function() {
        browser.refresh();
        //from
        redirectActions.SearchFromUrl(correctEnvUrl);
        browser.pause(5000);
        //Check first chechbox if available
        if(browser.isVisible('//*[@id="redirectListGrid"]/div[3]/table/tbody/tr[1]/td[4]')){
             var chronID=browser.getText('//*[@id="redirectListGrid"]/div[3]/table/tbody/tr[1]/td[4]');  
            //checkbox.checked=true
            browser.element('//input[@class="pb-redirect-check-all"]').click();
            browser.waitForVisible('//*[@id="redirectListGrid"]/div[4]/span');
            var totalRecords = browser.elements("input:checked[type='checkbox']").value.length-1;
            //get Total record  
            var paggingTextBefore=browser.getText('//*[@id="redirectListGrid"]/div[4]/span'); 
            var countBefore=paggingTextBefore.substring(paggingTextBefore.indexOf("of")+3,paggingTextBefore.indexOf("redirects")-1);
            // click delete button
            browser.element("/html/body/main/section[1]/button").leftClick();
            //confirm delete
            browser.element('//*[@id="modal-ok"]').leftClick();       
            var result = (browser.isVisible('/html/body/div[5]'));
            var countAfter=0;
            if(result){
                browser.refresh();
                redirectActions.SearchFromUrl(correctEnvUrl);                 
                browser.waitForVisible('//*[@id="redirectListGrid"]/div[4]/span');
                var paggingTextAfter=browser.getText('//*[@id="redirectListGrid"]/div[4]/span'); 
                countAfter=paggingTextAfter.substring(paggingTextAfter.indexOf("of")+3,paggingTextAfter.indexOf("redirects")-1);
                assert.equal((countAfter=countBefore-totalRecords), true);

                browser.refresh();
                 redirectActions.SearchFromUrl(chronID);
                 browser.pause(5000);
                 //verify deletion completed  
                 browser.waitForVisible('//*[@id="redirectListGrid"]/div[4]/span');     
                 var result = (browser.isVisible('tbody > tr:first-child > td:first-child > input.pb-checkbox'));
                 assert.equal(result, false);
            }
        }        
        
    });
    */
});
var assert = require('assert');
//const Promise = require('bluebird');
var test = require('./../../../common/functions/functions');
var redirectActions = require("./../../../common/actions/redirecttool.actions")
var testEnv = global.testEnv;
if (testEnv === 'qa02')
    testEnv = 'perf';
var correctEnvUrl = "http://www." + testEnv + ".webmd.com/food-recipes/*";

var numberOfRows = 0;
describe('PPE-101694: Redirect Search Results', function() {
    before(() => {
        //Launch App
        test.LaunchAppAndLogin();
    });

    it('Go to Redirect Tool Page', function() {
        test.NavigateToRedirectToolPage();
    }); 

    it("User should not be able to delete from the result if not confirmed", function() {
        //from
        redirectActions.Search({'from':correctEnvUrl, 'to':null});
        browser.pause(5000);

        //Check first chechbox if available
        if(browser.isVisible('//*[@id="redirectListGrid"]/div[3]/table/tbody/tr[1]/td[4]')){
            //get Chronicle ID  
            var chronID=browser.getText('//*[@id="redirectListGrid"]/div[3]/table/tbody/tr[1]/td[4]');
            //checkbox.checked=true
            browser.element('//*[@id="redirectListGrid"]/div[3]/table/tbody/tr[1]/td[1]/input').click();
            if(browser.isVisible("/html/body/main/section[1]/button")){
                // click delete button
                browser.element("/html/body/main/section[1]/button").leftClick();
                //confirm delete
                browser.element('//*[@id="modal-cancel"]').leftClick();
                var result = (browser.isVisible('/html/body/div[5]'));
                expect(result).to.be.false

                 browser.refresh();
                 redirectActions.Search({'from':chronID, 'to': null});
                 browser.pause(5000);
                 //verify deletion completed  
                 browser.waitForVisible('//*[@id="redirectListGrid"]/div[4]/span');     
                 var result = (browser.isVisible('tbody > tr:first-child > td:first-child > input.pb-checkbox'));
                 assert.equal(result, true);
            }
        }
    });

    it("User should be able to delete single record from the result", function() {
         browser.refresh();
        //from
        test.NavigateToRedirectToolPage();
        redirectActions.Search({'from':correctEnvUrl, 'to':''});
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
                redirectActions.Search({'from':chronID, 'to':''});
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
         test.NavigateToRedirectToolPage();
        //from
        redirectActions.Search({'from':correctEnvUrl, 'to':''});
        browser.pause(5000);
        //Check first chechbox if available
        if(browser.isVisible('//*[@id="redirectListGrid"]/div[3]/table/tbody/tr[2]/td[4]')){
            var chronID1=browser.getText('//*[@id="redirectListGrid"]/div[3]/table/tbody/tr[1]/td[3]');
            var chronID2=browser.getText('//*[@id="redirectListGrid"]/div[3]/table/tbody/tr[2]/td[3]');
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
                redirectActions.Search({'from':chronID1, 'to':''});
                browser.pause(5000);
                //verify deletion completed   
                browser.waitForVisible('//*[@id="redirectListGrid"]/div[4]/span');
                var result1 = (browser.isVisible('tbody > tr:first-child > td:first-child > input.pb-checkbox'));
                assert.equal(result1, false); 

                browser.refresh();
                redirectActions.Search({'from':chronID2, 'to':''});
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
        redirectActions.Search({'from':correctEnvUrl, 'to':''});
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
                redirectActions.Search({'from':correctEnvUrl,'to':''});
                browser.waitForVisible('//*[@id="redirectListGrid"]/div[4]/span');
                var paggingTextAfter=browser.getText('//*[@id="redirectListGrid"]/div[4]/span'); 
                countAfter=paggingTextAfter.substring(paggingTextAfter.indexOf("of")+3,paggingTextAfter.indexOf("redirects")-1);
                assert.equal((countAfter=countBefore-totalRecords), true);

                browser.refresh();
                redirectActions.Search({'from':chronID,'to':''});
                browser.pause(5000);
                //verify deletion completed  
                browser.waitForVisible('//*[@id="redirectListGrid"]/div[4]/span');     
                var result = (browser.isVisible('tbody > tr:first-child > td:first-child > input.pb-checkbox'));
                assert.equal(result, false);
            }
        }
    });
});
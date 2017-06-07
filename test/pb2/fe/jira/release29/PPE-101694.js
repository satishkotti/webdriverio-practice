var assert = require('assert');
//const Promise = require('bluebird');
var test = require('./../../../common/functions/functions');
var redirectActions = require("./../../../common/actions/redirecttool.actions")
var testEnv = global.testEnv;
var correctEnvUrl = "http://www." + testEnv + ".webmd.com/food-recipes/*";

var numberOfRows = 0;
describe('PPE-101694: Redirect Search Results', function() {
    before(() => {
        //Launch App
        test.LaunchAppAndLogin();
    });

    it('Go to Redirect Tool Page', function() {
        redirectActions.GoToRedirectToolPage();
    });

    it("User should not be able to delete from the result if not confirmed", function() {
        //from
        redirectActions.SearchFromUrl(correctEnvUrl);
        browser.pause(5000);      
        var chronID='';
        //Check first chechbox if available
        if(browser.isVisible('//*[@id="redirectListGrid"]/div[3]/table/tbody/tr[1]/td[4]')){
            //get Chronical ID  
            chronID=browser.getText('//*[@id="redirectListGrid"]/div[3]/table/tbody/tr[1]/td[4]');            
            //checkbox.checked=true
            browser.element('//*[@id="redirectListGrid"]/div[3]/table/tbody/tr[1]/td[1]/input').click();        
            if(browser.isVisible("/html/body/main/section[1]/button")){
                // click delete button
                browser.element("/html/body/main/section[1]/button").leftClick();
                //confirm delete
                browser.element('//*[@id="modal-cancel"]').leftClick();       
                var result = (browser.isVisible('/html/body/div[5]'));
                expect(result).to.be.false
            }
        }        
        
    });

    it("User should be able to delete from the result", function() {
         browser.refresh();
        //from
        redirectActions.SearchFromUrl(correctEnvUrl);
        browser.pause(5000);      
        var chronID='';
        //Check first chechbox if available
        if(browser.isVisible('//*[@id="redirectListGrid"]/div[3]/table/tbody/tr[1]/td[4]')){
            //get Chronical ID  
            chronID=browser.getText('//*[@id="redirectListGrid"]/div[3]/table/tbody/tr[1]/td[4]');            
            //checkbox.checked=true
            browser.element('//*[@id="redirectListGrid"]/div[3]/table/tbody/tr[1]/td[1]/input').click();        
            if(browser.isVisible("/html/body/main/section[1]/button")){
                // click delete button
                browser.element("/html/body/main/section[1]/button").leftClick();
                //confirm delete
                browser.element('//*[@id="modal-ok"]').leftClick(); 
                browser.waitForVisible("section.pb-notification-container.success");  
                    

            }
        }        
       
        
    });

    it("User should be able to delete multiple records from the result", function() {
         browser.refresh();
        //from
        redirectActions.SearchFromUrl(correctEnvUrl);
        browser.pause(5000);      
        var chronID1='';
        var chronID2='';
        //Check first chechbox if available
        if(browser.isVisible('//*[@id="redirectListGrid"]/div[3]/table/tbody/tr[2]/td[4]')){
            //get Chronical ID  
            chronID1=browser.getText('//*[@id="redirectListGrid"]/div[3]/table/tbody/tr[1]/td[4]');
            chronID2=browser.getText('//*[@id="redirectListGrid"]/div[3]/table/tbody/tr[2]/td[4]');            
            //checkbox.checked=true
            browser.element('//*[@id="redirectListGrid"]/div[3]/table/tbody/tr[1]/td[1]/input').click();  
            browser.element('//*[@id="redirectListGrid"]/div[3]/table/tbody/tr[2]/td[1]/input').click();       
            if(browser.isVisible("/html/body/main/section[1]/button")){
                // click delete button
                browser.element("/html/body/main/section[1]/button").leftClick();
                //confirm delete
                browser.element('//*[@id="modal-ok"]').leftClick();      
                 browser.waitForVisible("section.pb-notification-container.success");   

            }
        }        
        
    });
});
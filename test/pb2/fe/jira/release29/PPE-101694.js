var assert = require('assert');
const Promise = require('bluebird');
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

    
    it("User should delete from the result", function() {
        //from
        redirectActions.SearchFromUrl(correctEnvUrl);
        browser.pause(5000);      
        var chronID='';
        //Check first chechbox if available
        if(browser.isVisible('//*[@id="redirectListGrid"]/div[3]/table/tbody/tr[1]')){
            //get Chronical ID  
            chronID=browser.getText('//*[@id="redirectListGrid"]/div[3]/table/tbody/tr[1]/td[4]');            
            //checkbox.checked=true
            browser.element('//*[@id="redirectListGrid"]/div[3]/table/tbody/tr[1]/td[1]/input').click();        
            if(browser.isVisible("/html/body/main/section[1]/button")){
                // click delete button
                browser.element("/html/body/main/section[1]/button").leftClick();
                //confirm delete
                browser.element('//*[@id="modal-ok"]').leftClick();       

            }
        }        
        browser.refresh();
        redirectActions.SearchFromUrl(chronID);
        browser.pause(5000);
        //verify deletion completed       
        var result = (browser.isVisible('tbody > tr:first-child > td:first-child > input.pb-checkbox'));
        assert.equal(result, true);
    });
});
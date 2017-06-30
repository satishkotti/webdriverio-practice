var assert = require('assert');
const Promise = require('bluebird');
var test = require('./../../../../common/functions/functions');
var redirectActions = require("./../../../../common/actions/redirecttool.actions")
var testEnv = global.testEnv;
if(testEnv === 'qa02')
    testEnv = 'perf';
var correctEnvUrl = "http://www." + testEnv + ".webmd.com/food-recipes/guide/health-cooking*";
var correctEnvUrl2 = "http://www." + testEnv + ".webmd.com/food*";
var invalidEnvUrlProd = "http://www.webmd.com/food-recipes/guide/health-cooking*";
var invalidEnvUrlProdPreview = "http://www.preview." + testEnv + ".webmd.com/food-recipes/guide/health-cooking*";
var invalidEnvUrlProdStaging = "http://www.staging." + testEnv + ".webmd.com/food-recipes/guide/health-cooking*";
var numberOfRows = 0;
describe('PPE-101678: Redirect Search Results', function() {
    before(() => {
        //Launch App
        test.LaunchAppAndLogin();
    });

    it('Go to Redirect Tool Page', function() {
        test.NavigateToRedirectToolPage();
    });

    it("User should not get a result if they put in URLs that don't match current environment", function() {
        //from search
        //this url is pointing to prod                
        redirectActions.Search({'from':invalidEnvUrlProd, 'to': ''});
        browser.pause(4000);
        var result = (browser.isVisible('div.k-grid-norecords-template'));
        assert.equal(result, true);
        browser.refresh();
        //to        
        redirectActions.Search({'from':'', 'to':invalidEnvUrlProd});
        browser.pause(4000);
        var result = (browser.isVisible('div.k-grid-norecords-template'));
        assert.equal(result, true);
    });

    it("User should not get a result if they put in URLs that have .preview. or .staging. in them", function() {
        //from url search
        //this url has preview        
        redirectActions.Search({'from':invalidEnvUrlProdPreview, 'to':''});
        browser.pause(4000);
        var result = (browser.isVisible('div.k-grid-norecords-template'));
        assert.equal(result, true);
        browser.refresh();
        //this url has staging        
        redirectActions.Search({'from':invalidEnvUrlProdStaging, 'to':''});
        browser.pause(4000);
        var result = (browser.isVisible('div.k-grid-norecords-template'));
        assert.equal(result, true);

        //To url search
        //this url is pointing to prod
        //this url has preview
        browser.refresh();
        redirectActions.Search({'from':'', 'to':invalidEnvUrlProdPreview});
        browser.pause(4000);
        var result = (browser.isVisible('div.k-grid-norecords-template'));
        assert.equal(result, true);
        browser.refresh();
        //this url has staging                
        redirectActions.Search({'from':'', 'to':invalidEnvUrlProdStaging});
        browser.pause(4000);
        var result = (browser.isVisible('div.k-grid-norecords-template'));
        assert.equal(result, true);
    });

    it("User should get results if the search criteria (including wildcards) match anything in the redirect database on any site", function() {
        //from
        redirectActions.Search({'from':correctEnvUrl, 'to':''});
        browser.pause(5000);
        var result = (browser.isVisible('tbody > tr:first-child > td:first-child > input.pb-checkbox'));
        assert.equal(result, true);
        browser.refresh();
        //to
        redirectActions.Search({'from':'', 'to':"http://www." + testEnv + ".webmd.com/food-r*"});
        browser.pause(5000);
        var result = (browser.isVisible('tbody > tr:first-child > td:first-child > input.pb-checkbox'));
        assert.equal(result, true);
    });

    it('All matching redirects should be listed in the UI with columns for "From URL," "From ID," "Status" "To URL," "To ID" and "Status"', function() {
        browser.refresh();
        redirectActions.Search({'from':correctEnvUrl, 'to':''});
        browser.pause(5000);
        var result = (browser.isVisible('tbody > tr:first-child > td:first-child > input.pb-checkbox'));
        assert.equal(result, true);
        //from verfiy
        assert.equal(browser.getText("thead > tr:first-child > th:nth-of-type(3)"), "From Link");
        assert.equal(browser.getText("th.k-header.k-with-icon.k-filterable.k-first > a.k-link"), "URL");
        assert.equal(browser.getText("thead > tr:nth-of-type(2) > th:nth-of-type(2) > a.k-link"), "Chron ID");
        assert.equal(browser.getText("thead > tr:nth-of-type(2) > th:nth-of-type(3) > a.k-link"), "Status");
        //to
        assert.equal(browser.getText("thead > tr:first-child > th:nth-of-type(4)"), "To Link");
        assert.equal(browser.getText("thead > tr:nth-of-type(2) > th:nth-of-type(4) > a.k-link"), "URL");
        assert.equal(browser.getText("thead > tr:nth-of-type(2) > th:nth-of-type(5) > a.k-link"), "Chron ID");
        assert.equal(browser.getText("thead > tr:nth-of-type(2) > th:nth-of-type(6) > a.k-link"), "Status");

        browser.refresh();
        //to
        redirectActions.Search({'from':'', 'to':"http://www." + testEnv + ".webmd.com/food-r*"});
        browser.pause(5000);
        var result = (browser.isVisible('tbody > tr:first-child > td:first-child > input.pb-checkbox'));
        assert.equal(result, true);

        //from verfiy
        assert.equal(browser.getText("thead > tr:first-child > th:nth-of-type(3)"), "From Link");
        assert.equal(browser.getText("th.k-header.k-with-icon.k-filterable.k-first > a.k-link"), "URL");
        assert.equal(browser.getText("thead > tr:nth-of-type(2) > th:nth-of-type(2) > a.k-link"), "Chron ID");
        assert.equal(browser.getText("thead > tr:nth-of-type(2) > th:nth-of-type(3) > a.k-link"), "Status");
        //to
        assert.equal(browser.getText("thead > tr:first-child > th:nth-of-type(4)"), "To Link");
        assert.equal(browser.getText("thead > tr:nth-of-type(2) > th:nth-of-type(4) > a.k-link"), "URL");
        assert.equal(browser.getText("thead > tr:nth-of-type(2) > th:nth-of-type(5) > a.k-link"), "Chron ID");
        assert.equal(browser.getText("thead > tr:nth-of-type(2) > th:nth-of-type(6) > a.k-link"), "Status");
    });

    it('Each result should include a status for the to URL/ID combination and from URL/ID combination "', function() {
        //(Active/Expired) - this is so users can re-associate expired IDs if needed
        browser.refresh();
        redirectActions.Search({'from':correctEnvUrl, 'to':''});
        browser.pause(5000);
        var fromStatus = browser.getText("//tr[@role='row'][1]/td[@role='gridcell'][5]");
        var toStatus = browser.getText("//tr[@role='row'][1]/td[@role='gridcell'][8]");

        result = (fromStatus == "Active" || fromStatus == "Deleted" || fromStatus == "None");
        assert.equal(result, true);
        result = (toStatus == "Active" || toStatus == "Deleted" || toStatus == "None");
        assert.equal(result, true);
    });

    it("Results should be paginated after 100 results '", function() {
        browser.refresh();
        redirectActions.Search({'from':'', 'to':correctEnvUrl2});
        browser.pause(5000);
        var elements = browser.getElementSize('//input[@type="checkbox"]')
        console.log(elements.length - 1);
        assert.equal(elements.length - 1, 100);
        var pages = browser.getElementSize('//ul[@class="k-pager-numbers k-reset"]//li');
        console.log(pages.length - 1);
        assert.equal((pages.length > 2), true);
    });
});
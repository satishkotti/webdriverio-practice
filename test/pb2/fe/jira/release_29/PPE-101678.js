var assert = require('assert');
const Promise = require('bluebird');
var test = require('./../../../common/functions/functions');
var redirectActions = require("./../../../common/actions/redirecttool.actions")
var testEnv = global.testEnv;

describe('PPE-101678: Redirect Search Results', function() {
    before(() => {
        //Launch App
        test.LaunchAppAndLogin();
    });

    it('Go to Redirect Tool Page', function() {
        redirectActions.GoToRedirectToolPage();
    });

    it("User should not get a result if they put in URLs that don't match current environment", function() {

    });

    it("User should not get a result if they put in URLs that have .preview. or .staging. in them", function() {

    });

    it("User should get results if the search criteria (including wildcards) match anything in the redirect database on any site", function() {

    });

    it('All matching redirects should be listed in the UI with columns for "From URL," "From ID," "Status" "To URL," "To ID" and "Status"', function() {

    });

    it('Each result should include a status for the to URL/ID combination and from URL/ID combination "', function() {
        //(Active/Expired) - this is so users can re-associate expired IDs if needed
    });

    it("Results should be paginated after 50 results with ability to change the pagination to 25, 100 or 'all'", function() {

    });

    it("Results should be paginated after 50 results with ability to change the pagination to 25, 100 or 'all'", function() {

    });
});
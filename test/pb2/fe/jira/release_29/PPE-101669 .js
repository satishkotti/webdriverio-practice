var assert = require('assert');
const Promise = require('bluebird');
var test = require('./../../../common/functions/functions');
var redirectActions = require("./../../../common/actions/redirecttool.actions")


describe('PPE-101669: Redirect Tool Link in PB2', function() {
    before(() => {
        //Launch App
        test.LaunchAppAndLogin();
    });

    it('Go to Redirect Tool Page', function() {
        redirectActions.GoToRedirectToolPage();
    });

    it('Verify Redirect tool title (Search Redirects for dev03)', function() {
        var title = redirectActions.GetPageTitle();
        assert.equal(title, "Search Redirects for dev03", "Title is not matching")
    });
});
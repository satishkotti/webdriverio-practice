var assert = require('assert');
const Promise = require('bluebird');
var test = require('./../../../../common/functions/functions');
var redirectActions = require("./../../../../common/actions/redirecttool.actions")
var testEnv = global.testEnv;

describe('PPE-101669: Redirect Tool Link in PB2', function() {
    before(() => {
        //Launch App
        test.LaunchAppAndLogin();
    });

    it('Go to Redirect Tool Page', function() {
        redirectActions.GoToRedirectToolPage();
    });

    it('Verify page title', function() {
        var title = redirectActions.GetPageTitle({ target: "" });
        assert.equal(title, "Redirect Tool - WebMD PageBuilder", "Title is not matching")
    });
});
var assert = require('assert');
const Promise = require('bluebird');
var test = require('./../../../common/functions/functions');
var redirectActions = require("./../../../common/actions/redirecttool.actions")
var testEnv = global.testEnv;

describe('PPE-101669: Redirect Tool Link in PB2', function() {
    before(() => {
        //Launch App
        test.LaunchAppAndLogin();
    });

    it('Go to Redirect Tool Page', function() {
        redirectActions.GoToRedirectToolPage();
    });

    it('Verify Redirect tool title (Search Redirects for ' + testEnv + ")", function() {
        var title = redirectActions.GetPageTitle({ target: "Search" });
        assert.equal(title, "Search Redirects for " + testEnv, "Title is not matching")
    });

    it('Verify Redirect tool title (Create Redirect for ' + testEnv + ")", function() {
        var title = redirectActions.GetPageTitle({ target: "Create" });
        assert.equal(title, "Create Redirect for " + testEnv, "Title is not matching")
    });

    it('Verify there is a search textbox for [From URL]', function() {
        var element = redirectActions.GetRedirectElement({ element: 'searchFromUrl' });
        assert.notEqual(element, null);
        assert.notEqual(element, undefined);
    });

    it('Verify there is a search textbox for [To URL]', function() {
        var element = redirectActions.GetRedirectElement({ element: 'searchToUrl' });
        assert.notEqual(element, null);
        assert.notEqual(element, undefined);
    });

    it('Verify there is a create textbox for [From URL]', function() {
        var element = redirectActions.GetRedirectElement({ element: 'createFromUrl' });
        assert.notEqual(element, null);
        assert.notEqual(element, undefined);
    });

    it('Verify there is a create textbox for [To URL]', function() {
        var element = redirectActions.GetRedirectElement({ element: 'createToUrl' });
        assert.notEqual(element, null);
        assert.notEqual(element, undefined);
    });

    it('Verify there is a Search botton', function() {
        var element = redirectActions.GetRedirectElement({ element: 'searchBtn' });
        assert.notEqual(element, null);
        assert.notEqual(element, undefined);
    });

    it('Verify there is a create redirect botton', function() {
        var element = redirectActions.GetRedirectElement({ element: 'createBtn' });
        assert.notEqual(element, null);
        assert.notEqual(element, undefined);
    });

    it('Go to Bulk import', function() {
        redirectActions.GoToBulkImport();
    });

    it('Verify bulk import title (Bulk Upload Redirects for' + testEnv + ')', function() {
        var title = redirectActions.GetPageTitle({ target: "Bulk" });
        assert.equal(title, "Bulk Upload Redirects for " + testEnv, "Title is not matching")
    });

    it('Verify choose file controler', function() {
        var element = redirectActions.GetRedirectElement({ element: 'chooseFile' });
        assert.notEqual(element, null);
        assert.notEqual(element, undefined);
    });
});
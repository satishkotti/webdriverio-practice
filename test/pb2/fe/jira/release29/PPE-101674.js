var assert = require('assert');
const Promise = require('bluebird');
var test = require('./../../../common/functions/functions');
var redirectActions = require("./../../../common/actions/redirecttool.actions")
var testEnv = global.testEnv;
var UrlStartWithWWWEnvUrl = "www." + testEnv + ".webmd.com/food-recipes/guide/health-cooking*";
var correctEnvUrl = "http://www." + testEnv + ".webmd.com/food-recipes/guide/health-cooking";
var correctEnvUrlWithWildcard = "http://www." + testEnv + ".webmd.com/food-recipes/guide/health-cooking*";
var validChronId = "091e9c5e8009e2d7";
var inValidChronId = "091e9c5e8009";

describe('PPE-101674: Ability to Search Existing Redirects', function() {
    before(() => {
        //Launch App
        test.LaunchAppAndLogin();
    });

    it('Go to Redirect Tool Page', function() {
        redirectActions.GoToRedirectToolPage();
    });

    it('Verify "From URL/ID" text field', function() {
        var element = redirectActions.GetRedirectElement({ element: 'searchFromUrl' });
        assert.notEqual(element, null);
        assert.notEqual(element, undefined);
    });

    it('Verify To URL/ID" text field', function() {
        var element = redirectActions.GetRedirectElement({ element: 'searchToUrl' });
        assert.notEqual(element, null);
        assert.notEqual(element, undefined);
    });

    it('Verify Search" button', function() {
        redirectActions.SearchFromUrl(correctEnvUrl);
        var element = redirectActions.GetRedirectElement({ element: 'searchBtn' });
        assert.notEqual(element, null);
        assert.notEqual(element, undefined);
    });

    it('From url starts with https or http or dctm id', function() {
        browser.refresh();
        redirectActions.SearchFromUrlNoClick(UrlStartWithWWWEnvUrl);
        assert.equal(browser.isVisible('[name="redirectSearchForm"] > div:nth-of-type(1) > div:nth-of-type(1) > label.pb-label > span.pb-field-invalid'), true);
        redirectActions.SearchFromUrlNoClick("wrong text");
        assert.equal(browser.isVisible('[name="redirectSearchForm"] > div:nth-of-type(1) > div:nth-of-type(1) > label.pb-label > span.pb-field-invalid'), true);
        redirectActions.SearchFromUrlNoClick(correctEnvUrl);
        assert.equal(browser.isVisible('[name="redirectSearchForm"] > div:nth-of-type(1) > div:nth-of-type(1) > label.pb-label > span.pb-field-invalid'), false);
        redirectActions.SearchFromUrlNoClick(inValidChronId);
        assert.equal(browser.isVisible('[name="redirectSearchForm"] > div:nth-of-type(1) > div:nth-of-type(1) > label.pb-label > span.pb-field-invalid'), true);
        redirectActions.SearchFromUrlNoClick(validChronId);
        assert.equal(browser.isVisible('[name="redirectSearchForm"] > div:nth-of-type(1) > div:nth-of-type(1) > label.pb-label > span.pb-field-invalid'), false);
    });

    it('To url starts with https or http or dctm id', function() {
        browser.refresh();
        redirectActions.SearchToUrlNoClick(UrlStartWithWWWEnvUrl);
        assert.equal(browser.isVisible('[name="redirectSearchForm"] > div:nth-of-type(1) > div:nth-of-type(2) > label.pb-label > span.pb-field-invalid'), true);
        redirectActions.SearchToUrlNoClick("wrong text");
        assert.equal(browser.isVisible('[name="redirectSearchForm"] > div:nth-of-type(1) > div:nth-of-type(2) > label.pb-label > span.pb-field-invalid'), true);
        redirectActions.SearchToUrlNoClick(correctEnvUrl);
        assert.equal(browser.isVisible('[name="redirectSearchForm"] > div:nth-of-type(1) > div:nth-of-type(2) > label.pb-label > span.pb-field-invalid'), false);
        redirectActions.SearchToUrlNoClick(inValidChronId);
        assert.equal(browser.isVisible('[name="redirectSearchForm"] > div:nth-of-type(1) > div:nth-of-type(2) > label.pb-label > span.pb-field-invalid'), true);
        redirectActions.SearchToUrlNoClick(validChronId);
        assert.equal(browser.isVisible('[name="redirectSearchForm"] > div:nth-of-type(1) > div:nth-of-type(2) > label.pb-label > span.pb-field-invalid'), false);
    });

    it('User should be able to input a "wildcard" * at the end of their search', function() {
        browser.refresh();
        redirectActions.SearchToUrlNoClick(correctEnvUrlWithWildcard);
        assert.equal(browser.isVisible('[name="redirectSearchForm"] > div:nth-of-type(1) > div:nth-of-type(2) > label.pb-label > span.pb-field-invalid'), false);
    });

    it("User must have either From or To URL field populated when doing a search and can have both populated", function() {
        browser.refresh();
        redirectActions.SearchToUrl(correctEnvUrlWithWildcard);
        assert.equal(browser.isVisible("button.floatright"), true);
        browser.refresh();
        redirectActions.SearchFromUrl(correctEnvUrlWithWildcard);
        assert.equal(browser.isVisible("button.floatright"), true);
        browser.refresh();
        redirectActions.SearchToUrlNoClick(correctEnvUrlWithWildcard);
        redirectActions.SearchFromUrl(correctEnvUrlWithWildcard);
        assert.equal(browser.isVisible("button.floatright"), true);
    });
});
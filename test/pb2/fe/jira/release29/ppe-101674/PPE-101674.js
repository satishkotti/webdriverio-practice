const test = require('./../../../../common/functions/functions');
const field = require('./../../../../common/elements/assetprops.page');
const action = require('./../../../../common/elements/actions.page');
var testdata = require('./testdata.js');
var testEnv = global.testEnv;

var validChronId = testdata.validChronId;
var inValidChronId = testdata.inValidChronId;
var correctEnvUrlWithWildcard = testdata.correctEnvUrlWithWildcard;

describe('PPE-101674: Ability to Search Existing Redirects', function () {

    var from, to, search;

    var invalidMessageFor = function (fieldName) {
        browser.pause(500);
        return browser.isVisible('//label[contains(.,"' + fieldName + '")]//span[@class="pb-field-invalid"]')
    }

    var resultsGridVisibility = function () {
        browser.waitForExist('#redirectListGrid');
        browser.pause(1000);
        return browser.isVisible('#redirectListGrid');
    }

    before(() => {
        //Launch App
        test.LaunchAppAndLogin();
    });

    it('Go to Redirect Tool Page', function () {
        test.NavigateToRedirectToolPage();
    });

    it('Verify the existence, visiblity and state of "From URL/ID" text field', function () {
        from = field.input.get('From URL');
        expect(from.isVisible()).to.be.true;
        expect(from.isEnabled()).to.be.true;
    });

    it('Verify the existence, visiblity and state of "To URL/ID" text field', function () {
        to = field.input.get('To URL');
        expect(to.isVisible()).to.be.true;
        expect(to.isEnabled()).to.be.true;
    });

    it('Verify the existence, visiblity and state of "Search" button', function () {
        search = action.button.get('Search');
        expect(search.isVisible()).to.be.true;
        expect(search.isEnabled()).to.be.false;
    });

    it('Verify the visibilty of "Invalid" message when the user inputs text in "From URL" field which either does not start with http or https or not a chronicle id', function () {
        from.setValue('wrong text');
        expect(invalidMessageFor('From URL')).to.be.true;
        expect(invalidMessageFor('To URL')).to.be.false;
    });

    it('Verify the visibilty of "Invalid" message when the user inputs text in "From URL" field which starts with http', function () {
        from.setValue('https://www.google.com');
        expect(invalidMessageFor('From URL')).to.be.false;
        expect(invalidMessageFor('To URL')).to.be.false;
    });

    it('Verify the visibilty of "Invalid" message when the user inputs text in "From URL" field which starts with https', function () {
        from.setValue('http://www.google.com');
        expect(invalidMessageFor('From URL')).to.be.false;
        expect(invalidMessageFor('To URL')).to.be.false;
    });

    it('Verify the visibilty of "Invalid" message when the user inputs valid chronicle id in "From URL" field', function () {
        from.setValue(validChronId);
        expect(invalidMessageFor('From URL')).to.be.false;
        expect(invalidMessageFor('To URL')).to.be.false;
    });

    it('Verify the visibilty of "Invalid" message when the user inputs invalid chronicle id in "From URL" field', function () {
        from.setValue(inValidChronId);
        expect(invalidMessageFor('From URL')).to.be.true;
        expect(invalidMessageFor('To URL')).to.be.false;
        from.setValue(validChronId);
    });

    it('Verify the visibilty of "Invalid" message when the user inputs text in "To URL" field which either does not start with http or https or not a chronicle id', function () {
        to.setValue('wrong text');
        expect(invalidMessageFor('From URL')).to.be.false;
        expect(invalidMessageFor('To URL')).to.be.true;
    });

    it('Verify the visibilty of "Invalid" message when the user inputs text in "To URL" field which starts with http', function () {
        to.setValue('http://www.google.com');
        expect(invalidMessageFor('From URL')).to.be.false;
        expect(invalidMessageFor('To URL')).to.be.false;
    });

    it('Verify the visibilty of "Invalid" message when the user inputs text in "To URL" field which starts with https', function () {
        to.setValue('https://www.google.com');
        expect(invalidMessageFor('From URL')).to.be.false;
        expect(invalidMessageFor('To URL')).to.be.false;
    });

    it('Verify the visibilty of "Invalid" message when the user inputs valid chronicle id in "To URL" field', function () {
        to.setValue(validChronId);
        expect(invalidMessageFor('From URL')).to.be.false;
        expect(invalidMessageFor('To URL')).to.be.false;
    });

    it('Verify the visibilty of "Invalid" message when the user inputs invalid chronicle id in "To URL" field', function () {
        to.setValue(inValidChronId);
        expect(invalidMessageFor('From URL')).to.be.false;
        expect(invalidMessageFor('To URL')).to.be.true;
        to.setValue(validChronId);
    });

    it('Verify the visibilty of "Invalid" message when the user inputs valid url with wildcard at the end in "From URL" field', function () {
        from.setValue(correctEnvUrlWithWildcard);
        expect(invalidMessageFor('From URL')).to.be.false;
        expect(invalidMessageFor('To URL')).to.be.false;
    });

    it('Verify the visibilty of "Invalid" message when the user inputs valid url with wildcard at the end in "From URL" field', function () {
        to.setValue(correctEnvUrlWithWildcard);
        expect(invalidMessageFor('From URL')).to.be.false;
        expect(invalidMessageFor('To URL')).to.be.false;
    });

    it('Verify the state of Search button when user enters valid input in "From URL" field and leaves "To URL" field empty', function () {
        from.setValue(correctEnvUrlWithWildcard);
        to.setValue('');
        expect(action.button.get('Search').isEnabled()).to.be.true;
    });

    it('Verify the state of Search button when user enters valid input in "To URL" field and leaves "From URL" field empty', function () {
        from.setValue('');
        to.setValue(correctEnvUrlWithWildcard);
        expect(action.button.get('Search').isEnabled()).to.be.true;
    });

    it('Verify the state of Search button when user enters valid input in "To URL" & "From URL" fields', function () {
        from.setValue(correctEnvUrlWithWildcard);
        to.setValue(correctEnvUrlWithWildcard);
        expect(action.button.get('Search').isEnabled()).to.be.true;

    });

    it('Verify the functionality of Search button when user enters valid input in "From URL" field and leaves "To URL" field empty', function () {
        from.setValue('');
        to.setValue(correctEnvUrlWithWildcard);
        search.click();
        expect(resultsGridVisibility()).to.be.true;

    });

    it('Verify the functionality of Search button when user enters valid input in "To URL" field and leaves "From URL" field empty', function () {

        if (field.link.get('Show Criteria')) {
            field.link.get('Show Criteria').click();
            browser.pause(500);
        }
        from.setValue(correctEnvUrlWithWildcard);
        to.setValue('');
        search.click();
        expect(resultsGridVisibility()).to.be.true;

    });

    it('Verify the functionality of Search button when user enters valid input in "From URL" & "To URL" fields', function () {
        if (field.link.get('Show Criteria')) {
            field.link.get('Show Criteria').click();
            browser.pause(500);
        }
        from.setValue(correctEnvUrlWithWildcard);
        to.setValue(correctEnvUrlWithWildcard);
        search.click();
        expect(resultsGridVisibility()).to.be.true;

    });


});
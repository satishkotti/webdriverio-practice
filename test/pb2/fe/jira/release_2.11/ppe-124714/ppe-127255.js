//Constants
const test = require('./../../../../common/functions/functions.js');
const props = require('./../../../../common/elements/assetprops.page');
const iwcActions = require('./../../../../common/actions/iwc.actions.js');
const assetActions = require('./../../../../common/actions/assetactions.actions.js');

//Testdata
const testdata = require('./../../../../data/testdata/ppe-124714.testdata').ppe127255;

//Tests
describe(`PPE-124714: Verify whether user can edit 'SSL Required' checkbox for a new CAP Page`, () => {

    var _InitialState = false, _InitialVal = 0;
    var _FinalExpectedState = false, _FinalExpectedVal = 0;
    var _PageChronId = testdata.i_chronicle_id;
    var _PBSession = null;

    var GetState = function () {
        return browser.execute(`return $('label:contains("SSL Required?") input').get(0).checked`).value;
    }

    before(() => {

        //Launch PB2 app and login
        test.LaunchAppAndLogin();

        //Search for an existing CAP Page
        test.SearchFor(null, _PageChronId, 'Global Search', null);

        //Checkout and Edit the page
        try {
            test.EditTheAsset();
        } catch (err) {};

        //Expand Additional Properties Section
        test.ToggleAdditionalProperties();

    });
    it('Verify whether the SSL Required field is enabled to edit when user enters the create mode of a CAP page', () => {

        //Verify whether the SSL Required field is enabled for editing
        expect(props.checkbox.get('SSL Required').isEnabled()).to.be.true;

    });

    it('Verify whether the value is preserved in the UI when user edits and Checks-in/Publishes the page', () => {

        //Get the initial state of the SSL Required field
        _InitialState = GetState();

        //Toggle the SSL Required field
        var _SSLRequiredCheckbox = props.checkbox.get('SSL Required?');
        try {
            _SSLRequiredCheckbox.click();
        }
        catch (err) {
            _SSLRequiredCheckbox.scroll(0, 250);
            _SSLRequiredCheckbox.click();
        }

        if (!_InitialState) {
            _FinalExpectedState = true;
            _FinalExpectedVal = 1;
        }

        //Publish the page to Live
        test.SaveOrPublishTheAsset('Publish to Live', 'Testing PPE-124714 using automation script - create a new version');

        //Get the final state of the SSL Required field
        var _FinalState = GetState();

        //Assertion - expected state must be the negation of initial state
        expect(_FinalState).to.equal._FinalExpectedState;

    });

    it('Verify whether the new value is populated in the ATS XML of the page', () => {

        //Navigate to ATS Status Checker Page
        _PBSession = test.NavigatetoATSStatusCheckerPageOf(_PageChronId, 'Preview');

        //Wait for ATS Output File
        test.WaitForATSFile();

        //Parse the XML File and obtain the value of 'wbmd_is_ssl_reqd'
        browser.pause(5000);
        var xmlFile = test.GetXML(_PageChronId, 'Preview', 'XML');
        var _ValueFromXML = parseInt(xmlFile.webmd_rendition.content.wbmd_asset.metadata_section.wbmd_is_ssl_reqd);

        //Assertion
        expect(_ValueFromXML).to.equal(_FinalExpectedVal);


    });

    after(() => {
        browser.url(_PBSession);
        test.SelectMoreActionsMenuItem('Asset History');
        browser.click(testdata.restore_to_previous_version_locator);
        test.CheckoutAndEditTheAsset();
        test.SaveOrPublishTheAsset('Publish to Live', 'Testing PPE-124714 using automation script - restore to previous version');
    });
});
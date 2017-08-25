//Constants
const test = require('./../../../../common/functions/functions.js');
const props = require('./../../../../common/elements/assetprops.page');

//Other requrired files
import { AddToNode } from './../../../../common/actions/iwc.actions.js';
import { ClickModalContinueButton, ClickContinueButton } from './../../../../common/actions/assetactions.actions.js'

//Testdata
const testdata = require('./../../../../data/testdata/ppe-124714.testdata').ppe127552;

//Tests
describe(`PPE-124714: Verify whether user can edit 'SSL Required' checkbox for a new CAP Page`, () => {

    var _InitialState = false, _InitialVal = 0;
    var _ExpectedState = false, _ExpectedVal = 0;
    var _PageChronId = null;

    var GetState = function(){
        return browser.execute(`return $('label:contains("SSL Required?") input').get(0).checked`);
    }

    before(() => {

        //Launch PB2 app and login
        test.LaunchAppAndLogin();

        //Enter Interior Workcenter
        test.EnterIWC('Create', 'Templates & Pages');

        //Traverse the Site Structure
        test.TraverseSS();

        //Add Page
        AddToNode('Page');

        //Select the type of page and the css of the page
        props.checkbox.get('New Standalone').click();
        props.dropdown('Layout', testdata.pagedata.layout);
        props.dropdown('Layout CSS', testdata.pagedata.layoutCSS);

        //Click Continue button
        ClickModalContinueButton();

        //Populate Page Props
        if (assetProps.isCAP == 1) //CAP Page
        {
            props.checkbox.get('Is CAP?').click();
            props.dropdown('Content Filter', assetProps.contentFilter);
            if (assetProps.sponsorProgram != null) { props.dropdown('Sponsor Program', assetProps.sponsorProgram) };
            if (assetProps.tier != 2) { props.dropdown('Tier', assetProps.tier) };
            if (assetProps.pageThumbnail != null) { props.input.get('Page Thumbnail').setValue(assetProps.pageThumbnail) };
            if (assetProps.healthRefType != null) { props.dropdown('Health Reference Type', assetProps.healthRefType) };

        }

    });
    it('Verify whether the SSL Required field is enabled to edit when user enters the create mode of a CAP page', () => {

        //Verify whether the SSL Required field is enabled for editing
        expect(props.checkbox.get('SSL Required').isEnabled()).to.be.true;

    });

    it('Verify whether the value is preserved in the UI when user edits and Checks-in/Publishes the page', () => {

        //Get the initial state of the SSL Required field
        _InitialState = GetState();

        if(_InitialState)
            {
                _ExpectedState = true;
                _ExpectedVal = 1;
            }

        //Toggle the SSL Required field
        props.checkbox.get('Is CAP?').click();

        //Click Continue button
        ClickContinueButton();
        browser.waitForVisible('.pb-layout');
        _PageChronId = browser.getText('.pb-chron');

        //Publish the page to Live
        test.SaveOrPublishTheAsset('Publish to Live', 'Testing PPE-124714 using automation script')

        //Switch to Properties tab
        test.SwitchAssetTabs('Properties');

        //Get the final state of the SSL Required field
        var _FinalState = GetState();

        //Assertion - expected state must not be the negation of initial state
        expect(_FinalState).to.equal._ExpectedState;
        
    });

    it('Verify whether the new value is populated in the ATS XML of the page', () => {

        //Navigate to ATS Status Checker Page
        test.NavigatetoATSStatusCheckerPageOf(_PageChronId, 'Preview');

        //Wait for ATS Output File
        test.WaitForATSFile();

        //Parse the XML File and obtain the value of 'wbmd_is_ssl_reqd'
        browser.pause(5000);
        var xmlFile = test.GetXML(_PageChronId, 'Preview', 'XML');
        var _ValueFromXML = parseInt(xmlFile.webmd_rendition.content.wbmd_asset.metadata_section.wbmd_is_ssl_reqd);

        //Assertion
        expect(_ValueFromXML).to.equal(_ExpectedVal);

        
    });
});
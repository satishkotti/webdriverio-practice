//Constants
const test = require('./../../../../common/functions/functions.js');
const props = require('./../../../../common/elements/assetprops.page');

//Testdata
const testdata = require('./../../../../data/testdata/ppe-126744.testdata');

//Fields
var _AddBodyCopiesField = null, _AddBodyLinksField = null, _AddLowerLinksField = null;

//Asset Chronicle ID
var _AssetChronID = null;

//ATS XML File
var xml = null;

//ATS XML Tags
var _XMLBodyCopies = null, _XMLBodyLinks = null, _XMLLowerLinks = null;

describe('PPE-126744: Verify whether module data is saved even when empty field are present in the UI', () => {

    before(() => {

        //Launch PB2 app and login
        test.LaunchAppAndLogin();

        //Create a shared module
        _AssetChronID = test.Create('Shared Module', testdata.SponsorBoxesModuleData);

        //Add additional body copies
        _AddBodyCopiesField = props.input2.get('Body Copy', 'Add Body Copies', 1);
        try {
            props.addLinks('Body Copy', 'Add Body Copies', 1, 3);
        } catch (err) {
           let location = _AddBodyCopiesField.getLocation('y');
           browser.scroll(0, y + 250);
           props.addLinks('Body Copy', 'Add Body Copies', 1, 3);
        }

        //Add additional body links
        _AddBodyLinksField = props.input2.get('Body Links', 'Add Body Links', 1);
        try {
            props.addLinks('Body Links', 'Add Body Links', 1, 3);
        } catch (err) {
           let location = _AddBodyLinksField.getLocation('y');
           browser.scroll(0, y + 250);
           props.addLinks('Body Links', 'Add Body Links', 1, 3);
        }

        //Add additional lower links
        _AddLowerLinksField = props.input2.get('Lower Links', 'Add Lower Links', 1);
        try {
            props.addLinks('Lower Links', 'Add Lower Links', 1, 3);
        } catch (err) {
           let location = _AddBodyLinksField.getLocation('y');
           browser.scroll(0, y + 250);
           props.addLinks('Lower Links', 'Add Lower Links', 1, 3);
        }

        //Configure the Sponsor Boxes shared module
        test.ConfigureModule('Sponsor Boxes', testdata.SponsorBoxesModuleData);

        //Publish the module to Live
        test.SaveOrPublishTheAsset('Publish to Live', 'Testing PPE-126744 using automation script');

        //Navigate to ATS Status Checker Page
        test.NavigatetoATSStatusCheckerPageOf(_AssetChronID, 'Preview');

        //Wait for  ATS XML to be generated
        test.WaitForATSFile();

        //Get the XML File from the URL
        browser.pause(5000);
        xml = test.GetXML(_AssetChronID, 'Preview', 'XML');
    })

    it('Empty Body Copy field - 1 in the UI must be present in the XML with a blank value', () => {
        //Assertion
        _XMLBodyCopies = xml.webmd_rendition.content.wbmd_asset.webmd_module.module_data.body_copies.body_copy;
        expect(_XMLBodyCopies[0].body_copy_text).to.be.empty;
    });

    it('Empty Body Copy field - 2 in the UI must be present in the XML with a blank value', () => {
        //Assertion
        expect(_XMLBodyCopies[1].body_copy_text).to.be.empty;
    });

    it('Empty Body Copy field - 3 in the UI must be present in the XML with a blank value', () => {
        //Assertion
        expect(_XMLBodyCopies[2].body_copy_text).to.be.empty;
    });

    it('Empty Body Copy field - 4 in the UI must be present in the XML with a blank value', () => {
        //Assertion
        expect(_XMLBodyCopies[3].body_copy_text).to.be.empty;
    });

    it('Body Links field - 1 in the UI must be present in the XML and it must contain the value populated in the UI', () => {
        //Assertion
        _XMLBodyLinks = xml.webmd_rendition.content.wbmd_asset.webmd_module.module_data.body_links.body_link;
        expect(_XMLBodyCopies[0].body_link_text).to.equal(testdata.SponsorBoxesModuleData.bodylinks[0].body_link_text);
    });


    it('Empty Body Links field - 2 in the UI must be present in the XML with a blank value', () => {
        //Assertion
        expect(_XMLBodyCopies[1].body_link_text).to.be.empty;
    });

    it('Empty Body Links field - 3 in the UI must be present in the XML with a blank value', () => {
        //Assertion
        expect(_XMLBodyCopies[2].body_link_text).to.be.empty;
    });

    it('Empty Body Links field - 4 in the UI must be present in the XML with a blank value', () => {
        //Assertion
        expect(_XMLBodyCopies[3].body_link_text).to.be.empty;
    });

    it('Empty Lower Links field - 1 in the UI must be present in the XML with a blank value', () => {
        //Assertion
        _XMLLowerLinks = xml.webmd_rendition.content.wbmd_asset.webmd_module.module_data.lower_links.lower_link;
        expect(_XMLLowerLinks[1].lower_link_text).to.equal(testdata.SponsorBoxesModuleData.lowerlinks[0].lower_link_text);
    });

    it('Empty Lower Links field - 2 in the UI must be present in the XML with a blank value', () => {
        //Assertion
        expect(_XMLLowerLinks[1].lower_link_text).to.be.empty;
    });

    it('Empty Lower Links field - 3 in the UI must be present in the XML with a blank value', () => {
        //Assertion
        expect(_XMLLowerLinks[2].lower_link_text).to.be.empty;
    });

    it('Empty Lower Links field - 4 in the UI must be present in the XML with a blank value', () => {
        //Assertion
        expect(_XMLLowerLinks[3].lower_link_text).to.be.empty;
    });

});
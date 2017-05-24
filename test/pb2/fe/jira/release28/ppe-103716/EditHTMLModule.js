var test = require('./../../../../common/functions/functions');
var smTestData = require('./../../../../data/sm.assets');

describe('XML validations for updated HTML Module', () => {

    var testAssetProps = smTestData.HTMLModule;
    var chronid = '091e9c5e8158dee5';
    // var chronid = '091e9c5e809a2677';
    var xml2 = {};
    var xml1 = {};
    var updatedXml = {};
    before(() => {
        //Launch App
        test.LaunchAppAndLogin();
    });

    //Create Scenario
    describe.only('Creation Scenario', () => {

        before(() => {
            test.SearchFor(null, chronid, 'Global Search', null);
            test.EditTheAsset();
            test.SwitchAssetTabs('Module Configuration');

            test.ConfigureModule('edithtmlmodule', testAssetProps);
            xml1 = test.GetXMLValues('html module', test.GetXML(chronid, 'live'));

            test.SaveOrPublishTheAsset('Publish to Live', 'Testing to compare renditions of last versions');
            test.NavigatetoATSStatusCheckerPageOf(chronid, 'live');
            test.ClickButtonInATSPage('ATS Reprocess');
            test.WaitForATSFile('ATS Output File');
            updatedXml = test.GetXMLValues('html module', test.GetXML(chronid, 'live'));

        });
        describe('Update Scenario', () => {
            before(() => {
                test.LaunchApp();
                test.SearchFor(null, chronid, 'Global Search', null);
                test.SelectMoreActionsMenuItem('Asset History');
                test.CheckoutAndEditTheAsset();
                test.SaveOrPublishTheAsset('Publish to Live', 'Reinstate - testing to compare renditions of PB1 & PB2');

                test.NavigatetoATSStatusCheckerPageOf(chronid, 'live');
                test.ClickButtonInATSPage('ATS Reprocess');
                test.WaitForATSFile('ATS Output File');
                //Parse the XML
                xml2 = test.GetXMLValues('html module', test.GetXML(chronid, 'live'));
            });

            it('Verify data after edit/update the existing section in HTML module', () => {
                expect(testAssetProps.ModuleHTMLEdit).to.equal(updatedXml['contentText']);
            });

            //module data
            it('Verify data contentText of both xmls should be same', () => {
                expect(xml1['contentText']).to.equal(xml2['contentText']);
            });

        });
    });
});
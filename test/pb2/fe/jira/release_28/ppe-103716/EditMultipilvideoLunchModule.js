var test = require('./../../../../common/functions/functions');
var smTestData = require('./../../../../data/sm.assets');


describe('XML validations for Multiple Video Launch Module', () => {

    var testAssetProps = smTestData.updatemultiplevideolaunchModule;
    var testAssetName = testAssetProps.moduleName;


    before(() => {
        //Launch App
        test.LaunchAppAndLogin();
    });

    describe.only('update Scenario', () => {
        var xml2 = {}; //pb2 xml
        var xml1 = {};
        var xml3 = {};
        var chronid = '091e9c5e815cadf2';

        before(() => {

            test.SearchFor(null, chronid, 'Global Search', null);
            test.EditTheAsset();
            test.SwitchAssetTabs('Module Configuration');
            test.ConfigureModule('update multiple video launch module', testAssetProps);
            xml1 = test.GetXMLValues('multiple video launch module', test.GetXML(chronid, 'live'));
            test.SaveOrPublishTheAsset('Publish to Live', 'Testing to compare renditions of last versions');
            test.NavigatetoATSStatusCheckerPageOf(chronid, 'live');
            test.ClickButtonInATSPage('ATS Reprocess');
            test.WaitForATSFile('ATS Output File');
            xml2 = test.GetXMLValues('update multiple video launch module', test.GetXML(chronid, 'live'));
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
                xml3 = test.GetXMLValues('multiple video launch module', test.GetXML(chronid, 'live'));

            });

            it('Verify data after edit/update the existing section in multiple video launch module', () => {
                expect(testAssetProps.brand).to.equal(xml2['VideoBrand']);
                expect(testAssetProps.moduleTitle).to.equal(xml2['ModuleTitle']);
                expect(testAssetProps.moduleDesc).to.equal(xml2['ModuleDescription']);
                expect(testAssetProps.videos[0].videoObject).to.equal(xml2['videosource_chronic_id']);
                expect(testAssetProps.videos[0].videoTitleOverride).to.equal(xml2['VideoTitleOverride']);
                expect(testAssetProps.videos[0].videoDescOverride).to.equal(xml2['VideoDescriptionOverride']);


            });

            //assertions
            it('Verify data after Reinstate the existing section in multiple video launch module', () => {
                expect(xml1['VideoBrand']).to.equal(xml3['VideoBrand']);
                expect(xml1['ModuleTitle']).to.equal(xml3['ModuleTitle']);
                expect(xml1['ModuleDescription']).to.equal(xml3['ModuleDescription']);
                expect(xml1['videosource_chronic_id']).to.equal(xml3['videosource_chronic_id']);
                expect(xml1['VideoTitleOverride']).to.equal(xml3['VideoTitleOverride']);
                expect(xml1['VideoDescriptionOverride']).to.equal(xml3['VideoDescriptionOverride']);


            });

        });

    });
});
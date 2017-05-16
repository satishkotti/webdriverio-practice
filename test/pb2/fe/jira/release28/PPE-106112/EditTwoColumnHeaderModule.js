var test = require('./../../../../common/functions/functions');
var smTestData = require('./../../../../data/sm.assets');

describe('XML validations for Edit Standard promo Module', () => {

    var testAssetProps = smTestData.EditTwoColumnHeaderModule;
    var chronid = '091e9c5e815dbb0c';
    var xml2 = {};
    var xml1 = {};
    var updatedXml = {};
    var imagesCount = 0;
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
            test.ConfigureModule('EditTwoColumnHeaderModule', testAssetProps);
            xml1 = test.GetXMLValues('twocolumnheadermodule', test.GetXML(chronid, 'live'));

            test.SaveOrPublishTheAsset('Publish to Live', 'Testing to compare renditions of last versions');
            test.NavigatetoATSStatusCheckerPageOf(chronid, 'live');
            test.ClickButtonInATSPage('ATS Reprocess');
            test.WaitForATSFile('ATS Output File');
            updatedXml = test.GetXMLValues('twocolumnheadermodule', test.GetXML(chronid, 'live'));
        });


        describe('Update Scenario', () => {
            before(() => {
                test.LaunchApp();
                test.SearchFor(null, chronid, 'Global Search', null);
                test.SelectMoreActionsMenuItem('Asset History');
                test.CheckoutAndEditTheAsset();
                test.SaveOrPublishTheAsset('Publish to Live', 'Reinstate - testing to compare last 2 renditions');

                test.NavigatetoATSStatusCheckerPageOf(chronid, 'live');
                test.ClickButtonInATSPage('ATS Reprocess');
                test.WaitForATSFile('ATS Output File');
                //Parse the XML
                xml2 = test.GetXMLValues('twocolumnheadermodule', test.GetXML(chronid, 'live'));

                for (var property in xml2) {
                    if (property.toString().startsWith('image_link_')) {
                        imagesCount = imagesCount + 1;
                    }
                }
            });

            //assertions
            it('Verify data after Add/update the existing section in Two Column Header module', () => {
                expect(testAssetProps.TitleText).to.equal(updatedXml['moduleTitle']);
                expect(testAssetProps.SubtitleText).to.equal(updatedXml['module_subtitle']);
                expect(testAssetProps.AttributionText).to.equal(updatedXml['attribution_link_text']);

                expect(updatedXml['image_link_1']).to.be.true;
                expect(updatedXml['image_link_1']).to.be.true;
                expect(updatedXml['source_1']).to.be.true;
                expect(updatedXml['source_1']).to.be.true;

                expect(updatedXml['image_link_' + imagesCount]).to.be.true;
                expect(updatedXml['image_link_' + imagesCount]).to.be.true;
                expect(updatedXml['source_' + imagesCount]).to.be.true;
                expect(updatedXml['source_' + imagesCount]).to.be.true;
            });

            it('Module data attributes of both xmls should be same', () => {
                expect(xml1['moduleTitle']).to.equal(xml2['moduleTitle']);
                expect(xml1['module_subtitle']).to.equal(xml2['module_subtitle']);
                expect(xml1['attribution_link_text']).to.equal(xml2['attribution_link_text']);

                while (imagesCount > 0) {
                    expect(xml1['image_link_' + imagesCount]).to.be.true;
                    expect(xml2['image_link_' + imagesCount]).to.be.true;
                    expect(xml1['source_' + imagesCount]).to.be.true;
                    expect(xml2['source_' + imagesCount]).to.be.true;
                    imagesCount = imagesCount - 1;
                }
            });

        });
    });
});


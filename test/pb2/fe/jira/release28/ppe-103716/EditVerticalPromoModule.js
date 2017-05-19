var test = require('./../../../../common/functions/functions');
var smTestData = require('./../../../../data/sm.assets');
//var pb1xml = require('./../../../../data/sm-pb1-xmls/sponsorboxes_allfields.xml');

describe('XML validations for updated sponsorbox Module', () => {

    var testAssetProps = smTestData.editverticalpromoModule;
    // var testAssetName = testAssetProps.moduleName;
   // var chronid = '091e9c5e803755d3';
    var chronid = '091e9c5e815c6344';
    var xml2 = {};
    var xml1 = {};
    var updatedXml = {};
    var overlayCount = 0;
    before(() => {
        //Launch App
        test.LaunchAppAndLogin();
    });

    //Create Scenario
    describe.only('Creation Scenario', () => {

        before(() => {
            //   xml1 = test.GetXMLValues('sponsor box module', test.GetXML(chronid, 'live'));
            test.SearchFor(null, chronid, 'Global Search', null);
            test.EditTheAsset();
            test.SwitchAssetTabs('Module Configuration');

            test.ConfigureModule('editverticalpromomodule', testAssetProps);
            xml1 = test.GetXMLValues('vertical promo module', test.GetXML(chronid, 'live'));

            test.SaveOrPublishTheAsset('Publish to Live', 'Testing to compare renditions of last versions');
            test.NavigatetoATSStatusCheckerPageOf(chronid, 'live');
            test.ClickButtonInATSPage('ATS Reprocess');
            test.WaitForATSFile('ATS Output File');
            updatedXml = test.GetXMLValues('vertical promo module', test.GetXML(chronid, 'live'));

        });
        describe('Update Scenario', () => {
            before(() => {
                test.LaunchApp();
                test.SearchFor(null, chronid, 'Global Search', null);
                browser.pause(3000);
                test.SelectMoreActionsMenuItem('Asset History');
                test.CheckoutAndEditTheAsset();
                test.SaveOrPublishTheAsset('Publish to Live', 'Reinstate - testing to compare renditions of PB1 & PB2');

                test.NavigatetoATSStatusCheckerPageOf(chronid, 'live');
                test.ClickButtonInATSPage('ATS Reprocess');
                test.WaitForATSFile('ATS Output File');
                //Parse the XML
                xml2 = test.GetXMLValues('vertical promo module', test.GetXML(chronid, 'live'));

                for (var property in updatedXml) {
                    if (property.toString().startsWith('iconic_overlay_title_')) {
                        overlayCount = overlayCount + 1;
                    }
                }
            });

            //assertions
            it('Verify data after edit/update the existing section in Vertical module', () => {
               // expect(updatedXml['image_source_chronic_id']).to.be.true;
                expect(testAssetProps.buttontext).to.equal(updatedXml['button_label']);
                expect(updatedXml['button_link_chronic_id']).to.be.true;
                expect(testAssetProps.introtext).to.equal(updatedXml['intro_text']);
                expect(testAssetProps.descriptiontext).to.equal(updatedXml['description_text']);
            });

            it('Verify data after add/update overlays the existing section in Vertical module', () => {
                expect(testAssetProps.iconicoverlays[0].iconicoverlaystitle).to.equal(updatedXml['iconic_overlay_title_1']);
                expect(testAssetProps.iconicoverlays[0].iconicoverlayslinktext).to.equal(updatedXml['iconic_overlay_text_1']);
                expect(testAssetProps.iconicoverlays[0].iconicoverlaysdescriptiontext).to.equal(xml2['iconic_overlay_description_text_1']);
                expect(updatedXml['icon_chronic_id_1' + overlayCount]).to.be.true;
                expect(updatedXml['link_chronic_id_1' + overlayCount]).to.be.true;

                expect(testAssetProps.iconicoverlays[1].iconicoverlaystitle).to.equal(updatedXml['iconic_overlay_title_' + overlayCount]);
                expect(testAssetProps.iconicoverlays[1].iconicoverlayslinktext).to.equal(updatedXml['iconic_overlay_text_' + overlayCount]);
                expect(testAssetProps.iconicoverlays[1].iconicoverlaysdescriptiontext).to.equal(updatedXml['iconic_overlay_description_text_' + overlayCount]);
                expect(updatedXml['icon_chronic_id_' + overlayCount]).to.be.true;
                expect(updatedXml['link_chronic_id_' + overlayCount]).to.be.true;

            });
            //#region module data assertions

            it('image_alt_text of both xml should be same', () => {
                expect(xml1['image_alt_text']).to.equal(xml2['image_alt_text']);
            });
            it('intro_text of both xml should be same', () => {
                expect(xml1['intro_text']).to.equal(xml2['intro_text']);
            });
            it('button_label of both xml should be same', () => {
                expect(xml1['button_label']).to.equal(xml2['button_label']);
            });
            it('button_link_view of both xml should be same', () => {
                expect(xml1['button_link_view']).to.equal(xml2['button_link_view']);
            });
            it('description_text of both xml should be same', () => {
                expect(xml1['description_text']).to.equal(xml2['description_text']);
            });
            it('image_source directive of both xml should be same', () => {
                expect(xml1['image_source_directive']).to.equal(xml2['image_source_directive']);
            });
            it('image_source object_type of both xml should be same', () => {
                expect(xml1['image_source_object_type']).to.equal(xml2['image_source_object_type']);
            });
            it('image_source path of both xml should be same', () => {
                expect(xml1['image_source_path']).to.equal(xml2['image_source_path']);
            });
            it('image_source alt of both xml should be same', () => {
                expect(xml1['image_source_alt']).to.equal(xml2['image_source_alt']);
            });
            it('image_source chronic_id of pb1 xml should be exists', () => {
                expect(xml1['image_source_chronic_id']).to.be.true;
            });
            it('image_source chronic_id of pb2 xml should be exists', () => {
                expect(xml2['image_source_chronic_id']).to.be.true;
            });

            it('button_link directive of both xml should be same', () => {
                expect(xml1['button_link_directive']).to.equal(xml2['button_link_directive']);
            });
            it('button_link object_type of both xml should be same', () => {
                expect(xml1['button_link_object_type']).to.equal(xml2['button_link_object_type']);
            });
            it('button_link chronic_id of pb1 xml should be exists', () => {
                expect(xml1['button_link_chronic_id']).to.be.true;
            });
            it('button_link chronic_id of pb2 xml should be exists', () => {
                expect(xml2['button_link_chronic_id']).to.be.true;
            });

            //iconic_overlays assertions
            it('iconic_overlays of both xml should be same', () => {
                overlayCount=overlayCount-1;
                while (overlayCount > 0) {
                    expect(xml1['iconic_overlay_title_' + overlayCount]).to.equal(xml2['iconic_overlay_title_' + overlayCount]);
                    expect(xml1['iconic_overlay_text_' + overlayCount]).to.equal(xml2['iconic_overlay_text_' + overlayCount]);
                    expect(xml1['iconic_overlay_description_text_' + overlayCount]).to.equal(xml2['iconic_overlay_description_text_' + overlayCount]);
                    expect(xml1['iconic_overlay_link_view_' + overlayCount]).to.equal(xml2['iconic_overlay_link_view_' + overlayCount]);
                    expect(xml1['icon_directive_' + overlayCount]).to.equal(xml2['icon_directive_' + overlayCount]);
                    expect(xml1['icon_object_type_' + overlayCount]).to.equal(xml2['icon_object_type_' + overlayCount]);
                    expect(xml1['icon_path_' + overlayCount]).to.equal(xml2['icon_path_' + overlayCount]);
                    expect(xml1['icon_alt_' + overlayCount]).to.equal(xml2['icon_alt_' + overlayCount]);
                    expect(xml1['link_directive_' + overlayCount]).to.equal(xml2['link_directive_' + overlayCount]);
                    expect(xml1['link_object_type_' + overlayCount]).to.equal(xml2['link_object_type_' + overlayCount]);
                    expect(xml1['icon_chronic_id_' + overlayCount]).to.be.true;
                    expect(xml2['icon_chronic_id_' + overlayCount]).to.be.true;
                    expect(xml1['link_chronic_id_' + overlayCount]).to.be.true;
                    expect(xml2['link_chronic_id_' + overlayCount]).to.be.true;

                    overlayCount = overlayCount - 1;
                }
            });
        });
    });
});
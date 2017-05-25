var test = require('./../../../../common/functions/functions');
var smTestData = require('./../../../../data/sm.assets');
//var pb1xml = require('./../../../../data/sm-pb1-xmls/sponsorboxes_allfields.xml');

describe('XML validations for updated sponsorbox Module', () => {

    var testAssetProps = smTestData.editeditorialModule;
    // var testAssetName = testAssetProps.moduleName;
    //dev01
    var chronid = '091e9c5e805991d4';
    // var chronid = '091e9c5e809a2677';
    var xml2 = {};
    var xml1 = {};
    var updatedXml = {};
    var linksCount = 0, bodyimgCount = 0, descCount=0;
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

            test.ConfigureModule('editeditorialmodule', testAssetProps);
            xml1 = test.GetXMLValues('editorial module', test.GetXML(chronid, 'live'));

            test.SaveOrPublishTheAsset('Publish to Live', 'Testing to compare renditions of last versions');
            test.NavigatetoATSStatusCheckerPageOf(chronid, 'live');
            test.ClickButtonInATSPage('ATS Reprocess');
            test.WaitForATSFile('ATS Output File');
            updatedXml = test.GetXMLValues('editorial module', test.GetXML(chronid, 'live'));

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
                xml2 = test.GetXMLValues('editorial module', test.GetXML(chronid, 'live'));
                for (var property in updatedXml) {
                    if (property.toString().startsWith('link_text_')) {
                        linksCount = linksCount + 1;
                    }
                    if (property.toString().startsWith('body_image_override_text_')) {
                        bodyimgCount = bodyimgCount + 1;
                    }
                    if (property.toString().startsWith('description_text_')) {
                        descCount = descCount + 1;
                    }

                }
            });
            it('Verify data after edit/update the existing section in editorial module', () => {
                expect(testAssetProps.moduletitle).to.equal(updatedXml['module_title']);
                expect(updatedXml['module_link_chronic_id']).to.be.true;

                //links
                expect(testAssetProps.modulelinks[0].modulelinkslinktext).to.equal(updatedXml['link_text_1']);
                expect(testAssetProps.modulelinks[0].modulelinksactiontext).to.equal(updatedXml['action_text_1']);
                expect(updatedXml['link_url_chronic_id_1']).to.be.true;
                expect(updatedXml['link_source_icon_chronic_id_1']).to.be.true;

                expect(testAssetProps.modulelinks[1].modulelinkslinktext).to.equal(updatedXml['link_text_' + linksCount]);
                expect(testAssetProps.modulelinks[1].modulelinksactiontext).to.equal(updatedXml['action_text_' + linksCount]);
                expect(updatedXml['link_url_chronic_id_' + linksCount]).to.be.true;
                expect(updatedXml['link_source_icon_chronic_id_' + linksCount]).to.be.true;

                //description
                expect(testAssetProps.descriptions[0].description).to.equal(updatedXml['description_text_1']);
                expect(testAssetProps.descriptions[1].description).to.equal(updatedXml['description_text_' + descCount]);
                //Link Images
                expect(updatedXml['body_image_source_chronic_id_1']).to.be.true;
                expect(updatedXml['body_image_link_chronic_id_1']).to.be.true;
                expect(testAssetProps.linkedimages[0].OverrideText).to.equal(updatedXml['body_image_override_text_1']);

                expect(updatedXml['body_image_source_chronic_id_' + bodyimgCount]).to.be.true;
                expect(updatedXml['body_image_link_chronic_id_' + bodyimgCount]).to.be.true;
                expect(testAssetProps.linkedimages[1].OverrideText).to.equal(updatedXml['body_image_override_text_' + bodyimgCount]);
            });

            //module data
            it('module_title of both xmls should be same', () => {
                expect(xml1['module_title'].length).to.not.eql(0);
                expect(xml2['module_title'].length).to.not.eql(0);
            });
            it('module_link_view of both xmls should be same', () => {
                expect(xml1['module_link_view']).to.equal(xml2['module_link_view']);
            });
            it('module_link directive of both xmls should be same', () => {
                expect(xml1['module_link_directive']).to.equal(xml2['module_link_directive']);
            });
            it('module_link object_type of both xmls should be same', () => {
                expect(xml1['module_link_object_type']).to.equal(xml2['module_link_object_type']);
            });
            it('module_link_wbmd_lookup_type of both xmls should be same', () => {
                expect(xml1['module_link_wbmd_lookup_type']).to.equal(xml2['module_link_wbmd_lookup_type']);
            });
            it('module_link wbmd_storage_value of both xmls should be same', () => {
                expect(xml1['module_link_wbmd_storage_value']).to.equal(xml2['module_link_wbmd_storage_value']);
            });
            it('module_link chronic_id of pb1 xml should be true', () => {
                expect(xml1['module_link_chronic_id']).to.be.true;
            });
            it('module_link chronic_id of pb2 xml should be true', () => {
                expect(xml2['module_link_chronic_id']).to.be.true;
            });

            //links assertions
            it('module data links should be same in both xmls', () => {
                linksCount = linksCount - 1
                while (linksCount > 0) {
                    expect(xml1['link_text_' + linksCount]).to.equal(xml2['link_text_' + linksCount]);
                    expect(xml1['action_text_' + linksCount]).to.equal(xml2['action_text_' + linksCount]);
                    expect(xml1['link_link_view_' + linksCount]).to.equal(xml2['link_link_view_' + linksCount]);
                    expect(xml1['link_url_chronic_id_' + linksCount]).to.be.true;
                    expect(xml2['link_url_chronic_id_' + linksCount]).to.be.true;
                    expect(xml1['link_url_directive_' + linksCount]).to.equal(xml2['link_url_directive_' + linksCount]);
                    expect(xml1['link_url_object_type_' + linksCount]).to.equal(xml2['link_url_object_type_' + linksCount]);
                    expect(xml1['link_url_wbmd_lookup_type_' + linksCount]).to.equal(xml2['link_url_wbmd_lookup_type_' + linksCount]);
                    expect(xml1['link_source_icon_chronic_id_' + linksCount]).to.be.true;
                    expect(xml2['link_source_icon_chronic_id_' + linksCount]).to.be.true;
                    expect(xml1['link_source_icon_directive_' + linksCount]).to.equal(xml2['link_source_icon_directive_' + linksCount]);
                    expect(xml1['link_source_icon_object_type_' + linksCount]).to.equal(xml2['link_source_icon_object_type_' + linksCount]);
                    expect(xml1['link_source_icon_wbmd_lookup_type_' + linksCount]).to.equal(xml2['link_source_icon_wbmd_lookup_type_' + linksCount]);
                    expect(xml1['link_source_icon_path_' + linksCount]).to.equal(xml2['link_source_icon_path_' + linksCount]);
                    expect(xml1['link_source_icon_alt_' + linksCount]).to.equal(xml2['link_source_icon_alt_' + linksCount]);
                    linksCount = linksCount - 1;
                }
            });

            it('description text should be same in both xmls', () => {
                expect(xml1['description_text_1']).to.equal(xml2['description_text_1']);
            });

            //body_image assertions
            it('body_image all attributes should be same in both xmls', () => {
                bodyimgCount = bodyimgCount - 1;
                while (bodyimgCount > 0) {
                    expect(xml1['body_image_override_text_' + bodyimgCount]).to.equal(xml2['body_image_override_text_' + bodyimgCount]);
                    expect(xml1['body_image_link_view_' + bodyimgCount]).to.equal(xml2['body_image_link_view_' + bodyimgCount]);
                    expect(xml1['body_image_align_' + bodyimgCount]).to.equal(xml2['body_image_align_' + bodyimgCount]);
                    expect(xml1['body_image_source_chronic_id_' + bodyimgCount]).to.be.true;
                    expect(xml2['body_image_source_chronic_id_' + bodyimgCount]).to.be.true;
                    expect(xml1['body_image_source_directive_' + bodyimgCount]).to.equal(xml2['body_image_source_directive_' + bodyimgCount]);
                    expect(xml1['body_image_source_object_type_' + bodyimgCount]).to.equal(xml2['body_image_source_object_type_' + bodyimgCount]);
                    expect(xml1['body_image_source_wbmd_lookup_type_' + bodyimgCount]).to.equal(xml2['body_image_source_wbmd_lookup_type_' + bodyimgCount]);
                    expect(xml1['body_image_link_chronic_id_' + bodyimgCount]).to.be.true;
                    expect(xml2['body_image_link_chronic_id_' + bodyimgCount]).to.be.true;
                    expect(xml1['body_image_source_wbmd_storage_value_' + bodyimgCount]).to.equal(xml2['body_image_source_wbmd_storage_value_' + bodyimgCount]);
                    expect(xml1['body_image_source_path_' + bodyimgCount]).to.equal(xml2['body_image_source_path_' + bodyimgCount]);
                    expect(xml1['body_image_source_alt_' + bodyimgCount]).to.equal(xml2['body_image_source_alt_' + bodyimgCount]);
                    expect(xml1['body_image_link_directive_' + bodyimgCount]).to.equal(xml2['body_image_link_directive_' + bodyimgCount]);
                    expect(xml1['body_image_link_object_type_' + bodyimgCount]).to.equal(xml2['body_image_link_object_type_' + bodyimgCount]);

                    bodyimgCount = bodyimgCount - 1;
                }
            });




        });
    });
});
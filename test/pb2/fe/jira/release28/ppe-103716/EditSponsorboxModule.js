var test = require('./../../../../common/functions/functions');
var smTestData = require('./../../../../data/sm.assets');
//var pb1xml = require('./../../../../data/sm-pb1-xmls/sponsorboxes_allfields.xml');

describe('XML validations for updated sponsorbox Module', () => {

    var testAssetProps = smTestData.editsponsorboxesModule;
    // var testAssetName = testAssetProps.moduleName;
    var chronid = '091e9c5e8158653a';
    var xml2 = {};
    var xml1 = {};
    var updatedXml = {};
    var body_copiesCount = 0, bodylinkCount = 0, lower_linksCount = 0;

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

            test.ConfigureModule('editsponsorboxmodule', testAssetProps);
            xml1 = test.GetXMLValues('sponsor box module', test.GetXML(chronid, 'live'));

            test.SaveOrPublishTheAsset('Publish to Live', 'Testing to compare renditions of last versions');
            test.NavigatetoATSStatusCheckerPageOf(chronid, 'live');
            test.ClickButtonInATSPage('ATS Reprocess');
            test.WaitForATSFile('ATS Output File');
            updatedXml = test.GetXMLValues('sponsor box module', test.GetXML(chronid, 'live'));
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
                xml2 = test.GetXMLValues('sponsor box module', test.GetXML(chronid, 'live'));
                for (var property in xml2) {
                    if (property.toString().startsWith('body_copy_body_copy_text_')) {
                        body_copiesCount = body_copiesCount + 1;
                    }
                    if (property.toString().startsWith('lower_link_lower_link_lower_link_text_')) {
                        lower_linksCount = lower_linksCount + 1;
                    }
                    if (property.toString().startsWith('body_link_body_link_text_')) {
                        bodylinkCount = bodylinkCount + 1;
                    }
                }
            });

            //assertions
            it('Verify data after edit/update the existing section in sponsorbox module', () => {
                expect(testAssetProps.overridetext).to.equal(updatedXml['sponsor_logo_override_text']);
                expect(updatedXml['sponsor_logo_source_chronic_id']).to.be.true;
                expect(updatedXml['sponsor_logo_link_chronic_id']).to.be.true;

                //header
                expect(testAssetProps.headertext).to.equal(updatedXml['header_text']);
                expect(updatedXml['header_link_chronic_id']).to.be.true;

                //body copies
                expect(assetProps.bodycopy[bodylinkCount - 1].bodycopyheadertext).to.equal(updatedXml['body_copy_body_copy_text_' + body_copiesCount]);
                expect(assetProps.bodycopy[bodylinkCount - 1].bodycopylink).to.equal(updatedXml['body_copy_body_copy_text_' + body_copiesCount]);

                //body image
                expect(testAssetProps.bodyimageoverridetext).to.equal(updatedXml["body_image_override_text"]);
                expect(updatedXml['body_image_source_chronic_id']).to.be.true;
                expect(updatedXml['body_image_link_chronic_id']).to.be.true;

                //body links
                expect(testAssetProps.bodylinks[bodylinkCount - 1].bulletson).to.equal(updatedXml["body_bullet"]);
                expect(testAssetProps.bodylinks[0].text).to.equal(updatedXml['body_link_body_link_text']);
                expect(updatedXml["body_link_link_chronic_id"]).to.be.true;

                //lower links
                expect(assetProps.lowerlinks[lower_linksCount - 1].text).to.equal(updatedXml['lower_link_lower_link_lower_link_text_' + lower_linksCount]);
                expect(updatedXml["lower_link_link_chronic_id_" + lower_linksCount]).to.be.true;

                expect(assetProps.lowerlinks[0].text).to.equal(updatedXml['lower_link_lower_link_lower_link_text_1']);
                expect(updatedXml["lower_link_link_chronic_id_1"]).to.be.true;

            });

            //#region module data assertions

            //sponsor logo tag
            it('sponsor_logo override_text of both xml should be same', () => {
                expect(xml1['sponsor_logo_override_text']).to.equal(xml2['sponsor_logo_override_text']);
            });
            it('sponsor_logo link_view of both xml should be same', () => {
                expect(xml1['sponsor_logo_link_view']).to.equal(xml2['sponsor_logo_link_view']);
            });
            it('sponsor_logo logo_source directive of both xml should be same', () => {
                expect(xml1['sponsor_logo_source_directive']).to.equal(xml2['sponsor_logo_source_directive']);
            });
            it('sponsor_logo_source object_type of both xml should be same', () => {
                expect(xml1['sponsor_logo_source_object_type']).to.equal(xml2['sponsor_logo_source_object_type']);
            });
            it('sponsor_logo_source wbmd_lookup_type of both xml should be same', () => {
                expect(xml1['sponsor_logo_source_wbmd_lookup_type']).to.equal(xml2['sponsor_logo_source_wbmd_lookup_type']);
            });
            it('sponsor_logo_source wbmd_storage_value of both xml should be same', () => {
                expect(xml1['sponsor_logo_source_wbmd_storage_value']).to.equal(xml2['sponsor_logo_source_wbmd_storage_value']);
            });
            it('sponsor_logo_source path of both xml should be same', () => {
                expect(xml1['sponsor_logo_source_path']).to.equal(xml2['sponsor_logo_source_path']);
            });
            it('sponsor_logo_source alt of both xml should be same', () => {
                expect(xml1['sponsor_logo_source_alt']).to.equal(xml2['sponsor_logo_source_alt']);
            });
            it('sponsor_logo_link directive of both xml should be same', () => {
                expect(xml1['sponsor_logo_link_directive']).to.equal(xml2['sponsor_logo_link_directive']);
            });
            it('sponsor_logo_link object_type of both xml should be same', () => {
                expect(xml1['sponsor_logo_link_object_type']).to.equal(xml2['sponsor_logo_link_object_type']);
            });
            it('sponsor_logo_link wbmd_lookup_type of both xml should be same', () => {
                expect(xml1['sponsor_logo_link_wbmd_lookup_type']).to.equal(xml2['sponsor_logo_link_wbmd_lookup_type']);
            });
            it('sponsor_logo_link wbmd_storage_value of both xml should be same', () => {
                expect(xml1['sponsor_logo_link_wbmd_storage_value']).to.equal(xml2['sponsor_logo_link_wbmd_storage_value']);
            });

            it('Verify sponsor_logo_source chronic_id exits in pb1 xml', () => {
                expect(xml1['sponsor_logo_source_chronic_id']).to.be.true;
            });
            it('Verify sponsor_logo_source chronic_id exits in pb2 xml', () => {
                expect(xml2['sponsor_logo_source_chronic_id']).to.be.true;
            });

            it('Verify sponsor_logo_link chronic_id exits in pb1 xml', () => {
                expect(xml1['sponsor_logo_link_chronic_id']).to.be.true;
            });
            it('Verify sponsor_logo_link chronic_id exits in pb2 xml', () => {
                expect(xml2['sponsor_logo_link_chronic_id']).to.be.true;
            });

            //header info tags
            it('header_text of both xml should be same', () => {
                expect(xml1['header_text']).to.equal(xml2['header_text']);
            });
            it('header_link_view of both xml should be same', () => {
                expect(xml1['header_link_view']).to.equal(xml2['header_link_view']);
            });
            it('header_link directive of both xml should be same', () => {
                expect(xml1['header_link_directive']).to.equal(xml2['header_link_directive']);
            });
            it('header_link object_type of both xml should be same', () => {
                expect(xml1['header_link_object_type']).to.equal(xml2['header_link_object_type']);
            });
            it('header_link wbmd_lookup_type of both xml should be same', () => {
                expect(xml1['header_link_wbmd_lookup_type']).to.equal(xml2['header_link_wbmd_lookup_type']);
            });
            it('header_link wbmd_storage_value of both xml should be same', () => {
                expect(xml1['header_link_wbmd_storage_value']).to.equal(xml2['header_link_wbmd_storage_value']);
            });
            it('Verify header_link chronic_id exits in pb1 xml', () => {
                expect(xml1['sponsor_logo_link_chronic_id']).to.be.true;
            });
            it('Verify header_link chronic_id exits in pb2 xml', () => {
                expect(xml2['sponsor_logo_link_chronic_id']).to.be.true;
            });

            //body_copies info
            it('body_copy body_copy_text  of both xmls should be same', () => {
                while (body_copiesCount > 0) {
                    expect(xml1['body_copy_body_copy_text_' + body_copiesCount]).to.equal(xml2['body_copy_body_copy_text_' + body_copiesCount]);
                    body_copiesCount = body_copiesCount - 1;
                }
            });
            it('body_copy body_copy_link_view  of both xmls should be same', () => {
                while (body_copiesCount > 0) {
                    expect(xml1['body_copy_body_copy_link_view_' + body_copiesCount]).to.equal(xml2['body_copy_body_copy_link_view_' + body_copiesCount]);
                    body_copiesCount = body_copiesCount - 1;
                }
            });
            it('body_copy body_copy_link directive  of both xmls should be same', () => {
                while (body_copiesCount > 0) {
                    expect(xml1['body_copy_body_copy_link_directive_' + body_copiesCount]).to.equal(xml2['body_copy_body_copy_link_directive_' + body_copiesCount]);
                    body_copiesCount = body_copiesCount - 1;
                }
            });
            it('body_copy body_copy_link object_type  of both xmls should be same', () => {
                while (body_copiesCount > 0) {
                    expect(xml1['body_copy_body_copy_link_object_type_' + body_copiesCount]).to.equal(xml2['body_copy_body_copy_link_object_type_' + body_copiesCount]);
                    body_copiesCount = body_copiesCount - 1;
                }
            });

            //body_image info
            it('body_image override_text of both xml should be same', () => {
                expect(xml1['body_image_override_text']).to.equal(xml2['body_image_override_text']);
            });
            it('body_image_link_view of both xml should be same', () => {
                expect(xml1['body_image_link_view']).to.equal(xml2['body_image_link_view']);
            });
            it('body_image_align of both xml should be same', () => {
                expect(xml1['body_image_align']).to.equal(xml2['body_image_align']);
            });
            it('body_image_source directive of both xml should be same', () => {
                expect(xml1['body_image_source_directive']).to.equal(xml2['body_image_source_directive']);
            });
            it('body_image_source object_type of both xml should be same', () => {
                expect(xml1['body_image_source_object_type']).to.equal(xml2['body_image_source_object_type']);
            });
            it('body_image_source wbmd_lookup_type of both xml should be same', () => {
                expect(xml1['body_image_source_wbmd_lookup_type']).to.equal(xml2['body_image_source_wbmd_lookup_type']);
            });
            it('body_image_source wbmd_storage_value of both xml should be same', () => {
                expect(xml1['body_image_source_wbmd_storage_value']).to.equal(xml2['body_image_source_wbmd_storage_value']);
            });
            it('body_image_source path of both xml should be same', () => {
                expect(xml1['body_image_source_path']).to.equal(xml2['body_image_source_path']);
            });
            it('body_image_source alt of both xml should be same', () => {
                expect(xml1['body_image_source_alt']).to.equal(xml2['body_image_source_alt']);
            });
            it('body_image_link directive of both xml should be same', () => {
                expect(xml1['body_image_link_directive']).to.equal(xml2['body_image_link_directive']);
            });
            it('body_image_link object_type of both xml should be same', () => {
                expect(xml1['body_image_link_object_type']).to.equal(xml2['body_image_link_object_type']);
            });
            it('Verify body_image_source chronic_id exits in pb1 xml', () => {
                expect(xml1['body_image_source_chronic_id']).to.be.true;
            });
            it('Verify body_image_source chronic_id exits in pb2 xml', () => {
                expect(xml2['body_image_source_chronic_id']).to.be.true;
            });
            it('Verify body_image_link chronic_id exits in pb1 xml', () => {
                expect(xml1['body_image_link_chronic_id']).to.be.true;
            });
            it('Verify body_image_link chronic_id exits in pb2 xml', () => {
                expect(xml2['body_image_link_chronic_id']).to.be.true;
            });

            //body_links info tags
            it('body_bullet of both xml should be same', () => {
                expect(xml1['body_bullet']).to.equal(xml2['body_bullet']);
            });

            it('body_linka all attributes of both xml should be same', () => {
                while (bodylinkCount > 0) {
                    expect(xml1['body_link_body_link_text_'+bodylinkCount]).to.equal(xml2['body_link_body_link_text_'+bodylinkCount]);
                    expect(xml1['body_link_body_link_link_view_'+bodylinkCount]).to.equal(xml2['body_link_body_link_link_view_'+bodylinkCount]);
                    expect(xml1['body_link_link_directive_'+bodylinkCount]).to.equal(xml2['body_link_link_directive_'+bodylinkCount]);
                    expect(xml1['body_link_link_object_type_'+bodylinkCount]).to.equal(xml2['body_link_link_object_type_'+bodylinkCount]);
                    expect(xml1['body_link_link_chronic_id_'+bodylinkCount]).to.be.true;
                    expect(xml1['body_link_link_chronic_id_'+bodylinkCount]).to.be.true;
                    bodylinkCount=bodylinkCount-1;
                }

            });


            //lower_links info
            it('link_display of both xml should be same', () => {
                expect(xml1['link_display']).to.equal(xml2['link_display']);
            });
            it('link_display both xml should be same', () => {
                expect(xml1['link_bullet']).to.equal(xml2['link_bullet']);
            });

            it('lower_link lower_link_text of both xmls should be same', () => {
                while (lower_linksCount > 0) {
                    expect(xml1['lower_link_lower_link_lower_link_text_' + lower_linksCount]).to.equal(xml2['lower_link_lower_link_lower_link_text_' + lower_linksCount]);
                    lower_linksCount = lower_linksCount - 1;
                }
            });
            it('lower_link lower_link_link_view of both xmls should be same', () => {
                while (lower_linksCount > 0) {
                    expect(xml1['lower_link_lower_link_lower_link_link_view_' + lower_linksCount]).to.equal(xml2['lower_link_lower_link_lower_link_link_view_' + lower_linksCount]);
                    lower_linksCount = lower_linksCount - 1;
                }
            });

            it('lower_link lower_link_link_directive_ of both xmls should be same', () => {
                while (lower_linksCount > 0) {
                    expect(xml1['lower_link_lower_link_lower_lower_link_link_directive_' + lower_linksCount]).to.equal(xml2['lower_link_lower_link_lower_lower_link_link_directive_' + lower_linksCount]);
                    lower_linksCount = lower_linksCount - 1;
                }
            });

            it('lower_link lower_link_link object_type of both xmls should be same', () => {
                while (lower_linksCount > 0) {
                    expect(xml1['lower_link_lower_link_lower_lower_link_link_object_type_' + lower_linksCount]).to.equal(xml2['lower_link_lower_link_lower_lower_link_link_object_type_' + lower_linksCount]);
                    lower_linksCount = lower_linksCount - 1;
                }
            });

            it('Verify lower_link_link chronic_id exits in pb1 xml', () => {
                while (lower_linksCount > 0) {
                    expect(xml1['lower_link_link_chronic_id_' + lower_linksCount]).to.be.true;
                    lower_linksCount = lower_linksCount - 1;
                }
            });
            it('Verify lower_link_link chronic_id exits in pb2 xml', () => {
                while (lower_linksCount > 0) {
                    expect(xml2['lower_link_link_chronic_id_' + lower_linksCount]).to.be.true;
                    lower_linksCount = lower_linksCount - 1;
                }
            });
        });
    });

});
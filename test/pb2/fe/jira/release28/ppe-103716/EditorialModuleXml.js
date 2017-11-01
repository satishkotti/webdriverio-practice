var test = require('./../../../../common/functions/functions');
var smTestData = require('./../../../../data/sm.assets');

describe('XML validations for Editorial Module With All Fields', () => {

    var testAssetProps = smTestData.EditorialModule;
    var testAssetName = testAssetProps.moduleName;

    before(() => {
        //Launch App
        test.LaunchAppAndLogin();
    });


    //Create Scenario
    describe.only('Creation Scenario', () => {
        var xml1 = {}; //pb1 xml
        var xml2 = {}; //pb2 xml
        var linksCount = 0;
        var bodyimgCount = 0;
        before(() => {

            xml1 = test.GetXMLValues('Editorial Module', test.GetXML('\\test\\pb2\\data\\SampleData\\EditorialModule\\pb1_Allfields.xml', 'live', 'FILE'));

            var chronid = test.Create('Shared Module', testAssetProps);
            test.ConfigureModule('editorial module', testAssetProps);
            test.SaveOrPublishTheAsset('Publish to Live', 'Testing to compare renditions of PB1 & PB2');
            test.NavigatetoATSStatusCheckerPageOf(chronid, 'live');
            test.ClickButtonInATSPage('ATS Reprocess');
            test.WaitForATSFile('ATS Output File');

            //var xml = test.GetXML('091e9c5e815a195e', 'live')
            // xml1 = test.GetXMLValues('sponsor box module', pb1xml);

            for (var property in xml1) {
                if (property.toString().startsWith('link_text_')) {
                    linksCount = linksCount + 1;
                }
                if (property.toString().startsWith('body_image_override_text_')) {
                    bodyimgCount = bodyimgCount + 1;
                }
            }

            xml2 = test.GetXMLValues('Editorial Module', test.GetXML(chronid, 'live'));
        });

        //module settings assertions
        it('Verify Module Settings chronic_id exits or not in pb1 xml', () => {
            expect(xml1['chronic_id']).to.be.true;
        });
        it('Verify Module Settings chronic_id exits or not in pb2 xml', () => {
            expect(xml2['chronic_id']).to.be.true;
        });
        it('Verify title in PB1 XML', () => {
            expect(xml1['title'].length).to.not.eql(0);
        });
        it('Verify title in PB2 XML', () => {
            expect(xml2['title'].length).to.not.eql(0);
        });
        it('Verify object_name in PB1 XML', () => {
            expect(xml2['object_name'].length).to.not.eql(0);
        });

        it('object_type of both xmls should be same', () => {
            expect(xml1['object_type']).to.equal(xml2['object_type']);
        });

        it('wbmd_pb_module_category of both xmls should be same', () => {
            expect(xml2['wbmd_pb_module_category'].length).to.eql(0);
        });

        it('wbmd_pb_dyn_module_category of both xmls should be same', () => {
            expect(xml1['wbmd_pb_dyn_module_category']).to.equal(xml2['wbmd_pb_dyn_module_category']);
        });

        it('wbmd_pb_module_label1 of both xmls should be same', () => {
            expect(xml2['wbmd_pb_module_label1'].includes('missed on xml')).to.eql(true);
        });

        it('wbmd_pb_module_label2 of both xmls should be same', () => {
            expect(xml2['wbmd_pb_module_label2'].includes('missed on xml')).to.eql(true);
        });

        it('wbmd_pb_module_sp_program of both xmls should be same', () => {
            expect(xml1['wbmd_pb_module_sp_program']).to.equal(xml2['wbmd_pb_module_sp_program']);
        });

        it('wbmd_pb_module_tier of both xmls should be same', () => {
            expect(xml1['wbmd_pb_module_tier']).to.equal(xml2['wbmd_pb_module_tier']);
        });

        it('wbmd_pb_cache_duration of both xmls should be same', () => {
            expect(xml1['wbmd_pb_cache_duration'].length).to.not.eql(0);
            expect(xml2['wbmd_pb_cache_duration'].length).to.not.eql(0);
        });

        it('wbmd_c_channel_ids_group of both xmls should be same', () => {
            expect(xml1['wbmd_c_channel_ids_group']).to.equal(xml2['wbmd_c_channel_ids_group']);
        });

        it('wbmd_program_group of both xmls should be same', () => {
            expect(xml1['wbmd_program_group']).to.equal(xml2['wbmd_program_group']);
        });
        it('wbmd_pb_asset_css path of both xmls should be same', () => {
            expect(xml1['wbmd_pb_asset_css_path'].length).to.not.eql(0);
            expect(xml2['wbmd_pb_asset_css_path'].length).to.not.eql(0);
        });
        it('wbmd_pb_asset_css object_type of both xmls should be same', () => {
            expect(xml2['wbmd_pb_asset_css_object_type'].includes('missed on xml')).to.eql(true);
        });
        it('wbmd_pb_module_xsl path of both xmls should be same', () => {
            expect(xml1['wbmd_pb_module_xsl_path'].length).to.not.eql(0);
            expect(xml2['wbmd_pb_module_xsl_path'].length).to.not.eql(0);
        });
        it('wbmd_pb_module_xsl object_type of both xmls should be same', () => {
            expect(xml2['wbmd_pb_module_xsl_object_type'].includes('missed on xml')).to.eql(true);
        });

        it('wbmd_pb_owner_page_id path object_type of both xmls should be same', () => {
            expect(xml1['wbmd_pb_owner_page_id_path'].length).to.not.eql(0);
            expect(xml2['wbmd_pb_owner_page_id_path'].length).to.not.eql(0);
        });
        it('wbmd_pb_owner_page_id object_type object_type of both xmls should be same', () => {
            expect(xml1['wbmd_pb_owner_page_id_object_type']).to.equal(xml2['wbmd_pb_owner_page_id_object_type']);
        });
        it('dnn_id object_type of both xmls should be same', () => {
            expect(xml1['dnn_id']).to.equal(xml2['dnn_id']);
        });
        it('class object_type of both xmls should be same', () => {
            expect(xml1['class']).to.equal(xml2['class']);
        });

        //module data
        it('module_title of both xmls should be same', () => {
            expect(xml1['module_title']).to.equal(xml2['module_title']);
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
        /*it('module_link_wbmd_lookup_type of both xmls should be same', () => {
            expect(xml1['module_link_wbmd_lookup_type']).to.equal(xml2['module_link_wbmd_lookup_type']);
        });
        it('module_link wbmd_storage_value of both xmls should be same', () => {
            expect(xml1['module_link_wbmd_storage_value']).to.equal(xml2['module_link_wbmd_storage_value']);
        });*/
        it('module_link chronic_id of pb1 xml should be true', () => {
            expect(xml1['module_link_chronic_id']).to.be.true;
        });
        it('module_link chronic_id of pb2 xml should be true', () => {
            expect(xml2['module_link_chronic_id']).to.be.true;
        });

        //links assertions
        it('module data links should be same in both xmls', () => {
            while (linksCount > 0) {
                expect(xml1['link_text_' + linksCount]).to.equal(xml2['link_text_' + linksCount]);
                expect(xml1['action_text_' + linksCount]).to.equal(xml2['action_text_' + linksCount]);
                expect(xml1['link_link_view_' + linksCount]).to.equal(xml2['link_link_view_' + linksCount]);
                expect(xml1['link_url_chronic_id_' + linksCount]).to.be.true;
                expect(xml2['link_url_chronic_id_' + linksCount]).to.be.true;
                expect(xml1['link_url_directive_' + linksCount]).to.equal(xml2['link_url_directive_' + linksCount]);
                expect(xml1['link_url_object_type_' + linksCount]).to.equal(xml2['link_url_object_type_' + linksCount]);
                expect(xml1['link_source_icon_chronic_id_' + linksCount]).to.be.true;
                expect(xml2['link_source_icon_chronic_id_' + linksCount]).to.be.true;
                expect(xml1['link_source_icon_directive_' + linksCount]).to.equal(xml2['link_source_icon_directive_' + linksCount]);
                expect(xml1['link_source_icon_object_type_' + linksCount]).to.equal(xml2['link_source_icon_object_type_' + linksCount]);
                expect(xml1['link_source_icon_wbmd_lookup_type_' + linksCount]).to.equal(xml2['link_source_icon_wbmd_lookup_type_' + linksCount]);
                expect(xml2['link_source_icon_path_' + linksCount].length).to.not.eql(0);
                linksCount = linksCount - 1;
            }
        });

        it('description text should be same in both xmls', () => {
            expect(xml1['description_text_1'].length).to.not.eql(0);
            expect(xml2['description_text_1'].length).to.not.eql(0);
        });

        //body_image assertions
        it('body_image all attributes should be same in both xmls', () => {
            while (bodyimgCount > 0) {
                expect(xml1['body_image_override_text_' + bodyimgCount].length).to.not.eql(0);
                expect(xml2['body_image_override_text_' + bodyimgCount].length).to.not.eql(0);
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
                expect(xml1['body_image_source_path_' + bodyimgCount].length).to.not.eql(0);
                expect(xml2['body_image_source_path_' + bodyimgCount].length).to.not.eql(0);
                expect(xml1['body_image_source_alt_' + bodyimgCount]).to.equal(xml2['body_image_source_alt_' + bodyimgCount]);
                expect(xml1['body_image_link_directive_' + bodyimgCount]).to.equal(xml2['body_image_link_directive_' + bodyimgCount]);
                expect(xml1['body_image_link_object_type_' + bodyimgCount]).to.equal(xml2['body_image_link_object_type_' + bodyimgCount]);

                bodyimgCount = bodyimgCount - 1;
            }
        });
    });
});



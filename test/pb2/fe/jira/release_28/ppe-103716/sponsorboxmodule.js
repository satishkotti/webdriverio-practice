var test = require('./../../../../common/functions/functions');
var smTestData = require('./../../../../data/sm.assets');
var pb1xml = require('./../../../../data/sm-pb1-xmls/sponsorboxes_allfields.xml');

describe('XML validations for Multiple Video Launch Module', () => {

    var testAssetProps = smTestData.sponsorboxesModule;
    var testAssetName = testAssetProps.moduleName;

    before(() => {
        //Launch App
        test.LaunchAppAndLogin();
    });

    //Create Scenario
    describe.only('Creation Scenario', () => {
        var xml1 = {}; //pb1 xml
        var xml2 = {}; //pb2 xml
        var body_copiesCount = 0, lower_linksCount = 0;
        before(() => {

            var chronid = test.Create('Shared Module', testAssetProps);
            test.ConfigureModule('sponsor box module', testAssetProps);
            test.SaveOrPublishTheAsset('Publish to Live', 'Testing to compare renditions of PB1 & PB2');
            test.NavigatetoATSStatusCheckerPageOf(chronid, 'live');
            test.ClickButtonInATSPage('ATS Reprocess');
            test.WaitForATSFile('ATS Output File');

            //var xml = test.GetXML('091e9c5e815a195e', 'live')
            xml1 = test.GetXMLValues('sponsor box module', pb1xml);
            for (var property in xml1) {
            if (property.toString().startsWith('body_copy_body_copy_text_')) {
                body_copiesCount = body_copiesCount + 1;
            }
            if (property.toString().startsWith('lower_link_lower_link_lower_link_text_')) {
                lower_linksCount = lower_linksCount + 1;
            }
        }
        xml2 = test.GetXMLValues('sponsor box module', test.GetXML(chronid, 'live'));
        });

        //module settings assertions
    it('Verify Module Settings chronic_id exits or not in pb1 xml', () => {
        expect(xml1['chronic_id']).to.be.true;
    });
    it('Verify Module Settings chronic_id exits or not in pb2 xml', () => {
        expect(xml2['chronic_id']).to.be.true;
    });
    it('title of both xmls should be same', () => {
        expect(xml1['title']).to.equal(xml2['title']);
    });
    it('object_name of both xmls should be same', () => {
        expect(xml1['object_name']).to.equal(xml2['object_name']);
    });

    it('object_type of both xmls should be same', () => {
        expect(xml1['object_type']).to.equal(xml2['object_type']);
    });

    it('wbmd_pb_module_category of both xmls should be same', () => {
        expect(xml1['wbmd_pb_module_category']).to.equal(xml2['wbmd_pb_module_category']);
    });

    it('wbmd_pb_dyn_module_category of both xmls should be same', () => {
        expect(xml1['wbmd_pb_dyn_module_category']).to.equal(xml2['wbmd_pb_dyn_module_category']);
    });

    it('wbmd_pb_module_label1 of both xmls should be same', () => {
        expect(xml1['wbmd_pb_module_label1']).to.equal(xml2['wbmd_pb_module_label1']);
    });

    it('wbmd_pb_module_label2 of both xmls should be same', () => {
        expect(xml1['wbmd_pb_module_label2']).to.equal(xml2['wbmd_pb_module_label2']);
    });

    it('wbmd_pb_module_sp_program of both xmls should be same', () => {
        expect(xml1['wbmd_pb_module_sp_program']).to.equal(xml2['wbmd_pb_module_sp_program']);
    });

    it('wbmd_pb_module_tier of both xmls should be same', () => {
        expect(xml1['wbmd_pb_module_tier']).to.equal(xml2['wbmd_pb_module_tier']);
    });

    it('wbmd_pb_cache_duration of both xmls should be same', () => {
        expect(xml1['wbmd_pb_cache_duration']).to.equal(xml2['wbmd_pb_cache_duration']);
    });

    it('wbmd_c_channel_ids_group of both xmls should be same', () => {
        expect(xml1['wbmd_c_channel_ids_group']).to.equal(xml2['wbmd_c_channel_ids_group']);
    });

    it('wbmd_program_group of both xmls should be same', () => {
        expect(xml1['wbmd_program_group']).to.equal(xml2['wbmd_program_group']);
    });
    it('wbmd_pb_asset_css path of both xmls should be same', () => {
        expect(xml1['wbmd_pb_asset_css_path']).to.equal(xml2['wbmd_pb_asset_css_path']);
    });
    it('wbmd_pb_asset_css object_type of both xmls should be same', () => {
        expect(xml1['wbmd_pb_asset_css_object_type']).to.equal(xml2['wbmd_pb_asset_css_object_type']);
    });
    it('wbmd_pb_module_xsl path of both xmls should be same', () => {
        expect(xml1['wbmd_pb_module_xsl_path']).to.equal(xml2['wbmd_pb_module_xsl_path']);
    });
    it('wbmd_pb_module_xsl object_type of both xmls should be same', () => {
        expect(xml1['wbmd_pb_module_xsl_object_type']).to.equal(xml2['wbmd_pb_module_xsl_object_type']);
    });

    it('wbmd_pb_owner_page_id path object_type of both xmls should be same', () => {
        expect(xml1['wbmd_pb_owner_page_id_path']).to.equal(xml2['wbmd_pb_owner_page_id_path']);
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

    //#region module data assertions

    //sponsor logo tag
    it('sponsor_logo override_text of both xml should be same', () => {
        expect(xml['sponsor_logo_override_text']).to.equal(xml2['sponsor_logo_override_text']);
    });
    it('sponsor_logo link_view of both xml should be same', () => {
        expect(xml['sponsor_logo_link_view']).to.equal(xml2['sponsor_logo_link_view']);
    });
    it('sponsor_logo logo_source directive of both xml should be same', () => {
        expect(xml['sponsor_logo_source_directive']).to.equal(xml2['sponsor_logo_source_directive']);
    });
    it('sponsor_logo_source object_type of both xml should be same', () => {
        expect(xml['sponsor_logo_source_object_type']).to.equal(xml2['sponsor_logo_source_object_type']);
    });
    it('sponsor_logo_source wbmd_lookup_type of both xml should be same', () => {
        expect(xml['sponsor_logo_source_wbmd_lookup_type']).to.equal(xml2['sponsor_logo_source_wbmd_lookup_type']);
    });
    it('sponsor_logo_source wbmd_storage_value of both xml should be same', () => {
        expect(xml['sponsor_logo_source_wbmd_storage_value']).to.equal(xml2['sponsor_logo_source_wbmd_storage_value']);
    });
    it('sponsor_logo_source path of both xml should be same', () => {
        expect(xml['sponsor_logo_source_path']).to.equal(xml2['sponsor_logo_source_path']);
    });
    it('sponsor_logo_source alt of both xml should be same', () => {
        expect(xml['sponsor_logo_source_alt']).to.equal(xml2['sponsor_logo_source_alt']);
    });
    it('sponsor_logo_link directive of both xml should be same', () => {
        expect(xml['sponsor_logo_link_directive']).to.equal(xml2['sponsor_logo_link_directive']);
    });
    it('sponsor_logo_link object_type of both xml should be same', () => {
        expect(xml['sponsor_logo_link_object_type']).to.equal(xml2['sponsor_logo_link_object_type']);
    });
    it('sponsor_logo_link wbmd_lookup_type of both xml should be same', () => {
        expect(xml['sponsor_logo_link_wbmd_lookup_type']).to.equal(xml2['sponsor_logo_link_wbmd_lookup_type']);
    });
    it('sponsor_logo_link wbmd_storage_value of both xml should be same', () => {
        expect(xml['sponsor_logo_link_wbmd_storage_value']).to.equal(xml2['sponsor_logo_link_wbmd_storage_value']);
    });

    it('Verify sponsor_logo_source chronic_id exits in pb1 xml', () => {
        expect(xml['sponsor_logo_source_chronic_id']).to.be.true;
    });
    it('Verify sponsor_logo_source chronic_id exits in pb2 xml', () => {
        expect(xm2['sponsor_logo_source_chronic_id']).to.be.true;
    });

    it('Verify sponsor_logo_link chronic_id exits in pb1 xml', () => {
        expect(xml['sponsor_logo_link_chronic_id']).to.be.true;
    });
    it('Verify sponsor_logo_link chronic_id exits in pb2 xml', () => {
        expect(xm2['sponsor_logo_link_chronic_id']).to.be.true;
    });

    //header info tags
    it('header_text of both xml should be same', () => {
        expect(xml['header_text']).to.equal(xml2['header_text']);
    });
    it('header_link_view of both xml should be same', () => {
        expect(xml['header_link_view']).to.equal(xml2['header_link_view']);
    });
    it('header_link directive of both xml should be same', () => {
        expect(xml['header_link_directive']).to.equal(xml2['header_link_directive']);
    });
    it('header_link object_type of both xml should be same', () => {
        expect(xml['header_link_object_type']).to.equal(xml2['header_link_object_type']);
    });
    it('header_link wbmd_lookup_type of both xml should be same', () => {
        expect(xml['header_link_wbmd_lookup_type']).to.equal(xml2['header_link_wbmd_lookup_type']);
    });
    it('header_link wbmd_storage_value of both xml should be same', () => {
        expect(xml['header_link_wbmd_storage_value']).to.equal(xml2['header_link_wbmd_storage_value']);
    });
    it('Verify header_link chronic_id exits in pb1 xml', () => {
        expect(xml['sponsor_logo_link_chronic_id']).to.be.true;
    });
    it('Verify header_link chronic_id exits in pb2 xml', () => {
        expect(xm2['sponsor_logo_link_chronic_id']).to.be.true;
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
        expect(xml['body_image_override_text']).to.equal(xml2['body_image_override_text']);
    });
    it('body_image_link_view of both xml should be same', () => {
        expect(xml['body_image_link_view']).to.equal(xml2['body_image_link_view']);
    });
    it('body_image_align of both xml should be same', () => {
        expect(xml['body_image_align']).to.equal(xml2['body_image_align']);
    });
    it('body_image_source directive of both xml should be same', () => {
        expect(xml['body_image_source_directive']).to.equal(xml2['body_image_source_directive']);
    });
    it('body_image_source object_type of both xml should be same', () => {
        expect(xml['body_image_source_object_type']).to.equal(xml2['body_image_source_object_type']);
    });
    it('body_image_source wbmd_lookup_type of both xml should be same', () => {
        expect(xml['body_image_source_wbmd_lookup_type']).to.equal(xml2['body_image_source_wbmd_lookup_type']);
    });
    it('body_image_source wbmd_storage_value of both xml should be same', () => {
        expect(xml['body_image_source_wbmd_storage_value']).to.equal(xml2['body_image_source_wbmd_storage_value']);
    });
    it('body_image_source path of both xml should be same', () => {
        expect(xml['body_image_source_path']).to.equal(xml2['body_image_source_path']);
    });
    it('body_image_source alt of both xml should be same', () => {
        expect(xml['body_image_source_alt']).to.equal(xml2['body_image_source_alt']);
    });
    it('body_image_link directive of both xml should be same', () => {
        expect(xml['body_image_link_directive']).to.equal(xml2['body_image_link_directive']);
    });
    it('body_image_link object_type of both xml should be same', () => {
        expect(xml['body_image_link_object_type']).to.equal(xml2['body_image_link_object_type']);
    });
    it('Verify body_image_source chronic_id exits in pb1 xml', () => {
        expect(xml['body_image_source_chronic_id']).to.be.true;
    });
    it('Verify body_image_source chronic_id exits in pb2 xml', () => {
        expect(xm2['body_image_source_chronic_id']).to.be.true;
    });
    it('Verify body_image_link chronic_id exits in pb1 xml', () => {
        expect(xml['body_image_link_chronic_id']).to.be.true;
    });
    it('Verify body_image_link chronic_id exits in pb2 xml', () => {
        expect(xm2['body_image_link_chronic_id']).to.be.true;
    });

    //body_links info tags
    it('body_bullet of both xml should be same', () => {
        expect(xml['body_bullet']).to.equal(xml2['body_bullet']);
    });
    it('body_link body_link_text of both xml should be same', () => {
        expect(xml['body_link_body_link_text']).to.equal(xml2['body_link_body_link_text']);
    });
    it('body_link body_link_link_view of both xml should be same', () => {
        expect(xml['body_link_body_link_link_view']).to.equal(xml2['body_link_body_link_link_view']);
    });
    it('body_link_link directive of both xml should be same', () => {
        expect(xml['body_link_link_directive']).to.equal(xml2['body_link_link_directive']);
    });
    it('body_link_link object_type of both xml should be same', () => {
        expect(xml['body_link_link_object_type']).to.equal(xml2['body_link_link_object_type']);
    });
    it('Verify body_link_link chronic_id exits in pb1 xml', () => {
        expect(xml['body_link_link_chronic_id']).to.be.true;
    });
    it('Verify body_link_link chronic_id exits in pb2 xml', () => {
        expect(xm2['body_link_link_chronic_id']).to.be.true;
    });

    //lower_links info
    it('link_display of both xml should be same', () => {
        expect(xml['link_display']).to.equal(xml2['link_display']);
    });
    it('link_display both xml should be same', () => {
        expect(xml['link_bullet']).to.equal(xml2['link_bullet']);
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
            expect(xml['lower_link_link_chronic_id_' + lower_linksCount]).to.be.true;
            lower_linksCount = lower_linksCount - 1;
        }
    });
    it('Verify lower_link_link chronic_id exits in pb2 xml', () => {
        while (lower_linksCount > 0) {
            expect(xm2['lower_link_link_chronic_id_' + lower_linksCount]).to.be.true;
            lower_linksCount = lower_linksCount - 1;
        }
    });


    });

    describe('Update Scenario', () => {

        before(() => {
            //Edit the asset
            test.EditTheAsset();

            //Update the asset
            /*
            code to Update
            */

            test.SaveOrPublishTheAsset('Publish to Live', 'Updated MVL module - testing to compare renditions of PB1 & PB2');
            //test.NavigateToTheATSPage(chronid);
            //test.WaitForXML();
            //Parse the XML
        });

        //assertions
        it('XML Validations', () => {

        });
    });

    describe('Expire Scenario', () => {

        before(() => {
            //Expire the asset
            test.SelectMoreActionsMenuItem('Expire');

            //test.NavigateToTheATSPage(chronid);
            //test.WaitForATSStatus('Expire');
        });

        //assertions
        it('XML Validations', () => {

        });

    });

    describe('Reinstate', () => {

        before(() => {
            //Search for the asset
            test.SearchFor(null, chronid, 'Global Search', null);
            test.EditTheAsset();
            test.SaveOrPublishTheAsset('Publish to Live', 'Reinstate - testing to compare renditions of PB1 & PB2');

            //test.NavigateToTheATSPage(chronid);
            //test.WaitForXML();
            //Parse the XML
        });

        //assertions
        it('XML Validations', () => {

        });

    });

});
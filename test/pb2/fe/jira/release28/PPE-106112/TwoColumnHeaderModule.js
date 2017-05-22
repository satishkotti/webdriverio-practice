var test = require('./../../../../common/functions/functions');
var smTestData = require('./../../../../data/sm.assets');

describe('XML validations for Two column header Module', () => {

    var testAssetProps = smTestData.TwoColumnHeaderModule;
    var testAssetName = testAssetProps.moduleName;
    var imagesCount = 0;
    before(() => {
        //Launch App
        test.LaunchAppAndLogin();
    });

    //Create Scenario
    describe.only('Creation Scenario', () => {
        var xml1 = {}; //pb1 xml
        var xml2 = {}; //pb2 xml
        before(() => {

            var chronid = test.Create('Shared Module', testAssetProps);
            test.ConfigureModule('TwoColumnHeaderModule', testAssetProps);
            test.SaveOrPublishTheAsset('Publish to Live', 'Testing to compare renditions of PB1 & PB2');
            test.NavigatetoATSStatusCheckerPageOf(chronid, 'live');
            test.ClickButtonInATSPage('ATS Reprocess');
            test.WaitForATSFile('ATS Output File');

            xml1 = test.GetXMLValues('twocolumnheadermodule', test.GetXML('\\test\\pb2\\data\\SampleData\\TwoColumnHeaderModule\\pb1_Allfields.xml', 'live', 'FILE'));

            xml2 = test.GetXMLValues('twocolumnheadermodule', test.GetXML(chronid, 'live'));
            for (var property in xml2) {
                if (property.toString().startsWith('image_link_')) {
                    imagesCount = imagesCount + 1;
                }
            }
        });

        //module settings assertions
        it('Verify Module Settings chronic_id exits or not in pb1 xml', () => {
            expect(xml1['chronic_id']).to.be.true;
        });
        it('Verify Module Settings chronic_id exits or not in pb2 xml', () => {
            expect(xml2['chronic_id']).to.be.true;
        });
        it('title of both xmls should be same', () => {
            expect(xml1['title'].length).to.not.eql(0);
            expect(xml2['title'].length).to.not.eql(0);
        });
        it('object_name of both xmls should be same', () => {
            expect(xml1['object_name'].length).to.not.eql(0);
            expect(xml2['object_name'].length).to.not.eql(0);
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
            expect(xml1['wbmd_pb_asset_css_object_type']).to.equal(xml2['wbmd_pb_asset_css_object_type']);
        });
        it('wbmd_pb_module_xsl path of both xmls should be same', () => {
            expect(xml1['wbmd_pb_module_xsl_path']).to.equal(xml2['wbmd_pb_module_xsl_path']);
        });
        it('wbmd_pb_module_xsl object_type of both xmls should be same', () => {
            expect(xml1['wbmd_pb_module_xsl_object_type']).to.equal(xml2['wbmd_pb_module_xsl_object_type']);
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

        //#region module data assertions
        it('Module data attributes of both xmls should be same', () => {
            expect(xml1['moduleTitle'].length).to.not.eql(0);
            expect(xml2['moduleTitle'].length).to.not.eql(0);
            expect(xml1['module_subtitle'].length).to.not.eql(0);
            expect(xml2['module_subtitle'].length).to.not.eql(0);
            expect(xml1['attribution_link_text'].length).to.not.eql(0);
            expect(xml2['attribution_link_text'].length).to.not.eql(0);

            while (imagesCount > 0) {
                expect(xml1['image_link_'+imagesCount]).to.be.true;
                expect(xml2['image_link_'+imagesCount]).to.be.true;
                expect(xml1['source_'+imagesCount]).to.be.true;
                expect(xml2['source_'+imagesCount]).to.be.true;
                imagesCount = imagesCount - 1;
            }

        });

    });
});
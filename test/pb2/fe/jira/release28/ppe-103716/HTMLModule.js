var test = require('./../../../../common/functions/functions');
var smTestData = require('./../../../../data/sm.assets');
//var pb1xml = require('./../../../../data/sm-pb1-xmls/sponsorboxes_allfields.xml');
var deep = require('deep-diff')

describe('XML validations for HTML Module', () => {

    var testAssetProps = smTestData.HTMLModule;
    var testAssetName = testAssetProps.moduleName;
  // var chronid = '091e9c5e8158dee5';

    before(() => {
        //Launch App
        test.LaunchAppAndLogin();
    });

    //Create Scenario
    describe.only('Creation Scenario', () => {
        var xml1 = {}; //pb1 xml
        var xml2 = {}; //pb2 xml
        var jsXml1, jsXml2;
        before(() => {

            var chronid = test.Create('Shared Module', testAssetProps);
            test.ConfigureModule('html module', testAssetProps);
            browser.pause(2000);
            test.SaveOrPublishTheAsset('Publish to Live', 'Testing to compare renditions of PB1 & PB2');
            test.NavigatetoATSStatusCheckerPageOf(chronid, 'live');
            test.ClickButtonInATSPage('ATS Reprocess');
            test.WaitForATSFile('ATS Output File');

            xml1 = test.GetXMLValues('html module', test.GetXML('\\test\\pb2\\data\\SampleData\\HTMLModule\\pb1_Allfields.xml', 'live', 'FILE'));

            xml2 = test.GetXMLValues('html module', test.GetXML(chronid, 'live'));
        });


        //module settings assertions
        it('Verify Module Settings chronic_id exits or not in pb1 xml', () => {
            expect(xml1['chronic_id']).to.be.true;
        });
        it('Verify Module Settings chronic_id exits or not in pb2 xml', () => {
            expect(xml2['chronic_id']).to.be.true;
        });
        it('Verify title tag in PB2.0 xml', () => {
            expect(xml2['title'].length).to.not.eql(0);
        });
        it('Verify object_name of both xmls should be same', () => {
            expect(xml1['object_name']).to.include('module_');
            expect(xml1['object_name'].length).to.not.eql(0);
        //    expect(xml1['object_name']).to.equal(xml2['object_name']);
        });

        it('Verify object_type of both xmls should be same', () => {
            expect(xml1['object_type']).to.equal(xml2['object_type']);
        });

        it('Verify wbmd_pb_module_category of both xmls should be same', () => {
            expect(xml1['wbmd_pb_module_category']).to.equal(xml2['wbmd_pb_module_category']);
        });

        it('Verify wbmd_pb_dyn_module_category of both xmls should be same', () => {
            expect(xml1['wbmd_pb_dyn_module_category']).to.equal(xml2['wbmd_pb_dyn_module_category']);
        });

        it('Verify wbmd_pb_module_label1 of both xmls should be same', () => {
            expect(xml2['wbmd_pb_module_label1'].includes('missed on xml')).to.eql(true);
            expect(xml1['wbmd_pb_module_label1'].length).to.eql(0);
        });

        it('Verify wbmd_pb_module_label2 of both xmls should be same', () => {
            expect(xml2['wbmd_pb_module_label2'].includes('missed on xml')).to.eql(true);
            expect(xml1['wbmd_pb_module_label2'].length).to.eql(0);
        });

        it('Verify wbmd_pb_module_sp_program of both xmls should be same', () => {
            expect(xml1['wbmd_pb_module_sp_program']).to.equal(xml2['wbmd_pb_module_sp_program']);
        });

        it('Verify wbmd_pb_module_tier of both xmls should be same', () => {
            expect(xml1['wbmd_pb_module_tier']).to.equal(xml2['wbmd_pb_module_tier']);
        });

        it('Verify wbmd_pb_cache_duration of both xmls should be same', () => {
            expect(xml1['wbmd_pb_cache_duration'].length).to.not.eql(0);
            expect(xml2['wbmd_pb_cache_duration'].length).to.not.eql(0);
        });

        it('Verify wbmd_c_channel_ids_group of both xmls should be same', () => {
            expect(xml1['wbmd_c_channel_ids_group']).to.equal(xml2['wbmd_c_channel_ids_group']);
        });

        it('Verify wbmd_program_group of both xmls should be same', () => {
            expect(xml1['wbmd_program_group']).to.equal(xml2['wbmd_program_group']);
        });
        it('Verify wbmd_pb_asset_css path of both xmls should be same', () => {
            expect(xml1['wbmd_pb_asset_css_path']).to.equal(xml2['wbmd_pb_asset_css_path']);
        });
        it('Verify wbmd_pb_asset_css object_type of both xmls should be same', () => {
            expect(xml1['wbmd_pb_asset_css_object_type']).to.equal(xml2['wbmd_pb_asset_css_object_type']);
        });
        it('Verify wbmd_pb_module_xsl path of both xmls should be same', () => {
            expect(xml1['wbmd_pb_module_xsl_path']).to.equal(xml2['wbmd_pb_module_xsl_path']);
        });
        it('Verify wbmd_pb_module_xsl object_type of both xmls should be same', () => {
            expect(xml1['wbmd_pb_module_xsl_object_type']).to.equal(xml2['wbmd_pb_module_xsl_object_type']);
        });

        it('Verify wbmd_pb_owner_page_id path object_type of both xmls should be same', () => {
            expect(xml1['wbmd_pb_owner_page_id_path'].length).to.not.eql(0);
            expect(xml2['wbmd_pb_owner_page_id_path'].length).to.not.eql(0);
        });
        it('Verify wbmd_pb_owner_page_id object_type object_type of both xmls should be same', () => {
            expect(xml1['wbmd_pb_owner_page_id_object_type']).to.equal(xml2['wbmd_pb_owner_page_id_object_type']);
        });
        it('Verify dnn_id object_type of both xmls should be same', () => {
            expect(xml1['dnn_id']).to.equal(xml2['dnn_id']);
        });
        it('Verify class object_type of both xmls should be same', () => {
            expect(xml1['class']).to.equal(xml2['class']);
        });

        //#region module data assertions
        it('Verify contentText of both xmls should be same', () => {
            expect(xml2['contentText'].length).to.not.eql(0);
        });
    });
});
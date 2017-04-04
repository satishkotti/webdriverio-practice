var test = require('./../../../../common/functions/functions');
var smTestData = require('./../../../../data/sm.assets');

describe('XML validations for Multiple Video Launch Module', () => {

    var testAssetProps = smTestData.multiplevideolaunchModule;
    var testAssetName = testAssetProps.moduleName;

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
            test.ConfigureModule('Multiple Video Launch', testAssetProps);
            test.SaveOrPublishTheAsset('Publish to Live', 'Testing to compare renditions of PB1 & PB2');
            test.NavigatetoATSStatusCheckerPageOf(chronid, 'live');
            test.ClickButtonInATSPage('ATS Reprocess');
            test.WaitForATSFile('ATS Output File');

            return Promise.resolve(test.GetXML('091e9c5e815ba3ec', 'live'))
                .then(function (result) {
                    xml1 = test.ArrayFromJSONObjforMultiVideoLunch(result);
                    return test.GetXML(chronid, 'live');
                }).then(function (resultobj) {
                    xml2 = test.ArrayFromJSONObjforMultiVideoLunch(resultobj);
                }).catch(err => {
                    console.log(err);
                });
            // xml1 = test.GetXML('091e9c5e815ba3ec', 'live');
            // xml2 = test.GetXML(chronid, 'live');
            //Parse the XML
        });

        //assertions
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
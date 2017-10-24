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
        var videosCount = 0;
        before(() => {

            var chronid = test.Create('Shared Module', testAssetProps);
            test.ConfigureModule('Multiple Video Launch', testAssetProps);
            test.SaveOrPublishTheAsset('Publish to Live', 'Testing to compare renditions of PB1 & PB2');
            test.NavigatetoATSStatusCheckerPageOf(chronid, 'live');
            test.ClickButtonInATSPage('ATS Reprocess');
            test.WaitForATSFile('ATS Output File');

            xml1 = test.GetXMLValues('multiple video launch module', test.GetXML('091e9c5e815ba3ec', 'live'));
            xml2 = test.GetXMLValues('multiple video launch module', test.GetXML(chronid, 'live'));

            for (var property in xml1) {
                if (property.toString().startsWith('VideoTitleOverride_')) {
                    videosCount = videosCount + 1;
                };
            }
        });

        //assertions
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
            expect(xml2['wbmd_pb_module_category'].length).to.eql(0);
        });

        it('wbmd_pb_dyn_module_category of both xmls should be same', () => {
            expect(xml1['wbmd_pb_dyn_module_category']).to.equal(xml2['wbmd_pb_dyn_module_category']);
        });

        it('wbmd_pb_module_label1 of both xmls should be same', () => {
            expect(xml1['wbmd_pb_module_label1'].length).to.eql(0);
            expect(xml2['wbmd_pb_module_label1'].includes('missed on xml')).to.eql(true);
        });

        it('wbmd_pb_module_label2 of both xmls should be same', () => {
            expect(xml1['wbmd_pb_module_label2'].length).to.eql(0);
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
            expect(xml1['wbmd_pb_asset_css_object_type'].length).to.not.eql(0);
            expect(xml2['wbmd_pb_asset_css_object_type'].length).to.not.eql(0);
        });
        it('wbmd_pb_module_xsl path of both xmls should be same', () => {
            expect(xml1['wbmd_pb_module_xsl_path'].length).to.not.eql(0);
            expect(xml2['wbmd_pb_module_xsl_path'].length).to.not.eql(0);
        });
        it('wbmd_pb_module_xsl object_type of both xmls should be same', () => {
            expect(xml1['wbmd_pb_module_xsl_object_type'].length).to.not.eql(0);
            expect(xml2['wbmd_pb_module_xsl_object_type'].length).to.not.eql(0);
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

        it('VideoBrand object_type of both xmls should be same', () => {
            expect(xml1['VideoBrand']).to.equal(xml2['VideoBrand']);
        });

        it('VideoLinkView object_type of both xmls should be same', () => {
            expect(xml1['VideoLinkView']).to.equal(xml2['VideoLinkView']);
        });
        it('ModuleDescription object_type of both xmls should be same', () => {
            expect(xml1['ModuleDescription']).to.equal(xml2['ModuleDescription']);
        });

        it('ModuleTitle object_type of both xmls should be same', () => {
            expect(xml1['ModuleTitle']).to.equal(xml2['ModuleTitle']);
        });

        it('VideoTitleOverride object_type of both xmls should be same', () => {
            while (videosCount > 0) {
                expect(xml1['VideoTitleOverride_' + videosCount]).to.equal(xml2['VideoTitleOverride_' + videosCount]);
                videosCount = videosCount - 1;
            }
        });

        it('VideoDescriptionOverride object_type of both xmls should be same', () => {
            while (videosCount > 0) {
                expect(xml1['VideoDescriptionOverride_' + videosCount]).to.equal(xml2['VideoDescriptionOverride_' + videosCount]);
                videosCount = videosCount - 1;
            }
        });
        it('videosource_chronic_id object_type of both xmls should be same', () => {
            while (videosCount > 0) {
                expect(xml1['videosource_chronic_id_' + videosCount]).to.equal(xml2['videosource_chronic_id_' + videosCount]);
                videosCount = videosCount - 1;
            }

        });
        it('VideoLink chronic_id check if exists or not in  pb1 xml', () => {
            while (videosCount > 0) {
                expect(xml2['PopupLink_chronic_id_' + videosCount]).to.be.true;
                videosCount = videosCount - 1;
            }
        });
        it('VideoLink chronic_id check if exists or not in  pb2 xml', () => {
            while (videosCount > 0) {
                expect(xml2['VideoLink_chronic_id_' + videosCount]).to.be.true;
                videosCount = videosCount - 1;
            }
        });
        it('PopupLink chronic_id check if exists or not in pb1 xml', () => {
            while (videosCount > 0) {
                expect(xml1['PopupLink_chronic_id_' + videosCount]).to.be.true;
                videosCount = videosCount - 1;
            }
        });
        it('PopupLink chronic_id check if exists or not in  pb2 xml', () => {
            while (videosCount > 0) {
                expect(xml2['PopupLink_chronic_id_' + videosCount]).to.be.true;
                videosCount = videosCount - 1;
            }
        });
        it('Verify Module Settings chronic_id exits or not in pb1 xml', () => {
            expect(xml1['chronic_id']).to.be.true;
        });
        it('Verify Module Settings chronic_id exits or not in pb2 xml', () => {
            expect(xml2['chronic_id']).to.be.true;
        });
        it('Verify Module Settings wbmd_pb_asset_css chronic_id exits or not in pb1 xml', () => {
            expect(xml1['wbmd_pb_asset_css_chronic_id']).to.be.true;
        });
        it('Verify Module Settings wbmd_pb_asset_css chronic_id exits or not in pb2 xml', () => {
            expect(xml2['wbmd_pb_asset_css_chronic_id']).to.be.false;
        });
        it('Verify Module Settings wbmd_pb_module_xsl chronic_id exits or not in pb1 xml', () => {
            expect(xml1['wbmd_pb_module_xsl_chronic_id']).to.be.true;
        });
        it('Verify Module Settings wbmd_pb_module_xsl chronic_id exits or not in pb2 xml', () => {
            expect(xml2['wbmd_pb_module_xsl_chronic_id']).to.be.false;
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
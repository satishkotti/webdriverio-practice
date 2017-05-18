var test = require('./../../../../common/functions/functions');
var smTestData = require('./../../../../data/sm.assets');
//var pb1xml = require('./../../../../data/sm-pb1-xmls/sponsorboxes_allfields.xml');

describe('XML validations for Navigation Module', () => {

    var testAssetProps = smTestData.NavigationModule;
    var testAssetName = testAssetProps.moduleName;

    before(() => {
        //Launch App
        test.LaunchAppAndLogin();
    });

    //Create Scenario
    describe.only('Creation Scenario', () => {
        var xml1 = {}; //pb1 xml
        var xml2 = {}; //pb2 xml
        var groupsCount = 0, linkItemcount = 0;
        before(() => {

            var chronid = test.Create('Shared Module', testAssetProps);
            test.ConfigureModule('navigation module', testAssetProps);
            test.SaveOrPublishTheAsset('Publish to Live', 'Testing to compare renditions of PB1 & PB2');
            test.NavigatetoATSStatusCheckerPageOf(chronid, 'live');
            test.ClickButtonInATSPage('ATS Reprocess');
            test.WaitForATSFile('ATS Output File');

            //var xml = test.GetXML('091e9c5e815a195e', 'live')
          // xml1 = test.GetXMLValues('sponsor box module', pb1xml);
           xml1 = test.GetXMLValues('navigation module', test.GetXML('\\test\\pb2\\data\\SampleData\\NavigationModule\\pb1.xml', 'live','FILE'));

            for (var property in xml1) {
                if (property.toString().startsWith('group_name_')) {
                    groupsCount = groupsCount + 1;
                }
                if (property.toString().startsWith('link_item_link_text_')) {
                    linkItemcount = linkItemcount + 1;
                }
            }

         xml2 = test.GetXMLValues('navigation module', test.GetXML(chronid, 'live'));
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
    it('module_title_text of both xmls should be same', () => {
        expect(xml1['module_title_text']).to.equal(xml2['module_title_text']);
    });

     it('group_name of both xmls should be same', () => {
        while (groupsCount > 0) {
            expect(xml1['group_name_' + groupsCount]).to.equal(xml2['group_name_' + groupsCount]);
            groupsCount = groupsCount - 1;
        }
    });
     it('group_link_view of both xmls should be same', () => {
        while (groupsCount > 0) {
            expect(xml1['group_link_view_' + groupsCount]).to.equal(xml2['group_link_view_' + groupsCount]);
            groupsCount = groupsCount - 1;
        }
    });

     it('group_link_object_type directive  of both xmls should be same', () => {
        while (groupsCount > 0) {
            expect(xml1['group_link_object_type_' + groupsCount]).to.equal(xml2['group_link_object_type_' + groupsCount]);
            groupsCount = groupsCount - 1;
        }
    });

     it('link_item_link_text directive  of both xmls should be same', () => {
        while (linkItemcount > 0) {
            expect(xml1['link_item_link_text_' + linkItemcount]).to.equal(xml2['link_item_link_text_' + linkItemcount]);
            linkItemcount = linkItemcount - 1;
        }
    });

     it('link_item_article_link_view_ directive  of both xmls should be same', () => {
        while (linkItemcount > 0) {
            expect(xml1['link_item_article_link_view_' + linkItemcount]).to.equal(xml2['link_item_article_link_view_' + linkItemcount]);
            linkItemcount = linkItemcount - 1;
        }
    });

     it('link_item_link object_type_  of both xmls should be same', () => {
        while (linkItemcount > 0) {
            expect(xml1['link_item_link_object_type_' + groupsCount]).to.equal(xml2['link_item_link_object_type_' + linkItemcount]);
            linkItemcount = linkItemcount - 1;
        }
    });

     it('link_item link_directive directive  of both xmls should be same', () => {
        while (linkItemcount > 0) {
            expect(xml1['link_item_link_directive_' + linkItemcount]).to.equal(xml2['link_item_link_directive_' + linkItemcount]);
            linkItemcount = linkItemcount - 1;
        }
    });

     it('Verify link_item_link chronic_id exits in pb1 xml', () => {
        while (linkItemcount > 0) {
            expect(xml1['link_item_link_chronic_id_' + linkItemcount]).to.be.true;
            linkItemcount = linkItemcount - 1;
        }
    });
    it('Verify link_item_link chronic_id exits in pb2 xml', () => {
        while (linkItemcount > 0) {
            expect(xml2['link_item_link_chronic_id_' + linkItemcount]).to.be.true;
            linkItemcount = linkItemcount - 1;
        }
    });

    it('Verify group_link chronic_id exits in pb1 xml', () => {
        while (groupsCount > 0) {
            expect(xml1['group_link_chronic_id_' + groupsCount]).to.be.true;
            groupsCount = groupsCount - 1;
        }
    });
    it('Verify group_link chronic_id exits in pb2 xml', () => {
        while (groupsCount > 0) {
            expect(xml2['group_link_chronic_id_' + groupsCount]).to.be.true;
            groupsCount = groupsCount - 1;
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

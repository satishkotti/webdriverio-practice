var test = require('./../../../../common/functions/functions');
var smTestData = require('./../../../../data/sm.assets');
//var pb1xml = require('./../../../../data/sm-pb1-xmls/sponsorboxes_allfields.xml');

describe('XML validations for Navigation Module', () => {

    var testAssetProps = smTestData.EditNavigationModule;
    var chronid = '091e9c5e812b356a';
    var xml2 = {};
    var xml1 = {};
    var updatedXml = {};
    var groupsCount = 0, linkItemcount = 0;
    before(() => {
        //Launch App
        test.LaunchAppAndLogin();
    });

    //Create Scenario
    describe.only('Creation Scenario', () => {

        before(() => {
            test.SearchFor(null, chronid, 'Global Search', null);
            test.EditTheAsset();
            test.SwitchAssetTabs('Module Configuration');
            test.ConfigureModule('editnavigationmodule', testAssetProps);
            xml1 = test.GetXMLValues('navigation module', test.GetXML(chronid, 'live'));

            test.SaveOrPublishTheAsset('Publish to Live', 'Testing to compare renditions of last versions');
            test.NavigatetoATSStatusCheckerPageOf(chronid, 'live');
            test.ClickButtonInATSPage('ATS Reprocess');
            test.WaitForATSFile('ATS Output File');
            updatedXml = test.GetXMLValues('editnavigation module', test.GetXML(chronid, 'live'));
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
                xml2 = test.GetXMLValues('navigation module', test.GetXML(chronid, 'live'));
                
                for (var property in xml2) {
                    if (property.toString().startsWith('group_name_')) {
                        groupsCount = groupsCount + 1;
                    }
                    if (property.toString().startsWith('link_item_link_text_')) {
                        linkItemcount = linkItemcount + 1;
                    }
                } 
            });

            //assertions
            it('Verify data after edit/update the existing section in navigation module', () => {
                expect(testAssetProps.groupheadersection[0].groups[0].grouptext).to.equal(updatedXml['group1_group_name']);
                expect(testAssetProps.groupheadersection[0].groups[0].grouplink).to.equal(updatedXml['group1_group_link']);
                expect(testAssetProps.groupheadersection[0].groups[0].groupitemlinks[0].grouplinkitemtext).to.equal(updatedXml['group1_grouplinkitemtext']);
                expect(testAssetProps.groupheadersection[0].groups[0].groupitemlinks[0].grouplinkitemlink).to.equal(updatedXml['group1_grouplinkitemlink']);
            });

            it('Verify data after adding new section to the navigation module', () => {
                expect(testAssetProps.groupheadersection[0].groups[1].grouptext).to.equal(updatedXml['group2_group_name']);
                expect(testAssetProps.groupheadersection[0].groups[1].grouplink).to.equal(updatedXml['group2_group_link']);
                expect(testAssetProps.groupheadersection[0].groups[1].groupitemlinks[0].grouplinkitemtext).to.equal(updatedXml['group2_grouplinkitemtext']);
                expect(testAssetProps.groupheadersection[0].groups[1].groupitemlinks[0].grouplinkitemlink).to.equal(updatedXml['group2_grouplinkitemlink']);
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

    });

});


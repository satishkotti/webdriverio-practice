var test = require('./../../../../common/functions/functions');
var smTestData = require('./../../../../data/sm.assets');

describe('XML validations for Vertical Promo Module With All Fields', () => {
    var testAssetProps = smTestData.VerticalPromoModule;
    var testAssetName = testAssetProps.moduleName;

    before(() => {
        //Launch App
         test.LaunchAppAndLogin();
    });

    //Create Scenario
    describe.only('Creation Scenario', () => {
        var xml1 = {}; //pb1 xml
        var xml2 = {}; //pb2 xml
        var overlayCount = 0;
        before(() => {
          
            var chronid = test.Create('Shared Module', testAssetProps);
            test.ConfigureModule('vertical promo module', testAssetProps);
            test.SaveOrPublishTheAsset('Publish to Live', 'Testing to compare renditions of PB1 & PB2');
            test.NavigatetoATSStatusCheckerPageOf(chronid, 'live');
            test.ClickButtonInATSPage('ATS Reprocess');
            test.WaitForATSFile('ATS Output File');

            xml1 = test.GetXMLValues('Vertical Promo Module', test.GetXML('\\test\\pb2\\data\\SampleData\\VerticalPromoModule\\pb1_allfields.xml', 'live', 'FILE'));

            for (var property in xml1) {
                if (property.toString().startsWith('iconic_overlay_title_')) {
                    overlayCount = overlayCount + 1;
                }
            }

            xml2 = test.GetXMLValues('Vertical Promo Module', test.GetXML(chronid, 'live'));
        });

        //#region module data assertions

        it('image_alt_text of both xml should be same', () => {
            expect(xml1['image_alt_text'].length).to.not.eql(0);
            expect(xml2['image_alt_text'].length).to.eql(0);
        });
        it('intro_text of both xml should be same', () => {
            expect(xml1['intro_text']).to.equal(xml2['intro_text']);
        });
        it('button_label of both xml should be same', () => {
            expect(xml1['button_label']).to.equal(xml2['button_label']);
        });
        it('button_link_view of both xml should be same', () => {
            expect(xml1['button_link_view']).to.equal(xml2['button_link_view']);
        });
        it('description_text of both xml should be same', () => {
            expect(xml1['description_text']).to.equal(xml2['description_text']);
        });
        it('image_source directive of both xml should be same', () => {
            expect(xml1['image_source_directive']).to.equal(xml2['image_source_directive']);
        });
        it('image_source object_type of both xml should be same', () => {
            expect(xml1['image_source_object_type']).to.equal(xml2['image_source_object_type']);
        });
        it('image_source path of both xml should be same', () => {
            expect(xml1['image_source_path']).to.equal(xml2['image_source_path']);
        });
        it('image_source alt of both xml should be same', () => {
            expect(xml1['image_source_alt']).to.equal(xml2['image_source_alt']);
        });
        it('image_source chronic_id of pb1 xml should be exists', () => {
            expect(xml1['image_source_chronic_id']).to.be.true;
        });
        it('image_source chronic_id of pb2 xml should be exists', () => {
            expect(xml2['image_source_chronic_id']).to.be.true;
        });

        it('button_link directive of both xml should be same', () => {
            expect(xml1['button_link_directive']).to.equal(xml2['button_link_directive']);
        });
        it('button_link object_type of both xml should be same', () => {
            expect(xml1['button_link_object_type']).to.equal(xml2['button_link_object_type']);
        });
        it('button_link chronic_id of pb1 xml should be exists', () => {
            expect(xml1['button_link_chronic_id']).to.be.true;
        });
        it('button_link chronic_id of pb2 xml should be exists', () => {
            expect(xml2['button_link_chronic_id']).to.be.true;
        });

        //iconic_overlays assertions
        it('iconic_overlays of both xml should be same', () => {
            while (overlayCount > 0) {
                expect(xml1['iconic_overlay_title_' + overlayCount]).to.equal(xml2['iconic_overlay_title_' + overlayCount]);
                expect(xml1['iconic_overlay_text_' + overlayCount]).to.equal(xml2['iconic_overlay_text_' + overlayCount]);
                expect(xml1['iconic_overlay_description_text_' + overlayCount]).to.equal(xml2['iconic_overlay_description_text_' + overlayCount]);
                expect(xml1['iconic_overlay_link_view_' + overlayCount]).to.equal(xml2['iconic_overlay_link_view_' + overlayCount]);
                expect(xml1['icon_directive_' + overlayCount]).to.equal(xml2['icon_directive_' + overlayCount]);
                expect(xml1['icon_object_type_' + overlayCount]).to.equal(xml2['icon_object_type_' + overlayCount]);
                expect(xml1['icon_path_' + overlayCount]).to.equal(xml2['icon_path_' + overlayCount]);
                expect(xml1['icon_alt_' + overlayCount]).to.equal(xml2['icon_alt_' + overlayCount]);
                expect(xml1['link_directive_' + overlayCount]).to.equal(xml2['link_directive_' + overlayCount]);
                expect(xml1['link_object_type_' + overlayCount]).to.equal(xml2['link_object_type_' + overlayCount]);
                expect(xml1['icon_chronic_id_' + overlayCount]).to.be.true;
                expect(xml2['icon_chronic_id_' + overlayCount]).to.be.true;
                expect(xml1['link_chronic_id_' + overlayCount]).to.be.true;
                expect(xml2['link_chronic_id_' + overlayCount]).to.be.true;

                overlayCount = overlayCount - 1;
            }
        });
    });
    //describe only end

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




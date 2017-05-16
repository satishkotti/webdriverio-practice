var test = require('./../../../../common/functions/functions');
var smTestData = require('./../../../../data/sm.assets');
//var pb1xml = require('./../../../../data/sm-pb1-xmls/sponsorboxes_allfields.xml');

describe('XML validations for Edit Standard promo Module', () => {

    var testAssetProps = smTestData.EditStandardPromoModule;
    var chronid = '091e9c5e815d80e4';
    var xml2 = {};
    var xml1 = {};
    var updatedXml = {};
    var slidesCount = 0;
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
            test.ConfigureModule('EditStandardPromoModule', testAssetProps);
            xml1 = test.GetXMLValues('StandardPromomodule', test.GetXML(chronid, 'live'));

            test.SaveOrPublishTheAsset('Publish to Live', 'Testing to compare renditions of last versions');
            test.NavigatetoATSStatusCheckerPageOf(chronid, 'live');
            test.ClickButtonInATSPage('ATS Reprocess');
            test.WaitForATSFile('ATS Output File');
            updatedXml = test.GetXMLValues('StandardPromomodule', test.GetXML(chronid, 'live'));
        });


        describe('Update Scenario', () => {
            before(() => {
                test.LaunchApp();
                test.SearchFor(null, chronid, 'Global Search', null);
                test.SelectMoreActionsMenuItem('Asset History');
                test.CheckoutAndEditTheAsset();
                test.SaveOrPublishTheAsset('Publish to Live', 'Reinstate - testing to compare last 2 renditions');

                test.NavigatetoATSStatusCheckerPageOf(chronid, 'live');
                test.ClickButtonInATSPage('ATS Reprocess');
                test.WaitForATSFile('ATS Output File');
                //Parse the XML
                xml2 = test.GetXMLValues('StandardPromomodule', test.GetXML(chronid, 'live'));

                for (var property in xml2) {
                    if (property.toString().startsWith('slide_name_')) {
                        slidesCount = slidesCount + 1;
                    }
                }
            });

            //assertions
            it('Verify data after Add/update the existing section in StandardPromo module', () => {
                expect(testAssetProps.ModuleTitle).to.equal(updatedXml['ModuleTitle']);
                expect(updatedXml['link_url_chronic_id']).to.be.true;

                expect(testAssetProps.LogoTitle).to.equal(updatedXml['logo_overridetext']);
                expect(updatedXml['logo_source_chronic_id']).to.be.true;
                expect(updatedXml['logo_link_url_chronic_id']).to.be.true;

                expect(testAssetProps.Slides[0].SlideHeaderText).to.equal(updatedXml['slide_name_1']);
                expect(testAssetProps.Slides[0].SlideTitle).to.equal(updatedXml['slide_title_1']);
                expect(testAssetProps.Slides[0].SlideSubText).to.equal(updatedXml['slide_sub_text_1']);
                expect(testAssetProps.Slides[0].SlideEmphasizedText).to.equal(updatedXml['slide_title_emphasized_text_1']);
                var newSlide = slidesCount + 1;
                expect(testAssetProps.Slides[1].SlideHeaderText).to.equal(updatedXml['slide_name_' + newSlide]);
                expect(testAssetProps.Slides[1].SlideTitle).to.equal(updatedXml['slide_title_' + newSlide]);
                expect(testAssetProps.Slides[1].SlideSubText).to.equal(updatedXml['slide_sub_text_' + newSlide]);
                expect(testAssetProps.Slides[1].SlideEmphasizedText).to.equal(updatedXml['slide_title_emphasized_text_' + newSlide]);

            });

            //#region module data assertions
            it('module_title attributes of both xmls should be same', () => {
                expect(xml1['ModuleTitle']).to.equal(xml2['ModuleTitle']);
                expect(xml1['link_url_chronic_id']).to.be.true;
                expect(xml2['link_url_chronic_id']).to.be.true;
                expect(xml1['link_url_directive']).to.equal(xml2['link_url_directive']);
                expect(xml1['link_url_object_type']).to.equal(xml2['link_url_object_type']);
            });

            it('logos attributes of both xmls should be same', () => {
                expect(xml1['logo_overridetext']).to.equal(xml2['logo_overridetext']);
                expect(xml1['logo_source_chronic_id']).to.be.true;
                expect(xml2['logo_source_chronic_id']).to.be.true;
                expect(xml1['logo_source_directive']).to.equal(xml2['logo_source_directive']);
                expect(xml1['logo_source_object_type']).to.equal(xml2['logo_source_object_type']);
                expect(xml1['logo_link_url_chronic_id']).to.be.true;
                expect(xml2['logo_link_url_chronic_id']).to.be.true;
                expect(xml1['logo_link_url_directive']).to.equal(xml2['logo_link_url_directive']);
                expect(xml1['logo_link_url_object_type']).to.equal(xml2['logo_link_url_object_type']);
            });

            it('Slides attributes of both xmls should be same', () => {
                while (slidesCount > 0) {
                    expect(xml1['slide_name_' + slidesCount]).to.equal(xml2['slide_name_' + slidesCount]);
                    expect(xml1['slide_title_' + slidesCount]).to.equal(xml2['slide_title_' + slidesCount]);
                    expect(xml1['slide_sub_text_' + slidesCount]).to.equal(xml2['slide_sub_text_' + slidesCount]);
                    expect(xml1['slide_title_emphasized_text_' + slidesCount]).to.equal(xml2['slide_title_emphasized_text_' + slidesCount]);
                    expect(xml1['image_alt_text_override_' + slidesCount]).to.equal(xml2['image_alt_text_override_' + slidesCount]);
                    expect(xml1['image_source_chronic_id_' + slidesCount]).to.be.true;
                    expect(xml2['image_source_chronic_id_' + slidesCount]).to.be.true;
                    expect(xml1['image_source_directive_' + slidesCount]).to.equal(xml2['image_source_directive_' + slidesCount]);
                    expect(xml1['image_source_object_type_' + slidesCount]).to.equal(xml2['image_source_object_type_' + slidesCount]);

                    slidesCount = slidesCount - 1;
                }
            });
        });

    });

});


var test = require('./../../../../common/functions/functions');
var testdata = require('./../../../../data/testdata/ppe-106112.testdata').ppe_131022;

var chronid = null;
var xmlFile = null;
var pb2Session = null;

describe(`PPE-106112: For a new Page/Template/Shared module verify whether user is able to enter HTML code in the text fields`, () => {


    describe('HTML code must be retained by the UI text fields', () => {

        before(() => {

            //Launch App and Login
            test.LaunchAppAndLogin();

            //Create a new shared module
            chronid = test.Create('Shared Module', testdata.case1);

            //Configure the shared module
            test.ConfigureModule('Two Column Header Module', testdata.case1);

            //Save/Publish the asset
            test.SaveOrPublishTheAsset('Publish to Live', 'Testing PPE-106122 using automation script');
        })

        it('HTML code must be reatined by Title Text field', () => {
            var actual = browser.execute(`return $('label:contains("Title Text:") input')[0].value`).value;
            var expected = testdata.case1.TitleText
            expect(actual).to.equal(expected);
        });

        it('HTML code must be reatined by Subtitle Text field', () => {
            var actual = browser.execute(`return $('label:contains("Subtitle Text:") input')[0].value`).value;
            var expected = testdata.case1.SubtitleText;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be reatined by Attribution Text field', () => {
            var actual = browser.execute(`return $('label:contains("Text:") input')[2].value`).value;
            var expected = testdata.case1.AttributionText;
            expect(actual).to.equal(expected);
        });
    });

    describe('HTML code must be encoded and retained in the XML', () => {

        before(() => {
            //Navigate to ATS Status Checker page - Live
            pb2Session = test.NavigatetoATSStatusCheckerPageOf(chronid, 'live');

            //Wait for the asset to processed in ATS and XML to be generated
            test.WaitForATSFile('ATS Output File');

            //Parse the XML File and obtain the value of 'wbmd_is_ssl_reqd'
            browser.pause(5000);
            xmlFile = test.GetXML(chronid, 'Live', 'XML');
        })

        it('HTML code must be retained in encoded format for module_title tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.moduleTitle;
            var expected = testdata.case1.TitleText;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be retained in encoded format for module_subtitle tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.module_subtitle;
            var expected = testdata.case1.SubtitleText;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be retained in encoded format for attribution_link_text tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.attribution_link_text;
            var expected = testdata.case1.AttributionText;
            expect(actual).to.equal(expected);
        });
    });
});

describe(`PPE-106112: For a new Page/Template/Shared module verify whether user is able to enter '$1' value in the text fields`, () => {

    describe('HTML code must be retained by the UI text fields', () => {

        before(() => {

            //Navigate back to PB2 App
            browser.url(pb2Session);

            //Edit the asset
            test.EditTheAsset();

            //Configure the module
            test.ConfigureModule('Two Column Header Module', testdata.case2);

            //Save/Publish the asset
            test.SaveOrPublishTheAsset('Publish to Live', 'Testing PPE-106122 using automation script');

        })

        it('HTML code must be reatined by Title Text field', () => {
            var actual = browser.execute(`return $('label:contains("Title Text:") input')[0].value`).value;
            var expected = testdata.case2.TitleText
            expect(actual).to.equal(expected);
        });

        it('HTML code must be reatined by Subtitle Text field', () => {
            var actual = browser.execute(`return $('label:contains("Subtitle Text:") input')[0].value`).value;
            var expected = testdata.case2.SubtitleText;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be reatined by Attribution Text field', () => {
            var actual = browser.execute(`return $('label:contains("Text:") input')[2].value`).value;
            var expected = testdata.case2.AttributionText;
            expect(actual).to.equal(expected);
        });
    });

    describe('HTML code must be encoded and retained in the XML', () => {

        before(() => {
            //Navigate to ATS Status Checker page - Live
            test.NavigatetoATSStatusCheckerPageOf(chronid, 'live');

            test.ClickButtonInATSPage("ATS Reprocess");

            //Wait for the asset to processed in ATS and XML to be generated
            browser.pause(5000);
            test.WaitForATSFile('ATS Output File');

            //Parse the XML File and obtain the value of 'wbmd_is_ssl_reqd'
            browser.pause(5000);
            xmlFile = test.GetXML(chronid, 'Live', 'XML');
        })

        it('HTML code must be retained in encoded format for module_title tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.moduleTitle;
            var expected = testdata.case2.TitleText;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be retained in encoded format for module_subtitle tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.module_subtitle;
            var expected = testdata.case2.SubtitleText;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be retained in encoded format for attribution_link_text tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.attribution_link_text;
            var expected = testdata.case2.AttributionText;
            expect(actual).to.equal(expected);
        });
    });
});
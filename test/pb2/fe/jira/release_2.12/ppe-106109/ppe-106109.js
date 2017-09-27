var test = require('./../../../../common/functions/functions');
var testdata = require('./../../../../data/testdata/ppe-106109.testdata').ppe_106109;

var chronid = null;
var xmlFile = null;
var pb2Session = null;

describe(`PPE-106109: For a new Page/Template/Shared module verify whether user is able to enter HTML code in the text fields`, () => {

    describe('HTML code must be retained by the UI text fields', () => {

        before(() => {

            //Launch App and Login
            test.LaunchAppAndLogin();

            //Create a new shared module
            chronid = test.Create('Shared Module', testdata.create);

            //Configure the shared module
            test.ConfigureModule('Standard Promo', testdata.create);

            //Save/Publish the asset
            test.SaveOrPublishTheAsset('Publish to Live', 'Testing PPE-106109 using automation script');
        })

        it('HTML code must be reatined by Module Title Text field', () => {
            var actual = browser.execute(`return $('label:contains("Module Title:") input')[0].value`).value;
            var expected = testdata.create.ModuleTitle;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be reatined by Logo Title Text field', () => {
            var actual = browser.execute(`return $('label:contains("Logo Title:") input')[0].value`).value;
            var expected = testdata.create.LogoTitle;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be reatined by Slide Header Text field', () => {
            var actual = browser.execute(`return $('label:contains("Slide Header Text:") input')[0].value`).value;
            var expected = testdata.create.AttributionText;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be reatined by Slide Title Text field', () => {
            var actual = browser.execute(`return $('label:contains("Slide Title:") input')[0].value`).value;
            var expected = testdata.create.SlideTitle;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be reatined by Slide Emphasized Text field', () => {
            var actual = browser.execute(`return $('label:contains("Slide Emphasized Text:") input')[0].value`).value;
            var expected = testdata.create.SlideEmphasizedText;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be reatined by Slide Sub Text Text field', () => {
            var actual = browser.execute(`return $('label:contains("Slide Sub Text:") input')[0].value`).value;
            var expected = testdata.create.SlideSubText;
            expect(actual).to.equal(expected);
        });
    });

    describe('HTML code must be encoded and retained in the XML', () => {

        before(() => {
            //Navigate to ATS Status Checker page - Live
            pb2Session = test.NavigatetoATSStatusCheckerPageOf(chronid, 'live');

            //Click ATS Repreocess button
            test.ClickButtonInATSPage('ATS Reprocess');

            //Wait for the asset to processed in ATS and XML to be generated
            test.WaitForATSFile('ATS Output File');

            //Parse the XML File and obtain the value of 'wbmd_is_ssl_reqd'
            browser.pause(5000);
            xmlFile = test.GetXML(chronid, 'Live', 'XML');
        })

        it('HTML code must be retained in encoded format for module_title tag in the XML', () => {
            var actual = parseInt(xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.module_title.title);
            var expected = encodeURIComponent(testdata.create.ModuleTitle);
            expect(actual).to.equal(expected);
        });

        it('HTML code must be retained in encoded format for logo title tag in the XML', () => {
            var actual = parseInt(xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.logos.logo.log_overridetext);
            var expected = encodeURIComponent(testdata.create.LogoTitle);
            expect(actual).to.equal(expected);
        });

        it('HTML code must be retained in encoded format for slide header text tag in the XML', () => {
            var actual = parseInt(xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide.slide_name);
            var expected = encodeURIComponent(testdata.create.Slides[0].SlideHeaderText);
            expect(actual).to.equal(expected);
        });

        it('HTML code must be retained in encoded format for slide title tag in the XML', () => {
            var actual = parseInt(xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide.slide_title);
            var expected = encodeURIComponent(testdata.create.Slides[0].SlideTitle);
            expect(actual).to.equal(expected);
        });

        it('HTML code must be retained in encoded format for slide emphasized text tag in the XML', () => {
            var actual = parseInt(xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide.slide_title_emphasized_text);
            var expected = encodeURIComponent(testdata.create.Slides[0].SlideEmphasizedText);
            expect(actual).to.equal(expected);
        });

        it('HTML code must be retained in encoded format for slide sub text tag in the XML', () => {
            var actual = parseInt(xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide.slide_sub_text);
            var expected = encodeURIComponent(testdata.create.Slides[0].SlideSubText);
            expect(actual).to.equal(expected);
        });
    });
});

describe(`PPE-106109: For a new Page/Template/Shared module verify whether user is able to enter '$1' value in the text fields`, () => {

    describe('HTML code must be retained by the UI text fields', () => {

        before(() => {

            //Navigate back to PB2 App
            browser.url(pb2Session);

            //Edit the asset
            test.EditTheAsset();

            //Configure the module
            test.ConfigureModule('StandardPromo', testdata.edit);

            //Save/Publish the asset
            test.SaveOrPublishTheAsset('Publish to Live', 'Testing PPE-106122 using automation script');

        })

        it('HTML code must be reatined by Module Title Text field', () => {
            var actual = browser.execute(`return $('label:contains("Module Title:") input')[0].value`).value;
            var expected = testdata.edit.ModuleTitle;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be reatined by Logo Title Text field', () => {
            var actual = browser.execute(`return $('label:contains("Logo Title:") input')[0].value`).value;
            var expected = testdata.edit.LogoTitle;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be reatined by Slide Header Text field', () => {
            var actual = browser.execute(`return $('label:contains("Slide Header Text:") input')[0].value`).value;
            var expected = testdata.edit.SlideHeaderText;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be reatined by Slide Title Text field', () => {
            var actual = browser.execute(`return $('label:contains("Slide Title:") input')[0].value`).value;
            var expected = testdata.create.SlideTitle;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be reatined by Slide Emphasized Text field', () => {
            var actual = browser.execute(`return $('label:contains("Slide Emphasized Text:") input')[0].value`).value;
            var expected = testdata.create.SlideEmphasizedText;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be reatined by Slide Sub Text Text field', () => {
            var actual = browser.execute(`return $('label:contains("Slide Sub Text:") input')[0].value`).value;
            var expected = testdata.create.SlideSubText;
            expect(actual).to.equal(expected);
        });
    });

    describe('$1 must be encoded and retained in the XML', () => {

        before(() => {
            //Navigate to ATS Status Checker page - Live
            test.NavigatetoATSStatusCheckerPageOf(chronid, 'live');

            //Click ATS Repreocess button
            test.ClickButtonInATSPage('ATS Reprocess');

            //Wait for the asset to processed in ATS and XML to be generated
            test.WaitForATSFile('ATS Output File');

            //Parse the XML File and obtain the value of 'wbmd_is_ssl_reqd'
            browser.pause(5000);
            xmlFile = test.GetXML(chronid, 'Live', 'XML');
        })

        it('$1 must be retained in encoded format for module_title tag in the XML', () => {
            var actual = parseInt(xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.module_title.title);
            var expected = encodeURIComponent(testdata.edit.ModuleTitle);
            expect(actual).to.equal(expected);
        });

        it('$1 must be retained in encoded format for logo title tag in the XML', () => {
            var actual = parseInt(xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.logos.logo.log_overridetext);
            var expected = encodeURIComponent(testdata.edit.LogoTitle);
            expect(actual).to.equal(expected);
        });

        it('$1 must be retained in encoded format for slide header text tag in the XML', () => {
            var actual = parseInt(xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide.slide_name);
            var expected = encodeURIComponent(testdata.edit.Slides[0].SlideHeaderText);
            expect(actual).to.equal(expected);
        });

        it('$1 must be retained in encoded format for slide title tag in the XML', () => {
            var actual = parseInt(xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide.slide_title);
            var expected = encodeURIComponent(testdata.edit.Slides[0].SlideTitle);
            expect(actual).to.equal(expected);
        });

        it('$1 must be retained in encoded format for slide emphasized text tag in the XML', () => {
            var actual = parseInt(xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide.slide_title_emphasized_text);
            var expected = encodeURIComponent(testdata.edit.Slides[0].SlideEmphasizedText);
            expect(actual).to.equal(expected);
        });

        it('$1 must be retained in encoded format for slide sub text tag in the XML', () => {
            var actual = parseInt(xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide.slide_sub_text);
            var expected = encodeURIComponent(testdata.edit.Slides[0].SlideSubText);
            expect(actual).to.equal(expected);
        });
    });
});
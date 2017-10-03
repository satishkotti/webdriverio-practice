var test = require('./../../../../common/functions/functions');
var testdata = require('./../../../../data/testdata/ppe-106109.testdata').ppe_106109;

var chronid = null;
var xmlFile = null;
var pb2Session = null;


describe('HTML code must be retained by the UI text fields', () => {

        before(() => {
            test.LaunchAppAndLogin();
            chronid = test.Create('Shared Module', testdata.create);
            browser.pause(5000)
            test.ConfigureModule('Standard Promo', testdata.create);
            test.SaveOrPublishTheAsset('Publish to Live', 'Testing PPE-106109 using automation script');
            browser.pause(5000);
            console.log("Asset Chronicle ID: ", chronid)
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
            var expected = testdata.create.Slides[0].SlideHeaderText;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be reatined by Slide Title Text field', () => {
            var actual = browser.execute(`return $('label:contains("Slide Title:") input')[0].value`).value;
            var expected = testdata.create.Slides[0].SlideTitle;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be reatined by Slide Emphasized Text field', () => {
            var actual = browser.execute(`return $('label:contains("Slide Emphasized Text:") input')[0].value`).value;
            var expected = testdata.create.Slides[0].SlideEmphasizedText;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be reatined by Slide Sub Text Text field', () => {
            var actual = browser.execute(`return $('label:contains("Slide Sub Text:") input')[0].value`).value;
            var expected = testdata.create.Slides[0].SlideSubText;
            expect(actual).to.equal(expected);
        });
});

describe('HTML code must be encoded and retained in the XML', () => {

        before(() => {
            pb2Session = test.NavigatetoATSStatusCheckerPageOf(chronid, 'live');
            test.ClickButtonInATSPage('ATS Reprocess');
            test.WaitForATSFile('ATS Output File');
            browser.pause(5000);
            xmlFile = test.GetXML(chronid,'live');
        })

        it('HTML code must be retained in encoded format for module_title tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.module_title.title;
            var expected = testdata.create.ModuleTitle;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be retained in encoded format for logo title tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.logos.logo.logo_overridetext;
            var expected = testdata.create.LogoTitle;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be retained in encoded format for slide header text tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide[0].slide_name;
            var expected =testdata.create.Slides[0].SlideHeaderText;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be retained in encoded format for slide title tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide[0].slide_title;
            var expected = testdata.create.Slides[0].SlideTitle;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be retained in encoded format for slide emphasized text tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide[0].slide_title_emphasized_text;
            var expected = testdata.create.Slides[0].SlideEmphasizedText;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be retained in encoded format for slide sub text tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide[0].slide_sub_text;
            var expected = testdata.create.Slides[0].SlideSubText;
            expect(actual).to.equal(expected);
        });
});

describe('$1 must be retained by the UI text fields', () => {

        before(() => {
            browser.url(pb2Session);
            browser.pause(10000);
            test.EditTheAsset();
            browser.pause(5000);
            test.ConfigureModule('Standard Promo', testdata.edit);
            test.SaveOrPublishTheAsset('Publish to Live', 'Testing PPE-106109 using automation script');
            browser.pause(5000);
        })

        it('$1 must be reatined by Module Title Text field', () => {
            var actual = browser.execute(`return $('label:contains("Module Title:") input')[0].value`).value;
            var expected = testdata.edit.ModuleTitle;
            expect(actual).to.equal(expected);
        });

        it('$1 must be reatined by Logo Title Text field', () => {
            var actual = browser.execute(`return $('label:contains("Logo Title:") input')[0].value`).value;
            var expected = testdata.edit.LogoTitle;
            expect(actual).to.equal(expected);
        });

        it('$1 must be reatined by Slide Header Text field', () => {
            var actual = browser.execute(`return $('label:contains("Slide Header Text:") input')[0].value`).value;
            var expected = testdata.edit.Slides[0].SlideHeaderText;
            expect(actual).to.equal(expected);
        });

        it('$1 must be reatined by Slide Title Text field', () => {
            var actual = browser.execute(`return $('label:contains("Slide Title:") input')[0].value`).value;
            var expected = testdata.edit.Slides[0].SlideTitle;
            expect(actual).to.equal(expected);
        });

        it('$1 must be reatined by Slide Emphasized Text field', () => {
            var actual = browser.execute(`return $('label:contains("Slide Emphasized Text:") input')[0].value`).value;
            var expected = testdata.edit.Slides[0].SlideEmphasizedText;
            expect(actual).to.equal(expected);
        });

        it('$1 must be reatined by Slide Sub Text Text field', () => {
            var actual = browser.execute(`return $('label:contains("Slide Sub Text:") input')[0].value`).value;
            var expected = testdata.edit.Slides[0].SlideSubText;
            expect(actual).to.equal(expected);
        });
});

describe('$1 must be encoded and retained in the XML', () => {


        before(() => {
            test.NavigatetoATSStatusCheckerPageOf(chronid, 'live');
            test.ClickButtonInATSPage('ATS Reprocess');
            test.WaitForATSFile('ATS Output File');
            browser.pause(5000);
            xmlFile = test.GetXML(chronid, 'Live', 'XML');
        })

        it('$1 must be retained in encoded format for module_title tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.module_title.title;
            var expected = testdata.edit.ModuleTitle;
            expect(actual).to.equal(expected);
        });

        it('$1 must be retained in encoded format for logo title tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.logos.logo.logo_overridetext;
            var expected = testdata.edit.LogoTitle;
            expect(actual).to.equal(expected);
        });

        it('$1 must be retained in encoded format for slide header text tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide[0].slide_name;
            var expected = testdata.edit.Slides[0].SlideHeaderText;
            expect(actual).to.equal(expected);
        });

        it('$1 must be retained in encoded format for slide title tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide[0].slide_title;
            var expected = testdata.edit.Slides[0].SlideTitle;
            expect(actual).to.equal(expected);
        });

        it('$1 must be retained in encoded format for slide emphasized text tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide[0].slide_title_emphasized_text;
            var expected = testdata.edit.Slides[0].SlideEmphasizedText;
            expect(actual).to.equal(expected);
        });

        it('$1 must be retained in encoded format for slide sub text tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide[0].slide_sub_text;
            var expected = testdata.edit.Slides[0].SlideSubText;
            expect(actual).to.equal(expected);
        });
});

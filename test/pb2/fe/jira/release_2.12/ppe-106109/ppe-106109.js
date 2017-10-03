var test = require('./../../../../common/functions/functions');
var testdata = require('./../../../../data/testdata/ppe-106109.testdata').ppe_106109;

var chronid = null;
var xmlFile = null;
var pb2Session = null;


describe('Create New Module: HTML code must be retained by the UI text fields', () => {

        before(() => {
            test.LaunchAppAndLogin();
            chronid = test.Create('Shared Module', testdata.case1);
            browser.pause(5000)
            test.ConfigureModule('Standard Promo', testdata.case1);
            test.SaveOrPublishTheAsset('Publish to Live', 'Testing PPE-106109 using automation script');
            browser.pause(5000);
            console.log("Asset Chronicle ID: ", chronid)
        })

        it('HTML code must be reatined by Module Title Text field', () => {
            var actual = browser.execute(`return $('label:contains("Module Title:") input')[0].value`).value;
            var expected = testdata.case1.ModuleTitle;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be reatined by Logo Title Text field', () => {
            var actual = browser.execute(`return $('label:contains("Logo Title:") input')[0].value`).value;
            var expected = testdata.case1.LogoTitle;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be reatined by Slide Header Text field', () => {
            var actual = browser.execute(`return $('label:contains("Slide Header Text:") input')[0].value`).value;
            var expected = testdata.case1.Slides[0].SlideHeaderText;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be reatined by Slide Title Text field', () => {
            var actual = browser.execute(`return $('label:contains("Slide Title:") input')[0].value`).value;
            var expected = testdata.case1.Slides[0].SlideTitle;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be reatined by Slide Emphasized Text field', () => {
            var actual = browser.execute(`return $('label:contains("Slide Emphasized Text:") input')[0].value`).value;
            var expected = testdata.case1.Slides[0].SlideEmphasizedText;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be reatined by Slide Sub Text Text field', () => {
            var actual = browser.execute(`return $('label:contains("Slide Sub Text:") input')[0].value`).value;
            var expected = testdata.case1.Slides[0].SlideSubText;
            expect(actual).to.equal(expected);
        });
});

describe('Create New Module: HTML code must be encoded and retained in the XML', () => {

        before(() => {
            pb2Session = test.NavigatetoATSStatusCheckerPageOf(chronid, 'live');
            test.ClickButtonInATSPage('ATS Reprocess');
            test.WaitForATSFile('ATS Output File');
            browser.pause(5000);
            xmlFile = test.GetXML(chronid,'live');
        })

        it('HTML code must be retained in encoded format for module_title tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.module_title.title;
            var expected = testdata.case1.ModuleTitle;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be retained in encoded format for logo title tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.logos.logo.logo_overridetext;
            var expected = testdata.case1.LogoTitle;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be retained in encoded format for slide header text tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide.slide_name;
            var expected = testdata.case1.Slides[0].SlideHeaderText;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be retained in encoded format for slide title tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide.slide_title;
            var expected = testdata.case1.Slides[0].SlideTitle;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be retained in encoded format for slide emphasized text tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide.slide_title_emphasized_text;
            var expected = testdata.case1.Slides[0].SlideEmphasizedText;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be retained in encoded format for slide sub text tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide.slide_sub_text;
            var expected = testdata.case1.Slides[0].SlideSubText;
            expect(actual).to.equal(expected);
        });
});

describe('Edit Existing module: $1 must be retained by the UI text fields', () => {

        before(() => {
            //test.LaunchAppAndLogin();
            browser.url(global.appUrl);
            test.SearchFor(null,chronid,'global search', null);
            //test.SearchFor(null,'091e9c5e817b16e8','global search', null);
            test.SwitchAssetTabs('Module Configuration')
            browser.pause(10000);
            test.EditTheAsset();
            browser.pause(5000);
            test.ConfigureModule('Standard Promo', testdata.case2);
            test.SaveOrPublishTheAsset('Publish to Live', 'Testing PPE-106109 using automation script');
            browser.pause(5000);
        })

        it('$1 must be reatined by Module Title Text field', () => {
            var actual = browser.execute(`return $('label:contains("Module Title:") input')[0].value`).value;
            var expected = testdata.case2.ModuleTitle;
            expect(actual).to.equal(expected);
        });

        it('$1 must be reatined by Logo Title Text field', () => {
            var actual = browser.execute(`return $('label:contains("Logo Title:") input')[0].value`).value;
            var expected = testdata.case2.LogoTitle;
            expect(actual).to.equal(expected);
        });

        it('$1 must be reatined by Slide Header Text field', () => {
            var actual = browser.execute(`return $('label:contains("Slide Header Text:") input')[0].value`).value;
            var expected = testdata.case2.Slides[0].SlideHeaderText;
            expect(actual).to.equal(expected);
        });

        it('$1 must be reatined by Slide Title Text field', () => {
            var actual = browser.execute(`return $('label:contains("Slide Title:") input')[0].value`).value;
            var expected = testdata.case2.Slides[0].SlideTitle;
            expect(actual).to.equal(expected);
        });

        it('$1 must be reatined by Slide Emphasized Text field', () => {
            var actual = browser.execute(`return $('label:contains("Slide Emphasized Text:") input')[0].value`).value;
            var expected = testdata.case2.Slides[0].SlideEmphasizedText;
            expect(actual).to.equal(expected);
        });

        it('$1 must be reatined by Slide Sub Text Text field', () => {
            var actual = browser.execute(`return $('label:contains("Slide Sub Text:") input')[0].value`).value;
            var expected = testdata.case2.Slides[0].SlideSubText;
            expect(actual).to.equal(expected);
        });
});

describe('Edit Existing module: $1 must be encoded and retained in the XML', () => {


        before(() => {
            browser.pause(60000);
            test.NavigatetoATSStatusCheckerPageOf(chronid, 'live');
            test.ClickButtonInATSPage('ATS Reprocess');
            test.WaitForATSFile('ATS Output File');
            xmlFile = test.GetXML(chronid, 'Live', 'XML');
        })

        it('$1 must be retained in encoded format for module_title tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.module_title.title;
            var expected = testdata.case2.ModuleTitle;
            expect(actual).to.equal(expected);
        });

        it('$1 must be retained in encoded format for logo title tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.logos.logo.logo_overridetext;
            var expected = testdata.case2.LogoTitle;
            expect(actual).to.equal(expected);
        });

        it('$1 must be retained in encoded format for slide header text tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide.slide_name;
            var expected = testdata.case2.Slides[0].SlideHeaderText;
            expect(actual).to.equal(expected);
        });

        it('$1 must be retained in encoded format for slide title tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide.slide_title;
            var expected = testdata.case2.Slides[0].SlideTitle;
            expect(actual).to.equal(expected);
        });

        it('$1 must be retained in encoded format for slide emphasized text tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide.slide_title_emphasized_text;
            var expected = testdata.case2.Slides[0].SlideEmphasizedText;
            expect(actual).to.equal(expected);
        });

        it('$1 must be retained in encoded format for slide sub text tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide.slide_sub_text;
            var expected = testdata.case2.Slides[0].SlideSubText;
            expect(actual).to.equal(expected);
        });
});



describe('Create New module: $1 must be retained by the UI text fields', () => {

        before(() => {
            //test.LaunchAppAndLogin();
            browser.url(global.appUrl);
            chronid = test.Create('Shared Module', testdata.case2);
            browser.pause(5000)
            test.ConfigureModule('Standard Promo', testdata.case2);
            test.SaveOrPublishTheAsset('Publish to Live', 'Testing PPE-106109 using automation script');
            browser.pause(5000);
            console.log("Asset Chronicle ID: ", chronid)
        })

        it('$1 must be reatined by Module Title Text field', () => {
            var actual = browser.execute(`return $('label:contains("Module Title:") input')[0].value`).value;
            var expected = testdata.case2.ModuleTitle;
            expect(actual).to.equal(expected);
        });

        it('$1 must be reatined by Logo Title Text field', () => {
            var actual = browser.execute(`return $('label:contains("Logo Title:") input')[0].value`).value;
            var expected = testdata.case2.LogoTitle;
            expect(actual).to.equal(expected);
        });

        it('$1 must be reatined by Slide Header Text field', () => {
            var actual = browser.execute(`return $('label:contains("Slide Header Text:") input')[0].value`).value;
            var expected = testdata.case2.Slides[0].SlideHeaderText;
            expect(actual).to.equal(expected);
        });

        it('$1 must be reatined by Slide Title Text field', () => {
            var actual = browser.execute(`return $('label:contains("Slide Title:") input')[0].value`).value;
            var expected = testdata.case2.Slides[0].SlideTitle;
            expect(actual).to.equal(expected);
        });

        it('$1 must be reatined by Slide Emphasized Text field', () => {
            var actual = browser.execute(`return $('label:contains("Slide Emphasized Text:") input')[0].value`).value;
            var expected = testdata.case2.Slides[0].SlideEmphasizedText;
            expect(actual).to.equal(expected);
        });

        it('$1 must be reatined by Slide Sub Text Text field', () => {
            var actual = browser.execute(`return $('label:contains("Slide Sub Text:") input')[0].value`).value;
            var expected = testdata.case2.Slides[0].SlideSubText;
            expect(actual).to.equal(expected);
        });
});

describe('Create New module: $1 must be encoded and retained in the XML', () => {


        before(() => {
            browser.pause(60000);
            test.NavigatetoATSStatusCheckerPageOf(chronid, 'live');
            test.ClickButtonInATSPage('ATS Reprocess');
            test.WaitForATSFile('ATS Output File');
            xmlFile = test.GetXML(chronid, 'Live', 'XML');
        })

        it('$1 must be retained in encoded format for module_title tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.module_title.title;
            var expected = testdata.case2.ModuleTitle;
            expect(actual).to.equal(expected);
        });

        it('$1 must be retained in encoded format for logo title tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.logos.logo.logo_overridetext;
            var expected = testdata.case2.LogoTitle;
            expect(actual).to.equal(expected);
        });

        it('$1 must be retained in encoded format for slide header text tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide.slide_name;
            var expected = testdata.case2.Slides[0].SlideHeaderText;
            expect(actual).to.equal(expected);
        });

        it('$1 must be retained in encoded format for slide title tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide.slide_title;
            var expected = testdata.case2.Slides[0].SlideTitle;
            expect(actual).to.equal(expected);
        });

        it('$1 must be retained in encoded format for slide emphasized text tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide.slide_title_emphasized_text;
            var expected = testdata.case2.Slides[0].SlideEmphasizedText;
            expect(actual).to.equal(expected);
        });

        it('$1 must be retained in encoded format for slide sub text tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide.slide_sub_text;
            var expected = testdata.case2.Slides[0].SlideSubText;
            expect(actual).to.equal(expected);
        });
});

describe('Edit Existing module: HTML code must be retained by the UI text fields', () => {

        before(() => {
            browser.url(global.appUrl);
            test.SearchFor(null,chronid,'global search', null);
            //test.SearchFor(null,'091e9c5e817b16e8','global search', null);
            test.SwitchAssetTabs('Module Configuration')
            browser.pause(10000);
            test.EditTheAsset();
            browser.pause(5000);
            test.ConfigureModule('Standard Promo', testdata.case1);
            test.SaveOrPublishTheAsset('Publish to Live', 'Testing PPE-106109 using automation script');
            browser.pause(5000);
        })

        it('HTML code must be reatined by Module Title Text field', () => {
            var actual = browser.execute(`return $('label:contains("Module Title:") input')[0].value`).value;
            var expected = testdata.case1.ModuleTitle;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be reatined by Logo Title Text field', () => {
            var actual = browser.execute(`return $('label:contains("Logo Title:") input')[0].value`).value;
            var expected = testdata.case1.LogoTitle;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be reatined by Slide Header Text field', () => {
            var actual = browser.execute(`return $('label:contains("Slide Header Text:") input')[0].value`).value;
            var expected = testdata.case1.Slides[0].SlideHeaderText;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be reatined by Slide Title Text field', () => {
            var actual = browser.execute(`return $('label:contains("Slide Title:") input')[0].value`).value;
            var expected = testdata.case1.Slides[0].SlideTitle;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be reatined by Slide Emphasized Text field', () => {
            var actual = browser.execute(`return $('label:contains("Slide Emphasized Text:") input')[0].value`).value;
            var expected = testdata.case1.Slides[0].SlideEmphasizedText;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be reatined by Slide Sub Text Text field', () => {
            var actual = browser.execute(`return $('label:contains("Slide Sub Text:") input')[0].value`).value;
            var expected = testdata.case1.Slides[0].SlideSubText;
            expect(actual).to.equal(expected);
        });
});

describe('Edit Existing module: HTML code must be encoded and retained in the XML', () => {

        before(() => {
            browser.pause(60000);
            test.NavigatetoATSStatusCheckerPageOf(chronid, 'live');
            test.ClickButtonInATSPage('ATS Reprocess');
            test.WaitForATSFile('ATS Output File');
            browser.pause(5000);
            xmlFile = test.GetXML(chronid,'live');
        })

        it('HTML code must be retained in encoded format for module_title tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.module_title.title;
            var expected = testdata.case1.ModuleTitle;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be retained in encoded format for logo title tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.logos.logo.logo_overridetext;
            var expected = testdata.case1.LogoTitle;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be retained in encoded format for slide header text tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide.slide_name;
            var expected = testdata.case1.Slides[0].SlideHeaderText;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be retained in encoded format for slide title tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide.slide_title;
            var expected = testdata.case1.Slides[0].SlideTitle;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be retained in encoded format for slide emphasized text tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide.slide_title_emphasized_text;
            var expected = testdata.case1.Slides[0].SlideEmphasizedText;
            expect(actual).to.equal(expected);
        });

        it('HTML code must be retained in encoded format for slide sub text tag in the XML', () => {
            var actual = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.slides.slide.slide_sub_text;
            var expected = testdata.case1.Slides[0].SlideSubText;
            expect(actual).to.equal(expected);
        });
});
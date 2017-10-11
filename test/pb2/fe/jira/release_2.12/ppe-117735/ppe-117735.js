var test = require('./../../../../common/functions/functions');
var testdata = require('./../../../../data/testdata/ppe-117735.testdata').ppe_117735;
var randomstring = require('randomstring');


var smchronid= '';
var chronid = '';
var test_url = 'http://www.***.webmd.com/default.htm';
var test_chronID = "091e9c5e816558a8";
var error_msg = "URL not found. The URL must start with http:// and be in the current site/environment"

if (global.testEnv === 'qa02'){
    test_url = test_url.replace('***', 'perf')
}
else{
    test_url = test_url.replace('***', global.testEnv)
}

describe('PPE-117735: Verify the query string for the url are not trimmed when searched from Global Search', () => {

        before(() => {
            test.LaunchAppAndLogin();
            test.SearchFor(null, test_url, 'global search', null);
            browser.pause(10000);
        })

        it('Verify the user is displayed with appropriate asset when searched with valid url', () => {
            var  chronid = browser.element("//span[contains(@class, 'pb-chronSummary-value')]/a").getText();
            expect(chronid).to.equal(test_chronID);
        });

        it('Verify the error is displayed when performed a global search with invalid query parameters', () => {
            browser.url(global.appUrl);
            test.SearchFor(null, test_url + '?test=123', 'global search', null);
            browser.pause(10000);
            var  chronid = browser.element("//span[contains(@class, 'pb-chronSummary-value')]/a").getText();
            expect(chronid).to.equal(test_chronID);

            browser.url(global.appUrl);
            test.SearchFor(null, test_url + '#123', 'global search', null);
            browser.pause(10000);
            var  chronid = browser.element("//span[contains(@class, 'pb-chronSummary-value')]/a").getText();
            expect(chronid).to.equal(test_chronID);

        });

        it('Verify the creation of pointers for urls with query string', () => {
            browser.url(global.appUrl);
            smchronid = test.Create('Shared Module', testdata);
            browser.pause(5000)
            var ptr_chronid = ''
            var ptrurl1 = test_url + '?' + randomstring.generate(5) + '='+ randomstring.generate(5);
            var ptrurl2 = test_url + '?' + randomstring.generate(5) + '='+ randomstring.generate(5);
            testdata.ModuleLink = ptrurl1;
            testdata.LogoLink = ptrurl1;
            testdata.Slides[0].SlideHeaderLink = ptrurl2;
            test.ConfigureModule('Standard Promo', testdata);
            test.SaveOrPublishTheAsset('Publish to Live', 'Testing PPE-117735 using automation script');
            console.log("Asset chronic ID", smchronid);
        });

        it('Verify the duplicate pointers are not created for same url', () => {
            test.NavigatetoATSStatusCheckerPageOf(smchronid, 'live');
            test.WaitForATSFile('ATS Output File');
            browser.pause(5000);
            xmlFile = test.GetXML(smchronid,'live');
            var module_link_ptr = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.module_title.link_url.$.object_type;
            var module_link_ptr_cid = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.module_title.link_url.$.chronic_id;
            expect(module_link_ptr).to.equal('wbmd_cons_ptr');

            var logo_link_ptr = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.logos.logo.logo_link_url.$.object_type;
            var logo_link_ptr_cid = xmlFile.webmd_rendition.content.wbmd_asset.webmd_module.module_data.logos.logo.logo_link_url.$.chronic_id;
            expect(logo_link_ptr).to.equal('wbmd_cons_ptr');
            expect(module_link_ptr_cid).to.equal(logo_link_ptr_cid)

        });

});
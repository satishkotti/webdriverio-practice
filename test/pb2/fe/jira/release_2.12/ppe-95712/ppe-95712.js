var randomstring = require("randomstring");
var test = require('./../../../../common/functions/functions');
var testdata = require('./../../../../data/testdata/ppe-95712.testdata').ppe_95712;
var props = require('./../../../../common/elements/assetprops.page');
var sql = require('.//../../../../../common/db/sqlDb');

var dbrecords = [];
var testEnv= global.testEnv;
var chronid = '';
var expired_url = '';
var expired_chronic_id = '';
var smchronid = ''; 
var error_msg = 'The DCTM ID is expired.';
var link_ptr_cid = '';

describe('PPE-95712: Verify the query string for the url are not trimmed when searched from Global Search', () => {

        before(() => {
            var query = `select top 5 * from RT_PageUrlMap where status = 'D'`;
            //var query = `select  content_chronic_id ,friendly_url from RT_PageUrlMap where status = 'D' Group by content_chronic_id,friendly_url having count(friendly_url) = 1`;
            sql.executeQuery(query).then(function(resultset){
                dbrecords = resultset;
                expired_url = dbrecords[0].friendly_url;
                expired_url = 'http://www.' + testEnv + '.webmd.com' + expired_url;
                expired_chronic_id = dbrecords[0].content_chronic_id;
            });
            browser.pause(30000);
            test.LaunchAppAndLogin();
            console.log(expired_chronic_id, expired_url)
        })

        it('Verify the creation of pointers for urls with query string', () => {
            smchronid = test.Create('Shared Module', testdata);
            browser.pause(5000)
            testdata.ModuleLink = expired_url;
            testdata.LogoLink = expired_url;
            test.ConfigureModule('Standard Promo', testdata);
            test.SaveOrPublishTheAsset('Publish to Live', 'Testing PPE-95712 using automation script');
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
            link_ptr_cid = logo_link_ptr_cid;
            console.log("Pointer Chronicle IDs", module_link_ptr_cid,logo_link_ptr_cid )
        });

        it('Verify that pointers are not created for expired chronicle IDs', () => {
            browser.url(global.appUrl);
            smchronid = test.Create('Shared Module', testdata);
            browser.pause(5000)
            testdata.ModuleLink = expired_chronic_id;
            props.input.get('Module Title').setValue(testdata.ModuleTitle);
            try{
                props.lookup2('Module Title', 'Link', 1, testdata.ModuleLink);
            }
            catch(err){
                var error = browser.element("//div[contains(@class, 'pb-modal-text')]").getText()
                expect(error).to.equal(error_msg);
            }
        });

        after(() => {
            var dm_ticket = test.GenerateApiAccessToken();
            var payload = {"rObjectIds":[link_ptr_cid]};
            var resp = test.ExpireAssetUsingApi(dm_ticket, payload);
            console.log(resp)
        })
});
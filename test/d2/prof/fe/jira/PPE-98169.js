var helper = require('./../../functions/helper');
var common = require('./../../common/commonLib');
var randomstring = require("randomstring");
var randomtext = randomstring.generate(5);

describe('News Team - Customization Template PPE-98169', function () {
   

    it('Verify the user is able to create the article or not', function () {
       helper.articlecreation(browser,{
            template: global.d2ProfDataSettings.template,
            objectTitle: global.d2ProfDataSettings.objectTitle,
            profilename:global.d2ProfDataSettings.profilename,
            contentType:global.d2ProfDataSettings.contentType,
        });        
        expect(browser.getTitle()).to.equal(global.d2ProfDataSettings.homepageTitle);
    });

    it('Verify the edit properties', function () {
        var propertiesArray ='object_name-input,title-input,wbmd_legacy_id,wbmd_wdw_ttl-input,wbmd_bus_ref-input,wbmd_lead_concept-input,'+
        'wbmd_keywords-input,wbmd_content_fcs,wbmd_desc_meta-input,wbmd_img_thmb-input,wbmd_rel_links_type-input,wbmd_rel_link_lbl-input,wbmd_suppress_search-input,'+
        'wbmd_suppress_link-input,wbmd_suppress_comment-input,wbmd_cont_dev-input,wbmd_toc_display-input,wbmd_bkt_gen_coll_id,wbmd_prim_coll-input,wbmd_supp_ads-input,'+
        'wbmd_supp_rec_ads-input,wbmd_pub_dt-input,wbmd_lead_spclty-input,wbmd_spclty_high,wbmd_spclty_low,wbmd_spclty_featured,wbmd_spclty,wbmd_publ-input,'+
        'wbmd_pub_sec_id-input,wbmd_pub_subsec_id-input,wbmd_orig_pub_dt-input,wbmd_gated-input,wbmd_authr_prim,wbmd_eff_date-input';
        var isexits= helper.verifyeditproperties(browser,propertiesArray.split(','));
        var test="";
        expect(isexits).to.equal(test);
    });
    before(function () {

        browser.addCommand('login', helper.login.bind(browser));
        browser.setViewportSize({
            width: 1024,
            height: 768
        });
        browser.login(browser, {
            url: helper.getEnvTestUrl(),
            username: helper.getQANewsUserInfo().username,
            password: helper.getQANewsUserInfo().password
        });
        helper.traverspath(browser,{
            rootpath: global.d2ProfDataSettings.rootpath
        });
    });
});
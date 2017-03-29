var randomstring = require("randomstring");
var JSONPath = require('JSONPath');

module.exports.GenerateRandomString = function GenerateRandomString() {
    return randomstring.generate(5);
}

module.exports.testSettings = {
    "dev04": {
       "dctmApiConfig": {
            "dctmUsername": "QAPublication",
            "dctmPassword": "QA-Doc#1",
            "dctmDocbase": "webmddoc01",
            "url": "http://dmrest.dev01.webmd.com/pbws"
        },
        "d2prof": {
            "url": "http://dmd201d-prf-08.portal.webmd.com:8080/D2/#d2",
            "users": [
                {
                    "id": "1",
                    "username": "QAPublication",
                    "password": "QA-Doc#1",
                    "type": "user"
                },
                {
                    "id": "2",
                    "username": "QANews",
                    "password": "QA-Doc#1",
                    "type": "super user"
                },
                {
                    "id": "3",
                    "username": "QAPublication1",
                    "password": "QA-Doc#1",
                    "type": "user"
                }
            ]
        },
        "ats":{
            url:"http://ats.preview.dev01.webmd.com/SCSFile.aspx?ID="
        }
    },
    "qa01": {
       "dctmApiConfig": {
            "dctmUsername": "QAPublication",
            "dctmPassword": "QA-Doc#1",
            "dctmDocbase": "webmddoc01",
            "url": "http://dmd201d-prf-08.portal.webmd.com:8080/D2/#d2"
        },
        "d2prof": {
            "url": "http://d2.qa01.webmdprofessional.com/D2/#d2",
            "users": [
                {
                    "id": "1",
                    "username": "QAPublication",
                    "password": "QA-Doc#1",
                    "type": "user"
                },
                {
                    "id": "2",
                    "username": "QANews",
                    "password": "QA-Doc#1",
                    "type": "super user"
                },
                {
                    "id": "3",
                    "username": "QAPublication1",
                    "password": "QA-Doc#1",
                    "type": "user"
                }
            ]
        },
        "ats":{
            url:"http://ats.preview.dev01.webmd.com/SCSFile.aspx?ID="
        }
    },
    "data": {
        "expectedResults": {
            "HomePageTitle": "D2"
        },
        "inputData": {
            "AssetName":"QATestAssethNrnC",
            "testFolderPath": "webmd/professional_assets/medscape/news/heartwire/news/200005",
            "ArticleProfileName": 'News Article Templates',
            "ProfileName":"US / Article Templates",
            "ArticleTemplate": 'News Article',
            "ArticleObjectName": "QATestAsset" + exports.GenerateRandomString(5),
            "NewsArticleObjectName": "QATestAsset" + exports.GenerateRandomString(5),
            "ContentType":"News",
            "ArticleDescription": "QATestAsset" + exports.GenerateRandomString(5),
            "LeadSpecialty": "Cardiology",
            "ContentDeveloper": "Medscape",
            "newsPropertiesLabels":"object_name-input,title-input,wbmd_legacy_id,wbmd_wdw_ttl-input,wbmd_bus_ref-input,wbmd_lead_concept-input,"+
                                    "wbmd_keywords-input,wbmd_content_fcs,wbmd_desc_meta-input,wbmd_img_thmb-input,wbmd_rel_links_type-input,wbmd_rel_link_lbl-input,wbmd_suppress_search-input,"+
                                    "wbmd_suppress_link-input,wbmd_suppress_comment-input,wbmd_cont_dev-input,wbmd_toc_display-input,wbmd_bkt_gen_coll_id,wbmd_prim_coll-input,wbmd_supp_ads-input,"+
                                    "wbmd_supp_rec_ads-input,wbmd_pub_dt-input,wbmd_lead_spclty-input,wbmd_spclty_high,wbmd_spclty_low,wbmd_spclty_featured,wbmd_spclty,wbmd_publ-input,wbmd_rel_links_asset,"+
                                    "wbmd_pub_sec_id-input,wbmd_pub_subsec_id-input,wbmd_orig_pub_dt-input,wbmd_gated-input,wbmd_authr_prim,wbmd_eff_date-input,wbmd_desc_user-input,wbmd_concept,"+
                                    "wbmd_suppress_share-input,wbmd_qna_id-input,wbmd_ad_override-input,wbmd_exp_date-input",
            "basicInfoTab":"object_name-input,title-input,wbmd_legacy_id,wbmd_wdw_ttl-input,wbmd_super_title-input,wbmd_sub_title-input,wbmd_bus_ref-input,wbmd_lead_spclty-input,wbmd_spclty_high,"+
                            "wbmd_spclty_low,wbmd_spclty_featured,wbmd_spclty,wbmd_lead_concept-input,wbmd_concept,wbmd_keywords-input,wbmd_content_fcs,wbmd_desc_user-input,"+
                            "wbmd_desc_meta-input,wbmd_img_thmb-input,wbmd_rel_links,wbmd_rel_links_asset,wbmd_rel_links_type-input,wbmd_rel_link_lbl-input,wbmd_suppress_search-input,wbmd_suppress_link-input,"+
                            "wbmd_suppress_share-input,wbmd_suppress_comment-input,wbmd_suppress_feature_belt-input,wbmd_cont_dev-input,wbmd_ad_excl,wbmd_language-input,wbmd_prod_type-input",
            "articleTab":"wbmd_outpt_vers,wbmd_outpt_prim-input,wbmd_icons,wbmd_toc_display-input,wbmd_qna_id-input,wbmd_activity-input,wbmd_prod_name-input,wbmd_cme_lnk-input,wbmd_bkt_gen_coll_id,"+
                        "wbmd_prim_coll-input,wbmd_site-input,wbmd_site_only-input,wbmd_locale,wbmd_proj_id-input,wbmd_supprtr,wbmd_ad_override-input,wbmd_supp_ads-input,wbmd_supp_rec_ads-input,"+
                        "wbmd_disp_cite-input,wbmd_discuss_brd_ohcp-input,wbmd_discuss_brd_md-input,wbmd_discuss_brd_nrs-input,wbmd_revw_dt-input,wbmd_pub_dt-input,wbmd_tgt_cntry,wbmd_supp_print-input,"+
                        "wbmd_supp_mobile-input,wbmd_gated-input,wbmd_ext_id-input,wbmd_supp_prog_lnk-input"               

            
             
        },
        "otfData": {
            "objectType":"Object Type",
            "objectName":"Object Name",
            "title":"Title",
            "status":"Status",
            "primary":"Primary",
            "link":"Link",
            "unlink":"UnLink",
            "article":"Article",
            "audio":"Audio",
            "wip":"WIP",
            "outputVersion":"Output Version",
            "text":"text",
            "transcript":"Transcript",
            "active":"Active"
        }
    }
}

module.exports.EnvSettings = {
    getEnvSettings: function (env) {
        var settings = JSONPath({
            json: module.exports.testSettings,
            path: ("$." + env),
            resultType: 'all'
        });

        //console.log('Env settings:' + settings[0].value);

        return settings[0].value;
    },
    getEnvData: function (env) {
        var allSettings = JSONPath({
            json: module.exports.testSettings,
            path: "$.data",
            resultType: 'all'
        });

        //        console.log('Env All data:' + allSettings[0].value);

        return allSettings[0].value;
    }
}
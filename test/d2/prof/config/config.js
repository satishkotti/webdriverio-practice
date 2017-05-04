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
            "environment":"dev04",
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
                    "username": "QAAdminEmed",
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
            "environment":"qa01",
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
                    "username": "QAAdminEmed",
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
            "SlideAssetName": "QATestSlideArticle", //"QATestAssethNrnC",
           // "SlideFolderPath": "webmd/professional_assets/medscape/articles/article/2015/QATest",
           "SlideFolderPath":  "webmd/professional_assets/medscape/news",
            "locale":"US",
            "testFolderPathPubSection": "webmd/professional_assets/medscape/news",
            "AssetName":"QATestAssethNrnC",
            "MediaName":"QAProfMediaTest",
            "testFolderPath": "webmd/professional_assets/medscape/news",
            "testFolderPath_de": "webmd_de/professional_assets/medscape/articles/news",
            "testFolderPath_fr": "webmd_fr/professional_assets/medscape/articles/news",
            "testFolderPath_sp": "webmd_sp/professional_assets/medscape/articles/news",
            "testFolderPath_pt": "webmd_pt/professional_assets/medscape/articles/news",
            "ArticleProfileName": 'News Article Templates',
            "PublicationProfileName": 'US / Publication Templates',
            "PublicationSectionTemplate":'Professional Publication Section',
            "ProfileName":"US / Article Templates",
             "publicationProfileName":"US / Publication Templates",
            "ProfileName_de":"DE / Article Templates",
            "ProfileName_fr":"FR / Article Templates",
            "ProfileName_pt":"PT / Article Templates",
            "ProfileName_sp":"SP / Article Templates",
            "ProfileOtherName": "US / Other Templates",
            "ProfileOtherName_de": "DE / Other Templates",
            "ProfileOtherName_fr": "FR / Other Templates",
            "ProfileOtherName_sp": "SP / Other Templates",
            "ProfileOtherName_pt": "PT / Other Templates",
            "ProfileMeta": "Meta Object",
            "ArticleTemplate": 'News Article',
            "PointerTemplate": "Professional Pointer",
            "MediaTemplate": "Professional Media",
            "ArticleTemplate": 'News Article',
            "ObjectName": "QATestAsset" + exports.GenerateRandomString(5),
            "PointerTemplate": "Professional Pointer",
             "changeFolderPath": "webmd/professional_assets/medscape/news/heartwire/news/2012",
            "OthersProfileName":"US / Other Templates",
            "OtherTypes":"Professional Media",
            "GenericTemplate":"Article Generic",
            "PublicationsubsectionTemplate":"Professional Publication Sub Section",
            "ProfMediaTemplate":"Article Generic",
            "GenericContType":"News",
            "ArticleObjectName": "QATestAsset" + exports.GenerateRandomString(5),
            "NewsArticleObjectName": "QATestAsset" + exports.GenerateRandomString(5),
            "GenericArticleObjectName": "QAGeneric" + exports.GenerateRandomString(5),
            "ContentType":"News",
            "MediaFormat":"MP3",
            "SlideArticleTemplate": "Article Slide Presentation",
            "SlideArticleObjectName": "QATestSlide" + exports.GenerateRandomString(5),
            "SlideContentType": "News",
            "GenericArticleObjectName": "QAGeneric" + exports.GenerateRandomString(5),
            "ContentType_SP":"Alertas",
            "ArticleDescription": "QATestAsset" + exports.GenerateRandomString(5),
            "LeadSpecialty": "Cardiology",
            "pointerExistingAsset":"pertussis-disease3",
            "ContentDeveloper": "Medscape",
            "DeleteAllversions":"Delete all versions", 
            "Deleteselectedversion":"Delete selected version only",
            "DeleteAllversions":"Delete all versions",
            "mediaFolderPath":"webmd/professional_assets/medscape/media/output_version/media",
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
                        "wbmd_supp_mobile-input,wbmd_gated-input,wbmd_ext_id-input,wbmd_supp_prog_lnk-input",
            "active":"Active",
	        "searchdata": "860272",
            "objName":"QATestAssethNrnC",   
            "InitialVersion":"1.0, CURRENT, WIP",
            "CheckedInVersion":"1.1, CURRENT, WIP",
            "ProfPublication":'Professional Publication', 
            "PublicationName": "QATestAsset" + exports.GenerateRandomString(5)   ,
            "ExistingProfPublicationName":"QATestProfPublication",
            "companyName":"AGA Institute",
            "publicationType":"Book",
            "publicationRelationships":"None",
            "siteRestrictions":"Medscape-www",
            "publicationSections":"QATestPublicationSection",
            "copyRights":"London: SAGE",
            "ExistingArticleName":"QAGenericArticleTest",
            "searchImageData":"a",
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
            "active":"Active",
            "searchdata": "860272",
            "objName":"QATestAssethNrnC",
        },
        "PSDEData":{
            "AssetName":"QADETestPubSection",
           // "testFolderPathPubSection": "webmd_de/professional_assets/medscape/articles/news/articles/2015/test",
            "testFolderPathPubSection": "webmd_de/professional_assets/medscape/articles/news",
            "PublicationProfileName":"DE / Publication Templates",
            "LeadSpecialty": "Psychiatrie",
            "ContentDeveloper": "Partner",
            "ObjectName": "QADETestPubSection" + exports.GenerateRandomString(5),
        },
        "PSFRData":{
            "AssetName":"QAFRTestPubSection",
           // "testFolderPathPubSection": "webmd_fr/professional_assets/medscape/articles/news/articles/2013/test",
             "testFolderPathPubSection": "webmd_fr/professional_assets/medscape/articles/news",
            "PublicationProfileName":"FR / Publication Templates",
            "LeadSpecialty": "Cardiologie",
            "ContentDeveloper": "Partner",
            "ObjectName": "QAFRTestPubSection" + exports.GenerateRandomString(5),
        },
        "PSPTData":{
            "AssetName":"QAPTTestPubSection",
           // "testFolderPathPubSection": "webmd_pt/professional_assets/medscape/articles/news/articles/2015/test",
            "testFolderPathPubSection": "webmd_pt/professional_assets/medscape/articles/news",
            "PublicationProfileName":"PT / Publication Templates",
            "LeadSpecialty": "Cardiologia",
            "ContentDeveloper": "N/A",
            "ObjectName": "QAPTTestPubSection" + exports.GenerateRandomString(5),
        },
        "PSSPData":{
            "AssetName":"QASPTestPubSection",
            //"testFolderPathPubSection": "webmd_sp/professional_assets/medscape/articles/news/articles/SP/test",
            "testFolderPathPubSection": "webmd_sp/professional_assets/medscape/articles/news",
            "PublicationProfileName":"SP / Publication Templates",
            "LeadSpecialty": "Dermatología",
            "ContentDeveloper": "N/A",
            "ObjectName": "QASPTestPubSection" + exports.GenerateRandomString(5),
        },
        "SDEData":{
            "AssetName":"QATestDESlideArticle",
           // "SlideFolderPath": "webmd_de/professional_assets/medscape/articles/news/articles/2015/test",
            "SlideFolderPath": "webmd_de/professional_assets/medscape/articles/news",
            "ProfileName":"DE / Article Templates",
            "LeadSpecialty": "Psychiatrie",
            "ContentDeveloper": "Partner",
            "SlideArticleObjectName": "QADETestSlide" + exports.GenerateRandomString(5),
        },
        "SFRData":{
            "AssetName":"QATestFRSlideArticle",
            //"SlideFolderPath": "webmd_fr/professional_assets/medscape/articles/news/articles/2013/test",
            "SlideFolderPath": "webmd_fr/professional_assets/medscape/articles/news",
            "ProfileName":"FR / Article Templates",
            "LeadSpecialty": "Cardiologie",
            "ContentDeveloper": "Partner",
            "SlideArticleObjectName": "QAFRTestSlide" + exports.GenerateRandomString(5),
        },
        "SPTData":{
            "AssetName":"QATestPTSlideArticle",
           // "SlideFolderPath": "webmd_pt/professional_assets/medscape/articles/news/articles/2015/test",
            "SlideFolderPath": "webmd_pt/professional_assets/medscape/articles/news",
            "ProfileName":"PT / Article Templates",
            "LeadSpecialty": "Cardiologia",
            "ContentDeveloper": "N/A",
            "SlideArticleObjectName": "QAPTTestSlide" + exports.GenerateRandomString(5),
        },
        "SSPData":{
            "AssetName":"TestSlideArticle",
            //"SlideFolderPath": "webmd_sp/professional_assets/medscape/articles/news/articles/SP/test",
            "SlideFolderPath": "webmd_sp/professional_assets/medscape/articles/news",
            "ProfileName":"SP / Article Templates",
            "LeadSpecialty": "Dermatología",
            "ContentDeveloper": "N/A",
            "SlideArticleObjectName": "QASPTestSlide" + exports.GenerateRandomString(5),
            "SlideContentType":"Alertas",
        },
        "DEData":{
            "AssetName":"QAGenericArticleTest",
            //"testFolderPath": "webmd_de/professional_assets/medscape/articles/news/articles/2015/test",
             "testFolderPath": "webmd_de/professional_assets/medscape/articles/news",
            "ProfileName":"DE / Article Templates",
            "publicationProfileName":"DE / Publication Templates",
            "LeadSpecialty": "Psychiatrie",
            "ContentDeveloper": "Partner",
            "GenericArticleObjectName": "QAGeneric" + exports.GenerateRandomString(5),
            "mediaFolderPath":"webmd_de/professional_assets/medscape/media/output_version/media",
            "MediaName":"QATestProfMediaTest",
            "PublicationProfileName": 'DE / Publication Templates',
            "companyName":"Medscape",
            "publicationType":"Online",
            "publicationRelationships":"Original",
            "siteRestrictions":"Medscapemedizin-praxis",
            "copyRights":"", 
        },
        "FRData":{
            "AssetName":"QAGenericArticleTest",
           // "testFolderPath": "webmd_fr/professional_assets/medscape/articles/news/articles/2013/test",
            "testFolderPath": "webmd_fr/professional_assets/medscape/articles/news",
            "ProfileName":"FR / Article Templates",
            "publicationProfileName":"FR / Publication Templates",
            "LeadSpecialty": "Cardiologie",
            "ContentDeveloper": "Partner",
            "GenericArticleObjectName": "QAGeneric" + exports.GenerateRandomString(5),
            "mediaFolderPath":"webmd_fr/professional_assets/medscape/media/output_version/media",
            "MediaName":"QATestProfMediaTest",
            "PublicationProfileName": 'FR / Publication Templates',
            "companyName":"Medscape",
            "publicationType":"Online",
            "publicationRelationships":"None",
            "siteRestrictions":"Medscape-France-dpc",
            "copyRights":"", 
        },
        "PTData":{
            "AssetName":"QAGenericArticleTest",
           //"testFolderPath": "webmd_pt/professional_assets/medscape/articles/news/articles/2015/test",
            "testFolderPath": "webmd_pt/professional_assets/medscape/articles/news",
            "ProfileName":"PT / Article Templates",
            "publicationProfileName":"PT / Publication Templates",
            "LeadSpecialty": "Cardiologia",
            "ContentDeveloper": "N/A",
            "GenericArticleObjectName": "QAGeneric" + exports.GenerateRandomString(5),
            "mediaFolderPath":"webmd_pt/professional_assets/medscape/media/output_version/media",
            "MediaName":"QATestProfMediaTest",
            "PublicationProfileName": 'PT / Publication Templates',
            "companyName":"",
            "publicationType":"Online",
            "publicationRelationships":"None",
            "siteRestrictions":"Medscape-Portugal-cme",
            "copyRights":"", 
        },
        "SPData":{
            "AssetName":"QAGenericArticleTest",
            "GenericContType":"Alertas",
           //"testFolderPath": "webmd_sp/professional_assets/medscape/articles/news/articles/SP/test",
            "testFolderPath": "webmd_sp/professional_assets/medscape/articles/news",
            "ProfileName":"SP / Article Templates",
            "publicationProfileName":"SP / Publication Templates",
            "LeadSpecialty": "Dermatología",
            "ContentDeveloper": "N/A",
            "GenericArticleObjectName": "QAGeneric" + exports.GenerateRandomString(5),
            "MediaName":"QATestProfMediaTest",
            "companyName":"",
            "publicationType":"Online",
            "publicationRelationships":"None",
            "siteRestrictions":"Medscape-Spain-cme",
            "copyRights":"", 
            "mediaFolderPath":"webmd_sp/professional_assets/medscape/media/output_version/media",
        },
        "profOutputData": {
            "ProfileName":"US / Other Templates",
            "DEProfileName":"DE / Other Templates",
            "FRProfileName":"FR / Other Templates",
            "PTProfileName":"PT / Other Templates",
            "SPProfileName":"SP / Other Templates",
            "DEFolderPath": "webmd_de/professional_assets/medscape/articles/news",
            "FRFolderPath": "webmd_fr/professional_assets/medscape/articles/news",
            "PTFolderPath": "webmd_pt/professional_assets/medscape/articles/news",
            "SPFolderPath": "webmd_sp/professional_assets/medscape/articles/news",
            "ArticleTemplate": 'Professional Output Versions',
            "outputType": "Audio", 
            "introText": "ProfOutput Intro",
            "contentText": "ProfOutput Content",
            "publishVersion": "1.1, CURRENT, WIP, Staging, Approved, Live, Active",
            "defaultDateText": "MM/DD/YYYY HH:MM:SS",
            "wipVersion": "1.0, CURRENT, WIP",
            "objType": "wbmd_prof_output"
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
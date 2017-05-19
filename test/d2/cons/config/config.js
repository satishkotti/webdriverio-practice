var randomstring = require("randomstring");
var JSONPath = require('JSONPath');

module.exports.GenerateRandomString = function GenerateRandomString(X) {
    return randomstring.generate(X);

}
module.exports.testSettings = {
    "dev01": {
        "siteMgmtDb": {
            "user": "appsa",
            "password": "Dconapp$",
            "server": "sqlvp-cdv1-08.portal.webmd.com",
            "database": "Pagebuilder_SiteManagement"
        },
        "dctmApiConfig": {
            "dctmUsername": "QAPublication",
            "dctmPassword": "QA-Doc#1",
            "dctmDocbase": "webmddoc01",
            "url": "http://dmrest.dev01.webmd.com/pbws"
        },
        "d2cons": {
            "url": "http://d2.dev01.webmd.com/D2/#d2",
            "users": [{
                    "id": "1",
                    "username": "QAPublication",
                    "password": "QA-Doc#1",
                    "type": "user"
                },
                {
                    "id": "2",
                    "username": "QAPublication09",
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
        "ats": {
            url: "http://ats.preview.dev01.webmd.com/SCSFile.aspx?ID="
        }
    },
    "dev04": {
        "siteMgmtDb": {
            "user": "appsa",
            "password": "",
            "server": "",
            "database": "Pagebuilder_SiteManagement"
        },
        "dctmApiConfig": {
            "dctmUsername": "QAPublication",
            "dctmPassword": "QA-Doc#1",
            "dctmDocbase": "webmddoc01",
            "url": "http://dmrest.dev04.webmd.com/pbws"
        },
        "d2cons": {
            //"url": "http://d2.dev04.webmd.com/D2/#d2",
            "url": "http://dmd241d-con-08.portal.webmd.com:8080/D2/#d2",
            "users": [{
                    "id": "1",
                    "username": "QAPublication",
                    "password": "QA-Doc#1",
                    "type": "user"
                },
                {
                    "id": "2",
                    "username": "QAPublication09",
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
    "ats": {
            "url": "http://ats.preview.dev04.webmd.com/SCSFile.aspx?ID="
        }
    },
    "qa01": {
        "siteMgmtDb": {
            "user": "appsa",
            "password": "",
            "server": "",
            "database": "Pagebuilder_SiteManagement"
        },
        "dctmApiConfig": {
            "dctmUsername": "QAPublication",
            "dctmPassword": "QA-Doc#1",
            "dctmDocbase": "webmddoc01",
            "url": "http://dmrest.qa01.webmd.com/pbws"
        },
        "d2cons": {
            "url": "http://d2.qa01.webmd.com/D2/#d2",
            "users": [{
                    "id": "1",
                    "username": "QAPublication",
                    "password": "QA-Doc#1",
                    "type": "user"
                },
                {
                    "id": "2",
                    "username": "QAPublication09",
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
    "ats": {
            "url": "http://ats.preview.qa01.webmd.com/SCSFile.aspx?ID="
        }
    },
    "qa00": {
        "siteMgmtDb": {
            "user": "appsa",
            "password": "",
            "server": "",
            "database": "Pagebuilder_SiteManagement"
        },
        "dctmApiConfig": {
            "dctmUsername": "QAPublication",
            "dctmPassword": "QA-Doc#1",
            "dctmDocbase": "webmddoc01",
            "url": "http://dmrest.qa00.webmd.com/pbws"
        },
        "d2cons": {
            "url": "http://d2.qa00.webmd.com/D2/#d2",
            "users": [{
                    "id": "1",
                    "username": "QAPublication",
                    "password": "QA-Doc#1",
                    "type": "user"
                },
                {
                    "id": "2",
                    "username": "QAPublication09",
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
    "ats": {
            "url": "http://ats.preview.qa00.webmd.com/SCSFile.aspx?ID="
        }
    },
    "data": {
        "expectedResults": {
            "bulletlist": "Bulleted List",
            "headline": "Module Headline",
            "moduleDescription": "Module Description",
            "align": "Align",
            "alignLeftOption": "Left",
            "alignMiddleOption": "Middle",
            "alignRightOption": "Right",
            "bullet": "Bullets",
            "bulletTitle": "Title",
            "insertBulletTitle": "Insert Bullet Title",
            "insertBulletDescription": "Insert Bullet Description",
            "moduleTitle": "QA",
            "bulletTitleValidation": "Please enter a title for the bullet!",
            "bulletDescriptionValidation": "Please enter a description for the bullet!",
            "bulletEmptyValidation": "Please add at least 1 bullet to the bullet list!",
            "HomePageTitle": "D2"
        },
        "pullQuote": {
                "menuOptionText": "Pull Quote",
                "text": "QA Pull Quote Text",
                "attribution": "QA Pull Quote Attribution",
                "alignLeft": "Left",
                "contentClassification":"ZZ - Dummy Content Classification",
                "publication":"No URL dummy publication",
                "copyright": "2015 WebMD",
                "primaryTopicId": "Cold and Flu",
                "expectedClass": "wbmdembededmodule cke_widget_inline"
            },   
    	"featureTemplate": {
            "articleFeatureTemplate": 'Article / Feature Template',
            "imageSearchText":"heart",
            "featureModuleTitle":"QA Title",
            "featureAssetTitle":"QA Asset Title",
            "featureAssetDescription":"QA Asset Description",
            "alignLeft": "Left",
            "contentClassification":"ZZ - Dummy Content Classification",
            "publication":"No URL dummy publication",
            "copyright": "2015 WebMD",
            "primaryTopicId": "Cold and Flu",
            "expectedClass": "wbmdembededmodule cke_widget_inline",
            "moduleTitleLabel": "Module Title",
            "assetTitleLabel": "Asset Title",
            "assetDescriptionLabel": "Asset Description",
            "chronicleIdLabel": "Chronicle Id",
            "alignLabel": "Align",
            "thumbnailLabel": "Thumbnail",
            "suppressSocialLabel": "Suppress Social Share"
            },
        "inputData": {
            "rotpath": "webmd::2/consumer_assets::3/editorial::4/articles::5/other::6",
            "rootnode": "webmddoc01",
            "webmdcpyrights": '2015 WebMD',
            "objectTitle": "QAArticleNews",
            "articleContentFields": "Section Text,Highlights,Pull Quotes,Citations,Related Links Text",
            "bulletlistheadline": "Module Headline",
            "bulletlistmoduleDescription": "Module Description",
            "align": "Align",
            "alignLeftOption": "Left",
            "alignMiddleOption": "Middle",
            "alignRightOption": "Right",
            "bullet": "Bullets",
            "bulletTitle": "Title",
            "insertBulletTitle": "Insert Bullet Title",
            "insertBulletDescription": "Insert Bullet Description",
            "leftalignent": "Left",
            "rightalignent": "Right",
            "middlealignent": "Middle",
            "bulletlistalignment": "Right,Left,Middle",
            "CodeTypes": "Facebook,Youtube,Twitter,Pinterest,Reddit,Imgur,Snapchat,Tumblr,Instagram",
            "testFolderPath": "webmddoc01/webmd/consumer_assets/editorial/articles/other",
            "UKtestFolderPath": "webmddoc01/webmd_uk/consumer_assets/editorial/articles/Others",
            "ArticleProfileName": 'Consumer Portal US / Article Templates',
            "UkArticleProfileName": 'Consumer Portal UK / Article Templates',
             "HelathRefArticleTemplate":'Article / Health Reference Template',
            "ArticleTemplate": 'Article /  News Template',
            "ArticleObjectName": "QATestAsset" + exports.GenerateRandomString(5),
            "ArticleDescription": "QATestAsset" + exports.GenerateRandomString(5),
            "FacebookCodeType": "Facebook",
            "LookupFolderPath": "webmddoc01/webmd/web_publisher_list/lookups/interactive_articles",
            "USFolderpath": "webmddoc01/webmd/consumer_assets/editorial/articles",
            "UKFolderpath": "webmddoc01/webmd_uk/consumer_assets/editorial/articles",
            "ShareableTitle":"Shareable Title Test",
            "ShareableDescription": "Shareable Description Test",
            "FeatureTemplate": 'Article / Feature Template',
            "HealthRefTemplate": 'Article / Health Reference Template',
            "ShareableAlign":"Left",
            "ShareableSupressSocialShare":"true",
            "SectionTextData":"sample test data"+ exports.GenerateRandomString(2),
            "htmlFolderpath": "webmddoc01/webmd/consumer_assets/html/modules/cobrands",
            "htmlAssetName":"peoplepc-cbhat2.whtml",
            "htmlAssetTitle":"PeoplePC Cobrand Hat",
            "htmlVersion1":"1.0, Live",
            "htmlVersion2":"3.1, Live",
            "htmlAsset1Compare":"peoplepc-cbhat2.whtml - ( Ver. 1.0)",
             "htmlAsset2Compare":"peoplepc-cbhat2.whtml - ( Ver. 3.1)",
             "htmlCompareAttribute": "12 differences",
             "htmlCompareContent":"Matches",
             "htmlComparerendition":"Matches",
            "cssFolderpath": "webmddoc01/webmd/PageBuilder_Assets/CSS/091e9c5e8000511f/Footer",
            "cssAssetName":"2009 Health Solutions_091e9c5e802af342.css",
            "cssAssetTitle":"2009 Health Solutions",
            "cssVersion1":"1.0, Live",
            "cssVersion2":"3.0, Live",
            "cssAsset1Compare":"2009 Health Solutions_091e9c5e802af342.css - ( Ver. 1.0)",
            "cssAsset2Compare":"2009 Health Solutions_091e9c5e802af342.css - ( Ver. 3.0)",
             "cssCompareAttribute": "9 differences",
             "cssCompareContent":"Has differences",
             "cssComparerendition":"Matches",
             "jsFolderpath": "webmddoc01/webmd/PageBuilder_Assets/JS/modules/coverflow",
            "jsAssetName":"jquery.featureCarouselExtend.js",
            "jsAssetTitle":"Feature Carousel jQuery Plugin Extend",
            "jsVersion1":"1.0, Live",
            "jsVersion2":"4.1, Live",
            "jsAsset1Compare":"jquery.featureCarouselExtend.js - ( Ver. 1.0)",
            "jsAsset2Compare":"jquery.featureCarouselExtend.js - ( Ver. 4.1)",
             "jsCompareAttribute": "10 differences",
             "jsCompareContent":"Has differences",
             "jsComparerendition":"Matches",
              "htmlFolderpath_uk": "webmddoc01/webmd_uk/consumer_assets/html/eaf_templates",
            "htmlAssetName_uk":"email_tmpl_uk.whtml",
            "htmlAssetTitle_uk":"EAF template",
            "htmlVersion1_uk":"1.0, Live",
            "htmlVersion2_uk":"2.5, Live",
            "htmlAsset1Compare_uk":"email_tmpl_uk.whtml - ( Ver. 1.0)",
             "htmlAsset2Compare_uk":"email_tmpl_uk.whtml - ( Ver. 2.5)",
             "htmlCompareAttribute_uk": "11 differences",
             "htmlCompareContent_uk":"Matches",
             "htmlComparerendition_uk":"Matches",
            "cssFolderpath_uk": "webmddoc01/webmd_uk/PageBuilder_Assets/CSS/DynamicArticle/Dynamic Article",
            "cssAssetName_uk":"Article_091e9c5e8037404a.css",
            "cssAssetTitle_uk":"Article",
            "cssVersion1_uk":"10.0, Live",
            "cssVersion2_uk":"11.0, Live",
            "cssAsset1Compare_uk":"Article_091e9c5e8037404a.css - ( Ver. 10.0)",
            "cssAsset2Compare_uk":"Article_091e9c5e8037404a.css - ( Ver. 11.0)",
             "cssCompareAttribute_uk": "7 differences",
             "cssCompareContent_uk":"Has differences",
             "cssComparerendition_uk":"Matches",
             "jsFolderpath_uk": "webmddoc01/webmd_uk/PageBuilder_Assets/JS/modules/slideshow_dynamic",
            "jsAssetName_uk":"webmd.m.slideshowDynamic.js",
            "jsAssetTitle_uk":"JS for Dynamic Slideshow and Static Slideshow modules",
            "jsVersion1_uk":"1.0, Live",
            "jsVersion2_uk":"3.1, Live",
            "jsAsset1Compare_uk":"webmd.m.slideshowDynamic.js - ( Ver. 1.0)",
            "jsAsset2Compare_uk":"webmd.m.slideshowDynamic.js - ( Ver. 3.1)",
             "jsCompareAttribute_uk": "7 differences",
             "jsCompareContent_uk":"Has differences",
             "jsComparerendition_uk":"Matches",
             "DeleteAllversions":"Delete all versions", 
             "testFolderPath_uk": "webmddoc01/webmd_uk/consumer_assets/editorial/articles/Others",
             "ArticleProfileName_uk": 'Consumer Portal UK / Article Templates',


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
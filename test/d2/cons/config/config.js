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
            "CodeTypes": "Facebook, Youtube, Twitter, Pinterest, Reddit, Imgur, Snapchat, Tumblr, Instagram",
            "testFolderPath": "webmddoc01/webmd/consumer_assets/editorial/articles/other",
            "ArticleProfileName": 'Consumer Portal US / Article Templates',
            "ArticleTemplate": 'Article /  News Template',
            "ArticleObjectName": "QATestAsset" + exports.GenerateRandomString(5),
            "ArticleDescription": "QATestAsset" + exports.GenerateRandomString(5),
            "FacebookCodeType": "Facebook",
            "ShareableTitle":"Shareable Title Test",
            "ShareableDescription": "Shareable Description Test",
            "ShareableAlign":"Left",
            "ShareableSupressSocialShare":"true",
            "SectionTextData":"sample test data"+ exports.GenerateRandomString(2)

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
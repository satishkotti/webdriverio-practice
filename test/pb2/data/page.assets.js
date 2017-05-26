var page = require('./../../common/page');
var randomstring = require("randomstring");

var pagedata = Object.create(page, {

    normalStandalonePage : {get : () => {
        var assetName = "QAPage-ActivityQueue-" + randomstring.generate(5);
        var pageProps = {};
        return pageProps  = 
        {
            "type": "standalone",
            "inheritFrom" : null,
            "layout": "Responsive",
            "layoutCSS": "3 Column Responsive",
            "pageName": assetName,
            "friendlyName": assetName,
            "channel": null,
            "programCollection": null,
            "isCAP": 0,
            "isDefault": 0,
            "useArticleProperties": 0,
            "linkTitle": assetName + "-lkttl",
            "windowTitle": assetName + "-wdttl",
            "contentClassification": "Article within Article",
            "contentFilter": null,
            "primaryTopicID": "ADD-ADHD",
            "sponsorProgram": null,
            "keywords": assetName + "-kw",
            "userDesc": assetName + "-ud",
            "metaDesc": assetName + "-md",
            "isGated": 0,
            "sslRequired": 0,
            "tier": "tier2",
            "collectionCategory": null,
            "secondaryTopicID": null,
            "pageThumbnail": null,
            "publication": null,
            "healthRefType": null,
            "authRequired": "No",
            "webmdNickname": null,
            "internallySearchable": 1,
            "externallySearchable": 1 

        }
    }},

    normalInheritedPage: {value: { get: (templateToInheritFrom) =>
    {
        var assetName = "QAPage-ActivityQueue-" + randomstring.generate(5);
        var pageProps = {};
        return pageProps =
            {
                "type": "inherited",
                "inheritFrom": templateToInheritFrom,
                "layout": "Responsive",
                "layoutCSS": "3 Column Responsive",
                "pageName": assetName,
                "friendlyName": assetName,
                "channel": null,
                "programCollection": null,
                "isCAP": 0,
                "isDefault": 0,
                "useArticleProperties": 0,
                "linkTitle": assetName + "-lkttl",
                "windowTitle": assetName + "-wdttl",
                "contentClassification": "Article within Article",
                "contentFilter": null,
                "primaryTopicID": "ADD-ADHD",
                "sponsorProgram": null,
                "keywords": assetName + "-kw",
                "userDesc": assetName + "-ud",
                "metaDesc": assetName + "-md",
                "isGated": 0,
                "sslRequired": 0,
                "tier": "tier2",
                "collectionCategory": null,
                "secondaryTopicID": null,
                "pageThumbnail": null,
                "publication": null,
                "healthRefType": null,
                "authRequired": "No",
                "webmdNickname": null,
                "internallySearchable": 1,
                "externallySearchable": 1

            }

    }
    }
    }
});

module.exports = pagedata;
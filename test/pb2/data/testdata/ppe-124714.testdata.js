//Constants
//Random String module
const randomstring = require("randomstring");

//Generate the asset name
var assetName = "QA-CAP-Page-" + randomstring.generate(5)
module.exports = {
    ppe127552: {
        pagedata:
        {
            "type": "standalone",
            "inheritFrom": null,
            "layout": "Responsive",
            "layoutCSS": "3 Column Responsive",
            "pageName": assetName,
            "friendlyName": assetName,
            "channel": null,
            "programCollection": null,
            "isCAP": 1,
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
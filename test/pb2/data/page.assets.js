var page = require('./../../common/page');

var pagedata = Object.create(page, {

    normalStandalonePage : {get : () => {
        var pageProps = {};
        return pageProps  = 
        {
            "type": "standalone",
            "inheritFrom" : null,
            "layout": "Responsive",
            "layoutCSS": "3 Column Responsive",
            "pageName": "test",
            "friendlyName": "test",
            "channel": null,
            "programCollection": null,
            "isCAP": 0,
            "isDefault": 0,
            "useArticleProperties": 0,
            "linkTitle": "test",
            "windowTitle": "test",
            "contentClassification": "Article within Article",
            "contentFilter": null,
            "primaryTopicID": "ADD-ADHD",
            "sponsorProgram": null,
            "keywords": "test",
            "userDesc": "test",
            "metaDesc": "test",
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
    }}
});

module.exports = pagedata;
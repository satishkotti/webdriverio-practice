var page = require('./../../common/page');
var randomstring = require("randomstring");

var templatedata = Object.create(page, {

    normalStandaloneTemplateLeftRail : {get : () => {
        var assetName = "QATemplate-ActivityQueue-" + randomstring.generate(5);
        var templateProps = {};
        return templateProps  = 
        {
            "type": "standalone",
            "inheritFrom" : null,
            "layout": "Responsive",
            "layoutCSS": "2 Column Responsive - Left Rail",
            "templateName": assetName,
            "sponsorProgram": null,
            "description": assetName + "-desc",
            "isGated": 0,
            "tier": 2,
            "webmdNickname": null,

        }
    }},

    normalInheritedTemplateLeftRail : {value: {get: (templateToInheritFrom) =>
    {
        var assetName = "QATemplate-ActivityQueue-" + randomstring.generate(5);
        var templateProps = {};
        return templateProps =
            {
                "type": "inherited",
                "inheritFrom": templateToInheritFrom,
                "layout": "Responsive",
                "layoutCSS": "2 Column Responsive - Left Rail",
                "templateName": assetName,
                "sponsorProgram": null,
                "description": assetName + "-desc",
                "isGated": 0,
                "tier": 2,
                "webmdNickname": null,
            }
        }
    }},



    normalStandaloneTemplate : {get : () => {
        var assetName = "QATemplate-ActivityQueue-" + randomstring.generate(5);
        var templateProps = {};
        return templateProps  = 
        {
            "type": "standalone",
            "inheritFrom" : null,
            "layout": "Responsive",
            "layoutCSS": "3 Column Responsive",
            "templateName": assetName,
            "sponsorProgram": null,
            "description": assetName + "-desc",
            "isGated": 0,
            "tier": 2,
            "webmdNickname": null,

        }
    }},

    normalInheritedTemplate : {value: {get: (templateToInheritFrom) =>
    {
        var assetName = "QATemplate-ActivityQueue-" + randomstring.generate(5);
        var templateProps = {};
        return templateProps =
            {
                "type": "inherited",
                "inheritFrom": templateToInheritFrom,
                "layout": "Responsive",
                "layoutCSS": "3 Column Responsive",
                "templateName": assetName,
                "sponsorProgram": null,
                "description": assetName + "-desc",
                "isGated": 0,
                "tier": 2,
                "webmdNickname": null,

            }

        }

    }}
});

module.exports = templatedata;
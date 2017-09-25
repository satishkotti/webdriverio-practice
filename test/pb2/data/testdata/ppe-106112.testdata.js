const randomstring = require('randomstring');
var assetName = `QASM-PPE106112-${randomstring.generate(5)}`;

module.exports = {
    ppe_131022:
    {
        create:
        {
            "moduleName": assetName,
            "moduleDispName": assetName,
            "moduleType": "TwoColumnHeaderModule",
            "category": null,
            "selectXSL": null,
            "selectCSS": null,
            "dynamicModuleCategory": null,
            "moduleLabel1": null,
            "moduleLabel2": null,
            "linkedModule": null,
            "sponsorProgram": null,
            "description": assetName + "-desc",
            "tier": 2,
            "TitleText": "<title>Title</title>",
            "SubtitleText": "<subtitle>Subtitle Text test",
            "Image On": 0,
            "HeaderURL": "091e9c5e801651b2",
            "AttributionText": "Attribution Text",
            "Images":
            [
                {
                    "Link": "091e9c5e80661dc9",
                    "Image": "091e9c5e803fecd4",

                }
            ]
        },
        edit:
        {
            "moduleName": assetName,
            "moduleDispName": assetName,
            "moduleType": "TwoColumnHeaderModule",
            "category": null,
            "selectXSL": null,
            "selectCSS": null,
            "dynamicModuleCategory": null,
            "moduleLabel1": null,
            "moduleLabel2": null,
            "linkedModule": null,
            "sponsorProgram": null,
            "description": assetName + "-desc",
            "tier": 2,
            "TitleText": "$1Title",
            "SubtitleText": "$1Subtitle Text test$1",
            "ImageOn": 0,
            "HeaderURL": "091e9c5e801651b2",
            "AttributionText": "Attribution Text",
            "Images":
            [
                {
                    "Link": "091e9c5e80661dc9",
                    "Image": "091e9c5e803fecd4",

                }
            ]
        }
    }
}
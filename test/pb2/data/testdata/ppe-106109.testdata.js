const randomstring = require('randomstring');
var assetName = `QASM-PPE106109-${randomstring.generate(5)}`;

module.exports = {
    ppe_106109:
    {
        case1:
        {
            "moduleName": assetName,
            "moduleDispName": assetName,
            "moduleType": "StandardPromo",
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
            "ModuleTitle": "<title>Title</title>",
            "ModuleLink": "091e9c5e801651b2",
            "LogoImage": "091e9c5e803fecd4",
            "LogoTitle": "<logotitle>logotitle</logotitle>",
            "LogoLink": "091e9c5e80661dc9",
            "Slides":
            [
                {
                    "Image":"091e9c5e803fecd4",
                    "SlideHeaderText": "<slideheadertext>SlideHeaderText</slideheadertext>",
                    "SlideHeaderLink": "091e9c5e80661dc9",
                    "SlideTitle": "<slidetitle>SlideTitle</slidetitle>",
                    "SlideEmphasizedText": "<slideemphasizedtext>SlideEmphasizedText</slideemphasizedtext>",
                    "SlideSubText": "<slidesubtext>SlideSubText</slidesubtext>"
                }
            ]
        },
        case2:
        {
            "moduleName": assetName,
            "moduleDispName": assetName,
            "moduleType": "StandardPromo",
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
            "ModuleTitle": "$1Title",
            "ModuleLink": "091e9c5e801651b2",
            "LogoImage": "091e9c5e803fecd4",
            "LogoTitle": "$1Logotitle",
            "LogoLink": "091e9c5e80661dc9",
            "Slides":
            [
                {
                    "Image":"091e9c5e803fecd4",
                    "SlideHeaderText": "$1SlideHeaderText",
                    "SlideHeaderLink": "091e9c5e80661dc9",
                    "SlideTitle": "$1SlideTitle",
                    "SlideEmphasizedText": "$1SlideEmphasizedText",
                    "SlideSubText": "$1SlideSubText"
                }
            ]
        }
    }
}
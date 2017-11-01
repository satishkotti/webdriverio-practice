const randomstring = require('randomstring');
var assetName = "QASM-SPBX-" + randomstring.generate(5);

module.exports = {
    SponsorBoxesModuleData:
    {
        "moduleName": assetName,
        "moduleDispName": assetName,
        "moduleType": "SponsorBoxes",
        "category": null,
        "selectXSL": null,
        "selectCSS": null,
        "dynamicModuleCategory": null,
        "moduleLabel1": null,
        "moduleLabel2": null,
        "linkedModule": null,
        "sponsorProgram": null,
        "description": assetName + "-desc",
        "tier": "tier2",
        "brand": "WebMD Daily",
        "moduleTitle": "QA Title",
        "moduleDesc": "QA Description",
        "logo": "091e9c5e803fecd4",
        "overridetext": "Sponsor Logo Override Text",
        "link": "091e9c5e80661dc9",
        "headertext": "Header Text",
        "headerlink": "091e9c5e801651b2",
        "bodycopy":
        [
            {
                "headertext": 'Body Copy Text',
                "link": '091e9c5e809b44d7',
            }

        ],
        "bodyimagelogo": "091e9c5e8046dba9",
        "bodyimageoverridetext": "Body Image Override Text",
        "bodyimageLink": "091e9c5e8000f8de",
        "bodyimageleft": 1,
        "bodyimageright": 0,
        "bodylinks":
        [
            {
                "bulletson": 0,
                "text": "Body Links Text",
                "link": "091e9c5e80bac80c"
            }

        ],
        "lowerlinks":
        [
            {
                "bulletson": 0,
                "newpage": 0,
                "rollover": 0,
                "text": "Lower Links Text1",
                "link": "091e9c5e80174f67",

            }

        ],
        "importcontent": null
    }

}
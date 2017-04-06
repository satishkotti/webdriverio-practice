var page = require('./../../common/page');
var randomstring = require("randomstring");

var smdata = Object.create(page, {

    htmlModule: {
        get: () => {
            var assetName = "QASM-ActivityQueue-" + randomstring.generate(5);
            var smProps = {};
            return smProps =
                {
                    "moduleName": assetName,
                    "moduleDispName": assetName,
                    "moduleType": "HTML",
                    "category": null,
                    "selectXSL": "HTML",
                    "selectCSS": null,
                    "dynamicModuleCategory": null,
                    "moduleLabel1": null,
                    "moduleLabel2": null,
                    "linkedModule": null,
                    "sponsorProgram": null,
                    "description": assetName + "-desc",
                    "tier": 2,

                }
        }
    },

    multiplevideolaunchModule: {
        get: () => {
            var assetName = "QASM-MVL-" + randomstring.generate(5);
            var smProps = {};
            return smProps =
                {
                    "moduleName": assetName,
                    "moduleDispName": assetName,
                    "moduleType": "MultipleVideoLaunch",
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
                    "brand": "WebMD Daily",
                    "moduleTitle": "QA Title",
                    "moduleDesc": "QA Description",
                    "AddLinks": 1,
                    "videos":
                    [
                        {
                            "videoObject": '091e9c5e80167396',
                            "videoTitleOverride": 'QA Video Title Override',
                            "videoDescOverride": 'QA Video Description Override'
                        }

                    ]

                }
        }
    },
    sponsorboxesModule: {
        get: () => {
            var assetName = "QASM-SPBX-" + randomstring.generate(5);
            var smProps = {};
            return smProps =
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
                    "tier": 2,
                    "brand": "WebMD Daily",
                    "moduleTitle": "QA Title",
                    "moduleDesc": "QA Description",
                    "logo": "091e9c5e803fecd4",
                    "overridetext": "Sponsor Logo Override Text",
                    "link": "091e9c5e80661dc9",
                    "headertext": "Header Text",
                    "headerlink": "091e9c5e801651b2",
                    "addbodycopies": 1,
                    "bodycopy":
                    [
                        {
                            "bodycopyheadertext": 'Body Copy Text',
                            "bodycopylink": '091e9c5e809b44d7',
                        }

                    ],
                    "bodyimagelogo": "091e9c5e8046dba9",
                    "bodyimageoverridetext": "Body Image Override Text",
                    "bodyimagLink": "091e9c5e8000f8de",
                    "bodyimagleft": 1,
                    "bodyimagright": 0,
                    "addbodylinks": 1,
                    "bodylinks":
                    [
                        {
                            "bulletson": "false",
                            "bodylinkstext": "Body Links Text",
                            "bodylinkslink": "091e9c5e80bac80c"
                        }

                    ],
                    "addlowerlinks": 1,
                    "lowerlinks":
                    [
                        {
                            "bulletson": "false",
                            "lowerlinksnewpage": "new page",
                            "lowerlinksrollover": "roll over",
                            "lowerlinkstext": "Lower Links Text1",
                            "lowerlinkslink": "091e9c5e80174f67",

                        }

                    ],

                    "importcontent": null

                }
        }
    }
});


module.exports = smdata;
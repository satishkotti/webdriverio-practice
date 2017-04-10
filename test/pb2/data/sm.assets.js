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
    },
    NavigationModule: {
        get: () => {
            var assetName = "QASM-NM-" + randomstring.generate(5);
            var smProps = {};
            return smProps =
                {
                    "moduleName": assetName,
                    "moduleDispName": assetName,
                    "moduleType": "Navigation",
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
                    "text": "Module Title Text",
                     "groupheadersection":
                     [
                         {

                          "groups":
                             [
                                 {
                                     "grouptext": "Group1Text",
                                     "grouplink": "091e9c5e80174f67",
                                     "groupitemlinks":
                                        [
                                                {
                                                 "grouplinkitemtext": "Group 1 Link Items Text 1",
                                                 "grouplinkitemlink": "091e9c5e800b5eb7"
                                       
                                                }

                                        ]
                           
                                  },
                                  {
                                        "grouptext": "Group2Text",
                                        "grouplink": "091e9c5e805b06ed",
                                        "groupitemlinks":
                                        [
                                                {
                                                    "grouplinkitemtext": "Group 2 Link Items Text 1",
                                                    "grouplinkitemlink": "091e9c5e80126129"
                                       
                                                }

                                        ]
                           
                                  }
                         ]

                     }]

                  
                }
        }
    }
});


module.exports = smdata;
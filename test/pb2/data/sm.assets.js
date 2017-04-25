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
    },
    EditorialModule: {

        get: () => {
            var assetName = "QASM-EM-" + randomstring.generate(5);
            var smProps = {};

            return smProps =
                {
                    "moduleName": assetName,
                    "moduleDispName": assetName,
                    "moduleType": "EditorialModule",
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
                    "moduletitle": "Module Title Text",
                    "link": "091e9c5e80661dc9",
                    "modulelinks":
                    [
                        {
                            "modulelinksimage": "091e9c5e8000f8de",
                            "modulelinkslinktext": "Links Text",
                            "modulelinkslink": "091e9c5e80661dc9",
                            "modulelinksactiontext": "Links Action Text"
                        }

                    ],
                    "descriptions":
                    [
                        {
                            "description": "Description Text"

                        }

                    ],
                    "linkedimages":
                    [
                        {
                            "linkedimagesimage": "091e9c5e8046dba9",
                            "linkedimageslink": "091e9c5e8000f8de",


                        }

                    ],
                    "importarticlecontent": null


                }
        }
    },

    VerticalPromoModule: {
        get: () => {
            var assetName = "QASM-VM-" + randomstring.generate(5);

            var smProps = {};
            return smProps =
                {
                    "moduleName": assetName,
                    "moduleDispName": assetName,
                    "moduleType": "Vertical Promo",
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
                    "image": "091e9c5e803fecd4",
                    "introtext": "Intro Text",
                    "buttonlink": "091e9c5e80661dc9 ",
                    "buttontext": "Button Text  ",
                    "descriptiontext": "Description Text",
                    "iconicoverlays":
                    [
                        {
                            "iconicoverlaysimage": "091e9c5e8046dba9",
                            "iconicoverlaystitle": "Iconic Overlay Title Text",
                            "iconicoverlayslink": "091e9c5e80bac80c",
                            "iconicoverlayslinktext": "Iconic Overlay Link Text",
                            "iconicoverlaysdescriptiontext": "Iconic Overlay Description Text"

                        }

                    ]


                }
        }
    },
    EditNavigationModule: {
        get: () => {
            var assetName = "QASM-NM-" + randomstring.generate(5);
            var smProps = {};
            return smProps =
                {
                    "text": "Module Title Text",
                    "groupheadersection":
                    [
                        {

                            "groups":
                            [
                                {
                                    "grouptext": "Group1EditText",
                                    "grouplink": "091e9c5e80174f67",
                                    "groupitemlinks":
                                    [
                                        {
                                            "grouplinkitemtext": "Group 1 Link Items Edit Text 1",
                                            "grouplinkitemlink": "091e9c5e800b5eb7"

                                        }

                                    ]

                                },
                                {
                                    "grouptext": "Group2EditText",
                                    "grouplink": "091e9c5e805b06ed",
                                    "groupitemlinks":
                                    [
                                        {
                                            "grouplinkitemtext": "Group 2 Link Items Text 1 Edit",
                                            "grouplinkitemlink": "091e9c5e80126129"

                                        }

                                    ]

                                }
                            ]

                        }]


                }
        }
    },
    editsponsorboxesModule: {
        get: () => {
            var smProps = {};
            return smProps =
                {
                    "logo": "091e9c5e803fecd4",
                    "overridetext": "Sponsor Logo Override Text updated",
                    "link": "091e9c5e80661dc9",
                    "headertext": "Header Text updated",
                    "headerlink": "091e9c5e801651b2",
                    "bodycopy":
                    [
                        {
                            "headertext": 'Body Copy Text1',
                            "link": '091e9c5e809b44d7',
                        },
                        {
                            "headertext": 'Body Copy Text updated',
                            "link": '091e9c5e809b44d7',
                        }

                    ],
                    "bodyimagelogo": "091e9c5e8046dba9",
                    "bodyimageoverridetext": "Body Image Override Text updated ",
                    "bodyimageLink": "091e9c5e8000f8de",
                    "bodyimageleft": 1,
                    "bodyimageright": 0,
                    "bodylinks":
                    [
                        {
                            "bulletson": 0,
                            "text": "Body Links Text",
                            "link": "091e9c5e80bac80c"
                        },
                        {
                            "bulletson": 0,
                            "text": "Body Links Text added",
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

                        },
                        {
                            "bulletson": 0,
                            "newpage": 0,
                            "rollover": 0,
                            "text": "Lower Links Text added",
                            "link": "091e9c5e80174f67",

                        }


                    ],
                    "importcontent": null
                }
        }
    },
    editverticalpromoModule: {
        get: () => {

            var smProps = {};
            return smProps =
                {
                    "image": "091e9c5e803fecd4",
                    "introtext": "Intro Text updated",
                    "buttonlink": "091e9c5e80661dc9 ",
                    "buttontext": "Button Text updated ",
                    "descriptiontext": "Description Text updated",
                    "iconicoverlays":
                    [
                        {
                            "iconicoverlaysimage": "091e9c5e8046dba9",
                            "iconicoverlaystitle": "Iconic Overlay Title Text updated",
                            "iconicoverlayslink": "091e9c5e80bac80c",
                            "iconicoverlayslinktext": "Iconic Overlay Link Text updated",
                            "iconicoverlaysdescriptiontext": "Iconic Overlay Description Text updated"

                        },
                        {
                            "iconicoverlaysimage": "091e9c5e8046dba9",
                            "iconicoverlaystitle": "Iconic Overlay Title Text added",
                            "iconicoverlayslink": "091e9c5e80bac80c",
                            "iconicoverlayslinktext": "Iconic Overlay Link Text added",
                            "iconicoverlaysdescriptiontext": "Iconic Overlay Description Text added"

                        }

                    ]


                }
        }
    },
    editeditorialModule: {

        get: () => {
            var smProps = {};

            return smProps =
                {
                    "moduletitle": "Module Title Text updated",
                    "link": "091e9c5e80661dc9",
                    "modulelinks":
                    [
                        {
                            "modulelinksimage": "091e9c5e80c20a08",
                            "modulelinkslinktext": "Links Text updated",
                            "modulelinkslink": "091e9c5e80661dc9",
                            "modulelinksactiontext": "Links Action Text updated"
                        },
                        {
                            "modulelinksimage": "091e9c5e80c20a08",
                            "modulelinkslinktext": "Links Text added",
                            "modulelinkslink": "091e9c5e80661dc9",
                            "modulelinksactiontext": "Links Action Text added"
                        }

                    ],
                    "descriptions":
                    [
                        {
                            "description": "Description Text updated"

                        },
                        {
                            "description": "Description Text added"

                        }

                    ],
                    "linkedimages":
                    [
                        {
                            "linkedimagesimage": "091e9c5e8046dba9",
                            "linkedimageslink": "091e9c5e8000f8de",
                            "OverrideText": "Override Text updated"
                        },
                        {
                            "linkedimagesimage": "091e9c5e8046dba9",
                            "linkedimageslink": "091e9c5e8000f8de",
                            "OverrideText": "Override Text added"
                        }


                    ],
                    "importarticlecontent": null


                }
        }
    },
    HTMLModule: {
        get: () => {
            var assetName = "QASM-HM-" + randomstring.generate(5);

            var smProps = {};
            return smProps =
                {
                    "moduleName": assetName,
                    "moduleDispName": assetName,
                    "moduleType": "HTML",
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
                    "ModuleHTML": "test HTML Module Configuration",
                    "ModuleHTMLEdit": "test HTML Module Configuration updated"

                }
        }
    },
    StandardPromoModule: {
        get: () => {
            var assetName = "QASM-SPM-" + randomstring.generate(5);

            var smProps = {};
            return smProps =
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
                    "ModuleTitle": "Module Title test",
                    "Link": "091e9c5e80661dc9",
                    "logo": "091e9c5e803fecd4",
                    "LogoTitle": "Logo Title Text",
                    "logolink": "091e9c5e80661dc9",
                    "Slides":
                    [
                        {
                            "Image": "091e9c5e803fecd4",
                            "SlideHeaderText": "Slide Header Text",
                            "SlideHeaderLink": "091e9c5e801651b2",
                            "SlideTitle": "Slide Title",
                            "SlideEmphasizedText": "Slide Emphasized Text",
                            "SlideSubText": "Slide Sub Text"
                        }
                    ]

                }
        }
    },
    EditStandardPromoModule:
    {
        get: () => {
            var assetName = "QASM-SPM-" + randomstring.generate(5);

            var smProps = {};
            return smProps =
                {
                    "ModuleTitle": "Module Title test update",
                    "Link": "091e9c5e80661dc9",
                    "logo": "091e9c5e803fecd4",
                    "LogoTitle": "Logo Title Text update",
                    "logolink": "091e9c5e80661dc9",
                    "Slides":
                    [
                        {
                            "Image": "091e9c5e803fecd4",
                            "SlideHeaderText": "Slide Header Text update",
                            "SlideHeaderLink": "091e9c5e801651b2",
                            "SlideTitle": "Slide Title update",
                            "SlideEmphasizedText": "Slide Emphasized Text update",
                            "SlideSubText": "Slide Sub Text update"
                        },
                        {
                            "Image": "091e9c5e803fecd4",
                            "SlideHeaderText": "Slide Header Text added",
                            "SlideHeaderLink": "091e9c5e801651b2",
                            "SlideTitle": "Slide Title added",
                            "SlideEmphasizedText": "Slide Emphasized Text added",
                            "SlideSubText": "Slide Sub Text added"
                        }

                    ]

                }
        }
    }


});


module.exports = smdata;
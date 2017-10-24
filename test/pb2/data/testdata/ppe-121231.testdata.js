var randomstring = require("randomstring");
var assetName = "QASM-121231-" + randomstring.generate(5);

module.exports = {
    sm_data: {
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

    },
    adjust_size: {
        expand: {
            body_copy: {
                header_text_field: {
                    size1: {
                        width: 800,
                        height: 2000
                    },
                    size2: {
                        width: 1000,
                        height: 1500
                    },
                    size3: {
                        width: 600,
                        height: 1200
                    }
                }
            },
            body_links_field: {
                text_field_1: {
                    size1: {
                        width: 800,
                        height: 2000
                    },
                    size2: {
                        width: 1000,
                        height: 1500
                    },
                    size3: {
                        width: 600,
                        height: 1200
                    }
                },
                text_field_2: {
                    size1: {
                        width: 1000,
                        height: 1500
                    },
                    size2: {
                        width: 600,
                        height: 1200
                    },
                    size3: {
                        width: 800,
                        height: 2000
                    }
                },
                text_field_3: {
                    size1: {
                        width: 600,
                        height: 1200
                    },
                    size2: {
                        width: 800,
                        height: 2000
                    },
                    size3: {
                        width: 1000,
                        height: 1500
                    }
                }
            },
            lower_links_field: {
                text_field_1: {
                    size1: {
                        width: 800,
                        height: 2000
                    },
                    size2: {
                        width: 1000,
                        height: 1500
                    },
                    size3: {
                        width: 600,
                        height: 1200
                    }
                },
                text_field_2: {
                    size1: {
                        width: 1000,
                        height: 1500
                    },
                    size2: {
                        width: 600,
                        height: 1200
                    },
                    size3: {
                        width: 800,
                        height: 2000
                    }
                },
                text_field_3: {
                    size1: {
                        width: 600,
                        height: 1200
                    },
                    size2: {
                        width: 800,
                        height: 2000
                    },
                    size3: {
                        width: 1000,
                        height: 1500
                    }
                }
            }
        }
    }

}
var page = require('./../../common/page');
var randomstring = require("randomstring");

var smdata = Object.create(page, {
    
        htmlModule: {get : () => {
            var assetName = "QASM-ActivityQueue-" + randomstring.generate(5);
            var smProps = {};
        return smProps  = 
        {
            "moduleName": assetName,
            "moduleDispName": assetName,
            "moduleType": "HTML",
            "category": null,
            "selectXSL": "HTML",
            "selectCSS": null,
            "dynamicModuleCategory": null,
            "moduleLabel1":null,
            "moduleLabel2":null,
            "linkedModule":null,
            "sponsorProgram": null,
            "description": assetName + "-desc",
            "tier": 2,

        }
    }},

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
                    "AddLinks":1,
                    "videos ":
                    [
                        {
                            "videoObject": '091e9c5e80167396',
                            "videoTitleOverride": 'QA Video Title Override',
                            "videoDescOverride": 'QA Video Description Override'
                        }
                       
                    ]

                }
        }
    }
});

module.exports = smdata;
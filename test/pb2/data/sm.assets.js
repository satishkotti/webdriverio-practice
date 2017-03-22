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
    }}
});

module.exports = smdata;
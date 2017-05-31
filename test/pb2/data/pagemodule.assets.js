var page = require('./../../common/page');

var pmdata = Object.create(page, {

        htmlModule: {value: {get : (moduleName) => {
        var pmProps = {};
        return pmProps  = 
        {
            "moduleName": moduleName,
            "moduleDispName": moduleName,
            "moduleType": "HTML",
            "category": null,
            "selectXSL": "HTML",
            "selectCSS": null,
            "dynamicModuleCategory": null,
            "moduleLabel1":null,
            "moduleLabel2":null,
            "linkedModule":null,
            "sponsorProgram": null,
            "description": moduleName + "-desc",
            "tier": "tier2",

        }
    }}
    }
});

module.exports = pmdata;
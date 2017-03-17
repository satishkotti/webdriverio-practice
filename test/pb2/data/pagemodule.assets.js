var page = require('./../../common/page');

var pmdata = Object.create(page, {

        adModule: {get : () => {
        var pmProps = {};
        return pmProps  = 
        {
            "moduleName": "test",
            "moduleDispName": "test",
            "moduleType": "AdModule",
            "category": null,
            "selectXSL": "Ad Seed Call",
            "selectCSS": null,
            "dynamicModuleCategory": null,
            "moduleLabel1":null,
            "moduleLabel2":null,
            "linkedModule":null,
            "sponsorProgram": null,
            "description": "test",
            "tier": "tier2",

        }
    }}
});

module.exports = pmdata;
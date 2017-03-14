var page = require('./../../common/page');

var pmdata = Object.create(page, {

        adModule: {get : () => {
        var pmProps = {};
        smProps  = 
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
            "tier": 2,

        }

        return pmProps;
    }}
});

module.exports = pmdata;
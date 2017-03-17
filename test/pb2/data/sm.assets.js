var page = require('./../../common/page');

var smdata = Object.create(page, {

        adModule: {get : () => {
        var smProps = {};
        return smProps  = 
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
    }}
});

module.exports = smdata;
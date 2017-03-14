var page = require('./../../common/page');

var smdata = Object.create(page, {

    adModule: {get : () => {
        var smProps = {};
        smProps  = 
        {
            "moduleName": "test",
            "moduleDispName": "test",
            "moduleType": "AdModule",
            "category": null,
            "selectXSL": null,
            "selectCSS": null,
            "dynamicModuleCategory": null,
            "sponsorProgram": null,
            "description": "test",
            "tier": 2,
            "webmdNickname": null,

        }

        return smProps;
    }}
});

module.exports = templatedata;
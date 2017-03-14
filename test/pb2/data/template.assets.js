var page = require('./../../common/page');

var templatedata = Object.create(page, {

    normalStandaloneTemplate : {get : () => {
        var templateProps = {};
        templateProps  = 
        {
            "type": "standalone",
            "inheritFrom" : null,
            "layout": "Responsive",
            "layoutCSS": "3 Column Responsive",
            "templateName": "test",
            "sponsorProgram": null,
            "description": "test",
            "isGated": 0,
            "tier": 2,
            "webmdNickname": null,

        }

        return templateProps;
    }}
});

module.exports = templatedata;
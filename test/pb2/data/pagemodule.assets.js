var page = require('./../../common/page');

var pmdata = Object.create(page, {

        htmlModule: {value: {get : (moduleName) => {
        var pmProps = {};
        return pmProps  = 
        {
            "moduleName": moduleName,
            "moduleDispName": moduleName,
            "moduleType": "HTML",
            "category": 'Responsive',
            "selectXSL": "HTML",
            "selectCSS": 'Blank',
            "dynamicModuleCategory": null,
            "moduleLabel1":null,
            "moduleLabel2":null,
            "linkedModule":null,
            "sponsorProgram": null,
            "description": moduleName + "-desc",
            "tier": "tier2",

        }
    }}
    },
		htmlModuleConfiguration: {value: {get : (moduleconf) =>{
        var pmconf ={};
        return pmconf =
        {
            "Module HTML": moduleconf,
        }
    }}
    }
});

module.exports = pmdata;
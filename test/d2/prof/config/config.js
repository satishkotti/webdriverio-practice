var JSONPath = require('JSONPath');

module.exports.testSettings = {
    "dev04": {
       "dctmApiConfig": {
            "dctmUsername": "QAPublication",
            "dctmPassword": "QA-Doc#1",
            "dctmDocbase": "webmddoc01",
            "url": "http://dmrest.dev01.webmd.com/pbws"
        },
        "d2prof": {
            "url": "http://dmd201d-prf-08.portal.webmd.com:8080/D2/#d2",
            "users": [
                {
                    "id": "1",
                    "username": "QAPublication",
                    "password": "QA-Doc#1",
                    "type": "user"
                },
                {
                    "id": "2",
                    "username": "QAPublication09",
                    "password": "QA-Doc#1",
                    "type": "super user"
                },
                {
                    "id": "3",
                    "username": "QAPublication1",
                    "password": "QA-Doc#1",
                    "type": "user"
                }
            ]
        },
        "ats":{
            url:"http://ats.preview.dev01.webmd.com/SCSFile.aspx?ID="
        }
    },
    "data": {
        "homepageTitle": "D2",
        "level0NavMapNodeId": "- Node ID [1031]",
        "level0NodeId": "1031",
        "level0ScopeMapNodeId": "1032",
        "level0NodeDisplayName": "Level 0",
        "nodePropTab": "Node Properties",
        "nodeCQTab": "Name / Content Queries",
        "baseTemplateName": "Base Template",
        "errorPage": "Error 404"
    }
}

module.exports.EnvSettings = {
    getEnvSettings: function(env){
        var settings = JSONPath({json: module.exports.testSettings, path: ("$."+env), resultType: 'all'});

//console.log('Env settings:' + settings[0].value);

        return settings[0].value;
    },
    getEnvData: function(env){
        var allSettings = JSONPath({json: module.exports.testSettings, path: "$.data", resultType: 'all'});

//        console.log('Env All data:' + allSettings[0].value);

        return allSettings[0].value;
    }
}
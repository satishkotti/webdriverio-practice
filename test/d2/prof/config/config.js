var JSONPath = require('JSONPath');

module.exports.testSettings = {
    "dev04": {
        "d2prof": {
            "url": "http://dmd201d-prf-08.portal.webmd.com:8080/D2",
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
                    "password": "UPDATE",
                    "type": "super user"
                }
            ]
        },
        "pats":{
            url:""
        }
    },
    "qa01": {
        "d2prof": {
            "url": "http://d2.qa01.webmdprofessional.com/D2",
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
                }
            ]
        },
        "pats":{
            url:""
        }
        
    },
    "data": {
        "key here": "value here",
        "key here": "value here",
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
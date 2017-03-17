var JSONPath = require('JSONPath');
var randomstring = require("randomstring");
var randomtext = randomstring.generate(5);

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
                    "username": "QANews",
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
    "qa01": {
       "dctmApiConfig": {
            "dctmUsername": "QAPublication",
            "dctmPassword": "QA-Doc#1",
            "dctmDocbase": "webmddoc01",
            "url": "http://dmrest.dev01.webmd.com/pbws"
        },
        "d2prof": {
            "url": "http://d2.qa01.webmdprofessional.com/D2/#d2",
            "users": [
                {
                    "id": "1",
                    "username": "QAPublication",
                    "password": "QA-Doc#1",
                    "type": "user"
                },
                {
                    "id": "2",
                    "username": "QANews",
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
        "template": "News Article",
        "objectTitle": "QATest_"+randomtext,
        "rootpath": "webmd::2/professional_assets::3/medscape::4/news::5/heartwire::6/news::7/200005::8",
        "profilename": "News Article Templates",
        "contentType":"News"
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
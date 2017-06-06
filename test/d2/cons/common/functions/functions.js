var app = require("./../actions/login.actions");
var randomstring = require("randomstring");
var d2api =require("./../../../../common/api/dctm-api.js");

var maxWaitTimeInMs = 20000;
module.exports = {
    
    generateRandomString: function(characterLength) {
        return randomstring.generate(characterLength);
    },
    getEnvTestUrl: function() {
        return global.envSettings.d2cons.url;
    },    
    getQAPublicationUser: function(){
        return global.envSettings.d2cons.users[0];
    },
    getAtsScsFileUrl: function() {
       // return global.envSettings.ats.url;
       return global.envSettings.ats.url;
    },
     verfiyElementExists: function (selectorVal) {
        if (!browser.isExisting(selectorVal)) {
            browser.frame();
            browser.waitForExist(selectorVal, maxWaitTimeInMs);
        }
    },
     SetAgentForDctmApi: function(agentBaseUrl){

        d2api.SetAgent(agentBaseUrl);
    },
    GenerateApiAccessToken: function () {
        var ticket;
        browser.call(() => {
            return d2api.GenerateAccessToken().then((response) => {
                ticket = response.data.loginTicket;
            });

            browser.waitUntil(function () {
                return ticket == undefined ? false : true;
            },'Generating access token is taking longer than expected! Please increase timeouts if necessary and try again!', 500)
        });
        //console.log(ticket);
        return ticket;
    },
    ExecuteDQLusingDCTMAPI: function (accessToken, dql) {
        var response;
        browser.call(() => {
            return d2api.ExecuteDQLUsingApi(accessToken, dql).then((resp) => {
                response = resp.data;
            });

            browser.waitUntil(function () {
                return response == undefined ? false : true;
            },'Executing DQL is taking longer than expected! Please increase timeouts if necessary and try again!', 500)
        });
        //console.log(response);
        return response;
    }
}
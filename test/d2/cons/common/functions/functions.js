var app = require("./../actions/login.actions");
var randomstring = require("randomstring");

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
    }
}
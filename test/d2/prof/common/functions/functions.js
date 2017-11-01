var app = require("./../actions/login.actions");
var randomstring = require("randomstring");
var maxWaitTimeInMs = 20000;

module.exports = {
    
    generateRandomString: function(characterLength) {
        return randomstring.generate(characterLength);
    },
    getEnvTestUrl: function() {
        return global.envSettings.d2prof.url;
    },    
    getQAPublicationUser: function(){
        return global.envSettings.d2prof.users[0];
    },
    getQANewsUser: function(){
        return global.envSettings.d2prof.users[1];
    },
    getQAAdminEmedUser: function(){
        return global.envSettings.d2prof.users[2];
    },
    getAtsScsFileUrl: function() {
        return global.envSettings.ats.url;
    },
    getQAAdminEmedUser: function(){
        return global.envSettings.d2prof.users[2];
    },
    verfiyElementExists: function (selectorVal) {
        if (!browser.isExisting(selectorVal)) {
            browser.frame();
            browser.waitForExist(selectorVal, maxWaitTimeInMs);
        }
    },  
}
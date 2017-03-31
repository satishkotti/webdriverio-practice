var app = require("./../actions/login.actions");
var randomstring = require("randomstring");

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
    getAtsScsFileUrl: function() {
        return global.envSettings.ats.url;
    }
}
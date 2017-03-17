var app = require("./../actions/login.actions");

module.exports = {
    
    generateRandomString: function GenerateRandomString(characterLength) {
        return randomstring.generate(characterLength);
    },
    getEnvTestUrl: function() {
        return global.envSettings.d2cons.url;
    },    
    getQAPublicationUser: function(){
        return global.envSettings.d2cons.users[0];
    },
}
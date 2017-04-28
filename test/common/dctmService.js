module.exports = {
    login: function(options) {
        var headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=UTF-8',
        };

        var requestOptions = {
            method: 'POST',
            uri: global.envSettings.dctmApiConfig.url + '/dctm/auth/login',
            headers: headers,
            json: {
                userName: global.envSettings.dctmApiConfig.dctmUsername,
                password: global.envSettings.dctmApiConfig.dctmPassword,
                repoName: global.envSettings.dctmApiConfig.dctmDocbase
            }
        };
        var request = require('request');
        request(requestOptions, options.callback);
    },
    execute: function(options) {
        var url = global.envSettings.dctmApiConfig.url + options.uri;
        var method = options.method.toUpperCase();

        var headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=UTF-8',
            'WBMD-LOGIN-TICKET': options.dmTickets,
            'WBMD-USERNAME': global.envSettings.dctmApiConfig.dctmUsername,
            'WBMD-REPOSITORY': global.envSettings.dctmApiConfig.dctmDocbase,
            'Authorization': 'bearer DCYMpdkP79jDjW1IHSGBkO1z2YaKeZmAWH5KoY8x+azCK1iX'

        };

        var requestOptions = {
            method: method,
            uri: url,
            headers: headers,
            json: options.body
        };

        var request = require('request');
        request(requestOptions, options.callback);
    }
};
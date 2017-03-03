module.exports = {    
    login: function (options) {           
        var config = require('./config');               
        var headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=UTF-8',
        };

        var requestOptions = {
            method: 'POST',
            uri: config.dctmApiConfig.url + '/dctm/auth/login',
            headers: headers,
            json: {
                userName: config.dctmApiConfig.dctmUsername,
                password: config.dctmApiConfig.dctmPassword,
                repoName: config.dctmApiConfig.dctmDocbase
            }
        };        
        var request = require('request');
        request(requestOptions, options.callback);
    },
    execute: function (options) {
        
        var config = require('./config');            
        var url = config.dctmApiConfig.url + options.uri;                
        var method = options.method.toUpperCase();

        var headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=UTF-8',
            'WBMD-LOGIN-TICKET': options.dmTickets,
            'WBMD-USERNAME': config.dctmApiConfig.dctmUsername,
            'WBMD-REPOSITORY': config.dctmApiConfig.dctmDocbase,
            'Authorization' : 'bearer DCYMpdkP79jDjW1IHSGBkO1z2YaKeZmAWH5KoY8x+azCK1iX'

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
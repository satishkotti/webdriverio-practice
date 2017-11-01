module.exports = {
    login: function(options) {
        var headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=UTF-8',
        };

        var requestOptions = {
            method: 'POST',
            uri: 'http://dmrest.' + global.testEnv + '.webmd.com/pbws' + '/dctm/auth/login',
            headers: headers,
            json: {
                userName: global.username,
                password: global.password,
                repoName: 'webmddoc01'
            }
        };
        var request = require('request');
        request(requestOptions, options.callback);
    },
    execute: function(options) {
        var url = 'http://dmrest.' + global.testEnv + '.webmd.com/pbws' + options.uri;
        var method = options.method.toUpperCase();

        var headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=UTF-8',
            'WBMD-LOGIN-TICKET': options.dmTickets,
            'WBMD-USERNAME': global.username,
            'WBMD-REPOSITORY': 'webmddoc01',
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
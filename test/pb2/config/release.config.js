var Q = require("q");
_ = require("lodash");
var webdriverio = require("webdriverio");
var fs = require("fs");
path = require('path');
var config = {
   
    specs: [],
    exclude: [],
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        chromeOptions:
        {
            "args": [
                 "start-maximized",
                "no-proxy-server",
                "no-default-browser-check",
                "no-first-run",
                "disable-boot-animation",
                "disable-default-apps",
                "disable-extensions",
                "no-experiments",
                "no-service-autorun",
                "disable-infobars"
            ],
            "prefs": {
                "credentials_enable_service": false,
                "profile": {
                    password_manager_enabled: false
                }
            }
        }
    }],
    maxInstances: 1,
    logLevel: 'error',
    coloredLogs: true,
    waitforTimeout: 120000,
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 300000
    },
    onPrepare: function() {

    },
    before: function() {
        var chai = require('chai');
        chai.config.includeStack = true;
        expect = chai.expect;
        AssertionError = chai.AssertionError;
        Assertion = chai.Assertion;
        assert = chai.assert;
        should = chai.should();
        
        var appConfig = require('./test.config').config;
        global.testenv =  process.env.testenv;

    console.log('test env: '+  global.testenv);

        global.testenv = global.testenv;

        switch(global.testenv)
        {
            case "dev01":
                global.testEnv = appConfig.testEnv.dev01;
                break;
            case "dev02":
                global.testEnv = appConfig.testEnv.dev02;
                break;
            case "dev03":
                global.testEnv = appConfig.testEnv.dev03;
                break;
            case "dev04":
                global.testEnv = appConfig.testEnv.dev04;
                break;
            case "qa01":
                global.testEnv = appConfig.testEnv.qa01;
                break;
            case "qa02":
                global.testEnv = appConfig.testEnv.qa02;
                break;
            case "qa00":
                global.testEnv = appConfig.testEnv.preprod;
                break;
            default:
                global.testEnv = '';
                break;
        }
        global.appUrl = 'http://genesys.' + global.testEnv + '.webmd.com';
        global.username = appConfig.appAccess.users.default.username;
        global.password = appConfig.appAccess.users.default.password;

        console.log('baseurl: ' + global.appUrl);

    },
    after: function(failures, pid) {
        // do something
    },
    onComplete: function() {
        // do something
    }
};

module.exports.config = config;
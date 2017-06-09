var merge = require('deepmerge');
var wdioConf = require('./../../../../wdio.conf.js');

// have main config file as default but overwrite environment specific information
exports.config = merge(wdioConf.config, {

    debug: false,
    specs: [],
    waitforTimeout: 120000,
    mochaOpts: {
        ui: 'bdd',
        timeout: 9000000
    },
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
                //'window-size=1920,1080'
            ],
            "prefs": {
                "credentials_enable_service": false,
                "profile": {
                    password_manager_enabled: false
                }
            }
        }
    }],
    suites: {
        redirectTool: [
            './test/pb2/**/PPE-101669.js',
            './test/pb2/**/PPE-93381.js'
        ]
    },
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        chromeOptions: {
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

    before: function() {

        var chai = require('chai');
        chai.config.includeStack = true;
        expect = chai.expect;
        AssertionError = chai.AssertionError;
        Assertion = chai.Assertion;
        assert = chai.assert;
        should = chai.should();
        _ = require('lodash');

        var appConfigFile = require('./../release29.config');
        var appConfig = appConfigFile.config;
        global.testEnv = appConfig.testEnv.dev03;
        global.testapiurl= 'http://redirect.' + global.testEnv + '.webmd.com/api/redirect/'    
        global.appUrl = 'http://genesys.' + global.testEnv + '.webmd.com';
        global.username = appConfig.appAccess.users.default.username;
        global.password = appConfig.appAccess.users.default.password;

    },

});
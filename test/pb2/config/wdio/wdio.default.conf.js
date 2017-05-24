var gulpFile = require('./../../../../gulpfile.js');

exports.config = {
    debug: false,
    specs: [],
    exclude: [],
    coloredLogs: true,
    waitforTimeout: 120000,
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 900000
    },
    capabilities: [{
        maxInstances: gulpFile.MaxInstances,
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
    reporters: ['spec','dot','allure'],
    reporterOptions: {
        allure: {
            outputDir: 'allure-results'
        }
    },
    before: function () {

        var chai = require('chai');
        chai.config.includeStack = true;
        expect = chai.expect;
        AssertionError = chai.AssertionError;
        Assertion = chai.Assertion;
        assert = chai.assert;
        should = chai.should();
        _ = require('lodash');

        var appConfigFile = require('./../test.config');
        var appConfig = appConfigFile.config;
        global.testEnv = gulpFile.TestEnv;
        global.appUrl = 'http://genesys.' + global.testEnv + '.webmd.com';
        global.username = appConfig.appAccess.users.default.username;
        global.password = appConfig.appAccess.users.default.password;

    }
}
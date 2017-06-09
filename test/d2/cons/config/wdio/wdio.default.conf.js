var gulpFile = require('./../../../../../gulpfile.js');

exports.config = {
    debug: false,
    specs: [],
    exclude: [],
    coloredLogs: true,
    baseUrl: 'http://localhost',
    waitforTimeout: 500000,
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 500000
    },
    capabilities: [{
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

        global.testEnv = gulpFile.TestEnv;
        var config = require('./../config');
        global.envSettings = config.EnvSettings.getEnvSettings(global.testEnv.toLowerCase());
        global.d2ConDataSettings = config.EnvSettings.getEnvData(global.testEnv.toLowerCase());
    }
};
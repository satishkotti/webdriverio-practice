var merge = require('deepmerge');
var wdioConf = require('./../../../wdio.conf.js');

// have main config file as default but overwrite environment specific information
exports.config = merge(wdioConf.config, {
    debug: false,
    specs: [],
    waitforTimeout: 120000,
    mochaOpts: {
        ui: 'bdd',
        timeout: 900000
    },
    reporters: ['spec', 'dot', 'allure'],
    reporterOptions: {
        allure: {
            outputDir: 'allure-results'
        }
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
    before: function () {

        var chai = require('chai');
        chai.config.includeStack = true;
        expect = chai.expect;
        AssertionError = chai.AssertionError;
        Assertion = chai.Assertion;
        assert = chai.assert;
        should = chai.should();
        _ = require('lodash');

        global.testEnv = process.env.testEnv;
        global.testApp = process.env.app;

console.log('test app: ' + global.testApp);
console.log('test env: ' + global.testEnv);
        
        switch (testApp) {
            case "pb2":
                var appConfig = require('./test.config').config;
                global.appUrl = 'http://genesys.' + global.testEnv + '.webmd.com';
                global.username = appConfig.appAccess.users.default.username;
                global.password = appConfig.appAccess.users.default.password;
                switch (global.testEnv) {
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
                }
                break;
            case "d2con":
                var config = require('./test/d2/cons/config/config');
                global.envSettings = config.EnvSettings.getEnvSettings(testEnv);
                global.d2ConDataSettings = config.EnvSettings.getEnvData(testEnv);
                break;
            case "d2prof":

                var config = require('./test/d2/prof/config/config');
                global.envSettings = config.EnvSettings.getEnvSettings(testEnv);
                global.d2ProfDataSettings = config.EnvSettings.getEnvData(testEnv);
                break;
            case "rt":
                var config = require('./test/rt/config/config');
                global.envSettings = config.EnvSettings.getEnvSettings(testEnv);
                global.rt2DataSettings = config.EnvSettings.getEnvData(testEnv);
                break;
        }
    },
});
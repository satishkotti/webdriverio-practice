var merge = require('deepmerge');
var wdioConf = require('./../../../../wdio.conf.js');
var gulpFile = require('./../../../../gulpfile.js');
var path = require('path');

exports.config = merge(wdioConf.config, {

    debug: false,
    specs: [],
    waitforTimeout: 120000,
    mochaOpts: {
        ui: 'bdd',
        timeout: 900000
    },
    capabilities: [{
        maxInstances: gulpFile.MaxInstances,
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
                },                
				download: { 
                    default_directory: "\\\\nasfs21d-ops-08.portal.webmd.com\\cms_test\\downloads",
                    prompt_for_download: false,
                }
            }
        }
    }],
	onPrepare: function() {},
    before: function () {

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
        global.testEnv = gulpFile.TestEnv;
        global.appUrl = 'http://genesys.' + global.testEnv + '.webmd.com';
        global.username = appConfig.appAccess.users.default.username;
        global.password = appConfig.appAccess.users.default.password;
        global.browserDownloadPath = gulpFile.DownloadPath;
    }
});
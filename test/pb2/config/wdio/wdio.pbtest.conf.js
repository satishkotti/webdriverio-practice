var merge = require('deepmerge');
var wdioConf = require('./../../../../wdio.conf.js');

// have main config file as default but overwrite environment specific information
exports.config = merge(wdioConf.config, {

    debug: true,
    specs: ['./test/pb2/**.js'],
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        chromeOptions:
        //args: ['window-size=1920,1080']
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

    before: function() {

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
        global.testEnv = 'qa02';
        global.appUrl = 'http://genesys.' + global.testEnv + '.webmd.com';
        global.testapiurl= 'http://redirect.' + global.testEnv + '.webmd.com/api/redirect/'    
        global.username = appConfig.appAccess.users.default.username;
        global.password = appConfig.appAccess.users.default.password;
        global.site = appConfig.site.webmd.desktop;
        global.sslevel = appConfig.siteStructureLevel(global.site);
        global.browserDownloadPath = "\\\\nasfs21d-ops-08.portal.webmd.com\\cms_test\\downloads";


    },

});
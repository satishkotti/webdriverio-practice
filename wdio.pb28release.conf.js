var merge = require('deepmerge');
var wdioConf = require('./wdio.conf.js');

// have main config file as default but overwrite environment specific information
exports.config = merge(wdioConf.config, {

    debug: false,
    specs: ['./test/pb2/**/PPE-103206.js',],
    waitforTimeout: 120000,
    mochaOpts: {
        ui: 'bdd',
        timeout: 900000
    },
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
                }
            }
        }
    }],
    suites: {
        templates: [
            './test/pb2/**/PPE-103161.js',
            './test/pb2/**/PPE-103162.js',
            './test/pb2/**/PPE-103163.js',
            './test/pb2/**/PPE-103164.js',
            './test/pb2/**/PPE-103167.js',
            './test/pb2/**/PPE-103168.js',
            './test/pb2/**/PPE-103169.js',
            './test/pb2/**/PPE-103170.js',
            './test/pb2/**/PPE-103171.js',
            './test/pb2/**/PPE-103172.js',
            './test/pb2/**/PPE-103173.js',
            './test/pb2/**/PPE-103174.js',
            './test/pb2/**/PPE-103175.js',
            './test/pb2/**/PPE-103176.js',
            './test/pb2/**/PPE-103177.js',
            './test/pb2/**/PPE-103178.js',
            './test/pb2/**/PPE-103179.js',
            './test/pb2/**/PPE-103181.js',
        ],
        pages: [
            './test/pb2/**/PPE-103188.js',
            './test/pb2/**/PPE-103189.js',
            './test/pb2/**/PPE-103193.js',
            './test/pb2/**/PPE-103194.js',
            './test/pb2/**/PPE-103195.js',
            './test/pb2/**/PPE-103197.js',
            './test/pb2/**/PPE-103198.js',
            './test/pb2/**/PPE-103199.js',
            './test/pb2/**/PPE-103200.js',
            './test/pb2/**/PPE-103202.js',
            './test/pb2/**/PPE-103203.js',
            './test/pb2/**/PPE-103204.js',
            './test/pb2/**/PPE-103205.js',
            './test/pb2/**/PPE-103206.js',
            './test/pb2/**/PPE-103207.js',
            './test/pb2/**/PPE-103208.js',
            './test/pb2/**/PPE-103552.js',
        ],
        sharedModules: [
            './test/pb2/**/PPE-103209.js',
            './test/pb2/**/PPE-103210.js',
            './test/pb2/**/PPE-103211.js',
            './test/pb2/**/PPE-103213.js',
            './test/pb2/**/PPE-103214.js',
            './test/pb2/**/PPE-103215.js',
            './test/pb2/**/PPE-103216.js',
            './test/pb2/**/PPE-103217.js',
            './test/pb2/**/PPE-103218.js',
            './test/pb2/**/PPE-103219.js',
            './test/pb2/**/PPE-103220.js',
            './test/pb2/**/PPE-103221.js',
        ],
        nodes: [
            './test/pb2/**/PPE-104514.js',
        ],
        queueScreenValidations: [
            './test/pb2/**/PPE-102336.js',
            './test/pb2/**/PPE-102337.js',
            './test/pb2/**/PPE-102340.js',
            './test/pb2/**/PPE-102341.js',
            './test/pb2/**/PPE-102342.js',
        ],
        sharedmodulesXmlValidations: [
            './test/pb2/**/ppe-103716/**.js'
        ]
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

        var appConfigFile = require('./test/pb2/config/release28.config');
        var appConfig = appConfigFile.config;
        global.testEnv = appConfig.testEnv.preprod;
        global.appUrl = 'http://genesys.' + global.testEnv + '.webmd.com';
        global.username = appConfig.appAccess.users.default.username;
        global.password = appConfig.appAccess.users.default.password;

    },

});
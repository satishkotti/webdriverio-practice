var merge = require('deepmerge');
var wdioConf = require('./../../../../wdio.conf.js');
//var gulpFile = require('./../../../../gulpfile.js');


// have main config file as default but overwrite environment specific information
exports.config = merge(wdioConf.config, {

    debug: true,
    specs:
    // ['./../../fe/jira/PPE-134413.js'],
    //['./test/aim/fe/jira/release_ph3/sprint_1/ppe-75320/ppe-75320.js'],
   // ['./test/aim/fe/jira/release_ph3/sprint_1/ppe-134546/ppe-134546.js'],
  ['./test/aim/fe/jira/release_ph3/sprint_1/ppe-135337/ppe-135337.js'],
   //   ['./test/aim/fe/jira/release_ph3/sprint_1/ppe-135337/ppe-135339.js'],
   // ['./test/aim/fe/jira/release_ph3/sprint_1/ppe-135337/PPE-135338.js'],
   // ['./test/aim/fe/jira/release_ph3/sprint_1/ppe-75320/ppe-75320.js',
    //    './test/aim/fe/jira/release_ph3/sprint_1/ppe-134546/ppe-134546.js'],

    waitforTimeout: 120000,
    mochaOpts: {
        ui: 'bdd',
        timeout: 900000000
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
    suites: {
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

        var appConfigFile = require('./../../config/aim.config');
        //var appConfig = appConfigFile.config;
        global.testEnv = appConfigFile.testEnv.qa01;
        global.appUrl_ttsAdmin = `http://ttadmin.${global.testEnv}.webmd.com`;
        global.username_ttsAdmin = 'skotti';
        global.password_ttsAdmin = 'PYYPj4TM#';
         global.appUrl_aim = `https://skotti:PYYPj4TM%23@aim.${global.testEnv}.webmd.com`; // # %23
       // global.appUrl_aim = `https://skotti:Naisha@234@aim.${global.testEnv}.webmd.com`;
        global.appUrl_salesforce = `https://test.salesforce.com/`;
        global.username_salesforce = 'skotti@webmd.net.fullcopy';
        global.password_salesforce = 'Naisha@123';
    },
});
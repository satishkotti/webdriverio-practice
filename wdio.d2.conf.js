var Q = require("q");

module.exports.getSpecs = function()
{
    var specList;
    var testApp = process.env.npm_config_testApp ? process.env.npm_config_testApp : 'd2cons' ;
    try
    {
        switch(testApp) {
            case "pb2":
                var config = require('./test/pb2/config/config');
                specList = [ './test/pb2/**/*.js' ];
            break;
            case "d2cons":
                var config = require('./test/d2/cons/config/config');
                specList = [ './test/d2/cons/**/*.js' ];
            break;
            case "d2prof":
                var config = require('./test/d2/prof/config/config');
                specList = [ './test/d2/prof/**/*.js' ];
            break;
            case "rt":
                var config = require('./test/rt/config/config');
                specList = [ './test/rt/**/*.js' ];
                break;
            default:
                throw "Missing Specs"
            }  
        }
        catch(err)
        {
            console.log(err);
        }

console.log('specs: '+specList);

        return specList;
};

exports.config = {

    debug: false,
    maxInstances: 10,
    
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    specs: module.exports.getSpecs(),
    // Patterns to exclude.
    exclude: [
         './test/d2/cons/config/**/*.*',
         './test/d2/cons/common/**/*.*',
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilties at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude option in
    // order to group specific specs to a specific capability.
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities: [{
        browserName: 'chrome'
    }],
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: silent | verbose | command | data | result | error
    logLevel: 'error',
    //log
    // Enables colors for log output.
    coloredLogs: true,
    //
    // Saves a screenshot to a given path if a command fails.
    screenshotPath: './errorShots/',
    //
    // Set a base URL in order to shorten url command calls. If your url parameter starts
    // with "/", the base url gets prepended.
    baseUrl: 'http://localhost',
    //
    // Default timeout for all waitForXXX commands.
    waitforTimeout: 120000,
    //
    // Initialize the browser instance with a WebdriverIO plugin. The object should have the
    // plugin name as key and the desired plugin options as property. Make sure you have
    // the plugin installed before running any tests. The following plugins are currently
    // available:
    // WebdriverCSS: https://github.com/webdriverio/webdrivercss
    // WebdriverRTC: https://github.com/webdriverio/webdriverrtc
    // Browserevent: https://github.com/webdriverio/browserevent
    // plugins: {
    //     webdrivercss: {
    //         screenshotRoot: 'my-shots',
    //         failedComparisonsRoot: 'diffs',
    //         misMatchTolerance: 0.05,
    //         screenWidth: [320,480,640,1024]
    //     },
    //     webdriverrtc: {},
    //     browserevent: {}
    // },
    //
    // Framework you want to run your specs with.
    // The following are supported: mocha, jasmine and cucumber
    // see also: http://webdriver.io/guide/testrunner/frameworks.html
    //
    // Make sure you have the node package for the specific framework installed before running
    // any tests. If not please install the following package:
    // Mocha: `$ npm install mocha`
    // Jasmine: `$ npm install jasmine`
    // Cucumber: `$ npm install cucumber`
    framework: 'mocha',
    //
    // Test reporter for stdout.
    // The following are supported: dot (default), spec and xunit
    // see also: http://webdriver.io/guide/testrunner/reporters.html

    reporters: ['spec', 'dot', 'allure'],
       reporterOptions: {
           allure: {
               outputDir: 'allure-results'
           }
       },
    //
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: 'bdd',
        timeout: 1200000
    },

    //
    // =====
    // Hooks
    // =====
    // Run functions before or after the test. If one of them returns with a promise, WebdriverIO
    // will wait until that promise got resolved to continue.
    //
    // Gets executed before all workers get launched.
    onPrepare: function() {
        var defered = Q.defer();
        // do something
		var selenium = require('selenium-standalone');
		  selenium.install({
			logger: function (message) { }
			}, function(err){
				
			if(err) return defered.reject(err);
		selenium.start(function (err, child) {
			if (err) return defered.reject(err);
			selenium.child = child;

            defered.resolve({});
		});
    });
    return defered.promise;
    },
    //
    // Gets executed before test execution begins. At this point you will have access to all global
    // variables like `browser`. It is the perfect place to define custom commands.
    before: function() {

        var testEnv = (process.env.npm_config_testEnv) ? process.env.npm_config_testEnv : 'dev04';
        var testApp = process.env.npm_config_testApp ? process.env.npm_config_testApp : 'd2cons' ;
        
        var chai = require('chai');
        chai.config.includeStack = true;
        expect = chai.expect;
        AssertionError = chai.AssertionError;
        Assertion = chai.Assertion;
        assert = chai.assert;
        should = chai.should();
        _ = require('lodash');

    try
    {
        switch(testApp) {
            case "pb2":
                var config = require('./test/pb2/config/config');
                global.envSettings = config.EnvSettings.getEnvSettings(testEnv);
                global.dataSettings = config.EnvSettings.getEnvData(testEnv);
            break;
            case "d2cons":
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
            default:
                specs = [ ];
            }  
        }
        catch(err)
        {
            console.log(err);
        }

    },
    //
    // Gets executed after all tests are done. You still have access to all global variables from
    // the test.
    after: function(failures, pid) {
        // do something
    },
    //
    // Gets executed after all workers got shut down and the process is about to exit. It is not
    // possible to defer the end of the process using a promise.
    onComplete: function() {
        // do something
    },
    suites: {
        pb2Sanity: [
            './test/pb2/sanity/favorite.js',
            './test/pb2/sanity/page.js',
            './test/pb2/sanity/template.js'
            ],
        pb2Ui: [
            './test/pb2/ui/login.js',
            './test/pb2/ui/navmap.js',
            './test/pb2/ui/ppe-81340.js'
            ],
        rtSanity: [ 
            './test/rt/sanity/dynamicUrl.js',
            './test/rt/sanity/homePage.js'
            ],
        rtUi:[
            ],
    }
};
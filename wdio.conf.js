var Q = require("q");
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
    specs: [
        './test/pb2/**/*.js'
    ],
    // Patterns to exclude.
    exclude: [
        './test/pb2/common/**/*.js'
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
    //
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
    waitforTimeout: 6000000,
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
        timeout: 600000
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
        
        var testEnv = (process.env.npm_config_testEnv) ? process.env.npm_config_testEnv + '.' : '';
        var chai = require('chai');
        chai.config.includeStack = true;
        expect = chai.expect;
        AssertionError = chai.AssertionError;
        Assertion = chai.Assertion;
        assert = chai.assert;
        should = chai.should();
        _ = require('lodash');

        //configs = require("./config/")
        
        global.pb2Url = "genesys."+ testEnv +"webmd.com";
		global.rtUrl = "http://www." + testEnv + "webmd.com";
		global.profD2Url = "http://www." + testEnv + "webmd.com";
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
    }
};

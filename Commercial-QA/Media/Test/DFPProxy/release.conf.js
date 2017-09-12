var Q = require("q");
_ = require("lodash");
var webdriverio = require("webdriverio");
var fs = require("fs");
exports.config = {
    /**
     * to run locally overwrite with your PPE number
     */
    specs: [],
    exclude: [],
    capabilities: [{
        browserName: 'chrome'
    }],
    sync: true,
    maxInstances: 10,
    logLevel: 'error',
    coloredLogs: true,
    screenshotPath: './errorShots/',
    baseUrl: 'http://localhost',
    waitforTimeout: 60000,
    framework: 'mocha',
    reporters: ['dot', 'spec','allure'],
    reporterOptions: {
        allure: {
            outputDir: 'allure-results'
        }
    },
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
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
        //configs = require("./config/options.json");
       // global.testenv = "http://www." + 'dev02.' + "webmd.com";
        global.samplesize = 10;
        global.regression = false;
        global.webmd_proxy = require('wdio-browser-proxy')(browser);
        //global.testenv = "http://www." + 'dev02.' + "webmd.com";

        browser.addCommand('waitForUrl', function(value, timeout) {
            return this.waitUntil(function() {
                return this.url((error, result) => {
                    return result.value === value;
                });
            }, timeout);
        });
    },
    after: function(failures, pid) {
        // do something
    },
    onComplete: function() {
        // do something
    }
};


function getSpecs() {
    var arg = _.find(process.argv, function(v) {
        return v.indexOf("--sp") >= 0;
    });
    var specs = arg.replace('--sp=', '').split(',');
    var result = [];
    _.forEach(specs, function(v) {
        if (v.indexOf('sprint') >= 0) {
            result.push('./**/' + v + '/**');
        } else {
            result.push('./**/' + v + '.omniture.js');
        }
    });
    return result;
}
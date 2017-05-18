var Q = require("q");

exports.config = {
    debug: false,
    maxInstances: 1,
    specs: [],
    exclude: [],
    capabilities: [{
        browserName: 'chrome'
    }],
    logLevel: 'error',
    coloredLogs: true,
    screenshotPath: './errorShots/',
    waitforTimeout: 60000,
    framework: 'mocha',
    reporters: ['spec', 'dot', 'allure'],
    reporterOptions: {
        allure: {
            outputDir: 'allure-results'
        }
    },
    mochaOpts: {
        ui: 'bdd',
        timeout: 2400000
    },
    onPrepare: function () {
        var defered = Q.defer();
        var selenium = require('selenium-standalone');
        selenium.install({
            logger: function (message) {}
        }, function (err) {

            if (err) return defered.reject(err);
            selenium.start(function (err, child) {
                if (err) return defered.reject(err);
                selenium.child = child;

                defered.resolve({});
            });
        });
        return defered.promise;
    },
    before: function () {

        var testEnv = (process.env.npm_config_testEnv) ? process.env.npm_config_testEnv : 'dev01';
        var testApp = process.env.npm_config_testApp ? process.env.npm_config_testApp : 'pb2';

        var chai = require('chai');
        chai.config.includeStack = true;
        expect = chai.expect;
        AssertionError = chai.AssertionError;
        Assertion = chai.Assertion;
        assert = chai.assert;
        should = chai.should();
        _ = require('lodash');

    },
    after: function (failures, pid) {},
    onComplete: function () {}
};
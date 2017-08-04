var path = require('path');
var gulp = require('gulp');
var selenium = require('selenium-standalone');
var webdriver = require('gulp-webdriver');
var Launcher = require('webdriverio').Launcher;
var chalk = require('chalk');
var git = require('gulp-git');
var gulpSequence = require('gulp-sequence');
var env = "";
var args = require("args");
var glob = require("glob");
var _ = require("lodash");
//var releaseconfig = require('./release.conf.js');
var glob = require("glob");


args.option('env', 'Environment targetted', "dev02")
    .option('branch', 'Master -- Will run all tests  branch/name (PPE-<branch name>) -- Will run branch tests  release release-WebMDRx-<number>/integration runs sprint tests')
    .option('samplesize', 'Sample Size', "10");
var flags = args.parse(process.argv);
//var configpath = `./config/${flags.env.toLowerCase()}.env`;
//require('dotenv').config({ path: configpath });
var error = chalk.bold.red;
var tests = [];
var excludeTests = [];
var currentBranch;
gulp.task('branch', function(cb) {
    return git.revParse({ args: '--abbrev-ref HEAD' }, function(err, branch) {
        console.log('current git branch: ' + branch);
        if (branch === "HEAD" && flags.branch === undefined) {
            console.log(error('branch is required. Use --help to get detailed info'));
            process.exit(-1);
        }
        if (branch === "HEAD") {
            branch = flags.branch;
        }
        currentBranch = branch;
        if (currentBranch.indexOf('master') === 0) {
            tests.push('jira/*.js');
            tests.push('jira/**/*.test.js');
            tests.push(`specs/**/*.js`);
        } else if (currentBranch.indexOf('release-') >= 0) {
            var testfile = currentBranch.toLowerCase().split("release-WebMDRx-")[1];
            if (testfile) {
                tests.push(`jira/rxsprint${testfile}/*.js`);
                tests.push(`jira/rxsprint${testfile}/*.test.js`);
                tests.push(`jira/rxrelease ${testfile}/*.js`);
                tests.push(`jira/rxrelease ${testfile}/*.test.js`);
                tests.push(`jira/rxhotfix ${testfile}/*.js`);
                tests.push(`jira/rxhotfix ${testfile}/*.test.js`);
            } else {
                tests.push(`jira/**/*.js`);
                tests.push(`jira/**/*.test.js`);
            }
        } else if (currentBranch.indexOf('PPE-') >= 0) {
            var testfile = currentBranch.toLowerCase().split("ppe-")[1].split("-")[0];
            tests.push(`jira/**/${testfile}.js`);
            tests.push(`jira/**/${testfile}.test.js`);
        } else {
            tests.push(`jira/**/*.js`);
            tests.push(`jira/**/*.test.js`);
        }
        var results = [];
        _.forEach(tests, function(t) {
            if (!_.isEmpty(glob.sync(t))) {
                results.push(t);
            }
        });
        if (results.length === 0) {
            console.log("Found no pattern running all tests");
            tests = [];
            tests.push(`baseline/*.test.js`);
            tests.push(`jira/**/*.test.js`);
            tests.push(`regression/*.test.js`);
            tests.push(`smoke/*.test.js`);
            console.log("Found no pattern running all tests", tests);
        } else {
            tests = results;
        }
        console.log("Will run tests for ", tests);
        cb();
    });
});

gulp.task('allbranchs', function(cb) {
    return git.revParse({ args: '--abbrev-ref HEAD' }, function(err, branch) {
        console.log('current git branch: ' + branch);
        //tests.push(`baseline/*.test.js`);
        tests.push(`jira/**/*.js`);
        //tests.push(`regression/*.test.js`);
        //tests.push(`smoke/*.test.js`);
        excludeTests.push('config/**');
        excludeTests.push('helper/**');
        excludeTests.push('pageobjects/**');
        excludeTests.push('omniture/**');
        excludeTests.push('jira/rxhotfix5-4-2017/**');
        //excludeTests.push('jira/rxrelease2.4/**');
        //excludeTests.push('jira/rxrelease2.5/**');
        //excludeTests.push('jira/rxsprint4/**');
        cb();
    });
});


gulp.task('webdriver', function(done) {
    releaseconfig.config.specs = tests;
    releaseconfig.config.exclude = excludeTests;
    var wdio = new Launcher(path.join(__dirname, 'release.conf.js'), releaseconfig.config);
    return wdio.run().then(function(code) {
        console.log(code);
    }, function(error) {
        console.error('Launcher failed to start the test', error.stacktrace);
        selenium.child.kill();
        process.exit(1);
    });
});



gulp.task('selenium', function(done) {
    selenium.install({
        logger: function(message) {}
    }, function(err) {
        if (err) return done(err);

        selenium.start(function(err, child) {
            if (err) return done(err);
            selenium.child = child;
            done();
        });
    });
});

gulp.task('local', function(cb) {
    gulpSequence('branch', 'selenium', 'webdriver')(function(err) {
        if (err) console.log(err)
        selenium.child.kill();
    });
});

gulp.task('e2e', function() {
    releaseconfig.config.host = '172.28.38.219';
    releaseconfig.config.port = 4444;
    gulpSequence('branch', 'webdriver')(function(err) {
        if (err) console.log(err);
    });

});

gulp.task('default', function() {
    releaseconfig.config.host = '172.28.38.219';
    releaseconfig.config.port = 4444;
    gulpSequence('allbranchs', 'webdriver')(function(err) {
        if (err) console.log(err);
    });

});

gulp.task('test', function() {
    releaseconfig.config.host = '172.28.38.219';
    releaseconfig.config.port = 4444;
    tests = [];
    tests.push(`jira/RxHotFix5-4-2017/*.js`);
    gulpSequence('selenium', 'webdriver')(function(err) {
        if (err) console.log(err);
    });

});


module.exports = "for giggles!";
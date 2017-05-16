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
var releaseconfig = require('./wdio.conf.js');
var glob = require("glob");

args.option('env', 'Environment targetted', "dev01")
    .option('branch', 'Master -- Will run all tests  branch/name (PPE-<branch name>) -- Will run branch tests  release release-sprint-<number>/integration runs sprint tests')
    .option('samplesize', 'Sample Size', "10")
    .option('conf', 'WebDriver IO Config file to run', "")
    .option('app', 'App', '')
    .option('maxInstances', 'Maximum number of instances a browser can have', 1);

var flags = args.parse(process.argv);

var currentApp = flags.app;
console.log('app: ' + currentApp);

var conf = flags.conf;
var testEnv = flags.env;

var error = chalk.bold.red;
var tests = [];
var currentBranch;

var appFolder;

switch (currentApp) {
    case 'rt':
        appFolder = 'rt';
        break;
    case 'd2cons':
        appFolder = 'd2/cons';
        break;
    case 'd2prof':
        appFolder = 'd2/prof';
        break;
    case 'pb2':
        appFolder = 'pb2';
        break;
}

if (conf.length == 0) {
    conf = `./test/${appFolder}/config/wdio/wdio.default.conf`;
}
gulp.task('branch', function (cb) {
    return git.revParse({ args: '--abbrev-ref HEAD' }, function (err, branch) {
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
            tests.push('jira/**/*.js');
            var testRunner = require(conf).config;
            testRunner.specs = tests;
        }
        else if (currentBranch.indexOf('release-pb2-') >= 0) {
            tests.push(`test/${appFolder}/**/jira/**/*.js`);
        } else if (currentBranch.indexOf('release-pb2-') >= 0) {
            var testfile = currentBranch.toLowerCase().split("release-pb2-")[1];

            console.log('release tests: ' + `test/${appFolder}/**/jira/${testfile}/*.js`);
            var testRunner = require(conf).config;
            if (testfile) {
                tests.push(`test/${appFolder}/**/jira/${testfile}/*.js`);
                testRunner.specs = tests;
            } else {
                tests.push('test/${appFolder}/**/jira/**/*.js');
                testRunner.specs = tests;
            }
        }
        else if (currentBranch.indexOf('integration-pb2-') >= 0) {
            var testfile = currentBranch.toLowerCase().split("integration-pb2-")[1];
            console.log('tests: ' + `jira/${testfile}/*.js`);
            var testRunner = require(conf).config;
            testRunner.specs = tests;
        } else if (currentBranch.indexOf('PPE-') >= 0) {
            var testfile = currentBranch.toLowerCase().split("ppe-")[1].split("-")[0];
            console.log('ppe tests: ' + `test/${appFolder}/**/jira/${testfile}/*.js`);
            tests.push(`test/${appFolder}/**/jira/**/${testfile}.js`);
            var testRunner = require(conf).config;
            testRunner.specs = tests;
        } else {
            console.log('tests: ' + `test/${appFolder}/**/jira/**/*.js`);
            tests.push(`test/${appFolder}/**/jira/**/*.js`);
            var testRunner = require(conf).config;
            testRunner.specs = tests;
        }

        var results = [];
        _.forEach(tests, function (t) {
            if (!_.isEmpty(glob.sync(t))) {
                results.push(t);
            }
        });

        if (results.length === 0) {
            console.log("Found no pattern running all tests");
            tests = [];
            //tests.push(`test/${appFolder}/**/baseline/**/*.js`);
            tests.push(`test/${appFolder}/**/jira/**/*.js`);
            tests.push(`test/${appFolder}/**/regression/**/*.js`);
            tests.push(`test/${appFolder}/**/smoke/**/*.js`);
            var testRunner = require(conf).config;
            testRunner.specs = tests;
        } else {
            tests = results;
        }

        cb();
    });
});

gulp.task('allbranches', function (cb) {
    return git.revParse({ args: '--abbrev-ref HEAD' }, function (err, branch) {
        console.log('current git branch: ' + branch);
        tests.push(`baseline/*.js`);
        tests.push(`jira/**/*.js`);
        tests.push(`regression/*.js`);
        tests.push(`smoke/*.js`);
        cb();
    });
});

gulp.task('webdriver', function (done) {
    releaseconfig.config = {
        specs: tests
    };
    var wdio = new Launcher(path.join(__dirname, conf), releaseconfig.config);
    return wdio.run().then(function (code) {
        console.log(code);
    }, function (error) {
        console.error('Launcher failed to start the test', error.stacktrace);
        selenium.child.kill();
        process.exit(1);
    });
});

gulp.task('selenium', function (done) {
    selenium.install({
        logger: function (message) { }
    }, function (err) {
        if (err) return done(err);

        selenium.start(function (err, child) {
            if (err) return done(err);
            selenium.child = child;
            done();
        });
    });
});

gulp.task('local', function (cb) {
    gulpSequence('branch', 'selenium', 'webdriver')(function (err) {
        if (err) console.log(err)
        selenium.child.kill();
    });
});

gulp.task('default', function () {
    releaseconfig.config.host = '172.28.38.219';
    releaseconfig.config.port = 4444;
    gulpSequence('branch', 'webdriver')(function (err) {
        if (err) console.log(err);
    });
});

module.exports = {
    TestEnv: testEnv,
    MaxInstances: flags.maxInstances

}
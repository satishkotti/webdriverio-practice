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

args.option('env', 'Environment targetted', "")
    .option('branch', 'Master -- Will run all tests  branch/name (PPE-<branch name>) -- Will run branch tests  release release-sprint-<number>/integration runs sprint tests')
    .option('samplesize', 'Sample Size', "10")
    .option('conf', 'WebDriver IO Config file to run', "")
    .option('app', 'App', '');

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
        if(testEnv.length == 0)
            testEnv = 'qa02';
        if(conf.length == 0)
        {
            appFolder = 'pb2';
            conf = './wdio.conf';
        }
        break;
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
        }
        else if (currentBranch.indexOf('release-pb2-') >= 0) {
            tests.push(`test/${appFolder}/**/jira/**/*.js`);
        } else if (currentBranch.indexOf('release-pb2-') >= 0) {
            var testfile = currentBranch.toLowerCase().split("release-pb2-")[1];

            console.log('release tests: ' + `test/${appFolder}/**/jira/${testfile}/*.js`);

            if (testfile) {
                tests.push(`test/${appFolder}/**/jira/${testfile}/*.js`);
            } else {
                tests.push('test/${appFolder}/**/jira/**/*.js');
            }
        }
        else if (currentBranch.indexOf('integration-pb2-') >= 0) {
            var testfile = currentBranch.toLowerCase().split("integration-pb2-")[1];

            console.log('tests: ' + `jira/${testfile}/*.js`);
        } else if (currentBranch.indexOf('integration-pb2-') >= 0) {
            var testfile = currentBranch.toLowerCase().split("integration-pb2-")[1];

            console.log('integration tests: ' + `test/${appFolder}/**/jira/${testfile}/*.js`);

            tests.push(`test/${appFolder}/**/jira/${testfile}/*.js`);
        } else if (currentBranch.indexOf('PPE-') >= 0) {
            var testfile = currentBranch.toLowerCase().split("ppe-")[1].split("-")[0];

            console.log('ppe tests: ' + `test/${appFolder}/**/jira/${testfile}/*.js`);

            tests.push(`test/${appFolder}/**/jira/**/${testfile}.js`);
        } else {

            console.log('tests: ' + `test/${appFolder}/**/jira/**/*.js`);
            tests.push(`test/${appFolder}/**/jira/**/*.js`);
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
            tests.push(`test/${appFolder}/**/baseline/**/*.js`);
            tests.push(`test/${appFolder}/**/release29/*.js`);
            tests.push(`test/${appFolder}/**/regression/**/*.js`);
            tests.push(`test/${appFolder}/**/smoke/**/*.js`);
            console.log("Found no pattern running all tests", tests);
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

module.exports.TestEnv = testEnv;
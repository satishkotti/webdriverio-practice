var path = require('path');
var gulp = require('gulp');
var selenium = require('selenium-standalone');
var webdriver = require('gulp-webdriver');
var Launcher = require('webdriverio').Launcher;
var chalk = require('chalk');
var git = require('gulp-git');
var gulpSequence = require('gulp-sequence');
var args = require("args");
var glob = require("glob");
var _ = require("lodash");
var glob = require("glob");
var fs = require("fs");

args.option('env', 'Environment targetted', "dev01")
    .option('branch', 'Master -- Will run all tests  branch/name (PPE-<branch name>) -- Will run branch tests  release release-sprint-<number>/integration runs sprint tests')
    .option('conf', 'WebDriver IO Config file to run', "")
    .option('app', 'App: rt, d2cons, d2prof, pb2', '')
    .option('maxInstances', 'Maximum number of instances a browser can have', 1)
    .option('logLevel', 'Test runner logging level default error', 'error');

var flags = args.parse(process.argv);

var currentApp = flags.app;
var conf = flags.conf;
var testEnv = flags.env;
var error = chalk.bold.red;
var tests = [];
var currentBranch;
var confPath;
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
    confPath = `./test/${appFolder}/config/wdio/wdio.default.conf`;
    conf = require(`./test/${appFolder}/config/wdio/wdio.default.conf`);
    console.log('config: ' + confPath);
}

gulp.task('branch', function (cb) {
    return git.revParse({
        args: '--abbrev-ref HEAD'
    }, function (err, branch) {

        console.log('app: ' + currentApp);
        console.log('branch: ' + branch);

        if (branch === "HEAD" && flags.branch === undefined) {
            console.log(error('branch is required. Use --help to get detailed info'));
            process.exit(-1);
        }
        if (branch === "HEAD") {
            branch = flags.branch;
        }
        currentBranch = branch;

        var specBranch;
        if (currentBranch.indexOf('master') === 0) {
            specBranch = `test/${appFolder}/**/jira/**/*.js`;
            console.log('master specs: ' + specBranch);
        } else if (currentBranch.indexOf('release-') >= 0) {
            var testfile = currentBranch.toLowerCase().split("-");
            specBranch = `test/${appFolder}/**/${testfile[testfile.length-1]}/*.js`;
            console.log('release specs: ' + specBranch);
        } else if (currentBranch.indexOf('integration-') >= 0) {
            var testfile = currentBranch.toLowerCase().split("-");
            specBranch = `test/${appFolder}/**/${testfile[testfile.length-1]}/ppe-98901.js`;
            console.log('integration specs: ' + specBranch);
        }

        if (specBranch) {
            tests.push(specBranch);
        }

        var results = [];
        _.forEach(tests, function (t) {
            if (!_.isEmpty(glob.sync(t))) {
                results.push(t);
            }
        });

        if (results.length === 0) {
            console.log("*** Found no pattern running all tests ***");
            tests = [];
            tests.push(`test/${appFolder}/**/baseline/**/*.js`);
            tests.push(`test/${appFolder}/**/jira/**/*.js`);
            tests.push(`test/${appFolder}/**/regression/**/*.js`);
            tests.push(`test/${appFolder}/**/smoke/**/*.js`);
        }
        cb();
    });
});

var deleteFolderRecursive = function (path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

gulp.task('webdriver', function (done) {
    conf.config.specs = tests;
    console.log('executing specs: ' + conf.config.specs.toString());

    var wdio = new Launcher(path.join(__dirname, confPath), conf.config);
    return wdio.run().then(function (code) {
        console.log('wdio exit code: ' + code);
        done();
    }, function (error) {
        console.error('Launcher failed to start the test', error.stacktrace);
        selenium.child.kill();
        
        done(error);
        //process.exit(1);
    });
});

gulp.task('selenium', function (done) {
    selenium.install({
        logger: function (message) {}
    }, function (err) {
        if (err) return done(err);

        selenium.start(function (err, child) {
            if (err) return done(err);
            selenium.child = child;
            done();
        });
    });
});

gulp.task('clean', function () {
    var allure = rootPath = path.join(process.cwd(), "allure-results");
    console.log('remove folder: ' + allure);
    deleteFolderRecursive(allure);
})

gulp.task('local', function (cb) {
    gulpSequence(['clean'], 'branch', 'selenium', 'webdriver')(function (err) {
        if (err) console.log(err)
        selenium.child.kill();
    });
});

gulp.task('default', function (done) {
    conf.config.host = '172.28.38.219';
    conf.config.port = 4444;
    gulpSequence(['clean'], 'branch', 'webdriver')(function (err) {
        if (err) console.log(err);
    });
    done();
});

module.exports = {
    TestEnv: testEnv.toLowerCase(),
    MaxInstances: flags.maxInstances,
    LogLevel: flags.logLevel
}
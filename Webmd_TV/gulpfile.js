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

args.option('env', 'Environment targetted', "PRODSEA1")
    .option('branch', 'Master -- Will run all tests  branch/name (PPE-<branch name>) -- Will run branch tests  release release-sprint-<number>/integration runs sprint tests')
    .option('maxInstances', 'Maximum number of instances a browser can have', 1)
    .option('logLevel', 'Test runner logging level default error', 'error')
    .option('selectTests', 'Tests to execute seperated by comma', 'not-selected');

var flags = args.parse(process.argv);

var testEnv = flags.env;
var selectTest = flags.selectTests;
var error = chalk.bold.red;
var defaultWaitTimeout = 180000;
var defaultMochaTestTimeout = 600000;
var gridHost = '172.28.38.219';
var gridPort = 4444;
//var testEnv='prodsea1';
var tests = [];
var currentBranch;
var confPath;
var appFolder;
/*switch (currentApp.toLowerCase()) {
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
}*/
    confPath = `./wdio.conf.js`;
    conf = require(`./wdio.conf.js`);

gulp.task('branch', function (cb) {
    return git.revParse({
        args: '--abbrev-ref HEAD'
    }, function (err, branch) {

        //console.log('app: ' + currentApp);
        console.log('branch: ' + branch);

     /*   if(testEnv.toLowerCase().indexOf('prod') >= 0)
        {
            console.log('PROD RUN NOT SUPPORTED FOR DEFAULT TASK');
            cb();
            return;
        }*/

        if (branch === "HEAD" && flags.branch === undefined) {
            console.log(error('branch is required. Use --help to get detailed info'));
            process.exit(-1);
        }
        if (branch === "HEAD") {
            branch = flags.branch;
        }
        currentBranch = branch.toLowerCase();

        var specBranch;
        if (currentBranch.indexOf('master') === 0) {
            //specBranch = './fe/jira/*.js';
			specBranch = './fe/jira/PPE-121206.js';
            console.log('master specs: ' + specBranch);
        } 
        else if (currentBranch.indexOf('release-') >= 0) {
            var testfile = currentBranch.split("-");
            specBranch = `test/${appFolder}/**/${testfile[testfile.length-1]}/*.js`;
            console.log('release specs: ' + specBranch);
        } else if (currentBranch.indexOf('integration-') >= 0) {
            var testfile = currentBranch.split("-");
            specBranch = `test/${appFolder}/**/${testfile[testfile.length-1]}/*.js`;
            console.log('integration specs: ' + specBranch);
        } else if (currentBranch.indexOf('ppe-') >= 0) {
            var branchArr = currentBranch.split('-');
            var ppeIndex = branchArr.indexOf('ppe');
            if (ppeIndex >= 0) {
                var testfile = branchArr[ppeIndex + 1];
                specFiles = `test/${appFolder}/**/*${testfile}*.js`;
				specFileFolder = `test/${appFolder}/**/*${testfile}*/*.js`;
				tests.push(specFiles);
				tests.push(specFileFolder);
                console.log('feature ppe file specs: ' + specFiles);
                console.log('feature ppe folder specs: ' + specFileFolder);
            }
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

gulp.task('selected', function (done) {

    console.log('selectTest: '+ selectTest);
    if (selectTest.length > 0) {

        if(selectTest.indexOf("," == 0))
        {
            selectTest += ",endtest";
        }

            _.each(selectTest.split(","), function (testId) {
                var specFiles = `test/${appFolder}/**/*${testId.trim()}*.js`;
                var specFileFolder = `test/${appFolder}/**/*${testId.trim()}*/*.js`;
                tests.push(specFiles);
                tests.push(specFileFolder);
                console.log('selected file specs: ' + specFiles);
                console.log('selected folder specs: ' + specFileFolder);
            });
    }
    
    conf.config.host = gridHost;
    conf.config.port = gridPort;
    gulpSequence('webdriver')(function (err) {
        if (err) {
            console.log('Failed: ' + err);
        }
    });
    done();
});

gulp.task('prod', function (done) {
    tests.push(`test/${appFolder}/**/prod/**/*.js`);
    conf.config.host = gridHost;
    conf.config.port = gridPort;
    gulpSequence('webdriver')(function (err) {
        if (err){ console.log('Failed: ' + err); }
    });
    done();
});

gulp.task('smoke', function (done) {
    tests.push(`test/${appFolder}/**/smoke/**/*.js`);
    conf.config.host = gridHost;
    conf.config.port = gridPort;
    gulpSequence('webdriver')(function (err) {
        if (err){ console.log('Failed: ' + err); }
    });
    done();
});

gulp.task('all', function (done) {
    tests.push(`test/${appFolder}/**/baseline/**/*.js`);
    tests.push(`test/${appFolder}/**/jira/**/*.js`);
    tests.push(`test/${appFolder}/**/regression/**/*.js`);
    tests.push(`test/${appFolder}/**/smoke/**/*.js`);
    conf.config.host = gridHost;
    conf.config.port = gridPort;
    gulpSequence('webdriver')(function (err) {
        if (err){ console.log('Failed: ' + err); }
    });
    done();
});

gulp.task('webdriver', function (done) {
    conf.config.specs = tests;
    conf.config.maxInstances = flags.maxInstances;
    conf.config.logLevel = flags.logLevel;
    conf.config.waitforTimeout = defaultWaitTimeout;
    conf.config.mochaOpts.timeout = defaultMochaTestTimeout;

    console.log('executing specs: ' + conf.config.specs.toString());
    console.log('max instances: ' + conf.config.maxInstances);
    console.log('log level: ' + conf.config.logLevel);
    console.log('waitTimeout: ' + conf.config.waitforTimeout);
    console.log('mocha test timeout: ' + conf.config.mochaOpts.timeout);
    console.log('executing specs: ' + conf.config.specs.toString());

    var wdio = new Launcher(path.join(__dirname, confPath), conf.config);
    return wdio.run().then(function (code) {
        console.log('wdio exit code: ' + code);
    }, function (error) {
        console.error('Launcher failed to start the test', error.stacktrace);
        selenium.child.kill();
        process.exit(1);
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
    conf.config.host = gridHost;
    conf.config.port = gridPort;
    gulpSequence('branch', 'webdriver')(function (err) {
        if (err){ console.log('Failed: ' + err); }
    });
    done();
});

module.exports = {
    TestEnv: testEnv.toLowerCase(),
    MaxInstances: flags.maxInstances,
    LogLevel: flags.logLevel,
	
}
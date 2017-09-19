var path = require('path');
var gulp = require('gulp');
var selenium = require('selenium-standalone');
var webdriver = require('gulp-webdriver');
var Launcher = require('webdriverio').Launcher;
var chalk = require('chalk');
var git = require('gulp-git');
var gulpSequence = require('gulp-sequence').use(gulp);
var env = "";
var args = require("args");
var glob = require("glob");
var _ = require("lodash");
var releaseconfig = require('./release.conf.js');
var glob = require("glob");
var mocha = require('gulp-mocha');
var spawn = require('child_process').spawn;
var util = require('gulp-util');
var fs = require("fs");
var path = require("path");
var fs = require("fs");


gulp.task('report', ['clean', 'generate'], function () {
    return gulp.src(["./bootstrap.test.js", "./tmp/*.test.js"])
        .pipe(mocha({
            require: "bootstrap.test.js",
            reporter: 'mocha-allure-reporter',
            reporterOptions: { targetDir: 'allure-results' }
        }))
        .on('error', function (e) {
            console.log(e);
        })
        .once('end', function () {
            process.exit();
        });
});



var browsermobRunner = require('browsermob-proxy-runner');

// args.option('env', 'Environment targetted', "dev02");
// args.option('branch', 'branch targetted', "");
// var flags = args.parse(process.argv);
// var configpath = `./config/${flags.env.toLowerCase()}.env`;
// require('dotenv').config({ path: configpath });
// tests = ["./index_omniture.js", "./**/*.omniture.js"];
var browsermobProxy;

gulp.task('browsermobrunner', function (done) {
    runBrowsermob(function (err, browsermob) {
        if (err) return done(err);
        browsermobProxy = browsermob;
        done();
    });
});

gulp.task('webdriver', function (done) {
    releaseconfig.config.specs = tests;
    var wdio = new Launcher(path.join(__dirname, 'release.conf.js'), releaseconfig.config);
    return wdio.run().then(function (code) {
        console.log(code);
    }, function (error) {
        console.error('Launcher failed to start the test', error.stacktrace);
        selenium.child.kill();
        browsermobProxy.kill();
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

var broswerMob;

function runBrowsermob(cb) {
    var jarfile = path.resolve(process.cwd(), "browsermob", 'lib', "browsermob-dist-2.1.4.jar");
    console.log(jarfile);
    var basedir = path.resolve(process.cwd(), "browsermob", 'bin', 'browsermob-proxy');
    console.log(basedir);
    var child = spawn('sh', [basedir]);

    var badExit = function (e) {
        cb(new Error('Could not start Browsermob.', e));
    };
    child.stderr.on('data', function (data) {
        var sentinal = 'Started SelectChannelConnector';
        if (data.toString().indexOf(sentinal) != -1) {
            child.removeListener('exit', badExit);
            broswerMob = child;
            cb(null, child)
        } else {
            console.log('Browsermob started on ');
        }
    });

    child.on('exit', badExit);
}

gulp.task("default", ["mochaTest"], function () {
    console.log("starting the gulp default task...");
});

gulp.task("local", [], function () {
	return gulp.src(["./bootstrap.test.js",
	"./baseline/regression/desktop/Regression.js",
    //"./jira/desktop/Sprint_61/PPE-129126Scripts.js"
	]).pipe(mocha())
});

gulp.task('mochaTest', ['clean'], function () {

    return gulp.src(["./bootstrap.test.js",
        "./baseline/regression/desktop/Regression.js",
       //  "./jira/desktop/Sprint_59/PPE121501Scripts.js",
	   //"./jira/desktop/Sprint_61/PPE-129126Scripts.js"
    ])
        .pipe(mocha({
            require: "bootstrap.test.js",
            reporter: 'mocha-allure-reporter',
            reporterOptions: { targetDir: 'allure-results' }
        }))
        .on('error', function (e) {
            console.log(e);
        })
        .once('end', function () {
            process.exit();
        });
});

gulp.task('clean', function () {
    var allure = rootPath = path.join(process.cwd(), "allure-results");
    if (fs.existsSync(allure)) {
        deleteFolderRecursive(allure);
    }
})

var rootPath;
// path should have trailing slash
function removeDirForce(dirPath) {

}


gulp.task('newreport', function () {
    return gulp.src(["./tmp/*.test.js"])
        .pipe(mocha({
            require: "bootstrap.test.js",
            reporter: 'mocha-allure-reporter',
            reporterOptions: { targetDir: 'allure-results' }
        }))
        .on('error', function (e) {
            console.log(e);
        })
        .once('end', function () {
            process.exit();
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


gulp.task("runreporting", gulpSequence("downloadomniture", "generate", "newreport"));
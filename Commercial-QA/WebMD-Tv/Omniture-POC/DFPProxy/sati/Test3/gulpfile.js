//./gulpfile.js
var path = require('path');
var gulp = require('gulp');
var selenium = require('selenium-standalone');
var webdriver = require('gulp-webdriver');
var Launcher = require('webdriverio').Launcher;
var wdio_proxy = require("wdio-browser-proxy");
var webdriverio = require('./wdio.conf');
var spawn = require('child_process').spawn;
var broswerMob;
var browsermobProxy;
var client;

function runBrowsermob(cb) {
  var basedir = path.resolve(process.cwd(), "browsermob", 'bin', 'browsermob-proxy');
  //var child = spawn('cmd.exe', ['/D', 'POCs\WebMD\webdriverio-standalone\browsermob\bin\browsermob-proxy.bat']);
  var child = spawn('sh', [basedir]);
  child.on('exit', function (code, signal) {
    console.log('child process exited with ' +
      `code ${code} and signal ${signal}`);
  });

  var badExit = function (e) {
    cb(new Error('Could not start Browsermob.', e));
  };
  child.stderr.on('data', function (data) {
    console.log("Raemsh Zeero");
    var sentinal = 'Started SelectChannelConnector';
    if (data.toString().indexOf(sentinal) != -1) {
      console.log("Raemsh One");
      child.removeListener('exit', badExit);
      broswerMob = child;
      console.log(child);
      cb(null, child)
    } else {
      console.log('Browsermob started on ');
    }
  });

  child.on('exit', badExit);
}
console.log(Launcher);
gulp.task('webdriver', function(done) {
     var wdio = new Launcher(path.join(__dirname, 'wdio.conf.js'), webdriverio.config);
    return wdio.run().then(function(code) {
        console.log(code);
    }, function(error) {
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

gulp.task('browsermobrunner', function (done) {
  runBrowsermob(function (err, browsermob) {
    console.log(browsermob);
    if (err) return done(err);
    browsermobProxy = browsermob;
    console.log("Raemsh Three");
    done();
  });
});


gulp.task('runTest', ['webdriver']);
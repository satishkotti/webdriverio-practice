var webdriverio = require('webdriverio');
var should = require('should');
var argv = require("yargs").argv;
var functions = require('./../../common/functions/functions');
var spage = require('./../../common/actions/PPE-117374.actions')
var splashelement = require('./../../common/elements/webmdtvpage');
var Input = require('./../../config/Webmd-tv')[argv.env];
var splashpage = Input.splashpage;
var Surveyclose = splashelement.Surveyclose.selector;

describe(' PPE-117374 -On Video Page Make Video Sticky', function () {

  it(' Verify that video is sticky in video page only for Desktop and not mobile devices ', function () {

    var sticky = spage.stickyvideo();
    browser.pause(15000)
    sticky.smallexist.should.equal(true);
    sticky.bigexist.should.equal(true);
  });

  
  it('Verify that Video continues play when the user scrub on the video progress bar ', function () {
    var progressbar = spage.videopause();
    progressbar.videopauseexist.should.equal(false);
  });
  it('Verify that video playlist will continue to forward the videos in the video header', function () {

   var autoforward=spage.videoauto();
   autoforward.flag.should.equal(true);

  });
  it('Verify that Video is not suppressed when player is paused', function () {
    var videosup = spage.videounpin();
    videosup.videopauseexist.should.equal(false);
  });
});
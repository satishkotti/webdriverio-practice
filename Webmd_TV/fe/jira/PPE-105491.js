var webdriverio = require('webdriverio');
var should = require('should');
var argv = require("yargs").argv;
var assetpage = require('./../../common/functions/functions');
var splashelement = require('./../../common/elements/webmdtvpage');
var env = require('./../../gulpfile.js').TestEnv;
var Input = require('./../../config/Webmd-tv')[env];
var url = Input.splashpage;


describe('PPE-105491-Build Splash Page Video Page Elements', function () {

  it('PPE-108347-Verify Video Player master header is available in Video Grid', function () {
    browser.url(url);
    browser.pause(500);
    if (browser.isExisting('#webmdHoverClose')) {
      browser.pause(1000);
      browser.click('#webmdHoverClose');
    }
    browser.scroll(100, 100);
    var Elementscroll = $('.masthead-wrapper clearfix');
    var Videomasterhead = splashelement.Videomasterhead.selector;
    browser.scroll(Videomasterhead, 100, 100);
    browser.pause(500);
    browser.waitForVisible(Videomasterhead, 4000);
    var Videomasterhead = splashelement.Videomasterhead.selector;
    var Videomasterheadexist = browser.isExisting(Videomasterhead);
    Videomasterheadexist.should.equal(true);
    var Videomasterheadprop = assetpage.cssProperties(splashelement.Migranelogo);
    var Videomasterheadfont = Videomasterheadprop.fontFamily;
    var Videomasterheadfontcolor = Videomasterheadprop.fontColor;
    var Videomasterheadfontsize = Videomasterheadprop.fontSize;
    Videomasterheadfont.should.equal('source sans pro');
    Videomasterheadfontcolor.should.equal('#ffffff');
    Videomasterheadfontsize.should.equal('70px');

  });


  it(' PPE-108352-Verify during the page load, height of grid is less than height of screen and part of video is visible then video is loaded.', function () {
    var Videoplayer = splashelement.Videoplayer.selector;
    browser.waitForVisible(Videoplayer, 8000);
    browser.pause(500);
    var Videoplayerexist = browser.isExisting(Videoplayer);
    console.log('Verifying Video Player is available  : ' + Videoplayerexist);
    Videoplayerexist.should.equal(true);
    var Videoplayerplaying = splashelement.Videoplaying.selector;
    var Videoplayerplayingexist = browser.isExisting(Videoplayerplaying);
    console.log('Verifying Video Player is playing as page is scrolled for lazy load : ' + Videoplayerplayingexist);
    Videoplayerplayingexist.should.equal(true);
  });

  it('PPE-108348 Verify Video Player element is available in Video Grid', function () {
    var Videoplayer = splashelement.Videoplayer.selector;
    browser.pause(2000);
    var Videoplayerexist = browser.isExisting(Videoplayer);
    console.log('Verifying Video Player is available : ' + Videoplayerexist);
    Videoplayerexist.should.equal(true);
  });

  it('PPE-108349 Verify Film Strip element is available under Video Grid', function () {
    browser.pause(500);
    var Filmstrip = splashelement.Filmstrip.selector;
    browser.pause(1000);
    var Filmstripexist = browser.isExisting(Filmstrip);
    console.log('Verifying Film Strip is available : ' + Filmstripexist);
    Filmstripexist.should.equal(true);
  });



  it('PPE-108350 Verify UGC Module element is available under Video Grid', function () {

    console.log("ugc");

    var videoplayerlocation = browser.getLocation("//div[@class='akamai-video akamai-layer']");
    console.log("Video location x and Y" + JSON.stringify(videoplayerlocation));
    var ugcmodule = browser.getLocation("//div[@id='ugc-wrapper']//div[@id='ugc-widget']");
    console.log("ugcmodule x and Y" + JSON.stringify(ugcmodule));
    var sharestory = browser.getLocation("//div[@id='ugc-form']");
    console.log("sharestory" + JSON.stringify(sharestory));
    if (ugcmodule.y > videoplayerlocation.y) {
      result = true;
    } else {
      result = false;
    }
    result.should.equal(true);
  });


  it('PPE-108351 Verify Asset Grid element is available under Video Grid', function () {
    browser.pause(500);
    var Assetgridscroll = $('.list-container');
    Assetgridscroll.scroll(100, 100);
    var Assetgrid = splashelement.Assetgrid.selector;
    var Assetgridexist = browser.isExisting(Assetgrid);
    console.log('Verifying Asset Grid is available : ' + Assetgridexist);
    Assetgridexist.should.equal(true);
  });
});
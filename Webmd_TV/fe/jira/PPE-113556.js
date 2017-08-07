var webdriverio = require('webdriverio');
var should = require('should');
var argv = require("yargs").argv;
var assetpage = require('./../../common/functions/functions');
var splashelement = require('./../../common/elements/webmdtvpage');
//var Input = require('./../../../config/Webmd-tv')[argv.env];
var env = require('./../../gulpfile.js').TestEnv;
var Input = require('./../../config/Webmd-tv')[env];
var homepage = Input.splashpageheader;
var gridurl = Input.splashpageheadergridurl;
var Surveyclose = splashelement.Surveyclose.selector;
var url=Input.environment;


describe('PPE-113556 Filmstrip Play icon shown only on rollover', function () {

  it('PPE-118456 Verify that Filmstrip play icon is not displayed when user is not mouse hover on video thumbnail', function () {
browser.url(url);
browser.pause(4000);
if (browser.isExisting('#webmdHoverClose')) {
      browser.pause(1000);
      browser.click('#webmdHoverClose');
    }
    browser.pause(2000);
    var Elementscroll = $('.more-from');
    Elementscroll.scroll(100, 100);


    var Filmstripplaybtn = splashelement.Filmstripplaybtn.selector;
    splashelement.Filmstripplaybtnimg.waitForExist(1000);
    var Filmstripplaybtnexist = browser.isVisible(Filmstripplaybtn);
    console.log('Verifying Filmstrip play icon is not displayed when user is not mouse hover on video thumbnail : ' + Filmstripplaybtnexist);
    Filmstripplaybtnexist.should.equal(false);
  });

  it('PPE-118455- Verify that FilmStrip Play Icon should be displayed on the video thumbnail,when user mouse over on video', function () {

    var Elementscroll = $('.more-from');
    Elementscroll.scroll(2000, 2000);
    splashelement.Filmstripplaybtnimg.waitForExist(1000);

    var Filmstripplaybtnimg = splashelement.Filmstripplaybtnimg.selector;
    browser.moveToObject(Filmstripplaybtnimg, 30, 30);
    browser.pause(700);
    var Filmstripplaybtnimgexist = browser.isVisible(Filmstripplaybtnimg);
    var Filmstripplaybtn = splashelement.Filmstripplaybtn.selector;
    splashelement.Filmstripplaybtn.waitForExist(1000);
    var Filmstripplaybtnexist = browser.isVisible(Filmstripplaybtn);

    if (Filmstripplaybtnexist == true) {
      console.log('Verifying that FilmStrip Play Icon should be displayed on the video thumbnail,when user mouse over on video : ' + Filmstripplaybtnexist);
      Filmstripplaybtnexist.should.equal(true);

    }


  });
  it(' PPE-118457 Verify that video plays on clicking Filmstrip Play button	', function () {
    var Elementscroll = $('.more-from');
    Elementscroll.scroll(2000, 2000);
    splashelement.Filmstripplaybtnimg.waitForExist(1000);


    var Filmstripplaybtnimg = splashelement.Filmstripplaybtnimg.selector;
    browser.moveToObject(Filmstripplaybtnimg, 30, 30);
    browser.pause(700);
    var Filmstripplaybtnimgexist = browser.isVisible(Filmstripplaybtnimg);


    var Filmstripplaybtn = splashelement.Filmstripplaybtn.selector;
    splashelement.Filmstripplaybtn.waitForExist(1000);
    var Filmstripplaybtnexist = browser.isVisible(Filmstripplaybtn);
    var Videoplaying = splashelement.Videoplaying.selector;

    if (Filmstripplaybtnexist == true) {
      Filmstripplaybtn.click;
      splashelement.Videoplaying.waitForExist(1000);
      var Videoplayingexist = browser.isVisible(Videoplaying);

      if (Videoplayingexist == true) {

        console.log('Verifying that  video plays on clicking Filmstrip Play button : ' + Videoplayingexist);
        Videoplayingexist.should.equal(true);
      }
    }
  });

  it('PPE-118458 Mobile: Verify that FilmStrip Play button is displayed always for all the videos', function () {

    var Elementscroll = $('.more-from');
    Elementscroll.scroll(2000, 2000);
    var Filmstripplaybtn = splashelement.Filmstripplaybtn.selector;
    splashelement.Filmstripplaybtn.waitForExist(1600);
    var Filmstripplaybtnexist = browser.isVisible(Filmstripplaybtn);
    browser.pause(2000);
    console.log('Verifying that FilmStrip Play button is displayed always for all the videos in Mobile: ' + Filmstripplaybtnexist);
    if (Filmstripplaybtnexist == true) {
      console.log('Verifying that FilmStrip Play button is displayed always for all the videos in Mobile: ' + Filmstripplaybtnexist);

    }
  });

  it('PPE-118461 Mobile: Verify that video plays on clicking Filmstrip play button', function () {

    var Elementscroll = $('.more-from');
    Elementscroll.scroll(2000, 2000);
    var Filmstripplaybtn = splashelement.Filmstripplaybtn.selector;
    splashelement.Filmstripplaybtn.waitForExist(1000);
    var Filmstripplaybtnexist = browser.isVisible(Filmstripplaybtn);
    var Videoplaying = splashelement.Videoplaying.selector;

    if (Filmstripplaybtnexist == true) {
      Filmstripplaybtn.click;
      splashelement.Videoplaying.waitForExist(1000);
      var Videoplayingexist = browser.isVisible(Videoplaying);
      if (Videoplayingexist == true) {

        console.log('Verifying that  video plays on clicking Filmstrip Play button  in Mobile: ' + Videoplayingexist);
        Videoplayingexist.should.equal(true);
      }
    }


  });
});
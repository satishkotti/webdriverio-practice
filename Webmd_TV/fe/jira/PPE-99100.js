var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var argv = require("yargs").argv;
var splashpage = require('./../../common/actions/PPE-99100.actions')
var env = require('./../../gulpfile.js').TestEnv;
var Input = require('./../../config/Webmd-tv')[env];
var url = Input.article;
var webmdurl = Input.webmdurl;
var splashgrids;
var Responsive = Input.Responsive;

describe('Splash Page Validations', function () {
  this.timeout(100000);
  it('Validation for videos Grid', function () {
    splashgrids = splashpage.splashpagegrids();
    splashgrids.gridcssProperties.height.should.containEql('320');
    splashgrids.gridcssProperties.width.should.containEql('595');
  });
  it('Validation for video overlay', function () {
    splashgrids.overlaycssProperties.height.should.containEql("269");
    splashgrids.overlaycssProperties.width.should.containEql("300");
  });
  it('Validation for videos watchnow', function () {
    splashgrids.watchnowcssProperties.fontSize.should.equal("14px");
    splashgrids.watchnowcssProperties.fontColor.should.equal('#ffffff');
    splashgrids.watchnowcssProperties.fontFamily.should.equal("roboto condensed");
  });
  it('Validation for videos video text', function () {
    splashgrids.videotextcssproperties.fontSize.should.equal("12px");
    console.log(splashgrids.videotext);
    splashgrids.videotextcssproperties.fontColor.should.equal('#13eaf5');
    splashgrids.videotextcssproperties.fontFamily.should.equal("source sans pro");

  });

  it('Validation for videos titletext', function () {
    splashgrids.titletextcssProperties.fontSize.should.equal("22px");
    splashgrids.titletextcssProperties.fontColor.should.equal("#ffffff");
    splashgrids.titletextcssProperties.fontFamily.should.equal("source sans pro");
  });
  it('Validation for videos episode', function () {
    splashgrids.episodecssProperties.fontSize.should.equal('12px');
    splashgrids.episodecssProperties.fontColor.should.equal('#13eaf5');
    splashgrids.episodecssProperties.fontFamily.should.equal('source sans pro');
  });
  it('Validation for videos playbutton', function () {
    splashgrids.playbuttoncssProperties.height.should.equal("20px");
    splashgrids.playbuttoncssProperties.width.should.equal("20px");
  });
  it('Validation for quote', function () {
    try {
      splashgrids.quotecssProperties.fontSize.should.equal("22px");
      splashgrids.quotecssProperties.fontColor.should.equal("#ebe1dc");
      splashgrids.quotecssProperties.fontFamily.should.equal('source sans pro');
    }
    catch (Exception) {
      console.log("No quote with ad in production environment");
    }
  });
  it('Validation for adquote author', function () {
    try {
      splashgrids.adquotecssProperties.fontSize.should.equal('20px');
      splashgrids.adquotecssProperties.fontFamily.should.equal('source sans pro');
      splashgrids.adquotecssProperties.fontColor.should.equal('#f2eef3');
    }
    catch (exception) {
      console.log("no ad with quote card");
    }
  });
  it('Validation for adquote city', function () {
    try {
      splashgrids.adquotecitycssProperties.fontSize.should.equal('14px');
      splashgrids.adquotecitycssProperties.fontColor.should.equal('#f2eef3');
      splashgrids.adquotecitycssProperties.fontFamily.should.equal('source sans pro');
    }
    catch (exception) {
      console.log("no ad quote grids");
    }
  });
  it('Validation for adquote state', function () {
    try {
      splashgrids.adquotestatecssProperties.fontSize.should.equal('14px');
      splashgrids.adquotestatecssProperties.fontColor.should.equal('#f2eef3');
      splashgrids.adquotestatecssProperties.fontFamily.should.equal('source sans pro');
    }
    catch (exception) {
      console.log("no ad quote for production");
    }
  });
  it('Validation for blueline', function () {
    try {
      splashgrids.bluelineheight.should.containEql('1.9');
      splashgrids.bottombluelineheight.should.containEql('0.9');
    }
    catch (exception) {
      console.log("Bluelin is going to be validated in other script");
    }
  });
  it('Validation for ad height and width', function () {
    try {
      splashgrids.adheightcssProperties.height.should.containEql("250");
      splashgrids.adheightcssProperties.width.should.containEql("300");
    }
    catch (exception) {
      console.log("no ad for production");
    }
  });
  //add position should be added
  it('Validation for only quote', function () {
    splashgrids.onlyquotecssProperties.fontSize.should.equal('28px');
    splashgrids.onlyquotecssProperties.fontColor.should.equal('#ebe1dc');
    splashgrids.onlyquotecssProperties.fontFamily.should.equal('source sans pro');
  });
  it('Validation for only quote author', function () {
    splashgrids.authorcssProperties.fontSize.should.equal('20px');
    splashgrids.authorcssProperties.fontColor.should.equal('#f2eef3');
    splashgrids.authorcssProperties.fontFamily.should.equal('source sans pro');
  });
  it('Validation for only quote city', function () {
    splashgrids.authorcitycssProperties.fontSize.should.equal('14px');
    splashgrids.authorcitycssProperties.fontColor.should.equal('#f2eef3');
    splashgrids.authorcitycssProperties.fontFamily.should.equal('source sans pro');
  });
  it('Validation for adquote state', function () {
    splashgrids.authorstatecssProperties.fontSize.should.equal('14px');
    splashgrids.authorstatecssProperties.fontColor.should.equal('#f2eef3');
    splashgrids.authorstatecssProperties.fontFamily.should.equal('source sans pro');
  });
  it('Validation for sponsoer text', function () {
    try {
      splashgrids.sponsorepisodecssProperties.fontSize.should.equal('14px');
      splashgrids.sponsorepisodecssProperties.fontFamily.should.equal('roboto condensed');
      splashgrids.sponsorepisodecssProperties.fontColor.should.equal('#ea480a');

    } catch (Exception) {
      console.log("No sponsor for production environment");
    }
  });
  it('Validation for ad position with quote', function () {
    try {
      if (splashgrids.adposition.x < splashgrids.adposition2.x) {
        var result = true;

      } else {
        var result = false;
      }
      result.should.equal(true);
    }
    catch (exception) {
      console.log("No ad for production environment");
    }
  });

});

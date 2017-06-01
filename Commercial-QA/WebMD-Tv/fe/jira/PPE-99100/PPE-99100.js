var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var splashpage = require('./../../../common/actions/PPE-99100.actions')
var rootPath = path.normalize(__dirname)
console.log(__dirname);
var Input = require('./../../../config/Webmd-tv')[argv.env];
var url = Input.article;
var webmdurl = Input.webmdurl;
var splashgrids;
var Responsive = Input.Responsive;

describe('Splash Page Validations', function () {
  this.timeout(100000);
  /*for (var i in Responsive) {
    console.log(Responsive[i]);
    browser.setViewportSize(Responsive[i])*/
  it('Validation for videos Grid', function () {

    splashgrids = splashpage.splashpagegrids();
    splashgrids.gridcssProperties.height.should.containEql('320');
    splashgrids.gridcssProperties.width.should.equal('595px');
  });
  it('Validation for video overlay', function () {
    splashgrids.overlaycssProperties.height.should.containEql("268");
    splashgrids.overlaycssProperties.width.should.containEql("300");
  });
  it('Validation for videos watchnow', function () {
    splashgrids.watchnowcssProperties.fontSize.should.equal("14px");
    splashgrids.watchnowcssProperties.fontColor.should.equal('#ffffff');
    splashgrids.watchnowcssProperties.fontFamily.should.equal("roboto condensed");
  });
  it('Validation for videos titletext', function () {
    splashgrids.titletextcssProperties.fontSize.should.equal("22px");
    splashgrids.titletextcssProperties.fontColor.should.equal("#ffffff");
    splashgrids.titletextcssProperties.fontFamily.should.equal("source sans pro");
  });
  it('Validation for videos episode', function () {
    splashgrids.episodecssProperties.fontSize.should.equal('12px');
    splashgrids.episodecssProperties.fontColor.should.equal('#13e9f4');
    splashgrids.episodecssProperties.fontFamily.should.equal('source sans pro');
  });
  it('Validation for videos playbutton', function () {
    splashgrids.playbuttoncssProperties.height.should.equal("20px");
    splashgrids.playbuttoncssProperties.width.should.equal("20px");
  });
  it('Validation for quote', function () {
    splashgrids.quotecssProperties.fontSize.should.equal("22px");
    splashgrids.quotecssProperties.fontColor.should.equal("#ebe1dc");
    splashgrids.quotecssProperties.fontFamily.should.equal('source sans pro');
  });
  it('Validation for adquote author', function () {
    splashgrids.adquotecssProperties.fontSize.should.equal('20px');
    splashgrids.adquotecssProperties.fontFamily.should.equal('source sans pro');
    splashgrids.adquotecssProperties.fontColor.should.equal('#f2eef3');
  });
  it('Validation for adquote city', function () {
    splashgrids.adquotecitycssProperties.fontSize.should.equal('14px');
    splashgrids.adquotecitycssProperties.fontColor.should.equal('#f2eef3');
    splashgrids.adquotecitycssProperties.fontFamily.should.equal('source sans pro');
  });
  it('Validation for adquote state', function () {
    splashgrids.adquotestatecssProperties.fontSize.should.equal('14px');
    splashgrids.adquotestatecssProperties.fontColor.should.equal('#f2eef3');
    splashgrids.adquotestatecssProperties.fontFamily.should.equal('source sans pro');
  });
  it('Validation for blueline', function () {
    splashgrids.bluelineheight.should.containEql('1.9');
    splashgrids.bottombluelineheight.should.containEql('0.9');
  });
  it('Validation for ad height and width', function () {
    splashgrids.adheightcssProperties.height.should.containEql("250");
    splashgrids.adheightcssProperties.width.should.containEql("300");
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
    splashgrids.sponsorepisodecssProperties.fontSize.should.equal('14px');
    splashgrids.sponsorepisodecssProperties.fontFamily.should.equal('roboto condensed');
    splashgrids.sponsorepisodecssProperties.fontColor.should.equal('#ea480a');
    console.log(splashgrids.sponsorepisodecssProperties.fontFamily);
  });
  it('Validation for ad position with quote', function () {
    if (splashgrids.adposition.x < splashgrids.adposition2.x) {
      var result = true;

    } else {
      var result = false;
    }
    result.should.equal(true);
  });

});

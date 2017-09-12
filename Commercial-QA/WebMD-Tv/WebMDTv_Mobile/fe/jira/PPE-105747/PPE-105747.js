var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var adlayout = require('./../../../common/actions/PPE-105747.actions');
var rootPath = path.normalize(__dirname)
var Input = require('./../../../config/Webmd-tv')[argv.env];
var url = Input.adlayout;
var url2 = Input.layout;
var fullvideo;


describe('Add WebMD TV Design Option to Video Player Info Bar with Video + Ad Layout', function () {
  this.timeout(100000);
  it('Validate without ad we are able to get full video', function () {
    browser.url(url2);
    browser.pause(2000);
    fullvideo = adlayout.fullvideo();
    fullvideo.videoheight.value.should.containEql("202");
    fullvideo.videowidth.value.should.equal("360px");
  });

  it('Validate full video with ad we are able to get small video about', function () {
    fullvideo.aboutfontsize.should.equal("12px");
    fullvideo.aboutfontfamily.should.equal("roboto condensed");
    fullvideo.aboutcolor.should.equal("#ffffff");
  });
  it('Validate full video with ad we are able to get small video transcript', function () {
    fullvideo.transcriptcolor.should.equal("#ffffff");
    fullvideo.transcriptfontfamily.should.equal("roboto condensed");
    fullvideo.transcriptwidthfont.should.equal("12px");
  });
  it('Validate full video with ad we are able to get small video twitter', function () {
    fullvideo.twitterwidth.should.containEql("33");//actual=#00abe3//expected as per zeplin mocks=#04C1FF
    fullvideo.twitterheight.should.containEql("34");
  });
  it('Validate full video with ad we are able to get small video facebook', function () {
    fullvideo.facebookwidth.should.containEql("33");//actual=#00abe3//expected as per zeplin mocks=#04C1FF
    fullvideo.facebookheight.should.containEql("35");
  });
  it('Validate with ad we are able to get small video titletext', function () {
    fullvideo.titlefont.should.equal("14px");
    fullvideo.titlefontfamily.should.equal("source sans pro");//--need to confirm on this
    fullvideo.titlecolor.should.equal("#ffffff");
    fullvideo.titlewidth.should.containEql("340");//actual=#00abe3//expected as per zeplin mocks=#04C1FF
    fullvideo.titleheight.should.containEql("32");

  });
});

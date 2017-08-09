var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var adlayout = require('./../../common/actions/PPE-105747.actions');
var rootPath = path.normalize(__dirname)
var env = require('./../../gulpfile.js').TestEnv;
var Input = require('./../../config/Webmd-tv')[env];
var url = Input.adlayout;
var url2 = Input.layout;
var adposition;
var fullvideo;


describe('Add WebMD TV Design Option to Video Player Info Bar with Video + Ad Layout', function () {
  this.timeout(100000);
  it('Validate ad is dsiplayed right side to the video with height and width', function () {
    adposition = adlayout.adposition();
    console.log(adposition);
    expect(adposition.adpositioned.x > adposition.videoposition.x).to.be.true;
    if (adposition.adheight == "250.4px") {
      adposition.adwidth.should.equal("300px");
      adposition.adheight.should.containEql("250");
    } else {
      adposition.adwidth.should.equal("300px");
      adposition.adheight.should.equal("600px");
    }
  });
  it('Validate with ad we are able to get small video', function () {
    adposition.advideocssProperties.width.should.containEql("979");
    adposition.advideocssProperties.height.should.containEql("550");
  });
  it('Validate with ad we are able to get small video about', function () {
    adposition.abouttextcssProperties.fontSize.should.equal("12px");
    adposition.abouttextcssProperties.fontFamily.should.equal("roboto condensed");
    adposition.abouttextcssProperties.fontColor.should.equal("#ffffff");
  });
  it('Validate with ad we are able to get small video transcript', function () {
    adposition.transcriptcssProperties.fontColor.should.equal("#ffffff");
    adposition.transcriptcssProperties.fontFamily.should.equal("roboto condensed");
    adposition.transcriptcssProperties.fontSize.should.equal("12px");
  });
  it('Validate with ad we are able to get small video twitter', function () {
    adposition.twittercssProperties.fontColor.should.equal("#04c1ff");
    adposition.twittercssProperties.fontFamily.should.equal("roboto condensed");
    adposition.twittercssProperties.fontSize.should.equal("10px");
  });
  it('Validate with ad we are able to get small video facebook', function () {
    adposition.facebookcssProperties.fontFamily.should.equal("roboto condensed");
    adposition.facebookcssProperties.fontColor.should.equal("#00b4ff");
    adposition.facebookcssProperties.fontSize.should.equal("10px");
  });
  it('Validate with ad we are able to get small video titletext', function () {
    adposition.titlecssProperties.fontSize.should.equal("18px");
    //adposition.titlefontfamily.should.equal();--need to confirm on this
    adposition.titlecssProperties.fontColor.should.equal("#ffffff");
  });

  it('Validate without ad we are able to get full video', function () {
    browser.url(url2);
    browser.pause(2000);
    fullvideo = adlayout.fullvideo();
    fullvideo.videocssProperties.height.should.containEql("697");
    fullvideo.videocssProperties.width.should.equal("1240px");
  });

  it('Validate full video with ad we are able to get small video about', function () {
    fullvideo.aboutcssProperties.fontSize.should.equal("12px");
    fullvideo.aboutcssProperties.fontFamily.should.equal("roboto condensed");
    fullvideo.aboutcssProperties.fontColor.should.equal("#ffffff");
  });
  it('Validate full video with ad we are able to get small video transcript', function () {
    fullvideo.transcriptcssProperties.fontColor.should.equal("#ffffff");
    fullvideo.transcriptcssProperties.fontFamily.should.equal("roboto condensed");
    fullvideo.transcriptcssProperties.fontSize.should.equal("12px");
  });
  it('Validate full video with ad we are able to get small video twitter', function () {
    fullvideo.twittercssProperties.fontColor.should.equal("#04c1ff");//actual=#00abe3//expected as per zeplin mocks=#04C1FF
    fullvideo.twittercssProperties.fontFamily.should.equal("roboto condensed");
    fullvideo.twittercssProperties.fontSize.should.equal("10px");
  });
  it('Validate full video with ad we are able to get small video facebook', function () {
    fullvideo.facebookcssProperties.fontFamily.should.equal("roboto condensed");
    fullvideo.facebookcssProperties.fontColor.should.equal("#00b4ff");//actual=#38FCA//expected as per zeplin mocks=#00B4FF
    fullvideo.facebookcssProperties.fontSize.should.equal("10px");
  });
  it('Validate with ad we are able to get small video titletext', function () {
    fullvideo.titlecssProperties.fontSize.should.equal("20px");
    fullvideo.titlecssProperties.fontFamily.should.equal("source sans pro");//--need to confirm on this
    fullvideo.titlecssProperties.fontColor.should.equal("#ffffff");
  });
});

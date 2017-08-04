var webdriverio = require('webdriverio');
var should = require('should');
var argv = require("yargs").argv;
var videoheader = require('./../../common/actions/PPE-99107.actions');
var Input = require('./../../config/Webmd-tv')[argv.env];
var url = Input.article;
var webmdurl = Input.webmdurl;
var largevideoheaders;
var smallvideoheaders;


describe('Add WebMD TV Design Option to Marquee Header', function () {
  this.timeout(100000);
  it('Validating large video size', function () {
    largevideoheaders = videoheader.largevideoheader();
    largevideoheaders.largevideoheight.should.equal("360px");
    largevideoheaders.largevideowidth.should.equal("640px");
  });
  it('Validating largevideo title font-size,color', function () {
    largevideoheaders.largevideotitlefontsize.should.equal("28px");
    largevideoheaders.largevideotitlecolor.should.equal("#ffffff");
  });
  it('Validating largevideo about,facebook,transcript,twitter font-size,font-size,font-size', function () {
    largevideoheaders.largevideoaboutwidthfont.should.equal("12px");
    largevideoheaders.largevideofacebookwidthfont.should.equal("12px");
    largevideoheaders.largevideotwitterwidthfont.should.equal("12px");
    largevideoheaders.largevideotranscriptwidthfont.should.equal("12px");
  });
  it('Validating largevideo play and pause', function () {
    largevideoheaders.pause.should.equal(true);
    largevideoheaders.play.should.equal(true);
  });
  it('Validating small video size after scrolling', function () {
    smallvideoheaders = videoheader.smallvideoheader();
    smallvideoheaders.smallvideoheight.should.equal("146px");
    smallvideoheaders.smallvideowidth.should.equal("260px");
  });
  it('Validating largevideo title font-size,color', function () {
    smallvideoheaders.smallvideotitlefontsize.should.equal("28px");
    smallvideoheaders.smallvideotitlecolor.should.equal("#ffffff");
  });
  it('Validating largevideo about,facebook,transcript,twitter font-size,font-size,font-size', function () {
    smallvideoheaders.smallvideoaboutwidthfont.should.equal("12px");
    smallvideoheaders.smallvideofacebookwidthfont.should.equal("12px");
    smallvideoheaders.smallvideotwitterwidthfont.should.equal("12px");
    smallvideoheaders.smallvideotranscriptwidthfont.should.equal("12px");
  });
  it('Validating smallvideo play and pause', function () {
    smallvideoheaders.result.should.equal(true);
  });
  it('Validating Nowplaying color,font-size,font-family', function () {
    smallvideoheaders.nowplayingfontsize.should.equal('12px');
    smallvideoheaders.nowplayingfontcolor.should.equal("#00d5e0");
    smallvideoheaders.nowplayingfontfamily.should.equal("source sans pro");
  });
  it("Click on WebMD logo should navigate to WbMD Homepage", function () {
    //console.log(smallvideoheaders.webmdurl);
    smallvideoheaders.webmdurl.should.equal(webmdurl);

  });
});

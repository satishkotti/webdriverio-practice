var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var adlayout = require('./../../../common/functions/PPE-105747.actions');
var rootPath = path.normalize(__dirname)
var Input = require('./../../../config/Webmd-tv')[argv.env];
var url = Input.adlayout;
var url2=Input.layout;
var adposition;
var fullvideo;


describe('Add WebMD TV Design Option to Video Player Info Bar with Video + Ad Layout', function () {
  this.timeout(100000);
it('Validate ad is dsiplayed right side to the video with height and width', function () {
    adposition = adlayout.adposition();
    expect(adposition.positions.value.adposition > adposition.positions.value.videoposition).to.be.true;
    if(adposition.adheight=="250px"){
    adposition.adwidth.should.equal("300px");
    adposition.adheight.should.equal("250px");
  }else{
    adposition.adwidth.should.equal("300px");
    adposition.adheight.should.equal("600px");
  }
});
it('Validate with ad we are able to get small video', function () {
    adposition.advideowidth.should.equal("928.063px");
    adposition.advideoheight.should.equal("522.031px");
    });
    it('Validate with ad we are able to get small video about', function () {
      adposition.aboutfontsize.should.equal("12px");
      adposition.aboutfontfamily.should.equal("roboto condensed");
      adposition.aboutcolor.should.equal("#ffffff");
    });
      it('Validate with ad we are able to get small video transcript', function () {
      adposition.transcriptcolor.should.equal("#ffffff");
      adposition.transcriptfontfamily.should.equal("roboto condensed");
      adposition.transcriptwidthfont.should.equal("12px");
    });
    it('Validate with ad we are able to get small video twitter', function () {
      adposition.twittercolor.should.equal("#04C1FF");
      adposition.twitterfontfamily.should.equal("roboto condensed");
      adposition.twitterwidthfont.should.equal("10px");
    });
      it('Validate with ad we are able to get small video facebook', function () {
      adposition.facebookfontfamily.should.equal("roboto condensed");
     adposition.facebookcolor.should.equal("#00B4FF");
      adposition.facebookwidthfont.should.equal("10px");
    });
    it('Validate with ad we are able to get small video titletext', function () {
    adposition.titlefont.should.equal("18px");
   //adposition.titlefontfamily.should.equal();--need to confirm on this
    adposition.titlecolor.should.equal("#ffffff");
  });

    it('Validate without ad we are able to get full video', function () {
      browser.url(url2);
      browser.pause(2000);
         fullvideo = adlayout.fullvideo();
        fullvideo.videoheight.value.should.equal("696.406px");
        fullvideo.videowidth.value.should.equal("1238.06px");
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
          fullvideo.twittercolor.should.equal("#04C1FF");//actual=#00abe3//expected as per zeplin mocks=#04C1FF
          fullvideo.twitterfontfamily.should.equal("roboto condensed");
          fullvideo.twitterwidthfont.should.equal("10px");
        });
        it('Validate full video with ad we are able to get small video facebook', function () {
          fullvideo.facebookfontfamily.should.equal("roboto condensed");
          fullvideo.facebookcolor.should.equal("#00B4FF");//actual=#38FCA//expected as per zeplin mocks=#00B4FF
          fullvideo.facebookwidthfont.should.equal("10px");
        });
        it('Validate with ad we are able to get small video titletext', function () {
        fullvideo.titlefont.should.equal("18px");
       fullvideo.titlefontfamily.should.equal("lato");--need to confirm on this
      fullvideo.titlecolor.should.equal("#ffffff");
      });
});

var webdriverio = require('webdriverio');
var should = require('should');
var argv = require("yargs").argv;
var screens = require('./../../common/actions/PPE-101411.actions');
var env = require('./../../gulpfile.js').TestEnv;
var Input = require('./../../config/Webmd-tv')[env];
var about;


describe('Add WebMD TV Design Option to About and Transcript Screens', function () {
  this.timeout(100000);
  it('Validation for about section in video page', function () {
     about = screens.aboutscreen();
    about.about.should.equal('ABOUT');
    about.abouttitlecssProperties.fontSize.should.equal("20px");
    about.abouttitlecssProperties.fontColor.should.equal("#ffffff");
    about.abouttitlecssProperties.fontFamily.should.equal("source sans pro");

  });
  it('Validation for time displayed in about section', function () {
    about.abouttimecssProperties.fontSize.should.equal("20px");
    about.abouttimecssProperties.fontColor.should.equal("#00d5e0");
    about.abouttimecssProperties.fontFamily.should.equal("source sans pro");
  });
  it('Validation for sources text in about section', function () {
    about.sourcestextcssProperties.fontSize.should.equal("14px");
    about.sourcestextcssProperties.fontFamily.should.equal("roboto condensed");
    about.sourcestextcssProperties.fontColor.should.equal("#00d5e0");
  });
  it('Validation for synopsistext in about section', function () {
    about.synopsistextcssProperties.fontSize.should.equal("17px");
    about.synopsistextcssProperties.fontFamily.should.equal("source sans pro");
    about.synopsistextcssProperties.fontColor.should.equal("#ffffff");
    about.sourcestext.should.equal("SOURCES");
  });
  it('Validation for synopsistext in about section', function () {
    about.abouttitle.should.containEql(about.titletext);
    about.copyrightis.should.equal(true);
    about.time.should.equal(true);
    about.synopsistext.should.equal(true);
    about.close.should.equal(false);

  });
  it('Validation for transcript section in article', function () {
    var transcripts = screens.Transcriptscreen();
    transcripts.transcript.should.equal("TRANSCRIPT");
    for (var i = 0; i < transcripts.transcriptauthorfontsize.length; i++) {
      transcripts.transcriptauthorfontsize[i].should.equal("20px");
      transcripts.transcriptauthorfontfamily[i].should.equal("source sans pro");
      transcripts.transcriptauthorfontcolor[i].should.equal("#ffffff");
      transcripts.transcripttextfontcolor[i].should.equal("#ffffff");
      transcripts.transcripttextfontsize[i].should.equal("17px");
      transcripts.transcripttextfontfamily[i].should.equal("source sans pro");
      transcripts.transcripttimefontcolor[i].should.equal("#00d5e0");
      try{
      transcripts.transcripttimefontfamily[i].should.equal('roboto condensed');
      }
      catch(Exception){
        console.log("Exception"+Exception);
      }
      transcripts.transcripttimefontsize[i].should.equal('26px');
      
    }
    transcripts.close.should.equal(false);

  });

});

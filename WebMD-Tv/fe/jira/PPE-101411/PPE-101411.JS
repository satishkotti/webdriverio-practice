var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var screens = require('./../../../common/functions/PPE-101411.actions');
var rootPath = path.normalize(__dirname)
console.log(__dirname);
var Input = require('./../../../config/Webmd-tv')[argv.env];
var about;


describe('Add WebMD TV Design Option to About and Transcript Screens', function () {
  this.timeout(100000);
it('Validation for about section in video page', function () {
    about=screens.aboutscreen();
    about.about.should.equal('ABOUT');
    about.abouttitlefont.should.equal("20px");
    about.abouttitlefontcolor.should.equal("#ffffff");
    about.abouttitlefontfamily.should.equal("source sans pro");
  });
    it('Validation for time displayed in about section', function () {
    about.abouttimefont.should.equal("20px");
    about.abouttimefontcolor.should.equal("#00d5e0");
    about.abouttimefontfamily.should.equal("source sans pro");
  });
  it('Validation for sources text in about section', function () {
    about.sourcestextfont.should.equal("14px");
    about.sourcestextfontfamily.should.equal("roboto condensed");
    about.sourcestextfontcolor.should.equal("#00d5e0");
  });
  it('Validation for synopsistext in about section', function () {
    console.log("synopsistexts"+about.synopsistexts);
    about.synopsistextfont.should.equal("17px");
    about.synopsistextfontfamily.should.equal("source sans pro");
    about.synopsistextfontcolor.should.equal("#ffffff");
    about.sourcestext.should.equal("SOURCES");
  });
  it('Validation for synopsistext in about section', function () {
    about.abouttitle.should.containEql(about.titletext);
    about.copyrightis.should.equal(true);
    about.time.should.equal(true);
    about.synopsistext.should.equal(true);
    about.close.should.equal(false);

    });
    it('Validation for transcript section in article',function(){
      var transcripts=screens.Transcriptscreen();
      transcripts.transcript.should.equal("TRANSCRIPT");
      for (var i = 0; i <transcripts.transcriptauthorfontsize.length; i++) {
      transcripts.transcriptauthorfontsize[i].should.equal("20px");
      transcripts.transcriptauthorfontfamily[i].should.equal("source sans pro");
      transcripts.transcriptauthorfontcolor[i].should.equal("#ffffff");
      transcripts.transcripttextfontcolor[i].should.equal("#ffffff");
      transcripts.transcripttextfontsize[i].should.equal("17px");
      transcripts.transcripttextfontfamily[i].should.equal("source sans pro");
      transcripts.transcripttimefontcolor[i].should.equal("#00d5e0");
      transcripts.transcripttimefontfamily[i].should.equal('roboto condensed')
      transcripts.transcripttimefontsize[i].should.equal('26px');
    }
    transcripts.close.should.equal(false);

    });

});

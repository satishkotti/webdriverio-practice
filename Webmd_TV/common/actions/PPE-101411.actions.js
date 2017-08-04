var webdriverio = require('webdriverio');
var should = require('should');
//var webmdtvpage = require('./../elements/webmdtvpagepage');
var webmdtvpage = require('./../elements/webmdtvpage');
var argv = require("yargs").argv;
//var input = require('./../../config/Webmd-tv')[argv.env];
var env = require('./../../gulpfile.js').TestEnv;
var input = require('./../../config/Webmd-tv')[env];
var url = input.environment;
var functions = require('./../functions/functions');
var transcripttimefontsize = [];
var transcripttimefontfamily = [];
var transcripttimefontcolor = [];


module.exports = {
  aboutscreen: function () {
    var copyright = {};
    browser.url(url);
    browser.pause(2000);
if (browser.isExisting('#webmdHoverClose')) {
        browser.click('#webmdHoverClose');

    }
    browser.pause(2000);
    browser.scroll(0, 200);
    browser.pause(2000);
    copyright.titletext = functions.get_Text(webmdtvpage.titletext);
	console.log("text pointed");

		webmdtvpage.about.click();
	//browser.click("//div[@class='cmd-section']/div[@class='tab-about btn btn-default']//span");
    browser.pause(2000);
    browser.scroll(0, 290);
    copyright.about = functions.get_Text(webmdtvpage.aboutheader);
    copyright.abouttitle = functions.get_Text(webmdtvpage.abouttitletext);
    copyright.abouttitlecssProperties = functions.cssProperties(webmdtvpage.abouttitletext);

    copyright.abouttime = functions.get_Text(webmdtvpage.abouttime);
    copyright.abouttimecssProperties = functions.cssProperties(webmdtvpage.abouttime);

    copyright.sourcestext = functions.get_Text(webmdtvpage.sourcestext);
    copyright.sourcestextcssProperties = functions.cssProperties(webmdtvpage.sourcestext);

    copyright.copyrightis = functions.is_Existing(webmdtvpage.copyright);
    copyright.time = functions.is_Existing(webmdtvpage.abouttime);
    copyright.synopsistext = functions.is_Existing(webmdtvpage.aboutsynopsistext);
    copyright.synopsistexts = functions.get_Text(webmdtvpage.aboutsynopsistext);
    copyright.synopsistextcssProperties = functions.cssProperties(webmdtvpage.aboutsynopsistext);
    webmdtvpage.aboutclose.click();
    copyright.close = functions.is_Existing(webmdtvpage.aboutclose);


    return copyright;
  },

  Transcriptscreen: function () {

    var transcriptauthorfontsize = [];
    var transcriptauthorfontfamily = [];
    var transcriptauthorfontcolor = [];
    var transcripttextfontsize = [];
    var transcripttextfontfamily = [];
    var transcripttextfontcolor = [];
    //browser.scroll(0,590);
    webmdtvpage.transcript.click();
    browser.pause(2000);
    browser.scroll(0, 590);
    var transcript = functions.get_Text(webmdtvpage.transcriptheader);
    var transcriptfontsize = functions.get_cssValue(webmdtvpage.transcriptheader, 'font-size');
    var transcriptfontcolor = functions.get_cssValue(webmdtvpage.transcriptheader, 'color');
    var transcriptfontfamily = functions.get_cssValue(webmdtvpage.transcriptheader, 'font-family');
    var j = browser.elements("//div[@class='transcript-video premium open']//div[@class='transcript-container clearfix ttml']//div[@class='trans-row clearfix']");
    console.log(j.value.length);

    for (var i = 2; i <= j.value.length; i++) {

      transcriptauthorfontsize.push(functions.get_cssValue(webmdtvpage.transcriptauthorN(i), 'font-size'));
      transcriptauthorfontfamily.push(functions.get_cssValue(webmdtvpage.transcriptauthorN(i), 'font-family'));
      transcriptauthorfontcolor.push(functions.get_cssValue(webmdtvpage.transcriptauthorN(i), 'color'));

      transcripttextfontsize.push(functions.get_cssValue(webmdtvpage.transcripttextN(i), 'font-size'));
      transcripttextfontfamily.push(functions.get_cssValue(webmdtvpage.transcripttextN(i), 'font-family'));
      transcripttextfontcolor.push(functions.get_cssValue(webmdtvpage.transcripttextN(i), 'color'));

      transcripttimefontsize.push(functions.get_cssValue(webmdtvpage.transcripttimeN(i), 'font-size'));
      transcripttimefontfamily.push(functions.get_cssValue(webmdtvpage.transcripttimeN(i), 'font-family'));
      transcripttimefontcolor.push(functions.get_cssValue(webmdtvpage.transcripttimeN(i), 'color'));


    }
    webmdtvpage.transcriptclose.click();
    var close = functions.is_Existing(webmdtvpage.transcriptclose);
    var transcriptscreen = {
      transcriptauthorfontsize: transcriptauthorfontsize,
      transcriptauthorfontfamily: transcriptauthorfontfamily,
      transcriptauthorfontcolor: transcriptauthorfontcolor,
      transcript: transcript,
      transcripttextfontsize: transcripttextfontsize,
      transcripttextfontfamily: transcripttextfontfamily,
      transcripttextfontcolor: transcripttextfontcolor,
      transcriptfontsize: transcriptfontsize,
      transcriptfontcolor: transcriptfontcolor,
      transcriptfontfamily: transcriptfontfamily,
      transcripttimefontsize: transcripttimefontsize,
      transcripttimefontfamily: transcripttimefontfamily,
      transcripttimefontcolor: transcripttimefontcolor,
      close: close

    }


    return transcriptscreen;
  }
}

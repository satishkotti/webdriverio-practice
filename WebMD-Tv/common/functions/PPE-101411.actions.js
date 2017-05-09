var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var migraine = require('./../elements/Migrainepage');
var marqueeheader = require('./../elements/marqueeheader');
var argv = require("yargs").argv;
var input = require('./../../config/Webmd-tv')[argv.env];
var url=input.environment;
var functions=require('./../actions/functions');
var transcripttimefontsize=[];
var transcripttimefontfamily=[];
var transcripttimefontcolor=[];

//var transcriptscreen={};
module.exports = {
  aboutscreen: function () {
    var copyright={};
    //marqueeheader.open();
    browser.url(url);
    browser.pause(2000);
    if (browser.isExisting('#webmdHoverClose')) {
      //browser.pause(1000);
      browser.click('#webmdHoverClose');
    }
    browser.pause(2000);
    browser.scroll(0,290);
    browser.pause(2000);
    copyright.titletext=functions.get_Text(marqueeheader.titletext);
    marqueeheader.about.click();
browser.pause(2000);
browser.scroll(0,190);
copyright.about=functions.get_Text(marqueeheader.aboutheader);
copyright.abouttitle=functions.get_Text(marqueeheader.abouttitletext);
copyright.abouttitlefont=functions.get_cssValue(marqueeheader.abouttitletext,'font-size');
copyright.abouttitlefontcolor=functions.get_cssValue(marqueeheader.abouttitletext,'color');
copyright.abouttitlefontfamily=functions.get_cssValue(marqueeheader.abouttitletext,'font-family');
copyright.abouttime=functions.get_Text(marqueeheader.abouttime);
copyright.abouttimefont=functions.get_cssValue(marqueeheader.abouttime,'font-size');
copyright.abouttimefontcolor=functions.get_cssValue(marqueeheader.abouttime,'color');
copyright.abouttimefontfamily=functions.get_cssValue(marqueeheader.abouttime,'font-family');
copyright.sourcestext=functions.get_Text(marqueeheader.sourcestext);
copyright.sourcestextfont=functions.get_cssValue(marqueeheader.sourcestext,'font-size');
copyright.sourcestextfontfamily=functions.get_cssValue(marqueeheader.sourcestext,'font-family');
copyright.sourcestextfontcolor=functions.get_cssValue(marqueeheader.sourcestext,'color');
copyright.copyrightis=functions.is_Existing(marqueeheader.copyright);
copyright.time=functions.is_Existing(marqueeheader.abouttime);
copyright.synopsistext=functions.is_Existing(marqueeheader.aboutsynopsistext);
copyright.synopsistexts=functions.get_Text(marqueeheader.aboutsynopsistext);
copyright.synopsistextfont=functions.get_cssValue(marqueeheader.aboutsynopsistext,'font-size');
copyright.synopsistextfontfamily=functions.get_cssValue(marqueeheader.aboutsynopsistext,'font-family');
copyright.synopsistextfontcolor=functions.get_cssValue(marqueeheader.aboutsynopsistext,'color');
marqueeheader.aboutclose.click();
copyright.close=functions.is_Existing(marqueeheader.aboutclose);


  return copyright;
},

Transcriptscreen: function () {

  var transcriptauthorfontsize=[];
  var transcriptauthorfontfamily=[];
  var transcriptauthorfontcolor=[];
  var transcripttextfontsize=[];
  var transcripttextfontfamily=[];
  var transcripttextfontcolor=[];
  //browser.scroll(0,590);
marqueeheader.transcript.click();
browser.pause(2000);
browser.scroll(0,590);
var transcript=functions.get_Text(marqueeheader.transcriptheader);
var transcriptfontsize=functions.get_cssValue(marqueeheader.transcriptheader,'font-size');
var transcriptfontcolor=functions.get_cssValue(marqueeheader.transcriptheader,'color');
var transcriptfontfamily=functions.get_cssValue(marqueeheader.transcriptheader,'font-family');
var j = browser.elements("//div[@class='transcript-video premium open']//div[@class='transcript-container clearfix ttml']//div[@class='trans-row clearfix']");
console.log(j.value.length);

for (var i = 2; i <= j.value.length; i++) {

  transcriptauthorfontsize.push(functions.get_cssValue(marqueeheader.transcriptauthorN(i),'font-size'));
  transcriptauthorfontfamily.push(functions.get_cssValue(marqueeheader.transcriptauthorN(i),'font-family'));
  transcriptauthorfontcolor.push(functions.get_cssValue(marqueeheader.transcriptauthorN(i),'color'));

  transcripttextfontsize.push(functions.get_cssValue(marqueeheader.transcripttextN(i),'font-size'));
  transcripttextfontfamily.push(functions.get_cssValue(marqueeheader.transcripttextN(i),'font-family'));
  transcripttextfontcolor.push(functions.get_cssValue(marqueeheader.transcripttextN(i),'color'));

  transcripttimefontsize.push(functions.get_cssValue(marqueeheader.transcripttimeN(i),'font-size'));
  transcripttimefontfamily.push(functions.get_cssValue(marqueeheader.transcripttimeN(i),'font-family'));
  transcripttimefontcolor.push(functions.get_cssValue(marqueeheader.transcripttimeN(i),'color'));


}
marqueeheader.transcriptclose.click();
var close=functions.is_Existing(marqueeheader.transcriptclose);
var transcriptscreen={
  transcriptauthorfontsize:transcriptauthorfontsize,
  transcriptauthorfontfamily:transcriptauthorfontfamily,
  transcriptauthorfontcolor:transcriptauthorfontcolor,
  transcript:transcript,
  transcripttextfontsize:transcripttextfontsize,
  transcripttextfontfamily:transcripttextfontfamily,
  transcripttextfontcolor:transcripttextfontcolor,
  transcriptfontsize:transcriptfontsize,
  transcriptfontcolor:transcriptfontcolor,
  transcriptfontfamily:transcriptfontfamily,
  transcripttimefontsize:transcripttimefontsize,
  transcripttimefontfamily:transcripttimefontfamily,
  transcripttimefontcolor:transcripttimefontcolor,
  close:close

}


  return transcriptscreen;
}
}

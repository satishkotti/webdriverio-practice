var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var splashpage = require('./../elements/splashpage');
var functions=require('./../actions/functions');
var input = require('./../../config/Webmd-tv')[argv.env];
var url = input.splash;



module.exports = {
  splashpagegrids: function () {
    //browser.url(url);
    splashpage.open();
    browser.pause(2000);
    if (browser.isExisting('#webmdHoverClose')) {
        browser.click('#webmdHoverClose');
    }
      browser.pause(2000);
var element=browser.elements("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div");
//var element=splashpage.gridelements.elements();

console.log(element.value.length);
for(var i=1;i<=element.value.length;i++){
//var sasnks="//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//div[@class='overlay']//div[@class='button']//span[@class='txt']"
//  if(browser.isExisting("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//div[@class='overlay']//div[@class='button']//span[@class='txt']")){
  if(splashpage.videogridn(i).isExisting()){
    //var text=browser.getText("(//div[@id='multimedia-grid']//div[@class='item-duo-wrapper'])//div["+i+"]//div[@class='overlay']//p[@class='title']");
    var text=splashpage.text(i).getText();
    //console.log("page object card"+i,text);
    //var grid1height=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div["+i+"]",'height');
    //console.log("height"+i,grid1height);//325
    var grid1height=functions.get_cssValue(splashpage.grid1(i),'height');
    console.log("page object width"+i,grid1height);//325
    //var grid1width=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div["+i+"]",'width');
    var grid1width=functions.get_cssValue(splashpage.grid1(i),'width');
    console.log("page object width"+i,grid1width);//595
    //var overlayheight=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div["+i+"]//div[@class='overlay']",'height');
    var overlayheight=functions.get_cssValue(splashpage.overlay(i),'height');
    console.log("overlayheight"+overlayheight);
    //console.log("overlay height"+JSON.stringify(overlayheight));//273
    //var overlaywidth=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div["+i+"]//div[@class='overlay']",'width');
    //console.log("overlay width"+JSON.stringify(overlaywidth));//300.469
    var overlaywidth=functions.get_cssValue(splashpage.overlay(i),'width');
    console.log("overlaywidth"+overlaywidth);
    //var watchnow=browser.getText("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//div[@class='overlay']//div[@class='button']//span[@class='txt']");
    //console.log("watchnow text"+JSON.stringify(watchnow));
    var watchnow=functions.get_Text(splashpage.watchnow(i));
    console.log("page object watchnowfontsize"+JSON.stringify(watchnow));
    //var watchnowfontsize=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//div[@class='overlay']//div[@class='button']//span[@class='txt']",'font-size');
    //console.log("watchnow fontsize"+JSON.stringify(watchnowfontsize));//14px
    var watchnowfontsize=functions.get_cssValue(splashpage.watchnow(i),'font-size');
    console.log("page object watchnowfontsize"+watchnowfontsize);
    //var watchnowfontcolor=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//div[@class='overlay']//div[@class='button']//span[@class='txt']",'color');
    //console.log("watchnow color"+JSON.stringify(watchnowfontcolor));//#ffffff
    var watchnowfontcolor=functions.get_cssValue(splashpage.watchnow(i),'color');
    console.log("page object watchnowfontcolor"+watchnowfontcolor);
    //var watchnowfontfamily=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//div[@class='overlay']//div[@class='button']//span[@class='txt']",'font-family');
    //console.log("watchnow family"+JSON.stringify(watchnowfontfamily));//roboto condensed
var watchnowfontfamily=functions.get_cssValue(splashpage.watchnow(i),'font-family');
console.log("page object watchnowfontfamily"+watchnowfontfamily);
    var titletext=browser.getText("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div[1]//div[@class='overlay']//p[@class='title']");
    //console.log("titletext"+titletext);
    var titletextfontsize=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div[1]//div[@class='overlay']//p[@class='title']",'font-size');
    //console.log("titletext"+JSON.stringify(titletextfontsize));//22px
    var titletextfontcolor=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div[1]//div[@class='overlay']//p[@class='title']",'color');
    //console.log("titletext"+JSON.stringify(titletextfontcolor));//#ffffff
    var titletextfontfamily=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div[1]//div[@class='overlay']//p[@class='title']",'font-family');
  //  console.log("titletext"+JSON.stringify(titletextfontfamily));//source sans pro
var episode=browser.getText("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div["+i+"]//div[@class='overlay']//p[@class='counter']//span[@class='default']");
//console.log(episode);
var episodefontsize=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div["+i+"]//div[@class='overlay']//p[@class='counter']//span[@class='default']",'font-size');
//console.log("episodefontsize",episodefontsize);//12px//for sponsor 14px
var episodefontcolor=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div["+i+"]//div[@class='overlay']//p[@class='counter']//span[@class='default']",'color');
//console.log("episodefontcolor",episodefontcolor);//#13e9f4//for sponsor colour #ea480a
var episodefontfamily=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div["+i+"]//div[@class='overlay']//p[@class='counter']//span[@class='default']",'font-family');
//console.log("episodefontfamily",episodefontfamily);//source sans pro//roboto
var playbuttonheight=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div["+i+"]//div[@class='overlay']//div[@class='button']//span[@class='icon']",'height');
//console.log("playbutton"+JSON.stringify(playbuttonheight));//20px
var playbuttonwidth=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div["+i+"]//div[@class='overlay']//div[@class='button']//span[@class='icon']",'width');
//console.log("playbutton width"+JSON.stringify(playbuttonwidth));//20px
console.log("===========================================imagebackground======================================================");
var imagebackground=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div["+i+"]//img",'border-color');
var imagebackgroundwidth=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div["+i+"]//img",'border-width');
console.log("imagebackground",imagebackground.parsed.hex);


  }else if(browser.isExisting("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//div[@class='quote-ad-wrapper']")){
var quote=browser.getText("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//div[@class='quote-next-to-ad']//div[@class='quote-wrapper']/p[@class='quote']");
//console.log("Quote with ad"+i,quote);
var quotefontsize=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//div[@class='quote-next-to-ad']//div[@class='quote-wrapper']/p[@class='quote']",'font-size');
//console.log("quotefontsize"+JSON.stringify(quotefontsize));//22px
var quotecolor=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//div[@class='quote-next-to-ad']//div[@class='quote-wrapper']/p[@class='quote']",'color');
//console.log("quotecolor"+JSON.stringify(quotecolor));//#ebe1dc
var quotefontfamily=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//div[@class='quote-next-to-ad']//div[@class='quote-wrapper']/p[@class='quote']",'font-family');
//console.log("quotefontfamily"+JSON.stringify(quotefontfamily));//should be SourceSansPro//displayed "string":"lato, arial, sans-serif"
var adquoteauthor=browser.getText("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//div[@class='quote-next-to-ad']//div[@class='quote-wrapper']/p[@class='quote-attr']/span[@class='name']");
console.log("adquoteauthor"+adquoteauthor);
var adquoteauthorsize=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//div[@class='quote-next-to-ad']//div[@class='quote-wrapper']/p[@class='quote-attr']/span[@class='name']",'font-size');
console.log("adquoteauthorsize"+JSON.stringify(adquoteauthorsize));//20px
var adquoteauthorfamily=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//div[@class='quote-next-to-ad']//div[@class='quote-wrapper']/p[@class='quote-attr']/span[@class='name']",'font-family');
console.log("adquoteauthorfamily"+JSON.stringify(adquoteauthorfamily));//should be SourceSansPro//displayed lato","arial","sans-serif"]
var adquoteauthorcolor=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//div[@class='quote-next-to-ad']//div[@class='quote-wrapper']/p[@class='quote-attr']/span[@class='name']",'color');
console.log("adquoteauthorcolor"+JSON.stringify(adquoteauthorcolor));//#f2eef3

//city
console.log("===================================city===================================================================");
var adquotecity=browser.getText("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//div[@class='quote-next-to-ad']//div[@class='quote-wrapper']/p[@class='quote-attr']/span[@class='city']");
console.log("adquotecity"+adquotecity);
var adquotecitysize=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//div[@class='quote-next-to-ad']//div[@class='quote-wrapper']/p[@class='quote-attr']/span[@class='city']",'font-size');
console.log("adquotecitysize"+JSON.stringify(adquotecitysize));//14px
var adquotecityfamily=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//div[@class='quote-next-to-ad']//div[@class='quote-wrapper']/p[@class='quote-attr']/span[@class='city']",'font-family');
console.log("adquotecityfamily"+JSON.stringify(adquotecityfamily));//should be SourceSansPro//displayed lato","arial","sans-serif"]
var adquotecitycolor=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//div[@class='quote-next-to-ad']//div[@class='quote-wrapper']/p[@class='quote-attr']/span[@class='city']",'color');
console.log("adquotecitycolor"+JSON.stringify(adquotecitycolor));//#f2eef3

console.log("====================================state=================================================================");
var adquotestate=browser.getText("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//div[@class='quote-next-to-ad']//div[@class='quote-wrapper']/p[@class='quote-attr']/span[@class='state']");
console.log("adquotestate"+adquotestate);
var adquotestatesize=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//div[@class='quote-next-to-ad']//div[@class='quote-wrapper']/p[@class='quote-attr']/span[@class='state']",'font-size');
console.log("adquotestatesize"+JSON.stringify(adquotestatesize));//14px
var adquotestatefamily=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//div[@class='quote-next-to-ad']//div[@class='quote-wrapper']/p[@class='quote-attr']/span[@class='state']",'font-family');
console.log("adquotestatefamily"+JSON.stringify(adquotestatefamily));//should be SourceSansPro//displayed lato","arial","sans-serif"]
var adquotestatecolor=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//div[@class='quote-next-to-ad']//div[@class='quote-wrapper']/p[@class='quote-attr']/span[@class='state']",'color');
console.log("adquotestatecolor"+JSON.stringify(adquotestatecolor));//#f2eef3

console.log("============================blueline======================================================");
var bluelinecolor=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div["+i+"]//div[@class='quote-ad-wrapper']//div[@class='quote-next-to-ad']/span[1]",'background-color');
console.log("bluelinecolor"+JSON.stringify(bluelinecolor));//should be #02b8c2//but displayed #43b2c4
var bluelineheight=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div["+i+"]//div[@class='quote-ad-wrapper']//div[@class='quote-next-to-ad']/span[1]",'height');
console.log("bluelineheight"+JSON.stringify(bluelineheight));//:1.96875
var bottombluelinecolor=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div["+i+"]//div[@class='quote-ad-wrapper']//div[@class='quote-next-to-ad']/span[2]",'background-color');
console.log("bottombluelinecolor"+JSON.stringify(bottombluelinecolor));//should be #02b8c2//but displayed #43b2c4
var bottombluelineheight=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div["+i+"]//div[@class='quote-ad-wrapper']//div[@class='quote-next-to-ad']/span[2]",'height');
console.log("bottombluelineheight"+JSON.stringify(bottombluelineheight));//0.989583

////////////ad/////////////////////////
console.log("===========addd===============================");
var adheight=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div[2]//div[@id='google_ads_iframe_/8668145/consumer/webmd_1__container__']//iframe",'height');
console.log("adheight",adheight);//250px
var adwidth=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div[2]//div[@id='google_ads_iframe_/8668145/consumer/webmd_1__container__']//iframe",'width');
console.log("adwidth",adwidth);//300px

var adposition=browser.getLocationInView("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div[2]//div[@id='google_ads_iframe_/8668145/consumer/webmd_1__container__']//iframe",'x');

console.log("location adposition",adposition);

var adpostion2=browser.getLocationInView('//*[@id="multimedia-grid"]/div/div[2]/div/div[2]/div','x');
console.log("adpostion2",adpostion2);
  }else{
var onlyquote=browser.getText("(//div[@id='multimedia-grid']//div[@class='item-duo-wrapper'])//div["+i+"]//div[@class='quote-wrapper']//p[@class='quote']");
console.log("Only quote"+i,onlyquote);
var onlyquotefontsize=browser.getCssProperty("(//div[@id='multimedia-grid']//div[@class='item-duo-wrapper'])//div["+i+"]//div[@class='quote-wrapper']//p[@class='quote']","font-size");
//console.log("onlyquotefontsize"+JSON.stringify(onlyquotefontsize));//28px
var onlyquotefontcolor=browser.getCssProperty("(//div[@id='multimedia-grid']//div[@class='item-duo-wrapper'])//div["+i+"]//div[@class='quote-wrapper']//p[@class='quote']","color");
//console.log("onlyquotefontcolor"+JSON.stringify(onlyquotefontcolor));//#ebe1dc
var onlyquotefontfamily=browser.getCssProperty("(//div[@id='multimedia-grid']//div[@class='item-duo-wrapper'])//div["+i+"]//div[@class='quote-wrapper']//p[@class='quote']","font-family");
//console.log("onlyquotefontfamily"+JSON.stringify(onlyquotefontfamily));//should be SourceSansPro//displayed lato","arial","sans-serif"]

var author=browser.getText("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//p[@class='quote-attr']//span[@class='name']");
console.log("author"+author);
var authorfontsize=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//p[@class='quote-attr']//span[@class='name']",'font-size');
console.log("authorfontsize"+JSON.stringify(authorfontsize));//14px
var authorfontcolor=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//p[@class='quote-attr']//span[@class='name']",'color');
console.log("authorfontcolor"+JSON.stringify(authorfontcolor));//#f2eef3
var authorfontfamily=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//p[@class='quote-attr']//span[@class='name']",'font-family');
console.log("authorfontfamily"+JSON.stringify(authorfontfamily));//should be SourceSansPro//displayed lato","arial","sans-serif"]

var authorcity=browser.getText("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//p[@class='quote-attr']//span[@class='city']");
console.log(authorcity);
var authorcityfontsize=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//p[@class='quote-attr']//span[@class='city']",'font-size');
console.log("authorcityfontsize"+JSON.stringify(authorcityfontsize));//14px
var authorcityfontcolor=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//p[@class='quote-attr']//span[@class='city']",'color');
console.log("authorcityfontcolor"+JSON.stringify(authorcityfontcolor));//#f2eef3
var authorcityfontfamily=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//p[@class='quote-attr']//span[@class='city']",'font-family');
console.log("authorcityfontfamily"+JSON.stringify(authorcityfontfamily));//should be SourceSansPro//displayed lato","arial","sans-serif"]

console.log("===================================state==================================================");

var authorstate=browser.getText("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//p[@class='quote-attr']//span[@class='state']");
console.log(authorstate);
var authorstatefontsize=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//p[@class='quote-attr']//span[@class='state']",'font-size');
console.log("authorstatefontsize"+JSON.stringify(authorstatefontsize));//14px
var authorstatefontcolor=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//p[@class='quote-attr']//span[@class='state']",'color');
console.log("authorstatefontcolor"+JSON.stringify(authorstatefontcolor));//#f2eef3
var authorstatefontfamily=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+i+"]//p[@class='quote-attr']//span[@class='state']",'font-family');
console.log("authorstatefontfamily"+JSON.stringify(authorstatefontfamily));//should be SourceSansPro//displayed lato","arial","sans-serif"]


/*console.log("==================================only quote blueline=============================================");
var bluelinecolor=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div["+i+"]//div[1]/span[1]",'background-color');
console.log("bluelinecolor"+JSON.stringify(bluelinecolor));//should be #02b8c2//but displayed #43b2c4
var bottombluelinecolor=browser.getCssProperty("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div["+i+"]//div[@class='quote-ad-wrapper']//div[@class='quote-next-to-ad']/span[2]",'background-color');
console.log("bottombluelinecolor"+JSON.stringify(bottombluelinecolor));//should be #02b8c2//but displayed #43b2c4*/
  }
}

var largevideo={
  element:element,
}
    return largevideo;
  },

}

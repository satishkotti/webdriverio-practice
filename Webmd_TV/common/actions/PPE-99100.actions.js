var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var splashpage = require('./../elements/splashpage');
var functions = require('./../functions/functions');
var env = require('./../../gulpfile.js').TestEnv;
var input = require('./../../config/Webmd-tv')[env];
var url = input.splashpage;
var splashgrid = {};



module.exports = {
  splashpagegrids: function () {

    browser.url(url);
    browser.pause(2000);
    if (browser.isExisting('#webmdHoverClose')) {
      browser.click('#webmdHoverClose');
    }
    browser.pause(2000);
    var element = browser.elements("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div");
    console.log(element.value.length);
    for (var i = 1; i <= element.value.length; i++) {

      if (splashpage.videogridn(i).isExisting()) {

        splashgrid.text = splashpage.text(i).getText();
        splashgrid.gridcssProperties = functions.cssProperties(splashpage.grid1(i));
        splashgrid.overlaycssProperties = functions.cssProperties(splashpage.overlay(i));
        splashgrid.watchnow = functions.get_Text(splashpage.watchnow(i));
        splashgrid.watchnowcssProperties = functions.cssProperties(splashpage.watchnow(i));
        splashgrid.videotext = functions.get_Text(splashpage.videotext(i));
        splashgrid.videotextcssproperties = functions.cssProperties(splashpage.videotext(i));
        console.log(splashgrid.videotextcssproperties);
        splashgrid.titletext = functions.get_Text(splashpage.text(i));
        splashgrid.titletextcssProperties = functions.cssProperties(splashpage.text(i));

        splashgrid.episode = functions.get_Text(splashpage.episode(i));
        console.log(i, splashgrid.episode);
        //console.log("page object titletext"+JSON.stringify(titletextfontfamily));//source sans pro
        /*if(functions.get_Text(splashpage.sponsorepisode(i))=='SPONSOR CONTENT'){
        splashgrid.sponsorepisode=functions.get_Text(splashpage.sponsorepisode(i));
        console.log(i,splashgrid.sponsorepisode);
        }else{
          splashgrid.episode=functions.get_Text(splashpage.episode(i));
          console.log(i,splashgrid.episode);
        }*/
        splashgrid.episodecssProperties = functions.cssProperties(splashpage.episode(i));
        //splashgrid.episodefontfamily = functions.get_cssValue(splashpage.episode(i), 'font-family');
        //console.log("page object episodefontfamily",episodefontfamily);//source sans pro//roboto*/
        splashgrid.playbuttoncssProperties = functions.cssProperties(splashpage.playbutton(i));
        console.log("===========================================imagebackground======================================================");
        splashgrid.imagebackground = functions.get_cssValue(splashpage.image(i), 'border-color');
        splashgrid.imagebackground = functions.get_cssValue(splashpage.image(i), 'border-width');


      } else if (splashpage.ad(i).isExisting()) {
        splashgrid.quote = functions.get_Text(splashpage.quote(i));
        splashgrid.quotecssProperties = functions.cssProperties(splashpage.quote(i));
        //console.log("page object quotefontfamily"+JSON.stringify(quotefontfamily));//should be SourceSansPro//displayed "string":"lato, arial, sans-serif"*/
        splashgrid.adquoteauthor = functions.get_Text(splashpage.adquoteauthor(i));
        splashgrid.adquotecssProperties = functions.cssProperties(splashpage.adquoteauthor(i));

        //city
        console.log("===================================city===================================================================");
        splashgrid.adquotecity = functions.get_Text(splashpage.adquotecity(i));
        splashgrid.adquotecitycssProperties = functions.cssProperties(splashpage.adquotecity(i));
        console.log("====================================state=================================================================");
        splashgrid.adquotestate = functions.get_Text(splashpage.adquotestate(i));
        splashgrid.adquotestatecssProperties = functions.cssProperties(splashpage.adquotestate(i));
        console.log("============================blueline======================================================");
        splashgrid.bluelinecolor = functions.get_cssValue(splashpage.bluelinecolor(i), 'background-color');
        //console.log("page object bluelinecolor"+JSON.stringify(bluelinecolor));//should be #02b8c2//but displayed #43b2c4
        splashgrid.bluelineheight = functions.get_cssValue(splashpage.bluelinecolor(i), 'height');
        splashgrid.bottombluelinecolor = functions.get_cssValue(splashpage.bottombluelinecolor(i), 'background-color');
        splashgrid.bottombluelineheight = functions.get_cssValue(splashpage.bottombluelinecolor(i), 'height');
        console.log("===========addd===============================");
        splashgrid.adheightcssProperties = functions.cssProperties(splashpage.ads(i));
        splashgrid.adposition = functions.get_LocationInView(splashpage.adposition(i), 'x');
        splashgrid.adposition2 = functions.get_LocationInView(splashpage.adposition2(i), 'x');

      } else {

        splashgrid.onlyquote = functions.get_Text(splashpage.onlyquote(i))
        splashgrid.onlyquotecssProperties = functions.cssProperties(splashpage.onlyquote(i));
        splashgrid.author = functions.get_Text(splashpage.onlyquoteauthor(i));
        splashgrid.authorcssProperties = functions.cssProperties(splashpage.onlyquoteauthor(i));
        splashgrid.authorcity = functions.get_Text(splashpage.authorcity(i));
        splashgrid.authorcitycssProperties = functions.cssProperties(splashpage.authorcity(i));
        console.log("===================================state==================================================");
        splashgrid.authorstate = functions.get_Text(splashpage.authorstate(i));
        splashgrid.authorstatecssProperties = functions.cssProperties(splashpage.authorstate(i));
        

      }
    }
    //splashgrid.sponsorepisode = functions.get_Text(splashpage.sponsorepisode);
    //splashgrid.sponsorepisodecssProperties = functions.cssProperties(splashpage.sponsorepisode);
    return splashgrid;
  }

}

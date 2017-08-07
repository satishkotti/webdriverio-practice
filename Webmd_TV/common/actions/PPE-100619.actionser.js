var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
//var webmdtvpage = require('./../elements/webmdtvpage');
//var webmdtvpage = require('./../elements/webmdtvpage');
var webmdtvpage = require('./../elements/webmdtvpage');
var argv = require("yargs").argv;
var input = require('./../../config/Webmd-tv')[argv.env];
var url = input.filmstrip;
var functions = require('./../functions/functions');
var filmstrip = {};
var sasanks = [];
var image = [];
var fontsize = [];
var sushma = [];

module.exports = {
  filmstrip: function () {
    // webmdtvpage.open();
    //browser.url(url);
    browser.pause(2000);
    if (browser.isExisting('#webmdHoverClose')) {
      browser.click('#webmdHoverClose');
    }
    browser.pause(2000);
    browser.scroll("//div[@class='cmd-section']/div[@class='tab-about btn btn-default']");
    browser.pause(2000);

    filmstrip.leftarrowcssProperties = functions.cssProperties(webmdtvpage.leftarrow);
    filmstrip.leftnavigationarrowcssProperties = functions.cssProperties(webmdtvpage.leftnavigationarrow);
    console.log("sasank" + filmstrip.leftnavigationarrowcssProperties);
    filmstrip.rightarrowcssProperties = functions.cssProperties(webmdtvpage.rightarrow);
    filmstrip.rightnavigationarrowcssProperties = functions.cssProperties(webmdtvpage.rightnavigationarrow);

    return filmstrip;
  },
  css_validation: function () {
    var fontsize = [];
    var fontfamily = [];
    var fontcolor = [];
    for (var i = 4; i <= 12; i++) {

      fontcolor.push(webmdtvpage.videoTitle(i).getCssProperty('color'));
      fontfamily.push(webmdtvpage.videoTitle(i).getCssProperty('font-family'));
      fontsize.push(webmdtvpage.videoTitle(i).getCssProperty('font-size'));

      fontcolor.push(webmdtvpage.episode(i).getCssProperty('color'));
      fontfamily.push(webmdtvpage.episode(i).getCssProperty('font-family'));
      fontsize.push(webmdtvpage.episode(i).getCssProperty('font-size'));


    }
    var css_properties = {
      fontcolor: fontcolor,
      fontfamily: fontfamily,
      fontsize: fontsize
    }
    return css_properties;
  },
  episode: function () {
    var episodefontcolor = [];
    var episodefontsize = [];
    var imageheight = [];
    var alltitles = [];
    var imagewidth = [];
    var titleheight = [];
    var playiconsheight = [];
    var playiconswidth = [];
    var playiconscolor = [];
    var widthheight = [];
    var episodefontfamily = [];
    var fontsize = [];
    var fontfamily = [];
    var fontcolor = [];
    //webmdtvpage.open();
    browser.pause(2000);
    if (browser.isExisting('#webmdHoverClose')) {
      console.log("hello");
      browser.click('#webmdHoverClose');
    }
    console.log("first");
    browser.pause(2000);
    browser.scroll("//div[@class='cmd-section']/div[@class='tab-about btn btn-default']");
    browser.pause(2000);
    var j = browser.elements("//div[@class='more-videos']//div[@class='owl-item'] | //div[@class='more-videos']//div[@class='owl-item active']");
    console.log(j.value.length);
    for (var i = 1; i <= j.value.length; i++) {

      widthheight.push(webmdtvpage.filmstripN(i).getCssProperty('width'));
      console.log("sasank1");
      titleheight.push(webmdtvpage.filmstripN(i).getCssProperty('height'));
      console.log("sasank2");
      fontsize.push(webmdtvpage.filmstripN(i).getCssProperty('font-size'));
      console.log("sasank3");
      fontcolor.push(webmdtvpage.filmstripN(i).getCssProperty('color'));
      console.log("sasank4");
      fontfamily.push(webmdtvpage.filmstripN(i).getCssProperty('font-family'));
      console.log("sasank6");

      //Image validations
      image.push(webmdtvpage.imagethumnailN(i).isExisting());
      imageheight.push(webmdtvpage.imagethumnailN(i).getCssProperty('height'));
      imagewidth.push(webmdtvpage.imagethumnailN(i).getCssProperty('width'));



      //get text
      /*webmdtvpage.imagethumnailN(i).click();
      console.log(i);
      alltitles.push(browser.getText("//div[@class='title-section']//div[@class='title2']"));*/



    }
   /* for (i = 1; i <= 3; i++) {
      playiconsheight.push(webmdtvpage.playicons(i).getCssProperty('height'));
      playiconswidth.push(webmdtvpage.playicons(i).getCssProperty('width'));
      playiconscolor.push(webmdtvpage.playicons(i).getCssProperty('color'));
    }*/
    browser.pause(2000);
    //var titletext=webmdtvpage.filmstripN(1).getText();
    var titletext = browser.getText('//*[@id="webmd-tv-playlists"]/div[2]/div[1]/div[1]/div/div[11]/div/a/div[2]/h4');

    browser.click('//*[@id="webmd-tv-playlists"]/div[2]/div[1]/div[1]/div/div[5]/div/a/div[2]/h4');
    browser.pause(2000);
    browser.scroll(0, 190);
    browser.scroll("//div[@class='title-section']/div[@class='title2']");
    browser.waitForVisible("//div[@class='title-section']/div[@class='title2']", 4000);
    var texttitle = browser.getText("//div[@class='title-section']/div[@class='title2']");



    var filmstrip2 = {
      titleheight: titleheight,
      widthheight: widthheight,
      fontsize: fontsize,
      episodefontfamily: episodefontfamily,
      fontcolor: fontcolor,
      fontfamily: fontfamily,
      episodefontsize: episodefontsize,
      episodefontcolor: episodefontcolor,
      image: image,
      imageheight: imageheight,
      imagewidth: imagewidth,
      titletext: titletext,
      texttitle: texttitle,
      alltitles: alltitles,
     // playiconsheight: playiconsheight,
      //playiconswidth: playiconswidth,
     // playiconscolor: playiconscolor

    }
    return filmstrip2;
  },



}

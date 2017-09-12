var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
//var webmdtvpage = require('./../elements/webmdtvpage');
//var webmdtvpage = require('./../elements/webmdtvpage');
var webmdtvpage = require('./../elements/webmdtvpage');
var input = require('./../../config/Webmd-tv');
var functions = require('./../functions/functions');
var filmstrip = {};
var sasanks = [];
var image = [];
var fontsize = [];

module.exports = {
  filmstrip: function () {
//    webmdtvpage.open();
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
  episode: function () {
    var episodefontcolor = [];
    var episodefontsize = [];
    var imageheight = [];
    var imagewidth = [];
    var titleheight = [];
    var widthheight = [];
    var episodefontfamily = [];
    var fontsize = [];
    var fontfamily = [];
    var fontcolor = [];
    webmdtvpage.open();
    browser.pause(2000);
    if (browser.isExisting('#webmdHoverClose')) {
      browser.click('#webmdHoverClose');
    }
    browser.pause(2000);
    browser.scroll("//div[@class='cmd-section']/div[@class='tab-about btn btn-default']");
    browser.pause(2000);
    var j = browser.elements("//div[@class='more-videos']//div[@class='owl-item'] | //div[@class='more-videos']//div[@class='owl-item active']");
    console.log(j.value.length);
    for (var i = 1; i <= j.value.length; i++) {
      //title of videos
      //for (var i = 1; i <= 3; i++) {
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
      //console.log("widths"+JSON.stringify(imageheight));
      //title of episodes
      /*  if (i == 5) {
          console.log("no epispode for sponser");
        } else {
          episodefontfamily.push(webmdtvpage.episodetitleN(i).getCssProperty('font-family'));
          episodefontsize.push(webmdtvpage.episodetitleN(i).getCssProperty('font-size'));
          episodefontcolor.push(webmdtvpage.episodetitleN(i).getCssProperty('color'));
        }*/


    }
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
      texttitle: texttitle

    }
    return filmstrip2;
  },



}

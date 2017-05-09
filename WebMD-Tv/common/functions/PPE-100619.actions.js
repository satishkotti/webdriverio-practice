var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var migraine = require('./../elements/Migrainepage');
var marqueeheader = require('./../elements/marqueeheader');
var input = require('./../../config/Webmd-tv');
var filmstrip = {};
var sasanks = [];
var imageheight=[];
var imagewidth=[];
//var cssProperties = ['width','height','font-size','color','font-family'];
//var cssElements = ['filmstrip','episode'];
//var properties = {};
var titleheight = [];
var image = [];
var fontsize = [];
var widthheight = [];
var episodefontfamily = [];
var fontsize = [];
var fontfamily = [];
var fontcolor = [];
var episodefontcolor = [];
var episodefontsize = [];
// /var titletext=[];
var Promise = require("bluebird");


module.exports = {
  filmstrip: function () {
    migraine.open();
    browser.pause(2000);
    if (browser.isExisting('#webmdHoverClose')) {
        browser.click('#webmdHoverClose');
    }
    browser.pause(2000);
    browser.scroll("//div[@class='cmd-section']/div[@class='tab-about btn btn-default']");
    browser.pause(2000);

    browser.pause(2000);
    browser.scroll("//div[@class='cmd-section']/div[@class='tab-about btn btn-default']");
    browser.pause(2000);
    filmstrip.leftarrowwidth = migraine.leftarrow.getCssProperty('width');
    filmstrip.leftnavigationarrowwidth = migraine.leftnavigationarrow.getCssProperty('width');
    filmstrip.leftarrowheight = migraine.leftarrow.getCssProperty('height');
    filmstrip.leftnavigationarrowheight = migraine.leftnavigationarrow.getCssProperty('height');
    filmstrip.rightarrowheight = migraine.rightarrow.getCssProperty('height');
    filmstrip.rightnavigationarrowheight = migraine.rightnavigationarrow.getCssProperty('height');
    filmstrip.rightarrowwidth = migraine.rightarrow.getCssProperty('width');
    filmstrip.rightnavigationarrowwidth = migraine.rightnavigationarrow.getCssProperty('width');

    return filmstrip;
  },
  episode: function () {
    migraine.open();
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
      widthheight.push(marqueeheader.filmstripN(i).getCssProperty('width'));
      titleheight.push(marqueeheader.filmstripN(i).getCssProperty('height'));
      fontsize.push(marqueeheader.filmstripN(i).getCssProperty('font-size'));
      fontcolor.push(marqueeheader.filmstripN(i).getCssProperty('color'));
      fontfamily.push(marqueeheader.filmstripN(i).getCssProperty('font-family'));

      //Image validations
      image.push(marqueeheader.imagethumnailN(i).isExisting());
      imageheight.push(marqueeheader.imagethumnailN(i).getCssProperty('height'));
      imagewidth.push(marqueeheader.imagethumnailN(i).getCssProperty('width'));
//console.log("widths"+JSON.stringify(imageheight));
      //title of episodes
      if (i == 5) {
        console.log("no epispode for sponser");
      } else {
        episodefontfamily.push(marqueeheader.episodetitleN(i).getCssProperty('font-family'));
        episodefontsize.push(marqueeheader.episodetitleN(i).getCssProperty('font-size'));
        episodefontcolor.push(marqueeheader.episodetitleN(i).getCssProperty('color'));
      }


    }
    browser.pause(2000);
    //var titletext=marqueeheader.filmstripN(1).getText();
    var titletext=browser.getText('//*[@id="webmd-tv-playlists"]/div[2]/div[1]/div[1]/div/div[11]/div/a/div[2]/h4');

    browser.click('//*[@id="webmd-tv-playlists"]/div[2]/div[1]/div[1]/div/div[11]/div/a/div[2]/h4');
   browser.pause(2000);
   browser.scroll(0,190);
   browser.scroll("//div[@class='title-section']/div[@class='title2']");
   browser.waitForVisible("//div[@class='title-section']/div[@class='title2']",4000);
   var texttitle=browser.getText("//div[@class='title-section']/div[@class='title2']");



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
      imageheight:imageheight,
      imagewidth:imagewidth,
      titletext:titletext,
      texttitle:texttitle

    }
    return filmstrip2;
  },



}

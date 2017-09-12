var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var migraine = require('./../elements/Migrainepage');
var marqueeheader = require('./../elements/marqueeheader');
var functions = require('./../functions/Common_functions');
var input = require('./../../config/Webmd-tv');
var url = input.environment;
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
//var Promise = require("bluebird");


module.exports = {
  filmstrip: function () {
    migraine.open();
    browser.pause(5000);

    filmstrip.loadMorewidth = functions.get_cssValue(migraine.loadMore,'width');
    filmstrip.loadMoreheight = functions.get_cssValue(migraine.loadMore,'height');
    filmstrip.loadMorecolor = functions.get_cssValue(migraine.loadMore,'color');
console.log('filmstrip' +filmstrip.loadMorecolor );
// console.log('filmstrip' +filmstrip.loadMoreheight);
    return filmstrip;
  },
  episode: function () {
    migraine.open();
    browser.pause(20000);

    var j = browser.elements("div.more-videos > div > ul > li");
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


    }
    return filmstrip2;
  },



}

var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var grid = require('./../elements/webmdtvpage');
var input = require('./../../config/Webmd-tv')[argv.env];
var functions = require('./../functions/functions');
var url = input.splashpage;
var gridtypeheight = [];
var gridtypewidth = [];
var gridtypecolor = [];
var gridtypeffamily = [];
var gridtypefsize = [];

var gridtitleheight = [];
var gridtitlewidth = [];
var gridtitlecolor = [];
var gridtitleffamily = [];
var gridtitlefsize = [];

var gridimageheight = [];
var gridimagewidth = [];
var navurl = [];
var gridtypeText = [];


module.exports = {

  grid1: function () {
    var grid1 = {};
    browser.url(url);
    browser.pause(2000);
    var titleproperties = functions.cssProperties(grid.gridtitle);
    var j = browser.elements(grid.gridcount.selector);
    console.log(j.value.length);
    for (var i = 2; i <= j.value.length + 1; i++) {
      browser.url(url);
      browser.scroll(grid.gridtypeN(i).selector)
      //title of videos
      gridtypecolor.push(grid.gridtypeN(i).getCssProperty('color'));
      gridtypeffamily.push(grid.gridtypeN(i).getCssProperty('font-family'));
      gridtypefsize.push(grid.gridtypeN(i).getCssProperty('font-size'));
      gridtypeText.push(grid.gridtypeN(i).getText());
      gridtitlecolor.push(grid.gridtitleN(i).getCssProperty('color'));
      gridtitleffamily.push(grid.gridtitleN(i).getCssProperty('font-family'));
      gridtitlefsize.push(grid.gridtitleN(i).getCssProperty('font-size'));
      gridimageheight.push(grid.gridImageN(i).getCssProperty('height'));
      gridimagewidth.push(grid.gridImageN(i).getCssProperty('width'));


      browser.click(grid.gridtitleN(i).selector);
      navurl.push(browser.getUrl());
    }
    var gridadheight=grid.gridad.getCssProperty('height');
var gridadwidth=grid.gridad.getCssProperty('width');
    var title = {
      gridtypefsize: gridtypefsize,
      gridtypeffamily: gridtypeffamily,
      gridtypecolor: gridtypecolor,
      gridtitlecolor: gridtitlecolor,
      gridtitleffamily: gridtitleffamily,
      gridtitlefsize: gridtitlefsize,
      gridimageheight: gridimageheight,
      gridimagewidth: gridimagewidth,
      titleproperties: titleproperties,
      gridtypeText: gridtypeText,
navurl:navurl,
gridadheight:gridadheight,
gridadwidth:gridadwidth

    }

    return title;
  },




}

var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var grid = require('./../elements/Migrainepage');
var input = require('./../../config/Webmd-tv')[argv.env];
var functions=require('./../actions/functions');
var url=input.marqueeheader;


module.exports = {

  grid1: function () {
    var grid1 = {};
  browser.url(url);
    browser.pause(2000);
    browser.scroll("//div[@class='list-header']");
grid1.gettitle=functions.get_Text(grid.grid1articletitle1);

  grid1.articlecolor=functions.get_cssValue(grid.grid1articletitle1,'color');

    grid1.articlefontfamily=functions.get_cssValue(grid.grid1articletitle1,'font-family');

    grid1.article=functions.get_cssValue(grid.grid1articletitle1,'font-size');

    grid1.articletitle =functions.get_cssValue(grid.grid1articletitle2,'font-size');

    grid1.articletitlecolor=functions.get_cssValue(grid.grid1articletitle2,'color');

   grid1.articletitlewidth=functions.get_cssValue(grid.grid1articletitle2,'width');

    grid1.articletitleheight=functions.get_cssValue(grid.grid1articletitle2,'height');

    grid1.articletitlefontfamily=functions.get_cssValue(grid.grid1articletitle2,'font-family');
    grid.grid1articletitle2.click();
    grid.breadcrum.waitForVisible(40000);
    grid1.assettype = functions.get_Text(grid.breadcrum);
    grid1.url = browser.getUrl()

    return grid1;
  },
  grid2: function () {
      var grid2 = {};
    browser.url(url);
    browser.pause(2000);
    browser.scroll("//div[@class='list-header']");
    grid2.gettitle = functions.get_Text(grid.grid2articletitle1);
    grid2.titlecolor=functions.get_cssValue(grid.grid2articletitle1,'color');
    grid2.articlecolor = functions.get_cssValue(grid.grid1articletitle1,'color');
    grid2.articlefontfamily = functions.get_cssValue(grid.grid1articletitle1,'font-family');
    grid2.article = functions.get_cssValue(grid.grid2articletitle1,'font-size');
    grid2.articletitle = functions.get_cssValue(grid.grid2articletitle2,'font-size');
    grid2.articletitlecolor = functions.get_cssValue(grid.grid2articletitle1,'color');
    grid2.articletitlewidth = functions.get_cssValue(grid.grid2articletitle2,'width');
    grid2.articletitleheight = functions.get_cssValue(grid.grid2articletitle2,'height');
    grid2.articletitlefontfamily =functions.get_cssValue(grid.grid2articletitle2,'font-family');
    grid.grid2articletitle2.click();
    grid.breadcrum.waitForVisible(40000);
    grid2.assettype2 =functions.get_Text(grid.breadcrum);
    grid2.url = browser.getUrl()

    return grid2;
  },
  grid3: function () {
    var grid3 = {};
    browser.url(url);
    browser.pause(2000);
    browser.scroll("//div[@class='list-header']");
    grid3.gettitle = functions.get_Text(grid.grid3articletitle1);
    grid3.articlecolor = functions.get_cssValue(grid.grid1articletitle1,'color');
    grid3.articlefontfamily = functions.get_cssValue(grid.grid1articletitle1,'font-family');
    grid3.article =functions.get_cssValue(grid.grid3articletitle1,'font-size');
    grid3.articletitle = functions.get_cssValue(grid.grid3articletitle2,'font-size');
    grid3.articletitlecolor = functions.get_cssValue(grid.grid3articletitle2,'color');
    grid3.articletitlewidth = functions.get_cssValue(grid.grid3articletitle2,'width');
    grid3.articletitleheight = functions.get_cssValue(grid.grid3articletitle2,'height');
    grid3.articletitlefontfamily = functions.get_cssValue(grid.grid3articletitle2,'font-family');
    grid.grid3articletitle2.click();
    grid.breadcrum.waitForVisible(40000);
    grid3.assettype3 = functions.get_Text(grid.breadcrum);
    grid3.url = browser.getUrl()

        return grid3;
  },
  grid4: function () {
    var grid4 = {};
    browser.url(url);
    browser.pause(2000);
    browser.scroll("//div[@class='list-header']");
    grid4.gettitle = functions.get_Text(grid.grid4articletitle1);
    grid4.articlecolor = functions.get_cssValue(grid.grid1articletitle1,'color');
    grid4.articlefontfamily = functions.get_cssValue(grid.grid1articletitle1,'font-family');
    grid4.article = functions.get_cssValue(grid.grid4articletitle1,'font-size');
    grid4.articletitle = functions.get_cssValue(grid.grid4articletitle2,'font-size');
    grid4.articletitlecolor = functions.get_cssValue(grid.grid4articletitle2,'color');
    grid4.articletitlewidth = functions.get_cssValue(grid.grid4articletitle2,'width');
    grid4.articletitleheight = functions.get_cssValue(grid.grid4articletitle2,'height');
    grid4.articletitlefontfamily = functions.get_cssValue(grid.grid4articletitle2,'font-family');
    grid.grid4articletitle2.click();
    if (browser.isExisting == "//section[@class='breadcrumb']/h6") {
      grid.breadcrum.waitForVisible(40000);
      grid4.assettype4 = functions.get_Text(grid.breadcrum);
    }
    grid4.url = browser.getUrl()

      return grid4;
  },
  grid5: function () {
    var grid5={};
    browser.url(url);
    browser.pause(2000);
    browser.scroll("//div[@class='list-header']");
    grid5.gettitle = functions.get_Text(grid.grid5articletitle1);
    grid5.articlecolor = functions.get_cssValue(grid.grid1articletitle1,'color');
    grid5.articlefontfamily = functions.get_cssValue(grid.grid1articletitle1,'font-family');
    grid5.article = functions.get_cssValue(grid.grid5articletitle1,'font-size');
    grid5.articletitle = functions.get_cssValue(grid.grid5articletitle2,'font-size');
    grid5.articletitlecolor = functions.get_cssValue(grid.grid5articletitle2,'color');
    grid5.articletitlewidth = functions.get_cssValue(grid.grid5articletitle2,'width');
    grid5.articletitleheight = functions.get_cssValue(grid.grid5articletitle2,'height');
    grid5.articletitlefontfamily = functions.get_cssValue(grid.grid5articletitle2,'font-family');
    grid.grid5articletitle2.click();
    if (browser.isExisting == "//section[@class='breadcrumb']/h6") {
      grid.breadcrum.waitForVisible(40000);
      grid5.assettype5 = functions.get_Text(grid.breadcrum);
    }
    grid5.url = browser.getUrl()

    return grid5;
  },
  grid6: function () {
    var grid6={};
    browser.url(url);
    browser.pause(2000);
    browser.scroll("//div[@class='list-header']");
    grid6.gettitle = functions.get_Text(grid.grid6articletitle1);
    grid6.articlecolor = functions.get_cssValue(grid.grid1articletitle1,'color');
    grid6.articlefontfamily = functions.get_cssValue(grid.grid1articletitle1,'font-family');
    grid6.article = functions.get_cssValue(grid.grid6articletitle1,'font-size');
    grid6.articletitle = functions.get_cssValue(grid.grid6articletitle2,'font-size');
    grid6.articletitlecolor = functions.get_cssValue(grid.grid6articletitle2,'color');
    grid6.articletitlewidth = functions.get_cssValue(grid.grid6articletitle2,'width');
    grid6.articletitleheight = functions.get_cssValue(grid.grid6articletitle2,'height');
    grid6.articletitlefontfamily = functions.get_cssValue(grid.grid6articletitle2,'font-family');
    grid.grid6articletitle2.click();
    if (browser.isExisting == "//section[@class='breadcrumb']/h6") {
      grid.breadcrum.waitForVisible(40000);
      grid6.assettype6 = functions.get_Text(grid.breadcrum);
    }
    grid6.url = browser.getUrl()

    return grid6;
  },
  gridimageclick1: function () {
    var imageclick1={};
    browser.url(url);
    browser.pause(1000);
    browser.scroll("//div[@class='list-header']");
    imageclick1.gettitle = functions.get_Text(grid.grid1image);
    imageclick1.imagewidth1 = functions.get_cssValue(grid.grid1image,'width');
    imageclick1.imageheight1 = functions.get_cssValue(grid.grid1image,'height');
    grid.grid1image.click();
    grid.breadcrum.waitForVisible(40000);
    imageclick1.assettypeimage1 = functions.get_Text(grid.breadcrum);
    imageclick1.url = browser.getUrl()

      return imageclick1;
  },
  gridimageclick2: function () {
    var imageclick2={};
    browser.url(url);
    browser.pause(1000);
    browser.scroll("//div[@class='list-header']");
    browser.pause(1000);
    imageclick2.gettitle = functions.get_Text(grid.grid2image);
    imageclick2.imagewidth2 = functions.get_cssValue(grid.grid2image,'width');
    imageclick2.imageheight2 = functions.get_cssValue(grid.grid2image,'height');
    grid.grid2image.click();
    grid.breadcrum.waitForVisible(40000);
    imageclick2.assettypeimage2 = functions.get_Text(grid.breadcrum);
    imageclick2.url2 = browser.getUrl()

    return imageclick2;
  },
  gridimageclick3: function () {
    var imageclick3={};
    browser.url(url);
    browser.scroll("//div[@class='list-header']");
    imageclick3.gettitle = functions.get_Text(grid.grid3image);
    imageclick3.imagewidth3 = functions.get_cssValue(grid.grid3image,'width');
    imageclick3.imageheight3 = functions.get_cssValue(grid.grid3image,'height');
    grid.grid3image.click();
    grid.breadcrum.waitForVisible(40000);
    imageclick3.assettypeimage3 = functions.get_Text(grid.breadcrum);
    imageclick3.url3 = browser.getUrl()

    return imageclick3;
  },



}

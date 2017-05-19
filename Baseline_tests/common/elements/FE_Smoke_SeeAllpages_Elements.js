var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
var Page = require('./../../../prdemo/page');
//var input = require('./../../config/PPE-101748.testdata')[argv.env];
//var url = input.environment;
var sapElements = Object.create(Page, {
//seeallgrid
     seeallgrid:{get: function () { return browser.element(".//*[@id='art']/.//*[@class='see-all-items non-spon']");}},
     //pageheader
     pageheader:{get: function () { return browser.element(".//*[@id='ContentPane12']/header/h1");}},
     //breadcrumb
     breadcrumb:{get: function () { return browser.element(".//*[@id='ContentPane10']/section/h6/span/a");}},
     //loe
       loe: { get: function () { return browser.element(".//*[@id='ContentPane11']/div"); } },
       //logo
       logo:{get: function(){return browser.element(".//*[@id='masthead']/nav/div[2]/a/img");}},
       //textelementforsearch
       textelementforsearch:{get: function(){return browser.element(".//*[@id='masthead-search-wrapper']/input");}},
       //headerad
       headerad:{get: function(){return browser.element(".//*[@id='bannerAd_fmt']");}},
       //asidead
       asidead:{get: function(){return browser.element(".//*[@id='rightAd_rdr']");}},
     //facebookicon
       facebookicon:{get: function(){return browser.element(".//*[@id='fed-sharebar']/div/a[3]");}},
       //twittericon
       twittericon:{get: function(){return browser.element(".//*[@id='fed-sharebar']/div/a[1]");}},
       //pintresticon
       pintresticon:{get: function(){return browser.element(".//*[@id='fed-sharebar']/div/a[2]");}},
       //emailicon
       emailicon:{get: function(){return browser.element(".//*[@id='fed-sharebar']/div/a[4]");}},
     //healthmi
       healthmi:{get: function(){return browser.element(".//*[@id='masthead']/nav/ul/li[4]/a");}},
       //drugmi
       drugmi:{get: function(){return browser.element(".//*[@id='masthead']/nav/ul/li[5]/a/span[1]");}},
       //livingmi
       livingmi:{get: function(){return browser.element(".//*[@id='masthead']/nav/ul/li[6]/a/span[1]");}},
       //familymi
       familymi:{get: function(){return browser.element(".//*[@id='masthead']/nav/ul/li[7]/a/span[1]");}},
       //newsmi
       newsmi:{get: function(){return browser.element(".//*[@id='masthead']/nav/ul/li[8]/a/span[1]");}},
 });

module.exports = sapElements
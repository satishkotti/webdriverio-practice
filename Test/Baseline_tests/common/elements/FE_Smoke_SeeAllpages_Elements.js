var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
var Page = require('./../../../prdemo/page');
//var input = require('./../../config/PPE-101748.testdata')[argv.env];
var sapElements = Object.create(Page, {
  //seeallgrid
  seeallgrid: { get: function () { return browser.element(".//*[@id='art']/.//*[@class='see-all-items non-spon']"); } },
  //pageheader
  pageheader: { get: function () { return browser.element(".//*[@id='ContentPane12']/header/h1"); } },
  //breadcrumb
  //headerad
  headerad: { get: function () { return browser.element(".//*[@id='bannerAd_fmt']"); } },
  //asidead
  asidead: { get: function () { return browser.element(".//*[@id='rightAd_rdr']"); } },
  //healthmi
  healthmi: { get: function () { return browser.element(".//*[@id='masthead']/nav/ul/li[4]/a"); } },
  //drugmi
  drugmi: { get: function () { return browser.element(".//*[@id='masthead']/nav/ul/li[5]/a/span[1]"); } },
  //livingmi
  livingmi: { get: function () { return browser.element(".//*[@id='masthead']/nav/ul/li[6]/a/span[1]"); } },
  //familymi
  familymi: { get: function () { return browser.element(".//*[@id='masthead']/nav/ul/li[7]/a/span[1]"); } },
  //newsmi
  newsmi: { get: function () { return browser.element(".//*[@id='masthead']/nav/ul/li[8]/a/span[1]"); } },
});

module.exports = sapElements
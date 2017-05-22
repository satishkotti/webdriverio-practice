var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
var Page = require('./../../../prdemo/page');
//var input = require('./../../config/PPE-101748.testdata')[argv.env];
//var url = input.environment;
var tocElements = Object.create(Page, {
  //image
  image: { get: function () { return browser.element('//div [@class="toc-hero-left-col"]//div [@class="toc-hero-item"]//div [@class="toc-hero-img"]//a [@class="toc-img-link type_art"]/img'); } },
  //masonarygrid -- Grid below the Heroimage
  masonarygrid: { get: function () { return browser.element('//section [@id="s2"]//div [@id="ContentPane17"]//div [@class="wbmd-masonry-grid"]'); } },
  //seemore link
  seemore: { get: function () { return browser.element('//section [@id="s6"]//div [@id="ContentPane54"]//div [@class="see-all-link"]/a'); } },
  //headerad
  headerad: { get: function () { return browser.element(".//*[@id='bannerAd_fmt']"); } },
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

module.exports = tocElements
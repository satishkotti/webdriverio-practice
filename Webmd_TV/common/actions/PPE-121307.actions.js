var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var splashpage = require('./../elements/webmdtvpage');
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
    

}}

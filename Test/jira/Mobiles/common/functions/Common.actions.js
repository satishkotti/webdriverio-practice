var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var socialshareIcons = require('./../elements/Common.elements');
var input = require('./../../config/PPE-101748.testdata');

module.exports = {

 // returns the css property for the given element

  verify_Css: function (ele, property) {
    var icon = $(ele);
    var value = icon.getCssProperty(property);

    return value;
  },

 
  //clicks on an elemnet and retruns the new url value
  //again go back the browser ans switch to frmae
  verify_linkurl: function (locator, url, frame) {
    browser.click(locator);
    browser.pause(60000);
    var curr_URL = browser.getUrl();
    browser.back();
    browser.pause(60000);
    browser.frame(frame);
    return curr_URL;
  }
}
var webdriverio = require('webdriverio');
var should = require('should');
var assert = require('assert');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var assert = require("assert");
console.log(__dirname);
var sap_Actions = require('./../../common/functions/FE_Smoke_SeeAllpages_Actions');

module.exports = {

    see_all_grid: function(see_all_grid) {
        var ph_visible = browser.isVisible(page_header);
        var sag_visible = browser.isVisible(see_all_grid);
        assert.equal(ph_visible, true);
        assert.equal(sag_visible, true);
    }

}
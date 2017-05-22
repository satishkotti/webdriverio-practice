
var webdriverio = require('webdriverio');
var should = require('should');
var assert = require('assert');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var assert = require("assert");
console.log(__dirname);
var sap_Actions = require('./../../common/functions/FE_Smoke_SeeAllpages_Actions');

module.exports =
    {
        Get_saptitle: function()
        {
            var sap_title = browser.getTitle();
            console.log(sap_title);
        },
        
 SeeAll_grid_working: function(menuitem)
 {
            browser.leftClick(menuitem);
            browser.pause(1000);
        },
        page_header: function(page_header)
        {
            var ph_visible=browser.isVisible(page_header);
            assert.equal(ph_visible,true);
        },
        see_all_grid: function(see_all_grid)
        {
            var sag_visible=browser.isVisible(see_all_grid);
            assert.equal(sag_visible,true);
        },

}
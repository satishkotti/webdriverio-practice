
var webdriverio = require('webdriverio');
var should = require('should');
var assert = require('assert');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var assert = require("assert");
console.log(__dirname);
var ss_Actions = require('./../../common/functions/FE_Smoke_Toc_Actions');

module.exports =
    {
        //-- Method to get the Title fo the TOC page
        Get_toc_title: function () 
        {
            var Toc_title = browser.getTitle();
            console.log(Toc_title);
            Toc_title.should.containEql('FED2 Segment 1 TOC');
        },
        //-- Method to check if Hero imageis visible on TOC page
        Hero_image_visibility: function (image) 
        {
            var image = browser.isVisible(image);
            console.log(image);
            assert.equal(image, true);

        },
        //-- Method to check for the Grids below the Hero image
        Masonarygrid_visibility: function (masonarygrid) 
        {
            var masonarygrid = browser.isVisible(masonarygrid);
            console.log(masonarygrid);
            assert.equal(masonarygrid, true);
        },
        //-- Method to check if See More button is working
        Seemore_working: function (seemore) 
        {
            browser.leftClick(seemore);
            browser.pause(1000);
        },
       
    }
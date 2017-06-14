var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
var Page = require('./../../page');
var rootPath = path.normalize(__dirname)
var input = require('./../../config/Webmd-tv')[argv.env];
var url = input.adlayout;
var adlayout = Object.create(Page, {

    video: { get: function () { return browser.element("//video[@class='akamai-html5 akamai-media-element']"); } },
    ad: { get: function () { return browser.element("//div[@id='otherAd_fmt']//div[@id='ads2-pos-131-rr_ad']"); } },


    open: {
        value: function () {
            Page.open.call(this, url);
        }
    },

});
module.exports = adlayout

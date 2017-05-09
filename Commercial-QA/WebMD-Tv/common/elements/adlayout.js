var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
var Page = require('./../../../common/page');
var rootPath = path.normalize(__dirname)
var input = require('./../../config/Webmd-tv')[argv.env];
var url = input.adlayout;
var adlayout = Object.create(Page, {
    /**
     * define elements
     */
    video: { get: function () { return browser.element("//video[@class='akamai-html5 akamai-media-element']"); } },
    ad: { get: function () { return browser.element("//div[@id='google_ads_iframe_/8668145/consumer/webmd_0__container__']"); } },

    /**
* define or overwrite page methods
*/
    open: {
        value: function () {
            Page.open.call(this, url);
        }
    },
    /*submit: { value: function() {
        this.form.submitForm();
    } },*/

});
module.exports = adlayout

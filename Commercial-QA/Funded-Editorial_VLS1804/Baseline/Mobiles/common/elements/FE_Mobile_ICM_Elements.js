var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname);
var page = require('../../page');
var testData = require('../../config/FE_Mobile.testdata')[argv.env];
var tocElements = Object.create(page, {
    // Define elements
    icm_wedgit: { get: function() { return browser.element('//div [@id="sb-test-isi-01"]') } },
    from_sponsor_toolTip: { get: function() { return browser.element("//div[@class='wtip icm-sponsoredtip wtip-top wtip-active']") } },
    from_sponsor_toolTip_close: { get: function() { return browser.element("//div[@class='wtip icm-sponsoredtip wtip-top wtip-active']/a[@class='wtip-close']") } },
    your_brand_image: { get: function() { return browser.element('//div [@id="sb-test-isi-01"]//div [@class="icm_sponsored"]/img'); } },
    icm_sponsored: { get: function() { return browser.element('//div [@id="sb-test-isi-01"]//div [@class="icm_sponsored"]//a [@id="link"]'); } },
    icm_sponsored_brand: { get: function() { return browser.element('//div [@id="sb-test-isi-01"]//div [@class="icm_sponsored"]/img'); } },
    icm_sponsored_title: { get: function() { return browser.element('//div [@id="sb-test-isi-01"]//div [@class="icm-float-group"]//h3'); } },
    icm_sponsored_title_link: { get: function() { return browser.element('//div [@id="sb-test-isi-01"]//div [@class="icm-float-group"]//a'); } },
    icm_image: { get: function() { return browser.element('//div [@id="sb-test-isi-01"]//div [@class="icm_image"]'); } },
    icm_sponsored_image: { get: function() { return browser.element('//div [@id="sb-test-isi-01"]//div [@class="icm_image"]//img'); } },
    icm_sponsored_image_link: { get: function() { return browser.element('//div [@id="sb-test-isi-01"]//div [@class="icm_image"]//a'); } },
    icm_learn_more_link: { get: function() { return browser.element('//div [@id="sb-test-isi-01"]//div [@class="icm_action"]//a'); } },
    action_link: { get: function() { return browser.element('//div [@id="sb-test-isi-01"]//div [@class="icm_action"]/p[@class="action_link"]'); } },

    // Define or overwrite page methods
    open: {
        value: function() {
            page.open.call(this, testData.icm_url)
        }
    },
    icm_css_properties: { get: function() { return testData.icm_css_properties } },
});
module.exports = tocElements
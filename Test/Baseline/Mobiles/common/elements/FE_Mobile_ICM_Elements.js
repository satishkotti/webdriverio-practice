var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname);
var page = require('../../../../page');
var testData = require('../../config/FE_Mobile.testdata')[argv.env];
var icmElements = Object.create(page, {
    // Define elements
    page_header: { get: function() { return browser.element('//header [@class="page-header"]') } },
    from_sponsor_toolTip: { get: function() { return browser.element("//div[@class='wtip icm-sponsoredtip wtip-top wtip-active']") } },
    from_sponsor_toolTip_close: { get: function() { return browser.element("//div[@class='wtip icm-sponsoredtip wtip-top wtip-active']/a[@class='wtip-close']") } },

    //CW
    icm_cw_sponsored: { get: function() { return browser.element('//div [@class="icm_wrap large"]//div [@class="icm_sponsored"]/a'); } },
    icm_cw_your_brand_image: { get: function() { return browser.element('//div [@class="icm_wrap small"]//div [@class="icm_sponsored"]/img'); } },
    icm_cw_sponsored: { get: function() { return browser.element('//div [@class="icm_wrap small"]//div [@class="icm_sponsored"]//a [@id="link"]'); } },
    icm_cw_sponsored_brand: { get: function() { return browser.element('//div [@class="icm_wrap small"]//div [@class="icm_sponsored"]/img'); } },
    icm_cw_sponsored_title: { get: function() { return browser.element('//div [@class="icm_wrap small"]//div [@class="icm-float-group"]//h3'); } },
    icm_cw_sponsored_title_link: { get: function() { return browser.element('//div [@class="icm_wrap small"]//div [@class="icm-float-group"]//a'); } },
    icm_cw_image: { get: function() { return browser.element('//div [@class="icm_wrap small"]//div [@class="icm_image"]'); } },
    icm_cw_sponsored_image: { get: function() { return browser.element('//div [@class="icm_wrap small"]//div [@class="icm_image"]//img'); } },
    icm_cw_sponsored_image_link: { get: function() { return browser.element('//div [@class="icm_wrap small"]//div [@class="icm_image"]//a'); } },
    icm_cw_learn_more_link: { get: function() { return browser.element('//div [@class="icm_wrap small"]//div [@class="icm_action"]//a'); } },
    icm_cwaction_link: { get: function() { return browser.element('//div [@class="icm_wrap small"]//div [@class="icm_action"]/p[@class="action_link"]'); } },


    // RR
    icm_rr_sponsored: { get: function() { return browser.element('//div [@class="icm_wrap small"]//div [@class="icm_sponsored"]/a'); } },
    icm_rr_your_brand_image: { get: function() { return browser.element('//div [@class="icm_wrap small"]//div [@class="icm_sponsored"]/img'); } },
    icm_rr_sponsored: { get: function() { return browser.element('//div [@class="icm_wrap small"]//div [@class="icm_sponsored"]//a [@id="link"]'); } },
    icm_rr_sponsored_brand: { get: function() { return browser.element('//div [@class="icm_wrap small"]//div [@class="icm_sponsored"]/img'); } },
    icm_rr_sponsored_title: { get: function() { return browser.element('//div [@class="icm_wrap small"]//div [@class="icm-float-group"]//h3'); } },
    icm_rr_sponsored_title_link: { get: function() { return browser.element('//div [@class="icm_wrap small"]//div [@class="icm-float-group"]//a'); } },
    icm_rr_image: { get: function() { return browser.element('//div [@class="icm_wrap small"]//div [@class="icm_image"]'); } },
    icm_rr_sponsored_image: { get: function() { return browser.element('//div [@class="icm_wrap small"]//div [@class="icm_image"]//img'); } },
    icm_rr_sponsored_image_link: { get: function() { return browser.element('//div [@class="icm_wrap small"]//div [@class="icm_image"]//a'); } },
    icm_rr_learn_more_link: { get: function() { return browser.element('//div [@class="icm_wrap small"]//div [@class="icm_action"]//a'); } },
    icm_rr_action_link: { get: function() { return browser.element('//div [@class="icm_wrap small"]//div [@class="icm_action"]/p[@class="action_link"]'); } },

    // Define or overwrite page methods
    open: {
        value: function() {
            page.open.call(this, testData.icm_url)
        }
    }
});
module.exports = icmElements
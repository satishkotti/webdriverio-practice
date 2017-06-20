// PPE-115316
var argv = require("yargs").argv,
    path = require('path'),
    rootPath = path.normalize(__dirname),
    page = require('../../../../page'),
    testData = require('../../config/Jira_testdata')[argv.env];

var slideShow_elements = Object.create(page, {

    page_header: { get: function() { browser.element('//header[@class="page-header"]/h1') } },
    // header_faceBook: { get: function() { return browser.element("//header[@class='page-header']//div[@class='plugin plugin-socialshare']/a[contains(@class, 'plugin-socialshare-facebook')]") } },
    // header_twitter: { get: function() { return browser.element("//header[@class='page-header']//div[@class='plugin plugin-socialshare']/a[contains(@class, 'plugin-socialshare-twitter')]") } },
    // header_pinterest: { get: function() { return browser.element("//header[@class='page-header']//div[@class='plugin plugin-socialshare']/a[contains(@class, 'plugin-socialshare-pinterest')]") } },
    // header_email: { get: function() { return browser.element("//header[@class='page-header']//div[@class='plugin plugin-socialshare']/a[contains(@class, 'plugin-socialshare-email')]") } },

    slide_image: { value: function(n) { return browser.element('//div[contains(@class, "webmd-tool-slideshow")]//div[@class="bx-viewport"]//div[@class="slides"]//div [@class="slide"][' + n + ']//div [@class="image"]/img'); } },
    slide_title: { value: function(n) { return browser.element('//div[contains(@class, "webmd-tool-slideshow")]//div[@class="bx-viewport"]/div[@class="slides"]//div [@class="slide"][' + n + ']//div [@class="caption"]/h2') } },
    slide_description: { value: function(n) { return browser.element('//div[contains(@class, "webmd-tool-slideshow")]//div[@class="bx-viewport"]/div[@class="slides"]//div [@class="slide"][' + n + ']//div [@class="caption"]/h2') } },
    slide_current: { value: function(n) { return browser.element('//div[contains(@class, "webmd-tool-slideshow")]//div[@class="bx-viewport"]/div[@class="slides"]//div [@class="slide"][' + n + ']//div [@class="caption"]/div[@class="slide-count"]/span[@class="current"]'); } },
    primary_controls_next: { get: function() { return browser.element("//div[@class='controls primary']//a[2]/i") } },
    primary_controls_previous: { get: function() { return browser.element("//div[@class='controls primary']//a[1]/i") } },
    secondary_controls_next: { get: function() { return browser.element("//div[@class='controls secondary']//a[2]/i") } },
    secondary_controls_previous: { get: function() { return browser.element("//div[@class='controls secondary']//a[1]/i") } },

    total_slides: { get: function() { return browser.element("//div[@id='dyn-ss']//div[@class='bx-wrapper']//div[@class='bx-viewport']//div[@class='slides']/div") } },
    all_slides: { get: function() { return browser.element("//div[@id='dyn-ss']//div[@class='bx-wrapper']//div[@class='bx-viewport']//div[@class='slides']/div") } },
    slide_show: { get: function() { return browser.element("//*[@class='webmd-tool-slideshow']") } },
    primary_controls_previous_is_show: { get: function() { return browser.element("//div[contains(@class, 'webmd-tool-slideshow')]//div[@class='controls primary']//a[1]") } },

    //All Slides elements
    all_slider_wrapper: { get: function() { return browser.element(".//div[contains(@class, 'webmd-tool-slideshow')]//div[contains(@class, 'slides owl-carousel')]") } },
    all_slider_slide: { value: function(n) { return browser.element("//div[contains(@class, 'webmd-tool-slideshow')]//div[contains(@class, 'slides owl-carousel')]//div[@class='owl-stage']/div") } },

    all_slider_small_image: { value: function(n) { return browser.element("//div[contains(@class, 'slides owl-carousel')]//div[@class='owl-stage']/div[" + n + "]/div[@class='slide small-image']/div[@class='caption']//div[@class='image']/img"); } },
    all_slider_small_image_title: { value: function(n) { return browser.element("//div[contains(@class, 'slides owl-carousel')]//div[@class='owl-stage']/div[" + n + "]/div[@class='slide small-image']/div[@class='caption']/h2"); } },
    all_slider_small_image_description: { value: function(n) { return browser.element("//div[contains(@class, 'slides owl-carousel')]//div[@class='owl-stage']/div[" + n + "]/div[@class='slide small-image']/div[@class='caption']/p"); } },
    all_slider_small_image_current: { value: function(n) { return browser.element("//div[contains(@class, 'slides owl-carousel')]//div[@class='owl-stage']/div[" + n + "]/div[@class='slide small-image']/div[@class='caption']/div[@class='slide-count']/span[@class='current']"); } },

    all_slider_image: { value: function(n) { return browser.element("//div[contains(@class, 'slides owl-carousel')]//div[@class='owl-stage']/div[" + n + "]/div[@class='slide']/div[@class='image']//img"); } },
    all_slider_image_title: { value: function(n) { return browser.element("//div[contains(@class, 'slides owl-carousel')]//div[@class='owl-stage']/div[" + n + "]/div[@class='slide']/div[@class='caption']/h2"); } },
    all_slider_image_description: { value: function(n) { return browser.element("//div[contains(@class, 'slides owl-carousel')]//div[@class='owl-stage']/div[" + n + "]/div[@class='slide']/div[@class='caption']/p"); } },
    all_slider_image_current: { value: function(n) { return browser.element("//div[contains(@class, 'slides owl-carousel')]//div[@class='owl-stage']/div[" + n + "]/div[@class='slide']/div[@class='caption']/div[@class='slide-count']/span[@class='current']"); } },

    all_slider_sponsored_ad: { value: function(n) { return browser.element("//div[contains(@class, 'slides owl-carousel')]//div[@class='owl-stage']/div[" + n + "]/div[contains(@class, 'slide sponsored')]/div[@class='image']//img"); } },
    all_slider_sponsored_ad_title: { value: function(n) { return browser.element("//div[contains(@class, 'slides owl-carousel')]//div[@class='owl-stage']/div[" + n + "]/div[contains(@class, 'slide sponsored')]/div[@class='caption']/h2"); } },
    all_slider_sponsored_ad_description: { value: function(n) { return browser.element("//div[contains(@class, 'slides owl-carousel')]//div[@class='owl-stage']/div[" + n + "]/div[contains(@class, 'slide sponsored')]/div[@class='caption']/p"); } },
    all_slider_sponsored_ad_current: { value: function(n) { return browser.element("//div[contains(@class, 'slides owl-carousel')]//div[@class='owl-stage']/div[" + n + "]/div[contains(@class, 'slide sponsored')]/div[@class='caption']/div[@class='slide-count']/span[@class='current']"); } },

    all_slider_large_image: { value: function(n) { return browser.element("//div[contains(@class, 'slides owl-carousel')]//div[@class='owl-stage']/div[" + n + "]/div[@class='slide large-image']/div[@class='image']//img"); } },
    all_slider_large_image_title: { value: function(n) { return browser.element("//div[contains(@class, 'slides owl-carousel')]//div[@class='owl-stage']/div[" + n + "]/div[@class='slide large-image']/div[@class='caption']/h2"); } },
    all_slider_large_image_description: { value: function(n) { return browser.element("//div[contains(@class, 'slides owl-carousel')]//div[@class='owl-stage']/div[" + n + "]/div[@class='slide large-image']/div[@class='caption']/p"); } },
    all_slider_large_image_current: { value: function(n) { return browser.element("//div[contains(@class, 'slides owl-carousel')]//div[@class='owl-stage']/div[" + n + "]/div[@class='slide large-image']/div[@class='caption']/div[@class='slide-count']/span[@class='current']"); } },

    slider_no_image: { value: function(n) { return browser.element("//div[contains(@class, 'slides owl-carousel')]//div[@class='owl-stage']/div[" + n + "]/div[@class='slide no-image']/div[@class='image']"); } },
    all_slider_no_image: { value: function(n) { return browser.element("//div[contains(@class, 'slides owl-carousel')]//div[@class='owl-stage']/div[" + n + "]/div[@class='slide no-image']/div[@class='image']/img"); } },
    all_slider_no_image_title: { value: function(n) { return browser.element("//div[contains(@class, 'slides owl-carousel')]//div[@class='owl-stage']/div[" + n + "]/div[@class='slide no-image']/div[@class='caption']/h2"); } },
    all_slider_no_image_description: { value: function(n) { return browser.element("//div[contains(@class, 'slides owl-carousel')]//div[@class='owl-stage']/div[" + n + "]/div[@class='slide no-image']/div[@class='caption']/p"); } },
    all_slider_no_image_current: { value: function(n) { return browser.element("//div[contains(@class, 'slides owl-carousel')]//div[@class='owl-stage']/div[" + n + "]/div[@class='slide no-image']/div[@class='caption']/div[@class='slide-count']/span[@class='current']"); } },

    all_slider_sponsored_int_ad: { value: function(n) { return browser.element("//div[contains(@class, 'slides owl-carousel')]//div[@class='owl-stage']/div[" + n + "]/div[contains(@class, 'slide sponsored int-ad')]"); } },
    //Large Slides elements
    large_slider_wrapper: { get: function() { return browser.element(".//div[contains(@class, 'webmd-tool-slideshow')]//div[@class='bx-viewport']/div[@class='slides']") } },
    large_slider_slide: { get: function() { return browser.element(".//div[contains(@class, 'webmd-tool-slideshow')]//div[@class='bx-viewport']/div[@class='slides']/div[contains(@class, 'slide')][i]") } },
    // Disclaimer and Source content
    disclaimer: { get: function() { return browser.element("//div[@class='sources']//div[@class='sources-right']//p[@class='disclaimer']") } },
    source: { get: function() { return browser.element(".//div[@class='sources']//div[@class='sources-left']/p[1]") } },
    source_link: { get: function() { return browser.element(".//div[@class='sources']//div[@class='sources-left']//p/a[@class='source-toggle']") } },
    source_content: { get: function() { return browser.element(".//div[@class='source-content']") } },

    // Define or overwrite page methods
    open: {
        value: function() {
            page.open.call(this, testData.slideShow_url);
        }
    }
});

module.exports = slideShow_elements;
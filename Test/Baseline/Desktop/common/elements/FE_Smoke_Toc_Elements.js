var Page = require('../../../../page');
var toc_page = Object.create(Page, {
    //image
    image: { get: function() { return browser.element('//div [@class="toc-hero-left-col"]//div [@class="toc-hero-item"]//div [@class="toc-hero-img"]//a [@class="toc-img-link type_art"]/img'); } },
    //masonarygrid
    masonarygrid: { get: function() { return browser.element('//section [@id="s2"]//div [@id="ContentPane17"]//div [@class="wbmd-masonry-grid"]'); } },
    //seemore
    seemore: { get: function() { return browser.element('//section [@id="s6"]//div [@id="ContentPane54"]//div [@class="see-all-link"]/a'); } },
    //loe
    loe: { get: function() { return browser.element('//div [@id="ContentPane11"]//div [@class="ed_disclaimer"]'); } },
    //logo
    logo: { get: function() { return browser.element('//div[1] [@class="masthead-sitelogo-wrapper"]//a [@class="masthead-sitelogo-link"]//img [@class="masthead-sitelogo"]'); } },
    //textelementforsearch
    textelementforsearch: { get: function() { return browser.element('//div [@id="masthead-search-wrapper"]//input [@class="masthead-search-input typeahead-search"]'); } },
    //headerad
    headerad: { get: function() { return browser.element('//div [@id="bannerAd_rdr"]//div [@id="bannerAd_fmt" ]'); } },
    //facebookicon
    facebookicon: { get: function() { return browser.element('//div [@class="plugin plugin-socialshare"]//a [@class="plugin-socialshare-link plugin-socialshare-facebook"]'); } },
    //twittericon
    twittericon: { get: function() { return browser.element('//div [@class="plugin plugin-socialshare"]//a [@class="plugin-socialshare-link plugin-socialshare-twitter"]'); } },
    //pinteresticon
    pintresticon: { get: function() { return browser.element('//div [@class="plugin plugin-socialshare"]//a [@class="plugin-socialshare-link plugin-socialshare-pinterest"]'); } },
    //emailicon
    emailicon: { get: function() { return browser.element('//div [@class="plugin plugin-socialshare"]//a [@class="plugin-socialshare-link plugin-socialshare-email"]'); } },
    //healthmi
    healthmi: { get: function() { return browser.element('//li [@class="masthead-nav-channel masthead-channel-az"]//a [@class="masthead-channel-link"]//span [@class="masthead-channel-name"]'); } },
    //drugmi
    drugmi: { get: function() { return browser.element('//li [@class="masthead-nav-channel masthead-channel-drugs"]//a [@class="masthead-channel-link"]//span [@class="masthead-channel-name"]'); } },
    //livingmi
    livingmi: { get: function() { return browser.element('//li [@class="masthead-nav-channel masthead-channel-lh"]//a [@class="masthead-channel-link"]//span [@class="masthead-channel-name"]'); } },
    //familymi
    familymi: { get: function() { return browser.element('//li [@class="masthead-nav-channel masthead-channel-fp"]//a [@class="masthead-channel-link"]//span [@class="masthead-channel-name"]'); } },
    //newsmi
    newsmi: { get: function() { return browser.element('//li [@class="masthead-nav-channel masthead-channel-news"]//a [@class="masthead-channel-link"]//span [@class="masthead-channel-name"]'); } },
});
module.exports = toc_page
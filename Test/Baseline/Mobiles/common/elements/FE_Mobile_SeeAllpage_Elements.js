var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
var Page = require('./../../../../../page');
var sap_page = Object.create(Page, {
    //Masthead _burger
    masthead_burger: { get: function() { return browser.element("//div[@class='masthead-nav-burgericon']/span[1]"); } },
    //seeallgrid
    seeallgrid: { get: function() { return browser.element('//div [@id="art"]//div [@class="article-content"]//div [@class="see-all-items non-spon"]'); } },
    //pageheader
    pageheader: { get: function() { return browser.element('//div [@id="ContentPane12"]//header [@class="page-header"]/h1'); } },
    //breadcrumb
    breadcrumb: { get: function() { return browser.element('//section [@class="breadcrumb"]//h6 [@class="category"]//span [@class="level_1"]/a'); } },
    //loe
    loe: { get: function() { return browser.element('//section [@id="s2"]//div [@id="ContentPane11"]//div [@class="ed_disclaimer"]'); } },
    //logo
    logo: { get: function() { return browser.element('//div[1] [@class="masthead-sitelogo-wrapper"]//a [@class="masthead-sitelogo-link"]//img [@class="masthead-sitelogo"]'); } },
    //textelementforsearch
    textelementforsearch: { get: function() { return browser.element('//div [@id="masthead-search-wrapper"]//input [@class="masthead-search-input typeahead-search"]'); } },
    //headerad
    headerad: { get: function() { return browser.element('//div [@id="bannerAd_rdr"]//div [@id="bannerAd_fmt"]'); } },
    //asidead
    asidead: { get: function() { return browser.element('//div [@id="ContentPane30"]//div [@id="rightAd_rdr"]'); } },
    //facebookicon
    facebookicon: { get: function() { return browser.element('//div [@class="plugin plugin-socialshare"]//a [@class="plugin-socialshare-link plugin-socialshare-facebook"]'); } },
    //twittericon
    twittericon: { get: function() { return browser.element('//div [@class="plugin plugin-socialshare"]//a [@class="plugin-socialshare-link plugin-socialshare-twitter"]'); } },
    //pintresticon
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
module.exports = sap_page
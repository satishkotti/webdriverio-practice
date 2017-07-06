var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
var page = require('../../../../page');
//var input = require('./../../config/PPE-101748.testdata')[argv.env];
//var url = input.environment;
var Elements = Object.create(page, {

    //Masthead _burger
    masthead_burger: { get: function () { return browser.element("//div[@class='masthead-nav-burgericon']/span[1]"); } },

    //masthead_logo
    masthead_logo: { get: function () { return browser.element("//*[@id='masthead']//img") } },

    // masthead_search
    masthead_search: { get: function () { return browser.element("//a[@class='masthead-nav-mobile-search-icon mobile-search-icon-open']") } },

    //Top Banner Ad
    TopAd: { get: function () { return browser.element(".//*[@class='ad_rdr top_ad_rdr']") } },

    //Breadcrumb
    Breadcrumb: { get: function () { return browser.element("//section[@class='breadcrumb']/h6/span/a"); } },


    //LOE
    LOE: { get: function () { return browser.element("//div[@class='ed_disclaimer']"); } },

    //Header  sharebar
    sharebar_scroll: { get: function () { return browser.element(".//*[@id='fed-sharebar']/div[1]"); } },
    twitter: { get: function () { return browser.element(".//*[@id='fed-sharebar']/div[1]/a[1]"); } },
    pintrest: { get: function () { return browser.element(".//*[@id='fed-sharebar']/div[1]/a[2]"); } },
    facebook: { get: function () { return browser.element(".//*[@id='fed-sharebar']/div[1]/a[3]"); } },
    email: { get: function () { return browser.element(".//*[@id='fed-sharebar']/div[1]/a[4]"); } },
    /* * define or overwrite page methods
    /* */


    //kabob
    kabob: { get: function () { return browser.element('//div[@class="wbmd-kabob"]'); } },
    kabob_segment: { get: function () { return browser.element('div.up-next-container.clone > div.wbmd-segment'); } },
    kabob_subhead: { get: function () { return browser.element('div.up-next-container.clone > div.wbmd-subhead'); } },
    kabob_seeall: { get: function () { return browser.element('div.up-next-container.clone > div.wbmd-see-all > a'); } },
    kabob_close: { get: function () { return browser.element('//div[@class="wbmd-menu-close"]'); } },

    //Footer sharebar
    footer_Scroll: { get: function () { return browser.element(".footer-container"); } },
    footer_twitter: { get: function () { return browser.element("//*[@id='fed-sharebar-btm']/div[1]/a[1]"); } },
    footer_pintrest: { get: function () { return browser.element("//*[@id='fed-sharebar-btm']/div[1]/a[2]"); } },
    footer_facebook: { get: function () { return browser.element("//*[@id='fed-sharebar-btm']/div[1]/a[3]"); } },
    footer_email: { get: function () { return browser.element("//*[@id='fed-sharebar-btm']/div[1]/a[4]"); } },

    //Sticky header socialshareIcons
    sticky_Header_twitter: { get: function () { return browser.element(".//*[@id='fed-sharebar-btm']/div[1]/a[1]"); } },
    sticky_Header_pintrest: { get: function () { return browser.element(".//*[@id='fed-sharebar-btm']/div[1]/a[2]"); } },
    sticky_Header_facebook: { get: function () { return browser.element(".//*[@id='fed-sharebar-btm']/div[1]/a[3]"); } },
    sticky_Header_email: { get: function () { return browser.element(".//*[@id='fed-sharebar-btm']/div[1]/a[4]"); } },
    sticky_kabob: { get: function () { return browser.element('//*[@id="ContentPane14"]/div[1]//div[@class="wbmd-kabob"]'); } },
    //Sticky for scrolling
    sticky_Header_Scroll: { get: function () { return browser.element('//article [@id="textArea"]//div [@class="social-share-tools"]//div [@class="plugin plugin-socialshare"]'); } },

    //Paddle Next and previous navigations
    paddle_next: { get: function () { return browser.element("a.next > span"); } },
    paddle_previous: { get: function () { return browser.element("a.prev > span"); } },
    paddle_nav: { get: function () { return browser.element("//h3[@class='wbmd-moreabout-title']"); } },
    paddle_next_page_title: { get: function () { return browser.element('.//*[@class="wbmd-paddles mlr"]/.//*[.="OTC Medicines for Cough: What You Need to Know"]'); } },

    bottom_ad_rdr: { get: function () { return browser.element('//div[@class="ad_rdr bottom_ad_rdr"]'); } },
    lazy_load_ad: { get: function () { return browser.element('//*[@id="lazy-load-ad-2"]'); } },

    //footer
    footer_head: { get: function () { return browser.element('//*[@id="textArea"]/footer/p'); } },
    footer_reviewed: { get: function () { return browser.element('//*[@id="textArea"]/footer//p[@class="reviewed"]'); } },
    footer_sources: { get: function () { return browser.element('//*[@id="textArea"]/footer//p[@class="source_intro"]/a'); } },
    footer_copyright: { get: function () { return browser.element('//*[@id="textArea"]/footer//p[@class="copyright"]'); } },
    //footer scrolling
    footer_Scroll: { get: function () { return browser.element("//h3[@class='wbmd-moreabout-title']"); } },
    // hamburger links
    HealthA_Z: { get: function () { return browser.element('//li[@class="masthead-nav-channel masthead-channel-az"]/a/span[1]'); } },
    Drugs_Supplements: { get: function () { return browser.element('//li[@class="masthead-nav-channel masthead-channel-drugs"]/a/span[1]'); } },
    Living_healthy: { get: function () { return browser.element('li.masthead-nav-channel.masthead-channel-lh > a > span.masthead-channel-name'); } },
    Family_Pregnancy: { get: function () { return browser.element('//li[@class="masthead-nav-channel masthead-channel-fp"]/a/span[1]'); } },
    News_Experts: { get: function () { return browser.element('//li[@class="masthead-nav-channel masthead-channel-news"]/a/span[1]'); } },
    Mobile_Apps: { get: function () { return browser.element('//li[@class="masthead-nav-channel masthead-nav-mobile-mobileapps-wrapper"]/a/span[1]'); } },
});

module.exports = Elements
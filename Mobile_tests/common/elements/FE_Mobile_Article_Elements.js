var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
var Page = require('./../../../prdemo/page');
//var input = require('./../../config/PPE-101748.testdata')[argv.env];
//var url = input.environment;
var Elements = Object.create(Page, {
    /**
     * define elements
     */
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
    LOE: { get: function () { return browser.element(".//*[@id='ContentPane11']"); } },
    
    //Header  sharebar
    twitter: { get: function () { return browser.element("//div[@id='fed-sharebar']//a[@class='plugin-socialshare-link plugin-socialshare-twitter']"); } },
    pintrest: { get: function () { return browser.element('//div[@id="fed-sharebar"]//a[@class="plugin-socialshare-link plugin-socialshare-pinterest"]'); } },
    facebook: { get: function () { return browser.element('//div[@id="fed-sharebar"]//a[@class="plugin-socialshare-link plugin-socialshare-facebook"]'); } },
    email: { get: function () { return browser.element('//div[@id="fed-sharebar"]//a[@class="plugin-socialshare-link plugin-socialshare-email"]'); } },
    /* * define or overwrite page methods
    /* */


//kabob
kabob: { get: function () { return browser.element('//*[@id="ContentPane14"]/div[@@class="wbmd-kabob"]'); } },

    //Footer sharebar
    footer_twitter: { get: function () { return browser.element("//*[@id='fed-sharebar-btm']/div[1]/a[1]"); } },
    footer_pintrest: { get: function () { return browser.element("//*[@id='fed-sharebar-btm']/div[1]/a[2]"); } },
    footer_facebook: { get: function () { return browser.element("//*[@id='fed-sharebar-btm']/div[1]/a[3]"); } },
    footer_email: { get: function () { return browser.element("//*[@id='fed-sharebar-btm']/div[1]/a[4]"); } },

    //Sticky header socialshareIcons
    sticky_Header_twitter: { get: function () { return browser.element("//div[@class='share']//a[@class='plugin-socialshare-link plugin-socialshare-twitter']"); } },
    sticky_Header_pintrest: { get: function () { return browser.element('//div[@class="share"]//a[@class="plugin-socialshare-link plugin-socialshare-pinterest"]'); } },
    sticky_Header_facebook: { get: function () { return browser.element('//div[@class="share"]//a[@class="plugin-socialshare-link plugin-socialshare-facebook"]'); } },
    sticky_Header_email: { get: function () { return browser.element('//div[@class="share"]//a[@class="plugin-socialshare-link plugin-socialshare-email"]'); } },
    sticky_kabob: { get: function () { return browser.element('//*[@id="ContentPane14"]/div[1]//div[@class="wbmd-kabob"]'); } },
    //Sticky for scrolling
    sticky_Header_Scroll: { get: function () { return browser.element('//*[@id="ContentPane64"]/div/div/div[1]/p'); } },

    //Paddle Next and previous navigations
    paddle_next: { get: function () { return browser.element('.//*[@class="wbmd-paddles mlr"]/.//*[@class="article-nav show"]/.//*[@class="next "]'); } },
    paddle_previous: { get: function () { return browser.element('.//*[@class="wbmd-paddles mlr"]/.//*[@class="article-nav show"]/.//*[@class="prev "]'); } },
    paddle_previous_page_title: { get: function () { return browser.element('.//*[@class="wbmd-paddles mlr"]/.//*[.="8 Reasons Your Cough Is Not Improving"]'); } },
    paddle_next_page_title: { get: function () { return browser.element('.//*[@class="wbmd-paddles mlr"]/.//*[.="OTC Medicines for Cough: What You Need to Know"]'); } },

   bottom_ad_rdr: { get: function () { return browser.element('//div[@class="ad_rdr bottom_ad_rdr"]'); } },
    lazy_load_ad: { get: function () { return browser.element('//*[@id="lazy-load-ad-2"]'); } },
   

   footer_head:{ get: function () { return browser.element('//*[@id="textArea"]/footer/p'); } },
 footer_reviewed:{ get: function () { return browser.element('//*[@id="textArea"]/footer//p[@class="reviewed"]'); } },
 footer_sources:{ get: function () { return browser.element('//*[@id="textArea"]/footer//p[@class="source_intro"]/a'); } },
 footer_copyright:{ get: function () { return browser.element('//*[@id="textArea"]/footer//p[@class="copyright"]'); } },


 HealthA_Z:{ get: function () { return browser.element('//li[@class="masthead-nav-channel masthead-channel-az"]/a/span[1]'); } },
 Drugs_Supplements:{ get: function () { return browser.element('//li[@class="masthead-nav-channel masthead-channel-drugs"]/a/span[1]'); } },
 Living_healthy:{ get: function () { return browser.element('li[@class="masthead-nav-channel masthead-channel-lh"]/a/span[1]'); } },
 Family_Pregnancy:{ get: function () { return browser.element('//li[@class="masthead-nav-channel masthead-channel-fp"]/a/span[1]'); } },


 News_Experts:{ get: function () { return browser.element('//li[@class="masthead-nav-channel masthead-channel-news"]/a/span[1]'); } },
 Mobile_Apps:{ get: function () { return browser.element('//li[@class="masthead-nav-channel masthead-nav-mobile-mobileapps-wrapper"]/a/span[1]'); } },
 kabob_segment:{ get: function () { return browser.element('//div[@class="wbmd-segment"]'); } },
 kabob_subhead:{ get: function () { return browser.element('//div[@class="wbmd-subhead"]'); } },
 kabob_seeall:{ get: function () { return browser.element('//div[@class="wbmd-see-all"]/a'); } },
 kabob_close:{ get: function () { return browser.element('//div[@class="wbmd-menu-close"]'); } },


});

module.exports = Elements
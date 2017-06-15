var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
var Page = require('./../../../../../page');
var input = require('./../../config/FE.testdata')[argv.env];
//var url = input.Article_url;

var socialshareIcons = Object.create(Page, {
    /**
     * define elements
     */
    //Masthead 
    masthead: { get: function () { return browser.element("//div[@id='ContentPane2']//nav[@class='masthead-nav']"); } },
    //Top Banner Ad
    TopAd: { get: function () { return browser.element(".//*[@id='bannerAd_fmt']") } },

    // Right AD
    RightAd: { get: function () { return browser.element(".//*[@id='rightAd_rdr']") } },

    //Right Rail (Partial only)
    RRail: { get: function () { return browser.element(".//*[@id='ContentPane29']"); } },


    //Brand attribution
    Battribution: { get: function () { return browser.element(".//*/div[@class='attrib_right_fmt']/.//*[@class='link_fmt']") } },
    Battribution_content: { get: function () { return browser.element(".//*[@class='link_fmt']") } },
    Battribution_Sticky: { get: function () { return browser.element(".//*[@class='tools']/.//*[@class='client-logo']") } },

    //----------- Continued....

    tooltip_imag: { get: function () { return browser.element(".//*[@id='ContentPane']/div/div/div[1]/img"); } },
    tooltip_disclaimer: { get: function () { return browser.element(".//*[@id='ContentPane']/div/div/div[2]"); } },
    tooltip_text: { get: function () { return browser.element(".//*[@id='ContentPane']/div/div/div[3]"); } },
    tooltip_close: { get: function () { return browser.element("//a[@class='wtip-close']"); } },

    //Page Header Text
    Pageheader: { get: function () { return browser.element(".//*[@id='ContentPane12']/header/h1") } },
    //Paddles
    Paddles: { get: function () { return browser.element(".//*[@class='wbmd-paddles mlr'] ") } },
    //     -- .//*[@id='ContentPane66']/div/div"
    //Header  sharebar
    twitter: { get: function () { return browser.element('.//*[@id="fed-sharebar"]/div[1]/a[1]'); } },
    pintrest: { get: function () { return browser.element('//div[@id="fed-sharebar"]//a[@class="plugin-socialshare-link plugin-socialshare-pinterest"]'); } },
    facebook: { get: function () { return browser.element('//div[@id="fed-sharebar"]//a[@class="plugin-socialshare-link plugin-socialshare-facebook"]'); } },
    email: { get: function () { return browser.element('//div[@id="fed-sharebar"]//a[@class="plugin-socialshare-link plugin-socialshare-email"]'); } },
    /* * define or overwrite page methods
    /* */

    //Footer sharebar
    footer_twitter: { get: function () { return browser.element("//*[@id='fed-sharebar-btm']/div[1]/a[1]"); } },
    footer_pintrest: { get: function () { return browser.element("//*[@id='fed-sharebar-btm']/div[1]/a[2]"); } },
    footer_facebook: { get: function () { return browser.element("//*[@id='fed-sharebar-btm']/div[1]/a[3]"); } },
    footer_email: { get: function () { return browser.element("//*[@id='fed-sharebar-btm']/div[1]/a[4]"); } },

    //Sticky header socialshareIcons
    sticky_Header_twitter: { get: function () { return browser.element('.//*[@id="ContentPane14"]/div[1]/div/div[3]/div/div/a[1]'); } },   
    sticky_Header_pintrest: { get: function () { return browser.element('.//*[@id="ContentPane14"]/div[1]/div/div[3]/div/div/a[2]'); } },
    sticky_Header_facebook: { get: function () { return browser.element('.//*[@id="ContentPane14"]/div[1]/div/div[3]/div/div/a[3]'); } },
    sticky_Header_email: { get: function () { return browser.element('//div [@id="fed-sharebar"]//div [@class="plugin plugin-socialshare"]//a [@class="plugin-socialshare-link plugin-socialshare-email"]'); } },

    //Sticky for scrolling
    sticky_Header_Scroll: { get: function () { return browser.element('//*[@id="ContentPane64"]/div/div/div[1]/p'); } },

    //Paddle Next and previous navigations
    paddle_next: { get: function () { return browser.element('.//*[@class="wbmd-paddles mlr"]/.//*[@class="next "]/.//*[contains(.,"Next")]/span[2]'); } },
    paddle_previous: { get: function () { return browser.element('.//*[@class="wbmd-paddles mlr"]/.//*[@class="prev "]/.//*[contains(.,"Prev")]/span[2]'); } },
    paddle_previous_page_title: { get: function () { return browser.element('.//*[@id="ContentPane29"]/.//*[@class="wbmd-nav-links"]//*[contains(.,"OTC Medicines for Cough: What You Need to Know")]/a'); } },
    //paddle_next_page_title: { get: function () { return browser.element('.//*[@id="ContentPane29"]/.//*[@class="wbmd-nav-links"]//*[contains(.,"8 Tips for Nighttime Cough Relief")]/a'); } },
    paddle_next_page_title: { get: function () { return browser.element('.//*[@id="ContentPane66"]/div/div/a[2]/span/span[2]'); } },

    //UP Next  Next and second navigations
  //  Up_next: { get: function () { return browser.element('.//*[@class="wbmd-nav-links"]/.//*[.="8 Tips for Nighttime Cough Relief"]'); } },
  Up_next: { get: function () { return browser.element('.//*[@id="ContentPane29"]/div[1]/div[3]/div[1]/a'); } },
    
    Up_next_second: { get: function () { return browser.element('.//*[@id="ContentPane29"]/div[1]/div[3]/div[1]/a'); } },



    //ISI Module

    ISI_module_Normal: { get: function () { return browser.element('.//*[@class="isi mlr"]'); } },
    ISI_module_Full: { get: function () { return browser.element('.//*[@class="isi mlr open"]'); } },
    ISI_module_Hidden: { get: function () { return browser.element('.//*[@class="isi mlr hide"]'); } },
    //            ------------------ ISI contents----------------------
    //Important safety information
    ISI_Title_text: { get: function () { return browser.element('.//*[@id="ContentPane47"]/div/div[1]/div/ul/li[1]/a'); } },
    //PRescribing Information
    ISI_Prescribing_Text: { get: function () { return browser.element('.//*[@id="ContentPane47"]/div/div[1]/div/ul/li[2]/a'); } },
    //Third Link
    ISI_module_Third_Link: { get: function () { return browser.element('.//*[@id="ContentPane47"]/div/div[1]/div/ul/li[3]/a'); } },


    //     ------------------   Masthead Links---------------------------------




    A_Z: { get: function () { return browser.element('.//*[@class="masthead-channel-link"]/.//*[contains(.,"HealthA-Z")]'); } },
    Drug: { get: function () { return browser.element('.//*[@class="masthead-channel-link"]/.//*[contains(.,"Drug")]'); } },
    Living_Healthy: { get: function () { return browser.element('.//*[@class="masthead-channel-link"]/.//*[contains(.,"Living")]'); } },
    Family_Module: { get: function () { return browser.element('.//*[@class="masthead-channel-link"]/.//*[contains(.,"Family")]'); } },
    News_Module: { get: function () { return browser.element('.//*[@class="masthead-channel-link"]/.//*[contains(.,"News")]'); } },


    //----------------------------------------------------
    //see more
    seemore: { get: function () { return browser.element(".//*[@id='ContentPane29']/div[1]/div[4]/a"); } },
    //funded_segment1
    funded_segment2: { get: function () { return browser.element(".//*[@id='ContentPane29']/div[2]/div[1]/div/a"); } },
    //funded_segment2
    funded_segment3: { get: function () { return browser.element(".//*[@id='ContentPane29']/div[2]/div[2]/div/a"); } },
    open: 
    {
        value: function () 
        {
            Page.open.call(this, url);
        }
    },


});

module.exports = socialshareIcons
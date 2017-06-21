var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
var Page = require('../../../../page');
var Commonlocators = Object.create(Page, {
    /**
     * define elements
     */
    //Header  sharebar
    twitter: { get: function() { return browser.element("//div[@id='fed-sharebar']//a[@class='plugin-socialshare-link plugin-socialshare-twitter']"); } },
    pintrest: { get: function() { return browser.element('//div[@id="fed-sharebar"]//a[@class="plugin-socialshare-link plugin-socialshare-pinterest"]'); } },
    facebook: { get: function() { return browser.element('//div[@id="fed-sharebar"]//a[@class="plugin-socialshare-link plugin-socialshare-facebook"]'); } },
    email: { get: function() { return browser.element('//div[@id="fed-sharebar"]//a[@class="plugin-socialshare-link plugin-socialshare-email"]'); } },
    /* * define or overwrite page methods
    /* */

    //Footer sharebar
    footer_twitter: { get: function() { return browser.element("//*[@id='fed-sharebar-btm']/div[1]/a[1]"); } },
    footer_pintrest: { get: function() { return browser.element("//*[@id='fed-sharebar-btm']/div[1]/a[2]"); } },
    footer_facebook: { get: function() { return browser.element("//*[@id='fed-sharebar-btm']/div[1]/a[3]"); } },
    footer_email: { get: function() { return browser.element("//*[@id='fed-sharebar-btm']/div[1]/a[4]"); } },

    //Sticky header socialshareIcons
    sticky_Header_twitter: { get: function() { return browser.element("//div[@class='share']//a[@class='plugin-socialshare-link plugin-socialshare-twitter']"); } },
    sticky_Header_pintrest: { get: function() { return browser.element('//div[@class="share"]//a[@class="plugin-socialshare-link plugin-socialshare-pinterest"]'); } },
    sticky_Header_facebook: { get: function() { return browser.element('//div[@class="share"]//a[@class="plugin-socialshare-link plugin-socialshare-facebook"]'); } },
    sticky_Header_email: { get: function() { return browser.element('//div[@class="share"]//a[@class="plugin-socialshare-link plugin-socialshare-email"]'); } },



    //masth thead elements

    HealthA_Z: { get: function() { return browser.element("//ul[@class='global-nav-links-container']/li[1]/a[1]"); } },
    Drugs_Supplements: { get: function() { return browser.element("//ul[@class='global-nav-links-container']/li[2]/a[1]"); } },
    Living_healthy: { get: function() { return browser.element("//ul[@class='global-nav-links-container']/li[3]/a[1]"); } },
    Family_Pregnancy: { get: function() { return browser.element("//ul[@class='global-nav-links-container']/li[4]/a[1]"); } },
    News_Experts: { get: function() { return browser.element("//ul[@class='global-nav-links-container']/li[5]/a[1]"); } },


    logo: { get: function() { return browser.element(".//*[@id='masthead']/nav/div[2]/a/img"); } },
    //Search 
    textelementforsearch: { get: function() { return browser.element(".//*[@id='masthead-search-wrapper']/input"); } },
    //bread crumb
    Breadcrumb: { get: function() { return browser.element(".//*[@id='ContentPane10']/section/h6/span/a"); } },

    //line of entitlement
    LOE: { get: function() { return browser.element("//div[@class='ed_disclaimer']"); } },
    LOE_link: { get: function() { return browser.element("//div[@class='ed_disclaimer']/a"); } },
    tooltip_imag: { get: function() { return browser.element(".//*[@id='ContentPane']/div/div/div[1]/img"); } },
    tooltip_disclaimer: { get: function() { return browser.element(".//*[@id='ContentPane']/div/div/div[2]"); } },
    tooltip_text: { get: function() { return browser.element(".//*[@id='ContentPane']/div/div/div[3]"); } },
    tooltip_close: { get: function() { return browser.element("//a[@class='wtip-close']"); } },


    //Right aatribution


    Right_attribution: { get: function() { return browser.element(".//*[@id='ContentPane40']/div[1]"); } },
    Right_attribution_imag: { get: function() { return browser.element("//img[@alt='Your Brand']"); } }

});


module.exports = Commonlocators
var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
var Page = require('./../../page');
var input = require('./../../config/PPE-88947.testdata')[argv.env];
var input = require('./../../config/PPE-101383.testdata')[argv.env];
var input = require('./../../config/PPE-107223.testdata')[argv.env];
var input = require('./../../config/MobileUI_Regression.testdata')[argv.env];
var input = require('./../../config/PPE-112347.testdata')[argv.env];

var url = input.environment;
var Commonlocators = Object.create(Page, {
    
    
    /*
      ******     Desktop Infinite Article page elements     ******
    */ 
    launchpoupclose: { get: function () { return browser.element("//div[@id='webmdHoverClose']"); } },   // Element is to locate close button in browser overlay
    launchpopup: { get: function () { return browser.element("div[id='webmdHoverContent']"); } },        // Element is to locate overlay 
        
    
    /* Pagination elements on article,TOC or Guide pages */
    
    lastpagenumber: { get: function () { return browser.element("//li[contains(@class,'page')][last()]"); } },  // Element is to locate last page number of an article page in pagination
    viewalllink: { get: function () { return browser.element("//li[@class='view-all']"); } },                   // Elementis to locate View All Link 
    previouspage: { get: function () { return browser.element("//li[contains(@class,'previous')]"); } },        // Element is to locate previous page link
    nextpage: { get: function () { return browser.element("//li[contains(@class,'next')]"); } },                // Element is to locate next page link
    activepage: { get: function () { return browser.element("//li[@class='page active']"); } },                 // Element to locate Active page     
    
    /* Share Through elements 
     All the below elements are locators for Share Through Ad modules Ex: 921 and Share Through stack units   
    */

    pos921rightad: { get: function () { return browser.element("//div[@id='ads2-pos-921-ad-right']"); } }, // Share Throgh Ad module locator in 2nd slot of Today WebMD section
    continuereadingbelow: { get: function () { return browser.element("//span[@class='st-continue-reading-below')]"); } },    // Element is to locate Continue reading below text on the page 
    ststackunitad1: { get: function () { return browser.element("//div[@id='ads2-pos-923-responsive-sharethrough-ad-page-1-1']"); } },  // Element is to locate 1st Ad unit in ShareThrough 3stack unit
    ststackunitad2: { get: function () { return browser.element("//div[@id='ads2-pos-924-responsive-sharethrough-ad-page-1-2']"); } },  // Element is to locate 2nd Ad unit in ShareThrough 3stack unit    
    ststackunitad3: { get: function () { return browser.element("//*[@id='EMBED-STR-ADUNIT-ads2-pos-925-responsive-sharethrough-ad-page-1-3']"); } },  // Element is to locate 3rd Ad unit in ShareThrough 3stack unit which is embedded asset   
    
    /**
     * define elements
     */
    //Header  sharebar
    twitter: { get: function () { return browser.element("//div[@id='fed-sharebar']//a[@class='plugin-socialshare-link plugin-socialshare-twitter']"); } },
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
    sticky_Header_twitter: { get: function () { return browser.element("//div[@class='share']//a[@class='plugin-socialshare-link plugin-socialshare-twitter']"); } },
    sticky_Header_pintrest: { get: function () { return browser.element('//div[@class="share"]//a[@class="plugin-socialshare-link plugin-socialshare-pinterest"]'); } },
    sticky_Header_facebook: { get: function () { return browser.element('//div[@class="share"]//a[@class="plugin-socialshare-link plugin-socialshare-facebook"]'); } },
    sticky_Header_email: { get: function () { return browser.element('//div[@class="share"]//a[@class="plugin-socialshare-link plugin-socialshare-email"]'); } },



    //masth thead elements

    HealthA_Z: { get: function () { return browser.element("//ul[@class='global-nav-links-container']/li[1]/a[1]"); } },
    Drugs_Supplements: { get: function () { return browser.element("//ul[@class='global-nav-links-container']/li[2]/a[1]"); } },
    Living_healthy: { get: function () { return browser.element("//ul[@class='global-nav-links-container']/li[3]/a[1]"); } },
    Family_Pregnancy: { get: function () { return browser.element("//ul[@class='global-nav-links-container']/li[4]/a[1]"); } },
    News_Experts: { get: function () { return browser.element("//ul[@class='global-nav-links-container']/li[5]/a[1]"); } },

    

    //bread crumb
    Attributiontext: { get: function () { return browser.element(".//*[@id='ContentPane12']/div[1]"); } },

    //PPE-88947 Elements
    Sponsorlink: { get: function () { return browser.element(".//*[@id='ContentPane12']/div[1]/a"); } },
    Sponsorlinkpopup: { get: function () { return browser.element("(//div[@class='wtip-content'])[1]"); } },
    Sponsorlinkpopupclose: { get: function () { return browser.element("//div[4]/a[@class='wtip-close']"); } },
    Bylink: { get: function () { return browser.element(".//*[@id='ContentPane12']/div[3]/a"); } },
    Bylinkpopup: { get: function () { return browser.element("(//div[@class='wtip-content'])[2]"); } },
    Bylinkpopupclose: { get: function () { return browser.element("//div[5]/a[@class='wtip-close']"); } },

    //PPE-101383 Elements
    topad: { get: function () { return browser.element("//div[@id='ContentPane10']//div[contains(@id,'google_ads_iframe')]"); } },
    leftad: { get: function () { return browser.element("//div[@id='ContentPane27']//div[contains(@id,'google_ads_iframe')]"); } },
    rightad: { get: function () { return browser.element("//div[@id='ContentPane38']//div[contains(@id,'google_ads_iframe')]"); } },
    sharethroughad: { get: function () { return browser.element(".//*[@id='str-ntv-replace']"); } },
    linktext: { get: function () { return browser.element(".//*[@id='ContentPane30']//div[@class='article-page active-page']/ul[1]/li[2]/a"); } },
    
    //PPE-107223 Elements
    DownloadtheMediaKitLink: { get: function () { return browser.element("//a[@id='dl-menu']"); } },
    MedscapeMediaKitLink: { get: function () { return browser.element("//ul[@class='dropdown-menu dropdown-menu-mk']//a[@class='link-medscape-media']"); } },
	
	//Regression Elements
    topAd: { get: function () { return browser.element("//div[@id='ContentPane10']//div[contains(@id,'google_ads_iframe')]"); } },
    iframe1: { get: function () { return browser.element("_mN_main_540688367_0_n"); } },
    wrapperDiv: { get: function () { return browser.element("#wrapper"); } },
    sponsoredAds: { get: function () { return browser.element(".//*[@id='wrapper']/div[1]"); } },
    iframe2: { get: function () { return browser.element("google_ads_iframe_/4312434/consmobileweb/webmdmobileweb_13__container__"); } },
    bottomAd: { get: function () { return browser.element("//div[@id='google_ads_iframe_/4312434/consmobileweb/webmdmobileweb_13__container__']//div[@class='celtra-ad-v3']/div"); } },

    open: {
        value: function () {
            Page.open.call(this, url);
        }
    },
    /*submit: { value: function() {
        this.form.submitForm();
    } },*/

});


module.exports = Commonlocators


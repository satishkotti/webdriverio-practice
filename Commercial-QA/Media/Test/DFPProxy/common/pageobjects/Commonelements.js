//var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
var Page = require('./page');
// var input = require('./../../config/PPE-102847.testdata')[argv.env];
var webdriverio = require("webdriverio");

// var url = input.environment;
// var options = {
//     desiredCapabilities: {
//         browserName: "chrome" // declare browser name here
//     }
// };
// var browser = webdriverio.remote(options);
//var webmd_proxy = require("wdio-browser-proxy")(browser);

var Commonlocators = Object.create(Page, {
    
    
    /*
      ******     Desktop Infinite Article page elements     ******
    */ 
    launchpoupclose: { get: function () { return browser.element("//div[@id='webmdHoverClose']"); } },   // Element is to locate close button in browser overlay
    launchpopup: { get: function () { return browser.element("div[id='webmdHoverContent']"); } },        // Element is to locate overlay on page launch
        
    
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
    

    /* Slide-show page elements
    All the elements are locators for Slide-show page
    */
   totalslides: { get: function () { return browser.element('.total'); } },  // Total slides available in Slide-show page //span[@class='total']

   /* Quiz page elements
    All the elements are locators for Slide-show page
    */
    totalquestions: {get: function () { return browser.element("//span[@class='tot_pro_num']"); }}, // Total Questions available in Quiz
    
    /* Video Page elements
    */
    playpause: {get: function () { return browser.element("//div[contains(@class,'vjs-play-control')]"); }},
    
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

    //PPE-107223 Elements
    DownloadtheMediaKitLink: { get: function () { return browser.element("//a[@id='dl-menu']"); } },
    MedscapeMediaKitLink: { get: function () { return browser.element("//ul[@class='dropdown-menu dropdown-menu-mk']//a[@class='link-medscape-media']"); } },

    //bread crumb
    Breadcrumb: { get: function () { return browser.element(".//*[@id='ContentPane28']/div[1]/ul"); } },

    //line of entitlement
    LOE: { get: function () { return browser.element(".//*[@id='ContentPane29']/div[1]"); } },

    open: {
        value: function () {
            Page.open.call(this, url);
        }
    },
    /*submit: { value: function() {
        this.form.submitForm();
    } },*/

});


module.exports = Commonlocators;


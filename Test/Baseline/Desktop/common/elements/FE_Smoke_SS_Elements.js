var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
var Page = require('../../../../page');
var ssElements = Object.create(Page, {
    //slides count 
    slides_Count: { get: function () { return browser.element(".//*[@id='dyn-ss']/div[4]/div/div/span[3]"); } },
    //primary  previous first slide navigation
    primary_prevfirst: { get: function () { return browser.element("//div[@class='controls primary']/a[@class='prev first']/i"); } },
    //primary next slide navigation
    primary_next: { get: function () { return browser.element("//div[@class='controls primary']/a[@class='next']/i"); } },
    //primary previous slide navigation
    primary_prev: { get: function () { return browser.element("//div[@class='controls primary']/a[@class='prev']/i"); } },
    //secondary  previous first slide navigation
    secondary_prevfirst: { get: function () { return browser.element("//div[@class='controls secondary']/a[@class='prev first']/i"); } },
    //secondary next slide navigation
    secondary_next: { get: function () { return browser.element("//div[@class='controls secondary']/a[@class='next']/i"); } },
    //secondary previous slide navigation
    secondary_prev: { get: function () { return browser.element("//div[@class='controls secondary']/a[@class='prev']/i"); } },
    //current slide
    secondary_currslide: { get: function () { return browser.element(".//*[@id='dyn-ss']/div[4]/div/div/span[@class='current']"); } },


    //sources
    sources: { get: function () { return browser.element("//div[@class='sources-left']/p/a"); } },
    //Reviewd_by
    reviewd_by: { get: function () { return browser.element("//span[@class='review long']"); } },
    //Tool disclaimer
    tools_disc: { get: function () { return browser.element('//div [@class="sources"]//div [@class="sources-right"]//p[@class="disclaimer"]'); } },

    //textelementforsearch
    textelementforsearch: { get: function () { return browser.element('//div [@class="global-nav-search-container"]//form [@id="global-nav-search-form"]//input [@id="global-nav-search"]'); } },
    //headerad
    headerad: { get: function () { return browser.element('//div [@id="ads2-pos-101-ad-banner"]//div [@id="google_ads_iframe_/4312434/consumer/webmd_0__container__"]'); } },
    //rightasidead
    rightasidead: { get: function () { return browser.element('//div [@id="ads2-pos-121-ad-right"]//div [@id="google_ads_iframe_/4312434/consumer/webmd_1__container__"]'); } },
    //bread crumb
    Breadcrumb: { get: function () { return browser.element('//div [@class="breadcrumb"]//ul [@data-metrics-module="brdcrmb"]/li[1]/a/span'); } },
    //healthmi
    healthmi: { get: function () { return browser.element(".//*[@id='ContentPane1']/nav/div[1]/div[2]/ul[2]/li[1]/a[1]"); } },
    //drugmi
    drugmi: { get: function () { return browser.element(".//*[@id='ContentPane1']/nav/div[1]/div[2]/ul[2]/li[2]/a[1]"); } },
    //livingmi
    livingmi: { get: function () { return browser.element(".//*[@id='ContentPane1']/nav/div[1]/div[2]/ul[2]/li[3]/a[1]"); } },
    //familymi
    familymi: { get: function () { return browser.element(".//*[@id='ContentPane1']/nav/div[1]/div[2]/ul[2]/li[4]/a[1]"); } },
    //newsmi
    newsmi: { get: function () { return browser.element(".//*[@id='ContentPane1']/nav/div[1]/div[2]/ul[2]/li[5]/a[1]"); } },
    //logo
    logo: { get: function () { return browser.element('//nav [@class="global-nav-container"]/div[1]/div[1]/a/img'); } },
    //image
    image: { get: function () { return browser.element('//div [@class="owl-stage-outer owl-height"]//div [@class="owl-stage"]/div["+i+"]/div/div[1]/img'); } } ,
 //textelementforsearch
    textelementforsearch: { get: function() { return browser.element('//form [@id="global-nav-search-form"]'); } },
 
});



module.exports = {
    get_slide_title: function (i) {
        socialshareIcons.open();
        var slide_title = "//div[" + i + "]/div[@ class='caption']/h2";
        var actions = {
            slide_title: slide_title

        }

    },
}

module.exports = ssElements
var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
var Page = require('../../../../page');
var input = require('../../config/FE.testdata');
var url = input.ISI_url;
var socialshareIcons = Object.create(Page, {
    /**
     * define elements
     */
    //Header

    Global_Header: { get: function() { return browser.element('.//*[@class="global-header"]/.//*[@class="global-nav-container is-fixed"]'); } },
    //Top AD
    Top_Ad: { get: function() { return browser.element('.//*[@class="module ad ad-101"]/.//*[@id="google_ads_iframe_/4312434/consumer/webmd_0__container__"]'); } },


    //Right Ad
    Right_Ad: { get: function() { return browser.element('.//*[@id="ads2-pos-121-ad-right"]'); } },
    //Left AD
    Left_Ad: { get: function() { return browser.element('.//*[@id="google_ads_iframe_/4312434/consumer/webmd_1__container__"]'); } },


    //Left Rail
    Left_Rail: { get: function() { return browser.element('.//*[@class="module-branded-left-nav"]'); } },
    //Brand Attribution
    Attribution: { get: function() { return browser.element('.//*[@class="attrib_right_fmt"]'); } },





    //ISI Module

    ISI_module_Normal: { get: function() { return browser.element('.//*[@class="isi mlr"]'); } },
    ISI_button: { get: function() { return browser.element('.//*[@class="isi-btn"]/.//*[@class="isi-toggle"]'); } },
    ISI_Show_Less: { get: function() { return browser.element('.//*[@id="ContentPane47"]/.//*[@class="isi-toggle"]/.//*[contains(.,"Show Less")]') } },

    ISI_module_Full: { get: function() { return browser.element('.//*[@class="isi mlr open"]'); } },

    //-- ISI hiding functionalty  
    ISI_Page_content: { get: function() { return browser.element('.//*[@class="isi-main-content"]/.//*[@id="isi-cw"]'); } },
    ISI_module_Hidden: { get: function() { return browser.element('.//*[@class="isi mlr hide"]'); } },
    //            ------------------ ISI contents----------------------
    //Important safety information
    ISI_Title_text: { get: function() { return browser.element('.//*[@id="ContentPane47"]/div/div[1]/div/ul/li[1]/a'); } },
    //PRescribing Information
    ISI_Prescribing_Text: { get: function() { return browser.element('.//*[@id="ContentPane47"]/div/div[1]/div/ul/li[2]/a'); } },
    //Third Link
    ISI_module_Third_Link: { get: function() { return browser.element('.//*[@id="ContentPane47"]/div/div[1]/div/ul/li[3]/a'); } },

    //.//*[@id='ContentPane66']/.//*[@class='article-nav show']

    //.//*[@id="ContentPane66"]/.//*[@class="article-nav show"]/.//*[@class="prev "]
    open: {
        value: function() {
            Page.open.call(this, url);
        }
    },
    /*submit: { value: function() {
        this.form.submitForm();
    } },*/

});

module.exports = socialshareIcons
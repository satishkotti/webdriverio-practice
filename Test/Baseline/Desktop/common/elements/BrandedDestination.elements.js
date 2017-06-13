var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
var Page = require('./../../../prdemo/page');
var input = require('./../../config/PPE-102847.testdata')[argv.env];
//var input = require('./../../config/PPE-101748.testdata')[argv.env];

var url = input.environment;
var BrandedCommonlocators = Object.create(Page, {
    /**
     * define elements
     */
    //LeftRail subsection links
    Program_Name: { get: function () { return browser.element("//a[@data-metrics-link='prgrm']"); } },
    Subsec1: { get: function () { return browser.element("//a[@data-metrics-link='1_1']"); } },
    Subsec2: { get: function () { return browser.element("//a[@data-metrics-link='1_2']"); } },
    Subsec3: { get: function () { return browser.element("//a[@data-metrics-link='1_3']"); } },
    Subsec4: { get: function () { return browser.element("//a[@data-metrics-link='1_4']"); } },
    facebook: { get: function () { return browser.element('//div[@id="fed-sharebar"]//a[@class="plugin-socialshare-link plugin-socialshare-facebook"]'); } },
    email: { get: function () { return browser.element('//div[@id="fed-sharebar"]//a[@class="plugin-socialshare-link plugin-socialshare-email"]'); } },
    /* * define or overwrite page methods
    /* */


    // subsection 
    //li[@class="branded-left-nav-sub-list highlight-nav"] 
    page_viewd:{ get: function () { return browser.element("//li[@class='branded-left-nav-sub-list highlight-nav']" ); } },   

});


module.exports = BrandedCommonlocators
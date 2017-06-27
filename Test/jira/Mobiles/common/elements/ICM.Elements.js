var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
var Page = require('./../../../prdemo/page');
var input = require('./../../config/PPE-102847.testdata')[argv.env];
//var input = require('./../../config/PPE-101748.testdata')[argv.env];

var url = input.environment;
var icmLocators = Object.create(Page, {
    //from our sponsor text
     sponsor_text: { get: function () { return browser.element(".//*[@id='link']"); } },
     //title text
    title: { get: function () { return browser.element("//div[@class='icm_header']/a/h3"); } },
    //CTA
    CTA: { get: function () { return browser.element("//p[@class='action_link']//a"); } },
    //isi
    isi: { get: function () { return browser.element(".//*[@id='sb-test-isi-01_isi']"); } },
    //isi_text 
    isi_text1: { get: function () { return browser.element(".//*[@id='sb-test-isi-01_isi']/h3"); } },
    //isi
    isi_text2: { get: function () { return browser.element(".//*[@id='sb-test-isi-01_isi']/ul/li[1]"); } },
    //image
    image: { get: function () { return browser.element("//div[@class='icm_image']/a/img"); } },
    //logo
    logo: { get: function () { return browser.element("//div[@class='icm_sponsored']/img"); } }
        /* * define or overwrite page methods
    /* */
    });


module.exports = icmLocators
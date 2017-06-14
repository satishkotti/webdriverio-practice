var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
var Page = require('./../../../prdemo/page');
var input = require('./../../config/Webmd-tv')[argv.env];
var url = input.splash;

module.exports={
    "header":{
        "Header_WebMDLogo":"//header[@id='wmdtv-splashhead']//img[2]",
        "Header_WebMDLogo_presents":"//header[@id='wmdtv-splashhead']//small",
        "Header_standUpto" : "//header[@id='wmdtv-splashhead']//div//span[1]",
        "Header_Migraines" : "//header[@id='wmdtv-splashhead']//div//span[2]",
        "Header_yourbrand" : "//header[@id='wmdtv-splashhead']//div[@class='masthead-right clearfix sponsor-info']//p/a",
        "Header_sponsoredby" : "//header[@id='wmdtv-splashhead']//div[@class='sponsor-logo']//a",
        "Header_disclaimer" : "//header[@id='wmdtv-splashhead']//div[@class='masthead-right clearfix sponsor-info']",

    },
}

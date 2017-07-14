var Q = require('Q');
var chai = require("chai");
var should = chai.should();
var webdriverio = require("webdriverio");
var urls1 = require("./../../../config/DFP1");
var urls2 = require("./../../../config/DFP2");
var ada = require("./../../../common/functions/AdcallsActions");
var argv = require("yargs").argv;
var input = require("./Webmd-tv")[argv.env];
var browser = require('./browser');
//var webmd_proxy = require("wdio-browser-proxy")(browser);
var qs = require("querystring");
var res;
//var url=input.environment;
//var xpath=input.article;

var commomele=function(browser){

    var _browser=browser;
    return{
nextpage:function(xpath){
_browser.click(xpath)
           .pause(3000)
}                       
                }
    }
module.exports=commomele;



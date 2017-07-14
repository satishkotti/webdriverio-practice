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
var funs = require('./functions2')(browser);
var webmd_proxy = require("wdio-browser-proxy")(browser);
var qs = require("querystring");
var res;
var url=input.environment;
var xpath=input.article;
var url=input.environment;
var xpath=input.article;


module.exports = {

/*omniture:function(browser,url,xpath){
var deferred = Q.defer()
browser.enableProxy({})//.then(function () { console.log('finsihed enabling proxy'); })
          .url(url)
           //.click(xpath)
           funs.nextpage(xpath)
           browser.pause(3000)
            .end()
            .getNetworkCalls('http://std.o.webmd.com').then(function(result){
                console.log("sasi"+result);
                    deferred.resolve(result);
            });
        return deferred.promise;                 
             }*/
omniture:function(browser){
var deferred = Q.defer()
browser.enableProxy({})//.then(function () { console.log('finsihed enabling proxy'); })
  .url("http://www.staging.webmd.com/cold-and-flu/cold-guide/understanding-common-cold-basics#1").then(function(){
            
            browser.click("//li[contains(@class,'next')]").pause(3000)
          }).end()
           .getNetworkCalls('http://std.o.webmd.com').then(function(result){
                console.log("sasi"+result);
                  deferred.resolve(result);
        })
        .pause(3000)     

        return deferred.promise;                 
                }
  }


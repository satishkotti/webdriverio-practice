/*
****************************************************
PPE-129126 	Remove extra medianet call and make protocol agnostic
****************************************************
 */

// Declare required variables

var chai = require("chai");
var should = chai.should();
var supertest = require("supertest");
var urls1 = require("./../../../config/DFPRegression.TestData");
//var urls1 = require("./../../../config/DFPAdcallstestdata");
//var urls2 = require("./../../../config/DFPAdcallstestdata.1");
var ada = require("./../../../common/functions/AdcallsActions");
// var browser = require('../../../utilities/wdioconfig');
// var webmd_proxy = require("wdio-browser-proxy")(browser,{manualPort:8085,timeouts:{"connection":10000,"read":10000,"request":10000}});
var express = require('express');
var app = express();
var request = require('request');
var supertest = require('supertest');
var manualPort = 0;
var apiurl = "http://" + data.host + ":" + data.port ;

console.log("browser proxy api url :" + apiurl)

var server = supertest.agent(apiurl);

var options1 = {
    maxInstances: 1,
        browserName: data.browser,
        port: data.appPort,       
        appiumVersion: data.appiumVersion,
        platformName: data.platformName,
        platformVersion: data.platformVersion,
        deviceName: data.deviceName,
        orientation: data.orientation,
        udid:data.udid,
        automationName:data.automationName	
 };

var qs = require("querystring");


// Describe Network calls function

function _Fn(val) {
  describe('PPE-129126 Multiple Medianet calls', function () {
    this.timeout(999999);

    before(function (done) {
        var r;
        this.timeout(999999);
        var currenturl = urls1.staging[val];
       // var currenturl = 'https://www.perf.webmd.com/sleep-disorders/guide/tips-reduce-stress';
       console.log(currenturl);
        var x = browser.enableProxy({})
        // .addBlackList('http://fast.webmd.demdex.net/.*')
        // .addBlackList('http://img.webmd.com/pixel/.*')
        // .addBlackList('http://img.preview.webmd.com/pixel/.*')
        // .addBlackList('http://img.staging.webmd.com/pixel/.*')
        // .addBlackList('http://px.moatads.com/.*')
        // .addBlackList('https://token.rubiconproject.com/token.*')
        // .addBlackList('http://ads.yahoo.com/.*')
        // .addBlackList('https://secure.insightexpressai.com/.*')
        // .addBlackList('http://a.postrelease.com/*')
        // .addBlackList('http://pixel.onaudience.com/*')
        // .addBlackList('http://std.o.webmd.com/*')
        // .addBlackList('http://www.webmd.com/api/directories/Service.svc/.*')
        .addBlackList('https://.*newsletter*').windowHandleMaximize()
    
            .url(currenturl)
            .end()
            .getNetworkCalls('https://contextual.media.net').then(function (result) {
                    mnet = result;
                    //console.log(mnet.length);
                    //qs1 = mnet[0].request.url;
                     //console.log(qs1);
                    done();
                });
            
    });

     it('Number of Medianet Calls', function () {
        console.log(mnet.length);
    });

     it('Duplicate Mnet', function () {
        ada.verifyDuplicateMedianetcalls(mnet);
     });

});
}

function _Fnport() {

    before(function (done) {
                try{
                
                    server
                    .post('/proxy?port=' + 8085)
                    .end(function(err,res){
                     
                         console.log("manual port updated");
                         done();
                         })
                         
                
                
                }
                catch(error){
                    console.log(error);
                }
                
            });
}

_Fnport();

for (var i = 0; i < urls1.staging.length; i++) {
try{
       _Fn(i);
	   }catch (error) {
        console.log(error);
    }
}

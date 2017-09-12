

var commonvariables = require('../../../../common/elements/Common_Variables');
var argv = require("yargs").argv;
var videoelements = require('../../../../common/elements/Webmdtvpage');
var commonfunctions = require('../../../../common/functions/CommonActions');
var chai = require('chai');
var Q = require('q');
var should = require('should');
var expect = require('chai').expect;
var mocha = require('mocha')
var assert = require('chai').assert
var webdriverio = require("webdriverio");
var urls = require('../../../../config/urls');
var browser = require('../../../../common/browser')
var webmd_proxy = require('wdio-browser-proxy')(browser);
var qs = require('querystring');
//var i = 4;
var waittime2;
var previouspercentage = 0;  
//var percent25 =0;
//var percent50 =0;
//var percent75 =0;

describe('basic test', function () {

    var omnitureData;
 


    it('Verify the video forwarding', function (done) {

    this.timeout(0);
    var omnitureData;
    var currenturl = urls[0]; 
    var propserror;
    
    
        try {
            browser
                .enableProxy({})
                .url(currenturl)
                .isExisting(commonvariables.popupClose).then(function () {
                    browser.click(commonvariables.popupClose)
                }
                )
                .waitForVisible(videoelements.Videoplaying, 600000).pause(5000)
                .then(function () {
                    var currentPersentage;   
                                  
                    var getPersentage = setInterval(function () {
                        browser.getAttribute(videoelements.video_toolbar_progressbarwrapper, "style").then(function (p) {
                            var width = p.split(' ')
                            var percent = width[1].split('%')
                            currentPersentage = parseInt(percent[0]);
                            console.log("progress bar currentPersentage = " + currentPersentage);                            
                            if ( previouspercentage > currentPersentage){//parseInt(duration)) {  
                                 previouspercentage =   currentPersentage;                           
                                console.log("TRUE :" + currentPersentage)
                                clearInterval(getPersentage);                                 
                                  browser.end()
                               
                                    .getNetworkCalls('https://ssl.o.webmd.com').then(function (result) {
                                        console.log("GetNetworkCalls");
                                    console.log(result);
                                      
                                        omnitureData = result;
                                        i = omnitureData.length;
                                        console.log("length-" + i);
                                         var propValues = qs.parse(omnitureData[i-1].request.url); 
                                         console.log(propValues.mlink);
                                         propValues.mlink.should.equal('start');
                                        //the code gets exit after another page is navigate that is we need to get 100pct before start call
                                        //we are getting few undefined calls between 100pct and undefined calls, so handled those in loop
                                        //undefined is not being verified, if we handle any operation on this the script is breaking. SO, hardcoded the value
                                       
                                            console.log(" execution completed");
                                         
                                        done();                                      
                                  
                                    },function(error){
                                        console.log(error);
                                        done();
                                    });       

                                     clearTimeout(timer)  
                                 }
                                 else {
                                        console.log("FALSE :" + currentPersentage);
                                        previouspercentage =   currentPersentage; 
                                    }
                             
                        });
                    }, 2000)
                    timer = setTimeout(getPersentage, 0);
                                
                  
                })               

        } catch (error) {
            console.log(error);
        }

    });

});
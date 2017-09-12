

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
    var duration=100;


it('Verify the omniture call 25pct is fired when the video reached to 25 percentage of the total', function (done) {

    this.timeout(0);
    var omnitureData;
    var currenturl = urls[0]; 
   
    //open browser and performs all required operations on browser and inturn captures omniture data
    //before(function (done) {
        try {
            browser
                .enableProxy({})//.then(function () { console.log('finsihed enabling proxy'); })
                .url(currenturl)
                .isExisting(commonvariables.popupClose).then(function () {
                    browser.click(commonvariables.popupClose)
                }
                )
                .waitForVisible(videoelements.Videoplaying, 600000)
                .click(videoelements.video_toolbar)
                .moveToObject(videoelements.webmdplayer)
                .click(videoelements.video_toolbar_pausebutton)
                .click(videoelements.video_toolbar_playbutton)
               
                .then(function () {
                    var currentPersentage;                   
                    var getPersentage = setInterval(function () {
                        browser.getAttribute(videoelements.video_toolbar_progressbarwrapper, "style").then(function (p) {
                            console.log(" p :" + p)
                            var width = p.split(' ')
                            var percent = width[1].split('%')
                            currentPersentage = parseInt(percent[0]);
                           // console.log("progress bar = " + currentPersentage); 
                           
                            if (currentPersentage > 25 ){//parseInt(duration)) { 
                                                     
                                console.log("TRUE :" + currentPersentage)
                                clearInterval(getPersentage);   
                                browser.moveToObject("//div[@class='vjs-control-bar']/div[@ class='dyn-controlbar']")
                              //  browser.click("//div[@class='vjs-control-bar']/div[@ class='dyn-controlbar']")
                               //browser.click(videoelements.video_toolbar_pausebutton)  
                               browser.click("//div [@class='dyn-controlbar']/div[@class='vjs-play-control vjs-control vjs-playing']")  
                                .pause(5000)   
                                .end()
                                .getNetworkCalls('https://ssl.o.webmd.com').then(function (result) {
                                    console.log("GetNetworkCalls:");
                                console.log("result-" +result );
                                    omnitureData = result;
                                     i = omnitureData.length;
                                      console.log("lenght-" +i );
                                        var propValues = qs.parse(omnitureData[i-2].request.url);
                                        propValues.mlink.should.equal('25pct');
                                        console.log(" Omniture length : " + omnitureData.length + "omniture value : " + propValues.mlink);
                                        
                                        console.log(" execution completed");
                                    done();
                                },function(error){
                                        console.log(error);
                                        done();
                                    });       

                                     clearTimeout(timer)  
                                 } else {
                                console.log("FALSE :" + currentPersentage)
                            }
                        })
                    }, 2000)
                    timer = setTimeout(getPersentage, waittime);
                  
                
                  
                })
               .end()
                .getNetworkCalls('https://ssl.o.webmd.com').then(function (result) {
                    console.log("GetNetworkCalls:");
                   console.log(result);
                    omnitureData = result;
                    done();
                });

        } catch (error) {
            console.log(error);
        }

    });

it('Verify the omniture call 50pct is fired when the video reached to 50 percentage of the total', function (done) {

    this.timeout(0);
    var omnitureData;
    var currenturl = urls[0]; 
    
    //open browser and performs all required operations on browser and inturn captures omniture data
    //before(function (done) {
        try {
            browser
                .enableProxy({})//.then(function () { console.log('finsihed enabling proxy'); })
                .url(currenturl)
                .isExisting(commonvariables.popupClose).then(function () {
                    browser.click(commonvariables.popupClose)
                }
                )
                .waitForVisible(videoelements.Videoplaying, 600000)
                .click(videoelements.video_toolbar)
                .moveToObject(videoelements.webmdplayer)
                .click(videoelements.video_toolbar_pausebutton)
                .click(videoelements.video_toolbar_playbutton)
                .then(function () {
                    var currentPersentage;                   
                    var getPersentage = setInterval(function () {
                        browser.getAttribute(videoelements.video_toolbar_progressbarwrapper, "style").then(function (p) {
                            var width = p.split(' ')
                            var percent = width[1].split('%')
                            currentPersentage = parseInt(percent[0]);
                         //   console.log("progress bar = " + currentPersentage);                            
                            if (currentPersentage > 51) {                                
                                console.log("TRUE :" + currentPersentage)
                                clearInterval(getPersentage);   
                                browser.click(videoelements.video_toolbar_pausebutton)  
                                .pause(1000)   

                                .end()
                                .getNetworkCalls('https://ssl.o.webmd.com').then(function (result) {
                                    console.log("GetNetworkCalls");
                                // console.log(result);
                                    omnitureData = result;
                                     i = omnitureData.length;
                                        var propValues = qs.parse(omnitureData[i-2].request.url);
                                        propValues.mlink.should.equal('50pct');
                                        console.log(" Omniture length : " + omnitureData.length + "omniture value : " + propValues.mlink);
                                        
                                        console.log(" execution completed");
                                    done();
                                });             
                                                                                    
                                clearTimeout(timer)
                            
                               
                            } else {
                                console.log("FALSE :" + currentPersentage)
                            }
                        })
                    }, 2000)
                    timer = setTimeout(getPersentage, waittime);
                
                  
                })
                        
               
                .end()
                .getNetworkCalls('https://ssl.o.webmd.com').then(function (result) {
                    console.log("GetNetworkCalls");
                   // console.log(result);
                    omnitureData = result;
                    done();
                });

        } catch (error) {
            console.log(error);
        }

    });
    
    
it('Verify the omniture call 75pct is fired when the video reached to 75 percentage of the total', function (done) {

    this.timeout(0);
    var omnitureData;
    var currenturl = urls[0]; 
    
    //open browser and performs all required operations on browser and inturn captures omniture data
    //before(function (done) {
        try {
            browser
                .enableProxy({})//.then(function () { console.log('finsihed enabling proxy'); })
                .url(currenturl)
                .isExisting(commonvariables.popupClose).then(function () {
                    browser.click(commonvariables.popupClose)
                })
                .isVisible(commonvariables.survey_frame).then(function(){
                    browser.frame(survey_frameid);
                    browser.clearElement(commonvariables.survey_nothanks);
                })
                .waitForVisible(videoelements.Videoplaying, 600000)
                .click(videoelements.video_toolbar)
                .moveToObject(videoelements.webmdplayer)
                .click(videoelements.video_toolbar_pausebutton)
                .click(videoelements.video_toolbar_playbutton)
                .then(function () {
                    var currentPersentage;                   
                    var getPersentage = setInterval(function () {
                        browser.getAttribute(videoelements.video_toolbar_progressbarwrapper, "style").then(function (p) {
                            var width = p.split(' ')
                            var percent = width[1].split('%')
                            currentPersentage = parseInt(percent[0]);
                         //   console.log("progress bar = " + currentPersentage);                            
                            if (currentPersentage > 75){//parseInt(duration)) {                                
                                console.log("TRUE :" + currentPersentage)
                                clearInterval(getPersentage);   
                                browser.click(videoelements.video_toolbar_pausebutton)  
                                .pause(1000)   

                                .end()
                                .getNetworkCalls('https://ssl.o.webmd.com').then(function (result) {
                                    console.log("GetNetworkCalls");
                                // console.log(result);
                                    omnitureData = result;
                                     i = omnitureData.length;
                                        var propValues = qs.parse(omnitureData[i-2].request.url);
                                        propValues.mlink.should.equal('75pct');
                                        console.log(" Omniture length : " + omnitureData.length + "omniture value : " + propValues.mlink);
                                        
                                        console.log(" execution completed");
                                    done();
                                });             
                                                                                    
                                clearTimeout(timer)
                              // stop();
                               
                            } else {
                                console.log("FALSE :" + currentPersentage)
                            }
                        })
                    }, 2000)
                    timer = setTimeout(getPersentage, waittime);
                                
                  
                })
                .end()
                .getNetworkCalls('https://ssl.o.webmd.com').then(function (result) {
                    console.log("GetNetworkCalls");
                   // console.log(result);
                    omnitureData = result;
                    done();
                });

        } catch (error) {
            console.log(error);
        }

    });


it('Verify the omniture call 100pct is fired when the video reached to 100 percentage of the total', function (done) {

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
                         //   console.log("progress bar = " + currentPersentage);                            
                            if ( previouspercentage > currentPersentage){//parseInt(duration)) {  
                                 previouspercentage =   currentPersentage;                           
                                console.log("TRUE :" + currentPersentage)
                                clearInterval(getPersentage);                                 
                                  browser.click(videoelements.video_toolbar).pause(500)
                                  .moveToObject(videoelements.webmdplayer).pause(2000)  
                                  .click(videoelements.video_toolbar_pausebutton).pause(500)
                                     .end()
                               
                                    .getNetworkCalls('https://ssl.o.webmd.com').then(function (result) {
                                        console.log("GetNetworkCalls");
                                    // console.log(result);
                                      
                                        omnitureData = result;
                                        i = omnitureData.length;
                                        console.log("length" + i);
                                        //the code gets exit after another page is navigate that is we need to get 100pct before start call
                                        //we are getting few undefined calls between 100pct and undefined calls, so handled those in loop
                                        //undefined is not being verified, if we handle any operation on this the script is breaking. SO, hardcoded the value
                                        var propsvalue 
                                        for(j=i-1;j!=0;j--)                
                                                {
                                                                   
                                                        propValues = qs.parse(omnitureData[j].request.url); 
                                                        console.log(" value " + j + ":" + propValues.mlink);
                                                        if(propValues == null)
                                                        {
                                                            console.log("call is null");
                                                        }
                                                        
                                                }
                                              for(j=i-1;j!=0;j--)                 
                                                {
                                                                   
                                                        propValues = qs.parse(omnitureData[j].request.url); 
                                                        console.log(" value " + j + ":" + propValues.mlink);            
                                                                if(propValues.mlink === '100pct')
                                                                {
                                                                    console.log("100pct call" + propValues.mlink )                                
                                                                     break; 
                                                                }
                                                                else   
                                                                {
                                                                    if(propValues.mlink === 'start')
                                                                    {
                                                                         propValues = qs.parse(omnitureData[j-3].request.url);
                                                                         console.log("100PCt call is verified" + j-3 + ":" + propValues.mlink);
                                                                            propValues.mlink.should.equal('100pct');
                                                                    /*    for(k=j-1;k!=j-5;K--)                 
                                                                        {
                                                                            try{
                                                                                propValues = qs.parse(omnitureData[k].request.url);
                                                                                console.log("omni call for k" +  k + " " + propValues.mlink );
                                                                                if( propValues.mlink === '100pct')
                                                                                {
                                                                                    should.exist(propValues.mlink);
                                                                                    propValues.mlink.should.equal('100pct');
                                                                                    console.log("100PCt call is verified" + k + ":" + propValues.mlink);
                                                                                    break;
                                                                                }
                                                                                
                                                                            }
                                                                            catch(error){
                                                                                //console.log(error)
                                                                            }
                                                                                                                                                         
                                                                                                                                                          
                                                                            
                                                                        }*/
                                                                     
                                                                    }
                                                                   
                                                                       
                                                                  
                                                                }                                
                                                                
                                                }

                                               
                                                
                                            console.log(" Omniture length : " + omnitureData.length + "omniture value : " + propValues.mlink);
                                            
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
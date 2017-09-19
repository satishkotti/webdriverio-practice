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

var qs = require("querystring");

//var apiurl = "http://" + data.host + ":" + data.port ;
var apiurl = "http://172.28.37.142:8080";
//var apiurl = "http://127.0.0.1:8080";
var server = supertest.agent(apiurl);

// Describe Network calls function

function _Fn(val) {
  describe('PPE-129126 Multiple Medianet calls', function () {
    this.timeout(999999);
    var t1,t2,temp,x;

    before(function (done) {
        var r;
        this.timeout(999999);
        var currenturl = urls1.staging[val];
       console.log(currenturl);
         x = browser.enableProxy({})
        .addBlackList('https://.*newsletter*').windowHandleMaximize()
    
            .url(currenturl)
            .pause(30000)
            })            
            .end()
            .getNetworkCalls('http://contextual.media.net').then(function (result) {
                    mnet = result;
                    done();
                });            
    });

     it('Number of Medianet Calls', function () {
        console.log(mnet.length);
        mnet.length.should.be.above(0);
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

for (var i = 10; i < urls1.staging.length; i++) {
try{
       _Fn(i);
	   }catch (error) {
        console.log(error);
    }
}

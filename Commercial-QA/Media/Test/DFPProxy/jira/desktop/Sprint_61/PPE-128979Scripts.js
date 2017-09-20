/*
****************************************************
PPE-128979 	A9 Multislot Implementation for Pre Roll Videos
****************************************************
 */

// Declare required variables

var chai = require("chai");
var should = chai.should();
var supertest = require("supertest");
//var urls1 = require("./../../../config/DFPRegression.TestData");
var ada = require("./../../../common/functions/AdcallsActions");
// var browser = require('../../../utilities/wdioconfig');
// var webmd_proxy = require("wdio-browser-proxy")(browser,{manualPort:8085,timeouts:{"connection":10000,"read":10000,"request":10000}});

var qs = require("querystring");
//var apiurl = "http://" + data.host + ":" + data.port ;
var apiurl = "http://172.28.37.142:8080";
//var apiurl = "http://127.0.0.1:8080";
var server = supertest.agent(apiurl);

// Describe Network calls function

//function _Fn(val) {
  describe('PPE-129126 Multiple Medianet calls', function () {
    this.timeout(999999);
    var t1,t2,temp,x,Addata;

    before(function (done) {
        this.timeout(999999);
        //var currenturl = urls1.staging[val];
        var currenturl = 'https://www.qa01.webmd.com/diet/guide/vitamin-d-deficiency';
       console.log(currenturl);
         x = browser.enableProxy({})
        .addBlackList('https://.*newsletter*').windowHandleMaximize()
            .url(currenturl)
            .pause(30000)
            .end()
            .getNetworkCalls('https://pubads.g.doubleclick.net/gampad/ads?sz=640x360').then(function (result) {
                    Addata = result;
                    done();
                });
            
    });

     it('Number of Ad calls', function () {
        console.log(Addata.length);
        Addata.length.should.be.above(0);
    });

     it('Verify Amazan Ads for Pre-roll Videos', function () {
        var temp = ada.extractParamsFromAdcall(Addata[0].request.queryString, "cust_params");
        var custparams = ada.splitStringwithDelimiter(temp, "&");
        custparams.should.includes("amzniid=");
        var amazonid = ada.extractParamsFromList(custparams, "amzniid");
        var amazonbid = ada.extractParamsFromList(custparams, "amznbid");
        var amazonnp = ada.extractParamsFromList(custparams, "amznp");
        should.exist(amazonid);
        should.exist(amazonbid);
        should.exist(amazonnp);
        // if(amazonbid == "" || amazonid == "" || amazonnp == ""){
        //     console.log("No bid values Rendered");
        //     Addata.length.should.equal(0);
        // }
        // amazonbid.length.should.be.above(0);
        // amazonid.length.should.be.above(0);
        // amazonnp.length.should.be.above(0);
     });

});
//}

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

// for (var i = 10; i < urls1.staging.length; i++) {
// try{
//        _Fn(i);
// 	   }catch (error) {
//         console.log(error);
//     }
// }

/*
****************************************************
This Test case to verify updated native key values in DFp Ad call
****************************************************
 */

var chai = require('chai');
var should = chai.should();
var qs = require('querystring');
var argv = require("yargs").argv;

var cf = require('../../../common/functions/CommonFunctions');
var ada = require("./../../../common/functions/AdcallsActions");
var urls1 = require("../../../config/PPE-118381_TestData")[argv.env];
var browser = require('../../../utilities/wdioconfig');
var webmd_proxy = require("wdio-browser-proxy")(browser);
var stdata = require("../../../config/ShareThroughValues")
var Addata, qs1;

describe('basic test', function () {
    this.timeout(999999);

    before(function (done) {
        this.timeout(999999);
        //var pagecount = cf.pageCount();
        cf.articlePages(browser)
            .then(function (result) {
                Addata = result;
                console.log("Ad Call Length : " + Addata.length);
                done();
            });
    });

    
    it('Verify Stack unit Native Key Values', function () {
        //take the last omniture call
        // var propValues = qs.parse(omnitureData[omnitureData.length - 1].request.url);
        //check the prop values
        for (var x = 1; x <= Addata.length; x++) {
            console.log("Loop..................." + x);
           // console.log(Addata[Addata.length - x].request.queryString);
            qs1=Addata[Addata.length - x].request.queryString;
            var scplist = ada.splitScp(qs1);
            //console.log(scplist);
            var l1 = ada.extractNativeKeys(scplist);
            //console.log("Native Keys"+l1);
           var b1=  ada.verifyNativeKey(stdata,l1,"923");
           var b2=  ada.verifyNativeKey(stdata,l1,"924");
           var b3=  ada.verifyNativeKey(stdata,l1,"925");
           console.log(b1,b2,b3);
           b1.should.equal(true);
           b2.should.equal(true);
           b3.should.equal(true);
        }
    });
});
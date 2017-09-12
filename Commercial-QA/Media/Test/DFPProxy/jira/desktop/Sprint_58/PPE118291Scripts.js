/*
****************************************************
PPE-118291 A9 Demand Source - Upgrade to Multislot Implementation
****************************************************
 */

var chai = require('chai');
var should = chai.should();
var qs = require('querystring');
//var argv = require("yargs").argv;

//var cf = require('../../../common/functions/CommonFunctions');
var ada = require("./../../../common/functions/AdcallsActions");
var urls1 = require("./../../../config/DFPRegression.TestData");
var browser = require('../../../utilities/wdioconfig');
var webmd_proxy = require("wdio-browser-proxy")(browser);
var Addata, qs1;

function a9(val){

describe('PPE-118291 A9 Demand Source - Upgrade to Multislot Implementation', function () {
    this.timeout(999999);

    before(function (done) {
        this.timeout(999999);
        var currenturl = val.URL;
        var x = browser.enableProxy({})
            
            .url(currenturl)
            .execute(function amazon() {
            apstag.debug("enable");            
          })
          .refresh()
                .end()
                .getNetworkCalls('https://securepubads.g.doubleclick.net/gampad').then(function (result) {
                    Addata1 = result;
                    console.log(Addata1.length);
                    qs1 = Addata1[1].request.queryString;
                    done();
                   // console.log(qs1);
                });
        //var pagecount = cf.pageCount();
        // cf.articlePages(browser)
        //     .then(function (result) {
        //         Addata = result;
        //         console.log("Ad Call Length : " + Addata.length);
        //         qs1 = Addata[0].request.queryString;
        //         done();
        //     });
    });


    // it('PPE-124245 & PPE-124247 Desktop-Verify Amazon bid values rendered in network call for every Ad slot on the page', function () {
    //     var scplist = ada.splitScp(qs1);
    //     var poslist = ada.extractPOSValues(scplist);
    //     var amznslots = ada.extractLikeValuesFromList(scplist, "amznslots");
    //     var poslength = poslist.length;
    //     var slotslength = amznslots.length;
    //     poslength.should.equal(slotslength);
    // });

    it('PPE-124245 & PPE-124247 Desktop-Verify Amazon bid values rendered in network call for every Ad slot on the page', function () {
        var scp = ada.extractParamsFromAdcall(qs1, "prev_scp");
        var poslist = ada.splitStringwithDelimiter(scp, "|");
        ada.verifyAmazonSlots(poslist);
    });
});
}

for (var i = 0; i < urls1.length; i++) {
    a9(urls1.staging[i]);
}

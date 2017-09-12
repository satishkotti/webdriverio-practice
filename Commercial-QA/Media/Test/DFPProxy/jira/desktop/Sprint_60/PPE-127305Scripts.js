/*
****************************************************
This test case to verify First Impression Product Improvements Internal Search
****************************************************
 */

// Declare required variables

var chai = require("chai");
var should = chai.should();
var webdriverio = require("webdriverio");
var ada = require("./../../../common/functions/AdcallsActions");

var options = {
    desiredCapabilities: {
        browserName: "chrome",
    }
};

var browser = webdriverio.remote(options);
var webmd_proxy = require("wdio-browser-proxy")(browser);
var qs = require("querystring");

describe('PPE-127305 - First Impression Product Improvements Internal Search [Scripts]', function () {
    this.timeout(0);
    var Addata1;
    var qs0, qs1, qs2, qs3;
 
    before(function (done)
     {
        var x = browser.enableProxy({})//.then(function () { console.log('finsihed enabling proxy'); })
        .url('http://www.staging.webmd.com/allergies/news/20170601/burned-by-sunscreen-what-parents-need-to-know')
        .refresh()
        .url('http://www.staging.webmd.com/arthritis/news/20131029/exercise-brace-arthritis')
        .url('http://www.staging.webmd.com/allergies/news/20121005/10-worst-places-fall-allergies-2012')
        .end()
        .getNetworkCalls('https://securepubads.g.doubleclick.net/gampad').then(function (result)
        {
            Addata1 = result;
            console.log(Addata1.length);
            done();
        });
    });

    it('PPE-127866 Desktop - Verify fis, fipt & lif values when the user visits WebMD for the first time', function ()
     {
        var custparams0 = ada.extractParamsFromAdcall(Addata1[0].request.queryString, "cust_params");
        //console.log("custparams0: "+custparams0);
        var delimitedcustparams0 = ada.splitStringwithDelimiter(custparams0, "&");
        //console.log("delimitedcustparams0: "+delimitedcustparams0);
        var DFPfis0 = ada.extractParamsFromList(delimitedcustparams0, "fis");
        console.log("DFPfis0: "+DFPfis0);
        DFPfis0.should.be.equal('1');
        var DFPfipt0 = ada.extractParamsFromList(delimitedcustparams0, "fipt");
        console.log("DFPfipt0: "+DFPfipt0);
        DFPfipt0.should.be.equal('1625');
        var DFPlif0 = ada.extractParamsFromList(delimitedcustparams0, "lif");
        console.log("DFPlif0: "+DFPlif0);
        DFPlif0.should.be.equal('0');
    });

    it('PPE-126480 Desktop - Verify fis, fipt & lif values when the user visits URL within a Primary Topic they have already visited', function ()
     {
        var custparams1 = ada.extractParamsFromAdcall(Addata1[1].request.queryString, "cust_params");
        //console.log("custparams1: "+custparams1);
        var delimitedcustparams1 = ada.splitStringwithDelimiter(custparams1, "&");
        //console.log("delimitedcustparams1: "+delimitedcustparams1);
        var DFPfis1 = ada.extractParamsFromList(delimitedcustparams1,"fis");
        console.log("DFPfis1: "+DFPfis1);
        DFPfis1.should.be.equal('0');
        var DFPfipt1 = ada.extractParamsFromList(delimitedcustparams1,"fipt");
        console.log("DFPfipt1: "+DFPfipt1);
        DFPfipt1.should.be.equal('0');
        var DFPlif1 = ada.extractParamsFromList(delimitedcustparams1,"lif");
        console.log("DFPlif1: "+DFPlif1);
        DFPlif1.should.be.equal('4395033773');
    });

    it('PPE-126483 Desktop - Verify fis, fipt & lif values when the user visits URL other then the Primary Topic they have already visited', function ()
     {
        var custparams2 = ada.extractParamsFromAdcall(Addata1[2].request.queryString, "cust_params");
        //console.log("custparams2: "+custparams2);
        var delimitedcustparams2 = ada.splitStringwithDelimiter(custparams2, "&");
        //console.log("delimitedcustparams2: "+delimitedcustparams2);
        var DFPfis2 = ada.extractParamsFromList(delimitedcustparams2,"fis");
        console.log("DFPfis2: "+DFPfis2);
        DFPfis2.should.be.equal('0');
        var DFPfipt2 = ada.extractParamsFromList(delimitedcustparams2,"fipt");
        console.log("DFPfipt2: "+DFPfipt2);
        DFPfipt2.should.be.equal('2945');
        var DFPlif2 = ada.extractParamsFromList(delimitedcustparams2,"lif");
        console.log("DFPlif2: "+DFPlif2);
        DFPlif2.should.be.equal('4395033773');
    });

    it('PPE-126487 Desktop - Verify fis, fipt & lif values when the user again visits URL of the 1st Primary Topic ID, after visiting the 2nd Primary Topic ID', function ()
     {
        var custparams3 = ada.extractParamsFromAdcall(Addata1[3].request.queryString, "cust_params");
        //console.log("custparams3: "+custparams3);
        var delimitedcustparams3 = ada.splitStringwithDelimiter(custparams3, "&");
        //console.log("delimitedcustparams3: "+delimitedcustparams3);
        var DFPfis3 = ada.extractParamsFromList(delimitedcustparams3,"fis");
        console.log("DFPfis3: "+DFPfis3);
        DFPfis3.should.be.equal('0');
        var DFPfipt3 = ada.extractParamsFromList(delimitedcustparams3,"fipt");
        console.log("DFPfipt3: "+DFPfipt3);
        DFPfipt3.should.be.equal('0');
        var DFPlif3 = ada.extractParamsFromList(delimitedcustparams3,"lif");
        console.log("DFPlif3: "+DFPlif3);
        DFPlif3.should.be.equal('4395100922');
    });
});

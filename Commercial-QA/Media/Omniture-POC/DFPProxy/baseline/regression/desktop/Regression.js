/*
****************************************************
This test case to verify DFP Ad calls
****************************************************
 */

// Declare required variables

var chai = require("chai");
var should = chai.should();
var webdriverio = require("webdriverio");
var urls1 = require("./../../../config/DFP1");
var urls2 = require("./../../../config/DFP2");
//var urls1 = require("./../../../config/DFPAdcallstestdata");
//var urls2 = require("./../../../config/DFPAdcallstestdata.1");
var ada = require("./../../../common/functions/AdcallsActions");
var browser = require('./browser');
var fun = require('./functions')(browser);
/*var webdriverio = require("webdriverio");
var options = {
    desiredCapabilities: {
        browserName: "firefox",  // declare browser name here
        // pageLoadStrategy: "normal",
        // ensureCleanSession: "true"
        //applicationCacheEnabled: "false"
    },    
    mochaOpts: {
        ui: 'bdd',
        waitforTimeout: 9999999
    },
};*/
//var browser = webdriverio.multiremote(options);
//var browser = webdriverio.remote(options);
var webmd_proxy = require("wdio-browser-proxy")(browser);
var qs = require("querystring");

// Describe Network calls function

function _Fn(val,val1) {
    describe(' DFP Ad calls Regression ', function () {
        var produrl = val1.URL;
        
        var stagingurl = val.URL;

        this.timeout(0);
        var Addata1,Addata2,omnituredata1,omnituredata2;
        var qs1,qs2,os1,os2;
        var aax,mnet,lotame;


        before(function (done) {
        var x = browser.enableProxy({})
            
            .url(stagingurl)
            //fun.nextpage()
                .end()
                .getNetworkCalls('https://securepubads.g.doubleclick.net/gampad').then(function (result) {
                    Addata1 = result;
                    console.log(Addata1.length);
                    qs1 = Addata1[0].request.queryString;
                });
                
                x.getNetworkCalls('http://std.o.webmd.com/b/ss').then(function (result) {
                    omnituredata1 = result;
                    console.log(omnituredata1.length);
                   // console.log(omnituredata1);
                    os1 = qs.parse(omnituredata1[omnituredata1.length-1].request.url);
                   
                });

                x.getNetworkCalls('http://aax.amazon-adsystem.com/e/dtb').then(function (result) {
                    aax = result;
                    console.log(aax.length);
                  
                });
                x.getNetworkCalls('http://contextual.media.net/bidexchange.js').then(function (result) {
                    mnet = result;
                    console.log(mnet.length);
                    
                });
                x.getNetworkCalls('http://bcp.crwdcntrl.net/').then(function (result) {
                    lotame = result;
                    console.log(lotame.length);
                    done();
                });
        });

        before(function (done) {
        var x = browser.enableProxy({})
            x.url(produrl)
                .end()
                .getNetworkCalls('https://securepubads.g.doubleclick.net/gampad').then(function (result) {
                    Addata2 = result;
                    console.log(Addata2.length);
                    qs2 = Addata2[0].request.queryString;
                    done();
                });            
        });

        it( "Amazon Call" , function () {
             aax.length.should.be.above(0); 
        });

        it("Omniture pageview Call", function () {
            omnituredata1.length.should.be.above(0); 
        });

        it("Medianet Call", function () {
            mnet.length.should.be.above(0);
        });

        it("Lotame Call", function () {
            lotame.length.should.be.above(0);
        });

        it( "Verify PVID ", function () {
            var c24 = os1.c24;
            var DFPpvid = ada.extarctPVIDfromAdcall(qs1);       
            ada.compareStrings(c24,DFPpvid);
        });

        it(" pt Validation with production", function () { 
            var DFPpt,prodpt;
            DFPpt = ada.extractPtfromAdcall(qs1);
            prodpt= ada.extractPtfromAdcall(qs2);
            ada.compareStrings(DFPpt,prodpt);
        });

        it(" pt Validation with page source", function () { 
            var pgsource=browser.getSource();
            console.log("Control Passes pagesource");
            var regex = /(var s_topic=\")\d(\",)?/; 
            var temp = regex.exec(pgsource);
            var sourcetopic = temp[0].substr(14,17);
            console.log(sourcetopic);    
            console.log(DFPpts==sourcetopic);
        });

        
        it(" fis validation first impression ", function () {
            var DFPfis,fis="1";
            DFPfis = ada.extractFisfromAdcall(qs1);
            ada.compareStrings(DFPfis,fis);
        }); 

         it(" fipt validation first impression ", function () {
            var DFPpt,DFPfipt;
            DFPpt = ada.extractPtfromAdcall(qs1);
            DFPfipt = ada.extractFiptfromAdcall(qs1);
            ada.compareStrings(DFPpt,DFPfipt);
            browser.deleteCookie('fipt');
         });



         it( " Compare POS Values of Lower environment with Production ", function () {

            var scplist = ada.splitScp(qs1);
            var prodscplist = ada.splitScp(qs2);
            var poslist = ada.extractPOSValues(scplist);
            var prodposlist = ada.extractPOSValues(prodscplist);
            ada.verifyTwoLists(poslist,prodposlist);

         });

        it(" iu_parts validation with prod  ", function () {

            var paramname = "iu_parts";
            var iuparts = ada.extractParamsFromAdcall(qs1,paramname);
            var prodiuparts = ada.extractParamsFromAdcall(qs2,paramname);
            ada.compareStrings(iuparts,prodiuparts);
            
        });

         it(" prev_ius validation with production ", function () {

            var paramname = "prev_iu_szs",del = ',';
            var ius = ada.extractParamsFromAdcall(qs1,paramname);
            var prodius = ada.extractParamsFromAdcall(qs2,paramname);
            var l1 = ada.splitStringwithDelimiter(ius,del);
            var l2 = ada.splitStringwithDelimiter(prodius,del);
            ada.verifyTwoLists(l1,l2);

         }); 

    })
}
for (var i = 0; i < urls1.length; i++) {
    _Fn(urls1[i],urls2[i]);
}

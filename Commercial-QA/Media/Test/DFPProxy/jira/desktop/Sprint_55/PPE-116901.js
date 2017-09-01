/*
****************************************************
This test case to verify DFP Ad calls
****************************************************
 */

// Declare required variables

var chai = require("chai");
var should = chai.should();
var webdriverio = require("webdriverio");
var argv = require("yargs").argv;
// var urls1 = require("./../../main/config/DFP1");
// var urls2 = require("./../../main/config/DFP2");  // test data file
// //  var urls1 = require("./../../main/config/DFPAdcallstestdata");
//  var urls2 = require("./../../main/config/DFPAdcallstestdata.1");
 var urls1 = require("./../../../config/PPE-112352TaboolaTestData")[argv.env];
 //var urls1 = require("./../../main/config/PPE-112352TaboolaTestData")[argv.env1];
 
var ada = require("./../../../common/functions/AdcallsActions");
//console.log(urls1.URL[0]);

var options = {
    desiredCapabilities: {
        browserName: "chrome",  // declare browser name here
        pageLoadStrategy: "normal",
        ensureCleanSession: "true"
        //applicationCacheEnabled: "false"
    },    
    mochaOpts: {
        ui: 'bdd',
        waitforTimeout: 9999999
    },
};
//var browser = webdriverio.multiremote(options);
var browser = webdriverio.remote(options);
var webmd_proxy = require("wdio-browser-proxy")(browser);
var qs = require("querystring");

// Describe Network calls function

function _Fn(val) {
    describe(' DFP Ad calls Regression ', function () {
        //var produrl = val1.URL;
        
        var stagingurl = val.URL;

        this.timeout(0);
        var Addata1,Addata2,omnituredata1,omnituredata2;
        var qs1,qs2,os1,os2;


        before(function (done) {
        var x = browser.enableProxy({})//.then(function () { console.log('finsihed enabling proxy'); })
            
            .url(stagingurl)
                .end()
                .getNetworkCalls('https://securepubads.g.doubleclick.net/gampad').then(function (result) {
                    Addata1 = result;
                    console.log(Addata1.length);
                    qs1 = Addata1[0].request.queryString;
                    //console.log(qs1);
                    //done();
                });
                
                x.getNetworkCalls('http://std.o.webmd.com/b/ss').then(function (result) {
                    omnituredata1 = result;
                    console.log(omnituredata1.length);
                    //console.log(omnituredata1)
                    os1 = qs.parse(omnituredata1[omnituredata1.length-1].request.url);
                    done();
                });
        });

     
        if (argv.env == "core" || argv.env == "coreoo") {

            it(" Verify POS 926 & POS 927 value for Health Solutions from Our Sponsors across Core and O&O properties", function () {
                var posvalue = "pos=926", expectedpos = '',nativekey1 = '',nativekey2='';
                var scplist = ada.splitScp(qs1);
                var poslist = ada.extractPOSValues(scplist);
                var index = ada.verifyValueinList(poslist, posvalue);

                var paramname = "prev_iu_szs", del = ',';
                var ius = ada.extractParamsFromAdcall(qs1, paramname);
                var l1 = ada.splitStringwithDelimiter(ius, del);
                (l1.length).should.equal(poslist.length);
                l1[index].should.equal(expectedpos);
                (scplist.includes(nativekey1)).should.equal(true);
                (scplist.includes(nativekey2)).should.equal(true);
            });
        }

        
        if (argv.env == "core") {

            it(" Verify only POS 927 value for More from WebMD on core", function () {
                var posvalue1 = "pos=926",posvalue2 = "pos=927", expectedpos1 = '', expectedpos2 = '',nativekey1 = '';
                var scplist = ada.splitScp(qs1);
                var poslist = ada.extractPOSValues(scplist);
                var index1 = ada.verifyValueinList(poslist, posvalue1);
                var index2 = ada.verifyValueinList(poslist, posvalue1);

                var paramname = "prev_iu_szs", del = ',';
                var ius = ada.extractParamsFromAdcall(qs1, paramname);
                var l1 = ada.splitStringwithDelimiter(ius, del);
                (l1.length).should.equal(poslist.length);
                l1[index1].should.equal(expectedpos1);
                l1[index2].should.equal(expectedpos2);
               (scplist.includes(nativekey1)).should.equal(true);

            });
        }

        it( "Verify PVID ", function () {
            var c24 = os1.c24;
            var DFPpvid = ada.extarctPVIDfromAdcall(qs1);       
            ada.compareStrings(c24,DFPpvid);
        });

/*         it( " Compare POS Values of Lower environment with Production ", function () {

            var scplist = ada.splitScp(qs1);
            var prodscplist = ada.splitScp(qs2);
            var poslist = ada.extractPOSValues(scplist);
            var prodposlist = ada.extractPOSValues(prodscplist);
            ada.verifyTwoLists(poslist,prodposlist);

         });*/

    })
}
for (var i = 0; i < urls1.URL.length; i++) {

    _Fn(urls1.URL[i]);
}

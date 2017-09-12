/*
****************************************************
This test case to verify DFP Ad calls
****************************************************
 */

// Declare required variables

var chai = require("chai");
var should = chai.should();
var argv = require("yargs").argv;
//var urls1 = require("./../../../config/PPE-112352TaboolaTestData")[argv.env];
var urls1 = require("../../../config/PPE-118381_TestData")[argv.env];
var ada = require("./../../../common/functions/AdcallsActions");
// console.log(urls1.URL[0]);
// console.log(urls1.URL.length)
var browser = require('../../../utilities/wdioconfig');
var webmd_proxy = require("wdio-browser-proxy")(browser);
var qs = require("querystring");

// Describe Network calls function

//function _Fn(val) {
describe(' DFP Ad calls Regression ', function () {
    //var produrl = val1.URL;

    //  var stagingurl = val.URL;
    var stagingurl = 'http://www.staging.webmd.com/diabetes/ss/slideshow-type-2-diabetes-overview?ecd=wgt_taboola_nosp_3630_ss_ad257';

    //var stagingurl = 'http://www.staging.medscape.com/';
    //argv.env = "O&O";
    this.timeout(0);
    var Addata1, omnituredata1;
    var qs1, qs2, os1, os2;


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
            //os1 = qs.parse(omnituredata1[omnituredata1.length - 1].request.url);
            done();
        });
    });

    if (argv.env != "O&O") {
        it('Verify ECD values in Omniture and DFP Ad call', function () {
            for (var i = 1; i <= omnituredata1.length; i++) {
                var os1 = qs.parse(omnituredata1[omnituredata1.length - i].request.url);
                if (os1.ecd) {
                    var ecd = os1.ecd;
                }
            }
            //ecd=parseInt(ecd);
            console.log(ecd);
            var DFPECD = ada.extractECDfromAdcall(qs1);
            //console.log(DFPECD);
            ada.compareStrings(ecd, DFPECD);
        });
    }

    if (argv.env == "O&O" || "NoECD") {
        it('Verify there shouldnot be any  ECD Code value in Omniture and DFP Call for O&O URLs', function () {
            for (var i = 1; i <= omnituredata1.length; i++) {
                var os1 = qs.parse(omnituredata1[omnituredata1.length - i].request.url);
                if (!os1.ecd) {
                }
                else{
                    var temp = os1.ecd;
                    temp.should.equal(false);
                }   
            }
        });
    }
	
	if(browsername = 'Internetexplorer') {
		     it('Verify there shouldnot be any  ECD Code value in Omniture and DFP Call in IE7', function () {
            for (var i = 1; i <= omnituredata1.length; i++) {
                var os1 = qs.parse(omnituredata1[omnituredata1.length - i].request.url);
                if (!os1.ecd) {
                }
                else{
                    var temp = os1.ecd;
                    temp.should.equal(false);
                }   
            }
        });
	}

});
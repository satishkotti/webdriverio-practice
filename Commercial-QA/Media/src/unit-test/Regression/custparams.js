/*
****************************************************
This test case to verify Omniture module calls
****************************************************
 */

// Declare required variables

var chai = require("chai");
var should = chai.should();
var webdriverio = require("webdriverio");
var urls1 = require("./../../main/config/DFP1");
var urls2 = require("./../../main/config/DFP2");  // test data file
var cm = require("./../../main/common/functions/CM");
var options = {
    desiredCapabilities: {
        browserName: "chrome" // declare browser name here
    }
};
var browser = webdriverio.remote(options);
var webmd_proxy = require("wdio-browser-proxy")(browser);
var qs = require("querystring");

// Describe Network calls function

function _Fn(val,val1) {
    describe('Omniture pageview verification', function () {
        var produrl = val1.URL;
        
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

        before(function (done) {
        var x = browser.enableProxy({})//.then(function () { console.log('finsihed enabling proxy'); })
            x.url(produrl)
                .end()
                .getNetworkCalls('https://securepubads.g.doubleclick.net/gampad').then(function (result) {
                    Addata2 = result;
                    console.log(Addata2.length);
                    qs2 = Addata2[0].request.queryString;
                    done();
                });
            
        });

        it(" PVID Validation ", function () { 
            var temp, temp1, DFPpvid;
            
            var c24l = os1.c24;
            console.log("Lower"+c24l );
            for (var x = 0; x < qs1.length; x++) {
                if (qs1[x].name == 'cust_params') {
                    var temp = qs1[x].value;
                    console.log(temp);
                    temp1 = temp.split('&');
                    //console.log(temp1);
                }
            }

            for (var s=0;s<temp1.length;s++) {
                if(temp1[s].includes("pvid=")) {
                    DFPpvid = temp1[s];
                    DFPpvid = DFPpvid.substring(5);
                    console.log(DFPpvid);
                }
            }
            c24l.should.equal(DFPpvid);
           // console.log("Console"+c24l.equal(DFPpvid));

        });


        it( " POS Values Validation", function () {
            var temp, temp1, strscpl, strscpprod, f;
            var l1 = [], l2 = [];
            for (var x = 0; x < qs1.length; x++) {
                if (qs1[x].name == 'prev_scp') {
                    var temp = qs1[x].value;
                     console.log(temp);
                    var temp1 = temp.split('&').join('|');
                    
                    strscpl = temp1.split('|');

                }
                if (qs2[x].name == 'prev_scp') {
                    var temp = qs2[x].value;
                    //console.log("*********************Production********************");
                    console.log(temp);
                    var temp1 = temp.split('&').join('|');
                    //  console.log("prod replace"+strscpprod);
                    //  console.log("*****************************************");
                    strscpprod = temp1.split('|');
                    //  console.log("Suceess Prod"+strscpprod);
                    //  console.log(strscpprod);

                }
            }

            for (x = 0; x < strscpl.length; x++) {
                //console.log(strscpl[x]);
                if (strscpl[x].includes("pos=")) {
                    l1.push(strscpl[x]);
                }
            }

            for (x = 0; x < strscpprod.length; x++) {
                //console.log(strscpl[x]);
                if (strscpprod[x].includes("pos=")) {
                    l2.push(strscpprod[x]);
                }
            }

            console.log("Only POS Values of Staging");
            console.log(l1);
            console.log("Only POS Values of Prod");
            console.log(l2);

            if (l1.length == l2.length) {
                console.log("Strings Matched");
                console.log(JSON.stringify(l1) == JSON.stringify(l2));
            }
            else {
                for (var s = 0; s < l1.length; s++) {
                    var counter = 0;
                    for (var a = 0; s < l2.length; a++) {
                        if (l1[s] == l2[a]) {
                            counter++;
                        }
                        if (counter == 2) {
                            console.log("Duplicated POS" + l2[a]);
                        }

                    }
                }
            }

        });

        it("prev_scp_POC with method", function () { 

            cm.comparePOS(qs1, qs2);

        });

        it(" iu_parts Validation with Prod  ", function () { 

            for (var x = 0; x < qs1.length; x++) {
                if (qs1[x].name == 'iu_parts') {
                    var temp1 = qs1[x].value;
                     console.log(temp1);
                }
                if (qs2[x].name == 'iu_parts') {
                    var temp2 = qs2[x].value;
                    console.log("*****************************************");
                    console.log(temp2);
   
                } 
            }
            console.log("iu_parts Comparision");
            console.log(temp1 == temp2);

        });

        it(" prev_ius ", function () { 
            var iuszsl,iuszsp;
            for (var x = 0; x < qs1.length; x++) {
                if (qs1[x].name == 'prev_iu_szs') {
                    var temp1 = qs1[x].value;
                     console.log(temp1);
 
                     iuszsl = temp1.split('|');
                
                     console.log(iuszsl);
                }
                if (qs2[x].name == 'prev_iu_szs') {
                    var temp2 = qs2[x].value;
                    console.log("*****************************************");

                     iuszsp = temp2.split('|');
    
                     console.log(iuszsp);
                }
            }

            if (iuszsl.length == iuszsp.length) {
                console.log("Strings Matched    SZS");
                console.log(JSON.stringify(iuszsl) == JSON.stringify(iuszsp));
            }
            else {
                for (var s = 0; s < iuszsl.length; s++) {
                    var counter = 0;
                    for (var a = 0; s < iuszsp.length; a++) {
                        if (iuszsl[s] == iuszsp[a]) {
                            counter++;
                        }
                        if (counter == 2) {
                            console.log("Duplicated szs" + iuszsp[a]);
                        }

                    }
                }
            }

        });

    })
}
for (var i = 0; i < urls1.length; i++) {
    _Fn(urls1[i],urls2[i]);
}

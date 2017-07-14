var chai = require('chai');
var should = chai.should();
var webdriverio = require("webdriverio");

//var webmd_proxy = require('wdio-browser-proxy')(browser);
var qs = require('querystring');
var browser = require('../config/wdioConfig');
//var webmd_proxy = require("wdio-browser-proxy")(browser);
var fun = require('../common/functions/fn');


describe('basic test', function () {
    this.timeout(999999);
    var omnitureData;
    before(function (done) {
        this.timeout(999999);
         fun.omniture(browser)
         .then(function(omnitures1) {
            omnitureData = omnitures1;
            console.log(omnitureData.length);
            var qs1 = omnitureData[omnitureData.length-1].request.queryString;
            //console.log("sasank"+JSON.stringify(omnitureData));
            console.log(qs1);
       done();
    });
    });

    // before(function(){
    //    this.timeout(999999)
    //     browser.enableProxy({}) //.then(function () { console.log('finsihed enabling proxy'); })
	// 		.url('http://www.staging.webmd.com/cold-and-flu/cold-guide/understanding-common-cold-basics#1')
	// 		.then(function () {
	// 				for(var i=0; i<=6; i++){
	// 			console.log(i + "------")
	// 			//browser.click(Page.quize());
	// 			browser.click("#ContentPane30 article ul li.next a");
	// 			}
	// 		})
	// 		.pause(10000)
	// 		.end()
	// 		.getNetworkCalls('https://securepubads.g.doubleclick.net/gampad/').then(function (result) {
    //             var Addata = result;
    //              var qs1 = Addata[Addata.length-1].request.queryString;
    //              console.log(qs1);
	// 		});
    // });

    it('it should make some calls to omniture', function () {
        omnitureData.length.should.be.above(0);
    });

    it('should make omniture call with the expected prop values', function(){
        //take the last omniture call
       // var propValues = qs.parse(omnitureData[omnitureData.length - 1].request.url);
        //check the prop values
        should.exist(propValues.pageName);
		console.log(propValues);
        propValues.pageName.should.equal('webmd.com/rx')
    });
});

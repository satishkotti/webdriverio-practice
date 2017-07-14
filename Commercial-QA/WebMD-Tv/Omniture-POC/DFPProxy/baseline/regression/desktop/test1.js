var chai = require('chai');
var should = chai.should();
var webdriverio = require("webdriverio");

//var webmd_proxy = require('wdio-browser-proxy')(browser);
var qs = require('querystring');
var browser = require('./browser');
//var webmd_proxy = require("wdio-browser-proxy")(browser);
var fun = require('./functions');
var argv = require("yargs").argv;
var input = require("./Webmd-tv")[argv.env];
var url=input.environment;
var xpath=input.article;

describe('basic test', function () {
    this.timeout(100000);
    var omnitureData;
    before(function (done) {
        this.timeout(100000);
         fun.omniture(browser,url,xpath)
         .then(function(omnitures1) {
            omnitureData = omnitures1;
            console.log("sasank"+JSON.stringify(omnitureData));
       done();
    });
    });

    it('it should make some calls to omniture', function () {
        omnitureData.length.should.be.above(0);
    });

    it('should make omniture call with the expected prop values', function(){
        //take the last omniture call
        var propValues = qs.parse(omnitureData[omnitureData.length - 1].request.url);
        //check the prop values
        should.exist(propValues.pageName);
		console.log(propValues);
        propValues.pageName.should.equal('webmd.com/rx')
    });
});

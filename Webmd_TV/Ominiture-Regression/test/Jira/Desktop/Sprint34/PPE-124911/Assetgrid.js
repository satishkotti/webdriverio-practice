var chai = require('chai');
var should = chai.should();
var webdriverio = require("webdriverio");
var expect = require('chai').expect;
var mocha = require('mocha')
var assert = require('chai').assert

var options = {
	desiredCapabilities: {
		browserName: 'chrome'
	}
};
var browser = webdriverio.remote(options);
var webmd_proxy = require('wdio-browser-proxy')(browser);
var qs = require('querystring');
var omnitureData;
describe('basic test', function () {
	this.timeout(5000000);

	before(function (done) {
		browser
			.enableProxy({})//.then(function () { console.log('finished enabling proxy'); })
			.url('https://www.staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/default.htm')
			.pause(5000)
			//watch now click
			
			.click("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div[1]//div[@class='overlay']//div[@class='button']//span[@class='txt']")
			.pause(10000)
			
				.moveToObject("//div[@id='ContentPane55']/div[1]")
			
			   .click("//div[@id='ContentPane55']/div[1]/div[2]/a/div[1]/img")
			  //.click("//div[@id='webmd-tv-playlists']/div[1]/div[2]/a/div[1]/img")
			  .pause(4000)
			  .url('https://www.staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/video-multiple-sclerosis-everyday-life')
			    .pause(4000)
				.moveToObject("//div[@id='ContentPane55']/div[1]")
				 .pause(4000)
  				.click("//div[@id='ContentPane55']/div[1]/div[3]/a/div[2]/h5/span")
				 

			
			
			.pause(6000)
			.end()
			.getNetworkCalls('https://ssl.o.webmd.com').then(function (result) {
				//console.log(result)
				omnitureData = result;
				done();
			});
	});

	it('it should make some calls to omniture', function () {
		omnitureData.length.should.be.above(0);
console.log('length ========== + ' + omnitureData.length);
		console.log(omnitureData);
	
	});


	it('Validate ssl call values for splash page', function () {
		//take the last omniture call
		//console.log(" total data"+JSON.stringify(omnitureData[1].request.queryString.pageName));



		// return false;
		//    var propValues = qs.parse(omnitureData[omnitureData-3].request.url);
		var propValues = qs.parse(omnitureData[1].request.url);
		console.log(propValues.pageName);
		propValues.pageName.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/');
		propValues.g.should.equal('https://www.staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/default.htm');

		propValues.c3.should.equal('core');
		propValues.c4.should.equal('1827');
		propValues.c6.should.equal('toc');
		propValues.c29.should.equal('genzyme_aubagio_live thrive ms');
		propValues.c30.should.equal('webmd tv - sp');
		propValues.c31.should.equal('be empowered ms webmdtv');
		propValues.c66.should.equal('D=aid');
		propValues.c48.should.equal('mbl-no');

	});


	
	it('Validate calls for slide show in asset grid', function () {
		console.log('length ========== + ' + omnitureData.length);
		var propValues = qs.parse(omnitureData[4].request.url);
		console.log(propValues);

		propValues.pageName.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/slideshow-ms-brain-games');
		propValues.g.should.equal('https://www.staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/slideshow-ms-brain-games');
		propValues.mpage.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-m');
		propValues.mmodule.should.equal('ed-rspsvmrabt');
		propValues.mlink.should.equal('1');
		propValues.c3.should.equal('core');
		propValues.c4.should.equal('1827');
		propValues.c15.should.equal('genzyme_aubagio_live thrive ms_ed-rspsvmrabt_1');
		propValues.c29.should.equal('genzyme_aubagio_live thrive ms');
		propValues.c30.should.equal('webmd tv - sp');
		propValues.c31.should.equal('be empowered ms webmdtv');
		propValues.c48.should.equal('mbl-no');
		
	});
	it('Validate calls for article in asset grid', function () {
		console.log('length ========== + ' + omnitureData.length);
		var propValues = qs.parse(omnitureData[6].request.url);
		console.log(propValues);

		propValues.pageName.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/career');
		propValues.g.should.equal('https://www.staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/career');
		propValues.mpage.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-m');
		propValues.mmodule.should.equal('ed-rspsvmrabt');
		propValues.mlink.should.equal('2');
		propValues.c3.should.equal('core');
		propValues.c4.should.equal('1827');
		propValues.c15.should.equal('genzyme_aubagio_live thrive ms_ed-rspsvmrabt_2');
		propValues.c29.should.equal('genzyme_aubagio_live thrive ms');
		propValues.c30.should.equal('webmd tv - sp');
		propValues.c31.should.equal('be empowered ms webmdtv');
		propValues.c48.should.equal('mbl-no');
		
	});
	
	

});
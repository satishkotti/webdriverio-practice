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
	this.timeout(400000);

	before(function (done) {
		browser
			.enableProxy({})//.then(function () { console.log('finished enabling proxy'); })
		
	.url('https://www.staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/video-multiple-sclerosis-everyday-life')
		.pause(8000)
		
			.moveToObject("//div[@id='ContentPane55']/div[1]/div[1]")
			.pause(5000)
		
		.click("//*[@id='WMDTVShareYourStory']/div[1]/textarea")
		
			.setValue("//*[@id='WMDTVShareYourStory']/div[1]/textarea",'test')
			//select gender
			.click("//form[@id='WMDTVShareYourStory']/div[2]/div[1]/div/div[1]/div/div[1]/label")
			.setValue("//input[@id='ugc-name']",'test')
			.setValue("//input[@id='ugc-email']",'test@test.com')
				.setValue("//input[@id='ugc-city']",'Alabama')
				.selectByVisibleText("//form[@id='WMDTVShareYourStory']/div[2]/div[1]/section/div[@class='field text state']/select",'Alabama')
				// selects terms and condition
			.click("//form[@id='WMDTVShareYourStory']/div[2]/div[2]/span[1]/label")
			.pause(2000)	
				// selects Share submit
			.click("//form[@id='WMDTVShareYourStory']/div[2]/button")	

			

			.pause(7000)
			
			.end()
			.getNetworkCalls('https://ssl.o.webmd.com').then(function (result) {
				
				omnitureData = result;
				done();
			});
	});

	it('it should make some calls to omniture', function () {
		omnitureData.length.should.be.above(0);

		console.log(omnitureData);
		console.log("omnitureData.length - " + omnitureData.length);

	});


	it('Validate UGC data entry share module  ssl calls', function () {
		//take the last omniture call
		var propValues = qs.parse(omnitureData[3].request.url);
		 console.log("page name - " + propValues.pageName);
		propValues.pageName.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-multiple-sclerosis-everyday-life');
		propValues.g.should.equal('https://www.staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/video-multiple-sclerosis-everyday-life');

		propValues.mpage.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-m');
		propValues.mmodule.should.equal('ugc-sbmt');
		propValues.c3.should.equal('core');
		propValues.c4.should.equal('1827');
		propValues.c6.should.equal('feature - video');	
		propValues.c15.should.equal('genzyme_aubagio_live thrive ms_ugc-sbmt');
		propValues.c29.should.equal('genzyme_aubagio_live thrive ms');
		propValues.c30.should.equal('webmd tv - sp');
		propValues.c31.should.equal('be empowered ms webmdtv');
		propValues.c33.should.equal('video-multiple-sclerosis-everyday-life');		
		propValues.c48.should.equal('mbl-no');
		propValues.pe.should.equal('lnk_o');
		propValues.pev2.should.equal('ugc-sbmt');

	});
});
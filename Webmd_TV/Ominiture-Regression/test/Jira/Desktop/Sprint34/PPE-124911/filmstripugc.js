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
			.url('https://www.staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/default.htm')
			.pause(5000)
			//watch now click
			//watch no click
			.click("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div[1]//div[@class='overlay']//div[@class='button']//span[@class='txt']")
			.pause(10000)
			.moveToObject("//div[@id='webmd-tv-playlists']")
			.pause(5000)
			//click left  navigation for filmstrip
			.click("//div[@id='webmd-tv-playlists']/div[2]/div[2]/a[1]/div")
			//click right navigation for filmstrip
			.click("//div[@id='webmd-tv-playlists']/div[2]/div[2]/a[2]/div")
			.pause(8000)
			

			.pause(5000)
			.moveToObject("//div[@id='ugc-widget']")
			.pause(5000)
			
			
			//click right navigation for ugc module
			.click("//div[@id='ugc-widget']/div[2]/a[2]/div[@class='owl-next']")
			.pause(8000)
			//click left  navigation for ugc module
			.click("//div[@id='ugc-widget']/div[2]/a[1]/div[@class='owl-prev']")
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
	it('Validate Video page ssl calls', function () {
		//take the last omniture call
		var propValues = qs.parse(omnitureData[2].request.url);
		// console.log(propValues.pageName);
		propValues.pageName.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-multiple-sclerosis-everyday-life');
		propValues.g.should.equal('https://www.staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/video-multiple-sclerosis-everyday-life');



		propValues.mpage.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/');

		propValues.mmodule.should.equal('ed-rwbtvprm');
		propValues.mlink.should.equal('1');
		propValues.c3.should.equal('core');
		propValues.c4.should.equal('1827');
		propValues.c6.should.equal('feature - video');
		propValues.c7.should.equal('091e9c5e81727e13');
		propValues.c8.should.equal('webmd video product');
		propValues.c15.should.equal('genzyme_aubagio_live thrive ms_ed-rwbtvprm_1');
		propValues.c29.should.equal('genzyme_aubagio_live thrive ms');
		propValues.c30.should.equal('webmd tv - sp');
		propValues.c31.should.equal('be empowered ms webmdtv');
		propValues.c33.should.equal('video-multiple-sclerosis-everyday-life');
		propValues.c37.should.equal('brain and nervous system');
		propValues.c38.should.equal('multiple sclerosis');
		propValues.c45.should.equal('multiple-sclerosis/be-empowered-ms-17/vidrprem/video-multiple-sclerosis-everyday-life');
		propValues.c66.should.equal('D=aid');
		propValues.c48.should.equal('mbl-no');

	});

	
	it('Validate calls for Left Navigation of filmstrip', function () {
		console.log('length ========== + ' + omnitureData.length);
		var propValues = qs.parse(omnitureData[4].request.url);
		console.log(propValues);

		propValues.pageName.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-multiple-sclerosis-everyday-life');
		propValues.g.should.equal('https://www.staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/video-multiple-sclerosis-everyday-life');
		propValues.mpage.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-m');
		propValues.mmodule.should.equal('mvl-rspsvplaylist');
		propValues.mlink.should.equal('left');
		propValues.c3.should.equal('core');
		propValues.c4.should.equal('1827');
		propValues.c15.should.equal('genzyme_aubagio_live thrive ms_mvl-rspsvplaylist_left');
		propValues.c29.should.equal('genzyme_aubagio_live thrive ms');
		propValues.c30.should.equal('webmd tv - sp');
		propValues.c31.should.equal('be empowered ms webmdtv');
		propValues.c48.should.equal('mbl-no');
		propValues.pe.should.equal('lnk_o');
		propValues.pev2.should.equal('mvl-rspsvplaylist_left');
	});
	it('Validate calls for Right Navigation of filmstrip', function () {
		console.log('length ========== + ' + omnitureData.length);
		var propValues = qs.parse(omnitureData[5].request.url);
		console.log(propValues);

		propValues.pageName.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-multiple-sclerosis-everyday-life');
		propValues.g.should.equal('https://www.staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/video-multiple-sclerosis-everyday-life');
		propValues.mpage.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-m');
		propValues.mmodule.should.equal('mvl-rspsvplaylist');
		propValues.mlink.should.equal('right');
		propValues.c3.should.equal('core');
		propValues.c4.should.equal('1827');
		propValues.c15.should.equal('genzyme_aubagio_live thrive ms_mvl-rspsvplaylist_right');
		propValues.c29.should.equal('genzyme_aubagio_live thrive ms');
		propValues.c30.should.equal('webmd tv - sp');
		propValues.c31.should.equal('be empowered ms webmdtv');
		propValues.c48.should.equal('mbl-no');
		propValues.pe.should.equal('lnk_o');
		propValues.pev2.should.equal('mvl-rspsvplaylist_right');
	});
	it('Validate calls for Left Navigation of ugc module', function () {
		console.log('length ========== + ' + omnitureData.length);
		var propValues = qs.parse(omnitureData[7].request.url);
		console.log(propValues);

		propValues.pageName.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-multiple-sclerosis-everyday-life');
		propValues.g.should.equal('https://www.staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/video-multiple-sclerosis-everyday-life');
		propValues.mpage.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-m');
		propValues.mmodule.should.equal('prm-rrdrshr');
		propValues.mlink.should.equal('prev');
		propValues.c3.should.equal('core');
		propValues.c4.should.equal('1827');
		propValues.c15.should.equal('genzyme_aubagio_live thrive ms_prm-rrdrshr_prev');
		propValues.c29.should.equal('genzyme_aubagio_live thrive ms');
		propValues.c30.should.equal('webmd tv - sp');
		propValues.c31.should.equal('be empowered ms webmdtv');
		propValues.c48.should.equal('mbl-no');
		propValues.pe.should.equal('lnk_o');
		propValues.pev2.should.equal('prm-rrdrshr_prev');
	});
	it('Validate calls for Right Navigation of ugc module', function () {
		console.log('length ========== + ' + omnitureData.length);
		var propValues = qs.parse(omnitureData[6].request.url);
		console.log(propValues);

		propValues.pageName.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-multiple-sclerosis-everyday-life');
		propValues.g.should.equal('https://www.staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/video-multiple-sclerosis-everyday-life');
		propValues.mpage.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-m');
		propValues.mmodule.should.equal('prm-rrdrshr');
		propValues.mlink.should.equal('next');
		propValues.c3.should.equal('core');
		propValues.c4.should.equal('1827');
		propValues.c15.should.equal('genzyme_aubagio_live thrive ms_prm-rrdrshr_next');
		propValues.c29.should.equal('genzyme_aubagio_live thrive ms');
		propValues.c30.should.equal('webmd tv - sp');
		propValues.c31.should.equal('be empowered ms webmdtv');
		propValues.c48.should.equal('mbl-no');
		propValues.pe.should.equal('lnk_o');
		propValues.pev2.should.equal('prm-rrdrshr_next');
	});
	

});
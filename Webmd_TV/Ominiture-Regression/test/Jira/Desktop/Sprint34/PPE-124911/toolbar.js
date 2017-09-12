var chai = require('chai');
var should = chai.should();
var webdriverio = require("webdriverio");
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
    this.timeout(350000);
 
    before(function (done) {
        browser
            .enableProxy({})//.then(function () { console.log('finished enabling proxy'); })
            .url('https://www.staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/default.htm')
			.pause(7000)
			//watch no click
			.click("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div[1]//div[@class='overlay']//div[@class='button']//span[@class='txt']")
			.pause(10000)
            .moveToObject("//div[contains(@id,'webmd-player')]")
            .pause(5000)
			 //pause
			 .click("//div [@class='dyn-controlbar']/div[@class='vjs-play-control vjs-control vjs-playing']")
			 .pause(8000)
			 //play
			 .click("//div [@class='dyn-controlbar']/div[@class='vjs-play-control vjs-control vjs-paused']")
			// Mute
			.pause(5000)
			 .click(".vjs-mute-control.vjs-control.vjs-vol-3.vjs-vol-1")
			//  // UnMute
			 .pause(8000)
			 .click(".vjs-mute-control.vjs-control.vjs-vol-3.vjs-vol-0")
			 // CC On
			 .pause(8000)
			  .click(".vjs-captions-control.vjs-control")
			//  // CC Off
			 .pause(8000)
			 .click(".vjs-captions-control.vjs-control.captions-on")
			//  Bigger Screen(full)
			  .pause(8000)
			  .click(".vjs-fullscreen-control.vjs-control")
			
			.pause(5000)
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

   

   it('Validate ssl call values for splash page', function(){
        //take the last omniture call
		//console.log(" total data"+JSON.stringify(omnitureData[1].request.queryString.pageName));
		


		
 
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
	it('Validate Video page ssl calls', function(){
          console.log('length ========== + '+ omnitureData.length);
        //take the last omniture call
        var propValues = qs.parse(omnitureData[2].request.url);
		// console.log(propValues.pageName);
	propValues.pageName.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-multiple-sclerosis-everyday-life');
		propValues.g.should.equal('https://www.staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/video-multiple-sclerosis-everyday-life');
		// propValues.g.should.equal('https://www.staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/default.htm');

		
		propValues.mpage.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/');
		// propValues.mpage.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-m');
		
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

	it('Validate calls for pause', function () {
			 console.log('length ========== + '+ omnitureData.length);
          var propValues = qs.parse(omnitureData[4].request.url);
		console.log(propValues);
		
		propValues.pageName.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-multiple-sclerosis-everyday-life');
		propValues.g.should.equal('https://www.staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/video-multiple-sclerosis-everyday-life');
		propValues.mpage.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-m');
		propValues.mmodule.should.equal('vidrprem-ctl');
		propValues.mlink.should.equal('pause');
		propValues.c3.should.equal('core');
		propValues.c4.should.equal('1827');
		propValues.c15.should.equal('genzyme_aubagio_live thrive ms_vidrprem-ctl_pause');
		propValues.c29.should.equal('genzyme_aubagio_live thrive ms');
		propValues.c30.should.equal('webmd tv - sp');
		propValues.c31.should.equal('be empowered ms webmdtv');		
		propValues.c48.should.equal('mbl-no');		
       propValues.pe.should.equal('lnk_o');
	   propValues.pev2.should.equal('vidrprem-ctl_pause');
    });
	it('Validate calls for Play', function () {
			console.log('length ========== + '+ omnitureData.length);
          var propValues = qs.parse(omnitureData[5].request.url);
		console.log(propValues);
		
		propValues.pageName.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-multiple-sclerosis-everyday-life');
		propValues.g.should.equal('https://www.staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/video-multiple-sclerosis-everyday-life');
		propValues.mpage.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-m');
		propValues.mmodule.should.equal('vidrprem-ctl');
		propValues.mlink.should.equal('play');
		propValues.c3.should.equal('core');
		propValues.c4.should.equal('1827');
		propValues.c15.should.equal('genzyme_aubagio_live thrive ms_vidrprem-ctl_play');
		propValues.c29.should.equal('genzyme_aubagio_live thrive ms');
		propValues.c30.should.equal('webmd tv - sp');
		propValues.c31.should.equal('be empowered ms webmdtv');		
		propValues.c48.should.equal('mbl-no');		
       propValues.pe.should.equal('lnk_o');
	   propValues.pev2.should.equal('vidrprem-ctl_play');
    });
	it('Validate calls for Mute', function () {
			 console.log('length ========== + '+ omnitureData.length);
          var propValues = qs.parse(omnitureData[6].request.url);
		console.log(propValues);
		
		propValues.pageName.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-multiple-sclerosis-everyday-life');
		propValues.g.should.equal('https://www.staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/video-multiple-sclerosis-everyday-life');
		propValues.mpage.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-m');
		propValues.mmodule.should.equal('vidrprem-ctl');
		propValues.mlink.should.equal('mute');
		propValues.c3.should.equal('core');
		propValues.c4.should.equal('1827');
		propValues.c15.should.equal('genzyme_aubagio_live thrive ms_vidrprem-ctl_mute');
		propValues.c29.should.equal('genzyme_aubagio_live thrive ms');
		propValues.c30.should.equal('webmd tv - sp');
		propValues.c31.should.equal('be empowered ms webmdtv');		
		propValues.c48.should.equal('mbl-no');		
       propValues.pe.should.equal('lnk_o');
	   propValues.pev2.should.equal('vidrprem-ctl_mute');
    });
	it('Validate calls for UnMute', function () {
			 console.log('length ========== + '+ omnitureData.length);
          var propValues = qs.parse(omnitureData[7].request.url);
		console.log(propValues);
		
		propValues.pageName.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-multiple-sclerosis-everyday-life');
		propValues.g.should.equal('https://www.staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/video-multiple-sclerosis-everyday-life');
		propValues.mpage.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-m');
		propValues.mmodule.should.equal('vidrprem-ctl');
		propValues.mlink.should.equal('unmute');
		propValues.c3.should.equal('core');
		propValues.c4.should.equal('1827');
		propValues.c15.should.equal('genzyme_aubagio_live thrive ms_vidrprem-ctl_unmute');
		propValues.c29.should.equal('genzyme_aubagio_live thrive ms');
		propValues.c30.should.equal('webmd tv - sp');
		propValues.c31.should.equal('be empowered ms webmdtv');		
		propValues.c48.should.equal('mbl-no');		
       propValues.pe.should.equal('lnk_o');
	   propValues.pev2.should.equal('vidrprem-ctl_unmute');
    });
	
	it('Validate calls for CC On', function () {
			 console.log('length ========== + '+ omnitureData.length);
          var propValues = qs.parse(omnitureData[8].request.url);
		console.log(propValues);
		
		propValues.pageName.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-multiple-sclerosis-everyday-life');
		propValues.g.should.equal('https://www.staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/video-multiple-sclerosis-everyday-life');
		propValues.mpage.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-m');
		propValues.mmodule.should.equal('vidrprem-ctl');
		propValues.mlink.should.equal('ccy');
		propValues.c3.should.equal('core');
		propValues.c4.should.equal('1827');
		propValues.c15.should.equal('genzyme_aubagio_live thrive ms_vidrprem-ctl_ccy');
		propValues.c29.should.equal('genzyme_aubagio_live thrive ms');
		propValues.c30.should.equal('webmd tv - sp');
		propValues.c31.should.equal('be empowered ms webmdtv');		
		propValues.c48.should.equal('mbl-no');		
       propValues.pe.should.equal('lnk_o');
	   propValues.pev2.should.equal('vidrprem-ctl_ccy');
    });
	it('Validate calls for CC Off', function () {
			console.log('length ========== + '+ omnitureData.length);
          var propValues = qs.parse(omnitureData[9].request.url);
		console.log(propValues);
		
		propValues.pageName.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-multiple-sclerosis-everyday-life');
		propValues.g.should.equal('https://www.staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/video-multiple-sclerosis-everyday-life');
		propValues.mpage.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-m');
		propValues.mmodule.should.equal('vidrprem-ctl');
		propValues.mlink.should.equal('ccn');
		propValues.c3.should.equal('core');
		propValues.c4.should.equal('1827');
		propValues.c15.should.equal('genzyme_aubagio_live thrive ms_vidrprem-ctl_ccn');
		propValues.c29.should.equal('genzyme_aubagio_live thrive ms');
		propValues.c30.should.equal('webmd tv - sp');
		propValues.c31.should.equal('be empowered ms webmdtv');		
		propValues.c48.should.equal('mbl-no');		
       propValues.pe.should.equal('lnk_o');
	   propValues.pev2.should.equal('vidrprem-ctl_ccn');
    });
	it('Validate calls for Full Screen On', function () {
		 console.log('length ========== + '+ omnitureData.length);
          var propValues = qs.parse(omnitureData[10].request.url);
		console.log(propValues);
		
		propValues.pageName.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-multiple-sclerosis-everyday-life');
		propValues.g.should.equal('https://www.staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/video-multiple-sclerosis-everyday-life');
		propValues.mpage.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-m');

		propValues.mlink.should.equal('bigr');
		propValues.c3.should.equal('core');
		propValues.c4.should.equal('1827');
		propValues.c15.should.equal('genzyme_aubagio_live thrive ms_vidrprem-ctl_bigr');
		propValues.c29.should.equal('genzyme_aubagio_live thrive ms');
		propValues.c30.should.equal('webmd tv - sp');
		propValues.c31.should.equal('be empowered ms webmdtv');		
		propValues.c48.should.equal('mbl-no');		
       propValues.pe.should.equal('lnk_o');
	   propValues.pev2.should.equal('vidrprem-ctl_bigr');
    });
	
});
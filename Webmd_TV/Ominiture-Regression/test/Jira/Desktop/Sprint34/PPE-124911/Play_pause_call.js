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
			.click("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div[1]//div[@class='overlay']//div[@class='button']//span[@class='txt']")
			.pause(8000)
			//about
			 .click("//div[@class='cmd-section']/div[@class='tab-about btn btn-default']")
			// //about clsoe
			.pause(8000)
					
			 .click("//div[@class='about-video premium open']//div[@class='header-row clearfix']//span[@class='close-icon']")
			 .pause(8000)
			
			// //transcriptFS
			.click("//div[@class='cmd-section']/div[@class='cmd-transcripts btn btn-default']")
			 //transcript close
			.pause(6000)
			 .click("//div[@class='transcript-video premium open']/div[@class='header-row clearfix']//span[@class='close-icon']")
			.pause(8000)
			 //facebook
			 .click("//div[@class='cmd-section']/div[@class='tab-about btn btn-default']/following-sibling::div[1]/span")
			//twitter
			.pause(8000)
			 .click("//div[@class='cmd-section']/div[@class='tab-about btn btn-default']/following-sibling::div[2]")
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
	it('Validate Video page ssl calls', function(){
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
	
	it('Validate calls for About', function () {
          var propValues = qs.parse(omnitureData[4].request.url);
		//console.log(propValues);		
		propValues.pageName.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-multiple-sclerosis-everyday-life');
		// propValues.pageName.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/');	
		propValues.g.should.equal('https://www.staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/video-multiple-sclerosis-everyday-life');
		
		propValues.mpage.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-m');


		propValues.mmodule.should.equal('video-rspsv');
		// propValues.mmodule.should.equal('vidrprem')		
		propValues.mlink.should.equal('about');
		propValues.c3.should.equal('core');
		propValues.c4.should.equal('1827');
		propValues.c15.should.equal('genzyme_aubagio_live thrive ms_video-rspsv_about');
		propValues.c29.should.equal('genzyme_aubagio_live thrive ms');
		propValues.c30.should.equal('webmd tv - sp');
		propValues.c31.should.equal('be empowered ms webmdtv');			
       propValues.pe.should.equal('lnk_o');
	   propValues.pev2.should.equal('video-rspsv_about');
    });
	
	it('Validate calls for About close', function () {
		console.log('length ========== + '+ omnitureData.length);
          var propValues = qs.parse(omnitureData[5].request.url);
		console.log(propValues);
		
		//propValues.pageName.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-multiple-sclerosis-everyday-life');
		propValues.pageName.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-multiple-sclerosis-everyday-life');		
		propValues.g.should.equal('https://www.staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/video-multiple-sclerosis-everyday-life');
		propValues.mpage.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-m');
		propValues.mmodule.should.equal('vd-rspsvabout');
	
		propValues.mlink.should.equal('cncl');
		// propValues.mlink.should.equal('about');
		propValues.c3.should.equal('core');
		propValues.c4.should.equal('1827');
		propValues.c15.should.equal('genzyme_aubagio_live thrive ms_vd-rspsvabout_cncl');
		propValues.c29.should.equal('genzyme_aubagio_live thrive ms');
		propValues.c30.should.equal('webmd tv - sp');
		propValues.c31.should.equal('be empowered ms webmdtv');		
propValues.c48.should.equal('mbl-no');		
       propValues.pe.should.equal('lnk_o');
	   propValues.pev2.should.equal('vd-rspsvabout_cncl');
    });
	
	
		it('Validate calls for transcript', function () {
			console.log('length ========== + '+ omnitureData.length);
          var propValues = qs.parse(omnitureData[6].request.url);
		console.log(propValues);
		
		propValues.pageName.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-multiple-sclerosis-everyday-life');
		propValues.g.should.equal('https://www.staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/video-multiple-sclerosis-everyday-life');
		
		propValues.mpage.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-m');
		propValues.mmodule.should.equal('video-rspsv');
		propValues.mlink.should.equal('trans');
		propValues.c3.should.equal('core');
		propValues.c4.should.equal('1827');
		propValues.c15.should.equal('genzyme_aubagio_live thrive ms_video-rspsv_trans');
		propValues.c29.should.equal('genzyme_aubagio_live thrive ms');
		propValues.c30.should.equal('webmd tv - sp');
		propValues.c31.should.equal('be empowered ms webmdtv');			
       propValues.pe.should.equal('lnk_o');
	   propValues.pev2.should.equal('video-rspsv_trans');
    });
	
	it('Validate calls for transcript close', function () {
			console.log('length ========== + '+ omnitureData.length);
          var propValues = qs.parse(omnitureData[7].request.url);
		console.log(propValues);
		
		propValues.pageName.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-multiple-sclerosis-everyday-life');
		propValues.g.should.equal('https://www.staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/video-multiple-sclerosis-everyday-life');
		propValues.mpage.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-m');
		propValues.mmodule.should.equal('vd-rspsvtrans');	
		propValues.mmodule.should.equal('vd-rspsvtrans');	
		
		
		propValues.mlink.should.equal('cncl');
		propValues.c3.should.equal('core');
		propValues.c4.should.equal('1827');
		propValues.c15.should.equal('genzyme_aubagio_live thrive ms_vd-rspsvtrans_cncl');
		propValues.c29.should.equal('genzyme_aubagio_live thrive ms');
		propValues.c30.should.equal('webmd tv - sp');
		propValues.c31.should.equal('be empowered ms webmdtv');		
propValues.c48.should.equal('mbl-no');		
       propValues.pe.should.equal('lnk_o');
	   propValues.pev2.should.equal('vd-rspsvtrans_cncl');
    }); 
	
	it('Validate calls for facebook', function () {
		console.log('length ========== + '+ omnitureData.length);
          var propValues = qs.parse(omnitureData[8].request.url);
		console.log(propValues);
		
		propValues.pageName.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-multiple-sclerosis-everyday-life');
		propValues.g.should.equal('https://www.staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/video-multiple-sclerosis-everyday-life');
		propValues.mpage.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-m');
		propValues.mmodule.should.equal('video-rspsv');
		propValues.mlink.should.equal('face');
		propValues.c3.should.equal('core');
		propValues.c4.should.equal('1827');
		propValues.c15.should.equal('genzyme_aubagio_live thrive ms_video-rspsv_face');
		propValues.c29.should.equal('genzyme_aubagio_live thrive ms');
		propValues.c30.should.equal('webmd tv - sp');
		propValues.c31.should.equal('be empowered ms webmdtv');		
propValues.c48.should.equal('mbl-no');		
       propValues.pe.should.equal('lnk_o');
	   propValues.pev2.should.equal('video-rspsv_face');
    });
	
	it('Validate calls for twitter', function () {
			console.log('length ========== + '+ omnitureData.length);
          var propValues = qs.parse(omnitureData[9].request.url);
		console.log(propValues);
		
		propValues.pageName.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-multiple-sclerosis-everyday-life');
		propValues.g.should.equal('https://www.staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/video-multiple-sclerosis-everyday-life');
		propValues.mpage.should.equal('staging.webmd.com/multiple-sclerosis/be-empowered-ms-17/vidrprem/video-m');
		propValues.mmodule.should.equal('video-rspsv');
		propValues.mlink.should.equal('twit');
		propValues.c3.should.equal('core');
		propValues.c4.should.equal('1827');
		propValues.c15.should.equal('genzyme_aubagio_live thrive ms_video-rspsv_twit');
		propValues.c29.should.equal('genzyme_aubagio_live thrive ms');
		propValues.c30.should.equal('webmd tv - sp');
		propValues.c31.should.equal('be empowered ms webmdtv');		
propValues.c48.should.equal('mbl-no');		
       propValues.pe.should.equal('lnk_o');
	   propValues.pev2.should.equal('video-rspsv_twit');
    });
	
});
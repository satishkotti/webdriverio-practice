var webdriverio = require('webdriverio');
var should = require('should');
var argv = require("yargs").argv;
var input = require('./PPE-112352TaboolaTestData')[argv.env];
var urls = input.taboola;
var HTML = require('html-parse-stringify');
var pagesource;
var html = '<div class="oh"><p>hi</p></div>';
// var expected = '<script class="googleloaded">var amznads=amznads||{},googletag=window.googletag||{};googletag.cmd=googletag.cmd||[];var enableHeaderBidding=!0,$googleloaded;!function(){function a(a){if("http"!==a.substr(0,4)){var b="https:"==document.location.protocol;a=(b?"https:":"http:")+a}var c=document.createElement("script"),d=document.getElementsByTagName("script")[0];c.type="text/javascript",c.async=!0,c.src=a,d.parentNode.insertBefore(c,d)}function b(a){var b,c=[],d=[],e=0;for(e=0;e<a.length;e++)c.push(a[e]+"=\\d+");b=new RegExp(c.join("|"),"gi");var f=document.location.search.match(b);if(f){for(c=[],e=0;e<f.length;e++)f[e].indexOf("=1")>-1?c.push(f[e].split("=")[0]):f[e].indexOf("=0")>-1&&d.push(f[e].split("=")[0]);if(d.length>0&&c.length<1){for(e=0;e<enableHeaderBidding.length;e++){c.push(enableHeaderBidding[e]);for(var g=0;g<d.length;g++)if(d[g]==enableHeaderBidding[e]){c.pop();break}}return c}return c.length>0&&c}return!1}function c(){for(var a=!1,b=document.getElementsByTagName("meta"),c=[/^video/i],d=0;d<b.length;d++)if("og:type"===b[d].getAttribute("property"))for(var e=b[d].getAttribute("content"),f=0;f<c.length;f++)c[f].test(e)&&(a=!0);return a}if("undefined"!=typeof document.domain&&document.domain.toLowerCase().indexOf("fit.")>=0||document.domain.toLowerCase().indexOf(".webmd.boots.com")>=0)return!0;enableHeaderBidding&&(enableHeaderBidding=["mn","am"]),$googleloaded=!0;var d=["mn","am"],e={mn:"loadMediaHeaderBidding",am:"loadA9HeaderBidding"};if(a("//www.googletagservices.com/tag/js/gpt.js"),window.loadMediaHeaderBidding=function(){window.advBidxc=window.advBidxc||{},window.advBidxc.renderAd=function(){},window.advBidxc.startTime=(new Date).getTime(),window.advBidxc.timeout=300,window.advBidxc.version=3.2,window.advBidxc.customerId="8CU66J63J",window.advBidxc.isAdServerLoaded=!0;var b="https:"==document.location.protocol,c=(b?"https:":"http:")+"//contextual.media.net/bidexchange.js?cid="+window.advBidxc.customerId+"&version="+window.advBidxc.version+(b?"&https=1":"");a(c)},window.loadA9HeaderBidding=function(){document.getElementsByTagName("script")[0];amznads.asyncParams={id:"3100",callbackFn:function(){try{amznads.setTargetingForGPTAsync("amznslots")}catch(a){}},timeout:2e3},a("//c.amazon-adsystem.com/aax2/amzn_ads.js")},window.top===window.self&&!c()&&enableHeaderBidding!==!1&&(d!==!1&&(enableHeaderBidding=b(d)||enableHeaderBidding),enableHeaderBidding!==!1&&"object"==typeof enableHeaderBidding&&enableHeaderBidding.length>0)){for(var f=!1,g=0;g<enableHeaderBidding.length;g++)"undefined"!=typeof e[enableHeaderBidding[g]]&&"undefined"!=typeof window[e[enableHeaderBidding[g]]]&&(window[e[enableHeaderBidding[g]]].call(),f=!0);f===!0&&(enableHeaderBidding=!0)}}();</script>';



describe('PPE-112352 Taboola Core Technology', function () {
  /*before(function(){
   browser.windowHandleSize({width: 980, height: 691})
});*/

  function Fn(i) {

    // it(' Verify Taboola code in Page Source ' , function () {
    //   browser.url(input.taboola[i]);
	       
    //  //browser.timeout(99999);
    //   //browser.timeouts("pageLoad",90000);
    //   browser.pause(90000);
    //   pagesource = browser.getSource();
    // //   console.log(pagesource);
	  // // var ast = HTML.parse(html);
	  // // var temp = HTML.parse(pagesource);
		// // console.log(ast);
		// // console.log("***++++++****----+++++*****");
		// // console.log(temp);
		// pagesource.includes(expected);
		
    // });

    it(' Verify Taboola code in DOM- Positive ', function () {
      browser.url(input.taboola[i]);
      browser.pause(90000);

     var result = browser.execute(function jf () {
      var r = [];
      $('script').each(function (e) { if (/e.async = 1/.test(this.outerHTML)) { r.push(this) } })
      console.log(r.length > 0); 
      var t = r[0];
    });
	console.log(result);
    
    });
	
	  it(' Verify Taboola code in DOM - Negative ', function () {
      browser.url(input.taboola1[i]);
      browser.pause(90000);

     var result = browser.execute(function jf () {
      var r = [];
      $('script').each(function (e) { if (/e.async = 1/.test(this.outerHTML)) { r.push(this) } })
      console.log(r.length == 0); 
      //var t = r[0];
    });
	console.log(result);
    
    });
   
  }
  for (var i = 0; i < urls.length; i++) {
    Fn(i);
  }
});
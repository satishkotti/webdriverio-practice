var Q = require('Q');
var browser = require('../../config/wdioConfig');
var webmd_proxy = require("wdio-browser-proxy")(browser);
var Page = require('../pageObjects/page');

module.exports = {
	omniture: function (browser) {
		var deferred = Q.defer()
		browser.enableProxy({}) //.then(function () { console.log('finsihed enabling proxy'); })
			.url('http://www.staging.webmd.com/cold-and-flu/cold-guide/understanding-common-cold-basics#1')
			.then(function () {
				var j = 10;
				for (var i = 0; i <= j; i++) {
					console.log(i + "------");
					//browser.click(Page.quize());
					//browser.click("#ContentPane30 article ul li.next a").then(function(){
				//	this.clickMethod(browser);
					console.log("inside click method");
					////browser.pause(20000);
(function(cntr) {
        // here the value of i was passed into as the argument cntr
        // and will be captured in this function closure so each
        // iteration of the loop can have it's own value
        asycronouseProcess(function() {
            console.log(cntr);
			browser.click("#ContentPane30 article ul li.next a");
        });
    })(i);
				}
				// while (i < 6) {
				// 	browser.click("#ContentPane30 article ul li.next a").then(function () {
				// 		console.log(i + "------");
				// 		console.log("inside click method");
				// 		i++;
				// 		//browser.pause(20000);
				// 	});
				// }



			})
			.pause(10000)
			.end()
			.getNetworkCalls('https://securepubads.g.doubleclick.net/gampad/').then(function (result) {
				//console.log("sasi" + result);
				deferred.resolve(result);
			});
		return deferred.promise;
	},

	//clickMethod: function (d) {
		//d.click("#ContentPane30 article ul li.next a");
	//}
}

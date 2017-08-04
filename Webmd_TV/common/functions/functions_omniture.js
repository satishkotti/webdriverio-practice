var Q = require('Q');

//var webmd_proxy = require("wdio-browser-proxy")(browser);


module.exports = {
  omniture: function (browser) {
    
    var deferred = Q.defer()
    browser.enableProxy({}) //.then(function () { console.log('finsihed enabling proxy'); })
      .url('http://www.webmd.com/children/sleep-disorders-children-symptoms-solutions#1')
      .then(function () {
        for (var i = 1; i <= 4; i++) {
          setTimeout(function (x) {
            return function () { 
              console.log(x + "------");
              browser.waitForVisible('#ContentPane30 article ul li.next a', 10000).click("#ContentPane30 article ul li.next a");
           };
          }(i), 2000 * i);
        }
      })
      .pause(60000)
      .end()
      .getNetworkCalls('https://securepubads.g.doubleclick.net/gampad/').then(function (result) {
        //console.log("sasi" + result);
        deferred.resolve(result);
      });
    
    return deferred.promise;
  }
}
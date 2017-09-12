var Q = require('Q');

//var webmd_proxy = require("wdio-browser-proxy")(browser);


var self = module.exports = {
articlePages: function (browser) {
    
    var deferred = Q.defer()
    browser.enableProxy({}) //.then(function () { console.log('finsihed enabling proxy'); })
      .url('https://www.qa01.webmd.com/lupus/guide/arthritis-lupus#1')
      .then(function () {
      // var pagecount= self.pageCount();
        for (var i = 1; i <= 7; i++) {
          //setTimeout(function (x) {  this.timeout(40000);
            //return function () { 
              console.log(x + "------");
              browser.waitForVisible('#ContentPane30 article ul li.next a', 10000).click("#ContentPane30 article ul li.next a");
           //};
          //}(i), 2000 * i);
        }
      })
      .pause(60000)
      .end()
      .getNetworkCalls('https://securepubads.g.doubleclick.net/gampad/').then(function (result) {
        deferred.resolve(result);
      });
    
    return deferred.promise;
  },

    // pageCount: function (browser) {
    //     var deferred = Q.defer()
    //     var lastpage = browser.waitForVisible("//li[contains(@class,'page')][last()]").getText("//li[contains(@class,'page')][last()]");
    //     lastpage.parseInt(lastpage);
    //     deferred.resolve(lastpage);
    // }

}
//var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
var Page = require('./page');
var input = require('./../../config/locators');
var webdriverio = require("webdriverio");
var pg;

// var url = input.environment;
// var options = {
//     desiredCapabilities: {
//         browserName: "chrome" // declare browser name here
//     }
// };
// var browser = webdriverio.remote(options);
//var webmd_proxy = require("wdio-browser-proxy")(browser);

var commonel= function (browser){

   // var d= browser;
    console.log("satish"+input.nextpage);
    
    return{
//        nextpage:function(){d.click("//li[contains(@class,'next')]");},
nextpage:function(){d.click(input.nextpage);},
        
        lastpagenumber:function(){d.element("//li[contains(@class,'page')][last()]");},
        viewalllink:function(){d.element("//li[@class='view-all']");},
        previouspage:function(){d.element("//li[contains(@class,'previous')]");},
        activepage:function(){d.element("//li[@class='page active']");},

        navigateAllPages: function() {
            browser.waitForVisible("//li[contains(@class,'page')][last()]",4000)
      .getText("//li[contains(@class,'page')][last()]").then(function (result) {
            //     console.log("satish" + result);
             pg=result;
        console.log("satishfunction"+JSON.stringify(pg));
      });
        // for (var j = 1; j <= pg; j++) {
        //     //Clicking on next page link
        //     d.click("//li[contains(@class,'next')]");
        //     // Waiting for 15 sec
        //     d.pause(15000);
        // }
     }
    }
}

module.exports = commonel;


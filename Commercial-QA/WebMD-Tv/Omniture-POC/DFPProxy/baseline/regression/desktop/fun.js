//var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
//var Page = require('./../../page');


var pg;



var commonel= function (browser){

//    var d= browser;
 //var input = require('./../../common/elements/Locators')(d);
    //console.log("satish"+input.nextpage);
    
    return{
 nextpage:function(){browser.click("//li[contains(@class,'next')]");},

       // nextpage:function(){d.click(input.nextpage);},
        
        lastpagenumber:function(){browser.element("//li[contains(@class,'page')][last()]");},
        viewalllink:function(){browser.element("//li[@class='view-all']");},
        previouspage:function(){browser.element("//li[contains(@class,'previous')]");},
        activepage:function(){browser.element("//li[@class='page active']");},

        navigateAllPages: function() {
            browser.waitForVisible("//li[contains(@class,'page')][last()]",4000)
      .getText("//li[contains(@class,'page')][last()]").then(function (result) {
            //     console.log("satish" + result);
             pg=result;
        console.log("satishfunction"+JSON.stringify(pg));
      });
     }
    }
}

module.exports = commonel;
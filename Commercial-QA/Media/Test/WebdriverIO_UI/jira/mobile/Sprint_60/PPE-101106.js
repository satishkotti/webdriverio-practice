var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var functions = require('./../../../common/functions/Common.actions');
var Commonlocators = require('./../../../common/elements/Common.elements');
var input = require('./../../../config/PPE-101106.testdata')[argv.env];
var url = input.environment;
console.log("Number of urls: "+url.length);

describe('PPE-101106 - Prevent a second medianet call from being made from within scripts [SCRIPTS]', function ()
 {
    it('PPE-127808 Mobile - Verify that webmd.medianet is not available in responsive scripts file & PPE-127939 Desktop & Mobile - Regression test all page types', function ()
    {
		for(var i=0;i<url.length;i++)
        {
            browser.url(url[i]);
            console.log("*******************");
            console.log("Url "+i+": "+url[i]);
            var result = browser.execute(function()
            {  
                return typeof webmd.medianet === "undefined";
            })
            console.log("Result: "+JSON.stringify(result));
        }
	});	        
});
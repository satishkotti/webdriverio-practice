var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var assert = require("assert");
console.log(__dirname);
//var ss_Actions = require('./../../common/functions/FE_Smoke_SS_Action');
var ssElements = require('./../../common/elements/105397_Elements');
var Article_Actions = require('./../../common/functions/FE_Smoke_Article_Actions');
//FE_Smoke_SS_testdata
//var Input = require('./../../../config/FE_Smoke_SS.testdata')[argv.env];
//var URL = Input.environment;
//open the url
//browser.url(URL);

/*describe("current slide validatio",function(){
   it("should validate image and title are visible on the page",function(){
        browser.url("http://www.preview.webmd.com/diet/ss/slideshow-healthy-eating-resolutions");
        //browser.refresh();
        browser.leftClick('//div[@id="colorbox"]//div[@id="webmdHoverWrapper"]//div[@id="webmdHoverContent"]//div[@id="webmdHoverClose"]');
        check_visibility();
        
    });
});*/

module.exports =
    {
  
     check_primary_next_previous_button: function () {
            var elements = browser.getText(ssElements.slides_Count.selector);
            for (var i = 1; i < parseInt(elements) - 1; i++) 
            {
                var currentslide = browser.getText(ssElements.secondary_currslide.selector);
                //console.log(currentslide);
                browser.leftClick('//div [@class="controls primary"]//a [@class="next"]/i');
                browser.pause(1000);
                currentslide++;
                var curr_slide = browser.getText(ssElements.secondary_currslide.selector);
                if ((currentslide) == (curr_slide)) 
                {
                    console.log("next button is working");
                }
                
            }
            for (var i = elements; ((i <= elements) && (i != 2)); i--) 
            {
                var currentslide = browser.getText(ssElements.secondary_currslide.selector);
                browser.leftClick('//div [@id="dyn-ss"]//div [@class="controls primary"]//a [@class="prev"]/i');
                browser.pause(1000);
                currentslide--;
                var curr_slide = browser.getText(ssElements.secondary_currslide.selector);
                if (currentslide == curr_slide) {
                    console.log("previous button is working");
                }
               
            }
        },
        check_secondary_next_previous_button: function () 
        {
            var elements = browser.getText(ssElements.slides_Count.selector);
            //console.log(elements);
            for (var i = 1; i < parseInt(elements) - 1; i++) 
            {
                var currentslide = browser.getText(ssElements.secondary_currslide.selector);
                browser.leftClick("//div[@class='controls secondary']/a[@class='next']/i");
                browser.pause(1000);
                currentslide++;
                var curr_slide = browser.getText(ssElements.secondary_currslide.selector);
                if ((currentslide) == (curr_slide)) {
                    console.log("next button is working");
            }
                
            }
            for (var i = elements; ((i <= elements) && (i != 2)); i--) 
            {
                var currentslide = browser.getText(ssElements.secondary_currslide.selector);
                //console.log(currentslide);
                browser.leftClick('//div [@id="dyn-ss"]//a [@class="prev"]/i');
                browser.pause(2000);
                currentslide--;
                var curr_slide = browser.getText(ssElements.secondary_currslide.selector);
                if (currentslide == curr_slide) 
                {
                    console.log("previous button is working");
                }
                
            }

        },
        check_clickOnImage_working:function () 
        {
            var elements = browser.getText(ssElements.slides_Count.selector);
            //console.log(elements);
            for (var i = 1; i < parseInt(elements) - 1; i++) 
            {
                var currentslide = browser.getText(ssElements.secondary_currslide.selector);
                browser.leftClick(".//*[@id='dyn-ss']/div[1]/div/div/div["+i+"]/div[1]/img");
                browser.pause(1000);
                currentslide++;
                var curr_slide = browser.getText(ssElements.secondary_currslide.selector);
                if ((currentslide) == (curr_slide)) {
                    console.log("next button is working");
            }
                
            }
            for (var i = elements; ((i <= elements) && (i != 2)); i--) 
            {
                //console.log(currentslide);
                browser.leftClick('//div [@id="dyn-ss"]//a [@class="prev"]/i');
                browser.pause(2000);
                
            }
        }
    }
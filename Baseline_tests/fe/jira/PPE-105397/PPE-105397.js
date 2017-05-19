var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
console.log(__dirname);
var ss_Actions = require('./../../../common/functions/105397_Actions');
var ssElements = require('./../../../common/elements/105397_Elements');
var Article_Actions = require('./../../../common/functions/FE_Smoke_Article_Actions');
//FE_Smoke_SS_testdata
//var Input = require('./../../../config/FE_Smoke_SS.testdata')[argv.env];
var Input = require('d:/FE code/test/profile&revenue/prdemo/config/FE_Smoke_SS_testdata')[argv.env];
var URL = Input.environment;
//open the url
browser.url(URL);
//this.timeout(90000);
browser.pause(50000);
describe('PPE-105397:New slider integration into SlideShows', function () 
{
    /*it.only("PPE-109351:Verify clicking on 'right' arrow on Top and Bottom on desktop on slideshow moves to next slide", function () 
    {
        browser.leftClick('//div[@id="colorbox"]//div[@id="webmdHoverWrapper"]//div[@id="webmdHoverContent"]//div[@id="webmdHoverClose"]');
        ss_Actions.check_rightarrowbutton_working(); 

    });

    it("PPE-109350:Verify clicking on 'left' arrow on Top or Bottom on desktop on slideshow moves to previous slide", function () 
    {
       ss_Actions.check_leftarrowbutton_working();

    });

    it("PPE-109352:Verify clicking on the image on desktop on slideshow moves to next slide", function () {

       ss_Actions.check_clickOnImage_working();

    });*/
    it("Should check for working of next and previous Primary navigation buttons validation",function()
    {
         
        browser.leftClick('//div[@id="colorbox"]//div[@id="webmdHoverWrapper"]//div[@id="webmdHoverContent"]//div[@id="webmdHoverClose"]');
         ss_Actions.check_primary_next_previous_button();       
         
    });

it("Should check for working of next and previous Secondary navigation buttons validation",function()
    {
            ss_Actions.check_secondary_next_previous_button();

    });
     it.only("PPE-109352:Verify clicking on the image on desktop on slideshow moves to next slide", function () {
        browser.leftClick('//div[@id="colorbox"]//div[@id="webmdHoverWrapper"]//div[@id="webmdHoverContent"]//div[@id="webmdHoverClose"]');
       ss_Actions.check_clickOnImage_working();

    });
});
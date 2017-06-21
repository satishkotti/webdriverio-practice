var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
var Page = require('../../../../page');
//var input = require('./../../config/PPE-101748.testdata')[argv.env];
//var url = input.environment;
var ssElements = Object.create(Page, {
    //slides count 
    slides_Count: { get: function() { return browser.element(".//*[@id='dyn-ss']/div[4]/div/div/span[3]"); } },
    //primary  previous first slide navigation
    primary_prevfirst: { get: function() { return browser.element("//div[@class='controls primary']/a[@class='prev first']/i"); } },
    //primary next slide navigation
    primary_next: { get: function() { return browser.element("//div[@class='controls primary']/a[@class='next']/i"); } },
    //primary previous slide navigation
    primary_prev: { get: function() { return browser.element("//div[@class='controls primary']/a[@class='prev']/i"); } },


    //secondary  previous first slide navigation
    secondary_prevfirst: { get: function() { return browser.element("//div[@class='controls secondary']/a[@class='prev first']/i"); } },
    //secondary next slide navigation
    secondary_next: { get: function() { return browser.element("//div[@class='controls secondary']/a[@class='next']/i"); } },
    //secondary previous slide navigation
    secondary_prev: { get: function() { return browser.element("//div[@class='controls secondary']/a[@class='prev']/i"); } },
    //current slide
    secondary_currslide: { get: function() { return browser.element(".//*[@id='dyn-ss']/div[4]/div/div/span[@class='current']"); } },
    //sources
    sources: { get: function() { return browser.element("//div[@class='sources-left']/p/a"); } },
    //Reviewd_by
    reviewd_by: { get: function() { return browser.element("//span[@class='review long']"); } },
    //Tool disclaimer
    tool_disc: { get: function() { return browser.element("//p[@class='disclaimer']"); } },
    //image
    image: { get: function() { return browser.element(".//*[@id='dyn-ss']/div[1]/div/div/div[1]/div[1]/img"); } },


});



module.exports = {


    get_slide_title: function(i) {
        socialshareIcons.open();

        var slide_title = "//div[" + i + "]/div[@ class='caption']/h2";

        var actions = {
            slide_title: slide_title

        }

    },
}

module.exports = ssElements
var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var assert = require("assert");
console.log(__dirname);
var ssElements = require('../elements/FE_Smoke_SS_Elements');

module.exports = {
    Imageandtitle_visibility: function() {
        var elements = browser.getText(ssElements.slides_Count.selector);
        for (var i = 1; i < parseInt(elements) - 1; i++) {
            browser.leftClick(ssElements.secondary_next.selector);
            var img = browser.isVisible('//div [@class="webmd-tool-slideshow"]//div [@class="owl-stage"]/div[' + i + ']/div[@class="slide"]//div [@class="image"]/img');
            console.log(img[i]);
            var titlevisible = browser.isVisible('//div [@class="webmd-tool-slideshow"]//div [@class="owl-stage"]/div[' + i + ']/div[@class="slide"]/div [@class="caption"]/h2');
            assert.equal(img[i], true);
            assert.equal(titlevisible[i], true);
            browser.pause(1000);
        }
        for (var i = elements;
            ((i <= elements) && (i != 2)); i--) {
            browser.leftClick(ssElements.secondary_prev.selector);
            browser.pause(1000);
        }

    },
    //Verify that Disclaimer text is visible on the vrey first slide
    Disclaimer_visibility: function() {
        var elements = browser.getText(ssElements.slides_Count.selector);
        for (var i = 1; i < parseInt(elements) - 1; i++) {
            if (i == 1) {
                var sourcevisible = browser.isVisible(ssElements.tools_disc.selector);
                assert.equal(sourcerightvisible, true);
            } else {
                var sourcevisible = browser.isVisible(ssElements.tools_disc.selector);
                assert.equal(sourcerightvisible, false);
            }
            browser.leftClick("//div[@class='controls secondary']/a[@class='next']/i");
            var Disc_visible = browser.isVisible(ssElements.tools_disc.selector);
            assert.equal(Disc_visible, true);
            browser.pause(1000);
        }
        for (var i = elements;
            ((i <= elements) && (i != 2)); i--) {
            browser.leftClick(ssElements.secondary_prev.selector);
            browser.pause(1000);
        }
    },

    Background_color_secondary: function() {
        var elements = browser.getText(ssElements.slides_Count.selector);
        for (var i = 1; i < parseInt(elements) - 1; i++) {
            if (i == 1) {
                var backgroundcolorp = browser.getCssProperty('//div [@id="dyn-ss"]//div [@class="controls-secondary-cont"]//a [@class="prev first"]/i', 'background-color');
                console.log(backgroundcolorp);
                assert.equal(backgroundcolorp.parsed.hex, '#dbdad9');
                var enable = browser.isVisible('//div [@id="dyn-ss"]//a [@class="prev"]/i');
                console.log(enable);
            }
            if (i > 1) //2 
            {
                var leftarrowbuttonenabled = browser.isEnabled('//div [@id="dyn-ss"]//a [@class="prev"]/i');
                assert.equal(leftarrowbuttonenabled[0], true)
            }
            browser.leftClick("//div[@class='controls secondary']/a[@class='next']/i");
            var backgroundcolorn = browser.getCssProperty("//div[@class='controls secondary']/a[@class='next']/i", 'background');

            assert.equal(backgroundcolorn.parsed.hex, '#1b88bf');
            browser.pause(1000);
        }
        for (var i = elements;
            ((i <= elements) && (i != 2)); i--) {
            browser.leftClick('//div [@id="dyn-ss"]//div [@class="controls primary"]//a [@class="prev"]/i');
            browser.pause(1000);
        }

    },
    Source_working: function() {
        var elements = browser.getText(ssElements.slides_Count.selector);
        for (var i = 1; i < parseInt(elements) - 1; i++) {
            browser.leftClick("//div[@class='controls secondary']/a[@class='next']/i");
            browser.pause(1000);
        }
        for (var i = elements;
            ((i <= elements) && (i != 2)); i--) {
            browser.leftClick('//div [@id="dyn-ss"]//div [@class="controls primary"]//a [@class="prev"]/i');
            browser.pause(1000);
        }
    },
    Background_color_primary: function() {
        var elements = browser.getText(ssElements.slides_Count.selector);
        console.log(elements);
        for (var i = 1; i < parseInt(elements) - 1; i++) {
            if (i == 1) {
                var backgroundcolorp = browser.getCssProperty('//div [@id="dyn-ss"]//div [@class="controls primary"]//a [@class="prev first"]/i', 'background-color');
                console.log(backgroundcolorp);
                assert.equal(backgroundcolorp.parsed.hex, '#dbdad9');
                var visible = browser.isVisible('//div [@id="dyn-ss"]//div [@class="controls primary"]//a [@class="prev"]/i');
                assert.equal(visible, false);
                console.log(visible);
            }
            browser.leftClick('//div [@class="controls primary"]//a [@class="next"]/i');
            var backgroundcolorn = browser.getCssProperty('//div [@class="controls primary"]//a [@class="next"]/i', 'background');
            //console.log(backgroundcolorn);
            assert.equal(backgroundcolorn.parsed.hex, '#1b88bf');
            browser.pause(1000);
        }
        for (var i = elements;
            ((i <= elements) && (i != 2)); i--) {
            browser.leftClick('//div [@id="dyn-ss"]//div [@class="controls primary"]//a [@class="prev"]/i');
            browser.pause(1000);
        }
    },
    Check_primary_next_previous_button: function() {
        var elements = browser.getText(ssElements.slides_Count.selector);
        for (var i = 1; i < parseInt(elements) - 1; i++) {
            var currentslide = browser.getText(ssElements.secondary_currslide.selector);
            //console.log(currentslide);
            browser.leftClick('//div [@class="controls primary"]//a [@class="next"]/i');
            browser.pause(1000);
            currentslide++;
            var curr_slide = browser.getText(ssElements.secondary_currslide.selector);
            if ((currentslide) == (curr_slide)) {
                console.log("next button is working");
            }

        }
        for (var i = elements;
            ((i <= elements) && (i != 2)); i--) {
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
    Check_secondary_next_previous_button: function() {
        var elements = browser.getText(ssElements.slides_Count.selector);
        //console.log(elements);
        for (var i = 1; i < parseInt(elements) - 1; i++) {
            var currentslide = browser.getText(ssElements.secondary_currslide.selector);
            browser.leftClick("//div[@class='controls secondary']/a[@class='next']/i");
            browser.pause(1000);
            currentslide++;
            var curr_slide = browser.getText(ssElements.secondary_currslide.selector);
            if ((currentslide) == (curr_slide)) {
                console.log("next button is working");
            }

        }
        for (var i = elements;
            ((i <= elements) && (i != 2)); i--) {
            var currentslide = browser.getText(ssElements.secondary_currslide.selector);
            //console.log(currentslide);
            browser.leftClick('//div [@id="dyn-ss"]//a [@class="prev"]/i');
            browser.pause(2000);
            currentslide--;
            var curr_slide = browser.getText(ssElements.secondary_currslide.selector);
            if (currentslide == curr_slide) {
                console.log("previous button is working");
            }

        }

    },
    Get_primary_currslide: function(i) {
        var curr_slide = "//div[1]/div/div/div[" + i + "]/div[2]/div/span[1]";
        return curr_slide;
    },

    Check_image_validation: function() {
        var primary_cur_slide, secondary_curr_slide, slide_num;
        var slides_Count = browser.getText(ssElements.slides_Count.selector); //r
        for (var i = 1; i <= parseInt(slides_Count) - 1; i++) {
            secondary_curr_slide = browser.getText(ssElements.secondary_currslide.selector); //get the bottom current slide num
            //click on the image on SS
            browser.pause(2000);
            browser.scroll(ssElements.image.selector);
            browser.click(ssElements.image.selector); //r
            if (get_primary_currslide(secondary_curr_slide))
                secondary_curr_slide++; //increment the curr slide num   
            slide_num = browser.getText(ssElements.secondary_currslide.selector); //get the slide num of current slide
            primary_cur_slide = get_primary_currslide(slide_num);
            // top current slide number  and bottom current slide number shoulb be equal to slide num
            if ((primary_cur_slide === slide_num) && (secondary_curr_slide === slide_num))
                return true;


            else
                return false;

        }
    }

}
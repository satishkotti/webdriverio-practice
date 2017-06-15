var webdriverio = require('webdriverio'),
    should = require('should'),
    path = require('path'),
    rootPath = path.normalize(__dirname),
    argv = require("yargs").argv,
    slideShow_elements = require('../common/elements/FE_Mobile_Slideshow_Elements'),
    slideShow_functions = require('../common/actions/FE_Mobile_Slideshow_Actions'),
    functions = require('../common/functions/FE_Mobile_Fuctions'),
    input = require('../config/FE_Mobile.testdata')[argv.env],
    url = input.slideShow_url;

describe("FE smoke test for Slideshow Module", function() {
    // browser.url(url);
    // browser.waitForVisible(slideShow_elements.modal_window_close_btn.selector);
    //  browser.click(slideShow_elements.modal_window_close_btn);
    // browser.refresh();
    //  browser.pause(6000);

    // Slider validation with Primary controlls
    it("Should validate Slider Image, Slider title and slider description being visible for all slides while cliking on primary controlls Next button", function() {
        var slider = slideShow_functions.next_slide(slideShow_elements.primary_controls_next.selector);
        console.log(slider);
        console.log(slider.length);
        for (var i = 0; i < slider.length; i++) {
            slider[i].image.should.equal(true);
            slider[i].title.should.equal(true);
            slider[i].description.should.equal(true);
        }
    });
    // it("Should validate Slider Image, Slider title and slider description being visible for all slides while cliking on primary controlls Previous button", function() {
    //     var slider = slideShow_functions.previous_slide(slideShow_elements.primary_controls_previous.selector);
    //     for (var i = slider.length - 1; i >= 1; i--) {
    //         slider[i].image.should.be.true();
    //         slider[i].title.should.be.true();
    //         slider[i].description.should.be.true();
    //     }
    // });

    // // Slider validation with slider image click
    // it("Should be navigate to next slide when clicking on image for all slides ", function() {
    //     var slider = slideShow_functions.next_slide(slideShow_elements.primary_controls_next.selector);
    //     for (var i = 0; i < slider.length; i++) {
    //         slider[i].image.should.be.true();
    //         slider[i].title.should.be.true();
    //         slider[i].description.should.be.true();
    //     }
    // });

    // // Next and Previous buttons icon validation for Primary and Secondary Controlls
    // it("Should validate primary Controlls Previous and Next arrows icons", function() {
    //     var slider = slideShow_functions.next_slide(slideShow_elements.primary_controls_next.selector);
    //     for (var i = 0; i < slider.length; i++) {
    //         slider[i].primary_next.value.should.equal("icons");
    //         slider[i].primary_previous.value.should.equal("icons");
    //         slider[i].secondary_next.value.should.equal("icons");
    //         slider[i].secondary_previous.value.should.equal("icons");
    //     }
    // });

    // Next and Previous buttons icon validation for Primary and Secondary Controlls
    // it("Should validate Working the background color and text color for Secondary navigation buttons", function() {
    //     var slider = slideShow_functions.next_slide(slideShow_elements.primary_controls_next.selector);
    //     for (var i = 0; i < slider.length; i++) {
    //         if (i == 0) {
    //             slider[i].secondary_controlls_next_arrow_background_color.parsed.hex.should.equal("#1b88bf");
    //             slider[i].secondary_controlls_previous_background_color.parsed.hex.should.equal("#dbdad9");
    //             slider[i].secondary_controlls_previous_text_color.parsed.hex.should.equal("#a9a9a9");
    //         } else {
    //             slider[i].secondary_controlls_previous_background_color.parsed.hex.should.equal("#1b88bf");
    //             slider[i].secondary_controlls_next_arrow_background_color.parsed.hex.should.equal("#1b88bf");
    //             slider[i].secondary_controlls_next_arrow_background_color.parsed.hex.should.equal("#1b88bf");
    //         }
    //     }
    // });










    // //  Slider validation with with Swiple Left and Swipe Right
    // it("Should validate Slider Image, Slider title and slider description being visible for all slides while cliking on primary controlls next and previous buttons", function() {
    //     var next_slider = slideShow_functions.swipe_left(slideShow_elements.primary_controls_next.selector);
    //     next_slider.forEach(function(element, index) {
    //         element.slider_img.should.be.false;
    //         element.slider_title.should.be.true;
    //         element.slider_description.should.be.true;
    //     }, this);
    //     var previous_slider = slideShow_functions.swipe_right(slideShow_elements.primary_controls_previous.selector);
    //     previous_slider.forEach(function(element, index) {
    //         element.slider_img.should.be.false;
    //         element.slider_title.should.be.true;
    //         element.slider_description.should.be.true;
    //     }, this);

    // });

    // // // Slider validation with Secondary controlls
    // it("Should validate Slider Image, Slider title and slider description being visible for all slides while cliking on Secondary controlls next and previous buttons", function() {
    //     var next_slider = slideShow_functions.next_button_validation(slideShow_elements.secondary_controls_next.selector);
    //     next_slider.forEach(function(element, index) {
    //         element.slider_img.should.be.false;
    //         element.slider_title.should.be.true;
    //         element.slider_description.should.be.true;
    //     }, this);
    //     var previous_slider = slideShow_functions.previous_button_validation(slideShow_elements.secondary_controls_previous.selector);
    //     next_slider.forEach(function(element, index) {
    //         element.slider_img.should.be.false;
    //         element.slider_title.should.be.true;
    //         element.slider_description.should.be.true;
    //     }, this);

    // });



    // // Slider validation with slider image click
    // it("Should be navigate to next slide when clicking on image for all slides ", function() {
    //     slideShow_functions.image_validation();
    // });


    // // Next and Previous buttons icon validation for Primary and Secondary Controlls
    // it("Should validate primary Controlls Previous and Next arrows icons", function() {
    //     browser.refresh();
    //     browser.pause(3000);
    //     var primary_controls_next_arrow = slideShow_elements.primary_controls_next.getCssProperty("font-family");
    //     var primary_controls_previous_arrow = slideShow_elements.primary_controls_next.getCssProperty("font-family");
    //     var secondary_controls_next = slideShow_elements.primary_controls_next.getCssProperty("font-family");
    //     var secondary_controls_previous = slideShow_elements.primary_controls_next.getCssProperty("font-family");
    //     should.equal(primary_controls_next_arrow.value, "icons");
    //     should.equal(primary_controls_previous_arrow.value, "icons");
    //     should.equal(secondary_controls_next.value, "icons");
    //     should.equal(secondary_controls_previous.value, "icons");
    // });


    // // Next and Previous buttons icon validation for Primary and Secondary Controlls
    // it("Should validate Working of the background color and text color for Secondary navigation buttons", function() {
    //     browser.refresh();
    //     browser.pause(3000);
    //     var slider_function = slideShow_functions.next_button_validation(slideShow_elements.primary_controls_next.selector);
    //     slider_function.forEach(function(element, index) {
    //         if (index == 0) {
    //             should.equal(element.secondary_controlls_next_arrow_background_color.parsed.hex, "#1b88bf");
    //             should.equal(element.secondary_controlls_previous_background_color.parsed.hex, "#dbdad9");
    //             should.equal(element.secondary_controlls_previous_text_color.parsed.hex, "#a9a9a9");

    //         } else {
    //             should.equal(element.secondary_controlls_previous_background_color.parsed.hex, "#1b88bf");
    //             should.equal(element.secondary_controlls_next_arrow_background_color.parsed.hex, "#1b88bf");
    //             should.equal(element.secondary_controlls_next_arrow_background_color.parsed.hex, "#1b88bf");
    //         }
    //     }, this);
    // });

    // // Previous button should be disable in slide one for Primary and Secondary Controlls
    // it("Should be hide Primary controlls previous button in slide one", function() {
    //     browser.refresh();
    //     browser.pause(3000);
    //     var previous_slider = slideShow_functions.previous_button_validation(slideShow_elements.primary_controls_previous.selector);
    //     previous_slider.forEach(function(element, index) {
    //         if (index == 0) {
    //             element.primary_controlls_previous_button.should.have.properties('opacity');

    //         } else {
    //             element.primary_controlls_previous_button.should.not.have.properties('opacity');
    //         }
    //     }, this);
    // });

    // // Previous button should be disable in slide one for Secondary Controlls
    // it("Should validate previous button with hide in slide one", function() {
    //     browser.refresh();
    //     browser.pause(3000);
    //     var previous_slider = slideShow_functions.previous_button_validation(slideShow_elements.secondary_controls_previous.selector);
    //     previous_slider.forEach(function(element, index) {
    //         if (index == 0) {
    //             should.equal(element.current_slide, 1);
    //         }
    //     }, this);
    // });

    // it("Should validate Disclaimer for first slide and Source for all slides", function() {
    //     browser.refresh();
    //     browser.pause(3000);
    //     var slider_function = slideShow_functions.next_button_validation(slideShow_elements.primary_controls_next.selector);
    //     slider_function.forEach(function(element, index) {
    //         if (index == 0) {
    //             element.disclaimer.should.be.true;
    //             element.source.should.be.true;
    //         } else {
    //             element.disclaimer.should.be.false;
    //             element.source.should.be.true;
    //         }
    //     }, this);
    // });

    // it("Should be visible source content on clicking source link", function() {
    //     browser.refresh();
    //     browser.pause(3000);
    //     var source_content = slideShow_elements.source_content.getCssProperty("display");
    //     source_content.value.should.be.equal('none');
    //     browser.click(slideShow_elements.source_link.selector);
    //     browser.waitForVisible(slideShow_elements.source_content.selector);
    //     source_content = slideShow_elements.source_content.getCssProperty("display");
    //     source_content.value.should.be.equal('block');
    // });
})
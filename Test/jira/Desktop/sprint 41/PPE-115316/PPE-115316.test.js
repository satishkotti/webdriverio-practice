var webdriverio = require('webdriverio'),
    should = require('should'),
    path = require('path'),
    rootPath = path.normalize(__dirname),
    slideShow_elements = require('../../common/elements/FE_Slideshow_Elements'),
    slideShow_functions = require('../../common/functions/FE_Slideshow_Actions'),
    actions = require('../../common/functions/Common.actions');

describe("FE smoke test for Slideshow Module", function() {
    slideShow_elements.open();
    browser.pause(2000);

    if (browser.isExisting('#webmdHoverClose')) {
        browser.click('#webmdHoverClose');
    }

    // it("Should be available Page heading title", function() {
    //     functions.is_Existing(slideShow_elements.page_header).should.equal(true);
    // });

    // it('should get the orientation of my mobile device', function() {
    //     var orientation = browser.getOrientation();
    //     if (orientation === "landscape") {
    //         console.log("landscape");
    //     } else {
    //         console.log("PORTRAIT");
    //     }
    // });

    it("Should validate Slider Image, Slider title and slider description being visible for all slides while cliking on primary control Next button", function() {
        var slider = slideShow_functions.next_slide(slideShow_elements.primary_controls_next.selector);
        for (var i = 0; i < slider.length; i++) {
            slider[i].image.should.equal(true);
            slider[i].title.should.equal(true);
            slider[i].description.should.equal(true);
        }
    });

    it("Should validate Slider Image, Slider title and slider description being visible for all slides while cliking on primary control Previous button", function() {
        var slider = slideShow_functions.previous_slide(slideShow_elements.primary_controls_previous.selector);
        for (var i = slider.length - 1; i >= 2; i--) {
            slider[i].image.should.equal(true);
            slider[i].title.should.equal(true);
            slider[i].description.should.equal(true);

        }
    });

    it("Should validate Slider Image, Slider title and slider description being visible for all slides while cliking on secondary control Next button", function() {
        browser.refresh();
        browser.pause(2000);
        var slider = slideShow_functions.next_slide(slideShow_elements.secondary_controls_next.selector);
        for (var i = 0; i < slider.length; i++) {
            slider[i].image.should.equal(true);
            slider[i].title.should.equal(true);
            slider[i].description.should.equal(true);
        }
    });

    it("Should validate Slider Image, Slider title and slider description being visible for all slides while cliking on secondary control Previous button", function() {
        var slider = slideShow_functions.previous_slide(slideShow_elements.secondary_controls_previous.selector);
        for (var i = slider.length - 1; i >= 2; i--) {
            slider[i].image.should.equal(true);
            slider[i].title.should.equal(true);
            slider[i].description.should.equal(true);
        }
    });

    it("Should validate Slider Image, Slider title and slider description being visible for all slides while cliking on secondary control Previous button", function() {
        var slider = slideShow_functions.previous_slide(slideShow_elements.primary_controls_next.selector);
        for (var i = 0; i < slider.length; i++) {
            slider[i].image.should.equal(true);
            slider[i].title.should.equal(true);
            slider[i].description.should.equal(true);
        }
    });

    it("Should validate slider count while clicking on Secondary controls next button", function() {
        browser.refresh();
        browser.pause(2000);
        var slider = slideShow_functions.next_slide(slideShow_elements.secondary_controls_next.selector);
        for (var i = 0; i < slider.length; i++) {
            var count = 1;
            if (slider[i].current == null) {
                console.log("This slide " + slider[i] + "Dosen't have the count.");
            } else {
                should.equal(parseInt(slider[i].current), count);
                count = count + 1;
            }
        }
    });

    it("Should validate primary Controlls Previous and Next arrows icons", function() {
        browser.refresh();
        browser.pause(2000);

        var primary_next = slideShow_elements.primary_controls_next.getCssProperty("font-family"),
            primary_previous = slideShow_elements.primary_controls_previous.getCssProperty("font-family"),
            secondary_next = slideShow_elements.secondary_controls_next.getCssProperty("font-family"),
            secondary_previous = slideShow_elements.secondary_controls_previous.getCssProperty("font-family");

        primary_next.value.should.equal("icons");
        primary_previous.value.should.equal("icons");
        secondary_next.value.should.equal("icons");
        secondary_previous.value.should.equal("icons");
    });

    it("Should validate Working the background color and text color for Secondary navigation buttons", function() {
        browser.refresh();
        browser.pause(2000);
        var slider = slideShow_functions.next_slide(slideShow_elements.primary_controls_next.selector);
        for (var i = 0; i < slider.length; i++) {
            if (i == 0) {
                slider[i].secondary_controlls_next_arrow_background_color.parsed.hex.should.equal("#1b88bf");
                slider[i].secondary_controlls_previous_background_color.parsed.hex.should.equal("#dbdad9");
                slider[i].secondary_controlls_previous_text_color.parsed.hex.should.equal("#a9a9a9");
            } else {
                //  slider[i].secondary_controlls_previous_background_color.parsed.hex.should.equal("#1b88bf");
                slider[i].secondary_controlls_next_arrow_background_color.parsed.hex.should.equal("#1b88bf");
            }
        }
    });

    it("Should validate Disclaimer for first slide and Source for all slides", function() {
        browser.refresh();
        browser.pause(2000);
        var slider = slideShow_functions.next_slide(slideShow_elements.secondary_controls_next.selector);
        for (var i = 0; i < slider.length; i++) {
            if (i == 0) {
                var disclaimer = actions.is_Existing(slideShow_elements.disclaimer);
                var source = actions.is_Existing(slideShow_elements.source);
                disclaimer.should.equal(true);
                source.should.equal(true);
            } else {
                var disclaimer = actions.is_Visible(slideShow_elements.disclaimer);
                var source = actions.is_Existing(slideShow_elements.source);
                disclaimer.should.equal(false);
                source.should.equal(true);
            }
        }
    });

    it("Should be visible source content on clicking source link", function() {
        browser.refresh();
        browser.pause(2000);
        var source_content = slideShow_elements.source_content.getCssProperty("display");
        source_content.value.should.be.equal('none');
        browser.click(slideShow_elements.source_link.selector);
        browser.waitForVisible(slideShow_elements.source_content.selector);
        source_content = slideShow_elements.source_content.getCssProperty("display");
        source_content.value.should.be.equal('block');
    });
});






























//Mobile - Previous button should be disable in slide one for Primary and Secondary Controlls
// it("Should be hide Primary controlls previous button in slide one", function() {
//     browser.refresh();
//     browser.pause(3000);
//     var slider = slideShow_functions.next_slide(slideShow_elements.primary_controls_next.selector);
//     slider.forEach(function(element, index) {
//         if (index == 0) {
//             element.primary_controlls_previous_button.should.have.properties('opacity');

//         } else {
//             element.primary_controlls_previous_button.should.not.have.properties('opacity');
//         }
//     }, this);
// });





// // Slider validation with slider image click
// it("Should be navigate to next slide when clicking on image for all slides ", function() {
//     slideShow_functions.image_validation();
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
// })
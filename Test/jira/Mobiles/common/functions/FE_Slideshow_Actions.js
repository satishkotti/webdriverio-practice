var argv = require("yargs").argv,
    should = require('should'),
    input = require('../../config/FE_Mobile.testdata')[argv.env],
    slideShow_elements = require('../../common/elements/FE_Mobile_Slideshow_Elements'),
    functions = require('../../common/functions/FE_Mobile_Fuctions'),
    slider = [],
    url = input.slideShow_url,
    sliderArr = [];
module.exports = {
    slider_Object: function() {

    },
    next_slide: function(btn) {
        var element;
        if (slideShow_elements.all_slider_wrapper.isExisting()) {
            console.log("All Slides");
            element = browser.elements("//div[contains(@class, 'webmd-tool-slideshow')]//div[contains(@class, 'slides owl-carousel')]//div[@class='owl-stage']/div");
            var slides_length = element.value.length - 1;
            for (var i = 1; i <= element.value.length - 1; i++) {
                var slideShow = {};
                browser.pause(1000);
                slideShow.secondary_controlls_next_arrow_background_color = slideShow_elements.secondary_controls_next.getCssProperty("background");
                slideShow.secondary_controlls_previous_background_color = slideShow_elements.secondary_controls_previous.getCssProperty("background-color");
                slideShow.secondary_controlls_previous_text_color = slideShow_elements.secondary_controls_previous.getCssProperty("color");
                if (functions.is_Visible(slideShow_elements.all_slider_small_image(i))) {
                    // Small Image
                    slideShow.image = functions.is_Visible(slideShow_elements.all_slider_small_image(i));
                    slideShow.title = functions.is_Visible(slideShow_elements.all_slider_small_image_title(i));
                    slideShow.getTitle = functions.get_Text(slideShow_elements.all_slider_small_image_title(i));
                    slideShow.description = functions.is_Visible(slideShow_elements.all_slider_small_image_description(i));
                } else if (functions.is_Visible(slideShow_elements.all_slider_image(i))) {
                    // Image overlaped text on large image
                    slideShow.image = functions.is_Visible(slideShow_elements.all_slider_image(i));
                    slideShow.title = functions.is_Visible(slideShow_elements.all_slider_image_title(i));
                    slideShow.getTitle = functions.get_Text(slideShow_elements.all_slider_image_title(i));
                    slideShow.description = functions.is_Visible(slideShow_elements.all_slider_image_description(i));
                } else if (functions.is_Visible(slideShow_elements.all_slider_sponsored_ad(i))) {
                    //Sponsored ad
                    slideShow.image = functions.is_Visible(slideShow_elements.all_slider_sponsored_ad(i));
                    slideShow.title = functions.is_Visible(slideShow_elements.all_slider_sponsored_ad_title(i));
                    slideShow.getTitle = functions.get_Text(slideShow_elements.all_slider_sponsored_ad_title(i));
                    slideShow.description = functions.is_Visible(slideShow_elements.all_slider_sponsored_ad_description(i));
                } else if (functions.is_Visible(slideShow_elements.all_slider_sponsored_int_ad(i))) {
                    //Interstitial ad
                    slideShow.image = functions.is_Visible(slideShow_elements.all_slider_sponsored_int_ad(i));
                    slideShow.title = true;
                    slideShow.getTitle = "No Title";
                    slideShow.description = true;
                } else if (functions.is_Visible(slideShow_elements.slider_no_image(i))) {
                    // No Image
                    slideShow.image = functions.is_Visible(slideShow_elements.slider_no_image(i));
                    slideShow.title = functions.is_Visible(slideShow_elements.all_slider_no_image_title(i));
                    slideShow.getTitle = functions.get_Text(slideShow_elements.all_slider_no_image_title(i));
                    slideShow.description = functions.is_Visible(slideShow_elements.all_slider_no_image_description(i));
                } else if (functions.is_Visible(slideShow_elements.all_slider_large_image(i))) {
                    //Large Image
                    slideShow.image = functions.is_Visible(slideShow_elements.all_slider_large_image(i));
                    slideShow.title = functions.is_Visible(slideShow_elements.all_slider_large_image_title(i));
                    slideShow.getTitle = functions.get_Text(slideShow_elements.all_slider_large_image_title(i));
                    slideShow.description = functions.is_Visible(slideShow_elements.all_slider_large_image_description(i));
                } else {

                }
                sliderArr.push(slideShow);


                if (slides_length > i) {
                    browser.click(btn);
                    // slideShow_elements.primary_controls_next.click();
                }

            }
        } else if (slideShow_elements.large_slider_wrapper.isExisting()) {
            console.log("Large Slider");
            element = browser.elements("//div[contains(@class, 'webmd-tool-slideshow')]//div[@class='bx-viewport']/div[@class='slides']/div[contains(@class, 'slide')]");
            var slides_length = element.value.length - 1;
            for (var i = 1; i <= element.value.length - 1; i++) {
                var slideShow = {};
                browser.pause(1000);
                slideShow.image = functions.is_Visible(slideShow_elements.slide_image(i));
                slideShow.title = functions.is_Visible(slideShow_elements.slide_title(i));
                slideShow.getTitle = functions.get_Text(slideShow_elements.slide_title(i));
                slideShow.description = functions.is_Visible(slideShow_elements.slide_description(i));
                slideShow.primary_next = slideShow_elements.primary_controls_next.getCssProperty("font-family");
                slideShow.primary_previous = slideShow_elements.primary_controls_previous.getCssProperty("font-family");
                slideShow.secondary_next = slideShow_elements.secondary_controls_next.getCssProperty("font-family");
                slideShow.secondary_previous = slideShow_elements.secondary_controls_previous.getCssProperty("font-family");
                slideShow.secondary_controlls_next_arrow_background_color = slideShow_elements.secondary_controls_next.getCssProperty("background");
                slideShow.secondary_controlls_previous_background_color = slideShow_elements.secondary_controls_previous.getCssProperty("background-color");
                slideShow.secondary_controlls_previous_text_color = slideShow_elements.secondary_controls_previous.getCssProperty("color");
                slideShow.primary_controlls_previous_button = slideShow_elements.primary_controls_previous_is_show.getCssProperty("opacity");
                //slideShow.disclaimer = functions.is_Visible(slideShow_elements.disclaimer.selector);
                // slideShow.source = functions.is_Visible(slideShow_elements.source.selector);
                if (slides_length != i) {
                    browser.click(btn);
                }
                sliderArr.push(slideShow);
            }
        } else {
            console.log("Image slide shows not available in current page.")
        }
        return sliderArr;
    },
    previous_slide: function(btn) {
        var element;
        if (slideShow_elements.all_slider_wrapper.isExisting()) {
            element = browser.elements("//div[contains(@class, 'webmd-tool-slideshow')]//div[contains(@class, 'slides owl-carousel')]//div[@class='owl-stage']/div");
            var slides_length = element.value.length - 1;
            for (var i = element.value.length - 1; i <= 1; i--) {
                var slideShow = {};
                if (functions.is_Visible(slideShow_elements.all_slider_small_image(i))) {
                    slideShow.image = functions.is_Visible(slideShow_elements.all_slider_small_image(i));
                    slideShow.title = functions.is_Visible(slideShow_elements.all_slider_small_image_title(i));
                    slideShow.description = functions.is_Visible(slideShow_elements.all_slider_small_image_description(i));
                } else if (functions.is_Visible(slideShow_elements.all_slider_image(i))) {
                    slideShow.image = functions.is_Visible(slideShow_elements.all_slider_image(i));
                    slideShow.title = functions.is_Visible(slideShow_elements.all_slider_image_title(i));
                    slideShow.description = functions.is_Visible(slideShow_elements.all_slider_image_description(i));
                } else if (functions.is_Visible(slideShow_elements.all_slider_sponsored_ad(i))) {
                    slideShow.image = functions.is_Visible(slideShow_elements.all_slider_sponsored_ad(i));
                    slideShow.title = functions.is_Visible(slideShow_elements.all_slider_sponsored_ad_title(i));
                    slideShow.description = functions.is_Visible(slideShow_elements.all_slider_sponsored_ad_description(i));
                } else if (functions.is_Visible(slideShow_elements.all_slider_sponsored_int_ad(i))) {
                    slideShow.image = functions.is_Visible(slideShow_elements.all_slider_sponsored_int_ad(i));
                    slideShow.title = true;
                    slideShow.description = true;
                } else if (functions.is_Visible(slideShow_elements.slider_no_image(i))) {
                    slideShow.image = functions.is_Visible(slideShow_elements.slider_no_image(i));
                    slideShow.title = functions.is_Visible(slideShow_elements.all_slider_no_image_title(i));
                    slideShow.description = functions.is_Visible(slideShow_elements.all_slider_no_image_description(i));
                } else if (functions.is_Visible(slideShow_elements.all_slider_large_image(i))) {
                    slideShow.image = functions.is_Visible(slideShow_elements.all_slider_large_image(i));
                    slideShow.title = functions.is_Visible(slideShow_elements.all_slider_large_image_title(i));
                    slideShow.description = functions.is_Visible(slideShow_elements.all_slider_large_image_description(i));
                } else {

                }
                browser.click(btn);
                sliderArr.push(slideShow);
            }
        } else if (slideShow_elements.large_slider_wrapper.isExisting()) {
            element = browser.elements("//div[contains(@class, 'webmd-tool-slideshow')]//div[@class='bx-viewport']/div[@class='slides']/div[contains(@class, 'slide')]");
            var slides_length = element.value.length - 1;
            for (var i = element.value.length - 1; i >= 1; i--) {
                var slideShow = {};
                browser.pause(1000);
                slideShow.image = functions.is_Visible(slideShow_elements.slide_image(i));
                slideShow.title = functions.is_Visible(slideShow_elements.slide_title(i));
                slideShow.description = functions.is_Visible(slideShow_elements.slide_description(i));
                slideShow.primary_next = slideShow_elements.primary_controls_next.getCssProperty("font-family");
                slideShow.primary_previous = slideShow_elements.primary_controls_previous.getCssProperty("font-family");
                slideShow.secondary_next = slideShow_elements.secondary_controls_next.getCssProperty("font-family");
                slideShow.secondary_previous = slideShow_elements.secondary_controls_previous.getCssProperty("font-family");
                slideShow.secondary_controlls_next_arrow_background_color = slideShow_elements.secondary_controls_next.getCssProperty("background");
                slideShow.secondary_controlls_previous_background_color = slideShow_elements.secondary_controls_previous.getCssProperty("background-color");
                slideShow.secondary_controlls_previous_text_color = slideShow_elements.secondary_controls_previous.getCssProperty("color");
                browser.click(btn);
                sliderArr.push(slideShow);
            }
        } else {
            console.log("Image slide shows not available in current page.")
        }
        return sliderArr;
    },
    swipe_left: function(btn) {
        var element;
        if (slideShow_elements.all_slider_wrapper.isExisting()) {
            console.log("All Slides");
            element = browser.elements("//div[contains(@class, 'webmd-tool-slideshow')]//div[contains(@class, 'slides owl-carousel')]//div[@class='owl-stage']/div");
            var slides_length = element.value.length - 1;
            for (var i = 1; i <= element.value.length - 1; i++) {
                var slideShow = {};
                browser.pause(1000);
                slideShow.secondary_controlls_next_arrow_background_color = slideShow_elements.secondary_controls_next.getCssProperty("background");
                slideShow.secondary_controlls_previous_background_color = slideShow_elements.secondary_controls_previous.getCssProperty("background-color");
                slideShow.secondary_controlls_previous_text_color = slideShow_elements.secondary_controls_previous.getCssProperty("color");
                if (functions.is_Visible(slideShow_elements.all_slider_small_image(i))) {
                    slideShow.image = functions.is_Visible(slideShow_elements.all_slider_small_image(i));
                    slideShow.title = functions.is_Visible(slideShow_elements.all_slider_small_image_title(i));
                    slideShow.getTitle = functions.get_Text(slideShow_elements.all_slider_small_image_title(i));
                    slideShow.description = functions.is_Visible(slideShow_elements.all_slider_small_image_description(i));
                } else if (functions.is_Visible(slideShow_elements.all_slider_image(i))) {
                    slideShow.image = functions.is_Visible(slideShow_elements.all_slider_image(i));
                    slideShow.title = functions.is_Visible(slideShow_elements.all_slider_image_title(i));
                    slideShow.getTitle = functions.get_Text(slideShow_elements.all_slider_image_title(i));
                    slideShow.description = functions.is_Visible(slideShow_elements.all_slider_image_description(i));
                } else if (functions.is_Visible(slideShow_elements.all_slider_sponsored_ad(i))) {
                    slideShow.image = functions.is_Visible(slideShow_elements.all_slider_sponsored_ad(i));
                    slideShow.title = functions.is_Visible(slideShow_elements.all_slider_sponsored_ad_title(i));
                    slideShow.getTitle = functions.get_Text(slideShow_elements.all_slider_sponsored_ad_title(i));
                    slideShow.description = functions.is_Visible(slideShow_elements.all_slider_sponsored_ad_description(i));
                } else if (functions.is_Visible(slideShow_elements.all_slider_sponsored_int_ad(i))) {
                    slideShow.image = functions.is_Visible(slideShow_elements.all_slider_sponsored_int_ad(i));
                    slideShow.title = true;
                    slideShow.getTitle = "No Title";
                    slideShow.description = true;
                } else if (functions.is_Visible(slideShow_elements.slider_no_image(i))) {
                    slideShow.image = functions.is_Visible(slideShow_elements.slider_no_image(i));
                    slideShow.title = functions.is_Visible(slideShow_elements.all_slider_no_image_title(i));
                    slideShow.getTitle = functions.get_Text(slideShow_elements.all_slider_no_image_title(i));
                    slideShow.description = functions.is_Visible(slideShow_elements.all_slider_no_image_description(i));
                } else if (functions.is_Visible(slideShow_elements.all_slider_large_image(i))) {
                    slideShow.image = functions.is_Visible(slideShow_elements.all_slider_large_image(i));
                    slideShow.title = functions.is_Visible(slideShow_elements.all_slider_large_image_title(i));
                    slideShow.getTitle = functions.get_Text(slideShow_elements.all_slider_large_image_title(i));
                    slideShow.description = functions.is_Visible(slideShow_elements.all_slider_large_image_description(i));
                } else {

                }
                sliderArr.push(slideShow);


                if (slides_length > i) {
                    //  browser.click(btn);
                    browser.swipeLeft(btn, 100);
                    // slideShow_elements.primary_controls_next.click();
                }

            }
        } else if (slideShow_elements.large_slider_wrapper.isExisting()) {
            console.log("Large Slider");
            element = browser.elements("//div[contains(@class, 'webmd-tool-slideshow')]//div[@class='bx-viewport']/div[@class='slides']/div[contains(@class, 'slide')]");
            var slides_length = element.value.length - 1;
            for (var i = 1; i <= element.value.length - 1; i++) {
                var slideShow = {};
                browser.pause(1000);
                slideShow.image = functions.is_Visible(slideShow_elements.slide_image(i));
                slideShow.title = functions.is_Visible(slideShow_elements.slide_title(i));
                slideShow.getTitle = functions.get_Text(slideShow_elements.slide_title(i));
                slideShow.description = functions.is_Visible(slideShow_elements.slide_description(i));
                slideShow.primary_next = slideShow_elements.primary_controls_next.getCssProperty("font-family");
                slideShow.primary_previous = slideShow_elements.primary_controls_previous.getCssProperty("font-family");
                slideShow.secondary_next = slideShow_elements.secondary_controls_next.getCssProperty("font-family");
                slideShow.secondary_previous = slideShow_elements.secondary_controls_previous.getCssProperty("font-family");
                slideShow.secondary_controlls_next_arrow_background_color = slideShow_elements.secondary_controls_next.getCssProperty("background");
                slideShow.secondary_controlls_previous_background_color = slideShow_elements.secondary_controls_previous.getCssProperty("background-color");
                slideShow.secondary_controlls_previous_text_color = slideShow_elements.secondary_controls_previous.getCssProperty("color");
                slideShow.primary_controlls_previous_button = slideShow_elements.primary_controls_previous_is_show.getCssProperty("opacity");
                //slideShow.disclaimer = functions.is_Visible(slideShow_elements.disclaimer.selector);
                // slideShow.source = functions.is_Visible(slideShow_elements.source.selector);
                if (slides_length != i) {
                    //browser.click(btn);
                    browser.swipeLeft(btn, 100);
                }
                sliderArr.push(slideShow);
            }
        } else {
            console.log("Image slide shows not available in current page.")
        }
        return sliderArr;
    },
    swipe_right: function(btn) {
        var element;
        if (slideShow_elements.all_slider_wrapper.isExisting()) {
            element = browser.elements("//div[contains(@class, 'webmd-tool-slideshow')]//div[contains(@class, 'slides owl-carousel')]//div[@class='owl-stage']/div");
            var slides_length = element.value.length - 1;
            for (var i = element.value.length - 1; i <= 1; i--) {
                var slideShow = {};
                if (functions.is_Visible(slideShow_elements.all_slider_small_image(i))) {
                    slideShow.image = functions.is_Visible(slideShow_elements.all_slider_small_image(i));
                    slideShow.title = functions.is_Visible(slideShow_elements.all_slider_small_image_title(i));
                    slideShow.description = functions.is_Visible(slideShow_elements.all_slider_small_image_description(i));
                } else if (functions.is_Visible(slideShow_elements.all_slider_image(i))) {
                    slideShow.image = functions.is_Visible(slideShow_elements.all_slider_image(i));
                    slideShow.title = functions.is_Visible(slideShow_elements.all_slider_image_title(i));
                    slideShow.description = functions.is_Visible(slideShow_elements.all_slider_image_description(i));
                } else if (functions.is_Visible(slideShow_elements.all_slider_sponsored_ad(i))) {
                    slideShow.image = functions.is_Visible(slideShow_elements.all_slider_sponsored_ad(i));
                    slideShow.title = functions.is_Visible(slideShow_elements.all_slider_sponsored_ad_title(i));
                    slideShow.description = functions.is_Visible(slideShow_elements.all_slider_sponsored_ad_description(i));
                } else if (functions.is_Visible(slideShow_elements.all_slider_sponsored_int_ad(i))) {
                    slideShow.image = functions.is_Visible(slideShow_elements.all_slider_sponsored_int_ad(i));
                    slideShow.title = true;
                    slideShow.description = true;
                } else if (functions.is_Visible(slideShow_elements.slider_no_image(i))) {
                    slideShow.image = functions.is_Visible(slideShow_elements.slider_no_image(i));
                    slideShow.title = functions.is_Visible(slideShow_elements.all_slider_no_image_title(i));
                    slideShow.description = functions.is_Visible(slideShow_elements.all_slider_no_image_description(i));
                } else if (functions.is_Visible(slideShow_elements.all_slider_large_image(i))) {
                    slideShow.image = functions.is_Visible(slideShow_elements.all_slider_large_image(i));
                    slideShow.title = functions.is_Visible(slideShow_elements.all_slider_large_image_title(i));
                    slideShow.description = functions.is_Visible(slideShow_elements.all_slider_large_image_description(i));
                } else {

                }
                // browser.click(btn);
                browser.swipeRight(btn, 100);
                sliderArr.push(slideShow);
            }
        } else if (slideShow_elements.large_slider_wrapper.isExisting()) {
            element = browser.elements("//div[contains(@class, 'webmd-tool-slideshow')]//div[@class='bx-viewport']/div[@class='slides']/div[contains(@class, 'slide')]");
            var slides_length = element.value.length - 1;
            for (var i = element.value.length - 1; i >= 1; i--) {
                var slideShow = {};
                browser.pause(1000);
                slideShow.image = functions.is_Visible(slideShow_elements.slide_image(i));
                slideShow.title = functions.is_Visible(slideShow_elements.slide_title(i));
                slideShow.description = functions.is_Visible(slideShow_elements.slide_description(i));
                slideShow.primary_next = slideShow_elements.primary_controls_next.getCssProperty("font-family");
                slideShow.primary_previous = slideShow_elements.primary_controls_previous.getCssProperty("font-family");
                slideShow.secondary_next = slideShow_elements.secondary_controls_next.getCssProperty("font-family");
                slideShow.secondary_previous = slideShow_elements.secondary_controls_previous.getCssProperty("font-family");
                slideShow.secondary_controlls_next_arrow_background_color = slideShow_elements.secondary_controls_next.getCssProperty("background");
                slideShow.secondary_controlls_previous_background_color = slideShow_elements.secondary_controls_previous.getCssProperty("background-color");
                slideShow.secondary_controlls_previous_text_color = slideShow_elements.secondary_controls_previous.getCssProperty("color");
                //browser.click(btn);
                browser.swipeRight(btn, 100);
                sliderArr.push(slideShow);
            }
        } else {
            console.log("Image slide shows not available in current page.")
        }
        return sliderArr;
    }

}

// previous_slide: function(btn) {
//     var element;
//     if (slideShow_elements.all_slider_wrapper.isExisting()) {
//         console.log("All Slide Show");
//         element = browser.elements("//div[contains(@class, 'webmd-tool-slideshow')]//div[contains(@class, 'slides owl-carousel')]//div[@class='owl-stage']/div");
//         for (var i = 1; i <= element.value.length; i++) {

//         }
//     } else if (slideShow_elements.large_slider_wrapper.isExisting()) {
//         console.log("Large Slide Show");
//         var sliderArr = [];
//         element = browser.elements("//div[contains(@class, 'webmd-tool-slideshow')]//div[@class='bx-viewport']/div[@class='slides']/div[contains(@class, 'slide')]");
//         var slides_length = element.value.length;
//         console.log(slides_length);
//         for (var i = slides_length - 1; i >= 1; i--) {
//             browser.pause(1000);
//             slideShow.image = functions.is_Visible(slideShow_elements.slide_image(i));
//             slideShow.title = functions.is_Visible(slideShow_elements.slide_title(i));
//             slideShow.description = functions.is_Visible(slideShow_elements.slide_description(i));
//             sliderArr.push(slideShow);
//             browser.click(btn);
//         }
//     } else {
//         console.log("Image slide shows not available in current page.")
//     }
//     return sliderArr;
// }
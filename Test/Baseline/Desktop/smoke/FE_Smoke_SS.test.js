var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var assert = require("assert");
var ss_Actions = require('../common/functions/FE_Smoke_SS_Action');
var ssElements = require('../common/elements/FE_Smoke_SS_Elements');
var common_Actions = require("../common/functions/common.actions");
var SS_common_Elements = require('../common/elements/FE_Smoke_Toc_Elements');
var Article_Elements = require('../common/elements/FE_Smoke_Article_Elements');
var Article_Actions = require('../common/functions/FE_Smoke_Article_Actions');
var Input = require('../config/FE.testdata')[argv.env];
var URL = Input.SS_url;
browser.url(URL);

describe("SlideShow validations", function() {

    it("Should validate Slide Image and Slide title being visible for all slides", function() {
        browser.leftClick('//div[@id="colorbox"]//div[@id="webmdHoverWrapper"]//div[@id="webmdHoverContent"]//div[@id="webmdHoverClose"]');
        ss_Actions.Imageandtitle_visibility();
    });

    it("Should validate Disclaimer for first slide and Source for all slides", function() {
        ss_Actions.Disclaimer_visibility();
    });

    it("Should validate Working of the Source for all slides", function() {
        ss_Actions.source_working();
    });

    it("Should validate Working of the background color of Primary navigation buttons", function() {
        ss_Actions.background_color_primary();
    });
    it("Should validate Working of the background color of Secondary navigation buttons", function() {
        ss_Actions.background_color_secondary();
    });

    it("Should check for working of next and previous Primary navigation buttons validation", function() {

        ss_Actions.check_primary_next_previous_button();
    });

    it("Should check for working of next and previous Secondary navigation buttons validation", function() {

        ss_Actions.check_secondary_next_previous_button();
    });

    it("Validation for Breadcrumb Text", function() {
        //Verify the Breadcrumb title
        browser.leftClick('//div[@id="colorbox"]//div[@id="webmdHoverWrapper"]//div[@id="webmdHoverContent"]//div[@id="webmdHoverClose"]');
        var name1 = 'Diet & Weight Management';
        actions = common_Actions.Search(SS_common_Elements.Breadcrumb.selector, SS_common_Elements.Breadcrumb.selector).breadcrumb_text;
        actions.should.equal(name1);

    });
    it("Validation for elements visibile", function() {
        browser.leftClick('//div[@id="colorbox"]//div[@id="webmdHoverWrapper"]//div[@id="webmdHoverContent"]//div[@id="webmdHoverClose"]');
        var elements_visible = {
            "elements": [{ "locator": SS_common_Elements.Breadcrumb.selector, "scroll": SS_common_Elements.Breadcrumb.selector },
                { "locator": SS_common_Elements.logo.selector, "scroll": SS_common_Elements.logo.selector },
                { "locator": ssElements.headerad.selector, "scroll": SS_common_Elements.headerad.selector },
                { "locator": ssElements.rightasidead.selector, "scroll": SS_common_Elements.rightasidead.selector },
                { "locator": SS_common_Elements.facebookicon.selector, "scroll": SS_common_Elements.facebookicon.selector },
                { "locator": SS_common_Elements.twittericon.selector, "scroll": SS_common_Elements.twittericon.selector },
                { "locator": SS_common_Elements.pintresticon.selector, "scroll": SS_common_Elements.pintresticon.selector },
                { "locator": SS_common_Elements.emailicon.selector, "scroll": SS_common_Elements.emailicon.selector },
                { "locator": SS_common_Elements.textelementforsearch.selector, "scroll": SS_common_Elements.textelementforsearch.selector }

            ]
        };
        common_Actions.Verify_ElementIsVisible(elements_visible);

    });
    // describe('New slider integration into SlideShows', function() {
    //     it("Verify clicking on 'right' arrow on Top and Bottom on desktop on slideshow moves to next slide", function() {
    //         var slides_Count = browser.getText(ssElements.slides_Count.selector);
    //         var primary_cur_slide, secondary_curr_slide, slide_num, slide_type;
    //         for (var i = 1; i < slides_Count - 1; i++) {
    //             var image_size = Article_Actions.verify_width_height(ssElements.image.selector)

    //             if ((image_size.height == 650) && (image_size.height = 250)) {
    //                 slide_type = "large image";
    //                 console.log("This is a large image slide")
    //             } else if ((image_size.height == 216) && (image_size.height = 185)) {
    //                 slide_type = "small image";
    //                 console.log("This is a small image slide")

    //             } else {
    //                 slide_type = "no image";
    //                 console.log("This is a no image slide")
    //             }

    //             secondary_curr_slide = browser.getText(ssElements.secondary_currslide.selector);
    //             if ((slide_type = "large image") || (slide_type = "large image") || ((slide_type = "large image")))
    //             //click on the boittom  next navigation button 
    //                 browser.click(ssElements.secondary_next.selector);
    //             secondary_curr_slide++; //increment the curr slide num   
    //             slide_num = browser.getText(ssElements.secondary_currslide.selector); //get the slide num of current slide
    //             primary_cur_slide = ss_Actions.get_primary_currslide(slide_num);
    //             // top current slide number  and bottom current slide number shoulb be equal to slide num
    //             //click on the top  next navigation button 
    //             browser.click(ssElements.secondary_currslide.selector);
    //             secondary_curr_slide++; //increment the curr slide num   
    //             slide_num = browser.getText(ssElements.secondary_currslide.selector); //get the slide num of current slide
    //             primary_cur_slide = ss_Actions.get_primary_currslide(slide_num);
    //             // top current slide number  and bottom current slide number shoulb be equal to slide num

    //             /* -- Need to test this----
    //             if ((primary_cur_slide === slide_num) && (secondary_curr_slide === slide_num))
    //                 console.log("top next navigation is working fine");
    //             else
    //                 console.log("top  next navigtaion button is not working");
    //                 */
    //         }
    //     });

    //     it("Validation of MastHead for WebMd : WebMD Common Health Topics A-Z Link", function() {
    //         var title = common_Actions.Click_MastHead(ssElements.healthmi.selector).page_title;
    //         title.should.containEql('WebMD Common Health Topics A-Z - Find reliable health and medical information on common topics from A to Z');
    //     });
    //     it("Validation of MastHead for WebMd : WebMD Drugs & Medications Link", function() {
    //         var title = common_Actions.Click_MastHead(ssElements.drugmi.selector).page_title;
    //         title.should.containEql('WebMD Drugs & Medications - Medical information on prescription drugs, vitamins and over-the-counter medicines');
    //     });
    //     it("Validation of MastHead for WebMd : Living Healthy Link", function() {
    //         var title = common_Actions.Click_MastHead(ssElements.livingmi.selector).page_title;
    //         title.should.containEql('Living Healthy: Your Guide to Beauty, Food, Fitness, and Diet');
    //     });
    //     it("Validation of MastHead for Family and Pregnancy Center Link Center Link", function() {
    //         var title = common_Actions.Click_MastHead(ssElements.familymi.selector).page_title;
    //         title.should.containEql('Family & Pregnancy Center');
    //     });
    //     it("Validation of MastHead for WebMd Health News Center Link", function() {
    //         var title = common_Actions.Click_MastHead(ssElements.newsmi.selector).page_title;
    //         title.should.containEql('WebMD Health News Center - The latest breaking health news and alerts');
    //     });


    // })
});
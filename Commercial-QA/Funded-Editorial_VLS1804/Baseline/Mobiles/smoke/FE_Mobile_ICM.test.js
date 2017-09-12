var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var assert = require("assert");
var icm_Actions = require('../common/actions/FE_Mobile_ICM_Actions');
var icm_page = require('../common/elements/FE_Mobile_ICM_Elements');

describe("ICM validations", function() {
    icm_page.open();
    console.log(icm_page);
    console.log(icm_page.icm_css_properties)
    var icm_frames = icm_page.icm_css_properties;
    console.log(icm_frames);
    icm_frames.forEach(function(element) {
        describe(element.frame_title + " " + "Frame", function() {
            browser.refresh()
            browser.waitForExist("#" + element.frame_id);
            browser.frame(element.frame_id);

            it("Should be visible" + element.frame_title + "sponsored Tooltip when click on 'From our sponsor' text", function() {
                var isVisible;
                browser.click(icm_page.icm_sponsored.selector);
                browser.waitForVisible(icm_page.from_sponsor_toolTip.selector);
                isVisible = browser.isVisible(icm_page.from_sponsor_toolTip.selector);
                isVisible.should.be.true();
                browser.click(icm_page.from_sponsor_toolTip_close.selector);
                isVisible = browser.isVisible(icm_page.from_sponsor_toolTip.selector);
                isVisible.should.not.be.true();
            });
            it("Should be visible " + element.frame_title + " sponsored Brand Name", function() {
                var sponsored_brand = browser.isVisible(icm_page.icm_sponsored_brand.selector);
                sponsored_brand.should.be.true();
            });
            it("Should be visible " + element.frame_title + " ICM Title", function() {
                var sponsored_title = browser.isVisible(icm_page.icm_sponsored_title.selector);
                var font_size = icm_page.icm_sponsored_title.getCssProperty("font-size");
                var title_line_height = icm_page.icm_sponsored_title.getCssProperty("line-height");
                sponsored_title.should.be.true();
                font_size.value.should.equal(element.title_font_size);
                title_line_height.value.should.equal(element.title_line_height);
            });
            it.only("Should be navigate to expected " + element.frame_title + " ICM Title URL", function() {
                var url = icm_page.icm_sponsored_title_link.getAttribute('href');
                icm_page.icm_sponsored_title_link.click();
                browser.url(url);
                browser.waitForVisible('//*[@id="ContentPane12"]/header');
                page_redirect = browser.isVisible('//*[@id="ContentPane12"]/header');
                page_redirect.should.be.true();
                browser.back();
                // var urls = Input.ICM_title_redirect_urls;
                // urls.forEach(function(element) {
                //     should.equal(title_link, element)
                // }, this);
            });

            it("Should be visible " + element.frame_title + " sponsored image", function() {
                var sponsored_image = browser.isVisible(icm_page.icm_sponsored_image.selector);
                var image_width = icm_page.icm_image.getCssProperty('width');
                sponsored_image.should.be.true();
                image_width.value.should.equal(element.image_width);
            });

            it("Should be navigate to expected " + element.frame_title + " ICM image URL", function() {
                var image_link = icm_page.icm_sponsored_image_link.getAttribute('href');
                var urls = Input.ICM_title_redirect_urls;
                urls.forEach(function(element) {
                    should.equal(image_link, element)
                }, this);
            });

            it("Should be navigate to expected " + element.frame_title + " Learn More URL", function() {
                var learn_more_link = icm_page.icm_learn_more_link.getAttribute('href');
                var action_link_padding = icm_page.action_link.getCssProperty('padding');
                var action_link_border = icm_page.action_link.getCssProperty('border');
                var urls = Input.ICM_title_redirect_urls;
                urls.forEach(function(element) {
                    should.equal(learn_more_link, element)
                }, this);
                action_link_padding.value.should.equal(element.action_link_padding);
                console.log(action_link_border);
                action_link_border.value.should.equal(element.action_link_border);
            });
        });
    }, this);




    // it("Should validate whether upper links of center well version is working on the ICM page", function() {
    //     icm_Actions.upperlinks_are_visible(icmElements.medication_guide.selector);
    //     icm_Actions.upperlinks_are_visible(icmElements.important_safety_information.selector);
    // });
    // it("Should validate whether  brand image of center well version is working on the ICM page", function() {
    //     icm_Actions.brand_image_working(icmElements.your_brand_image.selector);
    // });
    // it("Should validate whether lower links of center well version is working on the ICM page", function() {
    //     icm_Actions.lowerlinks_are_clickable(icmElements.medication_guide_lower_link.selector);
    //     browser.frame('cw');
    //     icm_Actions.lowerlinks_are_clickable(icmElements.prescribing_information.selector);
    // });
    // it("Should validate whether icm header of center well version is working on the ICM page", function() {
    //     browser.frame('cw');
    //     icm_Actions.check_element_is_clickable(icmElements.icm_header.selector);
    //     var title = browser.getTitle();
    //     title.should.containEql('7 â€˜Goodâ€™ Habits to Give Up for Type 2 Diabetes');
    //     browser.back();
    // });
    // it("Should validate whether image of center well version is working on the ICM page", function() {
    //     browser.frame('cw');
    //     icm_Actions.check_element_is_clickable(icmElements.image_cw.selector);
    //     var title = browser.getTitle();
    //     title.should.containEql('7 â€˜Goodâ€™ Habits to Give Up for Type 2 Diabetes');
    //     browser.back();
    // });
    // it("Should validate whether learn_more of centerwell version is working on the ICM page", function() {
    //     browser.frame('cw');
    //     icm_Actions.check_element_is_clickable(icmElements.learn_more.selector);
    //     var title = browser.getTitle();
    //     title.should.containEql('7 â€˜Goodâ€™ Habits to Give Up for Type 2 Diabetes');
    //     browser.back();
    // });
    // it("Should validate whether ICM sponsored of right raill version is working on the ICM page", function() {
    //     browser.refresh();
    //     browser.pause(5000);
    //     browser.frame('rr');
    //     icm_Actions.ICM_Sponsored_working(icmElements.icm_sponsored.selector);
    // });
    // it("Should validate whether upper links of right rail version is working on the ICM page", function() {
    //     icm_Actions.upperlinks_are_visible(icmElements.medication_guide.selector);
    //     icm_Actions.upperlinks_are_visible(icmElements.important_safety_information.selector);
    // });
    // it("Should validate whether  brand image of right rail version is working on the ICM page", function() {
    //     icm_Actions.brand_image_working(icmElements.your_brand_image.selector);
    // });
    // it("Should validate whether lower links of right rail version is working on the ICM page", function() {
    //     icm_Actions.lowerlinks_are_clickable(icmElements.medication_guide_lower_link.selector);
    //     browser.frame('rr');
    //     icm_Actions.lowerlinks_are_clickable(icmElements.prescribing_information.selector);
    // });
    // it("Should validate whether icm header of right rail version is working on the ICM page", function() {
    //     browser.frame('rr');
    //     icm_Actions.check_element_is_clickable(icmElements.icm_header.selector);
    //     var title = browser.getTitle();
    //     title.should.containEql('7 â€˜Goodâ€™ Habits to Give Up for Type 2 Diabetes');
    //     browser.back();
    // });
    // it("Should validate whether image of right rail version is working on the ICM page", function() {
    //     browser.frame('rr');
    //     icm_Actions.check_element_is_clickable(icmElements.image_cw.selector);
    //     var title = browser.getTitle();
    //     title.should.containEql('7 â€˜Goodâ€™ Habits to Give Up for Type 2 Diabetes');
    //     browser.back();
    // });
    // it("Should validate whether learn_more of right rail version is working on the ICM page", function() {
    //     browser.frame('rr');
    //     icm_Actions.check_element_is_clickable(icmElements.learn_more.selector);
    //     var title = browser.getTitle();
    //     title.should.containEql('7 â€˜Goodâ€™ Habits to Give Up for Type 2 Diabetes');
    //     browser.back();
    // });
});
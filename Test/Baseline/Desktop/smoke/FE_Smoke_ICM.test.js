var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var icm_Actions = require('../common/functions/FE_Smoke_ICM_Actions');
var icm_page = require('../common/elements/FE_Smoke_ICM_Elements');
var cw = {
    'frame_id': 'cw',
    'frame_title': 'center well version',
    'title_font_size': '26px',
    'title_line_height': '26px',
    'image_width': '270px',
    'action_link_padding': '15px',
    'action_link_border': '1px solid  rgb(27, 136, 191)'
};
var rr = {
    'frame_id': 'rr',
    'frame_title': 'right rail version',
    'title_font_size': '20px',
    'title_line_height': '20px',
    'image_width': '90px',
    'action_link_padding': '0px',
    'action_link_border': '0px none rgb(0, 0, 0)'
};

describe("1 ICM center well version validations", function() {

    it("Should be visible center well version sponsored Tooltip when click on From our sponsor text", function() {
        icm_page.open();
        browser.refresh();
        browser.pause(3000);
        browser.frame(cw.frame_id);
        var isVisible;
        console.log(icm_page.icm_cw_sponsored.selector);
        browser.click(icm_page.icm_cw_sponsored.selector);
        browser.waitForVisible(icm_page.from_sponsor_toolTip.selector);
        isVisible = browser.isVisible(icm_page.from_sponsor_toolTip.selector);
        isVisible.should.be.true();
        browser.click(icm_page.from_sponsor_toolTip_close.selector);
        isVisible = browser.isVisible(icm_page.from_sponsor_toolTip.selector);
        isVisible.should.not.be.true();
    });
    it("Should be visible center well version sponsored Brand Name", function() {
        var sponsored_brand = browser.isVisible(icm_page.icm_cw_your_brand_image.selector);
        sponsored_brand.should.be.true();
    });
    it("Should be visible center well version ICM Title", function() {
        var sponsored_title = browser.isVisible(icm_page.icm_cw_sponsored_title.selector);
        var font_size = icm_page.icm_cw_sponsored_title.getCssProperty("font-size");
        var title_line_height = icm_page.icm_cw_sponsored_title.getCssProperty("line-height");
        sponsored_title.should.be.true();
        font_size.value.should.equal(cw.title_font_size);
        title_line_height.value.should.equal(cw.title_line_height);
    });
    it("Should be navigate to expected center well version ICM Title URL", function() {
        var url = icm_page.icm_cw_sponsored_title_link.getAttribute('href');
        icm_page.icm_cw_sponsored_title_link.click();
        browser.url(url);
        browser.waitForVisible('//*[@id="ContentPane12"]/header');
        page_redirect = browser.isVisible('//*[@id="ContentPane12"]/header');
        page_redirect.should.be.true();
        browser.back();
        browser.pause(2000);
    });

    it("Should be visible center well version sponsored image", function() {
        browser.waitForExist("#" + cw.frame_id);
        browser.frame(cw.frame_id);
        var sponsored_image = browser.isVisible(icm_page.icm_cw_sponsored_image.selector);
        var image_width = icm_page.icm_cw_image.getCssProperty('width');
        sponsored_image.should.equal(true);
        image_width.value.should.equal(cw.image_width);
    });

    it("Should be navigate to expected center well version ICM image URL", function() {
        var url = icm_page.icm_cw_sponsored_image_link.getAttribute('href');
        browser.url(url);
        browser.waitForVisible('//*[@id="ContentPane12"]/header');
        page_redirect = browser.isVisible('//*[@id="ContentPane12"]/header');
        page_redirect.should.be.true();
        browser.back();
        browser.pause(2000);
    });

    it("Should be navigate to expected center well version Learn More URL", function() {
        browser.waitForExist("#" + cw.frame_id);
        browser.frame(cw.frame_id);
        var learn_more_link = icm_page.icm_cw_learn_more_link.getAttribute('href');
        var action_link_padding = icm_page.icm_cwaction_link.getCssProperty('padding');
        var action_link_border = icm_page.icm_cwaction_link.getCssProperty('border');
        action_link_padding.value.should.equal(cw.action_link_padding);
        // action_link_border.value.should.containEql(cw.action_link_border);
    });
});

describe("2 Right rail version Frame", function() {

    it("Should be visible right rail version sponsored Tooltip when click on 'From our sponsor' text", function() {
        icm_page.open();
        browser.refresh();
        browser.pause(3000);
        browser.frame(rr.frame_id);
        var isVisible;
        browser.click(icm_page.icm_rr_sponsored.selector);
        browser.waitForVisible(icm_page.from_sponsor_toolTip.selector);
        isVisible = browser.isVisible(icm_page.from_sponsor_toolTip.selector);
        isVisible.should.be.true();
        browser.click(icm_page.from_sponsor_toolTip_close.selector);
        isVisible = browser.isVisible(icm_page.from_sponsor_toolTip.selector);
        isVisible.should.not.be.true();
    });
    it("Should be visible right rail version sponsored Brand Name", function() {
        var sponsored_brand = browser.isVisible(icm_page.icm_rr_your_brand_image.selector);
        sponsored_brand.should.be.true();
    });
    it("Should be visible right rail version ICM Title", function() {
        var sponsored_title = browser.isVisible(icm_page.icm_rr_sponsored_title.selector);
        var font_size = icm_page.icm_rr_sponsored_title.getCssProperty("font-size");
        var title_line_height = icm_page.icm_rr_sponsored_title.getCssProperty("line-height");
        sponsored_title.should.be.true();
        font_size.value.should.equal(rr.title_font_size);
        title_line_height.value.should.equal(rr.title_line_height);
    });
    it("Should be navigate to expected right rail version ICM Title URL", function() {
        var url = icm_page.icm_rr_sponsored_title_link.getAttribute('href');
        icm_page.icm_rr_sponsored_title_link.click();
        browser.url(url);
        browser.waitForVisible('//*[@id="ContentPane12"]/header');
        page_redirect = browser.isVisible('//*[@id="ContentPane12"]/header');
        page_redirect.should.be.true();
        browser.back();
        browser.pause(2000);
    });

    it("Should be visible right rail version sponsored image", function() {
        browser.waitForExist("#" + rr.frame_id);
        browser.frame(rr.frame_id);
        var sponsored_image = browser.isVisible(icm_page.icm_rr_sponsored_image.selector);
        var image_width = icm_page.icm_rr_image.getCssProperty('width');
        sponsored_image.should.equal(true);
        image_width.value.should.equal(rr.image_width);
    });

    it("Should be navigate to expected right rail version ICM image URL", function() {
        var url = icm_page.icm_rr_sponsored_image_link.getAttribute('href');
        browser.url(url);
        browser.waitForVisible('//*[@id="ContentPane12"]/header');
        page_redirect = browser.isVisible('//*[@id="ContentPane12"]/header');
        page_redirect.should.be.true();
        browser.back();
        browser.pause(2000);
    });

    it("Should be navigate to expected right rail version Learn More URL", function() {
        browser.waitForExist("#" + rr.frame_id);
        browser.frame(rr.frame_id);
        var learn_more_link = icm_page.icm_rr_learn_more_link.getAttribute('href');
        var action_link_padding = icm_page.icm_rr_action_link.getCssProperty('padding');
        var action_link_border = icm_page.icm_rr_action_link.getCssProperty('border');
        action_link_padding.value.should.equal(rr.action_link_padding);
        // action_link_border.value.should.containEql(rr.action_link_border);
    });
});
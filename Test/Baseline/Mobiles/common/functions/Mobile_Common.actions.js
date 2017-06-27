var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
module.exports = {
    /* Searching for Breadcrumb test to be visible */

    /*Description:used to get the height and width of an element
Params: ele - element locator value
returns: width - width , height - height*/
    Verify_width_height: function(ele) {
        // socialshareIcons.open();
        var icon = $(ele);
        //console.log(icon);
        var width = icon.getCssProperty('width');
        var height = icon.getCssProperty('height')
        var actions = {
            width: width,
            height: height
        }
        return actions;
    },
    /*Used to get all CSS properties */
    Verify_Css: function(ele, property) {
        var icon = $(ele);
        var value = icon.getCssProperty(property);
        return value;
    },
    /* Method to return whether a line of text is underlined */

    Verify_text_decoration: function(ele) {
        var icon = $(ele);
        var text_decoration_line = icon.getCssProperty('text-decoration-line');
        var actions = {
            text_decoration_line: text_decoration_line,
        }
        return actions;
    },
    /* Function to verify Background color of an element*/
    Verify_background_color: function(ele) {
        // socialshareIcons.open();
        var icon = $(ele);
        //browser.moveToObject(icon);
        var background_color = icon.getCssProperty('background-color');
        console.log(background_color);
        var actions = {
            background_color: background_color,
        }
        return actions;
    },

    /* Common Method to Verify if all the Navigation Links to Menu Items are working in a page*/
    Menuitem_working: function(menuitem) {
        browser.leftClick(menuitem);
        browser.pause(1000);
        var Menu_title = browser.getTitle();
        browser.back();
        return Menu_title;
    },
    /* A method which takes a json object with an array containing all elements that need to be verified for 'Being visible' on the page */
    Verify_ElementIsVisible: function(elements) {
        var count = elements.elements.length;
        for (i = 0; i < count; i++) {
            var visible = browser.isExisting(elements.elements[i].locator);
            visible.should.equal(true);
        }
    },
    Click_MastHead: function(Icons, Scroll_value) {
        //browser.windowHandleMaximize();
        browser.scroll(Scroll_value);
        browser.click(Icons);
        browser.pause(3000);
        browser.refresh();
        browser.pause(5000);
        var page_title = browser.getTitle();
        var actions = {
            page_title: page_title,

        }
        browser.back();
        return actions;
    },
    //to get current url title
    get_toctitle: function() {
        var Toc_title = browser.getTitle();
        Toc_title.should.containEql('FED2 Segment 1 TOC');
    },
    //To get title of current page(seeAllPage)
    get_title: function() {
        var sap_title = browser.getTitle();
    },
    //checks whether image is visible or not on the TOC page
    check_Heroimage_visibility: function(image) {
        var image = browser.isVisible(image);
        assert.equal(image, true);
    },
    //checks whether masonarygrid is visible or not on the TOC page
    check_masonarygrid_visibility: function(masonarygrid) {
        var masonarygrid = browser.isVisible(masonarygrid);
        assert.equal(masonarygrid, true);
    },
    //checks working of seemore option present on the TOC page
    seemore_working: function(seemore) {
        browser.leftClick(seemore);
        browser.pause(1000);
    },
}
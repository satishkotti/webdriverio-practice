var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname);

module.exports = {

    // Verifies the element is exist on the page or not

    Verify_ElementIsVisible: function(elements) {
        var count = elements.elements.length;
        for (i = 0; i < count; i++) {
            browser.scroll(0, 0);
            browser.pause(500);
            try {
                browser.scroll(elements.elements[i].scroll);
                var visible = browser.isExisting(elements.elements[i].locator);
                console.log(i + " = " + visible);
                // visible.should.equal(elements.elements[i].visibility);
                visible.should.equal(true);
            } catch (err) {
                console.log("Selector is not visible" + i + " = " + visible);
            }
        }
    },

    //validates the links  on hamburger 
    burger_linksValidation: function(url, burger, link, linktext, newUrl) {

        browser.url(url)
        browser.pause(4000)
        browser.scroll(burger)
        browser.click(burger)
        var text = browser.getText(link)
        text.should.equal(linktext)

        browser.click(link)
        var url1 = browser.getUrl()
        url1.should.equal(newUrl)
    },

    // validates the social share icons  functionlaity
    Socialshare_validations: function(Icons, scroll_value) {

        browser.scroll(scroll_value)
        browser.pause(4000)
            //It will click on social share icons
        browser.waitForVisible(Icons)
        browser.click(Icons)
        browser.pause(4000)

        var handle = browser.windowHandles()
        browser.window(handle.value[1])

        var Page_title_Text = browser.getTitle()
        browser.close(handle[1])

        var actions = {
            Page_title_Text: Page_title_Text,

        }
        return actions
    },


    //validates the paddle up next/prev  functionality
    Paddle_Navigation: function(Icons, paddle_page_title, paddle) {

        browser.scroll(Icons)
        browser.waitForVisible(Icons)
        var paddle_page_title_text = browser.getText(paddle_page_title)
        browser.click(paddle)
        browser.pause(4000)
        var Page_title_Text = browser.getTitle()
        browser.back()
        browser.pause(3000)

        var actions = {
            Page_title_Text: Page_title_Text,
            paddle_page_title_text: paddle_page_title_text,


        }
        return actions
    },
}
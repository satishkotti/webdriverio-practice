var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var Elements = require('./../../common/elements/FE_Mobile_Article_Elements')
var input = require('./../../config/PPE-101748.testdata');


module.exports = {

    // Verifies the element is exist on the page or not

    Verify_ElementIsVisible: function (elements) {

        var count = elements.elements.length;
        for (i = 0; i < count; i++) {
            browser.scroll(elements.elements[i].scroll);
            var visible = browser.isExisting(elements.elements[i].locator);
            console.log(elements.elements[i].locator);
            visible.should.equal(elements.elements[i].visibility);
        }
    },

    //validates the links  on hamburger 
    burger_linksValidation: function (url, burger, link, linktext, newUrl) {

        //browser.url(url)
        browser.pause(4000)
        browser.scroll(burger);
        browser.click(burger);
        var text = browser.getText(link);
        text.should.equal(linktext);

        browser.click(link);
        var url1 = browser.getUrl();
        url1.should.equal(newUrl);
        browser.back();

    },

    // validates the social share icons  functionlaity
    Socialshare_validations: function (scroll_value, Icons) {

        browser.scroll(scroll_value);
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
    Paddle_Navigation: function (Icons, paddle) {

        browser.scroll(Icons)
        browser.waitForVisible(Icons)
        
        browser.click(paddle)
        browser.pause(4000)
        var Page_URL = browser.getUrl();
        browser.back()
        browser.pause(3000)

        var actions = {
            Page_URL: Page_URL,
            //paddle_page_title_text: paddle_page_title_text,


        }
        return actions
    },
}
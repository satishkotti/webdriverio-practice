var maxWaitTimeInMs = 30000;
var contentPaneFrameSelector = "//div[@tag_id='Content-widget']//iframe[contains(@id,'ExternalWidget')]";


var LabelUIObj = {
     switchToExternalWidgetFrame: function () {
        browser.frame();
        var contentWidgetIFrameElement = browser.element(contentPaneFrameSelector);
        browser.frame(contentWidgetIFrameElement.value);
    },
    togglemenu: function(){
        LabelUIObj.switchToExternalWidgetFrame();
        browser.click("//i[@class='toggle ms-menu']",maxWaitTimeInMs);
        browser.waitForVisible("//a[contains(.,'Question(s)')]",maxWaitTimeInMs)
    },
    questionTitleLabel: function () {
       var questionTitleLabel = browser.isExisting("//a[contains(.,'Question(s)')]//following-sibling::i[@popover-html='Add a child']");
       expect(questionTitleLabel).to.be.true;
    },
    answerLabel: function () {
       var answerLabel = browser.isExisting("//a[contains(.,'1.')]//following-sibling::i[@popover-html='Add a sibling below']");
       expect(answerLabel).to.be.true;
    },
    questionLabel: function () {
       var questionLabel = browser.isExisting("//a[contains(.,'1.')]//following-sibling::i[@popover-html='Add a child']");
       expect(questionLabel).to.be.true;
    }
    
}

module.exports = LabelUIObj;
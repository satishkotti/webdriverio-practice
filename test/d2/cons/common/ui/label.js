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
        browser.pause(2000);
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
    },
    resultTitleLabel: function () {
       var resultTitleLabel = browser.isExisting("//a[contains(.,'Result(s)')]//following-sibling::i[@popover-html='Add a child']");
       expect(resultTitleLabel).to.be.true;
    },
    resultLabel: function () {
       var questionLabel = browser.isExisting("//a[contains(.,'Result(s)')]/../../..//following-sibling::i[@popover-html='Add a sibling below']");
       expect(questionLabel).to.be.true;
    },
     sectionTitleLabel: function () {
       var resultTitleLabel = browser.isExisting("//a[contains(.,'Section(s)')]//following-sibling::i[@popover-html='Add a child']");
       expect(resultTitleLabel).to.be.true;
    },
     sectionLabel: function () {
       var questionLabel = browser.isExisting("//a[contains(.,'Section(s)')]/../../..//following-sibling::i[@popover-html='Add a sibling below']");
       expect(questionLabel).to.be.true;
    },

    switchParentFrame: function(){
        browser.frameParent();
    }

    
}

module.exports = LabelUIObj;
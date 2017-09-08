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
        browser.pause(2000);
        browser.click("//i[@class='toggle ms-menu']",maxWaitTimeInMs);
        browser.pause(2000);
    },
    questionTitleLabel: function () {
        var questionTitleLabel = browser.isExisting("//a[contains(.,'Question(s)')]//following-sibling::i[@popover-html='Add Question']");
       expect(questionTitleLabel).to.be.true;
       var questionTitleLabel2 = browser.isExisting("//a[contains(.,'Question(s)')]//following-sibling::i[@popover-html='Add a child']");
       expect(questionTitleLabel2).to.be.false;
        var questionTitleLabel3 = browser.isExisting("//a[contains(.,'Question(s)')]//following-sibling::i[@popover-html='Add Answer']");
       expect(questionTitleLabel3).to.be.false;
    },
    answerTitleLabel: function () {
       var answerLabel = browser.isExisting("//a[contains(.,'1.')]//following-sibling::i[@popover-html='Add Question below']");
       expect(answerLabel).to.be.true;
       var answerLabel2 = browser.isExisting("//a[contains(.,'1.')]//following-sibling::i[@popover-html='Add a sibling below']");
       expect(answerLabel2).to.be.false;
       var answerLabel3 = browser.isExisting("//a[contains(.,'1.')]//following-sibling::i[@popover-html='Add Answer below']");
       expect(answerLabel3).to.be.false;
    },
    answerLabel: function () {
       var answerLabel = browser.isExisting("//a[contains(.,'1.')]/../..//following-sibling::ol//i[@popover-html='Add Answer below']");
       expect(answerLabel).to.be.true;
       var answerLabel2 = browser.isExisting("//a[contains(.,'1.')]/../..//following-sibling::ol//i[@popover-html='Add sibling below']");
       expect(answerLabel2).to.be.false;
       var answerLabel3 = browser.isExisting("//a[contains(.,'1.')]/../..//following-sibling::ol//i[@popover-html='Add Question below']");
       expect(answerLabel3).to.be.false;
    },
    questionLabel: function () {
       var questionLabel = browser.isExisting("//a[contains(.,'1.')]//following-sibling::i[@popover-html='Add Answer']");
       expect(questionLabel).to.be.true;
        var questionLabel2 = browser.isExisting("//a[contains(.,'1.')]//following-sibling::i[@popover-html='Add a child']");
       expect(questionLabel2).to.be.false;
    },
    resultTitleLabel: function () {
       var resultTitleLabel = browser.isExisting("//a[contains(.,'Result(s)')]//following-sibling::i[@popover-html='Add Answer']");
       expect(resultTitleLabel).to.be.false;
       var resultTitleLabel2 = browser.isExisting("//a[contains(.,'Result(s)')]//following-sibling::i[@popover-html='Add a child']");
       expect(resultTitleLabel2).to.be.true;
       var resultTitleLabel3 = browser.isExisting("//a[contains(.,'Result(s)')]//following-sibling::i[@popover-html='Add Question']");
       expect(resultTitleLabel3).to.be.false;
    },
    resultLabel: function () {
       var resultLabel = browser.isExisting("//a[contains(.,'Result(s)')]/../../..//following-sibling::i[@popover-html='Add Answer below']");
       expect(resultLabel).to.be.false;
         var resultLabel2 = browser.isExisting("//a[contains(.,'Result(s)')]/../../..//following-sibling::i[@popover-html='Add a sibling below']");
       expect(resultLabel2).to.be.true;
       var resultLabel3 = browser.isExisting("//a[contains(.,'Result(s)')]/../../..//following-sibling::i[@popover-html='Add Question below']");
       expect(resultLabel3).to.be.false;
       
    },
     sectionTitleLabel: function () {
       var sectionTitleLabel = browser.isExisting("//a[contains(.,'Section(s)')]//following-sibling::i[@popover-html='Add a child']");
       expect(sectionTitleLabel).to.be.true;
        var sectionTitleLabel2 = browser.isExisting("//a[contains(.,'Section(s)')]//following-sibling::i[@popover-html='Add Answer']");
       expect(sectionTitleLabel2).to.be.false;
         var sectionTitleLabel3 = browser.isExisting("//a[contains(.,'Section(s)')]//following-sibling::i[@popover-html='Add Question']");
       expect(sectionTitleLabel3).to.be.false;
    },
     sectionLabel: function () {
       var sectionLabel = browser.isExisting("//a[contains(.,'Section(s)')]/../../..//following-sibling::i[@popover-html='Add a sibling below']");
       expect(sectionLabel).to.be.true;
       var sectionLabel2 = browser.isExisting("//a[contains(.,'Section(s)')]/../../..//following-sibling::i[@popover-html='Add Answer below']");
       expect(sectionLabel2).to.be.false;
       var sectionLabel3 = browser.isExisting("//a[contains(.,'Section(s)')]/../../..//following-sibling::i[@popover-html='Add Question below']");
       expect(sectionLabel3).to.be.false;
    },
    faqquestionLabel: function () {
       var questionLabel = browser.isExisting("//i[@popover-html='Add Answer']");
       expect(questionLabel).to.be.true;
        var questionLabel2 = browser.isExisting("//a[contains(.,'1.')]//following-sibling::i[@popover-html='Add a child']");
       expect(questionLabel2).to.be.false;
    },
     faqanswerLabel: function () {
       var answerLabel = browser.isExisting("//i[@popover-html='Add Answer below']");
       expect(answerLabel).to.be.true;
       var answerLabel2 = browser.isExisting("//a[contains(.,'1.')]//following-sibling::i[@popover-html='Add a sibling below']");
       expect(answerLabel2).to.be.false;
    },
    refresh: function(){
        browser.refresh();
        browser.waitForVisible("#menuDownArrow-button", maxWaitTimeInMs);
        expect(browser.getTitle()).to.equal(global.d2ConDataSettings.expectedResults.HomePageTitle);
        browser.pause(8000);
    },
        switchParentFrame: function(){
        browser.frameParent();
    }

    
}

module.exports = LabelUIObj;
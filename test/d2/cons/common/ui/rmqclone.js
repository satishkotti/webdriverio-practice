var contentTab = require('./../../common/actions/contentTab.actions');
var propertiesTab = require('./../../common/actions/propertiesTab.actions');
var documentListTab = require('./../../common/actions/documentListTab.actions');
var maxWaitTimeInMs = 50000;

var rmqcloneUIObj = {

    rmqclone: function () {
        contentTab.checkOut();
        contentTab.QuestionTextSetValue("QAQuestionText");
        browser.frameParent();
        contentTab.Setimage("Question Media", "Heart");
        var QmedialinkVal = contentTab.ImagelinkVal("Question Media");
        browser.frameParent();
        contentTab.QuestiontypeSelectText();
        browser.frameParent();
        contentTab.DefaultExplanationSetValue("QADefaultExplanation");
        browser.frameParent();
        contentTab.AnswerTextSetValue("QAAnswerText");
        browser.frameParent();
        contentTab.Setimage("Answer Media", "Heart");
        var AmedialinkVal = contentTab.ImagelinkVal("Answer Media");
        browser.frameParent();
        contentTab.AnswerValueSetValue("1");
        browser.frameParent();
        contentTab.AnswerExplanationSetValue("QAAnswerExplanation");
        browser.waitForVisible("//a[@class='spmenu-button ng-scope']");
        browser.click("//a[@class='spmenu-button ng-scope']");
        browser.pause(1000);
        browser.waitForVisible("//div[contains(.,'QAQuestionText')]//a[contains(.,'QAAnswerText')]/../i[@popover-html='Add Answer below']");
        browser.click("//div[contains(.,'QAQuestionText')]//a[contains(.,'QAAnswerText')]/../i[@popover-html='Add Answer below']");
        browser.waitForVisible("//a[contains(.,'1. QAQuestionText')]/../i[@popover-html='Add Question below']");
        browser.click("//a[contains(.,'1. QAQuestionText')]/../i[@popover-html='Add Question below']");
        var question = browser.getText("//a[contains(.,'QAQuestionText')]");
        var questionlen = question.length;
        expect(questionlen).to.equal(2);
        var answer = browser.getText("//a[contains(.,'QAAnswerText')]");
        var answer = answer.length;
        expect(answer).to.equal(4);
        browser.waitForVisible("//a[contains(.,'2. QAQuestionText')]");
        browser.click("//a[contains(.,'2. QAQuestionText')]");
        browser.click("//a[@class='spmenu-button ng-scope']");
        browser.waitForVisible("//h1[contains(.,'2. ') and contains(.,'Questions & Answers')]");
        browser.scroll("//h1[contains(.,'2. ') and contains(.,'Questions & Answers')]");
        browser.click("//h2[span[contains(.,'Question Text')]]//following-sibling::div//div/p");
        browser.keys("q");
        browser.keys("a");
        browser.click("//a[@class='spmenu-button ng-scope']");
        var question = browser.isExisting("//a[contains(.,'QAQuestionTextqa')]");
        expect(question).to.be.true;
        browser.frameParent();
        contentTab.checkIn();
       

    },


}

module.exports = rmqcloneUIObj;

var contentTab = require('./../../common/actions/contentTab.actions');
var propertiesTab = require('./../../common/actions/propertiesTab.actions');
var documentListTab = require('./../../common/actions/documentListTab.actions');
var parseXml = require('./../../common/components/parseXml');
var functions = require('./../../common/functions/functions');
var Promise = require('bluebird');
var JSONPath = require('JSONPath');
var maxWaitTimeInMs = 50000;

var rmqcloneUIObj = {

    rmqclone: function (friendlyName, busRef, userDescr, keywords, lnkTtl, windowTtl, publication,
    copyright, primaryTopicId,date) {
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
       cidName = propertiesTab.getChronicleIdAndName();
        objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        propertiesTab.setRequiredPropertiesWithPrimaryreviewDate(friendlyName, busRef, userDescr, keywords, lnkTtl, windowTtl, publication,
    copyright, primaryTopicId,date);
        documentListTab.assetPowerPromotePublishToStaging(objName);
        browser.pause(5000);
        browser.call(function () {
            return Promise.resolve(
                parseXml.getXmlFromUrl(functions.getAtsScsFileUrl() + chronicleId, null).then(function (result) {
                    var Asset = JSONPath({
                        json: result,
                        path: "$..metadata_section",
                        resultType: 'all'
                    });

                    var Content = JSONPath({
                        json: result,
                        path: "$..content_section",
                        resultType: 'all'
                    });
                    var qtext = Content[0].parent.content_section.quiz.questions.question[0].qtext.p;
                    var qtext = qtext.replace(/(?:\r\n\t|\r|\n|\t)/g, '');
                    var qtext = qtext.trim();
                    expect(qtext).to.equal("QAQuestionText");

                    expect(Content[0].parent.content_section.quiz.questions.question[0].qmedia.loc).to.equal(QmedialinkVal);
                    expect(Content[0].parent.content_section.quiz.questions.question[0].qtype).to.equal("Radio");

                    var dexpl = Content[0].parent.content_section.quiz.questions.question[0].defexp.p;
                    var dexpl = dexpl.replace(/(?:\r\n\t|\r|\n|\t)/g, '');
                    var dexpl = dexpl.trim();
                    expect(dexpl).to.equal("QADefaultExplanation");

                    var atext = Content[0].parent.content_section.quiz.questions.question[0].answers.answer[0].atext.p;
                    var atext = atext.replace(/(?:\r\n\t|\r|\n|\t)/g, '');
                    var atext = atext.trim();
                    expect(atext).to.equal("QAAnswerText");

                    expect(Content[0].parent.content_section.quiz.questions.question[0].answers.answer[0].amedia.loc).to.equal(AmedialinkVal);
                    expect(Content[0].parent.content_section.quiz.questions.question[0].answers.answer[0].aweight).to.equal("1");

                    var aexpl = Content[0].parent.content_section.quiz.questions.question[0].answers.answer[0].aexpl.p;
                    var aexpl = aexpl.replace(/(?:\r\n\t|\r|\n|\t)/g, '');
                    var aexpl = aexpl.trim();
                    expect(aexpl).to.equal("QAAnswerExplanation");

                    var atext = Content[0].parent.content_section.quiz.questions.question[0].answers.answer[1].atext.p;
                    var atext = atext.replace(/(?:\r\n\t|\r|\n|\t)/g, '');
                    var atext = atext.trim();
                    expect(atext).to.equal("QAAnswerText");

                    expect(Content[0].parent.content_section.quiz.questions.question[0].answers.answer[1].amedia.loc).to.equal(AmedialinkVal);
                    expect(Content[0].parent.content_section.quiz.questions.question[0].answers.answer[1].aweight).to.equal("1");

                    var aexpl = Content[0].parent.content_section.quiz.questions.question[0].answers.answer[1].aexpl.p;
                    var aexpl = aexpl.replace(/(?:\r\n\t|\r|\n|\t)/g, '');
                    var aexpl = aexpl.trim();
                    expect(aexpl).to.equal("QAAnswerExplanation");


                    var qtext = Content[0].parent.content_section.quiz.questions.question[1].qtext.p;
                    var qtext = qtext.replace(/(?:\r\n\t|\r|\n|\t)/g, '');
                    var qtext = qtext.trim();
                    expect(qtext).to.equal("QAQuestionTextqa");

                    expect(Content[0].parent.content_section.quiz.questions.question[1].qmedia.loc).to.equal(QmedialinkVal);
                    expect(Content[0].parent.content_section.quiz.questions.question[1].qtype).to.equal("Radio");

                    var dexpl = Content[0].parent.content_section.quiz.questions.question[1].defexp.p;
                    var dexpl = dexpl.replace(/(?:\r\n\t|\r|\n|\t)/g, '');
                    var dexpl = dexpl.trim();
                    expect(dexpl).to.equal("QADefaultExplanation");

                    var atext = Content[0].parent.content_section.quiz.questions.question[1].answers.answer[0].atext.p;
                    var atext = atext.replace(/(?:\r\n\t|\r|\n|\t)/g, '');
                    var atext = atext.trim();
                    expect(atext).to.equal("QAAnswerText");

                    expect(Content[0].parent.content_section.quiz.questions.question[1].answers.answer[0].amedia.loc).to.equal(AmedialinkVal);
                    expect(Content[0].parent.content_section.quiz.questions.question[1].answers.answer[0].aweight).to.equal("1");

                    var aexpl = Content[0].parent.content_section.quiz.questions.question[1].answers.answer[0].aexpl.p;
                    var aexpl = aexpl.replace(/(?:\r\n\t|\r|\n|\t)/g, '');
                    var aexpl = aexpl.trim();
                    expect(aexpl).to.equal("QAAnswerExplanation");

                     var atext = Content[0].parent.content_section.quiz.questions.question[1].answers.answer[1].atext.p;
                    var atext = atext.replace(/(?:\r\n\t|\r|\n|\t)/g, '');
                    var atext = atext.trim();
                    expect(atext).to.equal("QAAnswerText");

                    expect(Content[0].parent.content_section.quiz.questions.question[1].answers.answer[1].amedia.loc).to.equal(AmedialinkVal);
                    expect(Content[0].parent.content_section.quiz.questions.question[1].answers.answer[1].aweight).to.equal("1");

                    var aexpl = Content[0].parent.content_section.quiz.questions.question[1].answers.answer[1].aexpl.p;
                    var aexpl = aexpl.replace(/(?:\r\n\t|\r|\n|\t)/g, '');
                    var aexpl = aexpl.trim();
                    expect(aexpl).to.equal("QAAnswerExplanation");

                }));
        });

    },


}

module.exports = rmqcloneUIObj;

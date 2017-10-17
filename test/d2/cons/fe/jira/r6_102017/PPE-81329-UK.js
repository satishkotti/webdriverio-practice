var parseXml = require('./../../../common/components/parseXml');
var functions = require('./../../../common/functions/functions');
var login = require('./../../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../../common/actions/documentListTab.actions');
var rmqClone = require('./../../../common/actions/rmqclone.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
var randomstring = require("randomstring");


describe('RMQ Template - Copy Question - PPE-81329 -UK', function () {

    var chronicleId;
    var AssetTitle;
    var AssetName;
    var cidName;
    var objName;
    before(function () {
        login.loginWithNewWindow({
            url: functions.getEnvTestUrl(),
            username: functions.getQAPublicationUser().username,
            password: functions.getQAPublicationUser().password
        });

        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.UKtestFolderPath);
        AssetTitle = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        AssetName = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.UkArticleProfileName,
            global.d2ConDataSettings.inputData.QUizAritcleTemplate,
            AssetTitle,
            AssetName);
    });

    it('Verify user is able to clone the Question node -PPE-134958,Verify user is having all the attributes for the cloned Question node- PPE-134959, Verify user is able to update the Question Text in the content tab - PPE-134969, Verify user is able to clone the Answer node-  PPE-134985,Verify the renditions for asset after the cloning Question node- PPE-134986', function () {
        documentListTab.selectAsset(AssetTitle);
        rmqClone.rmqclone();
        cidName = propertiesTab.getChronicleIdAndName();
        objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        propertiesTab.setRequiredPropertiesWithPrimaryreviewDate(objName, 'Tool - RMQ', objName, objName, objName, objName, 'WebMD Health Tools - UK',
            '2015 WebMD - UK', 'ADD-ADHD (Adult)', '16 Oct 2017 19:08:00');
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

                    var atext = Content[0].parent.content_section.quiz.questions.question[0].answers.answer.atext.p;
                    var atext = atext.replace(/(?:\r\n\t|\r|\n|\t)/g, '');
                    var atext = atext.trim();
                    expect(atext).to.equal("QAAnswerText");

                    expect(Content[0].parent.content_section.quiz.questions.question[0].answers.answer.amedia.loc).to.equal(AmedialinkVal);
                    expect(Content[0].parent.content_section.quiz.questions.question[0].answers.answer.aweight).to.equal("1");

                    var aexpl = Content[0].parent.content_section.quiz.questions.question[1].answers.answer.aexpl.p;
                    var aexpl = aexpl.replace(/(?:\r\n\t|\r|\n|\t)/g, '');
                    var aexpl = aexpl.trim();
                    expect(aexpl).to.equal("QAAnswerExplanation");

                }));
        });

    });



});

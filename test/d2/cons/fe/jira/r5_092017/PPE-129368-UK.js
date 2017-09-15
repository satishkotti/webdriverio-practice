var Promise = require('bluebird');
var JSONPath = require('JSONPath');
var parseXml = require('./../../../common/components/parseXml');
var functions = require('./../../../common/functions/functions');
var login = require('./../../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../../common/actions/documentListTab.actions');
var contentTab = require('./../../../common/actions/contentTab.actions');
var ckEditorMenu = require('./../../../common/actions/ckEditor.actions');
var mModuleBulletOption = require('./../../../common/actions/mModuleBullet.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
var randomstring = require("randomstring");

describe('Image path broken - PPE-129368 -UK', function () {

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


    });

    it('Image path broken - PPE-129368 -UK', function () {
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.UKtestFolderPath);
        AssetTitle = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        AssetName = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.UkArticleProfileName,
            global.d2ConDataSettings.inputData.QUizAritcleTemplate,
            AssetTitle,
            AssetName);
        documentListTab.selectAsset(AssetTitle);
        cidName = propertiesTab.getChronicleIdAndName();
        objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        propertiesTab.setRequiredPropertiesWithPrimaryreviewDate(objName, 'Tool - RMQ', objName, objName, objName, objName, 'WebMD Health Tools - UK', '2015 WebMD - UK', 'ADD-ADHD (Adult)', '09/14/2017 18:54:00');
        contentTab.checkOut();
        contentTab.Setimage("Intro Image", "Heart");
        var IntroImagelinkVal = contentTab.ImagelinkVal("Intro Image");
        contentTab.Setimage("Question Media", "Heart");
        var QuestionImagelinkVal = contentTab.ImagelinkVal("Question Media");
        contentTab.Setimage("Answer Media", "Heart");
        var AnswerImagelinkVal = contentTab.ImagelinkVal("Answer Media");
        contentTab.Setimage("Results Image", "Heart");
        var ResultImagelinkVal = contentTab.ImagelinkVal("Results Image");
        browser.frameParent();
        contentTab.checkIn();
        documentListTab.powerPromoteAsset(AssetTitle);
        documentListTab.publishAssetToStaging(AssetTitle);

        browser.pause(5000);
        browser.call(function () {
            return Promise.resolve(
                parseXml.getXmlFromUrl(functions.getAtsScsFileUrl() + chronicleId, null).then(function (result) {

                    var Content = JSONPath({
                        json: result,
                        path: "$..content_section",
                        resultType: 'all'
                    });

                    expect(Content[0].parent.content_section.quiz.quizmedia.loc).to.equal(IntroImagelinkVal);
                    expect(Content[0].parent.content_section.quiz.questions.question.qmedia.loc).to.equal(QuestionImagelinkVal);
                    expect(Content[0].parent.content_section.quiz.questions.question.answers.answer.amedia.loc).to.equal(AnswerImagelinkVal);
                    expect(Content[0].parent.content_section.quiz.resmedia.loc).to.equal(ResultImagelinkVal);

                }));
        });


    });

});
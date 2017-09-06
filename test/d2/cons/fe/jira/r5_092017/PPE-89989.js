var functions = require('./../../../common/functions/functions');
var login = require('./../../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../../common/actions/documentListTab.actions');
var contentTab = require('./../../../common/actions/contentTab.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
var findTab = require('./../../../common/actions/findTab.actions');
var labels = require('./../../../common/actions/label.actions');
var randomstring = require("randomstring");

describe('RMQ: Rename label for adding questions/answers- PPE-89989', function () {
    var AssetTitle;
    var AssetName;
    before(function () {
        login.loginWithNewWindow({
            url: functions.getEnvTestUrl(),
            username: functions.getQAPublicationUser().username,
            password: functions.getQAPublicationUser().password
        });

        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.testFolderPath);

    });

    it('Verify there is "Add Answer" for Question Label instead of "Add Child" for RMQ-US template- PPE-128188, Verify there is "Add Answer below" for Answer Label instead of "Add a sibling Below" for RMQ-US template - PPE-128189, Verify there is "Add Answer" for Result Label instead of "Add Child" for RMQ-US template - PPE-128190', function () {
        AssetTitle = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        AssetName = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.ArticleProfileName,
            global.d2ConDataSettings.inputData.QuizArticleTemplate,
            AssetTitle,
            AssetName);
        documentListTab.selectAsset(AssetTitle);
        contentTab.checkOut();
        labels.togglemenu();
        labels.questionTitleLabel();
        labels.answerLabel();
        labels.questionLabel();
        labels.resultTitleLabel();
        labels.resultLabel();
        labels.switchParentFrame();
        contentTab.checkIn();
        browser.pause(5000);
    });
    it('Verify there is "Add Answer" for Question Label instead of "Add Child" for FAQ-US template - PPE-128194, Verify there is "Add Answer below" for Answer Label instead of "Add a sibling Below" for FAQ-US template - PPE-128195', function () {
        AssetTitle = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        AssetName = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.ArticleProfileName,
            global.d2ConDataSettings.inputData.FAQArticleTemplate,
            AssetTitle,
            AssetName);
        documentListTab.selectAsset(AssetTitle);
        contentTab.checkOut();
        labels.togglemenu();
        labels.questionTitleLabel();
        labels.faqanswerLabel();
        labels.faqquestionLabel();
        labels.switchParentFrame();
        contentTab.checkIn();
        browser.pause(5000);
    });
    it('Verify there is "Add Child" for Question Label instead of "Add Answer" for News-US template- PPE-128199, Verify there is "Add Sibling below" for Answer Label instead of "Add a Answer Below" for News-US template - PPE-128200', function () {
        AssetTitle = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        AssetName = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.ArticleProfileName,
            global.d2ConDataSettings.inputData.ArticleTemplate,
            AssetTitle,
            AssetName);
        documentListTab.selectAsset(AssetTitle);
        contentTab.checkOut();
        labels.togglemenu();
        labels.sectionTitleLabel();
        labels.switchParentFrame();
        contentTab.checkIn();
        browser.pause(5000);
    });
    it('Verify there are "Add Answer","Add Answer below" labels instead of "Add Child","Add Sibling below" for Existing RMQ-US template - PPE-128203', function () {
        labels.refresh();
        findTab.findByChronicleId(global.d2ConDataSettings.inputData.LabelQuizUS);
        contentTab.checkOut();
        labels.togglemenu();
        labels.questionTitleLabel();
        labels.answerLabel();
        labels.questionLabel();
        labels.resultTitleLabel();
        labels.resultLabel();
        labels.switchParentFrame();
        contentTab.checkIn();
        browser.pause(5000);
    });
    it('Verify there are "Add Answer","Add Answer below" labels instead of "Add Child","Add Sibling below" for Existing FAQ-US template - PPE-128206', function () {
        labels.refresh();
        findTab.findByChronicleId(global.d2ConDataSettings.inputData.LabelFAQUS);
        contentTab.checkOut();
        labels.togglemenu();
        labels.questionTitleLabel();
        labels.faqanswerLabel();
        labels.faqquestionLabel();
        labels.switchParentFrame();
        contentTab.checkIn();
        browser.pause(5000);
    });
    it('Verify there are "Add Answer","Add Answer below" labels instead of "Add Child","Add Sibling below" for Existing News-US template - PPE-128208', function () {
        labels.refresh();
        findTab.findByChronicleId(global.d2ConDataSettings.inputData.LabelNewsUS);
        contentTab.checkOut();
        labels.togglemenu();
        labels.sectionTitleLabel();
        labels.switchParentFrame();
        contentTab.checkIn();
        browser.pause(5000);
    });
});


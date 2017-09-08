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

describe('RMQ: Rename label for adding questions/answers- PPE-89989 - UK', function () {
    var AssetTitle;
    var AssetName;
    before(function () {
        login.loginWithNewWindow({
            url: functions.getEnvTestUrl(),
            username: functions.getQAPublicationUser().username,
            password: functions.getQAPublicationUser().password
        });

        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.UKtestFolderPath);

    });

    it('Verify there is "Add Answer" for Question Label instead of "Add Child" for RMQ-UK template- PPE-128191, Verify there is "Add Answer below" for Answer Label instead of "Add a sibling Below" for RMQ-UK template - PPE-128192, Verify there is "Add Answer" for Result Label instead of "Add Child" for RMQ-UK template - PPE-128193', function () {
        AssetTitle = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        AssetName = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.UkArticleProfileName,
            global.d2ConDataSettings.inputData.QuizArticleTemplate,
            AssetTitle,
            AssetName);
        documentListTab.selectAsset(AssetTitle);
        contentTab.checkOut();
        labels.togglemenu();
        labels.questionTitleLabel();
        labels.answerTitleLabel();
        labels.answerLabel();
        labels.questionLabel();
        labels.resultTitleLabel();
        labels.resultLabel();
        labels.switchParentFrame();
        contentTab.checkIn();
        browser.pause(5000);
    });
    it('Verify there is "Add Answer" for Question Label instead of "Add Child" for FAQ-UK template - PPE-128196, Verify there is "Add Answer below" for Answer Label instead of "Add a sibling Below" for FAQ-UK template - PPE-128197', function () {
        AssetTitle = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        AssetName = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.UkArticleProfileName,
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
    it('Verify there is "Add Child" for Question Label instead of "Add Answer" for News-UK template- PPE-128201, Verify there is "Add Sibling below" for Answer Label instead of "Add a Answer Below" for News-UK template - PPE-128202', function () {
        AssetTitle = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        AssetName = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.UkArticleProfileName,
            global.d2ConDataSettings.inputData.ArticleTemplate,
            AssetTitle,
            AssetName);
        documentListTab.selectAsset(AssetTitle);
        contentTab.checkOut();
        labels.togglemenu();
        labels.sectionTitleLabel();
        labels.sectionLabel();
        labels.switchParentFrame();
        contentTab.checkIn();
        browser.pause(5000);
    });
    it('Verify there are "Add Answer","Add Answer below" labels instead of "Add Child","Add Sibling below" for Existing RMQ-UK template - PPE-128204', function () {
        labels.refresh();
        findTab.findByChronicleId(global.d2ConDataSettings.inputData.LabelQuizUK);
        contentTab.checkOut();
        labels.togglemenu();
        labels.questionTitleLabel();
        labels.answerTitleLabel();
        labels.answerLabel();
        labels.questionLabel();
        labels.resultTitleLabel();
        labels.resultLabel();
        labels.switchParentFrame();
        contentTab.checkIn();
    });
    it('Verify there are "Add Answer","Add Answer below" labels instead of "Add Child","Add Sibling below" for Existing News-UK template - PPE-128208', function () {
        labels.refresh();
        findTab.findByChronicleId(global.d2ConDataSettings.inputData.LabelNewsUK);
        contentTab.checkOut();
        labels.togglemenu();
        labels.sectionTitleLabel();
        labels.sectionLabel();
        labels.switchParentFrame();
        contentTab.checkIn();
        browser.pause(5000);
    });
});


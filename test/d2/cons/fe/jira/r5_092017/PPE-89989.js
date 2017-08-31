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
         AssetTitle = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
         AssetName = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
         workspaceMenu.createContent(
         global.d2ConDataSettings.inputData.ArticleProfileName,
            global.d2ConDataSettings.inputData.QuizArticleTemplate,
            AssetTitle,
            AssetName);
    });

     it('Basic flow', function () {
        documentListTab.selectAsset(AssetTitle);
        contentTab.checkOut();
        labels.togglemenu();
        labels.questionTitleLabel();
        labels.answerLabel();
        labels.questionLabel();
        labels.resultTitleLabel();
        labels.resultLabel();
    });
});


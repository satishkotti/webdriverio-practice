var functions = require('./../../../common/functions/functions');
var login = require('./../../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../../common/actions/documentListTab.actions');
var contentTab = require('./../../../common/actions/contentTab.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
var nativeEdit = require('./../../../common/actions/nativeEdit.action');
var randomstring = require("randomstring");

describe('General Features - Native Edit- PPE-30636', function () {
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
            global.d2ConDataSettings.inputData.ArticleTemplate,
            AssetTitle,
            AssetName);
    });

    it('Verify there is Native Edit XML option in the Content tab - PPE-129655,Verify user is able to update content tag information in the Native XML editor-PPE-129656,Verify the error message when user updated invalid tags in Native XML editor -PPE-129665,Verify special character are not being displayed by copying particular clone-able section -PPE-129666', function () {

        documentListTab.selectAsset(AssetTitle);
        nativeEdit.nativeEditXML();
        nativeEdit.titleupdate();
        nativeEdit.copysection();
        nativeEdit.applybutton();
        nativeEdit.validation();

    });

});


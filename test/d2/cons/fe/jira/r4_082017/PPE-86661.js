var functions = require('./../../../common/functions/functions');
var login = require('./../../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../../common/actions/documentListTab.actions');
var relationsTab = require('./../../../common/actions/relationTab.actions');
var auditTab = require('./../../../common/actions/audit.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
var contentTab = require('./../../../common/actions/contentTab.actions');
var randomstring = require("randomstring");

describe('Audit Widget: History - PPE-86661 ', function () {;
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

    it('E2E flow', function () {
        auditTab.auditWidget();
        auditTab.categories();
        documentListTab.selectAsset(AssetTitle);
        auditTab.creationEvent();
        propertiesTab.setRequiredProperties(AssetTitle,'News',AssetTitle,AssetTitle,AssetTitle,AssetTitle,'WebMD Medical News','2015 WebMD','ADD-ADHD (Adult)');
        auditTab.mandatoryFieldsEvent('1.0');
        contentTab.AssetcheckOut();
        auditTab.checkoutEvent();
        contentTab.Assetcheckin();
        auditTab.checkinEvent('1.1');
        documentListTab.promoteAsset(AssetTitle);
        auditTab.promoteEvent('1.1');
        documentListTab.demoteAsset(AssetTitle);
        auditTab.demoteEvent('1.1');
        documentListTab.powerPromoteAsset(AssetTitle);
        auditTab.powerpromoteEvent('1.1');
        documentListTab.expireAsset(AssetTitle);
        auditTab.expireEvent('1.1');
});
   
});
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
var relationsTab = require('./../../../common/actions/relationTab.actions');
var mModuleBulletOption = require('./../../../common/actions/mModuleBullet.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
var nonTemplateFiles = require('./../../../common/actions/nonTemplateFiles.actions');
var findTab = require('./../../../common/actions/findTab.actions');
var versionTab = require('./../../../common/actions/versionTab.action');
var RemoveCustomNavigateTab = require('./../../../common/actions/RemoveCustomNavigate.actions');
var randomstring = require("randomstring");


describe('Regression', function () {

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
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.testFolderPath);
        AssetTitle = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        AssetName = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.ArticleProfileName,
            global.d2ConDataSettings.inputData.ArticleTemplate,
            AssetTitle,
            AssetName);
    });
    it('Verify the Normal User checkout function', function () {
      
        documentListTab.selectAsset(AssetTitle);
        contentTab.AssetcheckOut();
        browser.pause(5000);
        browser.frameParent();
        findTab.findbyId("091e9c5e80582b79");
        nonTemplateFiles.Nontemplatecheckoutwihoutsave();
        cidName = propertiesTab.getChronicleName();
        objName=cidName.Name;    
        console.log(objName);    
        nonTemplateFiles.NontemplateCheckout(objName);
        RemoveCustomNavigateTab.logoutWindow();
        
    });

     it('Verify the Super User Cancel checkout function', function () {
        login.loginWithNewWindow({
            url: functions.getEnvTestUrl(),
            username: "qaadminuser",
            password: functions.getQAPublicationUser().password
        });
        
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.testFolderPath);

        documentListTab.selectAsset(AssetTitle);
        browser.pause(10000);
        contentTab.cancelcheckout();
        browser.pause(5000);
        findTab.findbyId("091e9c5e80582b79");
        cidName = propertiesTab.getChronicleName();
        objName=cidName.Name;
        nonTemplateFiles.NontemplateCancelCheckout(objName);
        
    });
   
    
});
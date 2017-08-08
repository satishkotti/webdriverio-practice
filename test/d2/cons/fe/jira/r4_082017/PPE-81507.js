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
var HealthTemplate = require('./../../../common/actions/ImporthealthRef.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
var findTab = require('./../../../common/actions/findTab.actions');
var ReinstateTab = require('./../../../common/actions/Reinstate.action');
var test = require("./../../../common/functions/functions.js");
var randomstring = require("randomstring");

describe('D2: No option to reinstate Collection objects- PPE-81507', function () {

    var chronicleId;
    var AssetTitle;
    var AssetName;
    var cidName;
     var objName;
     var TImagelinkVal;
     var MImagelinkVal;
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
         global.d2ConDataSettings.inputData.USCollectionArticleProfileName,
            global.d2ConDataSettings.inputData.CollectionArticleTemplate,
            AssetTitle,
            AssetName);
    });

     it('Verify the Create Asset and Checkout and Checkin functionality on Collection Template', function () {
        documentListTab.selectAsset(AssetTitle);
        contentTab.checkOut();
        browser.frameParent();
        contentTab.checkIn();
        cidName = propertiesTab.getChronicleIdAndName();
        objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        ReinstateTab.setRequiredProperties(objName, 'America Asks', objName, objName, objName, objName,'Acne Care')
        browser.pause(5000);
    });


     it('Verify the option to reinstate Collection objects', function () {
        documentListTab.selectAsset(AssetTitle);
        contentTab.checkOut();
        browser.frameParent();
        contentTab.checkIn();
        ReinstateTab.setRequiredProperties(objName+"_test", 'America Asks', objName+"_test", objName, objName, objName,'Acne Care')
        browser.pause(5000);

        ReinstateTab.selectReinstate(AssetTitle,'1.0');
        });
    
   ;

   

});

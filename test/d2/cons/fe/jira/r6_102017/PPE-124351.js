var Promise = require('bluebird');
var JSONPath = require('JSONPath');
var parseXml = require('./../../../common/components/parseXml');
var functions = require('./../../../common/functions/functions');
var Login = require('./../../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../../common/actions/documentListTab.actions');
var contentTab = require('./../../../common/actions/contentTab.actions');
var ckEditorMenu = require('./../../../common/actions/ckEditor.actions');
var Removeclosebtn = require('./../../../common/actions/RemoveButton.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
var randomstring = require("randomstring");
describe('Remove "X" above the Check-Out button in the Content window-124351', function () {

    var chronicleId;
    var AssetTitle;
    var AssetName;
    var cidName;
     var objName;
    var textValue;
    var ImgUrl;

    before(function () {
        Login.login({
            url: functions.getEnvTestUrl(),
            username: functions.getQAPublicationUser().username,
            password: functions.getQAPublicationUser().password
        });

        browser.pause(10000);
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.testFolderPath);
        AssetTitle = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        AssetName = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.ArticleProfileName,
            global.d2ConDataSettings.inputData.ArticleTemplate,
            AssetTitle,
            AssetName);
        documentListTab.selectAsset(AssetTitle);
       

       
    });

  

    it('Verify the Remove "X" above the Check-Out button in the Content window.', function () {
        Removeclosebtn.VerifyRemoveclose() ;
        contentTab.checkOut();
        browser.frameParent();
        contentTab.checkIn();

        
    });

   

  
});
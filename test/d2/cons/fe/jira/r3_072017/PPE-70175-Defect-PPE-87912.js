var functions = require('./../../../common/functions/functions');
var login = require('./../../../common/actions/login.actions');
var workspaceMenu = require('./../../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../../common/actions/documentListTab.actions');
var contentTab = require('./../../../common/actions/contentTab.actions');
var ckEditorMenu = require('./../../../common/actions/ckEditor.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
var nonTemplateFiles = require('./../../../common/actions/nonTemplateFiles.actions');
var repositoryBrowserTab = require('./../../../common/actions/repositoryBrowserTab.actions');
var findTab = require('./../../../common/actions/findTab.actions');
var versionTab = require('./../../../common/actions/versionTab.action');
var randomstring = require("randomstring");


describe('Working with Static files PPE-87912 ', function () {
   
    var filetoupload = './test/d2/cons/testfiles/PPE-70175-Static-files/';
    var assetTitle;
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
            global.d2ConDataSettings.inputData.USImportHelathRefProfileName,
            global.d2ConDataSettings.inputData.ImportHelathArticleTemplate,
            AssetTitle,
            AssetName);
    });
   
 it('Verify the Defect - Staging Label is not lost when an asset is Cancel Checked out from Active', function () {
        documentListTab.selectAsset(AssetTitle);
        contentTab.checkOut();
        browser.frameParent();
        contentTab.checkIn();
        cidName = propertiesTab.getChronicleIdAndName();
        objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        propertiesTab.setRequiredProperties(objName, 'ZZ - Dummy Content Classification', objName, objName, objName, objName, 'WebMD Medical News', '2015 WebMD', 'ADD-ADHD (Adult)')
        documentListTab.powerPromoteAsset(objName);
        versionTab.PowerpromoteversionValidation();
        documentListTab.selectAsset(AssetTitle);
        contentTab.AssetcheckOut();
        browser.frameParent();
        versionTab.WipversionValidation();
        documentListTab.selectAsset(AssetTitle);
        contentTab.cancelcheckout();
        browser.pause(5000);
        browser.frameParent();
        documentListTab.selectAsset(AssetTitle);
        versionTab.CancelchekoutcversionValidation();
    });
    


    
    
});



var functions = require('./../../../common/functions/functions');
var login = require('./../../../common/actions/login.actions');
var workspaceMenu = require('./../../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../../common/actions/documentListTab.actions');
var contentTab = require('./../../../common/actions/contentTab.actions');
var ckEditorMenu = require('./../../../common/actions/ckEditor.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
var nonTemplateFiles = require('./../../../common/actions/nonTemplateFiles.actions');
var findTab = require('./../../../common/actions/findTab.actions');
var versionTab = require('./../../../common/actions/versionTab.action');
var randomstring = require("randomstring");


describe('Working with Static files -PPE- 114688 ', function () {
   
    var filetoupload = './test/d2/cons/testfiles/PPE-70175-Static-files/';
    var assetTitle;
    var objName;

    before(function () {
        login.loginWithNewWindow({
            url: functions.getEnvTestUrl(),
            username: functions.getQAPublicationUser().username,
            password: functions.getQAPublicationUser().password
        });
        
        browser.pause(20000);
    });
   

     it('Verify WIP label should be applied to latest version and object should be in WIP state to be able to promote it to Staging functionality on Can not update PB objects in D2- PPE-114688', function () {
        workspaceMenu.IncludeExpiredFilterVersions();
        browser.pause(5000);
        findTab.findbyId("091e9c5e80c9ba67");
        browser.pause(5000);
        cidName = propertiesTab.getChronicleName();
        objName=cidName.Name;
        browser.pause(5000);
        nonTemplateFiles.CheckoutCheckinOperations(objName, filetoupload+"wallpaper.css");
        browser.pause(5000);
        documentListTab.selectAsset(objName);
        versionTab.WipversionValidation();
        browser.pause(5000);
        documentListTab.selectAsset(objName);
        documentListTab.promoteAsset(objName);
        versionTab.WipStagingversionValidation();
        browser.pause(5000);
        documentListTab.selectAsset(objName);
        documentListTab.powerPromoteAsset(objName);
        browser.pause(5000);
       
    });



    
    
});



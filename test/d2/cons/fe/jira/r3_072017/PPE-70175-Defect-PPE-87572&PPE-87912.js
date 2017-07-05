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


describe('Working with Static files -PPE-87572 and PPE-87912 ', function () {
   
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
   
 it('Verify the Question Text,Question Type,Result Text Changes from required to optional on Quiz Template PPE-117565,PPE-117566,PPE-117567', function () {
        documentListTab.selectAsset(AssetTitle);
        contentTab.checkOut();
        browser.frameParent();
        contentTab.checkIn();
        cidName = propertiesTab.getChronicleIdAndName();
        objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        propertiesTab.setRequiredProperties(objName, 'ZZ - Dummy Content Classification', objName, objName, objName, objName, 'UK WebMD Medical News', '2015 WebMD', 'ADD-ADHD (Adult)')
        documentListTab.assetPowerPromotePublishToStaging(objName);
        versionTab.CancelchekoutcversionValidation();
        documentListTab.selectAsset(AssetTitle);
        contentTab.checkOut();
        browser.frameParent();
        versionTab.WipversionValidation();
        browser.frameParent();
        contentTab.cancel();
        browser.frameParent();
        versionTab.CancelchekoutcversionValidation();
        browser.pause(5000);
    });
    

    it('Verify  Staging Labels Removed when Upon Checkout and Cancel Checkout-PPE-87572  and PPE-87912', function () {
        browser.pause(5000);
        findTab.findbyId("091e9c5e807cfa8a");
        browser.pause(5000);
        cidName = propertiesTab.getChronicleName();
        objName=cidName.Name;
        browser.pause(5000);
        nonTemplateFiles.NontemplateCheckout(objName);
        browser.pause(5000);
        documentListTab.selectAsset(objName);
        versionTab.WipversionValidation();
        browser.pause(5000);
        documentListTab.selectAsset(objName);
        nonTemplateFiles.NontemplateCancelCheckout(objName);
        documentListTab.selectAsset(objName);
        versionTab.CancelchekoutcversionValidation();
        browser.pause(5000);
    });


    
    
});



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


describe('Working with Static files -PPE-70175', function () {
   
    var filetoupload = './test/d2/cons/testfiles/PPE-70175-Static-files/';
    var assetTitle;
    var objName;

    before(function () {
        login.loginWithNewWindow({
            url: functions.getEnvTestUrl(),
            username: functions.getQAPublicationUser().username,
            password: functions.getQAPublicationUser().password
        });
        

    });

    it('Verify user is able to checkout,cancel checkout, checkin,Promote,Demote,Power Promote,Publish,Expire and Wip version checking functionality on Working with Static files -PPE-70175(wbmd_cons_asset)', function () {
        
        findTab.findbyId("091e9c5e8014bc65");
        browser.pause(5000);
        cidName = propertiesTab.getChronicleIdAndTitle();
        chronicleId = cidName.chronicleId;
        objName=cidName.Name;
        browser.pause(5000);
        nonTemplateFiles.fileOperations(objName, filetoupload+"wlc_tb_box.jpg");
        browser.pause(5000);
        versionTab.WipversionValidation();
        browser.pause(5000);
        documentListTab.selectAsset(objName);
        documentListTab.promoteAsset(objName);
        browser.pause(2000);
        documentListTab.demoteAsset(objName);
        browser.pause(2000);
        documentListTab.powerPromoteAsset(objName);
        browser.pause(2000);
        documentListTab.publishAssetToStaging(objName);
        browser.pause(2000);
        documentListTab.expireAsset(objName);
        browser.pause(5000);
    });


     it('Verify user is able to checkout,cancel checkout, checkin,Promote,Demote,Power Promote,Publish,Expire and Wip version checking functionality on Working with Static files -PPE-70175(dm_document)', function () {
        findTab.findbyId("091e9c5e80047ff3");
        browser.pause(5000);
        cidName = propertiesTab.getChronicleIdAndTitle();
        chronicleId = cidName.chronicleId;
        objName=cidName.Name;
        browser.pause(5000);
        nonTemplateFiles.fileOperations(objName, filetoupload+"404_flordelis.gif");
        browser.pause(5000);
        versionTab.WipversionValidation();
        browser.pause(5000);
        documentListTab.selectAsset(objName);
        documentListTab.promoteAsset(objName);
        browser.pause(2000);
        documentListTab.demoteAsset(objName);
        browser.pause(2000);
        documentListTab.powerPromoteAsset(objName);
        browser.pause(2000);
        documentListTab.publishAssetToStaging(objName);
        browser.pause(2000);
        documentListTab.expireAsset(objName);
        browser.pause(5000);
    });


    


     it('Verify user is able to checkout,cancel checkout, checkin,Promote,Demote,Power Promote,Publish,Expire and Wip version checking functionality on Working with Static files -PPE-70175(wbmd_asset)', function () {
        findTab.findbyId("091e9c5e80bba145");
        browser.pause(5000);
        cidName = propertiesTab.getChronicleIdAndTitle();
        chronicleId = cidName.chronicleId;
        objName=cidName.Name;
        browser.pause(5000);
        nonTemplateFiles.fileOperations(objName, filetoupload+"sprite_yir_i1_r1.png");
        browser.pause(5000);
        versionTab.WipversionValidation();
        browser.pause(5000);
       documentListTab.selectAsset(objName);
        documentListTab.promoteAsset(objName);
        browser.pause(2000);
        documentListTab.demoteAsset(objName);
        browser.pause(2000);
        documentListTab.powerPromoteAsset(objName);
        browser.pause(2000);
        documentListTab.publishAssetToStaging(objName);
        browser.pause(2000);
        documentListTab.expireAsset(objName);
        browser.pause(5000);
    });


      it('Verify user is able to checkout,cancel checkout, checkin,Promote,Demote,Power Promote,Publish,Expire and Wip version checking functionality on Working with Static files -PPE-70175(wbmd_cons_article)', function () {
        findTab.findbyId("091e9c5e80521300");
        browser.pause(5000);
        cidName = propertiesTab.getChronicleIdAndTitle();
        chronicleId = cidName.chronicleId;
        objName=cidName.Name;
        browser.pause(5000);
        nonTemplateFiles.fileOperations(objName, filetoupload+"form_aa6844.pdf");
        browser.pause(5000);
        versionTab.WipversionValidation();
        browser.pause(5000);
        documentListTab.selectAsset(objName);
        documentListTab.promoteAsset(objName);
        browser.pause(2000);
        documentListTab.demoteAsset(objName);
        browser.pause(2000);
        documentListTab.powerPromoteAsset(objName);
        browser.pause(2000);
        documentListTab.publishAssetToStaging(objName);
        browser.pause(2000);
        documentListTab.expireAsset(objName);
        browser.pause(5000);
    });
   

   
    it('Verify user is able to checkout,cancel checkout, checkin,Promote,Demote,Power Promote,Publish,Expire and Wip version checking functionality on Working with Static files -PPE-70175(wbmd_sponsor_asset)', function () {
        findTab.findbyId("091e9c5e805b0d0d");
        browser.pause(5000);
        cidName = propertiesTab.getChronicleIdAndTitle();
        chronicleId = cidName.chronicleId;
        objName=cidName.Name;
        browser.pause(5000);
        nonTemplateFiles.fileOperations(objName, filetoupload+"archive_sprite1.gif");
        browser.pause(5000);
        versionTab.WipversionValidation();
        browser.pause(5000);
        documentListTab.selectAsset(objName);
        documentListTab.promoteAsset(objName);
        browser.pause(2000);
        documentListTab.demoteAsset(objName);
        browser.pause(2000);
        documentListTab.powerPromoteAsset(objName);
        browser.pause(2000);
        documentListTab.publishAssetToStaging(objName);
        browser.pause(2000);
        documentListTab.expireAsset(objName);
        browser.pause(5000);
    });
    
     it('Verify user is able to checkout,cancel checkout, checkin,Promote,Demote,Power Promote,Publish,Expire and Wip version checking functionality on Working with Static files -PPE-70175(wbmd_cons_video)', function () {
        findTab.findbyId("091e9c5e80b1b734");
        browser.pause(5000);
        cidName = propertiesTab.getChronicleIdAndTitle();
        chronicleId = cidName.chronicleId;
        objName=cidName.Name;
        browser.pause(5000);
        nonTemplateFiles.fileOperations(objName, filetoupload+"prevacid-heartburn.swf");
        browser.pause(5000);
        versionTab.WipversionValidation();
        browser.pause(5000);
        documentListTab.selectAsset(objName);
        documentListTab.promoteAsset(objName);
        browser.pause(2000);
        documentListTab.demoteAsset(objName);
        browser.pause(2000);
        documentListTab.powerPromoteAsset(objName);
        browser.pause(2000);
        documentListTab.publishAssetToStaging(objName);
        browser.pause(2000);
        documentListTab.expireAsset(objName);
        browser.pause(5000);
    });

     it('Verify user is able to checkout,cancel checkout, checkin,Promote,Demote,Power Promote,Publish,Expire and Wip version checking functionality on Working with Static files -PPE-70175(wbmd_cons_shrt_txt)', function () {
        findTab.findbyId("091e9c5e8008688e");
        browser.pause(5000);
        cidName = propertiesTab.getChronicleIdAndTitle();
        chronicleId = cidName.chronicleId;
        objName=cidName.Name;
        browser.pause(5000);
        nonTemplateFiles.fileOperations(objName, filetoupload+"epilepsy_1.gif");
        browser.pause(5000);
        versionTab.WipversionValidation();
        browser.pause(5000);
        documentListTab.selectAsset(objName);
        documentListTab.promoteAsset(objName);
        browser.pause(2000);
        documentListTab.demoteAsset(objName);
        browser.pause(2000);
        documentListTab.powerPromoteAsset(objName);
        browser.pause(2000);
        documentListTab.publishAssetToStaging(objName);
        browser.pause(2000);
        documentListTab.expireAsset(objName);
        browser.pause(5000);
    });


      it('Verify user is able to checkout,cancel checkout, checkin,Promote,Demote,Power Promote,Publish,Expire and Wip version checking functionality on Working with Static files -PPE-70175(wbmd_cons_ptr)', function () {
        findTab.findbyId("091e9c5e80333fbb");
        browser.pause(5000);
        cidName = propertiesTab.getChronicleIdAndTitle();
        chronicleId = cidName.chronicleId;
        objName=cidName.Name;
        browser.pause(5000);
        nonTemplateFiles.fileOperations(objName, filetoupload+"badgiftslovedones.jpg");
        browser.pause(5000);
        versionTab.WipversionValidation();
        browser.pause(5000);
        documentListTab.selectAsset(objName);
        documentListTab.promoteAsset(objName);
        browser.pause(2000);
        documentListTab.demoteAsset(objName);
        browser.pause(2000);
        documentListTab.powerPromoteAsset(objName);
        browser.pause(2000);
        documentListTab.publishAssetToStaging(objName);
        browser.pause(2000);
        documentListTab.expireAsset(objName);
        browser.pause(5000);
    });
});



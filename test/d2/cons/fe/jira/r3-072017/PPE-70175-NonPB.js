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
        
         browser.pause(30000);

    });

   

      it('Verify user is able to checkout,cancel checkout, checkin,Promote,Demote,Power Promote,Publish,Expire and Wip version checking functionality on Working with Static files -PPE-70175(wbmd_cons_article)', function () {
        findTab.findbyId("091e9c5e8001978d");
        browser.pause(5000);
        cidName = propertiesTab.getChronicleName();
        objName=cidName.Name;
        browser.pause(5000);
        nonTemplateFiles.CheckoutCheckinOperations(objName, filetoupload+"form_vis17_expired.pdf");
        browser.pause(5000);
        documentListTab.selectAsset(objName);
        documentListTab.promoteAsset(objName);
        browser.pause(2000);
        documentListTab.demoteAsset(objName);
        browser.pause(2000);
        documentListTab.powerPromoteAsset(objName);
        browser.pause(5000);
    });
   
    it('Verify user is able to checkout,cancel checkout, checkin,Promote,Demote,Power Promote,Publish,Expire and Wip version checking functionality on Working with Static files -PPE-70175(wbmd_cons_asset)', function () {
        browser.pause(5000);
        findTab.findbyId("091e9c5e8014cd9a");
        browser.pause(20000);
        cidName = propertiesTab.getChronicleName();
        objName=cidName.Name;
        browser.pause(5000);
        nonTemplateFiles.CheckoutCheckinOperations(objName, filetoupload+"slide_show_fp.js");
        browser.pause(5000);
        documentListTab.selectAsset(objName);
        documentListTab.promoteAsset(objName);
        browser.pause(2000);
        documentListTab.demoteAsset(objName);
        browser.pause(2000);
        documentListTab.powerPromoteAsset(objName);
        browser.pause(5000);
    });
     it('Verify user is able to checkout,cancel checkout, checkin,Promote,Demote,Power Promote,Publish,Expire and Wip version checking functionality on Working with Static files -PPE-70175(wbmd_cons_shrt_txt)', function () {
        browser.pause(10000);
        findTab.findbyId("091e9c5e80332183");
        browser.pause(5000);
        cidName = propertiesTab.getChronicleName();
        objName=cidName.Name;
        browser.pause(5000);
        nonTemplateFiles.CheckoutCheckinOperations(objName, filetoupload+"heartburnchart.gif");
        browser.pause(5000);
        documentListTab.selectAsset(objName);
        documentListTab.promoteAsset(objName);
        browser.pause(2000);
        documentListTab.demoteAsset(objName);
        browser.pause(2000);
        documentListTab.powerPromoteAsset(objName);
        browser.pause(5000);
    });


      it('Verify user is able to checkout,cancel checkout, checkin,Promote,Demote,Power Promote,Publish,Expire and Wip version checking functionality on Working with Static files -PPE-70175(wbmd_cons_ptr)', function () {
        findTab.findbyId("091e9c5e81582094");
        browser.pause(5000);
        cidName = propertiesTab.getChronicleName();
        objName=cidName.Name;
        browser.pause(5000);
        nonTemplateFiles.CheckoutCheckinOperations(objName, filetoupload+"micm_walgreens_logo.jpg");
        browser.pause(5000);
        documentListTab.selectAsset(objName);
        documentListTab.promoteAsset(objName);
        browser.pause(2000);
        documentListTab.demoteAsset(objName);
        browser.pause(2000);
        documentListTab.powerPromoteAsset(objName);
        browser.pause(5000);
    });


  
   
    it('Verify user is able to checkout,cancel checkout, checkin,Promote,Demote,Power Promote,Publish,Expire and Wip version checking functionality on Working with Static files -PPE-70175(wbmd_sponsor_asset)', function () {
        
        var chronicid="091e9c5e80cae51a";
        findTab.findbyId(chronicid);
        browser.pause(5000);
        cidName = propertiesTab.getChronicleName();
        objName=cidName.Name;
        browser.pause(5000);
        nonTemplateFiles.CheckoutCheckinOperations(objName, filetoupload+"bone_animation.swf");
        browser.pause(10000);
        findTab.findbyId(chronicid);
        documentListTab.promoteAsset(objName);
        browser.pause(5000);
        findTab.findbyId(chronicid);
        documentListTab.demoteAsset(objName);
        browser.pause(5000);
        findTab.findbyId(chronicid);
        documentListTab.powerPromoteAsset(objName);
        browser.pause(5000);
    });
    
     it('Verify user is able to checkout,cancel checkout, checkin,Promote,Demote,Power Promote,Publish,Expire and Wip version checking functionality on Working with Static files -PPE-70175(wbmd_cons_video)', function () {
        findTab.findbyId("091e9c5e80b1b734");
        browser.pause(5000);
        cidName = propertiesTab.getChronicleName();
        objName=cidName.Name;
        browser.pause(5000);
        nonTemplateFiles.CheckoutCheckinOperations(objName, filetoupload+"prevacid-heartburn.swf");
        browser.pause(5000);
        documentListTab.selectAsset(objName);
        documentListTab.promoteAsset(objName);
        browser.pause(2000);
        documentListTab.demoteAsset(objName);
        browser.pause(2000);
        documentListTab.powerPromoteAsset(objName);
        browser.pause(5000);
    });

   

    

  it('Verify user is able to checkout,cancel checkout, checkin,Promote,Demote,Power Promote,Publish,Expire and Wip version checking functionality on Working with Static files -PPE-70175(wbmd_asset)', function () {
        findTab.findbyId("091e9c5e807b4b4f");
        browser.pause(5000);
        cidName = propertiesTab.getChronicleName();
        objName=cidName.Name;
        browser.pause(5000);
        nonTemplateFiles.CheckoutCheckinOperations(objName, filetoupload+"nbhc_main.swf");
        browser.pause(5000);
       documentListTab.selectAsset(objName);
        documentListTab.promoteAsset(objName);
        browser.pause(2000);
        documentListTab.demoteAsset(objName);
        browser.pause(2000);
        documentListTab.powerPromoteAsset(objName);
        // browser.pause(2000);
        // // documentListTab.publishAssetToStaging(objName);
        // // browser.pause(2000);
        // documentListTab.expireAsset(objName);
        browser.pause(5000);
        
    });

});



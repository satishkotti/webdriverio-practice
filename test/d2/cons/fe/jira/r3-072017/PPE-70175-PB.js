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


describe('Working with Static files -PPE-70175 and ', function () {
   
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

    it('Verify user is able to checkout,cancel checkout, checkin,Promote,Demote,Power Promote,Publish,Expire and Wip version checking functionality on Working with Static files -PPE-70175(wbmd_pb_asset)', function () {
        browser.pause(5000);
        findTab.findbyId("091e9c5e8064a135");
        browser.pause(5000);
        cidName = propertiesTab.getChronicleName();
        
        objName=cidName.Name;
        browser.pause(5000);
        nonTemplateFiles.CheckoutCheckinOperations(objName, filetoupload+"arrow-up.jpg");
        browser.pause(5000);
        documentListTab.selectAsset(objName);
        documentListTab.promoteAsset(objName);
        browser.pause(2000);
        documentListTab.demoteAsset(objName);
        browser.pause(2000);
        documentListTab.powerPromoteAsset(objName);
        browser.pause(5000);
    });


     it('Verify user is able to checkout,cancel checkout, checkin,Promote,Demote,Power Promote,Publish,Expire and Wip version checking functionality on Working with Static files -PPE-70175(wbmd_pb_CSS)', function () {
        browser.pause(5000);
        findTab.findbyId("091e9c5e802d7217");
        browser.pause(5000);
        cidName = propertiesTab.getChronicleName();
        
        objName=cidName.Name;
        browser.pause(5000);
        nonTemplateFiles.CheckoutCheckinOperations(objName, filetoupload+"newsletter-smed-standard.css");
        browser.pause(5000);
        documentListTab.selectAsset(objName);
        documentListTab.promoteAsset(objName);
        browser.pause(2000);
        documentListTab.demoteAsset(objName);
        browser.pause(2000);
        documentListTab.powerPromoteAsset(objName);
        browser.pause(5000);
    });


    


     it('Verify user is able to checkout,cancel checkout, checkin,Promote,Demote,Power Promote,Publish,Expire and Wip version checking functionality on Working with Static files -PPE-70175(wbmd_pb_schemas)', function () {
        browser.pause(5000);
        var chronicid="091e9c5e80005128";
        findTab.findbyId(chronicid);
        browser.pause(5000);
        cidName = propertiesTab.getChronicleName();
        
        objName=cidName.Name;
        browser.pause(5000);
        nonTemplateFiles.CheckoutCheckinOperations(objName, filetoupload+"TopicArticle.xsd");
        documentListTab.selectAsset(objName);
        documentListTab.promoteAsset(objName);
        browser.pause(2000);
         findTab.findbyId(chronicid);
        documentListTab.selectAsset(objName);
        documentListTab.demoteAsset(objName);
        browser.pause(2000);
        findTab.findbyId(chronicid);
        documentListTab.powerPromoteAsset(objName);
        browser.pause(5000);
    });


      it('Verify user is able to checkout,cancel checkout, checkin,Promote,Demote,Power Promote,Publish,Expire and Wip version checking functionality on Working with Static files -PPE-70175(wbmd_pb_xsl)', function () {
        
        browser.pause(5000);
        findTab.findbyId("091e9c5e800b3a02");
        browser.pause(5000);
        cidName = propertiesTab.getChronicleName();
        
        objName=cidName.Name;
        browser.pause(5000);
        nonTemplateFiles.CheckoutCheckinOperations(objName, filetoupload+"VideoSearch.xsl");
        browser.pause(5000);
        documentListTab.selectAsset(objName);
        documentListTab.promoteAsset(objName);
        browser.pause(2000);
        documentListTab.demoteAsset(objName);
        browser.pause(2000);
        documentListTab.powerPromoteAsset(objName);
        browser.pause(5000);
    });
   

   
    it.skip('Verify user is able to checkout,cancel checkout, checkin,Promote,Demote,Power Promote,Publish,Expire and Wip version checking functionality on Working with Static files -PPE-70175(wbmd_pb_page)', function () {

        browser.pause(5000);
        findTab.findbyId("091e9c5e81192cee");
        browser.pause(5000);
        cidName = propertiesTab.getChronicleName();
        
        objName=cidName.Name;
        browser.pause(5000);
        nonTemplateFiles.CheckoutCheckinOperations(objName, filetoupload+"index.html");
        browser.pause(5000);
        documentListTab.selectAsset(objName);
        documentListTab.promoteAsset(objName);
        browser.pause(2000);
        documentListTab.demoteAsset(objName);
        browser.pause(2000);
        documentListTab.powerPromoteAsset(objName);
        browser.pause(5000);
    });
    
     it('Verify user is able to checkout,cancel checkout, checkin,Promote,Demote,Power Promote,Publish,Expire and Wip version checking functionality on Working with Static files -PPE-70175(wbmd_pb_js)', function () {
        browser.pause(5000);
        findTab.findbyId("091e9c5e800563e0");
        browser.pause(5000);
        cidName = propertiesTab.getChronicleName();
        
        objName=cidName.Name;
        browser.pause(5000);
        nonTemplateFiles.CheckoutCheckinOperations(objName, filetoupload+"wellness_BMI.js");
        browser.pause(5000);
        documentListTab.selectAsset(objName);
        documentListTab.promoteAsset(objName);
        browser.pause(2000);
        documentListTab.demoteAsset(objName);
        browser.pause(2000);
        documentListTab.powerPromoteAsset(objName);
        browser.pause(2000);
    });


   
  
});



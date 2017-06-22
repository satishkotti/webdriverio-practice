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
        

    });

    it('Verify user is able to checkout,cancel checkout, checkin,Promote,Demote,Power Promote,Publish,Expire and Wip version checking functionality on Working with Static files -PPE-70175(wbmd_pb_asset)', function () {
        
        findTab.findbyId("091e9c5e80582b79");
        browser.pause(5000);
        cidName = propertiesTab.getChronicleIdAndTitle();
        chronicleId = cidName.chronicleId;
        objName=cidName.Name;
        browser.pause(5000);
        nonTemplateFiles.fileOperations(objName, filetoupload+"arrow-down.jpg");
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


     it('Verify user is able to checkout,cancel checkout, checkin,Promote,Demote,Power Promote,Publish,Expire and Wip version checking functionality on Working with Static files -PPE-70175(wbmd_pb_CSS)', function () {
        findTab.findbyId("091e9c5e802d7217");
        browser.pause(5000);
        cidName = propertiesTab.getChronicleIdAndTitle();
        chronicleId = cidName.chronicleId;
        objName=cidName.Name;
        browser.pause(5000);
        nonTemplateFiles.fileOperations(objName, filetoupload+"newsletter-smed-standard.css");
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


    


     it('Verify user is able to checkout,cancel checkout, checkin,Promote,Demote,Power Promote,Publish,Expire and Wip version checking functionality on Working with Static files -PPE-70175(wbmd_pb_schemas)', function () {
        findTab.findbyId("091e9c5e80005128");
        browser.pause(5000);
        cidName = propertiesTab.getChronicleIdAndTitle();
        chronicleId = cidName.chronicleId;
        objName=cidName.Name;
        browser.pause(5000);
        nonTemplateFiles.fileOperations(objName, filetoupload+"TopicArticle.xsd");
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


      it('Verify user is able to checkout,cancel checkout, checkin,Promote,Demote,Power Promote,Publish,Expire and Wip version checking functionality on Working with Static files -PPE-70175(wbmd_pb_xsl)', function () {
        findTab.findbyId("091e9c5e800b7440");
        browser.pause(5000);
        cidName = propertiesTab.getChronicleIdAndTitle();
        chronicleId = cidName.chronicleId;
        objName=cidName.Name;
        browser.pause(5000);
        nonTemplateFiles.fileOperations(objName, filetoupload+"AuthorWrittenByUSL.xsl");
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
   

   
    it('Verify user is able to checkout,cancel checkout, checkin,Promote,Demote,Power Promote,Publish,Expire and Wip version checking functionality on Working with Static files -PPE-70175(wbmd_pb_page)', function () {
        findTab.findbyId("091e9c5e81192cee");
        browser.pause(5000);
        cidName = propertiesTab.getChronicleIdAndTitle();
        chronicleId = cidName.chronicleId;
        objName=cidName.Name;
        browser.pause(5000);
        nonTemplateFiles.fileOperations(objName, filetoupload+"index.html");
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
    
     it('Verify user is able to checkout,cancel checkout, checkin,Promote,Demote,Power Promote,Publish,Expire and Wip version checking functionality on Working with Static files -PPE-70175(wbmd_pb_js)', function () {
        findTab.findbyId("091e9c5e800563e0");
        browser.pause(5000);
        cidName = propertiesTab.getChronicleIdAndTitle();
        chronicleId = cidName.chronicleId;
        objName=cidName.Name;
        browser.pause(5000);
        nonTemplateFiles.fileOperations(objName, filetoupload+"wellness_BMI.js");
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


   
     it('Verify WIP label should be applied to latest version and object should be in WIP state to be able to promote it to Staging functionality on Can not update PB objects in D2', function () {
        findTab.findbyId("091e9c5e80c9ba67");
        browser.pause(5000);
        cidName = propertiesTab.getChronicleIdAndTitle();
        chronicleId = cidName.chronicleId;
        objName=cidName.Name;
        browser.pause(5000);
        nonTemplateFiles.fileOperations(objName, filetoupload+"wallpaper.css");
        browser.pause(5000);
        versionTab.WipversionValidation();
        browser.pause(5000);
        documentListTab.selectAsset(objName);
        documentListTab.promoteAsset(objName);
        versionTab.WipversionValidation();
        browser.pause(5000);
        documentListTab.selectAsset(objName);
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



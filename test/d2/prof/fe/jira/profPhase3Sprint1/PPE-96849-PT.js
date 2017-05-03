var Promise = require('bluebird');
var JSONPath = require('JSONPath');
var parseXml = require('./../../../common/components/parseXml');
var functions = require('./../../../common/functions/functions');
var Login = require('./../../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../../common/actions/documentListTab.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
var contentTab = require('./../../../common/actions/contentTab.actions');
var otfTab = require('./../../../common/actions/otfTab.actions');
var moment = require('moment-timezone');
var allFields = require('./../../../common/actions/AllFiledseditpropertiesTab.actions');

var Objectname= global.d2ProfDataSettings.inputData.ObjectName;
var PublicationName=global.d2ProfDataSettings.inputData.PublicationName

describe('Professional - ProfPublication PPE-96849', function () {

     var objPublicationName;
     var objName;
     var title;
     var publicationName;
    before(function () {
        Login.login({
        url: functions.getEnvTestUrl(),
        username: functions.getQAAdminEmedUser().username,
        password: functions.getQAAdminEmedUser().password
    });
        repositoryBrowserTab.openFolder(global.d2ProfDataSettings.PTData.testFolderPath);
        workspaceMenu.createProfPublication(global.d2ProfDataSettings.PTData.PublicationProfileName,
                    global.d2ProfDataSettings.inputData.ProfPublication, 
                    Objectname, PublicationName);
        documentListTab.selectAsset(Objectname);
    });

    it('Should be able to Verify the messages when mandatory fields are left blank for  professional publication object', function () {
        var AlertMessage = propertiesTab.verifyMandatoryFieldsforProfpublicationProp();
        propertiesTab.cancelEdit();
        expect(AlertMessage).to.be.true;
    });

    it('Should be able to creation  professional publication with only mandatory fields', function () {
        objPublicationName = propertiesTab.getObjectNamePublicationTab();
        objName = objPublicationName.name;
        title = objPublicationName.title;
        publicationName=objPublicationName.publicationName;
        propertiesTab.setRequiredPropertiesForProfPublication(publicationName, title,global.d2ProfDataSettings.PTData.publicationRelationships,global.d2ProfDataSettings.PTData.siteRestrictions);
        documentListTab.selectAsset(title);
        var IsInitialVersionVerified = documentListTab.verifyVersions(global.d2ProfDataSettings.inputData.InitialVersion);
        expect(IsInitialVersionVerified).to.be.true;
        expect(Objectname).to.equal(title);
        documentListTab.verifyProfpublicationRelations();
        
    });
    
    
    it('Should be able to Checkout and checkin functionality on  professional publication', function(){
        contentTab.checkOut();
        documentListTab.selectAsset(Objectname);
        var IsLocked = documentListTab.verifyLock(objName);
        expect(IsLocked).to.be.true;
        var IsInitialVersionVerified = documentListTab.verifyVersions(global.d2ProfDataSettings.inputData.InitialVersion);
        expect(IsInitialVersionVerified).to.be.true;
        contentTab.checkIn();
        var IsCheckInVersionVerified = documentListTab.verifyVersions(global.d2ProfDataSettings.inputData.CheckedInVersion);
        expect(IsCheckInVersionVerified).to.be.true;
    });

    it('Should be able to save the  professional publication object with all fields data', function () {
        objPublicationName = propertiesTab.getObjectNamePublicationTab();
        objName = objPublicationName.name;
        title = objPublicationName.title;
        publicationName=objPublicationName.publicationName;
        allFields.setProfPublicationAllFields(objName,global.d2ProfDataSettings.PTData.publicationType,objName,objName,objName
        ,objName,objName,objName,objName,objName,global.d2ProfDataSettings.PTData.companyName,global.d2ProfDataSettings.inputData.publicationSections,global.d2ProfDataSettings.PTData.copyRights);
        contentTab.updateProfpublicationContent("heart");
        expect(Objectname).to.equal(title);
    });  

     it('Should be able to Promote functionality on  professional publication', function () {
        documentListTab.promoteAsset(objName);
        browser.pause(3000);
    });

     it('Should be able to Demote functionality on  professional publication', function () {
        documentListTab.demoteAsset(objName);
        browser.pause(3000);
    });

    it('Should be able to Cancel Checkout functionality on  professional publication', function(){
        contentTab.checkOut();
        browser.pause(3000);
        contentTab.cancel();
    });

     it('Should be able to Power Promote functionality on  professional publication', function () {
        browser.pause(3000);
        documentListTab.powerPromoteAsset(objName);
    });

    it('Should be able to Expire the professional publication article', function () {
        browser.pause(2000);
        documentListTab.expireAsset(objName);
    });

    it('Should verify the OTF structure for Publication object', function () {
        browser.pause(3000); 
        otfTab.selectOTFTab();
        documentListTab.selectAsset(title); 
        otfTab.selectExternalWidget();
        otfTab.verfiyPublicationStructure(Objectname);
    });

    it('Should be able to copy the slide article',function(){
        browser.pause(3000);
        documentListTab.copyArticle(title);
        documentListTab.searchCopyArticle(title);
    });

   it('Should be able to delete the  professional publication',function(){
        documentListTab.selectAsset(title);
        browser.pause(1000);
        documentListTab.deleteArticle(objName,global.d2ProfDataSettings.inputData.DeleteAllversions);
        documentListTab.searchArticle(objName,title);
    });

    it('Should be able to update the existing  professional publication',function(){
        browser.pause(2000);
        documentListTab.selectItemByNamePagination(d2ProfDataSettings.inputData.ExistingProfPublicationName);
        objPublicationName = propertiesTab.getObjectNamePublicationTab();
        objName = objPublicationName.name;
        title = objPublicationName.title;
        publicationName=objPublicationName.publicationName;
        propertiesTab.setRequiredPropertiesForPubSection(publicationName, title);       
        expect(d2ProfDataSettings.inputData.ExistingProfPublicationName).to.equal(title);
   });
   

});
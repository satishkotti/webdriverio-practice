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
var Objectname= global.d2ProfDataSettings.PSPTData.ObjectName;

describe('Publication Section PPE-96852', function () {

     var cidName;
     var objName;
     var title;
     var cid;
    before(function () {
        browser.setViewportSize({
        width: 1920,
        height: 1080
        });   
        Login.login({
        url: functions.getEnvTestUrl(),
        username: functions.getQAAdminEmedUser().username,
        password: functions.getQAAdminEmedUser().password
    });
         repositoryBrowserTab.openFolder(global.d2ProfDataSettings.PSPTData.testFolderPathPubSection);
        workspaceMenu.createContentPubSection(global.d2ProfDataSettings.PSPTData.PublicationProfileName,
                    global.d2ProfDataSettings.inputData.PublicationSectionTemplate, 
                    Objectname, '');
        documentListTab.selectAsset(Objectname);
    });

    it('Should be able to Verify the messages when mandatory fields are left blank for Publication Section object', function () {
        var AlertMessage = propertiesTab.verifyMandatoryFieldsforPubSectionProp();
        propertiesTab.cancelEdit();
        expect(AlertMessage).to.be.true;
    });

    it('Should be able to creation Publication section with only mandatory fields', function () {
        cidName = propertiesTab.getChronicleIdAndName();
        objName = cidName.objectName;
        title = cidName.title;
        cid=cidName.chronicleId;
        propertiesTab.setRequiredPropertiesForPubSection(objName, title);
        documentListTab.selectAsset(Objectname);
        var IsInitialVersionVerified = documentListTab.verifyVersions(global.d2ProfDataSettings.inputData.InitialVersion);
        expect(IsInitialVersionVerified).to.be.true;
        expect(Objectname).to.equal(title);
        documentListTab.verifyPubSectionRelations();
        
    });
    
    it('Should be able to Checkout and checkin functionality on Publication Section', function(){
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

    it('Should be able to creation Publication section with All fields', function () {
        
        propertiesTab.setAllPropertiesForPubSection(title);
        contentTab.updateContentAllFields("Logo");
    });

     it('Should be able to Promote functionality on Publication Section', function () {
        documentListTab.promoteAsset(objName);
        browser.pause(3000);
    });

     it('Should be able to Demote functionality on Slide Article template', function () {
        documentListTab.demoteAsset(objName);
        browser.pause(3000);
    });

    it('Should be able to Cancel Checkout functionality on Slide Article template', function(){
        contentTab.checkOut();
        browser.pause(3000);
        contentTab.cancel();
    });

     it('Should be able to Power Promote functionality on Slide Article template', function () {
         browser.pause(3000);
        documentListTab.powerPromoteAsset(objName);
    });

    it('Should be able to copy the slide article',function(){
        browser.pause(3000);
        documentListTab.copyArticle(title);
        documentListTab.searchCopyArticle(title);
    });

     it('Should be able to Expire functionality on Slide Article template', function () {
         documentListTab.selectAsset(cid);
        documentListTab.expireAsset(cid);
        browser.pause(3000);
    });

    it('Should be able to delete the article',function(){
        documentListTab.selectAsset(title);
        browser.pause(3000);
        documentListTab.deleteArticle(cid,global.d2ProfDataSettings.inputData.DeleteAllversions);
        documentListTab.searchArticle(cid,title);
    });

    it('Should be able to update the existing article',function(){
        documentListTab.selectItemByNamePagination(d2ProfDataSettings.PSPTData.AssetName);
        cidName = propertiesTab.getChronicleIdAndName();
        objName = cidName.objectName;
        title = cidName.title;
        cid=cidName.chronicleId;
        propertiesTab.setRequiredPropertiesForPubSection(objName, title);
        //contentTab.updateContent("Sample Text");
        contentTab.updateContentAllFields("Logo");
        expect(d2ProfDataSettings.PSPTData.AssetName).to.equal(title);
   });

});
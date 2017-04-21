var Promise = require('bluebird');
var JSONPath = require('JSONPath');
var parseXml = require('./../../../common/components/parseXml');
var functions = require('./../../../common/functions/functions');
var Login = require('./../../../common/actions/login.actions');
var contentTab = require('./../../../common/actions/contentTab.actions');
var repositoryBrowserTab = require('./../../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../../common/actions/documentListTab.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
var otfTab = require('./../../../common/actions/otfTab.actions');
var moment = require('moment-timezone');
var randomstring = require("randomstring");

 
describe('Professional - PublicationSubSection PPE-96857', function () {
    var AssetTitle;
    var cid;

    before(function () {
        Login.login({
        url: functions.getEnvTestUrl(),
        username: functions.getQAPublicationUser().username,
        password: functions.getQAPublicationUser().password
    });
        browser.pause(2000);
        repositoryBrowserTab.openFolder(global.d2ProfDataSettings.inputData.testFolderPath);
        AssetTitle = global.d2ProfDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        workspaceMenu.createPublicationSubsection(global.d2ProfDataSettings.inputData.publicationProfileName,
        global.d2ProfDataSettings.inputData.PublicationsubsectionTemplate, 
        AssetTitle
        );
           documentListTab.selectAsset(AssetTitle);
    });
    it('Verify Publication Subsection creation with only mandatory fields PPE-107726', function () {
        
        documentListTab.selectAsset(AssetTitle);

    });
     it('Verify the messages when mandatory fields are left blank fr Pointer-PPE-106396', function () {
        documentListTab.selectAsset(AssetTitle);
        propertiesTab.verifyPubSubSecProperties();

    });
    it('Verify the relation for the Publication Subsection asset- PPE-108362', function () {
        documentListTab.selectAsset(AssetTitle);
        documentListTab.verifyPubSubSecRelation();

    });
     it.skip('Verify PublicationSubSection creation with all fields- PPE-107822', function () {
        documentListTab.selectAsset(AssetTitle);
        propertiesTab.SetPubsubsectionALLProperties(AssetTitle);

    });

    it('Verify Checkout and checkin functionality on Professional Publication Sub Section PPE-107794', function(){
         cidName = propertiesTab.getChronicleIdAndName();
        objName = cidName.objectName;
        title = cidName.title;
        cid=cidName.chronicleId;
        contentTab.checkOut();
        var IsLocked = documentListTab.verifyLock(objName);
        expect(IsLocked).to.be.true;
        var IsInitialVersionVerified = documentListTab.verifyVersions(global.d2ProfDataSettings.inputData.InitialVersion);
        expect(IsInitialVersionVerified).to.be.true;
        browser.frameParent();
        contentTab.checkIn();
        var IsCheckInVersionVerified = documentListTab.verifyVersions(global.d2ProfDataSettings.inputData.CheckedInVersion);
        expect(IsCheckInVersionVerified).to.be.true;
    });

    it('Should be able to update the existing article',function(){
        documentListTab.selectItemByNamePagination(objName);
        cidName = propertiesTab.getChronicleIdAndName();
        objName = cidName.objectName;
        title = cidName.title;
        cid=cidName.chronicleId;
        propertiesTab.setPubsubsectionProperties(title,objName,objName,global.d2ProfDataSettings.inputData.LeadSpecialty,
        global.d2ProfDataSettings.inputData.ContentDeveloper);
        contentTab.updatePubSubsectionContent("Sample Text");
    });

    it('Verify Promote functionality on PublicationSubSection PPE-107802', function () {
        documentListTab.promoteAsset(objName);
    });

    it('Verify Demote functionality on PublicationSubSection PPE-107813', function () {
        documentListTab.demoteAsset(objName);
    });

    it('Verify Cancel Checkout functionality on PublicationSubSection Implementation PPE-107797', function(){
        contentTab.checkOut();
        contentTab.cancel();
    });

    it('Verify Power Promote functionality on PublicationSubSection PPE-107805', function () {
        documentListTab.powerPromoteAsset(objName);
    });

    it('Verify Expire functionality on PublicationSubSection PPE-107808', function () {
        documentListTab.expireAsset(objName);
    });

    it.skip('Should be able to delete the article',function(){
        browser.pause(5000);
        documentListTab.selectAsset(title);
        documentListTab.deleteArticle(cid,global.d2ProfDataSettings.inputData.DeleteAllversions);
        documentListTab.searchArticle(cid,title);
    });
    
});


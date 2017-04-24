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
var pubSubSecTab = require('./../../../common/actions/pubSubSec.action');
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

   it('Verify the data dictionary validations on PublicationSubSection-PPE-107829 ', function () {
        documentListTab.selectAsset(AssetTitle);
        pubSubSecTab.propertiesFieldsValidation();
    });
    it('Verify the messages when mandatory fields are left blank fr Pointer-PPE-106396', function () {
        documentListTab.selectAsset(AssetTitle);
        pubSubSecTab.verifyPubSubSecProperties();

    });
    it('Verify the relation for the Publication Subsection asset- PPE-108362', function () {
        documentListTab.selectAsset(AssetTitle);
        pubSubSecTab.verifyPubSubSecRelation();

    });
     it('Verify PublicationSubSection creation with all fields- PPE-107822', function () {
        documentListTab.selectAsset(AssetTitle);
        propertiesTab.SetPubsubsectionALLProperties(AssetTitle);
        contentTab.SetPubsubsectionContentAllProperties(AssetTitle);

    });

    it('Verify editing of an existing PublicationSubSection-PPE-107830',function(){
       documentListTab.selectItemByNamePagination(objName);
        cidName = propertiesTab.getChronicleIdAndName();
        objName = cidName.objectName;
        title = cidName.title;
        cid=cidName.chronicleId;
        propertiesTab.setPubsubsectionProperties(title,objName,objName,global.d2ProfDataSettings.inputData.LeadSpecialty,
        global.d2ProfDataSettings.inputData.ContentDeveloper);
        contentTab.updatePubSubsectionContent("Sample Text");
        //repositoryBrowserTab.openFolder(global.d2ProfDataSettings.inputData.testFolderPath);
       // documentListTab.searchArticle("10745",AssetTitle);
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

 it('Verify Schedule Publish functionality on PublicationSubSection-PPE-107825',function(){
        browser.pause(5000);
        console.log("Last Test Case"+ AssetTitle);
        documentListTab.selectAsset(AssetTitle);
        var schpublishtime  = moment.tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
        schpublishtime = moment(schpublishtime);
        schpublishtime=moment(schpublishtime, "DD MMM YYYY HH:mm:ss")
        .add(00, 'seconds')
        .add(05, 'minutes').format('DD MMM YYYY HH:mm:ss');
        expdate=moment(schpublishtime, "DD MMM YYYY HH:mm:ss")
        .add(00, 'seconds')
        .add(06, 'minutes').format('DD MMM YYYY HH:mm:ss'); 
       propertiesTab.SetPubsubsectionALLProperties(AssetTitle);
        documentListTab.schedulePublishAsset(AssetTitle);
        browser.pause(3000);
        var status=contentTab.contentHeaderGet();
        expect(status).to.contains("Approved");
        browser.pause(300000);
        browser.refresh();
        repositoryBrowserTab.openFolder(global.d2ProfDataSettings.inputData.testFolderPath);
        documentListTab.selectAsset(AssetTitle);
        expect(contentTab.contentHeaderGet()).to.contains("Active");
    });   

    it('Verify Expire functionality on PublicationSubSection PPE-107808', function () {
        documentListTab.expireAsset(objName);
    });

    it.skip('Verify Schedule Expire functionality on PublicationSubSection-PPE-107827',function(){
        browser.pause(54000);
        browser.refresh();
        repositoryBrowserTab.openFolder(global.d2ProfDataSettings.inputData.testFolderPath);
        documentListTab.selectAsset(title);
        expect(contentTab.contentHeaderGet()).to.contains("Expire");
    });
    
    
    it('Verify Delete functionality on PublicationSubSection-PPE-107819',function(){
        browser.pause(5000);
        documentListTab.selectAsset(title);
        documentListTab.deleteArticle(cid,global.d2ProfDataSettings.inputData.DeleteAllversions);
        documentListTab.searchArticle(AssetTitle,AssetTitle);
    });

});


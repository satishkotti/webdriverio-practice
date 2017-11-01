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

var  genericObjectName= global.d2ProfDataSettings.SPData.GenericArticleObjectName;
 var cidName,objName,title,cid
 
describe('Professional - ProfArticle (Generic) PPE-96821', function () {
    before(function () {
        Login.login({
        url: functions.getEnvTestUrl(),
        username: functions.getQAAdminEmedUser().username,
        password: functions.getQAAdminEmedUser().password
    });
        repositoryBrowserTab.openFolder(global.d2ProfDataSettings.SPData.testFolderPath);
        workspaceMenu.createContent(global.d2ProfDataSettings.SPData.ProfileName,
        global.d2ProfDataSettings.inputData.GenericTemplate, 
        genericObjectName, 
        global.d2ProfDataSettings.SPData.GenericContType);
       // documentListTab.selectAsset(genericObjectName);
    });
    it('Should display the validation message when mandatory fields are blank', function () {
        var AlertMessage = propertiesTab.VerifyMandatoryFieldsforGeneric();
        expect(AlertMessage).to.be.true;
    });

    it('Should be able to save the article when all mandatory fields are entered the values', function () {
        cidName = propertiesTab.getChronicleIdAndName();
        objName = cidName.objectName;
        title = cidName.title;
        cid=cidName.chronicleId;
        propertiesTab.setRequiredProperties(objName,objName,objName,global.d2ProfDataSettings.SPData.LeadSpecialty,
        global.d2ProfDataSettings.SPData.ContentDeveloper);
       // contentTab.updateContent("Sample Text");
        var IsInitialVersionVerified = documentListTab.verifyVersions(global.d2ProfDataSettings.inputData.InitialVersion);
        expect(IsInitialVersionVerified).to.be.true;
        expect(genericObjectName).to.equal(title);
        documentListTab.verifyGenericRelations();
    });

    it('Should be able to Checkout and checkin functionality on Generic Article Template', function(){
        contentTab.checkOut();
        documentListTab.selectAsset(genericObjectName);
        var IsLocked = documentListTab.verifyLock(objName);
        expect(IsLocked).to.be.true;
        var IsInitialVersionVerified = documentListTab.verifyVersions(global.d2ProfDataSettings.inputData.InitialVersion);
        expect(IsInitialVersionVerified).to.be.true;
        browser.frameParent();
        contentTab.checkIn();
        var IsCheckInVersionVerified = documentListTab.verifyVersions(global.d2ProfDataSettings.inputData.CheckedInVersion);
        expect(IsCheckInVersionVerified).to.be.true;
    });

    it('Should be able to promote the Generic Article', function () {
        documentListTab.promoteAsset(objName);
    });

    it('Should be able to demote the generic article', function () {
        browser.pause(3000);
        documentListTab.demoteAsset(objName);
    });

    it('Should be able to cancel checkout the generic article', function(){
        browser.pause(3000);
        contentTab.checkOut();
        browser.pause(3000);
        contentTab.cancel();
    });

    it('Should be able to check availability of Generic article in OTF as a parent', function () {
        browser.pause(3000);        
        otfTab.selectOTFTab();
 documentListTab.selectAsset(title); 
        otfTab.selectExternalWidget();
        otfTab.verfiyIfElementExists(genericObjectName);
    });

    it('Should be able to power promote the generic article', function () {
        browser.pause(2000);
        documentListTab.powerPromoteAsset(objName);
    });

    it('Should be able to expire the generic article', function () {
         browser.pause(2000);
        documentListTab.expireAsset(objName);
    });

    it('Should be able to copy the article',function(){
        browser.pause(3000);
        documentListTab.copyArticle(title);
        documentListTab.searchCopyArticle(title);
    });

    it('Should be able to delete the article',function(){
        browser.pause(2000);
        documentListTab.selectAsset(title);
        documentListTab.deleteArticle(cid,global.d2ProfDataSettings.inputData.DeleteAllversions);
        documentListTab.searchArticle(cid,title);
    });

    it.skip('Should be able to publish the article at scheduled time',function(){
        browser.pause(5000);
        console.log("Last Test Case"+ title);
        documentListTab.selectAsset(title);
        var schpublishtime  = moment.tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
        schpublishtime = moment(schpublishtime);
        schpublishtime=moment(schpublishtime, "DD MMM YYYY HH:mm:ss")
        .add(00, 'seconds')
        .add(05, 'minutes').format('DD MMM YYYY HH:mm:ss');
        expdate=moment(schpublishtime, "DD MMM YYYY HH:mm:ss")
        .add(00, 'seconds')
        .add(06, 'minutes').format('DD MMM YYYY HH:mm:ss'); 
        propertiesTab.setRequiredPropertiesforPublish(schpublishtime,expdate);
        documentListTab.schedulePublishAsset(title);
        browser.pause(3000);
        var status=contentTab.contentHeaderGet();
        expect(status).to.contains("Approved");
        browser.pause(300000);
        browser.refresh();
        repositoryBrowserTab.openFolder(global.d2ProfDataSettings.SPData.testFolderPath);
        documentListTab.selectAsset(title);
        expect(contentTab.contentHeaderGet()).to.contains("Active");
    });   

    it('Should be able to update the existing article',function(){
        documentListTab.selectItemByNamePagination(d2ProfDataSettings.SPData.AssetName);
        cidName = propertiesTab.getChronicleIdAndName();
        objName = cidName.objectName;
        title = cidName.title;
        cid=cidName.chronicleId;
        propertiesTab.setRequiredProperties(objName,objName,objName,global.d2ProfDataSettings.SPData.LeadSpecialty,
        global.d2ProfDataSettings.SPData.ContentDeveloper);
        contentTab.updateContent("Sample Text");
        expect(d2ProfDataSettings.SPData.AssetName).to.equal(title);
    });

    it.skip('Should verify the article scheduled expire status',function(){
        browser.pause(540000);
        browser.refresh();
        repositoryBrowserTab.openFolder(global.d2ProfDataSettings.SPData.testFolderPath);
        documentListTab.selectAsset(title);
        expect(contentTab.contentHeaderGet()).to.contains("Expire");
    });

});


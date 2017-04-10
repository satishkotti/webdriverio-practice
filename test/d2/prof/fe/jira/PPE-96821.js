var Promise = require('bluebird');
var JSONPath = require('JSONPath');
var parseXml = require('./../../common/components/parseXml');
var functions = require('./../../common/functions/functions');
var Login = require('./../../common/actions/login.actions');
var contentTab = require('./../../common/actions/contentTab.actions');
var repositoryBrowserTab = require('./../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../common/actions/documentListTab.actions');
var propertiesTab = require('./../../common/actions/propertiesTab.actions');
var moment = require('moment-timezone');

var  genericObjectName= global.d2ProfDataSettings.inputData.GenericArticleObjectName;
 var cidName,objName,title,cid


describe('Professional - ProfArticle (Generic) PPE-96821', function () {
    before(function () {
        Login.login({
        url: functions.getEnvTestUrl(),
        username: functions.getQAPublicationUser().username,
        password: functions.getQAPublicationUser().password
        });
        repositoryBrowserTab.openFolder(global.d2ProfDataSettings.inputData.testFolderPath);
        workspaceMenu.createContent(global.d2ProfDataSettings.inputData.ProfileName,
        global.d2ProfDataSettings.inputData.GenericTemplate, 
        genericObjectName, 
        global.d2ProfDataSettings.inputData.GenericContType);
       // documentListTab.selectAsset(genericObjectName);
    });
    it('Should display the validation message when mandatory fields are blank', function () {
        var AlertMessage = propertiesTab.verifyMandatoryFieldsforProperties();
        expect(AlertMessage).to.be.true;
    });

    it('Should be able to save the article when all mandatory fields are entered the values', function () {
        cidName = propertiesTab.getChronicleIdAndName();
        objName = cidName.objectName;
        title = cidName.title;
        cid=cidName.chronicleId;
        propertiesTab.setRequiredProperties(objName,objName,objName,global.d2ProfDataSettings.inputData.LeadSpecialty,
        global.d2ProfDataSettings.inputData.ContentDeveloper);
       // contentTab.updateContent("Sample Text");
        expect(genericObjectName).to.equal(title);
    });

    it('Verify Checkout and checkin functionality on Slide Article Template', function(){
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

    it('Verify Promote functionality on Generic Article template', function () {
        documentListTab.promoteAsset(objName);
    });

    it('Verify Demote functionality on Slide Generic template', function () {
        browser.pause(3000);
        documentListTab.demoteAsset(objName);
    });

    it('Verify Cancel Checkout functionality on Generic Article template', function(){
        browser.pause(3000);
        contentTab.checkOut();
        browser.pause(3000);
        contentTab.cancel();
    });

    it('Verify Power Promote functionality on Generic Article template', function () {
        browser.pause(2000);
        documentListTab.powerPromoteAsset(objName);
    });

    it('Verify Expire functionality on Generic Article template', function () {
         browser.pause(2000);
        documentListTab.expireAsset(objName);
    });

    it('Should be able to copy the article',function(){
        browser.pause(3000);
        documentListTab.copyArticle(title);
        documentListTab.searchCopyArticle(title);
    });

    it('Should be able to delete the article',function(){
        documentListTab.selectAsset(title);
        browser.pause(3000);
        documentListTab.deleteArticle(cid,global.d2ProfDataSettings.inputData.DeleteAllversions);
        documentListTab.searchArticle(cid);
    });

    it('Should be able to publish the article at scheduled time',function(){
        browser.pause(5000);
        console.log("Last Test Case"+ title);
        documentListTab.selectAsset(title);
        var localTime  = moment.utc(moment.utc().format('YYYY-MM-DD HH:mm:ss')).toDate();
        localTime = moment(localTime);
        localTime=moment(localTime, "DD MMM YYYY HH:mm:ss")
        .add(00, 'seconds')
        .add(05, 'minutes').format('DD MMM YYYY HH:mm:ss'); 
        expdate=moment(localTime, "DD MMM YYYY HH:mm:ss")
        .add(00, 'seconds')
        .add(10, 'minutes').format('DD MMM YYYY HH:mm:ss'); 
        propertiesTab.setRequiredPropertiesforPublish(localTime,expdate);
        documentListTab.schedulePublishAsset(title);
        browser.pause(3000);
        var status=contentTab.contentHeaderGet();
        expect(status).to.contains("Approved");
        browser.pause(300000);
        expect(contentTab.contentHeaderGet()).to.contains("WIP");
    });
    it('Should verify the article scheduled expire status',function(){
        browser.pause(300000);
        expect(contentTab.contentHeaderGet()).to.contains("Expire");
    });

});



var Promise = require('bluebird');
var JSONPath = require('JSONPath');
var parseXml = require('./../../common/components/parseXml');
var functions = require('./../../common/functions/functions');
var Login = require('./../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../common/actions/documentListTab.actions');
var propertiesTab = require('./../../common/actions/propertiesTab.actions');
var contentTab = require('./../../common/actions/contentTab.actions');
var otfTab = require('./../../common/actions/otfTab.actions');
var moment = require('moment-timezone');
var slideObjectname= global.d2ProfDataSettings.inputData.SlideArticleObjectName;

describe('Slide Presentation PPE-96831', function () {

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
        username: functions.getQAPublicationUser().username,
        password: functions.getQAPublicationUser().password
    });
         repositoryBrowserTab.openFolder(global.d2ProfDataSettings.inputData.SlideFolderPath);
        workspaceMenu.createContent(global.d2ProfDataSettings.inputData.ProfileName,
                    global.d2ProfDataSettings.inputData.SlideArticleTemplate, 
                    slideObjectname, 
                    global.d2ProfDataSettings.inputData.SlideContentType);
        documentListTab.selectAsset(slideObjectname);
    });

    it('Should be able to verify the messages when mandatory fields are left blank for Slide Article template', function () {
        var AlertMessage = propertiesTab.verifyMandatoryFieldsforProperties();
        propertiesTab.cancelEdit();
        expect(AlertMessage).to.be.true;
    });

    it('Should be able to create slide article with only mandatory fields', function () {
        cidName = propertiesTab.getChronicleIdAndName();
        objName = cidName.objectName;
        title = cidName.title;
        cid=cidName.chronicleId;
        propertiesTab.setRequiredProperties(objName,objName,objName,global.d2ProfDataSettings.inputData.LeadSpecialty,
                    global.d2ProfDataSettings.inputData.ContentDeveloper);
        documentListTab.selectAsset(slideObjectname);
        var IsInitialVersionVerified = documentListTab.verifyVersions(global.d2ProfDataSettings.inputData.InitialVersion);
        expect(IsInitialVersionVerified).to.be.true;
        expect(slideObjectname).to.equal(title);
        documentListTab.verifySlideRelations();
        
    });
    
    it('Should be able to Checkout and checkin functionality on Slide Article Template', function(){
        contentTab.checkOut();
        documentListTab.selectAsset(slideObjectname);
        var IsLocked = documentListTab.verifyLock(objName);
        expect(IsLocked).to.be.true;
        var IsInitialVersionVerified = documentListTab.verifyVersions(global.d2ProfDataSettings.inputData.InitialVersion);
        expect(IsInitialVersionVerified).to.be.true;
        contentTab.checkIn();
        var IsCheckInVersionVerified = documentListTab.verifyVersions(global.d2ProfDataSettings.inputData.CheckedInVersion);
        expect(IsCheckInVersionVerified).to.be.true;
    });

     it('Should be able to Promote functionality on Slide Article template', function () {
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

    it('Should be able to check availability of Slide article in OTF as a parent', function () {
        browser.pause(3000);        
        documentListTab.selectAsset(slideObjectname);
        otfTab.selectOTFTab();
        otfTab.selectExternalWidget();
        otfTab.verfiyIfElementExists(slideObjectname);
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
        documentListTab.searchArticle(  );
    });

    it('Should be able to publish the article at scheduled time',function(){
        browser.pause(5000);
        console.log("Last Test Case"+ title);
        documentListTab.selectAsset(title);
        var localTime  = moment.tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
        localTime = moment(localTime);
        localTime=moment(localTime, "DD MMM YYYY HH:mm:ss")
        .add(00, 'seconds')
        .add(05, 'minutes').format('DD MMM YYYY HH:mm:ss');
        expdate=moment(localTime, "DD MMM YYYY HH:mm:ss")
        .add(00, 'seconds')
        .add(06, 'minutes').format('DD MMM YYYY HH:mm:ss'); 
        propertiesTab.setRequiredPropertiesforPublish(localTime,expdate);
        documentListTab.schedulePublishAsset(title);
        browser.pause(3000);
        var status=contentTab.contentHeaderGet();
        expect(status).to.contains("Approved");
        browser.pause(300000);
        browser.refresh();
        repositoryBrowserTab.openFolder(global.d2ProfDataSettings.inputData.testFolderPath);
        documentListTab.selectAsset(title);
        expect(contentTab.contentHeaderGet()).to.contains("Active");
    });

    it('Should verify the article scheduled expire status',function(){
        browser.pause(540000);
        browser.refresh();
        repositoryBrowserTab.openFolder(global.d2ProfDataSettings.inputData.testFolderPath);
        documentListTab.selectAsset(title);
        expect(contentTab.contentHeaderGet()).to.contains("Expire");
    });

});
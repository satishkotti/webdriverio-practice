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
var profMedia = require('./../../../common/actions/profmedia.actions');

var  ArticleObjectName= global.d2ProfDataSettings.inputData.ArticleObjectName;
var cidName,objName,title,cid
title=global.d2ProfDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
var  ArticleObjectName1= global.d2ProfDataSettings.inputData.ArticleObjectName+ randomstring.generate(2);
var  title1= ArticleObjectName1+ randomstring.generate(2);
var inputdata=randomstring.generate(5);
 
describe('Professional - ProfMedia Meta Template - PPE-96821', function () {
    before(function () {
        Login.login({
        url: functions.getEnvTestUrl(),
        username: functions.getQAAdminEmedUser().username,
        password: functions.getQAAdminEmedUser().password
    });
        repositoryBrowserTab.openFolder(global.d2ProfDataSettings.FRData.testFolderPath);
        workspaceMenu.createMedia(global.d2ProfDataSettings.inputData.ProfileOtherName_fr ,
            global.d2ProfDataSettings.inputData.MediaTemplate,
            ArticleObjectName,
            title
        );
    });
    it('Should display the validation message when mandatory fields are blank - PPE-105989', function () {
        var AlertMessage =profMedia.verifyProfMediaMandatoryFields();
        expect(AlertMessage).to.be.true;
    });

    it('Should be able to save the article when all mandatory fields are entered the values', function () {
        mediaobjdts = propertiesTab.getMediaObjectName();
        objName = mediaobjdts.mediaName;
        title = mediaobjdts.title;
        propertiesTab.setRequiredPropertiesForProfMedia(global.d2ProfDataSettings.inputData.MediaFormat);
        var IsInitialVersionVerified = documentListTab.verifyVersions(global.d2ProfDataSettings.inputData.InitialVersion);
        expect(IsInitialVersionVerified).to.be.true;
        expect(ArticleObjectName).to.equal(objName);
    });

    it('Should be able to save the article when all fields are entered the values', function () {
        mediaobjdts = propertiesTab.getMediaObjectName();
        objName = mediaobjdts.mediaName;
        title = mediaobjdts.title;
        propertiesTab.setAllPropertiesForProfMedia(global.d2ProfDataSettings.inputData.MediaFormat,inputdata,inputdata,inputdata,inputdata,inputdata,inputdata,
        inputdata,inputdata,333,444,111,222,inputdata,inputdata,inputdata,inputdata,inputdata);
        expect(ArticleObjectName).to.equal(objName);
    });
    
    it('Should be able to Checkout and checkin functionality on Generic Article Template', function(){
        documentListTab.checkoutObject(objName);
        var IsLocked = documentListTab.verifyLock(objName);
        expect(IsLocked).to.be.true;
        console.log("Test version1"+IsLocked);
        var IsInitialVersionVerified = documentListTab.verifyVersions(global.d2ProfDataSettings.inputData.InitialVersion);
        expect(IsInitialVersionVerified).to.be.true;
        console.log("Test version"+IsInitialVersionVerified);
        browser.pause(2000);
        documentListTab.checkinObject(objName);
        var IsCheckInVersionVerified = documentListTab.verifyVersions(global.d2ProfDataSettings.inputData.CheckedInVersion);
        expect(IsCheckInVersionVerified).to.be.true;
    });
    it('Should be able to cancel checkout the generic article', function(){
        browser.pause(2000);
        documentListTab.checkoutObject(objName);
        documentListTab.cancelCheckOutObject(objName);
    });

  it('Should be able to promote the Generic Article', function () {
        documentListTab.promoteAsset(objName);
    });

      it('Should be able to power promote the generic article', function () {
        browser.pause(2000);
        documentListTab.powerPromoteAsset(objName);
    });

    it('Should be able to expire the generic article', function () {
         browser.pause(2000);
        documentListTab.expireAsset(objName);
    });
    it('Should be able to delete the article',function(){
        browser.pause(5000);
        documentListTab.deleteArticle(objName,global.d2ProfDataSettings.inputData.DeleteAllversions);
        documentListTab.searchArticle(objName,d2ProfDataSettings.FRData.MediaName);
    });
    
     it('Should be able to update the existing article',function(){
        documentListTab.selectItemByNamePagination(d2ProfDataSettings.FRData.MediaName);
        mediaobjdts = propertiesTab.getMediaObjectName();
        objName = mediaobjdts.mediaName;
        title = mediaobjdts.title;
        propertiesTab.setRequiredPropertiesForProfMedia(global.d2ProfDataSettings.inputData.MediaFormat);
        expect(d2ProfDataSettings.FRData.MediaName).to.equal(objName);
    });

    it.skip('Should be able to publish the article at scheduled time',function(){
        browser.pause(2000);
       workspaceMenu.createMedia(global.d2ProfDataSettings.inputData.ProfileOtherName ,
            global.d2ProfDataSettings.inputData.MediaTemplate,
            ArticleObjectName1,
            title1
        );
        propertiesTab.setRequiredPropertiesForProfMedia(global.d2ProfDataSettings.inputData.MediaFormat);
        var schpublishtime  = moment.tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
        schpublishtime = moment(schpublishtime);
        schpublishtime=moment(schpublishtime, "DD MMM YYYY HH:mm:ss")
        .add(00, 'seconds')
        .add(05, 'minutes').format('DD MMM YYYY HH:mm:ss');
        expdate=moment(schpublishtime, "DD MMM YYYY HH:mm:ss")
        .add(00, 'seconds')
        .add(06, 'minutes').format('DD MMM YYYY HH:mm:ss'); 
        propertiesTab.setRequiredPropertiesforPublish(schpublishtime,expdate);
        documentListTab.schedulePublishAsset(title1);
        browser.pause(3000);
        var status=contentTab.contentHeaderGet();
        expect(status).to.contains("Approved");
        browser.pause(300000);
        browser.refresh();
        repositoryBrowserTab.openFolder(global.d2ProfDataSettings.FRData.testFolderPath);
        documentListTab.selectAsset(title1);
        expect(contentTab.contentHeaderGet()).to.contains("Active");
    });   

    it.skip('Should verify the article scheduled expire status',function(){
        
        browser.pause(540000);
        browser.refresh();
        repositoryBrowserTab.openFolder(global.d2ProfDataSettings.FRData.testFolderPath);
        documentListTab.selectAsset(title1);
        expect(contentTab.contentHeaderGet()).to.contains("Expire");
    });


});


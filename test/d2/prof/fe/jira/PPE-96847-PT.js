var functions = require('./../../common/functions/functions');
var Login = require('./../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../common/actions/documentListTab.actions');
var contentTab = require('./../../common/actions/contentTab.actions');
var propertiesTab = require('./../../common/actions/propertiesTab.actions');
var findTab = require('./../../common/actions/findTab.actions');
var randomstring = require("randomstring");
var pointerContent = require('./../../common/actions/pointer.actions');
var moment =require('moment-timezone');

describe('Professional Pointer - PPE-96847', function () {
    var AssetTitle;
    var AssetName;

    before(function () {
        Login.login({
            url: functions.getEnvTestUrl(),
            username: functions.getQAPublicationUser().username,
            password: functions.getQAPublicationUser().password
        });
        repositoryBrowserTab.openFolder(global.d2ProfDataSettings.inputData.testFolderPath_pt);
        AssetName = global.d2ProfDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        AssetTitle = global.d2ProfDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        workspaceMenu.createPointer(global.d2ProfDataSettings.inputData.ProfileOtherName_pt,
            global.d2ProfDataSettings.inputData.PointerTemplate,
            AssetName,
            AssetTitle
        );

        documentListTab.selectAsset(AssetName);

    });

    it('Verify Pointer creation with only mandatory fields- PPE-106397', function () {
        documentListTab.selectAsset(AssetTitle);

    });
    it('Verify the messages when mandatory fields are left blank for Pointer-PPE-106396', function () {
        documentListTab.selectAsset(AssetTitle);
        propertiesTab.verifyPointerProperties();

    });
    it('Verify the relation for the pointer asset- PPE-106456', function () {
        documentListTab.selectAsset(AssetTitle);
        documentListTab.verifyPointerRelation();

    });

    it('Verify Checkout and checkin functionality on Pointer Template-PPE-106405,Verify Pointer creation with all fields-PPE-106405', function () {
        contentTab.checkOut();
        pointerContent.contentFieldsPointer(AssetName)
        documentListTab.selectAsset(AssetTitle);
        var IsLocked = documentListTab.verifyLock(AssetName);
        expect(IsLocked).to.be.true;
        var IsInitialVersionVerified = documentListTab.verifyVersions(global.d2ProfDataSettings.inputData.InitialVersion);
        expect(IsInitialVersionVerified).to.be.true;
        contentTab.checkIn();
        var IsCheckInVersionVerified = documentListTab.verifyVersions(global.d2ProfDataSettings.inputData.CheckedInVersion);
        expect(IsCheckInVersionVerified).to.be.true;
    });

    it('Verify Promote functionality on Pointer Template-PPE-106400', function () {
        documentListTab.promoteAsset(AssetName);
    });

    it('Verify Demote functionality on Pointer Template PPE-106403 ', function () {
        documentListTab.demoteAsset(AssetName);
    });

    it('Verify Cancel Checkout functionality on Pointer Template PPE-106399 ', function () {
        contentTab.checkOut();
        contentTab.cancel();
    });

    it('Verify Power Promote functionality on Pointer Template PPE-106401', function () {
        documentListTab.powerPromoteAsset(AssetName);
    });

    it('Verify Expire functionality on Pointer Template PPE-106402', function () {
        documentListTab.expireAsset(AssetName);
    });

    it('Verify Delete functionality on Pointer PPE-106404 ', function () {
         documentListTab.selectAsset(AssetName);
         contentTab.checkOut();
         contentTab.checkIn();
        documentListTab.deleteArticle(AssetName, global.d2ProfDataSettings.inputData.DeleteAllversions);
        findTab.searchTextDeleteValidation(AssetName);
    });
    
    it.skip('Verify the data dictionary validations on Pointer  PPE-106408 ', function () {
        documentListTab.selectAsset(AssetTitle);
        pointerContent.propertiesFieldsValidation();
        pointerContent.contentHeaderValidationPointer();
    });
     it.skip('Verify editing of an existing Pointer PPE-106409', function () {
         findTab.searchText(global.d2ProfDataSettings.inputData.pointerExistingAsset);
         documentListTab.selectAsset(global.d2ProfDataSettings.inputData.pointerExistingAsset);
         //contentTab.checkOut();
         //contentTab.cancel();
         //contentTab.checkOut();
         propertiesTab.updatePointerProperties();
    });

});

describe.skip('Professional Pointer PPE-96847', function () {
    var AssetTitle;
    var AssetName;
    before(function () {

      //Removed relogin since using same session as above.

        browser.pause(5000);
        repositoryBrowserTab.openFolder(global.d2ProfDataSettings.inputData.testFolderPath_pt);
        AssetName = global.d2ProfDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        AssetTitle = global.d2ProfDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        workspaceMenu.createPointer(global.d2ProfDataSettings.inputData.ProfileOtherName_pt,
            global.d2ProfDataSettings.inputData.PointerTemplate,
            AssetName,
            AssetTitle
    );
        documentListTab.selectAsset(AssetTitle);


    });


    it('Verify Schedule Publish functionality on Pointer  PPE-106406',function(){
        browser.pause(5000);
        console.log("Last Test Case"+ AssetName);
        documentListTab.selectAsset(AssetName);
        var schpublishtime  = moment.tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
        schpublishtime = moment(schpublishtime);
        schpublishtime=moment(schpublishtime, "DD MMM YYYY HH:mm:ss")
        .add(00, 'seconds')
        .add(05, 'minutes').format('DD MMM YYYY HH:mm:ss');
        expdate=moment(schpublishtime, "DD MMM YYYY HH:mm:ss")
        .add(00, 'seconds')
        .add(06, 'minutes').format('DD MMM YYYY HH:mm:ss'); 
        propertiesTab.setRequiredPropertiesforPublish(schpublishtime,expdate);
        documentListTab.schedulePublishAsset(AssetName);
        browser.pause(3000);
        var status=contentTab.contentHeaderGet();
        expect(status).to.contains("Approved");
        browser.pause(300000);
        browser.refresh();
        repositoryBrowserTab.openFolder(global.d2ProfDataSettings.inputData.testFolderPath);
        documentListTab.selectAsset(AssetName);
        expect(contentTab.contentHeaderGet()).to.contains("Active");
    });
  it('Verify Schedule Expire functionality on Pointer PPE-106407',function(){
        browser.pause(540000);
        browser.refresh();
        repositoryBrowserTab.openFolder(global.d2ProfDataSettings.inputData.testFolderPath);
        documentListTab.selectAsset(AssetName);
        expect(contentTab.contentHeaderGet()).to.contains("Expire");
    });
});
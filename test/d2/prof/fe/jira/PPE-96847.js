var functions = require('./../../common/functions/functions');
var Login = require('./../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../common/actions/documentListTab.actions');
var contentTab = require('./../../common/actions/contentTab.actions');
var propertiesTab = require('./../../common/actions/propertiesTab.actions');
var randomstring = require("randomstring");

var otfTab = require('./../../common/actions/otfTab.actions');


describe('Professional Pointer :PPE-96847', function () {

    var AssetTitle;
    var AssetName;
    before(function () {
        Login.login({
        url: functions.getEnvTestUrl(),
        username: functions.getQAPublicationUser().username,
        password: functions.getQAPublicationUser().password
        });
        repositoryBrowserTab.openFolder(global.d2ProfDataSettings.inputData.testFolderPath);
         AssetName = global.d2ProfDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        AssetTitle = global.d2ProfDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        workspaceMenu.createPointer(global.d2ProfDataSettings.inputData.ProfileOtherName,
                    global.d2ProfDataSettings.inputData.PointerTemplate, 
                    AssetName, 
                    AssetTitle
                   );
                documentListTab.selectAsset(AssetTitle);
    });

    it('Should verify Pointer template creation with mandatory fields', function () {
        documentListTab.selectAsset(AssetTitle);
    });

    it('Verify Checkout and checkin functionality on Pointer Template', function () {
        contentTab.checkOut();
        documentListTab.selectAsset(AssetTitle);
         var IsLocked = documentListTab.verifyLock(AssetName);
         expect(IsLocked).to.be.true;
        var IsInitialVersionVerified = documentListTab.verifyVersions(global.d2ProfDataSettings.inputData.InitialVersion);
        expect(IsInitialVersionVerified).to.be.true;
        contentTab.checkIn();
        var IsCheckInVersionVerified = documentListTab.verifyVersions(global.d2ProfDataSettings.inputData.CheckedInVersion);
        expect(IsCheckInVersionVerified).to.be.true;
    });

     it('Verify Promote functionality on Pointer Template', function () {
        documentListTab.promoteAsset(AssetName);
    });

     it('Verify Demote functionality on Pointer Template', function () {
        documentListTab.demoteAsset(AssetName);
    });

    it('Verify Cancel Checkout functionality on Pointer Template', function(){
        contentTab.checkOut();
        contentTab.cancel();
    });

     it('Verify Power Promote functionality on Pointer Template', function () {
        documentListTab.powerPromoteAsset(AssetName);
    });

     it('Verify Expire functionality on Pointer Template', function () {
        documentListTab.expireAsset(AssetName);
    });

});



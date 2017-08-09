var functions = require('./../../../common/functions/functions');
var login = require('./../../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../../common/actions/workspace.menu.actions');
var auditTab = require('./../../../common/actions/audit.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
var findTab = require('./../../../common/actions/findTab.actions');
var randomstring = require("randomstring");

describe('Audit Widget: History - PPE-86661, D2 audit should reflect user actions, and not use dmadmin user -PPE-107138', function () {
    ;
    var AssetTitle;
    var AssetName;
    before(function () {
        login.loginWithNewWindow({
            url: functions.getEnvTestUrl(),
            username: functions.getQAPublicationUser().username,
            password: functions.getQAPublicationUser().password
        });
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.testFolderPath);
        AssetTitle = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        AssetName = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.ArticleProfileName,
            global.d2ConDataSettings.inputData.ArticleTemplate,
            AssetTitle,
            AssetName);
    });

    it('Verify there is Audit Widget- PPE-124424', function () {
        auditTab.auditWidget();
    });
    it('Verify categories in the Audit Widget- PPE-124425', function () {
        auditTab.categories();
    });
    it('Verify the events on the creation of Asset- PPE-124426', function () {
        auditTab.creationEvent();
    });
    it('Verify the events on providing the mandatory fields for an asset- PPE-124427', function () {
        propertiesTab.setRequiredProperties(AssetTitle, 'News', AssetTitle, AssetTitle, AssetTitle, AssetTitle, 'WebMD Medical News', '2015 WebMD', 'ADD-ADHD (Adult)');
        auditTab.mandatoryFieldsEvent('1.0');
    });
    it('Verify the events on content for Asset- PPE-124428,Verify the username for Checkout operation in D2 -PPE-124699,Verify the username for Checkin operation in D2 -PPE-124700', function () {
        auditTab.checkoutEvent();
        auditTab.checkinEvent('1.1');
    });
    it('Verify the events on Promote operation for an Asset- PPE-124429, Verify the username for promote operation in D2 -PPE-124701', function () {
        auditTab.promoteEvent(AssetTitle, '1.1');
    });
    it('Verify the events on demote operation for an Asset- PPE-124431,Verify the username for demote operation in D2- PPE-124702', function () {
        auditTab.demoteEvent(AssetTitle, '1.1');
    });
    it('Verify the events on power promote operation for an Asset- PPE-124430,Verify the username for power promote operation in D2 -PPE-124703', function () {
        auditTab.powerpromoteEvent(AssetTitle, '1.1');
    });
    it('Verify the events on Expire operation for an Asset- PPE-124433, Verify the username for expire operation in D2 - PPE-124704', function () {
        auditTab.expireEvent(AssetTitle, '1.1');
    });
    it('Verify the events on the existing Asset- PPE-124434,Verify the username for existing assets operation in D2 -PPE-124705 	', function () {
        findTab.findByChronicleId(global.d2ConDataSettings.inputData.auditExistingChronicleId);
        auditTab.existingAsset(global.d2ConDataSettings.inputData.auditExisitingAssetTitle);
    });

});
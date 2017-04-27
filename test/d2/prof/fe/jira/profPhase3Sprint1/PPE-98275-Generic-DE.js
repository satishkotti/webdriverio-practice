var functions = require('./../../../common/functions/functions');
var Login = require('./../../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../../common/actions/documentListTab.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
var otfTab = require('./../../../common/actions/otfTab.actions');
var otfMedia = require('./../../../common/actions/otfmedia.actions');


describe('OTF - ProfMedia Implementation - PPE-98275 - Generic Template ', function () {

    var objName;
    var Objectname = global.d2ProfDataSettings.inputData.GenericArticleObjectName;

    before(function () {
       Login.login({
            url: functions.getEnvTestUrl(),
            username: functions.getQAAdminEmedUser().username,
            password: functions.getQAAdminEmedUser().password
        });
        repositoryBrowserTab.openFolder(global.d2ProfDataSettings.inputData.testFolderPath_de);
         workspaceMenu.createContent(global.d2ProfDataSettings.inputData.ProfileName_de,
        global.d2ProfDataSettings.inputData.GenericTemplate, 
        Objectname, 
        global.d2ProfDataSettings.inputData.GenericContType);
        documentListTab.selectAsset(Objectname);
    });
    it('Should Verify the validations while adding the content for media grey out in OTF PPE-104658', function () {
        var cidName = propertiesTab.getObjectNameBasicTab();
        objName = cidName.objectName;
        documentListTab.selectAsset(Objectname);
        otfTab.selectOTFTab();
        otfTab.selectExternalWidget();
        otfMedia.otfOutputversionDefaultValidation();
        otfTab.verifymediaIsDisabled();
    });
    it('Should  Verify the validations while adding the content in OTF  PPE-104658', function () {
        otfTab.otfCreateOutputVersion();
        otfTab.selectExternalWidget();
        otfTab.otfCreateOutputVersion();
        otfTab.selectExternalWidget();
        otfTab.otfCreateMediaValidation(objName);
    });

    it('Should Verify the ability to create an ProfMedia object through OTF widget PPE-104630,Verify the Properties screen while creating an ProfMedia object PPE-104634, Should Verify the association of ProfMedia to parent article PPE-104646,should Verify the validations if multiple versions are available while creating media object PPE-107789 ', function () {
        otfTab.selectExternalWidget();
        otfTab.otfCreateMedia(objName);
        otfTab.otfMediaState(objName);
    });

    it('Should Verify the Data Dictionary validations on Prof Media  PPE-107783', function () {
        repositoryBrowserTab.openFolder(global.d2ProfDataSettings.DEData.mediaFolderPath);
        otfTab.otfSelectMedia(objName);
        otfTab.otfMediaFolder();
        otfMedia.mediaProperties();
});
});

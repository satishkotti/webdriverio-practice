var functions = require('./../../common/functions/functions');
var Login = require('./../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../common/actions/documentListTab.actions');
var propertiesTab = require('./../../common/actions/propertiesTab.actions');
var otfTab = require('./../../common/actions/otfTab.actions');
var randomstring = require("randomstring");


describe('OTF - Default Text Output Version - PPE-98897', function () {
    var AssetTitle;
    before(function () {
        
        Login.login({
        url: functions.getEnvTestUrl(),
        username: functions.getQAAdminEmedUser().username,
        password: functions.getQAAdminEmedUser().password
        });
        browser.pause(2000);
        repositoryBrowserTab.repositorybrowserRefresh();
        repositoryBrowserTab.openFolder(global.d2ProfDataSettings.inputData.testFolderPath_pt);
        AssetTitle = global.d2ProfDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        workspaceMenu.createContent(global.d2ProfDataSettings.inputData.ProfileName_pt,
                    global.d2ProfDataSettings.inputData.ArticleTemplate, 
                    AssetTitle, 
                    global.d2ProfDataSettings.inputData.ContentType
        );

    });

    it('Verify the ability to remove the default text object from OTF widget - PPE-104590,Verify the ability to re-add the default text object in OTF widget-PPE-104593', function () {
        documentListTab.selectAsset(AssetTitle);
        otfTab.selectOTFWidgetTab();
        otfTab.otfDefaultOutputversion();
    });
});



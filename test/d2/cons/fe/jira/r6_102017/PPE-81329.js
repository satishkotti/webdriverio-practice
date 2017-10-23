var functions = require('./../../../common/functions/functions');
var login = require('./../../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../../common/actions/documentListTab.actions');
var rmqClone = require('./../../../common/actions/rmqclone.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
var randomstring = require("randomstring");


describe('RMQ Template - Copy Question - PPE-81329 -US', function () {

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
            global.d2ConDataSettings.inputData.QUizAritcleTemplate,
            AssetTitle,
            AssetName);
    });

    it('Verify user is able to clone the Question node -PPE-134958,Verify user is having all the attributes for the cloned Question node- PPE-134959, Verify user is able to update the Question Text in the content tab - PPE-134969, Verify user is able to clone the Answer node-  PPE-134985,Verify the renditions for asset after the cloning Question node- PPE-134986', function () {
        documentListTab.selectAsset(AssetTitle);
        rmqClone.rmqclone(AssetTitle, 'Tool - RMQ', AssetTitle, AssetTitle, AssetTitle, AssetTitle, 'WebMD Health Tools',
            '2015 WebMD', 'ADD-ADHD (Adult)', '16 Oct 2017 19:08:00');
        

    });



});

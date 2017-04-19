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

 
describe('Professional - PublicationSubSection PPE-96857', function () {
    var AssetTitle;

    before(function () {
        Login.login({
        url: functions.getEnvTestUrl(),
        username: functions.getQAPublicationUser().username,
        password: functions.getQAPublicationUser().password
    });
        browser.pause(2000);
        repositoryBrowserTab.openFolder(global.d2ProfDataSettings.inputData.testFolderPath);
        AssetTitle = global.d2ProfDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        workspaceMenu.createPublicationSubsection(global.d2ProfDataSettings.inputData.publicationProfileName,
        global.d2ProfDataSettings.inputData.PublicationsubsectionTemplate, 
        AssetTitle
        );
        documentListTab.selectAsset(AssetTitle);
    });
    it('Verify Publication Subsection creation with only mandatory fields PPE-107726', function () {
        
        documentListTab.selectAsset(AssetTitle);
    });

});


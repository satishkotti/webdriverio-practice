var functions = require('./../../common/functions/functions');
var Login = require('./../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../common/actions/documentListTab.actions');
var contentTab = require('./../../common/actions/contentTab.actions');
var ckEditorMenu = require('./../../common/actions/ckEditor.actions.js');
var mModulePullQuote = require('./../../common/actions/mModulePullQuote.actions.js');

describe('mModule Pull Quote', function () {
    
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

        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.testFolderPath);
        workspaceMenu.createContent(
                global.d2ConDataSettings.inputData.ArticleProfileName,
                global.d2ConDataSettings.inputData.ArticleTemplate, 
                global.d2ConDataSettings.inputData.ArticleObjectName, 
                global.d2ConDataSettings.inputData.ArticleDescription);
        
        documentListTab.selectAsset(global.d2ConDataSettings.inputData.ArticleObjectName);
        contentTab.checkOut();
    });

    it('should select section text then add pull quote', function () {
        contentTab.sectionTextSetValue("sample test data");
        ckEditorMenu.sectionTextPullQuoteMenuClick();
        mModulePullQuote.addQuoteTextAttributeAlignInsert(global.d2ConDataSettings.inputData.PullQuoteText,
        global.d2ConDataSettings.inputData.PullQuoteAttribution, global.d2ConDataSettings.inputData.PullQuoteAlignLeft);
        contentTab.checkIn();
    });

});



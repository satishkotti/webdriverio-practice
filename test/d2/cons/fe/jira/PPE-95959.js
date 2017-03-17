var functions = require('./../../common/functions/functions');
var Login = require('./../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../common/actions/documentListTab.actions');
var contentTab = require('./../../common/actions/contentTab.actions');
var ckEditorMenu = require('./../../common/actions/ckEditor.actions.js');
var mModuleCodeOption = require('./../../common/actions/mModuleCode.actions.js');

describe('Interactive Article - JavaScript Module', function () {

    var isFailed = false;
    before(function () {        
        browser.setViewportSize({
            width: 1920,
            height: 1080
        });
    });

    beforeEach(function() {
        assert.equal(isFailed, false, 'Fail dependent test since prior test failed.');
    });

    afterEach(function() {
        if (this.currentTest.state === 'failed') {
             isFailed = false;
        }
    });

    it('Should log into D2 with QAPublication and Navigate to Test folder', function (){

        Login.login({
                url: functions.getEnvTestUrl(),
                username: functions.getQAPublicationUser().username,
                password: functions.getQAPublicationUser().password
            });
        
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.testFolderPath);
    });

    it('should create new article', function () {
          workspaceMenu.createContent(
                global.d2ConDataSettings.inputData.ArticleProfileName,
                global.d2ConDataSettings.inputData.ArticleTemplate, 
                global.d2ConDataSettings.inputData.ArticleObjectName, 
                global.d2ConDataSettings.inputData.ArticleDescription);
        
            documentListTab.selectAsset(global.d2ConDataSettings.inputData.ArticleObjectName);
    });
    
    it('should checkout article', function () {
        contentTab.checkOut();
    });

     it('should select Section Text then Select Code and Cancel', function () {
        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextCodeMenuClick();
        mModuleCodeOption.addCodeAndTypeCancel('Test', global.d2ConDataSettings.inputData.FacebookCodeType);
    });

    it('should select section text then Select Code and insert invalid JS', function () {
        contentTab.sectionTextSetValue("more sample test data");
        ckEditorMenu.sectionTextCodeMenuClick();
        mModuleCodeOption.addCodeAndTypeInsert('Test', global.d2ConDataSettings.inputData.FacebookCodeType);
    });
});
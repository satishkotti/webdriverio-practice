var functions = require('./../../common/functions/functions');
var Login = require('./../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../common/actions/documentListTab.actions');
var propertiesTab = require('./../../common/actions/propertiesTab.actions');
var otfTab = require('./../../common/actions/otfTab.actions');


describe('OTF Widget Verifications - PPE-91689', function () {
    before(function () {
        browser.windowHandleMaximize();  
        Login.login({
        url: functions.getEnvTestUrl(),
        username: functions.getQANewsUser().username,
        password: functions.getQANewsUser().password
        });
        repositoryBrowserTab.openFolder(global.d2ProfDataSettings.inputData.testFolderPath);
    });

    var  newsObjectname= global.d2ProfDataSettings.inputData.NewsArticleObjectName;
    var objectName=global.d2ProfDataSettings.inputData.ArticleObjectName;
    console.log("obj1" + newsObjectname);
    console.log("obj1" + objectName);
    it('Should verify the navigation and article creation functionality', function () {
        workspaceMenu.createContent(global.d2ProfDataSettings.inputData.ArticleProfileName,
                    global.d2ProfDataSettings.inputData.ArticleTemplate, 
                    newsObjectname, 
                    global.d2ProfDataSettings.inputData.ContentType);
        documentListTab.selectAsset(newsObjectname);
    });

     it('Should verify the OTF Widget existence', function () {
        otfTab.selectOTFTab();
    });

});



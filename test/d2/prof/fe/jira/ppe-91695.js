var functions = require('./../../common/functions/functions');
var Login = require('./../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../common/actions/documentListTab.actions');
var propertiesTab = require('./../../common/actions/propertiesTab.actions');
var otfTab = require('./../../common/actions/otfTab.actions');


describe('OTF Widget Verifications - PPE-91695', function () {
    before(function () {
        
        Login.login({
        url: functions.getEnvTestUrl(),
        username: functions.getQAPublicationUser().username,
        password: functions.getQAPublicationUser().password
        });
        repositoryBrowserTab.openFolder(global.d2ProfDataSettings.inputData.testFolderPath);
    });

    var objName;
    var  newsObjectname= global.d2ProfDataSettings.inputData.NewsArticleObjectName;

    it('Should verify the navigation and article creation functionality', function () {
        workspaceMenu.createContent(global.d2ProfDataSettings.inputData.ProfileName,
                    global.d2ProfDataSettings.inputData.ArticleTemplate, 
                    newsObjectname, 
                    global.d2ProfDataSettings.inputData.ContentType);
        documentListTab.selectAsset(newsObjectname);
    });

    it('Should verify if the OTF Widget is highlighted for the selected asset', function () {
        var cidName = propertiesTab.getObjectNameBasicTab();
        objName = cidName.objectName;
        documentListTab.selectAsset(newsObjectname);
        otfTab.selectOTFTab();
        otfTab.selectExternalWidget();
    });

    it('Should verify if the default Output version is displayed in OTF Widget for an Article', function () {
        otfTab.verifyOTFHeader();
        otfTab.verifyOTFValues(objName, newsObjectname);
        otfTab.verifyOTFOutputVersionValues();
    });

    it('Should verify if the OTF Widget is refreshed when a new Output Version is created for selected Article', function () {
        otfTab.verifyCreateOutputVersion(newsObjectname);
        otfTab.verifyNewOutputVersionData(newsObjectname);
    });
    
    it('Should verify the ability to create multiple Output Versions for selected Article through OTF', function () {
        otfTab.verifyMultipleOutputVersionCreation(newsObjectname);
        otfTab.verifySecondOutputVersionData(newsObjectname);
    });
});



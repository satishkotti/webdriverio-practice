var functions = require('./../../common/functions/functions');
var Login = require('./../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../common/actions/documentListTab.actions');
var propertiesTab = require('./../../common/actions/propertiesTab.actions');
var otfTab = require('./../../common/actions/otfTab.actions');


describe('OTF Widget Verifications - PPE-91689', function () {
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
        otfTab.selectOTFTab();
        otfTab.selectExternalWidget();
    });

    it('Should verify if the OTF Header is displayed as expected for the selected asset', function () {
        otfTab.verifyOTFHeader();
    });

    it('Should verify if the Asset values are displayed as expected under OTF Header', function () {
        otfTab.verifyOTFValues(objName, newsObjectname);
    });

    it('Should verify if the default Output version values are displayed as expected under Article', function () {
        otfTab.verifyOTFOutputVersionValues();
    });

    it('Should verify if new Output Version is created for selected Asset', function () {
        otfTab.verifyCreateOutputVersion(newsObjectname);
    });
    
    it('Should verify the data for new Output Version created for selected Asset', function () {
        otfTab.verifyNewOutputVersionData(newsObjectname);
    });
});



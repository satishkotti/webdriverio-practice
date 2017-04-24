var functions = require('./../../../common/functions/functions');
var Login = require('./../../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../../common/actions/documentListTab.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
var otfTab = require('./../../../common/actions/otfTab.actions');


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

    it.skip('Should verify if the default Output version is displayed in OTF Widget for an Article', function () {
        otfTab.verifyOTFHeader();
        otfTab.verifyOTFValues(objName, newsObjectname);
        otfTab.verifyOTFOutputVersionValues();
    });

    it('Create 2 output version', function () {
            otfTab.otfCreateOutputVersion();
            otfTab.selectExternalWidget();
            otfTab.otfCreateOutputVersion();
    });

    it.skip('Disable', function () {
            otfTab.verifymediaIsDisabled();
    });
  it('Create media validation ', function () {
            otfTab.selectExternalWidget();
            otfTab.otfCreateMediaValidation(objName);
  });

     it.skip('Create media', function () {
            otfTab.selectExternalWidget();
            otfTab.otfCreateMedia(objName);

            otfTab.otfMediaState(objName);
             repositoryBrowserTab.openFolder("webmd/professional_assets/medscape/media/output_version/media");
             otfTab.otfSelectMedia(objName);
        
            
    });
    
    it.skip('Should verify the ability to create multiple Output Versions for selected Article through OTF', function () {
        otfTab.verifyMultipleOutputVersionCreation(newsObjectname);
        otfTab.verifySecondOutputVersionData(newsObjectname);
    });
});



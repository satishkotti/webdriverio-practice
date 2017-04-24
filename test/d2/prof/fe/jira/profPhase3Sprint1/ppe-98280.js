var functions = require('./../../../common/functions/functions');
var Login = require('./../../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../../common/actions/documentListTab.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
var otfTab = require('./../../../common/actions/otfTab.actions');


describe('OTF Profoutput-Implementation- PPE-98280', function () {
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
    
    it('Should Verify the  create  OutPut version Parent Object/Object Types', function () {
        otfTab.verifyParentObjectIMP(objName);
        otfTab.verifyOutputVersionOutputtypeIMP(global.d2ProfDataSettings.otfData.OutputTypes);
    });
    
    it('Should Verify the remove/unlink validations on output version in OTF', function(){
        otfTab.selectOTFTab();
        otfTab.selectExternalWidget();
        otfTab.CreateOutputVersionIMP(global.d2ProfDataSettings.otfData.OutputTypeaudio);
        otfTab.DeleteOutputVersion();
    });

    it('Should Verify the ability to create an OutPut version object through OTF widget - PPE-104635', function () {
        otfTab.selectOTFTab();
        otfTab.selectExternalWidget();
        otfTab.CreateOutputVersionIMP(global.d2ProfDataSettings.otfData.OutputTypeaudio);
        otfTab.verifyNewOutputVersionData(objName+"-"+global.d2ProfDataSettings.otfData.OutputTypeaudio);
        browser.pause(5000);
        otfTab.CreateOutputVersionIMP(global.d2ProfDataSettings.otfData.OutputTypeaudio);
        otfTab.verifySecondOutputVersionData(objName+"-"+global.d2ProfDataSettings.otfData.OutputTypeaudio+"_"+"2");
    });
});



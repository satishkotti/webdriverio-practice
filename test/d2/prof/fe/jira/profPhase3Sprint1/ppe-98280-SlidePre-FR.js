var functions = require('./../../../common/functions/functions');
var Login = require('./../../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../../common/actions/documentListTab.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
var otfTab = require('./../../../common/actions/otfTab.actions');
var contentTab = require('./../../../common/actions/contentTab.actions');
var otfOutputVersion = require('./../../../common/actions/otfOutputVersion.action');


describe('OTF Profoutput-Implementation- PPE-98280', function () {
    before(function () {
        
        Login.login({
        url: functions.getEnvTestUrl(),
        username: functions.getQAAdminEmedUser().username,
        password: functions.getQAAdminEmedUser().password
        });
        repositoryBrowserTab.openFolder(global.d2ProfDataSettings.OFRData.testFolderPath);
    });

    var objName;
    var  newsObjectname= global.d2ProfDataSettings.OFRData.NewsArticleObjectName;
    

    it('Should verify the navigation and article creation functionality', function () {
        workspaceMenu.createContent(global.d2ProfDataSettings.OFRData.ProfileName,
                    global.d2ProfDataSettings.inputData.SlideArticleTemplate, 
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

    it('Should Verify the ability to create an OutPut version object through OTF widget - PPE-104635', function () {
        otfTab.selectOTFTab();
        otfTab.selectExternalWidget();
        otfTab.CreateOutputVersionIMP(global.d2ProfDataSettings.otfData.OutputTypeaudio);
        otfTab.verifyNewOutputVersionData(objName+"-"+global.d2ProfDataSettings.otfData.OutputTypeaudio);
        browser.pause(5000);
        otfTab.CreateOutputVersionIMP(global.d2ProfDataSettings.otfData.OutputTypeaudio);
        otfTab.verifySecondOutputVersionData(objName+"-"+global.d2ProfDataSettings.otfData.OutputTypeaudio+"_"+"2");
        otfTab.DeleteSecondOutputVersion(objName+"-"+global.d2ProfDataSettings.otfData.OutputTypeaudio+"_"+"2");
        otfTab.DeleteOutputVersion();
    });

    it('Should Verify the folder placement of created Output Version object', function(){
        browser.pause(2000);
        otfOutputVersion.MovetoframeParent();
        repositoryBrowserTab.openFolder(global.d2ProfDataSettings.otfData.OutputVersionPath);
        otfTab.SelectCreatedOutputVersion(objName+"-"+global.d2ProfDataSettings.otfData.OutputTypeaudio); 
        otfOutputVersion.MovetoframeParent();
        otfOutputVersion.OutputVersionProperties();
    });

    it.skip('Should Verify properties of OutPut version object through OTF widget', function () {
        otfTab.selectOTFTab();
        otfTab.selectExternalWidget();
        otfTab.CreateOutputVersionIMP(global.d2ProfDataSettings.otfData.OutputTypeaudio);
        otfTab.verifyNewOutputVersionData(objName+"-"+global.d2ProfDataSettings.otfData.OutputTypeaudio);
        browser.pause(2000);
        otfTab.otfCreateMedia(global.d2ProfDataSettings.otfData.OutputTypeaudio);
        browser.pause(2000);
        repositoryBrowserTab.openFolder('webmd/professional_assets/medscape/media/output_version');
        otfTab.SelectCreatedOutputVersion(objName+"-"+global.d2ProfDataSettings.otfData.OutputTypeaudio); 
        otfOutputVersion.MovetoframeParent();
        otfOutputVersion.FillOutputVersionProperties();
    });
    
});



var Promise = require('bluebird');
var JSONPath = require('JSONPath');
var parseXml = require('./../../../common/components/parseXml');
var functions = require('./../../../common/functions/functions');
var Login = require('./../../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../../common/actions/documentListTab.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
var contentTab = require('./../../../common/actions/contentTab.actions');
var otfTab = require('./../../../common/actions/otfTab.actions');
var moment = require('moment-timezone');
var Objectname= global.d2ProfDataSettings.DEData.ObjectName;

describe('Publication Section PPE-96852', function () {

     var cidName;
     var objName;
     var title;
     var cid;
    before(function () {
        browser.setViewportSize({
        width: 1920,
        height: 1080
        });   
        Login.login({
        url: functions.getEnvTestUrl(),
        username: functions.getQAAdminEmedUser().username,
        password: functions.getQAAdminEmedUser().password
    });
         repositoryBrowserTab.openFolder(global.d2ProfDataSettings.DEData.testFolderPath);
        workspaceMenu.createContent(global.d2ProfDataSettings.DEData.PublicationProfileName,
                    global.d2ProfDataSettings.inputData.PublicationSectionTemplate, 
                    Objectname, '');
        documentListTab.selectAsset(Objectname);
    });

    it('Should be able to Verify the messages when mandatory fields are left blank for Publication Section object', function () {
        var AlertMessage = propertiesTab.verifyMandatoryFieldsforPubSectionProp();
        propertiesTab.cancelEdit();
        expect(AlertMessage).to.be.true;
    });

    it('Should be able to creation Publication section with only mandatory fields', function () {
        cidName = propertiesTab.getChronicleIdAndName();
        objName = cidName.objectName;
        title = cidName.title;
        cid=cidName.chronicleId;
        propertiesTab.setRequiredPropertiesForPubSection(objName, title);
        documentListTab.selectAsset(Objectname);
        var IsInitialVersionVerified = documentListTab.verifyVersions(global.d2ProfDataSettings.inputData.InitialVersion);
        expect(IsInitialVersionVerified).to.be.true;
        expect(Objectname).to.equal(title);
        documentListTab.verifyPubSectionRelations();
        
    });
    
    searchArticle

    it('Should be able to delete the article',function(){
        documentListTab.selectAsset(title);
        browser.pause(3000);
        documentListTab.deleteArticle(cid,global.d2ProfDataSettings.inputData.DeleteAllversions);
        documentListTab.searchArticle(cid,title);
    });
    it('Should be able to update the existing article',function(){
        documentListTab.selectItemByNamePagination(d2ProfDataSettings.DEData.AssetName);
        cidName = propertiesTab.getChronicleIdAndName();
        objName = cidName.objectName;
        title = cidName.title;
        cid=cidName.chronicleId;
        propertiesTab.setRequiredPropertiesForPubSection(objName, title);
        contentTab.updateContent("Sample Text");
        expect(d2ProfDataSettings.DEData.AssetName).to.equal(title);
   });

});
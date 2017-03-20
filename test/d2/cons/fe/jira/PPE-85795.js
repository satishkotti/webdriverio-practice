var Promise = require('bluebird');
var JSONPath = require('JSONPath');
var parseXml = require('./../../common/components/parseXml');
var functions = require('./../../common/functions/functions');
var Login = require('./../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../common/actions/documentListTab.actions');
var contentTab = require('./../../common/actions/contentTab.actions');
var ckEditorMenu = require('./../../common/actions/ckEditor.actions');
var mModuleCodeOption = require('./../../common/actions/mModuleCode.actions');
var propertiesTab = require('./../../common/actions/propertiesTab.actions');

describe('Interactive Article - BulletList Module', function () {

    var chronicleId;
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

    it('should select Section Text then Select Code and Cancel', function () {
        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextCodeMenuClick();
        mModuleCodeOption.addCodeAndTypeCancel('Test', global.d2ConDataSettings.inputData.FacebookCodeType);
    });

    it('should select Section Text then Select Code and Insert 5000 characters for JS Module & Type Facebook', function () {
        contentTab.sectionTextSetValue("more sample test data");
        ckEditorMenu.sectionTextCodeMenuClick();
        mModuleCodeOption.addCodeAndTypeInsert(jsCodeValue, 
                    global.d2ConDataSettings.inputData.FacebookCodeType);        
        contentTab.checkIn();

        var cidName = propertiesTab.getChronicleIdAndName();
        var objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        propertiesTab.setRequiredProperties(objName,'ZZ - Dummy Content Classification',objName,objName,objName,objName,'No URL dummy publication','2015 WebMD','Cold and Flu')
        
        documentListTab.assetPowerPromotePublishToStaging(global.d2ConDataSettings.inputData.ArticleObjectName);
    });

    it('should be part of scs rendition', function () {
         return Promise.resolve(
            parseXml.getXmlFromUrl(functions.getAtsScsFileUrl()+chronicleId, null).then(function (result) {

                var expectedJsCode = ' '+jsCodeValue;
                var jsEmbedAssets = JSONPath({json: result,  path: "$..section_text.embeded_module[?(@.type =='jsembed')]", resultType: 'all' });

                expect(jsEmbedAssets.length).to.equal(1);
                expect(jsEmbedAssets[0].parent.$.jstype).to.equal('facebook');
                expect(jsEmbedAssets[0].parent.$.align).to.equal('');
                expect(jsEmbedAssets[0].parent.$.asset_description).to.equal('');
                expect(jsEmbedAssets[0].parent.$.asset_title).to.equal('');
                expect(jsEmbedAssets[0].parent.$.chronic_id).to.equal('');
                expect(jsEmbedAssets[0].parent.$.class).to.equal('wbmdembededmodule cke_widget_inline');
                expect(jsEmbedAssets[0].parent.$.module_title).to.equal('');
                expect(jsEmbedAssets[0].parent.$.thumbnail).to.equal('');
                
                var jsBlobVal = JSONPath({json: result,  path: "$..section_text.embeded_module.jsblob" });
                expect(jsEmbedAssets.length).to.equal(1);
                expect(jsBlobVal[0]).to.equal(expectedJsCode);
        }));        
    });
});
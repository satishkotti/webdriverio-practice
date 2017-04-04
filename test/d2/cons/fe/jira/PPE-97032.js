var Promise = require('bluebird');
var JSONPath = require('JSONPath');
var parseXml = require('./../../common/components/parseXml');
var functions = require('./../../common/functions/functions');
var login = require('./../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../common/actions/documentListTab.actions');
var contentTab = require('./../../common/actions/contentTab.actions');
var ckEditorMenu = require('./../../common/actions/ckEditor.actions');
var propertiesTab = require('./../../common/actions/propertiesTab.actions');
var moduleFeatureAction = require('./../../common/actions/moduleFeature.actions'); 

describe('Interactive Article - Feature Template', function () {

    var chronicleId;
    var jsCodeValue;
    before(function () {        
        browser.windowHandleMaximize();
        login.login({
                url: functions.getEnvTestUrl(),
                username: functions.getQAPublicationUser().username,
                password: functions.getQAPublicationUser().password
            });
        
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.testFolderPath);
        workspaceMenu.createContent(
                global.d2ConDataSettings.inputData.ArticleProfileName,
                global.d2ConDataSettings.featureTemplate.articleFeatureTemplate, 
                global.d2ConDataSettings.inputData.ArticleObjectName, 
                global.d2ConDataSettings.inputData.ArticleDescription);
        
        documentListTab.selectAsset(global.d2ConDataSettings.inputData.ArticleObjectName);
        contentTab.checkOut();
  });

    it('should verify the clicking cancel button does not insert image module - PPE-100937', function () {
        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleFeatureAction.cancelImageModuleFeature(global.d2ConDataSettings.featureTemplate.featureModuleTitle, global.d2ConDataSettings.featureTemplate.featureAssetTitle, global.d2ConDataSettings.featureTemplate.featureAssetDescription, global.d2ConDataSettings.featureTemplate.alignLeft);
    });

    it('should verify the feature template labels, values, insert image module for feature template and checkin - PPE-100937', function () {
        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleFeatureAction.insertImageModuleFeature(global.d2ConDataSettings.featureTemplate.featureModuleTitle, global.d2ConDataSettings.featureTemplate.featureAssetTitle, global.d2ConDataSettings.featureTemplate.featureAssetDescription, global.d2ConDataSettings.featureTemplate.alignLeft);
        contentTab.checkIn();
        var cidName = propertiesTab.getChronicleIdAndName();
        var objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        propertiesTab.setRequiredProperties(objName,global.d2ConDataSettings.featureTemplate.contentClassification,objName,objName,objName,objName,global.d2ConDataSettings.featureTemplate.publication,global.d2ConDataSettings.featureTemplate.copyright,global.d2ConDataSettings.featureTemplate.primaryTopicId);
        
        documentListTab.assetPowerPromotePublishToStaging(global.d2ConDataSettings.inputData.ArticleObjectName);
        
        return Promise.resolve(
            parseXml.getXmlFromUrl(functions.getAtsScsFileUrl()+chronicleId, null).then(function (result) {
                var jsEmbedAssets = JSONPath({json: result,  path: "$..section_text.embeded_module[?(@.type =='image')]", resultType: 'all' });
                expect(jsEmbedAssets[0].parent.$.align).to.equal(global.d2ConDataSettings.featureTemplate.alignLeft.toLowerCase());
                expect(jsEmbedAssets[0].parent.$.class).to.equal(global.d2ConDataSettings.featureTemplate.expectedClass);
                expect(jsEmbedAssets[0].parent.$.module_title).to.equal(global.d2ConDataSettings.featureTemplate.featureModuleTitle);
                expect(jsEmbedAssets[0].parent.$.asset_title).to.equal(global.d2ConDataSettings.featureTemplate.featureAssetTitle);
                expect(jsEmbedAssets[0].parent.$.asset_description).to.equal(global.d2ConDataSettings.featureTemplate.featureAssetDescription);
                expect(jsEmbedAssets[0].parent.$.suppress_share).to.equal('true');
                expect(jsEmbedAssets.length).to.equal(1);
        }));
    });
 
});
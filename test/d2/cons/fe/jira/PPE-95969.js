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
var mModuleShareableFact = require('./../../common/actions/mModuleShareableFact.actions');
var propertiesTab = require('./../../common/actions/propertiesTab.actions');

describe('Interactive Article - Shareable Fact Module', function () {

    var chronicleId;

    before(function () {

        browser.windowHandleMaximize();

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

    it('should select Section Text then insert Shareable Fact information', function () {
        contentTab.sectionTextSetValue("sample test data");
        ckEditorMenu.sectionTextmModuleSelectModuleClick('Shareable Fact');
        mModuleShareableFact.InsertTitleDescriptionAlignAnSupressSocialShare(
            global.d2ConDataSettings.inputData.ShareableTitle,
           global.d2ConDataSettings.inputData.ShareableDescription,
            global.d2ConDataSettings.inputData.ShareableAlign,
           global.d2ConDataSettings.inputData.ShareableSupressSocialShare);

        contentTab.checkIn();

        var cidName = propertiesTab.getChronicleIdAndName();
        var objName = cidName.objectName;
        chronicleId = cidName.chronicleId;

        propertiesTab.setRequiredProperties(objName, 'ZZ - Dummy Content Classification', objName, objName, objName, objName, 'No URL dummy publication', '2015 WebMD', 'Cold and Flu')
        documentListTab.assetPowerPromotePublishToStaging(objName);
    });

    it.skip('should be part of scs rendition', function () {
        return Promise.resolve(
            parseXml.getXmlFromUrl(functions.getAtsScsFileUrl() + chronicleId, null).then(function (result) {

                /*
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
                */
            }));
    });
});
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
var contentTabui = require('./../../common/ui/contentTab');

describe('Interactive Article - Shareable Fact Module', function () {

    var chronicleId;

    before(function () {
        Login.login({
            url: functions.getEnvTestUrl(),
            username: functions.getQAPublicationUser().username,
            password: functions.getQAPublicationUser().password
        });

        browser.pause(10000);
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.testFolderPath);
        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.ArticleProfileName,
            global.d2ConDataSettings.inputData.ArticleTemplate,
            global.d2ConDataSettings.inputData.ArticleObjectName,
            global.d2ConDataSettings.inputData.ArticleDescription);

        documentListTab.selectAsset(global.d2ConDataSettings.inputData.ArticleObjectName);
        contentTab.checkOut();
    });

    it('Verify the field availability in the shareable fact module & user is able to pass the text to Title and Description fields', function () {
        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextmModuleSelectModuleClick('Shareable Fact');
        mModuleShareableFact.CancelTitleDescriptionAlignAnSupressSocialShare(global.d2ConDataSettings.inputData.ShareableTitle,
            global.d2ConDataSettings.inputData.ShareableDescription,
            global.d2ConDataSettings.inputData.ShareableAlign,
            global.d2ConDataSettings.inputData.ShareableSupressSocialShare);
    });

    it('Verify the user is able to see the default value for the Title field', function () {
        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextmModuleSelectModuleClick('Shareable Fact');
        mModuleShareableFact.verifyTitleDescriptionAlignSocialSS("",
            global.d2ConDataSettings.inputData.ShareableDescription,
            global.d2ConDataSettings.inputData.ShareableAlign,
            global.d2ConDataSettings.inputData.ShareableSupressSocialShare);
    });

    it('should select Section Text then insert Shareable Fact information and verify scs rendition', function () {
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

        browser.call(function () {
            return Promise.resolve(
                parseXml.getXmlFromUrl(functions.getAtsScsFileUrl() + chronicleId, null).then(function (result) {
                    var style = 'float:' + global.d2ConDataSettings.inputData.ShareableAlign.toLowerCase() + ';';
                    var jsEmbedAssets = JSONPath({
                        json: result,
                        path: "$..section_text.embeded_module[?(@.type =='sharefact')]",
                        resultType: 'all'
                    });

                    expect(jsEmbedAssets.length).to.equal(1);
                    expect(jsEmbedAssets[0].parent.$.align).to.equal(global.d2ConDataSettings.inputData.ShareableAlign.toLowerCase());
                    expect(jsEmbedAssets[0].parent.$.module_description).to.equal(global.d2ConDataSettings.inputData.ShareableDescription);
                    expect(jsEmbedAssets[0].parent.$.module_title).to.equal(global.d2ConDataSettings.inputData.ShareableTitle);
                    expect(jsEmbedAssets[0].parent.$.style).to.equal(style);
                    expect(jsEmbedAssets[0].parent.$.class).to.equal('wbmdembededmodule cke_widget_inline');
                    expect(jsEmbedAssets[0].parent.$.suppress_share).to.equal(global.d2ConDataSettings.inputData.ShareableSupressSocialShare);
                }));
        });
    });
});
var Promise = require('bluebird');
var functions = require('./../../common/functions/functions');
var login = require('./../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../common/actions/documentListTab.actions');
var contentTab = require('./../../common/actions/contentTab.actions');
var ckEditorMenu = require('./../../common/actions/ckEditor.actions.js');
var mModulePullQuote = require('./../../common/actions/mModulePullQuote.actions.js');
var propertiesTab = require('./../../common/actions/propertiesTab.actions');
var documentListTab = require('./../../common/actions/documentListTab.actions');
var JSONPath = require('JSONPath');
var parseXml = require('./../../common/components/parseXml');

describe('mModule Pull Quote - PPE-85829', function () {
    var chronicleId;

    before(function () {

        login.login({
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

    it('should verify that clicking cancel button does not insert pull quote - PPE-100929', function () {
        contentTab.sectionTextSetValue("sample test data");
        ckEditorMenu.sectionTextmModuleSelectModuleClick(global.d2ConDataSettings.pullQuote.menuOptionText);
        mModulePullQuote.addQuoteTextAttributeAlignCancel(global.d2ConDataSettings.pullQuote.text,
            global.d2ConDataSettings.pullQuote.attribution, global.d2ConDataSettings.pullQuote.alignLeft);
    });

    it('should insert add pull quote for Select Text then Power promote and publish to staging - PPE-100929', function () {
        contentTab.sectionTextSetValue("sample test data");
        ckEditorMenu.sectionTextmModuleSelectModuleClick(global.d2ConDataSettings.pullQuote.menuOptionText);
        mModulePullQuote.addQuoteTextAttributeAlignInsert(global.d2ConDataSettings.pullQuote.text, global.d2ConDataSettings.pullQuote.attribution, global.d2ConDataSettings.pullQuote.alignLeft);

        contentTab.checkIn();

        var cidName = propertiesTab.getChronicleIdAndName();
        var objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        propertiesTab.setRequiredProperties(objName, global.d2ConDataSettings.pullQuote.contentClassification, objName, objName, objName, objName, global.d2ConDataSettings.pullQuote.publication, global.d2ConDataSettings.pullQuote.copyright, global.d2ConDataSettings.pullQuote.primaryTopicId)

        documentListTab.assetPowerPromotePublishToStaging(objName);

        browser.call(function () {
            return Promise.resolve(
                parseXml.getXmlFromUrl(functions.getAtsScsFileUrl() + chronicleId, null).then(function (result) {
                    var jsEmbedAssets = JSONPath({
                        json: result,
                        path: "$..section_text.embeded_module[?(@.type =='pullquote')]",
                        resultType: 'all'
                    });
                    expect(jsEmbedAssets[0].parent.$.align).to.equal(global.d2ConDataSettings.pullQuote.alignLeft.toLowerCase());
                    expect(jsEmbedAssets[0].parent.$.class).to.equal(global.d2ConDataSettings.pullQuote.expectedClass);
                    expect(jsEmbedAssets[0].parent.$.module_description).to.equal(global.d2ConDataSettings.pullQuote.attribution);
                    expect(jsEmbedAssets[0].parent.$.module_title).to.equal(global.d2ConDataSettings.pullQuote.text);
                    expect(jsEmbedAssets.length).to.equal(1);
                }));
        });
    });
});
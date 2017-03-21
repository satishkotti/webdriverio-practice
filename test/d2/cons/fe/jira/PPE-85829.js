var Promise = require('bluebird');
var functions = require('./../../common/functions/functions');
var Login = require('./../../common/actions/login.actions');
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

describe('mModule Pull Quote', function () {
    var chronicleId;
    var jsCodeValue;

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
        jsCodeValue = 'sample test data';
    });

    it('should verify that clicking cancel button does not insert pull quote', function () {
        contentTab.sectionTextSetValue("sample test data");
        ckEditorMenu.sectionTextPullQuoteMenuClick();
        mModulePullQuote.addQuoteTextAttributeAlignCancel(global.d2ConDataSettings.inputData.PullQuoteText,
        global.d2ConDataSettings.inputData.PullQuoteAttribution, global.d2ConDataSettings.inputData.PullQuoteAlignLeft);
    });

    it('should select section text then add pull quote', function () {
        contentTab.sectionTextSetValue("sample test data");
        ckEditorMenu.sectionTextPullQuoteMenuClick();
        mModulePullQuote.addQuoteTextAttributeAlignInsert(global.d2ConDataSettings.inputData.PullQuoteText,
        global.d2ConDataSettings.inputData.PullQuoteAttribution, global.d2ConDataSettings.inputData.PullQuoteAlignLeft);
        contentTab.checkIn();
        
    });

    it('should promote and publish', function () {
        var cidName = propertiesTab.getChronicleIdAndName();
        var objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        propertiesTab.setRequiredProperties(objName,'ZZ - Dummy Content Classification',objName,objName,objName,objName,'No URL dummy publication','2015 WebMD','Cold and Flu')
        documentListTab.assetPowerPromotePublishToStaging(global.d2ConDataSettings.inputData.ArticleObjectName);
    });

        // it('should select section text then update pull quote', function () {
        // browser.doubleClick(".widgetToDelete");
        // mModulePullQuote.addQuoteTextAttributeAlignInsert('test1',
        // 'test2', 'global.d2ConDataSettings.inputData.PullQuoteAlignLeft');
        // contentTab.checkIn();
        // });
    it('should be part of scs rendition', function () {
         return Promise.resolve(
            parseXml.getXmlFromUrl(functions.getAtsScsFileUrl()+chronicleId, null).then(function (result) {
                var expectedJsCode = ' '+jsCodeValue;
                var jsEmbedAssets = JSONPath({json: result,  path: "$..section_text.embeded_module[?(@.type =='pullquote')]", resultType: 'all' });
                expect(jsEmbedAssets[0].parent.$.align).to.equal('left');
                expect(jsEmbedAssets[0].parent.$.class).to.equal('wbmdembededmodule cke_widget_inline');
                expect(jsEmbedAssets[0].parent.$.module_description).to.equal('QA Pull Quote Attribution');
                expect(jsEmbedAssets[0].parent.$.module_title).to.equal('QA Pull Quote Text');
                expect(jsEmbedAssets.length).to.equal(1);
                //expect(jsEmbedAssets.length).to.equal(1);
                //expect(jsEmbedAssets[0].parent.$.asset_description).to.equal('undefined');
                //expect(jsEmbedAssets[0].parent.$.asset_title).to.equal('undefined');
                //expect(jsEmbedAssets[0].parent.$.chronic_id).to.equal('undefined');
                //expect(jsEmbedAssets[0].parent.$.thumbnail).to.equal('undefined');
                //var jsBlobVal = JSONPath({json: result,  path: "$..section_text.embeded_module.jsblob" });
                //expect(jsBlobVal[0]).to.equal(expectedJsCode);
        }));  
    });

});



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
var mModuleCodeOption = require('./../../common/actions/mModuleCode.actions');
var propertiesTab = require('./../../common/actions/propertiesTab.actions');
var moduleOption = require('./../../common/actions/Module.actions');
var randomstring = require("randomstring");

describe('Interactive Article - Cleanup Module- US Feature Article', function () {

    var chronicleId;
    var AssetTitle;
    var AssetName;
    before(function () {

        login.loginWithNewWindow({
            url: functions.getEnvTestUrl(),
            username: functions.getQAPublicationUser().username,
            password: functions.getQAPublicationUser().password
        });
    });

    after(function () {
        browser.refresh();
        login.logoutCloseWindow();
    });

    beforeEach(function () {

        browser.refresh();
        browser.pause(10000);
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.testFolderPath);
        AssetTitle = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        AssetName = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);

        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.ArticleProfileName,
            global.d2ConDataSettings.inputData.FeatureTemplate,
            AssetTitle,
            AssetName)

        documentListTab.selectAsset(AssetTitle);
        contentTab.checkOut();
    });

    it('Verify the presence of checkbox and Social Media Share name for Image, Video, Slideshow module - US Feature Article', function () {
        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.selectModuleTypeSearchText('Image', 'heart');
        //moduleOption.verifySocialSharing();
        moduleOption.verifySocialSharingExists();
        moduleOption.moduleCancel();

        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.selectModuleTypeSearchText('Video', 'heart');
        moduleOption.verifySocialSharingNotExists();
        moduleOption.moduleCancel();

        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.selectModuleTypeSearchText('Slideshow', 'heart');
        moduleOption.verifySocialSharingNotExists();
        moduleOption.moduleCancel();

        contentTab.checkIn();

    });

    it(' Verify the XML attributes after inserting the Video module - US Feature Article ', function () {

        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.selectModuleTypeSearchText('Video', 'heart');
        moduleOption.verifyModuleSizeField();
        moduleOption.moduleCancel();

        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.selectModuleTypeSearchText('Video', 'heart');
        moduleOption.setTitleAndInsert('QA');

        contentTab.checkIn();

        var cidName = propertiesTab.getChronicleIdAndName();
        var objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        propertiesTab.setRequiredProperties(objName, 'News', objName, objName, objName, objName, 'WebMD Medical News', '2015 WebMD', 'ADD-ADHD (Adult)');
        documentListTab.assetPowerPromotePublishToStaging(AssetTitle);

        browser.call(function () {
            return Promise.resolve(
                parseXml.getXmlFromUrl(functions.getAtsScsFileUrl() + chronicleId, null).then(function (result) {

                    var moduleSizeAtt = JSONPath({
                        json: result,
                          path: "$..section_text.embeded_module[?(@.module_size)]",
                        resultType: 'all'
                    });
                    expect(moduleSizeAtt.length).to.equal(0);

                    var shareSocialAtt = JSONPath({
                        json: result,
                          path: "$..section_text.embeded_module[?(@.suppress_share)]",
                        resultType: 'all'
                    });
                    expect(shareSocialAtt.length).to.equal(0);
                }));
        });
    });

    it(' Verify the XML attributes after inserting the Slideshow module - US ', function () {

        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.selectModuleTypeSearchText('Slideshow', 'heart');
        moduleOption.verifyModuleSizeField();
        moduleOption.moduleCancel();

        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.selectModuleTypeSearchText('Slideshow', 'heart');
        moduleOption.setTitleAndInsert('QA');

        contentTab.checkIn();

        var cidName = propertiesTab.getChronicleIdAndName();
        var objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        propertiesTab.setRequiredProperties(objName, 'News', objName, objName, objName, objName, 'WebMD Medical News', '2015 WebMD', 'ADD-ADHD (Adult)')
        documentListTab.assetPowerPromotePublishToStaging(AssetTitle);

        browser.call(function () {
            return Promise.resolve(
                parseXml.getXmlFromUrl(functions.getAtsScsFileUrl() + chronicleId, null).then(function (result) {

                    var moduleSizeAtt = JSONPath({
                        json: result,
                          path: "$..section_text.embeded_module[?(@.module_size)]",
                        resultType: 'all'
                    });
                    expect(moduleSizeAtt.length).to.equal(0);

                    var shareSocialAtt = JSONPath({
                        json: result,
                          path: "$..section_text.embeded_module[?(@.suppress_share)]",
                        resultType: 'all'
                    });
                    expect(shareSocialAtt.length).to.equal(0);
                }));
        });

    });

    it('Verify the XML attributes after inserting the image module - US Feature Article', function () {

        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.selectModuleTypeSearchText('Image', 'heart');
        moduleOption.verifyModuleSizeField();
        moduleOption.moduleCancel();

        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.selectModuleTypeSearchText('Image', 'heart');
        moduleOption.setTitleAndInsert('QA');

        contentTab.checkIn();

        var cidName = propertiesTab.getChronicleIdAndName();
        var objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        propertiesTab.setRequiredProperties(objName, 'News', objName, objName, objName, objName, 'WebMD Medical News', '2015 WebMD', 'ADD-ADHD (Adult)');
        documentListTab.assetPowerPromotePublishToStaging(AssetTitle);

        browser.call(function () {
            return Promise.resolve(
                parseXml.getXmlFromUrl(functions.getAtsScsFileUrl() + chronicleId, null).then(function (result) {

                    var jsEmbedAssets = JSONPath({
                        json: result,
                        path: "$..section_text.embeded_module[?(@.class =='wbmdembededmodule cke_widget_inline')]",
                        resultType: 'all'
                    });

                    expect(jsEmbedAssets[0].parent.$.suppress_share).to.equal('false');

                    var moduleSizeAtt = JSONPath({
                        json: result,
                          path: "$..section_text.embeded_module[?(@.module_size)]",
                        resultType: 'all'
                    });
                    expect(moduleSizeAtt.length).to.equal(0);
                }));
        });
    });
});

describe('Interactive Article - Cleanup Module - US Health Reference Article', function () {

    var chronicleId;
    var AssetTitle;
    var AssetName;
    before(function () {
        login.loginWithNewWindow({
            url: functions.getEnvTestUrl(),
            username: functions.getQAPublicationUser().username,
            password: functions.getQAPublicationUser().password
        });
    });

    after(function () {
        browser.refresh();
        login.logoutCloseWindow();
    });

    beforeEach(function () {

        browser.refresh();
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.testFolderPath);
        AssetTitle = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        AssetName = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);

        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.ArticleProfileName,
            global.d2ConDataSettings.inputData.HealthRefTemplate,
            AssetTitle,
            AssetName)

        documentListTab.selectAsset(AssetTitle);
        contentTab.checkOut();
    });

    it('Verify the presence of checkbox and Social Media Share name for Image, Video, Slideshow module - US Health Reference Article', function () {
        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.selectModuleTypeSearchText('Image', 'heart');
        moduleOption.verifySocialSharingExists();
        moduleOption.moduleCancel();

        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.selectModuleTypeSearchText('Video', 'heart');
        moduleOption.verifySocialSharingNotExists();
        moduleOption.moduleCancel();

        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.selectModuleTypeSearchText('Slideshow', 'heart');
        moduleOption.verifySocialSharingNotExists();
        moduleOption.moduleCancel();

        contentTab.checkIn();

    });

    it(' Verify the XML attributes after inserting the Video module - US Health Reference Article', function () {

        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.selectModuleTypeSearchText('Video', 'heart');
        moduleOption.verifyModuleSizeField();
        moduleOption.moduleCancel();

        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.selectModuleTypeSearchText('Video', 'heart');
        moduleOption.setTitleAndInsert('QA');

        contentTab.checkIn();

        var cidName = propertiesTab.getChronicleIdAndName();
        var objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        propertiesTab.setRequiredProperties(objName, 'News', objName, objName, objName, objName, 'WebMD Medical News', '2015 WebMD', 'ADD-ADHD (Adult)');
        documentListTab.assetPowerPromotePublishToStaging(AssetTitle);

        browser.call(function () {
            return Promise.resolve(
                parseXml.getXmlFromUrl(functions.getAtsScsFileUrl() + chronicleId, null).then(function (result) {

                    var moduleSizeAtt = JSONPath({
                        json: result,
                          path: "$..section_text.embeded_module[?(@.module_size)]",
                        resultType: 'all'
                    });
                    expect(moduleSizeAtt.length).to.equal(0);

                    var shareSocialAtt = JSONPath({
                        json: result,
                          path: "$..section_text.embeded_module[?(@.suppress_share)]",
                        resultType: 'all'
                    });
                    expect(shareSocialAtt.length).to.equal(0);
                }));
        });

    });

    it(' Verify the XML attributes after inserting the Slideshow module - US Health Reference Article ', function () {

        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.selectModuleTypeSearchText('Slideshow', 'heart');
        moduleOption.verifyModuleSizeField();
        moduleOption.moduleCancel();

        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.selectModuleTypeSearchText('Slideshow', 'heart');
        moduleOption.setTitleAndInsert('QA');

        contentTab.checkIn();

        var cidName = propertiesTab.getChronicleIdAndName();
        var objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        propertiesTab.setRequiredProperties(objName, 'News', objName, objName, objName, objName, 'WebMD Medical News', '2015 WebMD', 'ADD-ADHD (Adult)')
        documentListTab.assetPowerPromotePublishToStaging(AssetTitle);

        browser.call(function () {
            return Promise.resolve(
                parseXml.getXmlFromUrl(functions.getAtsScsFileUrl() + chronicleId, null).then(function (result) {

                    var moduleSizeAtt = JSONPath({
                        json: result,
                          path: "$..section_text.embeded_module[?(@.module_size)]",
                        resultType: 'all'
                    });
                    expect(moduleSizeAtt.length).to.equal(0);

                    var shareSocialAtt = JSONPath({
                        json: result,
                          path: "$..section_text.embeded_module[?(@.suppress_share)]",
                        resultType: 'all'
                    });
                    expect(shareSocialAtt.length).to.equal(0);
                }));
        });
    });

    it('Verify the XML attributes after inserting the image module - US Health Reference Article', function () {

        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.selectModuleTypeSearchText('Image', 'heart');
        moduleOption.verifyModuleSizeField();
        moduleOption.moduleCancel();

        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.selectModuleTypeSearchText('Image', 'heart');
        moduleOption.setTitleAndInsert('QA');
        contentTab.checkIn();

        var cidName = propertiesTab.getChronicleIdAndName();
        var objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        propertiesTab.setRequiredProperties(objName, 'News', objName, objName, objName, objName, 'WebMD Medical News', '2015 WebMD', 'ADD-ADHD (Adult)');
        documentListTab.assetPowerPromotePublishToStaging(AssetTitle);

        browser.call(function () {});
        return Promise.resolve(
            parseXml.getXmlFromUrl(functions.getAtsScsFileUrl() + chronicleId, null).then(function (result) {

                var jsEmbedAssets = JSONPath({
                    json: result,
                    path: "$..section_text.embeded_module[?(@.class =='wbmdembededmodule cke_widget_inline')]",
                    resultType: 'all'
                });

                expect(jsEmbedAssets[0].parent.$.suppress_share).to.equal('false');

                var moduleSizeAtt = JSONPath({
                    json: result,
                      path: "$..section_text.embeded_module[?(@.module_size)]",
                    resultType: 'all'
                });
                expect(moduleSizeAtt.length).to.equal(0);
            }));
    });
});

describe('Interactive Article - Cleanup Module- US News Article', function () {

    var chronicleId;
    var AssetTitle;
    var AssetName;
    before(function () {

        login.loginWithNewWindow({
            url: functions.getEnvTestUrl(),
            username: functions.getQAPublicationUser().username,
            password: functions.getQAPublicationUser().password
        });
    });

    after(function () {

        browser.refresh();
        login.logoutCloseWindow();
    });

    beforeEach(function () {

        browser.refresh();
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.testFolderPath);
        AssetTitle = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        AssetName = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);

        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.ArticleProfileName,
            global.d2ConDataSettings.inputData.ArticleTemplate,
            AssetTitle,
            AssetName)

        documentListTab.selectAsset(AssetTitle);
        contentTab.checkOut();
    });

    it('Verify the presence of checkbox and Social Media Share name for Image, Video, Slideshow module - US News', function () {
        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.selectModuleTypeSearchText('Image', 'heart');
        moduleOption.verifySocialSharingExists();
        moduleOption.moduleCancel();

        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.selectModuleTypeSearchText('Video', 'heart');
        moduleOption.verifySocialSharingNotExists();
        moduleOption.moduleCancel();

        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.selectModuleTypeSearchText('Slideshow', 'heart');
        moduleOption.verifySocialSharingNotExists();
        moduleOption.moduleCancel();

        contentTab.checkIn();

    });

    it(' Verify the XML attributes after inserting the Video module - US News', function () {

        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.selectModuleTypeSearchText('Video', 'heart');
        moduleOption.verifyModuleSizeField();
        moduleOption.moduleCancel();

        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.selectModuleTypeSearchText('Video', 'heart');
        moduleOption.setTitleAndInsert('QA');

        contentTab.checkIn();

        var cidName = propertiesTab.getChronicleIdAndName();
        var objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        propertiesTab.setRequiredProperties(objName, 'News', objName, objName, objName, objName, 'WebMD Medical News', '2015 WebMD', 'ADD-ADHD (Adult)');
        documentListTab.assetPowerPromotePublishToStaging(AssetTitle);

        browser.call(function () {});
        return Promise.resolve(
            parseXml.getXmlFromUrl(functions.getAtsScsFileUrl() + chronicleId, null).then(function (result) {

                var moduleSizeAtt = JSONPath({
                    json: result,
                      path: "$..section_text.embeded_module[?(@.module_size)]",
                    resultType: 'all'
                });
                expect(moduleSizeAtt.length).to.equal(0);

                var shareSocialAtt = JSONPath({
                    json: result,
                      path: "$..section_text.embeded_module[?(@.suppress_share)]",
                    resultType: 'all'
                });
                expect(shareSocialAtt.length).to.equal(0);
            }));
    });

    it(' Verify the XML attributes after inserting the Slideshow module - US News', function () {

        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.selectModuleTypeSearchText('Slideshow', 'heart');
        moduleOption.verifyModuleSizeField();
        moduleOption.moduleCancel();

        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.selectModuleTypeSearchText('Slideshow', 'heart');
        moduleOption.setTitleAndInsert('QA');

        contentTab.checkIn();

        var cidName = propertiesTab.getChronicleIdAndName();
        var objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        propertiesTab.setRequiredProperties(objName, 'News', objName, objName, objName, objName, 'WebMD Medical News', '2015 WebMD', 'ADD-ADHD (Adult)')
        documentListTab.assetPowerPromotePublishToStaging(AssetTitle);

        browser.call(function () {});
        return Promise.resolve(
            parseXml.getXmlFromUrl(functions.getAtsScsFileUrl() + chronicleId, null).then(function (result) {

                var moduleSizeAtt = JSONPath({
                    json: result,
                      path: "$..section_text.embeded_module[?(@.module_size)]",
                    resultType: 'all'
                });
                expect(moduleSizeAtt.length).to.equal(0);

                var shareSocialAtt = JSONPath({
                    json: result,
                      path: "$..section_text.embeded_module[?(@.suppress_share)]",
                    resultType: 'all'
                });
                expect(shareSocialAtt.length).to.equal(0);
            }));
    });

    it('Verify the XML attributes after inserting the image module - US News', function () {

        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.selectModuleTypeSearchText('Image', 'heart');
        moduleOption.verifyModuleSizeField();
        moduleOption.moduleCancel();

        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.selectModuleTypeSearchText('Image', 'heart');
        moduleOption.setTitleAndInsert('QA');

        contentTab.checkIn();

        var cidName = propertiesTab.getChronicleIdAndName();
        var objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        propertiesTab.setRequiredProperties(objName, 'News', objName, objName, objName, objName, 'WebMD Medical News', '2015 WebMD', 'ADD-ADHD (Adult)');
        documentListTab.assetPowerPromotePublishToStaging(AssetTitle);

        browser.call(function () {});
        return Promise.resolve(
            parseXml.getXmlFromUrl(functions.getAtsScsFileUrl() + chronicleId, null).then(function (result) {

                var jsEmbedAssets = JSONPath({
                    json: result,
                    path: "$..section_text.embeded_module[?(@.class =='wbmdembededmodule cke_widget_inline')]",
                    resultType: 'all'
                });

                expect(jsEmbedAssets[0].parent.$.suppress_share).to.equal('false');

                var moduleSizeAtt = JSONPath({
                    json: result,
                      path: "$..section_text.embeded_module[?(@.module_size)]",
                    resultType: 'all'
                });
                expect(moduleSizeAtt.length).to.equal(0);
            }));
    });
});
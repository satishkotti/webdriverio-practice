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
var mModuleBulletOption = require('./../../common/actions/mModuleBullet.actions');
var propertiesTab = require('./../../common/actions/propertiesTab.actions');
var randomstring = require("randomstring");

describe('Interactive Article - BulletList Module', function () {

    var chronicleId;
    var AssetTitle;
    var AssetName;
    before(function () {

        login.loginWithNewWindow({
            url: functions.getEnvTestUrl(),
            username: functions.getQAPublicationUser().username,
            password: functions.getQAPublicationUser().password
        });
        browser.pause(2000);
        mModuleBulletOption.RepositoryRefresh();
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.testFolderPath);


    });

    beforeEach(function () {
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

    it('should Verify the bullet list options in the module menu,Bullet List module & verify user is able access bullet list with data in the Rich text editor', function () {
        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextmModuleSelectModuleClick("Bulleted List");

        mModuleBulletOption.addHeadlineDescrAlignBullet(global.d2ConDataSettings.inputData.bulletlistheadline,
            global.d2ConDataSettings.inputData.bulletlistmoduleDescription,
            global.d2ConDataSettings.inputData.leftalignent, "BulletTitle", "D2"
        );
        contentTab.checkIn();
    });
    it('should Verify that user is able to insert multiple list within content - PPE-102331', function () {
        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextmModuleSelectModuleClick("Bulleted List");

        mModuleBulletOption.multiplebulletlist(global.d2ConDataSettings.inputData.bulletlistheadline,
            global.d2ConDataSettings.inputData.bulletlistmoduleDescription,
            global.d2ConDataSettings.inputData.leftalignent, "BulletTitle", "BulletTitle2"
        );
        contentTab.checkIn();
    });
    it('should Verify user is able to edit the bulletlist module - PPE-102759', function () {
        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextmModuleSelectModuleClick("Bulleted List");

        mModuleBulletOption.bulletlistEdit(global.d2ConDataSettings.inputData.bulletlistheadline,
            global.d2ConDataSettings.inputData.bulletlistmoduleDescription,
            global.d2ConDataSettings.inputData.leftalignent, "QA", "QAtest");
        contentTab.contenttabframeswitching();
        mModuleBulletOption.bulletlistTitleEdit(global.d2ConDataSettings.inputData.bulletlistheadline, "QAUpdated");
        contentTab.checkIn();
    });
    it('should Verify user is not able to insert bulletlist module without bulletlist and bulletlist title - PPE-102332', function () {
        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextmModuleSelectModuleClick("Bulleted List");
        mModuleBulletOption.bulletlistEmptyValidation();
        mModuleBulletOption.bulletlistInsertEmptyValidation();
        contentTab.checkIn();


    });

    it('should Verify the Right alignment after insersting the module - PPE-102330', function () {
        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextmModuleSelectModuleClick("Bulleted List");
        mModuleBulletOption.bulletlistAlign(global.d2ConDataSettings.inputData.bulletlistheadline,
            global.d2ConDataSettings.inputData.bulletlistmoduleDescription,
            "Right", "BulletTitle", "D2"
        );
        contentTab.checkIn();

    });
    it('should Verify the Middle alignment after insersting the module - PPE-102330', function () {
        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextmModuleSelectModuleClick("Bulleted List");
        mModuleBulletOption.bulletlistAlign(global.d2ConDataSettings.inputData.bulletlistheadline,
            global.d2ConDataSettings.inputData.bulletlistmoduleDescription,
            "Middle", "BulletTitle", "D2"
        );
        contentTab.checkIn();
    });

    it('should Verify the lifecycle and XML-renditions', function () {
        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextmModuleSelectModuleClick("Bulleted List");

        mModuleBulletOption.addHeadlineDescrAlignBullet(global.d2ConDataSettings.inputData.bulletlistheadline,
            global.d2ConDataSettings.inputData.bulletlistmoduleDescription,
            global.d2ConDataSettings.inputData.leftalignent, "BulletTitle", "D2"
        );
        contentTab.checkIn();
        var cidName = propertiesTab.getChronicleIdAndName();
        var objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        propertiesTab.setRequiredProperties(objName, 'News', objName, objName, objName, objName, 'WebMD Medical News', '2015 WebMD', 'ADD-ADHD (Adult)');
        documentListTab.assetPowerPromotePublishToStaging(AssetTitle);

        return Promise.resolve(
            parseXml.getXmlFromUrl(functions.getAtsScsFileUrl() + chronicleId, null).then(function (result) {
                var bulletlistAsset = JSONPath({
                    json: result,
                    path: "$..section_text.embeded_module[?(@.type =='bulletedlist')]",
                    resultType: 'all'
                });

                expect(bulletlistAsset[0].parent.$.align).to.equal('left');
                expect(bulletlistAsset[0].parent.$.class).to.equal('wbmdembededmodule cke_widget_inline');
                expect(bulletlistAsset[0].parent.$.module_title).to.equal(global.d2ConDataSettings.inputData.bulletlistheadline);
                expect(bulletlistAsset[0].parent.$.module_description).to.equal(global.d2ConDataSettings.inputData.bulletlistmoduleDescription);
                expect(bulletlistAsset[0].parent.$.style).to.equal("float:left;");


                var bulletlistTitle = JSONPath({
                    json: result,
                    path: "$..section_text.embeded_module.bulletlist.bulletitem",
                    resultType: 'all'
                });
                expect(bulletlistTitle[0].value.btitle).to.equal("BulletTitle");
                expect(bulletlistTitle[0].value.description.p).to.equal("D2");
            }));

    });

});
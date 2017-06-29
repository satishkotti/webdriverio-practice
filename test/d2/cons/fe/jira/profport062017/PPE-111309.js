var Promise = require('bluebird');
var JSONPath = require('JSONPath');
var parseXml = require('./../../../common/components/parseXml');
var functions = require('./../../../common/functions/functions');
var login = require('./../../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../../common/actions/documentListTab.actions');
var contentTab = require('./../../../common/actions/contentTab.actions');
var ckEditorMenu = require('./../../../common/actions/ckEditor.actions');
var relationsTab = require('./../../../common/actions/relationTab.actions');
var mModuleBulletOption = require('./../../../common/actions/mModuleBullet.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
var findTab = require('./../../../common/actions/findTab.actions');
var randomstring = require("randomstring");

describe('Regression', function () {

    var chronicleId;
    var AssetTitle;
    var AssetName;
    var cidName;
    var objName;
    before(function () {
        login.loginWithNewWindow({
            url: functions.getEnvTestUrl(),
            username: functions.getQAPublicationUser().username,
            password: functions.getQAPublicationUser().password
        });
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.testFolderPath);
        AssetTitle = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        AssetName = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.ArticleProfileName,
            global.d2ConDataSettings.inputData.ArticleTemplate,
            AssetTitle,
            AssetName);
    });

    it('Verify the relations', function () {
        documentListTab.selectAsset(AssetTitle);
        relationsTab.relations();
    });
    it('Verify the checkout , cancel and checkin operation', function () {
        documentListTab.selectAsset(AssetTitle);
        contentTab.checkOut();
        contentTab.cancel();
        contentTab.checkOut();
        contentTab.checkIn();
    });
    it('Verify the Mandatory fields, promote, demote and power promote', function () {
        documentListTab.selectAsset(AssetTitle);
        cidName = propertiesTab.getChronicleIdAndName();
        objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        propertiesTab.setRequiredProperties(objName, 'News', objName, objName, objName, objName, 'WebMD Medical News', '2015 WebMD', 'ADD-ADHD (Adult)');
        contentTab.checkOut();
        contentTab.Setimage("Thumbnail Image", "Heart");
        var TImagelinkVal = contentTab.ImagelinkVal("Thumbnail Image");
        console.log(TImagelinkVal);
        browser.frameParent();
        contentTab.Setimage("Media Asset", "Heart");
        var MImagelinkVal = contentTab.ImagelinkVal("Media Asset");
        browser.frameParent();
        contentTab.checkIn();
        documentListTab.promoteAsset(AssetTitle);
        documentListTab.demoteAsset(AssetTitle);
        documentListTab.powerPromoteAsset(AssetTitle);
        documentListTab.publishAssetToStaging(AssetTitle);
        browser.pause(5000);

        browser.call(function () {
            return Promise.resolve(
                parseXml.getXmlFromUrl(functions.getAtsScsFileUrl() + chronicleId, null).then(function (result) {
                    var style = 'float:' + global.d2ConDataSettings.inputData.ShareableAlign.toLowerCase() + ';';
                    var Asset = JSONPath({
                        json: result,
                        path: "$..metadata_section",
                        resultType: 'all'
                    });

                    var Content = JSONPath({
                        json: result,
                        path: "$..content_section",
                        resultType: 'all'
                    });

                    expect(Asset[0].parent.metadata_section.i_chronicle_id).to.equal(chronicleId);
                    expect(Content[0].parent.content_section.cons_news.thumbnail_image.$.path).to.equal(TImagelinkVal);
                    expect(Content[0].parent.content_section.cons_news.media_asset.$.path).to.equal(MImagelinkVal);

                }));
        });

    });

    it('Verify the Versions', function () {
        documentListTab.selectAsset(AssetTitle);
        documentListTab.CheckVersionvalue(AssetTitle);

    });
    it('Verify the Expire and delete operations', function () {
        documentListTab.selectAsset(AssetTitle);
        documentListTab.selectAsset(AssetTitle);
        documentListTab.powerPromoteAsset(AssetTitle);
        documentListTab.expireAsset(AssetTitle);
        documentListTab.deleteArticle(objName, global.d2ConDataSettings.inputData.DeleteAllversions);
        browser.pause(5000)
        findTab.searchTextDeleteValidation(chronicleId);
    });
});
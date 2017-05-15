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
var randomstring = require("randomstring");

describe('Regression', function () {

    var chronicleId;
    var AssetTitle;
    var AssetName;

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

     it('Verify the Versions', function () {
        documentListTab.selectAsset(AssetTitle);
        documentListTab.CheckVersionvalue(AssetTitle);
        
    });
    
      it('Verify the Mandatory fields, promote, demote and power promote', function () {
        documentListTab.selectAsset(AssetTitle);
        var cidName = propertiesTab.getChronicleIdAndName();
        var objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        propertiesTab.setRequiredProperties(objName, 'News', objName, objName, objName, objName, 'WebMD Medical News', '2015 WebMD', 'ADD-ADHD (Adult)');
       documentListTab.promoteAsset(AssetTitle);
       documentListTab.demoteAsset(AssetTitle);
       documentListTab.powerPromoteAsset(AssetTitle);
       documentListTab.publishAssetToStaging(AssetTitle);

        browser.call(function () {
            return Promise.resolve(
                parseXml.getXmlFromUrl(functions.getAtsScsFileUrl() + "091e9c5e816b371d", null).then(function (result) {
                    var Asset = JSONPath({
                        json: result,
                        path: "$..metadata_section",
                        resultType: 'all'
                    });
                    expect(Asset[0].parent.metadata_section.i_chronicle_id).to.equal("091e9c5e816b371d");

                  }));
                });
    });
    it.skip('Verify the Expire and delete operations', function () {
        documentListTab.selectAsset(AssetTitle);
         var cidName = propertiesTab.getChronicleIdAndName();
        var objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        propertiesTab.setRequiredProperties(objName, 'News', objName, objName, objName, objName, 'WebMD Medical News', '2015 WebMD', 'ADD-ADHD (Adult)');
        documentListTab.powerPromoteAsset(AssetTitle);
        documentListTab.expireAsset(AssetTitle);
        documentListTab.deleteArticle(objName,global.d2ConDataSettings.inputData.DeleteAllversions);
        documentListTab.searchArticle(chronicleId);
    });
});
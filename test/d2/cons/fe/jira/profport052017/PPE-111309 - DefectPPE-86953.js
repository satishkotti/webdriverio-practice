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
var mModuleBulletOption = require('./../../../common/actions/mModuleBullet.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
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
       
       
    });

   it('PPE-86953-Verify the Health Reference Template - Media Asset field  in SCS Target File in US Folder', function () {
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.testFolderPath);
        AssetTitle = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        AssetName = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.ArticleProfileName,
            global.d2ConDataSettings.inputData.HelathRefArticleTemplate,
            AssetTitle,
            AssetName);
        documentListTab.selectAsset(AssetTitle);
        cidName = propertiesTab.getChronicleIdAndName();
        objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        propertiesTab.setRequiredProperties(objName, 'Audio - Event', objName, objName, objName, objName, 'WebMD Health Poll', '2015 WebMD', 'ADD-ADHD (Adult)');
        contentTab.checkOut();
        contentTab.Setimage("Thumbnail Image","Heart");
        var TImagelinkVal=contentTab.ImagelinkVal("Thumbnail Image");
        contentTab.Setimage("Media Asset","Heart");
        var MImagelinkVal=contentTab.ImagelinkVal("Media Asset");
        browser.frameParent();
        contentTab.checkIn();
        documentListTab.powerPromoteAsset(AssetTitle);
        documentListTab.publishAssetToStaging(AssetTitle);
        
        browser.pause(5000);
           browser.call(function () {
            return Promise.resolve(
                parseXml.getXmlFromUrl(functions.getAtsScsFileUrl() + chronicleId, null).then(function (result) {
               
                    console.log()
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
                    expect(Content[0].parent.content_section.cons_health_ref.thumbnail_image.$.path).to.equal(TImagelinkVal);
                    expect(Content[0].parent.content_section.cons_health_ref.media_asset.$.path).to.equal(MImagelinkVal);

                      }));
        });


    });




    it('PPE-86953-Verify the Health Reference Template - Media Asset field  in SCS Target File in UK Folder', function () {
        browser.pause(5000);
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.UKtestFolderPath);
        AssetTitle = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        AssetName = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.ArticleProfileName,
            global.d2ConDataSettings.inputData.HelathRefArticleTemplate,
            AssetTitle,
            AssetName);
        documentListTab.selectAsset(AssetTitle);
        cidName = propertiesTab.getChronicleIdAndName();
        objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        propertiesTab.setRequiredProperties(objName, 'Audio - Event', objName, objName, objName, objName, 'American Dental Association', '2005 American Dental Association', 'ADD-ADHD (Adult)');
        contentTab.checkOut();
        contentTab.Setimage("Thumbnail Image","Heart");
        var TImagelinkVal=contentTab.ImagelinkVal("Thumbnail Image");
        contentTab.Setimage("Media Asset","Heart");
        var MImagelinkVal=contentTab.ImagelinkVal("Media Asset");
        browser.frameParent();
        contentTab.checkIn();
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
                    expect(Content[0].parent.content_section.cons_health_ref.thumbnail_image.$.path).to.equal(TImagelinkVal);
                    expect(Content[0].parent.content_section.cons_health_ref.media_asset.$.path).to.equal(MImagelinkVal);

                      }));
        });


    });


     it('PPE-86953-Verify the News Template - Media Asset field  in SCS Target File in US Folder', function () {
        browser.pause(5000);
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.testFolderPath);
        AssetTitle = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        AssetName = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.ArticleProfileName,
            global.d2ConDataSettings.inputData.ArticleTemplate,
            AssetTitle,
            AssetName);
        documentListTab.selectAsset(AssetTitle);
        cidName = propertiesTab.getChronicleIdAndName();
        objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
         propertiesTab.setRequiredProperties(objName, 'News', objName, objName, objName, objName, 'WebMD Medical News', '2015 WebMD', 'ADD-ADHD (Adult)');
        contentTab.checkOut();
        contentTab.Setimage("Thumbnail Image","Heart");
        var TImagelinkVal=contentTab.ImagelinkVal("Thumbnail Image");
        contentTab.Setimage("Media Asset","Heart");
        var MImagelinkVal=contentTab.ImagelinkVal("Media Asset");
        browser.frameParent();
        contentTab.checkIn();
        documentListTab.powerPromoteAsset(AssetTitle);
        documentListTab.publishAssetToStaging(AssetTitle);
        browser.pause(5000);
           browser.call(function () {
            return Promise.resolve(
                parseXml.getXmlFromUrl(functions.getAtsScsFileUrl() + chronicleId, null).then(function (result) {
               
                    console.log()
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

                     
                    console.log(Content[0]);

                    expect(Asset[0].parent.metadata_section.i_chronicle_id).to.equal(chronicleId);
                    expect(Content[0].parent.content_section.cons_news.thumbnail_image.$.path).to.equal(TImagelinkVal);
                    expect(Content[0].parent.content_section.cons_news.media_asset.$.path).to.equal(MImagelinkVal);

                      }));
        });


    });




    it('PPE-86953-Verify the News Template - Media Asset field  in SCS Target File in UK Folder', function () {
        browser.pause(5000);
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.UKtestFolderPath);
        AssetTitle = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        AssetName = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.ArticleProfileName,
            global.d2ConDataSettings.inputData.ArticleTemplate,
            AssetTitle,
            AssetName);
        documentListTab.selectAsset(AssetTitle);
        cidName = propertiesTab.getChronicleIdAndName();
        objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
         propertiesTab.setRequiredProperties(objName, 'News', objName, objName, objName, objName, 'WebMD Medical News', '2015 WebMD', 'ADD-ADHD (Adult)');
        contentTab.checkOut();
        contentTab.Setimage("Thumbnail Image","Heart");
        var TImagelinkVal=contentTab.ImagelinkVal("Thumbnail Image");
        contentTab.Setimage("Media Asset","Heart");
        var MImagelinkVal=contentTab.ImagelinkVal("Media Asset");
        browser.frameParent();
        contentTab.checkIn();
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

    

    
});
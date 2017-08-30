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
var DefntnTemplate = require('./../../../common/actions/DefinationTemplate.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
var findTab = require('./../../../common/actions/findTab.actions');
var test = require("./../../../common/functions/functions.js");
var randomstring = require("randomstring");
var _ = require('underscore');
var moment = require('moment-timezone');

describe('Definition Template - Short Text Object template- PPE-104183', function () {

    var chronicleId;
    var AssetTitle;
    var AssetName;
    var cidName;
     var objName;
     var TImagelinkVal;
     var MImagelinkVal;
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
            global.d2ConDataSettings.inputData.ShortTextArticleProfileName,
            global.d2ConDataSettings.inputData.DefinitionArticleTemplate,
            AssetTitle,
            AssetName);
    });

     it.skip('Verify  creation with only mandatory fields,Verify the error messages when mandatory fields are left blank for Definition Template - Short Text Object', function () {
        documentListTab.selectAsset(AssetTitle);
        DefntnTemplate.IDefntnMandatoryfieldsValidation();
        DefntnTemplate.propertyLabelValidation();
    });

    it('Verify the checkout , cancel and checkin operation', function () {
        documentListTab.selectAsset(AssetTitle);
        contentTab.checkOut();
        DefntnTemplate.Terminputsetvalue("Sample Test title");
        browser.frameParent();
        contentTab.cancel();
        contentTab.checkOut();
        DefntnTemplate.Pronunciationinputsetvalue("Sample Pronunciation Test Data");
        browser.frameParent();
        DefntnTemplate.Definitioninputsetvalue("Sample Definition Test Data");
        browser.frameParent();
        DefntnTemplate.Etymologysetvalue("Sample Etymology  Test Data");
        browser.frameParent();
        DefntnTemplate.Citationssetvalue("Sample Citation Test Data");
        browser.frameParent();
        contentTab.checkIn();
    });

   it.skip('Verify the Health Reference Template - Promote ,demote ,Power Promote,Publish functionality and Verify Definition Template - Short Text Object  rendition with WP renditions', function () {
        browser.pause(5000);
        documentListTab.selectAsset(AssetTitle);
        cidName = propertiesTab.getChronicleIdAndName();
        objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        browser.pause(5000);
        propertiesTab.setRequiredProperties(objName, 'Definition', objName, objName, objName, objName, 'WebMD Definition', '2015 WebMD', 'ADD-ADHD (Adult)');
        documentListTab.selectAsset(AssetTitle);
        documentListTab.promoteAsset(AssetTitle);
        documentListTab.demoteAsset(AssetTitle);
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

                    expect(Content[0].parent.content_section.term).to.equal("Sample Test title");
                    expect(Content[0].parent.content_section.pronunciation).to.equal("Sample Pronunciation Test Data");
                    expect(Content[0].parent.content_section.definition).to.equal("Sample Definition Test Data");
                    expect(Content[0].parent.content_section.etymology).to.equal("Sample Etymology  Test Data");
                    expect(Content[0].parent.content_section.citations).to.equal("Sample Citation Test Data");
                   }));
        });
            

                     documentListTab.expireAsset(objName);
                     documentListTab.deleteArticle(objName, global.d2ConDataSettings.inputData.DeleteAllversions);
                     findTab.findbyId(chronicleId);

    });

    
});


describe.skip('Definition Template - Short Text Object - PPE-104183 - Scheduling tasks', function () {
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
            global.d2ConDataSettings.inputData.ShortTextArticleProfileName,
            global.d2ConDataSettings.inputData.DefinitionArticleTemplate,
            AssetTitle,
            AssetName);
        documentListTab.selectAsset(AssetTitle);
        propertiesTab.setRequiredProperties(objName, 'Definition', objName, objName, objName, objName, 'WebMD Definition', '2015 WebMD', 'ADD-ADHD (Adult)');
    });


    it('Verify Schedule Publish functionality on Definition Template - Short Text Object- PPE-104183', function () {
        browser.pause(5000);
        documentListTab.selectAsset(AssetName);
        var schpublishtime = moment.tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
        schpublishtime = moment(schpublishtime);
        schpublishtime = moment(schpublishtime, "MM/DD/YYYY HH:mm:ss")
            .add(00, 'seconds')
            .add(05, 'minutes').format('MM/DD/YYYY HH:mm:ss');
        expdate = moment(schpublishtime, "MM/DD/YYYY HH:mm:ss")
            .add(00, 'seconds')
            .add(06, 'minutes').format('MM/DD/YYYY HH:mm:ss');
        propertiesTab.setRequiredPropertiesforPublish(schpublishtime, expdate);
        documentListTab.schedulePublishAsset(AssetName);
        browser.pause(3000);
        var status = contentTab.contentHeaderGet();
        expect(status).to.contains("Approved");
        browser.pause(300000);
        browser.refresh();
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.testFolderPath);
        documentListTab.selectAsset(AssetName);
        expect(contentTab.contentHeaderGet()).to.contains("Active");
        browser.pause(540000);
        browser.refresh();
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.testFolderPath);
        documentListTab.selectAsset(AssetName);
        expect(contentTab.contentHeaderGet()).to.contains("Expire");
    });
});

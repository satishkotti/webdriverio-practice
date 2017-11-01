var functions = require('./../../../common/functions/functions');
var login = require('./../../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../../common/actions/documentListTab.actions');
var contentTab = require('./../../../common/actions/contentTab.actions');
var ckEditorMenu = require('./../../../common/actions/ckEditor.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
var nonTemplateFiles = require('./../../../common/actions/nonTemplateFiles.actions');
var findTab = require('./../../../common/actions/findTab.actions');
var versionTab = require('./../../../common/actions/versionTab.action');
var randomstring = require("randomstring");
var moment = require('moment-timezone');


describe('General Features - Import Non template files - Article - UK - PPE-50079', function () {
    var filetoupload2 = './test/d2/cons/testfiles/TestNonArticleTXT.txt';
    var filetoupload = './test/d2/cons/testfiles/TestNonTemplateArticleWXML.wxml';
    var assetTitle;
    var objName;

    before(function () {
        login.loginWithNewWindow({
            url: functions.getEnvTestUrl(),
            username: functions.getQAPublicationUser().username,
            password: functions.getQAPublicationUser().password
        });
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.UKtestFolderPath);

    });

    it('Verify user is able remove files from the section screen-  PPE-115564, Verify selected properties are being imported for the rest of files - PPE-115565 ', function () {
        objName = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        assetTitle = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        nonTemplateFiles.importUnSelectFile(filetoupload, filetoupload2);
        nonTemplateFiles.importMultipleConsumerArticle(filetoupload, filetoupload2, "WBMD UK Non Template Article", objName, objName, objName, "News", objName, objName, objName, 'UK WebMD Medical News', 'ADD-ADHD (Adult)');

    });
    it('Verify user is able import file - PPE-115554,Verify the article mandtory properties on the import screen - PPE-115555,Verify user is unable to import without the mnadatory fields on import screen - PPE-115557,Verify user is able to checkout,cancel checkout and checkin on imported file - PPE-115558, Verify user is able to promote on the imported file - PPE-115559, Verify user is able to demote on the imported file - PPE-115560, Verify user is able to power promote on the imported file - PPE-115561,Verify user is able to expire on the imported file- PPE-115562, Verify user is able to delete on the imported file - PPE-115563 ', function () {
        objName = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        assetTitle = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        nonTemplateFiles.importConsumerArticle(filetoupload, "WBMD UK Non Template Article", objName, assetTitle, objName, "News", objName, objName, objName, 'UK WebMD Medical News', 'ADD-ADHD (Adult)', assetTitle, assetTitle, filetoupload);
        cidName = propertiesTab.getChronicleIdAndTitle();
        chronicleId = cidName.chronicleId;
        nonTemplateFiles.validationProperties(objName, objName, "2016 WebMD - UK");
        documentListTab.promoteAsset(objName);
        documentListTab.demoteAsset(objName);
        documentListTab.powerPromoteAsset(objName);
        documentListTab.publishAssetToStaging(objName);
        documentListTab.expireAsset(objName);
        documentListTab.deleteArticle(objName, global.d2ConDataSettings.inputData.DeleteAllversions);
        findTab.searchTextDeleteValidation(chronicleId);

    });


});

describe.skip('General Features - Import Non template files - Article - UK - PPE-50079 Scheduling tasks', function () {
    var filetoupload = './test/d2/cons/testfiles/TestNonTemplateArticleWXML.wxml';
    var assetTitle;
    var objName;
    var chronicleId;
    before(function () {
        login.loginWithNewWindow({
            url: functions.getEnvTestUrl(),
            username: functions.getQAPublicationUser().username,
            password: functions.getQAPublicationUser().password
        });
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.UKtestFolderPath);
        objName = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        assetTitle = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        nonTemplateFiles.importConsumerArticle(filetoupload, "WBMD UK Non Template Article", objName, assetTitle, objName, "News", objName, objName, objName, 'UK WebMD Medical News', 'ADD-ADHD (Adult)', assetTitle, assetTitle, filetoupload);
        cidName = propertiesTab.getChronicleIdAndTitle();
        chronicleId = cidName.chronicleId;
        nonTemplateFiles.validationProperties(objName, objName, "2016 WebMD - UK");

    });


    it('Verify the Schedule Publish for the uploaded file- PPE-115570, Verify the Schedule Expire for the uploaded file - PPE-115571', function () {
        browser.pause(5000);
        documentListTab.selectAsset(objName);
        var schpublishtime = moment.tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
        schpublishtime = moment(schpublishtime);
        schpublishtime = moment(schpublishtime, "MM/DD/YYYY HH:mm:ss")
            .add(00, 'seconds')
            .add(05, 'minutes').format('MM/DD/YYYY HH:mm:ss');
        expdate = moment(schpublishtime, "MM/DD/YYYY HH:mm:ss")
            .add(00, 'seconds')
            .add(06, 'minutes').format('MM/DD/YYYY HH:mm:ss');
        propertiesTab.setRequiredPropertiesforPublish(schpublishtime, expdate);
        documentListTab.schedulePublishAsset(objName);
        browser.pause(3000);
        versionTab.approvedversionValidation();
        browser.pause(400000);
        browser.refresh();
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.UKtestFolderPath);
        documentListTab.selectAsset(objName);
        versionTab.activeversionValidation();
        browser.pause(540000);
        browser.refresh();
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.UKtestFolderPath);
        documentListTab.selectAsset(objName);
        versionTab.expireversionValidation();
    });
});


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
var CopyrightTemplate = require('./../../../common/actions/CopyrightTemplate.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
var findTab = require('./../../../common/actions/findTab.actions');
var test = require("./../../../common/functions/functions.js");
var randomstring = require("randomstring");
var _ = require('underscore');
var moment = require('moment-timezone');

describe('Copyright Template UK- PPE-61754', function () {
    var chronicleId;
    var AssetTitle;
    var AssetName;
    var AssetTitle2;
    var AssetName2;
    var cidName;
    var objName;
    var objName2;

    before(function () {
        login.loginWithNewWindow({
            url: functions.getEnvTestUrl(),
            username: functions.getQAPublicationUser().username,
            password: functions.getQAPublicationUser().password
        });
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.UKtestFolderPath);
        AssetTitle = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        AssetName = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.UKCopyrightArticlePName,
            global.d2ConDataSettings.inputData.CopyrightArticleTemplate,
            AssetTitle,
            AssetName);
    });

    it('Verify Copyright- UK creation with only mandatory fields- PPE-113313 ,Verify the error messages when mandatory fields are left blank for Copyright- UK Template - PPE-113314', function () {
        documentListTab.selectAsset(AssetTitle);
        CopyrightTemplate.validateRequiredPropertiesCpyRights();
        CopyrightTemplate.copyright_Othertab_AttributesNames();
    });
    it('Verify Data Dictionary validations on Copyright object-PPE-113331', function () {
        test.SetAgentForDctmApi('http://DMWRS11Q-CON-08.portal.webmd.com:8080/pbws/');
        var accessToken = test.GenerateApiAccessToken();
        var response = test.ExecuteDQLusingDCTMAPI(accessToken, "select i_chronicle_id, title from wbmd_company where any wbmd_site_only = '1006' and title != ' ' order by title");
        documentListTab.selectAsset(AssetTitle);
        var j = 0;
        var dropdown = [];
        var dropdownUI = [];
        for (i = 0; j < response.length; i++ , j++) {
            dropdown.push(response[i][1].title);
        }
        var dropdownUI = CopyrightTemplate.SQLCopyrightholderpropertiesValidation();
        var differencesAPI = _.difference(dropdown, dropdownUI);
        var requiredDD = "1";
        expect(differencesAPI.length).to.equal.requiredDD;
        var response2 = test.ExecuteDQLusingDCTMAPI(accessToken, "select i_chronicle_id, title from wbmd_person where any wbmd_person_role='7' and any wbmd_site_only = '1006' and title != ' ' order by title");
        var n = 0;
        var dropdown2 = [];
        var dropdownUI2 = [];
        for (i = 0; n < response2.length; i++ , n++) {
            dropdown.push(response[i][1].title);
        }
        var dropdownUI2 = CopyrightTemplate.SQLLegalReviewerrpropertiesValidation();
        var differencesAPI2 = _.difference(dropdown2, dropdownUI2);
        var requiredDD2 = "1";
        expect(differencesAPI2.length).to.equal.requiredDD2;

    });
    it('Verify Checkout and checkin functionality on Copyright- UK Template -  PPE-113318,Verify Copyright- UK creation with all fields- PPE-113319,Verify Cancel Checkout functionality on Copyright- UK Template-PPE-113325 ', function () {
        documentListTab.selectAsset(AssetTitle);
        contentTab.checkOut();
        contentTab.cancelcheckout();
        contentTab.checkOut();
        CopyrightTemplate.CopyrightStatementText(global.d2ConDataSettings.inputData.copyrightTitle);
        browser.frameParent();
        contentTab.checkIn();
    });

    it('Verify Copyright- UK creation with all fields- PPE-113319 ,Verify Promote functionality on Copyright- UK Template-PPE-113323,Verify Power Promote functionality on Copyright- UK Template-PPE-113322,Verify Publish functionality on Copyright- UK Template-PPE-113320,Verify Expire functionality on Copyright- UK Template-PPE-113321,Verify Delete functionality on Copyright- UK Template-PPE-113330,Verify demote functionality on Copyright- UK Template-PPE-113326', function () {
        documentListTab.selectAsset(AssetTitle);
        cidName = propertiesTab.getChronicleIdAndTitle();
        objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        CopyrightTemplate.setRequiredPropertiesCpyRights(objName, '3M', 'QA_TestPerson7182016');
        documentListTab.selectAsset(AssetTitle);
        documentListTab.promoteAsset(AssetTitle);
        documentListTab.demoteAsset(AssetTitle);
        documentListTab.powerPromoteAsset(AssetTitle);
        documentListTab.publishAssetToStaging(AssetTitle);
        
        browser.pause(5000);
 
         browser.call(function () {
             return Promise.resolve(
                 parseXml.getXmlFromUrl(functions.getAtsScsFileUrl() + chronicleId, null).then(function (result) {
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
 
                     expect(Asset[0].parent.metadata_section.chronic_id).to.equal(chronicleId);
                     expect(Content[0].parent.content_section.wbmd_copyright.wbmd_copyright_statement).to.equal(global.d2ConDataSettings.inputData.copyrightTitle);
 
 
                 }));
             

});
      

    });


    it('Verify created copyright is displayed in article-PPE-114663 ', function () {
        findTab.findbyId("091e9c5e80330d37");
        documentListTab.selectAsset("UK WebMD Medical News");
        CopyrightTemplate.copyrightPublicationModify(AssetName);
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.testFolderPath_uk);
        AssetTitle2 = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        AssetName2 = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.ArticleProfileName_uk,
            global.d2ConDataSettings.inputData.ArticleTemplate,
            AssetTitle2,
            AssetName2);
        documentListTab.selectAsset(AssetTitle2);
        cidName = propertiesTab.getChronicleIdAndName();
        objName2 = cidName.objectName;
        chronicleId = cidName.chronicleId;
        propertiesTab.setRequiredProperties(objName2, 'Audio - Narrative', objName2, objName2, objName2, objName2, 'UK WebMD Medical News',AssetName, 'ADD-ADHD (Adult)');

        documentListTab.expireAsset(AssetName);
        documentListTab.deleteArticle(AssetTitle, global.d2ConDataSettings.inputData.DeleteAllversions);
        findTab.searchTextDeleteValidation(AssetName);
        
    });

    it('Verify Checkout and checkin functionality on Copyright- UK Template -  PPE-113318,Verify Copyright- UK creation with all fields- PPE-113319,Verify Cancel Checkout functionality on Copyright- UK Template-PPE-113325 ', function () {
        findTab.findbyId(global.d2ConDataSettings.inputData.existingCopyrightID);
        documentListTab.selectAsset(global.d2ConDataSettings.inputData.existingCopyrightTitle);
        contentTab.checkOut();
        CopyrightTemplate.CopyrightStatementText(global.d2ConDataSettings.inputData.copyrightTitle);
        browser.frameParent();
        contentTab.checkIn();
    });

});

describe.skip('Copyright Template UK- PPE-61754- Scheduling tasks', function () {
    var AssetTitle;
    var AssetName;
    before(function () {
        login.loginWithNewWindow({
            url: functions.getEnvTestUrl(),
            username: functions.getQAPublicationUser().username,
            password: functions.getQAPublicationUser().password
        });
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.UKtestFolderPath);
        AssetTitle = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        AssetName = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.UKCopyrightArticlePName,
            global.d2ConDataSettings.inputData.CopyrightArticleTemplate,
            AssetTitle,
            AssetName);
        documentListTab.selectAsset(AssetTitle);
        CopyrightTemplate.setRequiredPropertiesCpyRights(AssetName, 'WebMD', 'QA_TestPerson1234');
    });


    it('Verify Schedule Publish functionality on Pointer  PPE-106406', function () {
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
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.UKtestFolderPath);
        documentListTab.selectAsset(AssetName);
        expect(contentTab.contentHeaderGet()).to.contains("Active");
        browser.pause(540000);
        browser.refresh();
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.UKtestFolderPath);
        documentListTab.selectAsset(AssetName);
        expect(contentTab.contentHeaderGet()).to.contains("Expire");
    });
});

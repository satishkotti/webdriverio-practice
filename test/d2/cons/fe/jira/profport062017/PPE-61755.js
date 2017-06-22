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
var disclaimerTemplate = require('./../../../common/actions/disclaimerTemplate.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
var randomstring = require("randomstring");
var moment = require('moment-timezone');
var findTab = require('./../../../common/actions/findTab.actions');
var test = require("./../../../common/functions/functions.js");
var _ = require('underscore');


describe('Disclaimer Template US - PPE-61755', function () {
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
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.testFolderPath);
        AssetTitle = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        AssetName = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.USDisclaimerPName,
            global.d2ConDataSettings.inputData.disclaimerTemplate,
            AssetTitle,
            AssetName);        
    });

     it('Verify Disclaimer- US creation with only mandatory fields - PPE-115714,Verify the error messages when mandatory fields are left blank for Disclaimer- US Template-PPE-115715,Verify Disclaimer- US creation with all fields-PPE-115718', function () {
        documentListTab.selectAsset(AssetTitle);
        disclaimerTemplate.disclaimer_Othertab_AttributesNames();

    });

   it.skip('Verify Data Dictionary validations on Disclaimer object-PPE-115728', function () {
        test.SetAgentForDctmApi('http://DMWRS11Q-CON-08.portal.webmd.com:8080/pbws/');
        var accessToken = test.GenerateApiAccessToken();
        var response = test.ExecuteDQLusingDCTMAPI(accessToken, "select i_chronicle_id, title from wbmd_person where any wbmd_person_role='7' order by title");
        documentListTab.selectAsset(AssetTitle);
        var j = 0;
        var dropdown = [];
        var dropdownUI = [];
        for (i = 0; j < response.length; i++ , j++) {
            dropdown.push(response[i][1].title);
        }
        var dropdownUI = disclaimerTemplate.SQLLegalReviewerrpropertiesValidation();
        var differencesAPI = _.difference(dropdown, dropdownUI);
        var requiredDD = "1";
        expect(differencesAPI.length).to.equal.requiredDD;

    });
    it('Verify Checkout and checkin functionality on Disclaimer- US Template-PPE-115717,Verify Cancel Checkout functionality on Disclaimer- US Template-PPE-115723', function () {
        documentListTab.selectAsset(AssetTitle);
        contentTab.checkOut();
        contentTab.cancelcheckout();
        contentTab.checkOut();
        disclaimerTemplate.DisclaimerStatementText(global.d2ConDataSettings.inputData.disclaimerTitle);
        browser.frameParent();
        contentTab.checkIn();
    });

    it('Verify Publish functionality on Disclaimer- US Template-PPE-115719,Verify Power Promote functionality on Disclaimer- US Template - PPE-115721,Verify Promote functionality on Disclaimer- US Template-PPE-115722,Verify demote functionality on Disclaimer- US Template-PPE-115724,Verify Disclaimer US rendition with WP renditions-PPE-115725', function () {
        documentListTab.selectAsset(AssetTitle);
        cidName = propertiesTab.getChronicleIdAndTitle();
        objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        disclaimerTemplate.setRequiredProperties("dummy");
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
                     expect(Content[0].parent.content_section.wbmd_disclaimer.disclaimer_statement).to.equal(global.d2ConDataSettings.inputData.diclaimerTitlewxml);

                 }));

});
      
    });


    it('Verify Expire functionality on Disclaimer- US Template-PPE-115720,Verify created disclaimer is displayed in article-PPE-115729', function () {
        findTab.findbyId("091e9c5e807ae1de");
        documentListTab.selectAsset("Getty ");
        disclaimerTemplate.disclaimerPublicationModify(AssetName);
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.testFolderPath);
        AssetTitle2 = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        AssetName2 = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.ArticleProfileName,
            global.d2ConDataSettings.inputData.ArticleTemplate,
            AssetTitle2,
            AssetName2);
        documentListTab.selectAsset(AssetTitle2);
        cidName = propertiesTab.getChronicleIdAndName();
        objName2 = cidName.objectName;
        chronicleId2 = cidName.chronicleId;
        propertiesTab.setRequiredPropertiesDisclaimer(objName2, 'Audio - Narrative', objName2, objName2, objName2, objName2, "Getty ","1997-2008 GlaxoSmithKline",AssetName,'ADD-ADHD (Adult)');

        documentListTab.expireAsset(AssetName);
        documentListTab.deleteArticle(AssetTitle, global.d2ConDataSettings.inputData.DeleteAllversions);
        findTab.searchTextDeleteValidation(chronicleId);
        
    });

    it('Edit an existing Disclaimer- US Template-PPE-115716 ', function () {
        findTab.findbyId(global.d2ConDataSettings.inputData.existingDisclaimerID);
        documentListTab.selectAsset(global.d2ConDataSettings.inputData.existingDisclaimeritle);
        contentTab.checkOut();
        disclaimerTemplate.DisclaimerStatementText(global.d2ConDataSettings.inputData.disclaimerTitle);
        browser.frameParent();
        contentTab.checkIn();
    });

});

describe.skip('Disclaimer Template US- PPE-61755- Scheduling tasks', function () {
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
            global.d2ConDataSettings.inputData.USDisclaimerPName,
            global.d2ConDataSettings.inputData.disclaimerTemplate,
            AssetTitle,
            AssetName);
        documentListTab.selectAsset(AssetTitle);
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
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.testFolderPath);
        documentListTab.selectAsset(AssetName);
        expect(contentTab.contentHeaderGet()).to.contains("Active");
        browser.pause(540000);
        browser.refresh();
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.testFolderPath);
        documentListTab.selectAsset(AssetName);
        expect(contentTab.contentHeaderGet()).to.contains("Expired");
    });
});

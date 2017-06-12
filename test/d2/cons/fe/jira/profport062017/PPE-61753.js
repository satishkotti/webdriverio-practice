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
var randomstring = require("randomstring");
var moment = require('moment-timezone');
var findTab = require('./../../../common/actions/findTab.actions');

describe('Copyright Template US', function () {
 var chronicleId;
    var AssetTitle;
    var AssetName;
    var AssetTitle2;
    var AssetName2;
    var cidName;
    var objName;
    var objName2;

     var DQLQuery="";
     var CopyrightStatementText="© 2017 WebMD, LLC. All rights reserved.";
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
            global.d2ConDataSettings.inputData.USCopyrightArticlePName,
            global.d2ConDataSettings.inputData.CopyrightArticleTemplate,
            AssetTitle,
            AssetName);        
    });

     it('Verify Copyright- US creation with only mandatory fields- PPE-113296 ,Verify the error messages when mandatory fields are left blank for Copyright- US Template - PPE-113297', function () {
        console.log(AssetName);
        documentListTab.selectAsset(AssetTitle);
        CopyrightTemplate.copyrightMandatoryfieldsValidation();
        CopyrightTemplate.copyright_Othertab_AttributesNames();
    });

    
    it('Should verify the data dictionary validations on  PropertiesTab -Legal Reviewer:  PPE-113311', function () {
        documentListTab.selectAsset(AssetTitle);
        var response;
        functions.SetAgentForDctmApi(functions.getDataApiUrl())
        var accessToken = functions.GenerateApiAccessToken();
        response = functions.ExecuteDQLusingDCTMAPI(accessToken,"select i_chronicle_id, title from wbmd_company where any wbmd_site_only = '1001' and title != ' ' order by title");
        CopyrightTemplate.VerifyDropdownlistVal("wbmd_copyright_holder-input",response);
    });

    
     it('Should verify the data dictionary validations on  PropertiesTab-Copyright Holder:  PPE-113311', function () {
        documentListTab.selectAsset(AssetTitle);
        var response;
        functions.SetAgentForDctmApi(functions.getDataApiUrl())
        var accessToken = functions.GenerateApiAccessToken();
        response = functions.ExecuteDQLusingDCTMAPI(accessToken,"select i_chronicle_id, title from wbmd_person where any wbmd_person_role='7' and any wbmd_site_only = '1001' and title != ' ' order by title");
        CopyrightTemplate.VerifyDropdownlistVal("wbmd_legal_revr-input",response);
        
    });


    it('Verify the checkout , cancel and checkin operation', function () {
        documentListTab.selectAsset(AssetTitle);
        contentTab.checkOut();
        CopyrightTemplate.CopyrightStatementText(CopyrightStatementText);
        browser.frameParent();
        contentTab.cancel();
        browser.frameParent();
        contentTab.checkOut();
        CopyrightTemplate.CopyrightStatementText(CopyrightStatementText);
        browser.frameParent();
        contentTab.checkIn();
    });

    it('Verify the Mandatory fields and power promote', function () {
        documentListTab.selectAsset(AssetTitle);
        cidName = CopyrightTemplate.CpygetChronicleIdAndName();
        chronicleId = cidName.chronicleId;
        CopyrightTemplate.setRequiredPropertiesCpyRights(AssetTitle, 'WebMD', 'dummy');
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
                    expect(Content[0].parent.content_section.wbmd_copyright.wbmd_copyright_statement).to.equal(CopyrightStatementText);
                    

                      }));
        });


    });



     

   it('Verify created copyright is displayed in article-PPE-114663 ', function () {
        findTab.findbyId("091e9c5e807ae1dc");
        documentListTab.selectAsset("ThinkStock");
        CopyrightTemplate.copyrightPublicationModify(AssetTitle);
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
        propertiesTab.setRequiredProperties(objName2, 'News', objName2, objName2, objName2, objName2, 'ThinkStock',AssetTitle, 'ADD-ADHD (Adult)');
        documentListTab.expireAsset(AssetTitle);
        documentListTab.deleteArticle(AssetTitle, global.d2ConDataSettings.inputData.DeleteAllversions);
        findTab.findbyId(chronicleId);
        
    });

    
});


describe.skip('Copyright Template US- PPE-61754- Scheduling tasks', function () {
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
            global.d2ConDataSettings.inputData.USCopyrightArticlePName,
            global.d2ConDataSettings.inputData.CopyrightArticleTemplate,
            AssetTitle,
            AssetName);
        documentListTab.selectAsset(AssetTitle);
        CopyrightTemplate.setRequiredPropertiesCpyRights(AssetName, 'WebMD', 'QA_TestPerson1234');
    });


    it('Verify Schedule Publish functionality on Copyright- US Template  PPE-113309 and Verify Schedule Expire functionality on Copyright- US Template -PPE-113308', function () {
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
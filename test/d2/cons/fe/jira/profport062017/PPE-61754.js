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
var findTab= require('./../../../common/actions/findTab.actions');
var test = require("./../../../common/functions/functions.js");
var randomstring = require("randomstring");
var _ = require('underscore');

describe('Copyright Template UK: PPE-61754', function () {

   // var chronicleId='091e9c5e80d59ba9';
   // var AssetTitle='EatingWell - Meredith Corporation - UK';
   // var AssetName='eating_well_copyright_uk.xml';
    var chronicleId;
    var AssetTitle;
    var AssetName;
    var cidName;
     var objName;
     var CopyrightStatementText="© Meredith Corporation. All rights reserved. Used with permission.";
    before(function () {
        login.loginWithNewWindow({
            url: functions.getEnvTestUrl(),
            username: functions.getQAPublicationUser().username,
            password: functions.getQAPublicationUser().password
        });
       // repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.UKCopyrightTFolderPath);
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.UKtestFolderPath);
        AssetTitle = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        AssetName = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.UKCopyrightArticlePName,
            global.d2ConDataSettings.inputData.CopyrightArticleTemplate,
            AssetTitle,
            AssetName);
    });

      it.skip('Verify Copyright- UK creation with only mandatory fields- PPE-113313 ,Verify the error messages when mandatory fields are left blank for Copyright- UK Template - PPE-113314', function () {
        documentListTab.selectAsset(AssetTitle);
        CopyrightTemplate.setRequiredPropertiesCpyRights();
    });
     it.skip('Verify Checkout and checkin functionality on Copyright- UK Template -  PPE-113318,Verify Copyright- UK creation with all fields- PPE-113319,Verify Cancel Checkout functionality on Copyright- UK Template-PPE-113325 ', function () {
        documentListTab.selectAsset(AssetTitle);
        contentTab.checkOut();
        contentTab.cancelcheckout();
        contentTab.checkOut();
        CopyrightTemplate.CopyrightStatementText("QATestCopyright");
        browser.frameParent();
        contentTab.checkIn();
    });

   it.skip('Verify Copyright- UK creation with all fields- PPE-113319 ,Verify Promote functionality on Copyright- UK Template-PPE-113323,Verify Power Promote functionality on Copyright- UK Template-PPE-113322,Verify Publish functionality on Copyright- UK Template-PPE-113320,Verify Expire functionality on Copyright- UK Template-PPE-113321,Verify Delete functionality on Copyright- UK Template-PPE-113330', function () {
        documentListTab.selectAsset(AssetTitle);
        cidName = propertiesTab.getChronicleIdAndTitle();
        objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        CopyrightTemplate.setRequiredPropertiesCpyRights(objName, 'WebMD', 'QA_TestPerson1234');
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
        documentListTab.expireAsset(AssetTitle);
       documentListTab.deleteArticle(AssetTitle,global.d2ConDataSettings.inputData.DeleteAllversions);
       findTab.searchTextDeleteValidation(AssetName);

   });
   

    it('Verify Data Dictionary validations on Copyright object-PPE-113331', function () {
        test.SetAgentForDctmApi('http://DMWRS41D-CON-08.portal.webmd.com:8080/pbws/');
        var accessToken = test.GenerateApiAccessToken();
        console.log(accessToken);
        var response = test.ExecuteDQLusingDCTMAPI(accessToken, "select i_chronicle_id, title from wbmd_company where any wbmd_site_only = '1006' and title != ' ' order by title");
         console.log(response);
         documentListTab.selectAsset(AssetTitle);
         var j =0;
         var dropdown = [];
         var dropdownUI= [];
         for(i=0; j < response.length; i++,j++){
           dropdown.push(response[i][1].title);
            console.log(dropdown);
         }
        // dropdownUI.push(CopyrightTemplate.SQLCopyrightholderpropertiesValidation());
        var dropdownUI=CopyrightTemplate.SQLCopyrightholderpropertiesValidation();
        var differencesUI = _.difference(dropdownUI, dropdown);
         var differencesAPI = _.difference(dropdown, dropdownUI);
        console.log("EXTRA dropdown options present in the UI: " + differencesUI);
        console.log("REQUIRED dropdown options not present in the UI: " + differencesAPI);
       
    });

    
});
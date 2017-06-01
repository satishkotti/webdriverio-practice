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

describe('Copyright Template US', function () {

    var chronicleId;
    var AssetTitle;
    var AssetName;
    var cidName;
     var objName;
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
        documentListTab.selectAsset(AssetTitle);
        CopyrightTemplate.copyrightMandatoryfieldsValidation();
        CopyrightTemplate.copyright_Othertab_AttributesNames();
    });

    
     it.skip('Verify the checkout , cancel and checkin operation', function () {
        documentListTab.selectAsset(AssetTitle);
        contentTab.checkOut();
        contentTab.cancel();
        contentTab.checkOut();
        browser.frameParent();
        contentTab.checkIn();
    });

    it.skip('Verify the Mandatory fields and power promote', function () {
        documentListTab.selectAsset(AssetTitle);
        cidName = CopyrightTemplate.CpygetChronicleIdAndName();
        chronicleId = cidName.chronicleId;
        CopyrightTemplate.setRequiredPropertiesCpyRights(AssetTitle, 'WebMD', 'QA_TestPerson1234');
        // CopyrightTemplate.setRequiredPropertiesPublishngTab();
        // CopyrightTemplate.setRequiredPropertiesOthers('Testsubjct', 'en_US');
        contentTab.checkOut();
        CopyrightTemplate.CopyrightStatementText(CopyrightStatementText);
        browser.frameParent();
        contentTab.checkIn();
        documentListTab.selectAsset(AssetTitle);
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
                    expect(Content[0].parent.content_section.wbmd_copyright.wbmd_copyright_statement).to.equal(CopyrightStatementText);
                    

                      }));
        });


    });



     it('Should verify the data dictionary validations on  PropertiesTab  PPE-113311', function () {
        documentListTab.selectAsset(AssetTitle);
        var response;
        functions.SetAgentForDctmApi("http://DMWRS41D-CON-08.portal.webmd.com:8080/pbws/");
        var accessToken = functions.GenerateApiAccessToken();
        response = functions.ExecuteDQLusingDCTMAPI(accessToken,"select i_chronicle_id, title from wbmd_company where any wbmd_site_only = '1001' and title != ' ' order by title");
        CopyrightTemplate.VerifyDropdownlistVal("wbmd_copyright_holder-input",response);
        
        response = functions.ExecuteDQLusingDCTMAPI(accessToken,"select i_chronicle_id, title from wbmd_person where any wbmd_person_role='7' and any wbmd_site_only = '1001' and title != ' ' order by title");
        CopyrightTemplate.VerifyDropdownlistVal("wbmd_legal_revr-input",response);
           
        


           

    });
    
});
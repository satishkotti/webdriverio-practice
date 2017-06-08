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
var HealthTemplate = require('./../../../common/actions/ImporthealthRef.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
var findTab = require('./../../../common/actions/findTab.actions');
var test = require("./../../../common/functions/functions.js");
var randomstring = require("randomstring");
var _ = require('underscore');
var moment = require('moment-timezone');

describe('Import Health Reference template- PPE-76804', function () {

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
            global.d2ConDataSettings.inputData.USImportHelathRefProfileName,
            global.d2ConDataSettings.inputData.ImportHelathArticleTemplate,
            AssetTitle,
            AssetName);
    });

     it('Verify  creation with only mandatory fields,Verify the error messages when mandatory fields are left blank for Import Health Reference template', function () {
        documentListTab.selectAsset(AssetTitle);
        HealthTemplate.IHealthrefMandatoryfieldsValidation();
        HealthTemplate.IHealthref_Othertab_AttributesNames();
    });


    it('Verify the checkout , cancel and checkin operation', function () {
        documentListTab.selectAsset(AssetTitle);
        contentTab.checkOut();
        CopyrightTemplate.CopyrightStatementText(CopyrightStatementText);
        browser.frameParent();
        contentTab.cancel();
        contentTab.checkOut();
        contentTab.Setimage("Thumbnail Image","Heart");
        var TImagelinkVal=contentTab.ImagelinkVal("Thumbnail Image");
        contentTab.Setimage("Media Asset","Heart");
        var MImagelinkVal=contentTab.ImagelinkVal("Media Asset");
        browser.frameParent();
        contentTab.checkIn();
    });

   it('Verify the Health Reference Template - Promote ,demote ,Power Promote,Publish functionality and Verify Copyright  rendition with WP renditions', function () {
      
        documentListTab.selectAsset(AssetTitle);
        cidName = propertiesTab.getChronicleIdAndName();
        objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        propertiesTab.setRequiredProperties(objName, 'Audio - Event', objName, objName, objName, objName, 'WebMD Health Poll', '2015 WebMD', 'ADD-ADHD (Adult)');
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





    

    
});
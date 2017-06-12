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
var _ = require('underscore')
var moment = require('moment-timezone');

describe('Import Health Reference template- PPE-76804', function () {

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
       
         repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.UKtestFolderPath);
        AssetTitle = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        AssetName = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.UKImportHelathRefProfileName,
            global.d2ConDataSettings.inputData.ImportHelathArticleTemplate,
            AssetTitle,
            AssetName);
    });

     it('Verify  creation with only mandatory fields,Verify the error messages when mandatory fields are left blank for Import Health Reference template', function () {
        documentListTab.selectAsset(AssetTitle);
        HealthTemplate.IHealthrefMandatoryfieldsValidation();
        HealthTemplate.propertyLabelValidation();
    });


     it('Should verify the data dictionary validations on  PropertiesTab -Content Classification:  PPE-115496', function () {
        documentListTab.selectAsset(AssetTitle);
        var response;
        functions.SetAgentForDctmApi(functions.getDataApiUrl())
        var accessToken = functions.GenerateApiAccessToken();
        response = functions.ExecuteDQLusingDCTMAPI(accessToken,"Select wbmd_disp_nm, wbmd_storage_val from wbmd_lookup where wbmd_lookup_type = 'business_reference' and wbmd_active=TRUE and ANY wbmd_site_only = '1006' order by wbmd_disp_nm");
        HealthTemplate.VerifyDispnmDropdownlistVal("wbmd_bus_ref-input",response);
    });

    it('Should verify the data dictionary validations on  PropertiesTab--Health Reference:  PPE-115496', function () {
        documentListTab.selectAsset(AssetTitle);
        var response;
        functions.SetAgentForDctmApi(functions.getDataApiUrl())
        var accessToken = functions.GenerateApiAccessToken();
        response = functions.ExecuteDQLusingDCTMAPI(accessToken,"Select wbmd_disp_nm, wbmd_storage_val from wbmd_lookup where wbmd_lookup_type = 'health_ref_type' and wbmd_active=TRUE and ANY wbmd_site_only = '1006' order by wbmd_disp_nm");
        HealthTemplate.VerifyDispnmDropdownlistVal("wbmd_med_ref_type-input",response);
        
    });

    
     it.skip('Should verify the data dictionary validations on  PropertiesTab-Publication:  PPE-115496', function () {
        documentListTab.selectAsset(AssetTitle);
        var response;
        functions.SetAgentForDctmApi(functions.getDataApiUrl())
        var accessToken = functions.GenerateApiAccessToken();
        response = functions.ExecuteDQLusingDCTMAPI(accessToken,"select i_chronicle_id, title from wbmd_publication where title  != ' ' and any wbmd_site_only  = '1006' and r_object_id not in (select r_object_id from wbmd_publication where  title  != ' ' and any wbmd_site_only =  '1001' and any r_version_label = 'Expired') order by title");
        HealthTemplate.VerifyDropdownlistVal("wbmd_publ-input",response);
        
    });

    it('Verify the checkout , cancel and checkin operation', function () {
        documentListTab.selectAsset(AssetTitle);
        contentTab.checkOut();
        contentTab.Titleinputsetvalue("Sample Test title");
        browser.frameParent();
        contentTab.cancel();
        contentTab.checkOut();
        // contentTab.Titleinputsetvalue("Sample Test title");
        // browser.frameParent();
        contentTab.Setimage("Thumbnail Image","Heart");
         TImagelinkVal=contentTab.ImagelinkVal("Thumbnail Image");
        browser.frameParent();
        contentTab.Setimage("Media Asset","Heart");
         MImagelinkVal=contentTab.ImagelinkVal("Media Asset");
        browser.frameParent();
        contentTab.sectionHeaderSetValue("Sample Sectionheader Test Data");
        browser.frameParent();
        contentTab.sectionTextSetValue("Sample SectionText Test Data");
        browser.frameParent();
        contentTab.highlightsSetValue("Sample highlights Test Test Data");
        browser.frameParent();
        contentTab.pullQuotesSetValue("Sample Pull quote Test Data");
        browser.frameParent();
        contentTab.citationsSetValue("Sample Citation Test Data")
        browser.frameParent();
        contentTab.RelatedLinkHeaderSetValue("Sample Related Header Test Data")
        browser.frameParent();
        contentTab.relatedLinksSetValue("Sample Related Link Test Data")
        
        browser.frameParent();
        contentTab.checkIn();
    });

   it('Verify the Health Reference Template - Promote ,demote ,Power Promote,Publish functionality and Verify Import health Ref  rendition with WP renditions', function () {
        browser.pause(5000);
        documentListTab.selectAsset(AssetTitle);
        cidName = propertiesTab.getChronicleIdAndName();
        objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        browser.pause(5000);
        propertiesTab.setRequiredProperties(objName, 'Audio - Narrative', objName, objName, objName, objName, 'American Council on Excercise', '2006 American Council on Exercise', 'ADD-ADHD (Adult)');
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

                     
                   var thumbimg="/webmd_uk"+Content[0].parent.content_section.cons_import_health_ref.thumbnail_image;

                    expect(Asset[0].parent.metadata_section.i_chronicle_id).to.equal(chronicleId);
                    expect(thumbimg).to.equal(TImagelinkVal);
                    expect(Content[0].parent.content_section.cons_import_health_ref.media_asset.$.path).to.equal(MImagelinkVal);

                      }));
        });
            

                     documentListTab.expireAsset(objName);
                     documentListTab.deleteArticle(objName, global.d2ConDataSettings.inputData.DeleteAllversions);
                     findTab.findbyId(chronicleId);

    });

    
});


describe.skip('Import Health Reference template- PPE-76804 - Scheduling tasks', function () {
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
             global.d2ConDataSettings.inputData.UKImportHelathRefProfileName,
            global.d2ConDataSettings.inputData.ImportHelathArticleTemplate,
            AssetTitle,
            AssetName);
        documentListTab.selectAsset(AssetTitle);
        propertiesTab.setRequiredProperties(objName, 'Audio - Narrative', objName, objName, objName, objName, 'American Council on Excercise', '2006 American Council on Exercise', 'ADD-ADHD (Adult)');
    });


    it('Verify Schedule Publish functionality on Import Health Reference template- PPE-76804', function () {
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

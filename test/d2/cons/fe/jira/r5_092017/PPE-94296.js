var Promise = require('bluebird');
var JSONPath = require('JSONPath');
var parseXml = require('./../../../common/components/parseXml');
var functions = require('./../../../common/functions/functions');
var Login = require('./../../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../../common/actions/documentListTab.actions');
var contentTab = require('./../../../common/actions/contentTab.actions');
var ckEditorMenu = require('./../../../common/actions/ckEditor.actions');
var moduleImage = require('./../../../common/actions/InlineImage.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
var randomstring = require("randomstring");
describe('Unable to edit inline images', function () {

    var chronicleId;
    var AssetTitle;
    var AssetName;
    var cidName;
     var objName;
    var textValue;
    var ImgUrl;

    before(function () {
        Login.login({
            url: functions.getEnvTestUrl(),
            username: functions.getQAPublicationUser().username,
            password: functions.getQAPublicationUser().password
        });

        browser.pause(10000);
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.testFolderPath);
        AssetTitle = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        AssetName = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.ArticleProfileName,
            global.d2ConDataSettings.inputData.ArticleTemplate,
            AssetTitle,
            AssetName);
        documentListTab.selectAsset(AssetTitle);
       

       
    });

    it('should select Section Text then Select Image and insert the image with properties', function () {
        contentTab.checkOut();
        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextMediaMenuClick();
        moduleImage.SelectImageSearch('Image', 'photo');
        
       
    });

    it('Verify the user is able to double-click an image that is inline with the article text in the Content window - PPE-129267', function () {
        moduleImage.ClickandUpdateProperties("Alttest",250,250,10,10) ;
        ImgUrl=moduleImage.getimagurl();
        browser.frameParent();
        contentTab.checkIn();

        
    });

    it('Should Verify the user is able to double-click an image that is inline with the article text in the Content window and update the image properties-PPE-129268 & PPE-129269 Verify the XML rendition after update the image properties.', function () {
        
        browser.pause(5000);
        documentListTab.selectAsset(AssetTitle);
        cidName = propertiesTab.getChronicleIdAndName();
        objName = cidName.objectName;
        chronicleId =cidName.chronicleId;
        browser.pause(5000);
        propertiesTab.setRequiredProperties(objName, 'News', objName, objName, objName, objName, 'WebMD Medical News', '2015 WebMD', 'ADD-ADHD (Adult)');
        documentListTab.assetPowerPromotePublishToStaging(AssetTitle);
     
        browser.call(function () {
            return Promise.resolve(
                parseXml.getXmlFromUrl(functions.getAtsScsFileUrl() + chronicleId, null).then(function (result) {

                    var Asset = JSONPath({
                        json: result,
                          path: "$..content_section",
                        resultType: 'all'
                    });

                       var chornc = JSONPath({
                        json: result,
                        path: "$..metadata_section",
                        resultType: 'all'
                    });

                   expect(chornc[0].parent.metadata_section.i_chronicle_id).to.equal(chronicleId);
                   expect(Asset[0].parent.content_section.cons_news.section_groups.section_group.section_text.p.img.$.height).to.equal('250');
                   expect(Asset[0].parent.content_section.cons_news.section_groups.section_group.section_text.p.img.$.width).to.equal('250');
                   expect(Asset[0].parent.content_section.cons_news.section_groups.section_group.section_text.p.img.$.src).to.equal(ImgUrl);

                  
                }));
        });
       
    });

  
});
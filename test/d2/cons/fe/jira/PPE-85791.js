var Promise = require('bluebird');
var JSONPath = require('JSONPath');
var parseXml = require('./../../common/components/parseXml');
var functions = require('./../../common/functions/functions');
var Login = require('./../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../common/actions/documentListTab.actions');
var contentTab = require('./../../common/actions/contentTab.actions');
var ckEditorMenu = require('./../../common/actions/ckEditor.actions');
var mModuleCodeOption = require('./../../common/actions/mModuleCode.actions');
var propertiesTab = require('./../../common/actions/propertiesTab.actions');
var moduleOption = require('./../../common/actions/Module.actions'); 
var randomstring = require("randomstring");

describe('Interactive Article - JavaScript Module', function () {

    var chronicleId;
    var jsCodeValue;
    before(function () {        
        browser.setViewportSize({
            width: 1920,
            height: 1080
        });

        Login.login({
                url: functions.getEnvTestUrl(),
                username: functions.getQAPublicationUser().username,
                password: functions.getQAPublicationUser().password
            });
        
    repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.testFolderPath);

    });

    beforeEach(function() {

   var AssetTitle=global.d2ConDataSettings.inputData.ArticleObjectName+randomstring.generate(2);
   var AssetName= global.d2ConDataSettings.inputData.ArticleDescription+randomstring.generate(2);
   
        workspaceMenu.createContent(
                global.d2ConDataSettings.inputData.ArticleProfileName,
                global.d2ConDataSettings.inputData.ArticleTemplate, 
                AssetTitle,
                AssetName);

        
            documentListTab.selectAsset(AssetTitle);
           contentTab.checkOut();
  });

  it.skip('Verify the Sizelabel and option is removed for Image,Video and Slideshow modules- US News', function () {
        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.moduleframe();
        moduleOption.moduleSelect('Image','heart');
        
        var sizelabel = moduleOption.moduleSizeLabel();
        expect(sizelabel).to.be.false;
        var sizefield = moduleOption.moduleSizeField();
        expect(sizefield).to.be.false;
        moduleOption.moduleCancel();

        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.moduleframe();
        moduleOption.moduleSelect('Video','heart');
        
        var sizelabel = moduleOption.moduleSizeLabel();
        expect(sizelabel).to.be.false;
        var sizefield = moduleOption.moduleSizeField();
        expect(sizefield).to.be.false;
        moduleOption.moduleCancel();

         contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.moduleframe();
        moduleOption.moduleSelect('Slideshow','heart');
        
        var sizelabel = moduleOption.moduleSizeLabel();
        expect(sizelabel).to.be.false;
        var sizefield = moduleOption.moduleSizeField();
        expect(sizefield).to.be.false;
        moduleOption.moduleCancel();
         contentTab.checkIn();
    });

      it('Verify the presence hare checkbox and Social Media Share name for Image module - US News', function () {
        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.moduleframe();
        moduleOption.moduleSelect('Image','heart');
        
        var socialshare = moduleOption.moduleSocialShare();
        expect(socialshare).to.be.true;
        moduleOption.moduleCancel();
        contentTab.checkIn();

    });

     it('Verify there is no share checkbox and Social Media Share name for Video,Slideshow module - US News', function () {
        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.moduleframe();
        moduleOption.moduleSelect('Video','heart');
        
        var socialshare = moduleOption.moduleSocialShare();
        expect(socialshare).to.be.false;
        moduleOption.moduleCancel();


        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.moduleframe();
        moduleOption.moduleSelect('Slideshow','heart');
        
        var socialshare = moduleOption.moduleSocialShare();
        expect(socialshare).to.be.false;
        moduleOption.moduleCancel();
        contentTab.checkIn();
        
    });

    it.skip('should verify the presence of the Social Share and absence of Size attribute for the Video type', function () {
        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.moduleframe();
        moduleOption.moduleSelect('Video','heart');
        var sizelabel = moduleOption.moduleSizeLabel();
        expect(sizelabel).to.be.false;
         var sizefield = moduleOption.moduleSizeField();
        expect(sizefield).to.be.false;
        var socialshare = moduleOption.moduleSocialShare();
        expect(socialshare).to.be.true;
        moduleOption.moduleCancel();
        contentTab.checkIn();

        
    });

    it.skip('should verify the presence of the Social Share and absence of Size attribute for the image type', function () {
        contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextModuleMenuClick();
        moduleOption.moduleframe();
        moduleOption.moduleSelect('Image','heart');
        var sizelabel = moduleOption.moduleSizeLabel();
        expect(sizelabel).to.be.false;
         var sizefield = moduleOption.moduleSizeField();
        expect(sizefield).to.be.false;
        var socialshare = moduleOption.moduleSocialShare();
        expect(socialshare).to.be.true;
        moduleOption.moduleTitle('QA');
        moduleOption.moduleInsert();
        //moduleOption.moduleCancel();
        contentTab.checkIn();
        
    });

   /* it('should select Section Text then Select Code and Insert 5000 characters for JS Module & Type Facebook', function () {
        contentTab.sectionTextSetValue("more sample test data");
        ckEditorMenu.sectionTextCodeMenuClick();
        mModuleCodeOption.addCodeAndTypeInsert(jsCodeValue, 
                    global.d2ConDataSettings.inputData.FacebookCodeType);        
        contentTab.checkIn();

        var cidName = propertiesTab.getChronicleIdAndName();
        var objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        propertiesTab.setRequiredProperties(objName,'ZZ - Dummy Content Classification',objName,objName,objName,objName,'No URL dummy publication','2015 WebMD','Cold and Flu')
        
        documentListTab.assetPowerPromotePublishToStaging(global.d2ConDataSettings.inputData.ArticleObjectName);
    });*/

    it.skip('should be part of scs rendition', function () {
         return Promise.resolve(
            parseXml.getXmlFromUrl(functions.getAtsScsFileUrl()+'091e9c5e8148cc85', null).then(function (result) {

                var expectedJsCode = ' '+jsCodeValue;
            var jsEmbedAssets = JSONPath({json: result,  path: "$..section_text.embeded_module[?(@.class =='wbmdembededmodule cke_widget_inline')]", resultType: 'all' });

                   //  expect(jsEmbedAssets.length).to.equal(1);

                  expect(jsEmbedAssets[0].parent.$.suppress_share).to.equal('false');
               //   expect(result.wbmd_asset.content_section[0].cons_news[0].section_groups[0].section_group[0].section_text[0].embeded_module[0].$.suppress_share).to.equal('false');
              /*  expect(jsEmbedAssets.length).to.equal(1);
                expect(jsEmbedAssets[0].parent.$.jstype).to.equal('facebook');
                expect(jsEmbedAssets[0].parent.$.align).to.equal('');
                expect(jsEmbedAssets[0].parent.$.asset_description).to.equal('');
                expect(jsEmbedAssets[0].parent.$.asset_title).to.equal('');
                expect(jsEmbedAssets[0].parent.$.chronic_id).to.equal('');
                expect(jsEmbedAssets[0].parent.$.class).to.equal('wbmdembededmodule cke_widget_inline');
                expect(jsEmbedAssets[0].parent.$.module_title).to.equal('');
                expect(jsEmbedAssets[0].parent.$.thumbnail).to.equal('');
                
                var jsBlobVal = JSONPath({json: result,  path: "$..section_text.embeded_module.jsblob" });
               // expect(jsEmbedAssets.length).to.equal(1);
               // expect(jsBlobVal[0]).to.equal(expectedJsCode);*/
        }));        
    });
});
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
        
        
       browser.pause(20000);
       mModuleCodeOption.RepositoryRefresh();
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.testFolderPath);
        workspaceMenu.createContent(
                global.d2ConDataSettings.inputData.ArticleProfileName,
                global.d2ConDataSettings.inputData.ArticleTemplate, 
                global.d2ConDataSettings.inputData.ArticleObjectName, 
                global.d2ConDataSettings.inputData.ArticleDescription);
            browser.pause(20000);
            documentListTab.selectAsset(global.d2ConDataSettings.inputData.ArticleObjectName);
            contentTab.checkOut();

         jsCodeValue = 'Test code field';
    });

     it.skip('should select Section Text then Select Code and Cancel', function () {
       contentTab.sectionTextSetValue("Sample Test Data");
        ckEditorMenu.sectionTextCodeMenuClick();
       mModuleCodeOption.addCodeAndTypeCancel('Test', global.d2ConDataSettings.inputData.FacebookCodeType);
      
        
       
        
    });

  

       
       it.skip('Should Verify default option for codetype -  PPE-102788', function () {
        contentTab.sectionTextSetValue("more sample test data");
        ckEditorMenu.sectionTextCodeMenuClick();
       
         mModuleCodeOption.VerifyAvlblyCodeType(jsCodeValue, "");     
            
            
         mModuleCodeOption.addCodeAndTypeCancel(jsCodeValue, 
                    global.d2ConDataSettings.inputData.FacebookCodeType);       
        
         
       
    });
       
      it.skip('Should Verify the availability of Look up values in Code Type -  PPE-102786', function () {
        
        contentTab.sectionTextSetValue("more sample test data");

        ckEditorMenu.sectionTextCodeMenuClick();
        var CodeTypes = global.d2ConDataSettings.inputData.CodeTypes;
              var j = 1;
            CodeTypes.split(',').forEach(function (x) {
              
                 mModuleCodeOption.VerifyAvlblyCodeType(jsCodeValue, x);     
            
            j++;
           });
         mModuleCodeOption.addCodeAndTypeCancel(jsCodeValue, 
                    global.d2ConDataSettings.inputData.FacebookCodeType);       
            
        
          
       
    });


 it('should select Section Text then Select Code and Insert 5000 characters for JS Module & Type Facebook', function () {
        contentTab.sectionTextSetValue("more sample test data");

        ckEditorMenu.sectionTextCodeMenuClick();
        mModuleCodeOption.addCodeAndTypeInsert(jsCodeValue, 
                    global.d2ConDataSettings.inputData.FacebookCodeType);    
        browser.pause(2000);              
        contentTab.checkIn();

        var cidName = propertiesTab.getChronicleIdAndName();
        var objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        propertiesTab.setRequiredProperties(objName,'ZZ - Dummy Content Classification',objName,objName,objName,objName,'No URL dummy publication','2015 WebMD','Cold and Flu')
        
        documentListTab.assetPowerPromotePublishToStaging(global.d2ConDataSettings.inputData.ArticleObjectName);

    });

   

    it('should be part of scs rendition', function () {
         return Promise.resolve(
            parseXml.getXmlFromUrl(functions.getAtsScsFileUrl()+chronicleId, null).then(function (result) {

                var expectedJsCode = ' '+jsCodeValue;
                var jsEmbedAssets = JSONPath({json: result,  path: "$..section_text.embeded_module[?(@.type =='jsembed')]", resultType: 'all' });

                expect(jsEmbedAssets.length).to.equal(1);
                expect(jsEmbedAssets[0].parent.$.jstype).to.equal('Youtube');
                expect(jsEmbedAssets[0].parent.$.class).to.equal('wbmdembededmodule cke_widget_inline');
                
                
                var jsBlobVal = JSONPath({json: result,  path: "$..section_text.embeded_module.jsblob" });
                expect(jsEmbedAssets.length).to.equal(1);
                expect(jsBlobVal[0]).to.equal(expectedJsCode);
        }));        
    });


     it.skip('should verify Stored under webmd/web_publisher_list/lookups/interactive_articles -  PPE-PPE-103419', function () {

           
              
               browser.pause(20000);
               mModuleCodeOption.RepositoryRefresh();
              repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.LookupFolderPath);
              var CodeTypes = global.d2ConDataSettings.inputData.CodeTypes;
              var j = 1;
              CodeTypes.split(',').forEach(function (x) {
               
                documentListTab.selectAsset(x);
                
                mModuleCodeOption.VerifyAvlblycode_social("code_social");     
            
            j++;
           });

          

    });
});
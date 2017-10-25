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
var Snippetswidget = require('./../../../common/actions/Snippetswidget.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
var findTab = require('./../../../common/actions/findTab.actions');
var dqlEditorTab = require('./../../../common/actions/dqlEditor.actions');
var randomstring = require("randomstring");

describe('D2: Contextual viewing of all snippets on an article-PPE-121149', function () {

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

        

       
    });

  

    it('Verify there is Related Content widget-PPE-135559, column Names-PPE-135560,Verify the all related snippets when looking at a parent article-PPE-135561,Verify user able to navigate when click on snippet article-PPE-135562.', function () {

        browser.pause(5000);
        var wbmd_ext_id = "091e9c5e80006aab,091e9c5e80011cb1,091e9c5e812f06f6,091e9c5e814bbca3";
        wbmd_ext_id.split(',').forEach(function (id) {

               findTab.findbyId(id);
               browser.pause(5000);
               Snippetswidget.selectversions();
               Snippetswidget.ValidateRelatedContedheaders();
               Snippetswidget.SelectSnippetAsset();
               browser.frameParent();
               
        });

 });
           it('Verify the all related snippets when looking at a parent article-PPE-135561', function () {
                browser.pause(5000);
               findTab.findbyId("091e9c5e8000799f");
               browser.pause(5000);
               Snippetswidget.selectversions();
               Snippetswidget.SelectSnippetAsset();
               browser.frameParent();
               dqlEditorTab.dqlEditorWidget();
               Snippetswidget.Verifyrelatedassetdata("select r_object_id,object_name,title,wbmd_ext_id,wbmd_prim_revw_dt,r_modify_date,r_modifier from wbmd_cons_article where wbmd_ext_id like '%091e9c5e8000799f%' and i_cabinet_id = '0c1e9c5e80002a25' and r_object_id not in(select r_object_id from wbmd_cons_article where any r_version_label='Expired') union select r_object_id,object_name,title,wbmd_ext_id,wbmd_prim_revw_dt,r_modify_date,r_modifier from wbmd_cons_article where i_chronicle_id = '091e9c5e8000799f' and i_cabinet_id = '0c1e9c5e80002a25'  and r_object_id not in(select r_object_id from wbmd_cons_article where any r_version_label='Expired') order by 1 desc");
                
        });


        
   

   
  
  
});
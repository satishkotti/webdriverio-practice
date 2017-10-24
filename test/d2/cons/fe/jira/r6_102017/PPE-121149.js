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

   
  
  
});
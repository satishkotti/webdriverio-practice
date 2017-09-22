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
var Duplicatename = require('./../../../common/actions/DuplicateName.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
var findTab = require('./../../../common/actions/findTab.actions');
var test = require("./../../../common/functions/functions.js");
var randomstring = require("randomstring");
var _ = require('underscore');
var moment = require('moment-timezone');

describe('Duplicate name to include extention- PPE-96704', function () {

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
       
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.testFolderPath);
        AssetTitle = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        AssetName = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.ArticleProfileName,
            global.d2ConDataSettings.inputData.ArticleTemplate,
            AssetTitle,
            AssetName);
    });

   

    it('Verify the error messages when creating Asset with Duplicate name to include xml - PPE-128501 ', function () {
         Duplicatename.DuplicateContentcreate(
            global.d2ConDataSettings.inputData.ArticleProfileName,
            global.d2ConDataSettings.inputData.ArticleTemplate,
            AssetTitle +".xml",
            AssetName +".xml");
            browser.pause(5000);
            Duplicatename.DuplicateNamevalidation(AssetTitle);
          
    });


       it('Verify while creating asset with duplicate name in same folder, it should not allow to create duplicate or duplicate_(1). PPE-129035 ', function () {
         
         workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.ArticleProfileName,
            global.d2ConDataSettings.inputData.ArticleTemplate,
            AssetTitle,
            AssetName);

             browser.pause(5000);
            Duplicatename.DuplicateNamevalidation(AssetTitle);
           
    });


    
      it('Create Asset with Duplicate name to include extention with .jpg,.gif - PPE-128502 ', function () {
       repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.testFolderPath);
       workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.ArticleProfileName,
            global.d2ConDataSettings.inputData.ArticleTemplate,
            AssetTitle+".jpg",
            AssetName+".jpg");

            documentListTab.selectAsset(AssetTitle+".jpg");
            contentTab.checkOut();
             browser.frameParent();
             contentTab.checkIn();
    });

    
      it(' verify able to create asset with duplicate name in another folder - PPE-130039.', function () {
          
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.USFolderpath);
          workspaceMenu.createContent(
              global.d2ConDataSettings.inputData.ArticleProfileName,
              global.d2ConDataSettings.inputData.ArticleTemplate,
              AssetTitle,
              AssetName);
         browser.pause(5000);
          AssetTitle = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
          AssetName = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
          
        workspaceMenu.createContent(
              global.d2ConDataSettings.inputData.ArticleProfileName,
              global.d2ConDataSettings.inputData.ArticleTemplate,
              AssetTitle +".xml",
              AssetName +".xml");

           
    });

      it('Verify while creating  asset with duplicate.xml  name in same folder, it should not allow to create duplicate.xml or duplicate_(1).xml.  PPE--130040  ', function () {
        
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.USFolderpath);
       workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.ArticleProfileName,
            global.d2ConDataSettings.inputData.ArticleTemplate,
            AssetTitle +".xml",
            AssetName +".xml");
             browser.pause(5000);
            Duplicatename.DuplicateNamevalidation(AssetTitle);
           
    });

    



      

    

  });
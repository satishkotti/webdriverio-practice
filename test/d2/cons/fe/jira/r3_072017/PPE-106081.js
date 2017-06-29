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

describe('RMQ - Save as you go-US- PPE-106081', function () {

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
            global.d2ConDataSettings.inputData.QUizAritcleTemplate,
            AssetTitle,
            AssetName);
    });

     it('Verify the Checkout and Checkin functionality on Quiz Template -PPE-117563  & Cancel Checkout functionality on Quiz Template -PPE-117564', function () {
        documentListTab.selectAsset(AssetTitle);
        contentTab.checkOut();
        browser.frameParent();
        contentTab.cancel();
        browser.frameParent();
        contentTab.checkOut();
        browser.frameParent();
        contentTab.checkIn();
    });


     it('Verify the Question Text,Question Type,Result Text Changes from required to optional on Quiz Template PPE-117565,PPE-117566,PPE-117567', function () {
        documentListTab.selectAsset(AssetTitle);
        contentTab.checkOut();
        browser.frameParent();
        contentTab.checkIn();
        cidName = propertiesTab.getChronicleIdAndName();
        objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        propertiesTab.setRequiredProperties(objName, 'ZZ - Dummy Content Classification', objName, objName, objName, objName, 'No URL dummy publication', '2015 WebMD', 'ADD-ADHD (Adult)')
        documentListTab.assetPowerPromotePublishToStaging(objName);
        browser.pause(5000);
        browser.call( function()
        {
             return parseXml.getXmlFromUrl(functions.getAtsScsFileUrl() + chronicleId, null).then(function (result) {

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
                   var questiontext=Content[0].parent.content_section.quiz.questions.question.qtext.p;
                   var Qtype=Content[0].parent.content_section.quiz.questions.question.qtype;
                   var Resulttext=Content[0].parent.content_section.quiz.results.result.restext.p;
                    expect(Asset[0].parent.metadata_section.chronic_id).to.equal(chronicleId);
                    expect(questiontext).to.equal(undefined);
                    expect(Qtype).to.equal("");
                    expect(Resulttext).to.equal(undefined);



            })
        });
    });
    
    it('Verify the  Quiz Template with Question Text,Question Type,Result Text data - PPE-117565,PPE-117566,PPE-117567', function () {
        documentListTab.selectAsset(AssetTitle);
        contentTab.checkOut();
        contentTab.QuestionTextSetValue("Question Text");
        browser.frameParent();
        contentTab.QuestiontypeSelectText();
        browser.frameParent();
        contentTab.ResultTextSetValue("Result Text");
        browser.frameParent();
        contentTab.checkIn();
        documentListTab.assetPowerPromotePublishToStaging(objName);
        browser.pause(5000);

        browser.call( function()
        {
             return parseXml.getXmlFromUrl(functions.getAtsScsFileUrl() + chronicleId, null).then(function (result) {

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
                   var questiontext=Content[0].parent.content_section.quiz.questions.question.qtext.p;
                   var Qtype=Content[0].parent.content_section.quiz.questions.question.qtype;
                   var Resulttext=Content[0].parent.content_section.quiz.results.result.restext.p;
                  
                    expect(Asset[0].parent.metadata_section.chronic_id).to.equal(chronicleId);
                    expect(questiontext.trim()).to.equal("Question Text");
                    expect(Qtype.trim()).to.equal("Radio");
                    expect(Resulttext.trim()).to.equal("Result Text");



            })
        });
    });

   

});

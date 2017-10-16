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
       
     /*    repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.testFolderPath);
        AssetTitle = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        AssetName = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.ArticleProfileName,
            global.d2ConDataSettings.inputData.QUizAritcleTemplate,
            AssetTitle,
            AssetName);*/
    });

     it('Verify the Checkout and Checkin functionality on Quiz Template -PPE-117563  & Cancel Checkout functionality on Quiz Template -PPE-117564', function () {
       // documentListTab.selectAsset(AssetTitle);
        documentListTab.selectAsset("QATestAsset1AM6Twy");
       /* contentTab.checkOut();
      /*  contentTab.QuestionTextSetValue("QAQuestionText");
        browser.frameParent();
        contentTab.Setimage("Question Media","Heart");
        var QmedialinkVal=contentTab.ImagelinkVal("Question Media");
        browser.frameParent();
        contentTab.QuestiontypeSelectText();
        browser.frameParent();
        contentTab.DefaultExplanationSetValue("QADefaultExplanation");
        browser.frameParent();
        contentTab.AnswerTextSetValue("QAAnswerText");
        browser.frameParent();
        contentTab.Setimage("Answer Media","Heart");
        var AmedialinkVal=contentTab.ImagelinkVal("Answer Media");
        browser.frameParent();
        contentTab.AnswerValueSetValue("1");
        browser.frameParent();
        contentTab.AnswerExplanationSetValue("QAAnswerExplanation");
        browser.frameParent();
        contentTab.checkIn();
        browser.click("//h2[span[contains(.,'Question Text')]]//following-sibling::div//div/p");
        browser.keys("q");
        browser.keys("a");
        browser.click("//a[@class='spmenu-button ng-scope']");
        var question= browser.getText("//a[contains(.,'QAQuestionText')]");
        var questionlen = question.length;
         var answer= browser.getText("//a[contains(.,'QAAnswerText')]");
        var answer = answer.length;*/
          cidName = propertiesTab.getChronicleIdAndName();
        objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        propertiesTab.setRequiredPropertiesWithPrimaryreviewDate(objName, 'Tool - RMQ', objName, objName, objName, objName, 'WebMD Health Tools',
    '2015 WebMD', 'ADD-ADHD (Adult)','16 Oct 2017 19:08:00');
        documentListTab.assetPowerPromotePublishToStaging(objName);
         browser.call(function () {
            return Promise.resolve(
                parseXml.getXmlFromUrl(functions.getAtsScsFileUrl() + "091e9c5e817be7a1", null).then(function (result) {
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
                    var qtext= Content[0].parent.content_section.quiz.questions.question[0].qtext.p;
                    var qtext= qtext.replace(/(?:\r\n\t|\r|\n|\t)/g, '');
                    var qtext= qtext.trim();
                    expect(qtext).to.equal("QAQuestionText");
                //    expect(Content[0].parent.content_section.quiz.questions.question[0].qtext.p).to.equal("QAQuestionText");
                    expect(Content[0].parent.content_section.quiz.questions.question[0].qmedia.loc).to.equal("/webmd/consumer_assets/site_images/articles/health_tools/how_heart_disease_affects_your_body_slideshow/493ss_medical_images_rm_infection_in_heart_tissue.jpg");
                    expect(Content[0].parent.content_section.quiz.questions.question[0].qtype).to.equal("Radio");
                    
                     var dexpl= Content[0].parent.content_section.quiz.questions.question[0].defexp.p;
                    var dexpl= dexpl.replace(/(?:\r\n\t|\r|\n|\t)/g, '');
                    var dexpl= dexpl.trim();
                    expect(dexpl).to.equal("QADefaultExplanation");
                 //   expect(Content[0].parent.content_section.quiz.questions.question[0].defexp.p).to.equal("QADefaultExplanation");
                  
                     var atext= Content[0].parent.content_section.quiz.questions.question[0].answers.answer.atext.p;
                    var atext= atext.replace(/(?:\r\n\t|\r|\n|\t)/g, '');
                    var atext= atext.trim();
                    expect(atext).to.equal("QAAnswerText");
                   // expect(Content[0].parent.content_section.quiz.questions.question[0].answers.answer.atext.p).to.equal("QAAnswerText");
                     expect(Content[0].parent.content_section.quiz.questions.question[0].answers.answer.amedia.loc).to.equal("/webmd/consumer_assets/site_images/articles/health_tools/how_heart_disease_affects_your_body_slideshow/493ss_medical_images_rm_infection_in_heart_tissue.jpg");
                      expect(Content[0].parent.content_section.quiz.questions.question[0].answers.answer.aweight).to.equal("1");
                    
                     var aexpl= Content[0].parent.content_section.quiz.questions.question[0].answers.answer.aexpl.p;
                    var aexpl= aexpl.replace(/(?:\r\n\t|\r|\n|\t)/g, '');
                    var aexpl= aexpl.trim();
                    expect(aexpl).to.equal("QAAnswerExplanation");
                  //    expect(Content[0].parent.content_section.quiz.questions.question[0].answers.answer.aexpl.p).to.equal("QAAnswerExplanation");
//
                      var qtext= Content[0].parent.content_section.quiz.questions.question[1].qtext.p;
                    var qtext= qtext.replace(/(?:\r\n\t|\r|\n|\t)/g, '');
                    var qtext= qtext.trim();
                    expect(qtext).to.equal("QAQuestionText");
                //    expect(Content[0].parent.content_section.quiz.questions.question[0].qtext.p).to.equal("QAQuestionText");
                    expect(Content[0].parent.content_section.quiz.questions.question[1].qmedia.loc).to.equal("/webmd/consumer_assets/site_images/articles/health_tools/how_heart_disease_affects_your_body_slideshow/493ss_medical_images_rm_infection_in_heart_tissue.jpg");
                    expect(Content[0].parent.content_section.quiz.questions.question[1].qtype).to.equal("Radio");
                    
                     var dexpl= Content[0].parent.content_section.quiz.questions.question[1].defexp.p;
                    var dexpl= dexpl.replace(/(?:\r\n\t|\r|\n|\t)/g, '');
                    var dexpl= dexpl.trim();
                    expect(dexpl).to.equal("QADefaultExplanation");
                 //   expect(Content[0].parent.content_section.quiz.questions.question[0].defexp.p).to.equal("QADefaultExplanation");
                  
                     var atext= Content[0].parent.content_section.quiz.questions.question[0].answers.answer.atext.p;
                    var atext= atext.replace(/(?:\r\n\t|\r|\n|\t)/g, '');
                    var atext= atext.trim();
                    expect(atext).to.equal("QAAnswerText");
                   // expect(Content[0].parent.content_section.quiz.questions.question[0].answers.answer.atext.p).to.equal("QAAnswerText");
                     expect(Content[0].parent.content_section.quiz.questions.question[0].answers.answer.amedia.loc).to.equal("/webmd/consumer_assets/site_images/articles/health_tools/how_heart_disease_affects_your_body_slideshow/493ss_medical_images_rm_infection_in_heart_tissue.jpg");
                      expect(Content[0].parent.content_section.quiz.questions.question[0].answers.answer.aweight).to.equal("1");
                    
                     var aexpl= Content[0].parent.content_section.quiz.questions.question[1].answers.answer.aexpl.p;
                    var aexpl= aexpl.replace(/(?:\r\n\t|\r|\n|\t)/g, '');
                    var aexpl= aexpl.trim();
                    expect(aexpl).to.equal("QAAnswerExplanation");
                  //    expect(Content[0].parent.content_section.quiz.questions.question[0].answers.answer.aexpl.p).to.equal("QAAnswerExplanation");

                    


                      }));
        });


    });

   

});

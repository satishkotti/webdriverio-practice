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
var relationsTab = require('./../../../common/actions/relationTab.actions');
var mModuleBulletOption = require('./../../../common/actions/mModuleBullet.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
var randomstring = require("randomstring");
var moment = require('moment-timezone');

describe('Regression - Port Defects', function () {

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

    });
    it('PORT: D2 dates must show time in addition to date- PPE-106638, PORT: Placeholder date format is different from format selected through Date field - PPE-78979', function () {
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.testFolderPath);
        AssetTitle = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        AssetName = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.ArticleProfileName,
            global.d2ConDataSettings.inputData.ArticleTemplate,
            AssetTitle,
            AssetName);
        documentListTab.selectAsset(AssetTitle);
        cidName = propertiesTab.getChronicleIdAndName();
        objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
        var dateTimeStamp = moment.tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
        dateTimeStamp = moment(dateTimeStamp);
        dateTimeStamp = moment(dateTimeStamp, "MM/DD/YYYY hh:mm:ss")
                    .add(00, 'seconds')
                    .add(20, 'minutes').format('MM/DD/YYYY hh:mm:ss');
        console.log(dateTimeStamp);
        propertiesTab.DateTimeValidation(objName, 'News', objName, objName, objName, objName, 'WebMD Medical News', '2015 WebMD', 'ADD-ADHD (Adult)', dateTimeStamp);
    });
    it('PORT: Timed Publish - Full Date/Time needed - PPE-81033', function () {
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.testFolderPath);
        AssetTitle = global.d2ConDataSettings.inputData.ArticleObjectName + randomstring.generate(2);
        AssetName = global.d2ConDataSettings.inputData.ArticleDescription + randomstring.generate(2);
        workspaceMenu.createContent(
            global.d2ConDataSettings.inputData.ArticleProfileName,
            global.d2ConDataSettings.inputData.ArticleTemplate,
            AssetTitle,
            AssetName);
        documentListTab.selectAsset(AssetTitle);
        cidName = propertiesTab.getChronicleIdAndName();
        objName = cidName.objectName;
        chronicleId = cidName.chronicleId;
         var dateTimeStamp = moment.tz('Asia/Calcutta').format('YYYY-MM-DD HH:mm:ss');
        dateTimeStamp = moment(dateTimeStamp);
        dateTimeStamp = moment(dateTimeStamp, "MM/DD/YYYY HH:mm:ss")
                    .add(00, 'seconds')
                    .add(20, 'minutes').format('MM/DD/YYYY HH:mm:ss');
         dateStamp = moment.tz('Asia/Calcutta').format('MM/DD/YYYY hh:mm:ss');
         dateStamp = moment(dateStamp);
         dateStamp = moment(dateStamp, "MM/DD/YYYY hh:mm:ss")
                    .add(00, 'seconds')
                    .add(20, 'minutes').format('MM/DD/YYYY hh:mm:ss');

         console.log(dateStamp);
        propertiesTab.PublishDateTimeValidation(objName, 'News', objName, objName, objName, objName, 'WebMD Medical News', '2015 WebMD', 'ADD-ADHD (Adult)', dateTimeStamp);
        documentListTab.powerPromoteTimeStampValidation(objName, dateStamp);
    });

});
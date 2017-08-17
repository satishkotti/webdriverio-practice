var functions = require('./../../../common/functions/functions');
var login = require('./../../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../../common/actions/workspace.menu.actions');
var dqlEditorTab = require('./../../../common/actions/dqlEditor.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
var findTab = require('./../../../common/actions/findTab.actions');
var randomstring = require("randomstring");

describe('DQL editor- PPE-30680', function () {
    var randomSubject;
    var updateSubject;
    before(function () {
        login.loginWithNewWindow({
            url: functions.getEnvTestUrl(),
            username: functions.getQAPublicationUser().username,
            password: functions.getQAPublicationUser().password
        });
        randomSubject = "Subject_" + randomstring.generate(5);
        subject = randomSubject + "' ";
        updateSubject = global.d2ConDataSettings.inputData.updatequery + subject + global.d2ConDataSettings.inputData.updateCondition;

    });

    it('Verify there is DQL editor Widget- PPE-126063', function () {
        dqlEditorTab.dqlEditorWidget();
    })
    it('Verify the DQL widget options- PPE-126064, Verify Max Results option for a DQL on Widget - PPE-126071', function () {
        dqlEditorTab.dqlEditiorOption();
    })
    it('Verify execution of Select Query through DQL widget- PPE-126065', function () {
        dqlEditorTab.dqlEditorQueryExecution(global.d2ConDataSettings.inputData.selectquery, global.d2ConDataSettings.inputData.queryresult);
    })
    it('Verify execution of Select Query through DQL widget-  PPE-126067 ', function () {
        dqlEditorTab.dqlEditorQueryUpdate(updateSubject, global.d2ConDataSettings.inputData.selectquery, randomSubject);
    })
    it('Verify option for conversion of DQL to SQL- PPE-126070', function () {
        dqlEditorTab.dqlEditorWidget();
        dqlEditorTab.dqlEditorSQLQuery(global.d2ConDataSettings.inputData.DQLQuery, global.d2ConDataSettings.inputData.WPSQLQuery);
    })

});
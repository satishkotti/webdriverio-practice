var Promise = require('bluebird');
var JSONPath = require('JSONPath');
var parseXml = require('./../../common/components/parseXml');
var functions = require('./../../common/functions/functions');
var Login = require('./../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../common/actions/documentListTab.actions');
var propertiesTab = require('./../../common/actions/propertiesTab.actions');

describe('News Team - Customization Template PPE-98169', function () {
    before(function () {
        Login.login({
            url: functions.getEnvTestUrl(),
            username: functions.getQANewsUser().username,
            password: functions.getQANewsUser().password
        });
        browser.pause(10000);
        repositoryBrowserTab.openFolder(global.d2ProfDataSettings.inputData.testFolderPath);
    });

    var newsObjectname = global.d2ProfDataSettings.inputData.NewsArticleObjectName;
    var objectName = global.d2ProfDataSettings.inputData.ArticleObjectName;
    it('Shouldbe able to create the News article with a user in News group', function () {

        workspaceMenu.createContent(global.d2ProfDataSettings.inputData.ArticleProfileName,
            global.d2ProfDataSettings.inputData.ArticleTemplate,
            newsObjectname,
            global.d2ProfDataSettings.inputData.ContentType);
        documentListTab.selectAsset(newsObjectname);
        var cidName = propertiesTab.getChronicleIdAndName();
        var objName = cidName.objectName;
        var title = cidName.title;
        propertiesTab.setRequiredProperties(objName, objName, objName, global.d2ProfDataSettings.inputData.LeadSpecialty,
            global.d2ProfDataSettings.inputData.ContentDeveloper);
        expect(newsObjectname).to.equal(title);
    });

    it('Should display the properties of News article for user that belongs to News group PPE-98169', function () {
        browser.pause(2000);
        var isexits = "";
        documentListTab.selectAsset(newsObjectname);
        isexits = propertiesTab.verifyNewsProperties(global.d2ProfDataSettings.inputData.newsPropertiesLabels.split(','));
        var data = propertiesTab.getPropertiesValues();
        expect(isexits).to.equal("");
        expect(data).to.equal("None");
    });

    it('Should not display properties of News article for user that do not belong to Non-News group PPE-98169', function () {
        Login.logout();
        Login.login({
            url: functions.getEnvTestUrl(),
            username: functions.getQAPublicationUser().username,
            password: functions.getQAPublicationUser().password
        });

        repositoryBrowserTab.openFolder(global.d2ProfDataSettings.inputData.testFolderPath);
        workspaceMenu.createContent(global.d2ProfDataSettings.inputData.ProfileName,
            global.d2ProfDataSettings.inputData.ArticleTemplate,
            objectName, global.d2ProfDataSettings.inputData.ContentType);

        var cidName = propertiesTab.getChronicleIdAndName();
        var objName = cidName.objectName;
        var title = cidName.title;
        propertiesTab.setRequiredProperties(objName, objName, objName, global.d2ProfDataSettings.inputData.LeadSpecialty,
            global.d2ProfDataSettings.inputData.ContentDeveloper);

        var basicInfo = propertiesTab.verifyBasciInfoTabProperties(global.d2ProfDataSettings.inputData.basicInfoTab.split(','));
        var articleinfo = propertiesTab.verifyArticleTabProperties(global.d2ProfDataSettings.inputData.articleTab.split(','));
        expect(objectName).to.equal(title);
        expect(basicInfo).to.equal("");
        expect(articleinfo).to.equal("");
    });

});
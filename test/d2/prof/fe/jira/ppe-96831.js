var Promise = require('bluebird');
var JSONPath = require('JSONPath');
var parseXml = require('./../../common/components/parseXml');
var functions = require('./../../common/functions/functions');
var Login = require('./../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../common/actions/documentListTab.actions');
var propertiesTab = require('./../../common/actions/propertiesTab.actions');


describe('Slide Presentation PPE-96831', function () {
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
        repositoryBrowserTab.openFolder(global.d2ProfDataSettings.inputData.SlideFolderPath);
    });

    var  slideObjectname= global.d2ProfDataSettings.inputData.SlideArticleObjectName;
    //var objectName=global.d2ProfDataSettings.inputData.ArticleObjectName;
    console.log("obj1" + slideObjectname);
    //console.log("obj1" + objectName);
    it('Verify Slide Article Template creation with only mandatory fields', function () {
       
        workspaceMenu.createContent(global.d2ProfDataSettings.inputData.ProfileName,
                    global.d2ProfDataSettings.inputData.SlideArticleTemplate, 
                    slideObjectname, 
                    global.d2ProfDataSettings.inputData.SlideContentType);
        documentListTab.selectAsset(slideObjectname);
        var cidName = propertiesTab.getChronicleIdAndName();
        var objName = cidName.objectName;
        var title = cidName.title;
        propertiesTab.setRequiredProperties(objName,objName,objName,global.d2ProfDataSettings.inputData.LeadSpecialty,
                    global.d2ProfDataSettings.inputData.ContentDeveloper);
        expect(slideObjectname).to.equal(title);
    });
});



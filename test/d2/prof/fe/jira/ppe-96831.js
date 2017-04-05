var Promise = require('bluebird');
var JSONPath = require('JSONPath');
var parseXml = require('./../../common/components/parseXml');
var functions = require('./../../common/functions/functions');
var Login = require('./../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../common/actions/documentListTab.actions');
var propertiesTab = require('./../../common/actions/propertiesTab.actions');
var ContentTab = require('./../../common/actions/contentTab.actions');
var  slideObjectname= global.d2ProfDataSettings.inputData.SlideArticleObjectName;

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
        workspaceMenu.createContent(global.d2ProfDataSettings.inputData.ProfileName,
                    global.d2ProfDataSettings.inputData.SlideArticleTemplate, 
                    slideObjectname, 
                    global.d2ProfDataSettings.inputData.SlideContentType);
        documentListTab.selectAsset(slideObjectname);

    });

    it('Verify the messages when mandatory fields are left blank for Slide Article template', function () {
        var AlertMessage = propertiesTab.verifyMandatoryFieldsforProperties();
        expect(AlertMessage).to.be.true;
    });

    it('Verify Slide Article Template creation with only mandatory fields', function () {
        var cidName = propertiesTab.getChronicleIdAndName();
        var objName = cidName.objectName;
        var title = cidName.title;
        propertiesTab.setRequiredProperties(objName,objName,objName,global.d2ProfDataSettings.inputData.LeadSpecialty,
                    global.d2ProfDataSettings.inputData.ContentDeveloper);
        expect(slideObjectname).to.equal(title);
    });

    it('Verify Checkout and checkin functionality on Slide Article Template', function(){
        var cidName = propertiesTab.getChronicleIdAndName();
        var objName = cidName.objectName;
        ContentTab.checkOut();
        documentListTab.selectAsset(slideObjectname);
        var IsLocked = documentListTab.verifyLock(objName);
        expect(IsLocked).to.be.true;
        var IsInitialVersionVerified = documentListTab.verifyVersions(global.d2ProfDataSettings.inputData.InitialVersion);
        expect(IsInitialVersionVerified).to.be.true;
        ContentTab.checkIn();
        var IsCheckInVersionVerified = documentListTab.verifyVersions(global.d2ProfDataSettings.inputData.CheckedInVersion);
        expect(IsCheckInVersionVerified).to.be.true;
    });

    it('Verify Cancel Checkout functionality on Slide Article template', function(){
        ContentTab.checkOut();
        ContentTab.cancel();
    });
    
});



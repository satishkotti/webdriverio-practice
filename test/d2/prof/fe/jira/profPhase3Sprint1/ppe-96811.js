var functions = require('./../../../common/functions/functions');
var Login = require('./../../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../../common/actions/documentListTab.actions');
var profOutputAction = require('./../../../common/actions/profOutput.actions');


describe('Professional Output Verifications - PPE-96811 - US', function () {
    before(function () {
        
        Login.login({
        url: functions.getEnvTestUrl(),
        username: functions.getQAPublicationUser().username,
        password: functions.getQAPublicationUser().password
        });
        repositoryBrowserTab.openFolder(global.d2ProfDataSettings.inputData.testFolderPath);
    });

    var objName;
    var  profOutputObjectname = global.d2ProfDataSettings.inputData.ArticleObjectName;

    it('Should verify the navigation and profOutput article creation functionality - PPE-106131', function () {
        workspaceMenu.createOutputProfContent(global.d2ProfDataSettings.profOutputData.ProfileName,
                    global.d2ProfDataSettings.profOutputData.ArticleTemplate, 
                    profOutputObjectname, 
                    global.d2ProfDataSettings.profOutputData.outputType);
        documentListTab.selectAsset(profOutputObjectname);
    });

    it('Should verify the Output Type tab under Properties tab and all the displayed properties - PPE-106132, PPE-106136, PPE-106139', function () {
        profOutputAction.verifyProfOutputValues(profOutputObjectname);
        documentListTab.selectAsset(profOutputObjectname);
    });
    
     it('Should verify the Publishing tab under Properties tab and all the displayed properties - PPE-106136', function () {
        profOutputAction.verifyProfPublishingValues(profOutputObjectname);
        documentListTab.selectAsset(profOutputObjectname);
    });

     it('Should verify the Other tab under Properties tab and selected object version and type - PPE-106132, PPE-106136', function () {
        profOutputAction.verifyProfOtherValues(profOutputObjectname);
        documentListTab.selectAsset(profOutputObjectname);
    });

    it('Should verify the checkout, template data, checkin, promote/power promote and publishing - PPE-106134, PPE-106140, PPE-106141', function(){
        profOutputAction.checkOut();
        profOutputAction.setProfOutputData(global.d2ProfDataSettings.profOutputData.introText, global.d2ProfDataSettings.profOutputData.contentText);
        profOutputAction.checkIn();
        documentListTab.assetPowerPromotePublishToStaging(profOutputObjectname);
        profOutputAction.verifyPowerPromotePublishing(profOutputObjectname);
    });
  
      it('Verify the relations for the ProfOutput Versions- PPE-106133', function () {
        documentListTab.selectAsset(profOutputObjectname);
        profOutputAction.verifyProfOutputRelations();

    });
});



var contentTabUI = require('./../ui/contentTab');
var profOutputUI = require('./../ui/profOutput');
var propertiesTab = require('./../actions/propertiesTab.actions');
var externalWidget3Selector= "iframe[id*='oam_id==ExternalWidget-3!!oam_target_type==ExternalWidget']";
var externalWidget4Selector= "iframe[id*='oam_id==ExternalWidget-4!!oam_target_type==ExternalWidget']";

var profOutputObj = {
    checkOut: function(){
        contentTabUI.selectContenTab();
        var contentWidgetIFrameElement = browser.element(externalWidget4Selector);
        browser.frame(contentWidgetIFrameElement.value);
        contentTabUI.checkOut();
    },
    checkIn: function(){
        contentTabUI.checkIn();
    },
    setProfOutputData: function (introText, contentText) {
        var contentWidgetIFrameElement = browser.element(externalWidget4Selector);
        browser.frame(contentWidgetIFrameElement.value);
        profOutputUI.setProfOutputIntroText(introText);
        profOutputUI.setProfOutputContentText(contentText);
    },
    verifyProfOutputValues: function (profOutputObjectname ) {
        var cidName = propertiesTab.getObjectOutputTypeTab();
        objName = cidName.objectName;
        var title = cidName.title;
        var outputType = cidName.outputType;

        expect(objName).to.equal(profOutputObjectname);
        expect(title).to.equal(profOutputObjectname);
        expect(outputType).to.equal(global.d2ProfDataSettings.profOutputData.outputType);
    },
    verifyProfPublishingValues: function (profOutputObjectname ) {
        var cidName = propertiesTab.getProfOutputPublishingTab();
        var sysPublishingDate = cidName.sysPublishingDate;
        var expirationDate = cidName.expirationDate;
        expect(sysPublishingDate).to.equal(global.d2ProfDataSettings.profOutputData.defaultDateText);
        expect(expirationDate).to.equal(global.d2ProfDataSettings.profOutputData.defaultDateText);
    },
    verifyProfOtherValues: function (profOutputObjectname ) {
        var cidName = propertiesTab.getProfOutputOtherTab();
        var versionLabel = cidName.versionLabel;
        var objectType = cidName.objectType;
        expect(versionLabel).to.equal(global.d2ProfDataSettings.profOutputData.wipVersion);
        expect(objectType).to.equal(global.d2ProfDataSettings.profOutputData.objType);
    },
    verifyPowerPromotePublishing: function (profOutputObjectname ) {
        browser.pause(30000);
        var cidName = propertiesTab.getProfOutputPublishingTab();
        var sysPublishingDate = cidName.sysPublishingDate;
        expect(sysPublishingDate).to.not.equal(global.d2ProfDataSettings.profOutputData.defaultDateText);
        var cidName = propertiesTab.getProfOutputOtherTab();
        var versionLabel = cidName.versionLabel;
        expect(versionLabel).to.equal(global.d2ProfDataSettings.profOutputData.publishVersion);        
    },
    verifyProfOutputRelations: function() {
        profOutputUI.selectRelationTab();
        profOutputUI.profOutputRelation();
    }
}

module.exports = profOutputObj;
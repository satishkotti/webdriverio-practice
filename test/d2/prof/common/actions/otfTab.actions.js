var otfTabUI = require('./../ui/otfTab');
var contentTabUI = require('./../ui/contentTab');

module.exports = {
    selectOTFTab: function(shortTitle,subTitle,superTitle,leadSpecialty,contentDeveloper){
        otfTabUI.otfTabSelect();
    },
    selectExternalWidget: function(data) {
        contentTabUI.switchToExternalWidget3Frame();
    },
    verfiyIfElementExists: function(selectorVal) {
        var isExisting =  browser.isExisting(selectorVal);
        return isExisting;
    },
    verifyOTFHeader: function() {
        var objectTypeHeader = otfTabUI.objectTypeHeader();
        expect(objectTypeHeader).to.equal(global.d2ProfDataSettings.otfData.objectType);
        var objectNameHeader = otfTabUI.objectNameHeader();
        expect(objectNameHeader).to.equal(global.d2ProfDataSettings.otfData.objectName);
        var titleHeader = otfTabUI.titleHeader();
        expect(titleHeader).to.equal(global.d2ProfDataSettings.otfData.title);
        var statusHeader = otfTabUI.statusHeader();
        expect(statusHeader).to.equal(global.d2ProfDataSettings.otfData.status);
        var primaryHeader = otfTabUI.primaryHeader();
        expect(primaryHeader).to.equal(global.d2ProfDataSettings.otfData.primary);
        var linkHeader = otfTabUI.linkHeader();
        expect(linkHeader).to.equal(global.d2ProfDataSettings.otfData.link);
        var unlinkHeader = otfTabUI.unlinkHeader();
        expect(unlinkHeader).to.equal(global.d2ProfDataSettings.otfData.unlink);
    },
    verifyOTFValues: function(objName, newsObjectname){
        var objectTypeValue= otfTabUI.objectTypeValue();
        expect(objectTypeValue).to.equal(global.d2ProfDataSettings.otfData.article);
        var objectNameValue = otfTabUI.objectNameValue();
        expect(objectNameValue).to.equal(objName);
        var titleValue= otfTabUI.titleValue();
        expect(titleValue).to.equal(newsObjectname);
        var statusValue= otfTabUI.statusValue();
        expect(statusValue).to.equal(global.d2ProfDataSettings.otfData.wip);
        var linkImageExist = otfTabUI.linkImageExist();
        expect(linkImageExist).to.equal(true);
    },
    verifyOTFOutputVersionValues: function(){
        var objectTypeValueOV= otfTabUI.objectTypeValueOV();
        expect(objectTypeValueOV).to.equal(global.d2ProfDataSettings.otfData.outputVersion);
        var objectNameValueOV = otfTabUI.objectNameValueOV();
        expect(objectNameValueOV).to.equal(global.d2ProfDataSettings.otfData.text);
        var titleValueOV = otfTabUI.titleValueOV();
        expect(titleValueOV).to.equal(global.d2ProfDataSettings.otfData.transcript);
        var statusValueOV = otfTabUI.statusValueOV();
        expect(statusValueOV).to.equal(global.d2ProfDataSettings.otfData.active);
         //unable to validate the primary input radio button
         var isPrimaryOV = otfTabUI.isPrimaryOV();
         console.log("isPrimaryOV"+isPrimaryOV);        
    },
    verifyCreateOutputVersion: function(newsObjectname) {
        otfTabUI.verifyCreateOutputVersion(newsObjectname);
    },
    verifyNewOutputVersionData: function(newsObjectname) {
        var objectTypeValueNewOV= otfTabUI.objectTypeValueNewOV();
        console.log("objectTypeValueOV"+objectTypeValueNewOV);
        expect(objectTypeValueNewOV).to.equal(global.d2ProfDataSettings.otfData.outputVersion);
        var objectNameValueNewOV = otfTabUI.objectNameValueNewOV();
        console.log("objectNameValueOV"+objectNameValueNewOV);
        expect(objectNameValueNewOV).to.equal(global.d2ProfDataSettings.otfData.text);
        var titleValueNewOV= otfTabUI.titleValueNewOV();
        console.log("titleValueNewOV"+titleValueNewOV);
        expect(titleValueNewOV).to.equal(global.d2ProfDataSettings.otfData.transcript);
        var statusValueNewOV = otfTabUI.statusValueNewOV();
        console.log("statusValueNewOV"+statusValueNewOV);
        expect(statusValueNewOV).to.equal(global.d2ProfDataSettings.otfData.active);
         //unable to validate the primary input radio button
         var isPrimaryNewOV = otfTabUI.isPrimaryNewOV();
         console.log("isPrimaryNewOV"+isPrimaryNewOV);
    }
}
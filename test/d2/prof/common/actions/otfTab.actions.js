var otfTabUI = require('./../ui/otfTab');
var contentTabUI = require('./../ui/contentTab');
var maxWaitTimeInMs = 30000;

var otfTabActionObj = {
    selectOTFTab: function(shortTitle,subTitle,superTitle,leadSpecialty,contentDeveloper){
        otfTabUI.otfTabSelect();
    },

    selectOTFWidgetTab: function(){
        otfTabUI.selectOTFWidgetTab();
        

    },
    otfDefaultOutputversion: function(){
        contentTabUI.switchToExternalWidget3Frame();
        otfTabUI.otfRemoveDefaultoutputversion();
         browser.frameParent();
         otfTabUI.otfRemoveDefaultoutputversionPopup();
         contentTabUI.switchToExternalWidget3Frame();
         var textattribute = otfTabUI.otfDefaultoutputversionValidation();
         expect(textattribute).to.be.false;
         otfTabUI.otfLinkDefaultoutputversion();
         browser.frameParent();
         otfTabUI.otfDefaultoutputversion();
          contentTabUI.switchToExternalWidget3Frame();
         var textattribute = otfTabUI.otfDefaultoutputversionValidation();
         expect(textattribute).to.be.true;

    },
    selectExternalWidget: function() {
        contentTabUI.switchToExternalWidget3Frame();
    },
    verfiyIfElementExists: function(selectorVal) {
        browser.waitForVisible("//select[@ng-model='currentLocale']",maxWaitTimeInMs);
        var objectNameValue = otfTabUI.titleValue();
        expect(objectNameValue).to.equal(selectorVal);
        browser.click('#single-button');
        var isexits=browser.isExisting("//li[@ng-repeat='createItem in searchResponse.createItems']/a[text()='Generic Article']");
        expect(isexits).to.equal(false);
        browser.frameParent();
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
         console.log("isPrimaryOV:"+isPrimaryOV);        
    },
    verifyCreateOutputVersion: function(newsObjectname) {
        otfTabUI.verifyCreateOutputVersion(newsObjectname);
    },
    verifyNewOutputVersionData: function(newsObjectname) {
        browser.pause(20000);
        var otfTabSelector = otfTabUI.otfTabSelector();
        browser.click(otfTabSelector);
        var otfWidgetSelector = otfTabUI.otfWidgetSelector();
        browser.waitForExist(otfWidgetSelector, 30000);
        otfTabActionObj.selectExternalWidget();
        browser.waitForVisible("//table[@st-table='displayedCollection']/tbody/tr[3]/td[2]/span[@ng-style='getRowStyle(item.level)']", maxWaitTimeInMs);
        var objectTypeValueNewOV= otfTabUI.objectTypeValueNewOV();
        expect(objectTypeValueNewOV).to.equal(global.d2ProfDataSettings.otfData.outputVersion);
        var objectNameValueNewOV = otfTabUI.objectNameValueNewOV();
        expect(objectNameValueNewOV).to.equal("OutputVersion-"+newsObjectname);
        var titleValueNewOV= otfTabUI.titleValueNewOV();
        expect(titleValueNewOV).to.equal("OutputVersion-Title-"+newsObjectname);
        var statusValueNewOV = otfTabUI.statusValueNewOV();
        expect(statusValueNewOV).to.equal(global.d2ProfDataSettings.otfData.active);
         //unable to validate the primary input radio button
         var isPrimaryNewOV = otfTabUI.isPrimaryNewOV();
         console.log("isPrimaryNewOV:"+isPrimaryNewOV);
    },
    verifyMultipleOutputVersionCreation: function(newsObjectname) {
        otfTabUI.verifyMultipleOutputVersionCreation(newsObjectname);
    },
    verifySecondOutputVersionData: function(newsObjectname) {
        browser.pause(10000);
        var otfTabSelector = otfTabUI.otfTabSelector();
        browser.click(otfTabSelector);
        var otfWidgetSelector = otfTabUI.otfWidgetSelector();
        browser.waitForExist(otfWidgetSelector, 30000);
        otfTabActionObj.selectExternalWidget();
        browser.waitForVisible("//table[@st-table='displayedCollection']/tbody/tr[4]/td[2]/span[@ng-style='getRowStyle(item.level)']", maxWaitTimeInMs);
        var objectTypeValueSecondOV= otfTabUI.objectTypeValueSecondOV();
        expect(objectTypeValueSecondOV).to.equal(global.d2ProfDataSettings.otfData.outputVersion);
        var objectNameValueSecondOV = otfTabUI.objectNameValueSecondOV();
        expect(objectNameValueSecondOV).to.equal("OutputVersion-2-"+newsObjectname);
        var titleValueSecondOV= otfTabUI.titleValueSecondOV();
        expect(titleValueSecondOV).to.equal("OutputVersion-Title-2-"+newsObjectname);
        var statusValueSecondOV = otfTabUI.statusValueSecondOV();
        expect(statusValueSecondOV).to.equal(global.d2ProfDataSettings.otfData.active);
         //unable to validate the primary input radio button
         var isPrimarySecondOV = otfTabUI.isPrimarySecondOV();
         console.log("isPrimarySecondOV:"+isPrimarySecondOV);
    }
}

module.exports = otfTabActionObj;
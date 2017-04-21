var otfTabUI = require('./../ui/otfTab');
var contentTabUI = require('./../ui/contentTab');
var propertiesTabUI = require('./../ui/propertiesTab');
var maxWaitTimeInMs = 30000;

var otfTabActionObj = {
    selectOTFTab: function(shortTitle,subTitle,superTitle,leadSpecialty,contentDeveloper){
        otfTabUI.otfTabSelect();
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
    verifyOutputVersionOutputtypeIMP: function(OutputType) {
        otfTabActionObj.selectExternalWidget();
        otfTabUI.CreateOutputVersionIMPClick();
        OutputType.split(',').forEach(function (x) {               
            otfTabUI.verifyCreateOutputVersionIMP(x);
        });
        otfTabUI.CancelCreateOutputVersion();
        
    },
     verifyParentObjectIMP: function(objName) {
       
       otfTabUI.CreateOutputVersionIMPClick();
        var Parentobjname = otfTabUI.getParentObjectValue();
       
        
        expect(Parentobjname).to.equal(objName);
        otfTabUI.CancelCreateOutputVersion();
        
    },
    CreateOutputVersionIMP: function(OutputType) {
        
        otfTabUI.CreateOutputVersionIMPClick();
        otfTabUI.verifyCreateOutputVersionIMP(OutputType);
        otfTabUI.CreateCreateOutputVersion();
    },
    verifyNewOutputVersionData: function(objName) {
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
        expect(objectNameValueNewOV).to.equal(objName);
        var titleValueNewOV= otfTabUI.titleValueNewOV();
        expect(titleValueNewOV).to.equal(objName);
        var statusValueNewOV = otfTabUI.statusValueNewOV();
        expect(statusValueNewOV).to.equal(global.d2ProfDataSettings.otfData.active);
         //unable to validate the primary input radio button
         var isPrimaryNewOV = otfTabUI.isPrimaryNewOV();
         console.log("isPrimaryNewOV:"+isPrimaryNewOV);
    },
    verifyMultipleOutputVersionCreation: function(newsObjectname) {
        otfTabUI.verifyMultipleOutputVersionCreation(newsObjectname);
    },
    verifySecondOutputVersionData: function(objName) {
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
        expect(objectNameValueSecondOV).to.equal(objName);
        var titleValueSecondOV= otfTabUI.titleValueSecondOV();
        expect(titleValueSecondOV).to.equal(objName);
        var statusValueSecondOV = otfTabUI.statusValueSecondOV();
        expect(statusValueSecondOV).to.equal(global.d2ProfDataSettings.otfData.active);
         //unable to validate the primary input radio button
         var isPrimarySecondOV = otfTabUI.isPrimarySecondOV();
         console.log("isPrimarySecondOV:"+isPrimarySecondOV);
    },
    searchobject:function(objName,locale){
        otfTabUI.searchObject(objName,locale);
    },
    searchForAnAssetThroughOTF:function(searchdata,objName,locale){
    otfTabUI.searchForAnAssetThroughOTF(searchdata,objName,locale);
    var objectNameValue = otfTabUI.titleValue();
    expect(objectNameValue).to.equal(objName);
    browser.frameParent();
    propertiesTabUI.propertiesTabSelect();
    propertiesTabUI.edit();
    propertiesTabUI.titleSet("_updated");
    propertiesTabUI.leadSpecialtySet(global.d2ProfDataSettings.inputData.LeadSpecialty);
    propertiesTabUI.contentDeveloperSet(global.d2ProfDataSettings.inputData.ContentDeveloper);
    propertiesTabUI.save();
    contentTabUI.switchToExternalWidget3Frame();
    otfTabUI.searchForAnAssetThroughOTF(searchdata,"_updated",locale);
    var objectNameValue = otfTabUI.titleValue();
    expect(objectNameValue).to.equal("_updated");
    browser.frameParent();
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
}

module.exports = otfTabActionObj;
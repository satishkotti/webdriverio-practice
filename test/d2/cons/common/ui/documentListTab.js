var maxWaitTimeInMs = 30000;

var ppModalLabel = "Power Promote Confirmation Message";
var ppModalMsg = " Are you sure you want to power promote this document?"
var activeStateLbl = "Active";
var successPublishSysMsg = "Object has been made Active. Publish has been called.";

var documentListUIObj = {

    selectDocumentListTab: function () {
        browser.click("//span[text()='Document list']")
        browser.waitForExist("div.x-grid3-hd-inner.x-grid3-hd-object_name.x-component");
    },
    selectItemByName: function (assetName) {
        
        browser.waitForVisible("//span[@title='" + assetName + "']", maxWaitTimeInMs);
        browser.click("//span[@title='" + assetName + "']");
        browser.pause(1000);
    },
    powerPromote: function (assetName) {

        documentListUIObj.contextualMenuActivate(assetName);
        documentListUIObj.contextualMenuLifeCycleSelect();
        documentListUIObj.lifeCyclePowerPromoteSelect();
        documentListUIObj.powerPromoteConfirmDialogueOkSelect();
        documentListUIObj.powerPromoteResultsDialogueOkSelect(assetName);

    },
    publishToStaging: function(assetName){
        documentListUIObj.contextualMenuActivate(assetName);
        documentListUIObj.contextualMenuLifeCycleSelect();
        documentListUIObj.lifeCyclePublishSelect();
        documentListUIObj.publishToDialogueOkSelect('Staging');
    },
    contextualMenuActivate: function(assetName){
        browser.rightClick("//span[@title='" + assetName + "']");
        browser.waitForVisible("div.x-menu-list", maxWaitTimeInMs);
    },
    contextualMenuLifeCycleSelect: function()
    {
        browser.waitForExist("#x-menu-el-menuContextDocumentLifeCycle");
        browser.click("#x-menu-el-menuContextDocumentLifeCycle");
    },
    lifeCyclePowerPromoteSelect: function(){
          browser.waitForVisible("//a[text()='Power Promote']", maxWaitTimeInMs);
        //browser.waitForExist("//a[text()='Power Promote']");
        browser.click("//a[text()='Power Promote']");
    },
    lifeCyclePublishSelect: function(){
        browser.waitForExist("//a[text()='Publish']");
        browser.moveToObject("//a[text()='Publish']");
        browser.click("//a[text()='Publish']");
    },
    powerPromoteConfirmDialogueOkSelect: function(){
        browser.waitForVisible("div.modal-body > label", maxWaitTimeInMs);
        var ppModalLabel = browser.getText("div.modal-body > label");
        expect(ppModalLabel).to.equal(ppModalLabel);
        browser.click("button[ng-click='$confirm()']");
    },
    powerPromoteResultsDialogueOkSelect: function(assetName){

         browser.waitForVisible("div.modal-body > label", maxWaitTimeInMs);

/*
         browser.waitUntil(function () {
            return browser.getText("div.modal-body > label") === 'Power Promote Validation Results for the following assets:'
        }, maxWaitTimeInMs, 'expected Power Promote Validation Result Dialogue box.');
*/

        var objName = browser.getText("#validateTable > tbody > tr:nth-child(2) > td:nth-child(2)");
        var state = browser.getText("#validateTable > tbody > tr:nth-child(2) > td:nth-child(3)");
        var sysMsg = browser.getText("#validateTable > tbody > tr:nth-child(2) > td:nth-child(4)");
        expect(assetName).to.equal(objName);
        expect(state).to.equal(activeStateLbl);
        expect(sysMsg).to.equal(successPublishSysMsg);

        browser.click("button[ng-click='$confirm()']");
    },
    publishToDialogueOkSelect:function(lifeCycle){
        if(lifeCycle === ''){
            lifeCycle = 'Staging'
        }
        var selectorExp = "input[value='"+lifeCycle+"']";
        browser.waitForExist(selectorExp);
        browser.click(selectorExp);
        browser.click("div.modal-content > div.modal-footer > button.btn.btn-primary");
    }
}

module.exports = documentListUIObj;
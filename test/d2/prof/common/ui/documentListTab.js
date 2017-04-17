var maxWaitTimeInMs = 50000;

var ppModalLabel = "Power Promote Confirmation Message";
var ppModalMsg = " Are you sure you want to power promote this document?"
var activeStateLbl = "Active";
var approveStateLbl='Approved';
var schpublishmsg='Object has been Approved and will become Active on';
var successPublishSysMsg = "Object has been made Active.";
var stagingStateLbl = "Staging";
var successStagingSysMsg = "Object has been set to Staging.";
var expiredStateLbl = "Expired";
var successExpireSysMsg = "Request to Expire Now Service has been sent.";
var vertionTabSelector = "//span[text()='Versions']";
var demoteStateLbl = "WIP";
var successDemoteSysMsg = "Object has been set to WIP.";
var searchresult=true;
var deleteresult=true;
var copywaitingtime=true;


var documentListUIObj = {

    selectDocumentListTab: function () 
    {
        browser.click("//span[text()='Document list']")
        browser.waitForExist("div.x-grid3-hd-inner.x-grid3-hd-object_name.x-component");
    },
    selectItemByName: function (assetName) 
    {   
        browser.pause(2000);
        browser.click("//span[@title='" + assetName + "']");
        browser.pause(1000);
    },

     contextualMenuActivate: function(assetName)
     {
        browser.rightClick("//span[@title='" + assetName + "']");
        browser.waitForVisible("div.x-menu-list", maxWaitTimeInMs);
    },
    contextualMenuLifeCycleSelect: function()
    {
        browser.waitForExist("//a[@id='menuContextDocumentLifeCycle']");
        browser.click("//a[@id='menuContextDocumentLifeCycle']");
    },
     lifeCyclePowerPromoteSelect: function(){
        browser.waitForVisible("//a[text()='Power Promote']", maxWaitTimeInMs);
        browser.click("//a[text()='Power Promote']");
    },
    powerPromoteConfirmDialogueOkSelect: function(){
        browser.waitForVisible("div.modal-body > label", maxWaitTimeInMs);
        var ppModalLabel = browser.getText("div.modal-body > label");
        expect(ppModalLabel).to.equal(ppModalLabel);
        browser.click("button[ng-click='$confirm()']");
    },
    powerPromoteResultsDialogueOkSelect: function(assetName){

        browser.waitForVisible("div.modal-body > label", maxWaitTimeInMs);
        var objName = browser.getText("#validateTable > tbody > tr:nth-child(2) > td:nth-child(2)");
        var state = browser.getText("#validateTable > tbody > tr:nth-child(2) > td:nth-child(3)");
        var sysMsg = browser.getText("#validateTable > tbody > tr:nth-child(2) > td:nth-child(4)");
        expect(assetName).to.equal(objName);
        expect(state).to.equal(activeStateLbl);
        expect(sysMsg).to.equal(successPublishSysMsg);
        browser.click("button[ng-click='$confirm()']");
    },
    powerPromote: function (assetName) 
    {

        documentListUIObj.contextualMenuActivate(assetName);
        documentListUIObj.contextualMenuLifeCycleSelect();
        documentListUIObj.lifeCyclePowerPromoteSelect();
        documentListUIObj.powerPromoteConfirmDialogueOkSelect();
        documentListUIObj.powerPromoteResultsDialogueOkSelect(assetName);
    },
    schedulePublishAsset: function (assetName) 
    {
        documentListUIObj.contextualMenuActivate(assetName);
        documentListUIObj.contextualMenuLifeCycleSelect();
        documentListUIObj.lifeCyclePowerPromoteSelect();
        documentListUIObj.powerPromoteConfirmDialogueOkSelect();
        documentListUIObj.schedulePublishResultsDialogueOkSelect(assetName);
    },
  lifeCyclePromoteSelect: function()
  {
        browser.waitForVisible("//a[text()='Promote']", maxWaitTimeInMs);
        browser.click("//a[text()='Promote']");
  },
     promoteResultsDialogueOkSelect: function(assetName)
     {
        browser.waitForVisible("div.modal-body > label", maxWaitTimeInMs);
        var objName = browser.getText("#validateTable > tbody > tr:nth-child(2) > td:nth-child(2)");
        var state = browser.getText("#validateTable > tbody > tr:nth-child(2) > td:nth-child(3)");
        var sysMsg = browser.getText("#validateTable > tbody > tr:nth-child(2) > td:nth-child(4)");
        expect(assetName).to.equal(objName);
        expect(state).to.equal(stagingStateLbl);
        expect(sysMsg).to.equal(successStagingSysMsg);
        browser.click("//div[@class='modal-footer']//button[contains(text(),'OK')]");
    },
    schedulePublishResultsDialogueOkSelect: function(assetName){
        browser.waitForVisible("div.modal-body > label", maxWaitTimeInMs);
        var objName = browser.getText("#validateTable > tbody > tr:nth-child(2) > td:nth-child(2)");
        var state = browser.getText("#validateTable > tbody > tr:nth-child(2) > td:nth-child(3)");
        var sysMsg = browser.getText("#validateTable > tbody > tr:nth-child(2) > td:nth-child(4)");
        //expect(assetName).to.equal(objName);
        expect(state).to.equal(approveStateLbl);
        expect(sysMsg).to.contains(schpublishmsg);
        browser.click("button[ng-click='$confirm()']");        
    },
promoteAsset: function (assetName) 
    {
        documentListUIObj.contextualMenuActivate(assetName);
        documentListUIObj.contextualMenuLifeCycleSelect();
        documentListUIObj.lifeCyclePromoteSelect();
        documentListUIObj.promoteResultsDialogueOkSelect(assetName);
    },
lifeCycleExpireSelect: function()
   {
        browser.waitForVisible("//a[text()='Expire Now']", maxWaitTimeInMs);
        browser.click("//a[text()='Expire Now']");
   },
  expireResultsDialogueOkSelect: function(assetName)
    {
        browser.waitForVisible("//table[@id='validateTable']//tr//td[contains(text(),'"+successExpireSysMsg+"')]", maxWaitTimeInMs);
        var sysMsgSelector = "//table[@id='validateTable']//tr//td[contains(text(),'"+successExpireSysMsg+"')]";
        var IssysMsgExist = browser.isExisting(sysMsgSelector);
        expect(IssysMsgExist).to.be.true;
        browser.click("//div[@class='modal-dialog prompt validate']//div//button");
    },
  expireAsset: function (assetName)
{
        documentListUIObj.contextualMenuActivate(assetName);
        documentListUIObj.contextualMenuLifeCycleSelect();
        documentListUIObj.lifeCycleExpireSelect();
        documentListUIObj.expireResultsDialogueOkSelect(assetName);
},

    selectVersionTab: function(version){
        browser.click(vertionTabSelector);
        browser.pause(1000);
        var verfityVersionSelector = "//div[@widget_type='DetailsVersionsWidget']//span[@title='"+version+"']";
        var IsVersionVerified = browser.isExisting(verfityVersionSelector);
        return IsVersionVerified;
    },
      selectRelationTab: function(version){
        browser.click("//span[text()='Relations']");
        browser.pause(1000);
    },

    verifyLock: function(objName){
        var LockSelector = "//div[starts-with(@id,'DoclistWidget')]//span[@title='"+objName+"']//preceding-sibling::span[starts-with(@class,'DocListLockByYou')]";
        var IsLocked = browser.isExisting(LockSelector);
        return IsLocked;
    },
    

    lifeCycleDemoteSelect: function()
    {
        browser.waitForVisible("//a[text()='Demote']", maxWaitTimeInMs);
        browser.click("//a[text()='Demote']");
    },
    demoteResultsDialogueOkSelect: function(assetName)
     {
        browser.waitForVisible("div.modal-body > label", maxWaitTimeInMs);
        var objName = browser.getText("//table[@id='validateTable']//tr//td[2]");
        var state = browser.getText("//table[@id='validateTable']//tr//td[3]");
        var sysMsg = browser.getText("//table[@id='validateTable']//tr//td[4]");
        expect(assetName).to.equal(objName);
        expect(state).to.equal(demoteStateLbl);
        expect(sysMsg).to.equal(successDemoteSysMsg);
        browser.click("//div[@class='modal-footer']//button[contains(text(),'OK')]");
    },
    demoteAsset: function (assetName)
    {
        documentListUIObj.contextualMenuActivate(assetName);
        documentListUIObj.contextualMenuLifeCycleSelect();
        documentListUIObj.lifeCycleDemoteSelect();
        documentListUIObj.demoteResultsDialogueOkSelect(assetName);
    },
   deleteArticle:function(assetName,DeleteVersionType){
        browser.rightClick("//span[@title='" + assetName + "']");
        browser.waitForVisible("#menuContextDestroy", maxWaitTimeInMs);
        browser.click("#menuContextDestroy");
        browser.waitForVisible("//label[contains(.,'" + DeleteVersionType + "')]",maxWaitTimeInMs);
        browser.click("//label[contains(.,'" + DeleteVersionType + "')]");
            browser.pause(2000);
        browser.waitForVisible("//button[text()='OK']",maxWaitTimeInMs);
        //browser.click("//button[text()='OK']");
        browser.leftClick("//button[contains(.,'OK') and @type='submit']");
        //browser.pause(maxWaitTimeInMs);
         while (deleteresult) {
        deleteresult=documentListUIObj.deleteloading();
       // console.log(deleteresult);
        }
        
   },
   deleteloading:function()
    {
        return browser.isVisible('//div[@class=" x3-loading-medium x-component x-abs-layout-container"]');
    },

}

module.exports = documentListUIObj;
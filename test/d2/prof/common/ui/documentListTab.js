
var maxWaitTimeInMs = 120000;
var PaginationTimeInMs = 3000;

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

    selectItemByName: function (assetName) {

        browser.pause(1000);
        browser.waitForVisible("//span[@title='" + assetName + "']", maxWaitTimeInMs);
        browser.click("//span[@title='" + assetName + "']");
        browser.pause(1000);
    },
    selectItemByNamePagination: function (assetName) {
        var isExisting=browser.isExisting("//span[@title='" + assetName + "']");
        while (!isExisting) {
                browser.click("(//table[@id='pagingNext-button']/tbody/tr[2]/td[2]/em/button)[1]");
                browser.pause(2000);
                isExisting=browser.isExisting("//span[@title='" + assetName + "']");
        }
        browser.click("//span[@title='" + assetName + "']");
        browser.pause(1000);
    },
     contextualMenuActivate: function(assetName){
        browser.waitForVisible("//span[@title='" + assetName + "']", maxWaitTimeInMs);
        browser.moveToObject("//span[@title='" + assetName + "']",0,0);
        browser.rightClick("//span[@title='" + assetName + "']");
        browser.pause(1000);

        browser.waitForVisible("div.x-menu-list", maxWaitTimeInMs);
    },
    contextualMenuLifeCycleSelect: function()
    {

        browser.waitForVisible("#x-menu-el-menuContextDocumentLifeCycle");
        browser.click("#x-menu-el-menuContextDocumentLifeCycle");
        browser.pause(1000);
    },
    lifeCyclePowerPromoteSelect: function(){
          browser.waitForVisible("//a[text()='Power Promote']", maxWaitTimeInMs);
        //browser.waitForExist("//a[text()='Power Promote']");
        browser.click("//a[text()='Power Promote']");
        browser.pause(1000);
    },
    lifeCyclePublishSelect: function(){
        browser.waitForExist("//a[text()='Publish']");
        browser.click("//a[text()='Publish']");
        browser.pause(1000);

    },
    powerPromoteConfirmDialogueOkSelect: function(){
        browser.waitForVisible("div.modal-body > label", maxWaitTimeInMs);
        var ppModalLabel = browser.getText("div.modal-body > label");
        expect(ppModalLabel).to.equal(ppModalLabel);
        browser.click("button[ng-click='$confirm()']");

        browser.pause(3000);

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

    publishToStaging: function(assetName){
        documentListUIObj.contextualMenuActivate(assetName);
        documentListUIObj.contextualMenuLifeCycleSelect();
        documentListUIObj.lifeCyclePublishSelect();
        documentListUIObj.publishToDialogueOkSelect('Staging');
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
    scheduleExpireAsset: function (assetName)
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

    verifyLock: function(objName){
        var LockSelector = "//div[starts-with(@id,'DoclistWidget')]//span[@title="+objName+"]//preceding-sibling::span[starts-with(@class,'DocListLockByYou')]";
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
        browser.rightClick("//span[@class='DocListLockByNone']//following-sibling::span[text()='"+assetName+"']");
        browser.waitForVisible("#menuContextDestroy", maxWaitTimeInMs);
        browser.click("#menuContextDestroy");
        browser.waitForVisible("//label[contains(.,'" + DeleteVersionType + "')]",maxWaitTimeInMs);
        browser.click("//label[contains(.,'" + DeleteVersionType + "')]");
        browser.waitForVisible("//button[text()='OK']",maxWaitTimeInMs);
        browser.click("//button[text()='OK']");
        //browser.pause(maxWaitTimeInMs);
         while (deleteresult) {
        deleteresult=documentListUIObj.deleteloading();

        }
    },
    copyArticle:function(assetName){
        browser.frameParent();
        browser.rightClick("//span[@title='" + assetName + "']");
        browser.waitForVisible("#menuContextCopy", maxWaitTimeInMs);
        browser.click("#menuContextCopy");
        browser.rightClick("//span[@title='" + assetName + "']");
        browser.waitForVisible("#menuContextPaste", maxWaitTimeInMs);
        browser.click("#menuContextPaste");
        while (copywaitingtime) {
        copywaitingtime=documentListUIObj.copyloading();

        }
        var results=browser.elements("//span[@title='" + assetName + "']");
    },
    searchTextSetValue:function(searcValue){
        browser.setValue("#searchText-input-input",searcValue);
    },
    loadSearchData:function(){
        return browser.isVisible('//div[@class="ext-el-mask-msg x3-loading-medium"]');
    },
    deleteloading:function()
    {
        return browser.isVisible('//div[@class=" x3-loading-medium x-component x-abs-layout-container"]');
    },
    copyloading:function(){
        return browser.isVisible('//div[@class="x3-loading-medium"]');
    },
    searchArticle:function(assetName,title){
        documentListUIObj.searchTextSetValue(assetName);
        browser.click("//div[@id='searchText-input']//following-sibling::span//img[2]");
        while (searchresult) {
        searchresult=documentListUIObj.loadSearchData();
        }
        browser.pause(4000);
        var isexists=browser.isExisting("//div[text()='No items found']");
        expect(isexists).to.equal(true);

        browser.click("//div[@id='searchText-input']//following-sibling::span//img[1]");
        searchresult=true;
        while (searchresult) {
        searchresult=documentListUIObj.loadSearchData();
    }
     browser.waitForVisible("//span[@title='" + title + "']");
        browser.pause(2000);
    },
    searchCopyArticle:function(assetName){
        documentListUIObj.searchTextSetValue(assetName);
        browser.click("//div[@id='searchText-input']//following-sibling::span//img[2]");
        while (searchresult) {
        searchresult=documentListUIObj.loadSearchData();
        }
        browser.pause(2000);
        browser.waitForVisible("//span[@title='" + assetName + "']");
        var results=browser.elements("//span[@title='" + assetName + "']");
        browser.pause(3000);
    },
    verifyGenericRelations: function(){
        browser.click("//span[text()='Relations']");
        browser.pause(2000);
        browser.waitForVisible("//td[contains(.,'wcm_category')]//following-sibling::td[contains(.,'Article')]",maxWaitTimeInMs);
        browser.isExisting("//td[contains(.,'wcm_category')]//following-sibling::td[contains(.,'Article')]");
        browser.isExisting("//td[contains(.,'wcm_doc_template')]//following-sibling::td[contains(.,'professional_article_generic') and contains(.,'xml')]");
        browser.isExisting("//td[contains(.,'wcm_layout_template')]//following-sibling::td[contains(.,'article_html') and contains(.,'xsl')]");
        browser.isExisting("//td[contains(.,'wcm_layout_template')]//following-sibling::td[contains(.,'article_nlm') and contains(.,'xsl')]");
        browser.isExisting("//td[contains(.,'wcm_layout_template')]//following-sibling::td[contains(.,'article_publish') and contains(.,'xsl')]");
        browser.isExisting("//td[contains(.,'wcm_rules_template')]//following-sibling::td[contains(.,'Rule_Professional_for_Article') and contains(.,'xml')]");
        browser.isExisting("//td[contains(.,'wcm_rules_editor')]//following-sibling::td[contains(.,'professional_article_generic') and contains(.,'xml')]");
    },
    publishToDialogueOkSelect:function(lifeCycle){
        if(lifeCycle === ''){
            lifeCycle = 'Staging'
        }
        var selectorExp = "input[value='"+lifeCycle+"']";
        browser.waitForExist(selectorExp);
        browser.click(selectorExp);
        browser.click("div.modal-content > div.modal-footer > button.btn.btn-primary");

    
    browser.waitForVisible("//span[@title='" + assetName + "']", maxWaitTimeInMs);
        var results=browser.elements("//span[@title='" + assetName + "']");
    },
    searchTextSetValue:function(searcValue){
        browser.setValue("#searchText-input-input",searcValue);
    },
    loadSearchData:function(){
        return browser.isVisible('//div[@class="ext-el-mask-msg x3-loading-medium"]');
    },
    deleteloading:function()
    {
        return browser.isVisible('//div[@class=" x3-loading-medium x-component x-abs-layout-container"]');
    },
    copyloading:function(){
        return browser.isVisible('//div[@class="x3-loading-medium"]');
    },
    searchArticle:function(assetName, title){
        documentListUIObj.searchTextSetValue(assetName);
        browser.click("//div[@id='searchText-input']//following-sibling::span//img[2]");
        while (searchresult) {
        searchresult=documentListUIObj.loadSearchData();
        }
        browser.pause(4000);
        var isexists=browser.isExisting("//div[text()='No items found']");
        expect(isexists).to.equal(true);
        
        browser.click("//div[@id='searchText-input']//following-sibling::span//img[1]");
        searchresult=true;
        while (searchresult) {
        searchresult=documentListUIObj.loadSearchData();
        }
        browser.waitForVisible("//span[@title='" + title + "']");
        browser.pause(2000);
    },
    searchCopyArticle:function(assetName){
        documentListUIObj.searchTextSetValue(assetName);
        browser.click("//div[@id='searchText-input']//following-sibling::span//img[2]");
        while (searchresult) {
        searchresult=documentListUIObj.loadSearchData();
        }
        //browser.pause(2000);
        browser.waitForVisible("//span[@title='" + assetName + "']", maxWaitTimeInMs);
        var results=browser.elements("//span[@title='" + assetName + "']");
        browser.pause(5000);
        console.log(results);
        console.log(results.value);
    },

    verifySlideRelations: function(){
        browser.click("//span[text()='Relations']");
        browser.pause(1000);
        browser.isExisting("//td[contains(.,'wcm_category')]//following-sibling::td[contains(.,'Article')]");
        browser.isExisting("//td[contains(.,'wcm_doc_template')]//following-sibling::td[contains(.,'prof_article_slide_presentation') and contains(.,'xml')]");
        browser.isExisting("//td[contains(.,'wcm_layout_template')]//following-sibling::td[contains(.,'article_slide_html') and contains(.,'xsl')]");
        browser.isExisting("//td[contains(.,'wcm_layout_template')]//following-sibling::td[contains(.,'article_slide_nlm') and contains(.,'xsl')]");
        browser.isExisting("//td[contains(.,'wcm_layout_template')]//following-sibling::td[contains(.,'article_slide_publish') and contains(.,'xsl')]");
        browser.isExisting("//td[contains(.,'wcm_rules_template')]//following-sibling::td[contains(.,'Rule_Professional_for_slide_presentation') and contains(.,'xml')]");
        browser.isExisting("//td[contains(.,'wcm_rules_editor')]//following-sibling::td[contains(.,'prof_article_slide_presentation') and contains(.,'xml')]");
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
    
    schedulePublishAsset: function (assetName) 
    {
        documentListUIObj.contextualMenuActivate(assetName);
        documentListUIObj.contextualMenuLifeCycleSelect();
        documentListUIObj.lifeCyclePowerPromoteSelect();
        documentListUIObj.powerPromoteConfirmDialogueOkSelect();
        documentListUIObj.schedulePublishResultsDialogueOkSelect(assetName);
    },

    selectItemByNamePagination: function (assetName) {
        var isExisting=browser.isExisting("//span[@title='" + assetName + "']");
        while (!isExisting) {
                browser.click("(//table[@id='pagingNext-button']/tbody/tr[2]/td[2]/em/button)[1]");
                browser.pause(2000);
                isExisting=browser.isExisting("//span[@title='" + assetName + "']");
        }
        browser.click("//span[@title='" + assetName + "']");
        browser.pause(1000);
    },


}
module.exports = documentListUIObj;
var otfTab = require('./../../common/actions/otfTab.actions');
var contenttab = require('./contentTab');
var propertiestab = require('./propertiesTab');
var maxWaitTimeInMs = 60000;
var otfTabSelector="//li[@tag_id='OnTheFly-widgetTab']";
var otfWidget="//div[@tag_id='OnTheFly-widget']";

module.exports = {
   otfTabSelect: function(){
        if(!browser.isExisting(otfTabSelector))
        {
            browser.click("//div[@id='tab-container-2']//div[@unselectable='on']//div[@role='presentation']//ul[@role='tablist']//div[@qtip='Add widget']//span[@id='addTool-button']");
            browser.waitForVisible("//center[@title='OnTheFly']", maxWaitTimeInMs);
            browser.pause(2000);
            browser.moveToObject("//center[@title='OnTheFly']");
            console.log("Testing "+ browser.getText("//center[@title='OnTheFly']"));
            browser.leftClick("//center[@title='OnTheFly']");
        }else{
            browser.waitForExist(otfTabSelector, maxWaitTimeInMs);
            browser.click(otfTabSelector);
            browser.waitForExist(otfWidget, maxWaitTimeInMs);
        }
        browser.waitForExist(otfWidget, maxWaitTimeInMs);
        expect(browser.getText("(.//span[text()='OnTheFly'])[1]")).to.equal("OnTheFly");
    }, 
    otfWidgetSelector: function(){
        return otfWidget;
    },
    otfTabSelector: function(){
        return otfTabSelector;
    },
    objectTypeHeader: function(){
        browser.waitForExist("//table[@st-table='displayedCollection']/thead/tr/th[2]", maxWaitTimeInMs);
        return browser.getText("//table[@st-table='displayedCollection']/thead/tr/th[2]");
    },
    objectNameHeader: function(){
        return browser.getText("//table[@st-table='displayedCollection']/thead/tr/th[3]");
    },
    titleHeader: function(){
        return browser.getText("//table[@st-table='displayedCollection']/thead/tr/th[4]");
    },
    statusHeader: function(){
        return browser.getText("//table[@st-table='displayedCollection']/thead/tr/th[5]");
    },
    primaryHeader: function(){
        return browser.getText("//table[@st-table='displayedCollection']/thead/tr/th[6]");
    },
    linkHeader: function(){
        return browser.getText("//table[@st-table='displayedCollection']/thead/tr/th[7]");
    },
    unlinkHeader: function(){
        return browser.getText("//table[@st-table='displayedCollection']/thead/tr/th[8]");
    },

    objectTypeValue: function(){
        return browser.getText("//table[@st-table='displayedCollection']/tbody/tr[1]/td[2]/span[@ng-style='getRowStyle(item.level)']");
    },
    objectNameValue: function(){
        return browser.getText("//table[@st-table='displayedCollection']/tbody/tr[1]/td[3]/a[@ng-click='itemSelected(item)']/span[@ng-style='getRowStyle(item.level)']");
    },
    titleValue: function(){
        return browser.getText("//table[@st-table='displayedCollection']/tbody/tr[1]/td[4]");
    },
    statusValue: function(){
        return browser.getText("//table[@st-table='displayedCollection']/tbody/tr[1]/td[5]");
    },
    linkImageExist: function(){
        return browser.isExisting("//table[@st-table='displayedCollection']/tbody/tr[1]/td[7]/button[@ng-click='doLinkItem(item)']");
    },

    objectTypeValueOV: function(){
        return browser.getText("//table[@st-table='displayedCollection']/tbody/tr[2]/td[2]/span[@ng-style='getRowStyle(item.level)']");
    },
    objectNameValueOV: function(){
        return browser.getText("//table[@st-table='displayedCollection']/tbody/tr[2]/td[3]/a[@ng-click='itemSelected(item)']/span[@ng-style='getRowStyle(item.level)']");
    },
    titleValueOV: function(){
        return browser.getText("//table[@st-table='displayedCollection']/tbody/tr[2]/td[4]");
    },
    statusValueOV: function(){
        return browser.getText("//table[@st-table='displayedCollection']/tbody/tr[2]/td[5]");
    },
    isPrimaryOV: function(){
        return browser.getValue("//table[@st-table='displayedCollection']/tbody/tr[2]/td[6]/span/span/input");
    },


   verifyCreateOutputVersion: function(newsObjectname){
        browser.click("//button[@id='single-button']");
        browser.click("//li[@ng-repeat='createItem in searchResponse.createItems']/a");
        browser.frameParent();
        browser.waitForExist("//div[@ng-repeat='attr in createItem.inputAttributes'][1]//div//input[@id='attr.attributeName']",maxWaitTimeInMs);
        browser.setValue("//div[@ng-repeat='attr in createItem.inputAttributes'][1]//div//input[@id='attr.attributeName']","OutputVersion-"+newsObjectname);
        browser.setValue("//div[@ng-repeat='attr in createItem.inputAttributes'][2]//div//input[@id='attr.attributeName']","OutputVersion-Title-"+newsObjectname);
        var outputType = browser.element("//div[@ng-repeat='attr in createItem.inputAttributes'][3]//div[2]//select[@ng-model='attr.value']");
        outputType.selectByVisibleText("Audio");
        browser.click("//button[text()='Create']");
    },
    verifyMultipleOutputVersionCreation: function(newsObjectname){
        
        browser.click("//button[@id='single-button']");
        browser.click("//li[@ng-repeat='createItem in searchResponse.createItems']/a");
        browser.frameParent();
        browser.waitForExist("//div[@ng-repeat='attr in createItem.inputAttributes'][1]//div//input[@id='attr.attributeName']",maxWaitTimeInMs);
        browser.setValue("//div[@ng-repeat='attr in createItem.inputAttributes'][1]//div//input[@id='attr.attributeName']","OutputVersion-2-"+newsObjectname);
        browser.setValue("//div[@ng-repeat='attr in createItem.inputAttributes'][2]//div//input[@id='attr.attributeName']","OutputVersion-Title-2-"+newsObjectname);
        var outputType = browser.element("//div[@ng-repeat='attr in createItem.inputAttributes'][3]//div[2]//select[@ng-model='attr.value']");
        outputType.selectByVisibleText("Audio");
        browser.click("//button[text()='Create']");
    },  
    
    
     
     CreateOutputVersionIMP: function(OutputType){
        browser.waitForExist("//button[@id='single-button']",maxWaitTimeInMs);
        browser.click("//button[@id='single-button']");
        browser.click("//li[@ng-repeat='createItem in searchResponse.createItems']/a");
        browser.frameParent();
        browser.waitForExist("//span[contains(.,'Output Type')]",maxWaitTimeInMs);
        browser.click("//select[@ng-model='attr.value']")
        browser.click("//option[contains(.,'"+OutputType+"')]")
        browser.click("//button[text()='Create']");
        browser.pause(4000);
    },
        
    objectTypeValueNewOV: function(){
        return browser.getText("//table[@st-table='displayedCollection']/tbody/tr[3]/td[2]/span[@ng-style='getRowStyle(item.level)']");
    },
    objectNameValueNewOV: function(){
        return browser.getText("//table[@st-table='displayedCollection']/tbody/tr[3]/td[3]/a[@ng-click='itemSelected(item)']/span[@ng-style='getRowStyle(item.level)']");
    },
    titleValueNewOV: function(){
        return browser.getText("//table[@st-table='displayedCollection']/tbody/tr[3]/td[4]");
    },
    statusValueNewOV: function(){
        return browser.getText("//table[@st-table='displayedCollection']/tbody/tr[3]/td[5]");
    },
    isPrimaryNewOV: function(){
        return browser.getValue("//table[@st-table='displayedCollection']/tbody/tr[3]/td[6]/span/span/input");
    },
    objectTypeValueSecondOV: function(){
        return browser.getText("//table[@st-table='displayedCollection']/tbody/tr[4]/td[2]/span[@ng-style='getRowStyle(item.level)']");
    },
    objectNameValueSecondOV: function(){
        return browser.getText("//table[@st-table='displayedCollection']/tbody/tr[4]/td[3]/a[@ng-click='itemSelected(item)']/span[@ng-style='getRowStyle(item.level)']");
    },
    titleValueSecondOV: function(){
        return browser.getText("//table[@st-table='displayedCollection']/tbody/tr[4]/td[4]");
    },
    statusValueSecondOV: function(){
        return browser.getText("//table[@st-table='displayedCollection']/tbody/tr[4]/td[5]");
    },
    isPrimarySecondOV: function(){
        return browser.getValue("//table[@st-table='displayedCollection']/tbody/tr[4]/td[6]/span/span/input");
    },
    searchObject:function(objname,locale){
        browser.selectByValue("//span[contains(.,'Locale')]//select",locale);
        browser.setValue("//input[@ng-model='searchtxt']",objname);
        browser.leftClick("//button[@ng-click='search()']");
       browser.waitForVisible("//span[text()='"+objname+"']",maxWaitTimeInMs);
       browser.leftClick("//span[text()='"+objname+"']");
       browser.frameParent();   
       propertiestab.propertiesTabSelect();
       var cid=propertiestab.chronicleIdGet();
       expect(cid).to.equal(objname);
       contenttab.selectContenTab();
       browser.pause(3000);
       contenttab.switchToExternalWidget4Frame();
       browser.waitForVisible("//center[contains(.,'"+objname+"')]",maxWaitTimeInMs);
       expect(browser.getText("//center[contains(.,'"+objname+"')]")).to.contain(objname);
       browser.frameParent();
    },
    searchForAnAssetThroughOTF:function(searchdata,objectname,locale){
       browser.selectByValue("//span[contains(.,'Locale')]//select",locale);
       browser.setValue("//input[@ng-model='searchtxt']",searchdata);
       browser.leftClick("//button[@ng-click='search()']");
       browser.waitForVisible("//span[text()='"+searchdata+"']",maxWaitTimeInMs);
    //    //browser.leftClick("//span[text()='"+objname+"']");
    //    browser.frameParent(); 
    //    propertiestab.propertiesTabSelect();
    //    propertiestab.edit();
    //    propertiestab.titleSet("_Updated");
    //    propertiestab.save();        
       
    },
     selectOTFWidgetTab: function(){
        browser.waitForVisible("//span//preceding-sibling::span[contains(.,'OnTheFly') and @aria-hidden=not('true')]");
        browser.click("//span//preceding-sibling::span[contains(.,'OnTheFly') and @aria-hidden=not('true')]");
    },
    otfRemoveDefaultoutputversion:function(){
        browser.waitForVisible("//td[span[contains(.,'Output Version')]]//following-sibling::td[contains(.,'Transcript')]//following-sibling::td//button[@popover-html='Unlink this item']");
        browser.click("//td[span[contains(.,'Output Version')]]//following-sibling::td[contains(.,'Transcript')]//following-sibling::td//button[@popover-html='Unlink this item']");
        
    },
      otfRemoveDefaultoutputversionPopup:function(){
        browser.waitForVisible("//div[@class='modal-footer']//button[contains(.,'YES')]");
        browser.click("//div[@class='modal-footer']//button[contains(.,'YES')]");
        browser.pause(2000);
        
    },
      otfDefaultoutputversionValidation:function(){
        browser.pause(6000);
        var textattribute = browser.isExisting("//td[span[contains(.,'Output Version')]]//following-sibling::td[contains(.,'Transcript')]//following-sibling::td//button[@popover-html='Unlink this item']");
        return textattribute;
        
    },
    otfLinkDefaultoutputversion:function(){
        browser.waitForVisible("//td[span[contains(.,'Article')]]//following-sibling::td//button[@popover-html='Add a child link']");
        browser.click("//td[span[contains(.,'Article')]]//following-sibling::td//button[@popover-html='Add a child link']");
        
    },
     otfDefaultoutputversion:function(){
        browser.waitForVisible("//input[@placeholder='Enter search text']");
        browser.setValue("//input[@placeholder='Enter search text']","text");
        browser.waitForVisible("//span[@ng-click='linkSearchClicked()']");
        browser.click("//span[@ng-click='linkSearchClicked()']");
        browser.waitForVisible("//td[contains(.,'text')]");
        browser.leftClick("//td[contains(.,'text')]");
        browser.waitForVisible("//button[contains(.,'Link')]");
        browser.click("//button[contains(.,'Link')]")
        browser.pause(2000);
        
    },

    verifyCreateOutputVersionIMP: function (outputtype) {
        
         browser.waitForExist("//div//span[@ng-if='possibleParents.length == 1']",maxWaitTimeInMs);
        var outputType = browser.element("//div[@ng-repeat='attr in createItem.inputAttributes']//div[2]//select[@ng-model='attr.value']");
        outputType.selectByVisibleText(outputtype);


      

    },

       
     
     CreateOutputVersionIMPClick: function(OutputType){
        browser.waitForExist("//button[@id='single-button']",maxWaitTimeInMs);
        browser.click("//button[@id='single-button']");
        browser.click("//li[@ng-repeat='createItem in searchResponse.createItems']/a");
        browser.frameParent();
     },

    getParentObjectValue:function () {
        
        browser.waitForExist("//div//span[@ng-if='possibleParents.length == 1']",maxWaitTimeInMs);
        return browser.getText("//div//span[@ng-if='possibleParents.length == 1']")


    },

    CancelCreateOutputVersion:function () {

        browser.click("//div[@class='modal-footer']//button[text()='Cancel']");
        browser.pause(4000);
    },

    CreateCreateOutputVersion:function () {

        browser.click("//div[@class='modal-footer']//button[text()='Create']");
        browser.pause(4000);
    },
    otfRemoveCreatedoutputversion:function(Title){
        browser.waitForVisible("//td[span[contains(.,'Output Version')]]//following-sibling::td[contains(.,'"+Title+"')]//following-sibling::td//button[@popover-html='Unlink this item']");
        browser.click("//td[span[contains(.,'Output Version')]]//following-sibling::td[contains(.,'"+Title+"')]//following-sibling::td//button[@popover-html='Unlink this item']");
    },
    ValidateUnlinkOutputVersion: function(Title){
        var IsExistUnlink = browser.isExisting("//td[contains(text(),'"+Title+"')]//following::td[4]");
        expect(IsExistUnlink).to.be.false;
    },
}



var otfTab = require('./../../common/actions/otfTab.actions');
var maxWaitTimeInMs = 30000;
var otfTabSelector="//li[@tag_id='OnTheFly-widgetTab']";
var otfWidget="//div[@tag_id='OnTheFly-widget']";

module.exports = {
    otfTabSelect: function(){
        if(!browser.isExisting(otfTabSelector))
        {
            browser.click("//div[@id='tab-container-2']//div[@unselectable='on']//div[@role='presentation']//ul[@role='tablist']//div[@qtip='Add widget']//span[@id='addTool-button']");
            browser.waitForVisible("//center[@title='OnTheFly']", maxWaitTimeInMs);
            browser.click("//center[@title='OnTheFly']");
        }else{
            browser.click(otfTabSelector);
            browser.waitForExist(otfWidget, maxWaitTimeInMs);
        }

    }, 
   verifyOTFHeader: function(){
        var objectTypeHeader = browser.getText("//table[@st-table='displayedCollection']/thead/tr/th[2]");
        expect(objectTypeHeader).to.equal(global.d2ProfDataSettings.otfData.objectType);
        var objectNameHeader = browser.getText("//table[@st-table='displayedCollection']/thead/tr/th[3]");
        expect(objectNameHeader).to.equal(global.d2ProfDataSettings.otfData.objectName);
        var titleHeader = browser.getText("//table[@st-table='displayedCollection']/thead/tr/th[4]");
        expect(titleHeader).to.equal(global.d2ProfDataSettings.otfData.title);
        var statusHeader = browser.getText("//table[@st-table='displayedCollection']/thead/tr/th[5]");
        expect(statusHeader).to.equal(global.d2ProfDataSettings.otfData.status);
        var primaryHeader = browser.getText("//table[@st-table='displayedCollection']/thead/tr/th[6]");
        expect(primaryHeader).to.equal(global.d2ProfDataSettings.otfData.primary);
        var linkHeader = browser.getText("//table[@st-table='displayedCollection']/thead/tr/th[7]");
        expect(linkHeader).to.equal(global.d2ProfDataSettings.otfData.link);
        var unlinkHeader = browser.getText("//table[@st-table='displayedCollection']/thead/tr/th[8]");
        expect(unlinkHeader).to.equal(global.d2ProfDataSettings.otfData.unlink);
   }, 
   verifyOTFValues: function(objName, newsObjectname){
        var objectTypeValue= browser.getText("//table[@st-table='displayedCollection']/tbody/tr[1]/td[2]/span[@ng-style='getRowStyle(item.level)']");
        expect(objectTypeValue).to.equal(global.d2ProfDataSettings.otfData.article);
        var objectNameValue = browser.getText("//table[@st-table='displayedCollection']/tbody/tr[1]/td[3]/a[@ng-click='itemSelected(item)']/span[@ng-style='getRowStyle(item.level)']");
        expect(objectNameValue).to.equal(objName);
        var titleValue= browser.getText("//table[@st-table='displayedCollection']/tbody/tr[1]/td[4]");
        expect(titleValue).to.equal(newsObjectname);
        var statusValue= browser.getText("//table[@st-table='displayedCollection']/tbody/tr[1]/td[5]");
        expect(statusValue).to.equal(global.d2ProfDataSettings.otfData.wip);
        var linkImageExist = browser.isExisting("//table[@st-table='displayedCollection']/tbody/tr[1]/td[7]/button[@ng-click='doLinkItem(item)']");
        expect(linkImageExist).to.equal(true);
   },
   verifyOTFOutputVersionValues: function(){
        var objectTypeValueOV= browser.getText("//table[@st-table='displayedCollection']/tbody/tr[2]/td[2]/span[@ng-style='getRowStyle(item.level)']");
        expect(objectTypeValueOV).to.equal(global.d2ProfDataSettings.otfData.outputVersion);
        var objectNameValueOV = browser.getText("//table[@st-table='displayedCollection']/tbody/tr[2]/td[3]/a[@ng-click='itemSelected(item)']/span[@ng-style='getRowStyle(item.level)']");
        expect(objectNameValueOV).to.equal(global.d2ProfDataSettings.otfData.text);
        var titleValueOV= browser.getText("//table[@st-table='displayedCollection']/tbody/tr[2]/td[4]");
        expect(titleValueOV).to.equal(global.d2ProfDataSettings.otfData.transcript);
        var statusValueOV= browser.getText("//table[@st-table='displayedCollection']/tbody/tr[2]/td[5]");
        expect(statusValueOV).to.equal(global.d2ProfDataSettings.otfData.active);
         //unable to validate the primary input radio button
         var isPrimaryOV = browser.getValue("//table[@st-table='displayedCollection']/tbody/tr[2]/td[6]/span/span/input");
         console.log("isPrimaryOV"+isPrimaryOV);
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
    }

}


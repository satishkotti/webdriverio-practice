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
        expect(objectTypeHeader).to.equal('Object Type');
        var objectNameHeader = browser.getText("//table[@st-table='displayedCollection']/thead/tr/th[3]");
        expect(objectNameHeader).to.equal('Object Name');
        var titleHeader = browser.getText("//table[@st-table='displayedCollection']/thead/tr/th[4]");
        expect(titleHeader).to.equal('Title');
        var statusHeader = browser.getText("//table[@st-table='displayedCollection']/thead/tr/th[5]");
        expect(statusHeader).to.equal('Status');
        var primaryHeader = browser.getText("//table[@st-table='displayedCollection']/thead/tr/th[6]");
        expect(primaryHeader).to.equal('Primary');
        var linkHeader = browser.getText("//table[@st-table='displayedCollection']/thead/tr/th[7]");
        expect(linkHeader).to.equal('Link');
        var unlinkHeader = browser.getText("//table[@st-table='displayedCollection']/thead/tr/th[8]");
        expect(unlinkHeader).to.equal('UnLink');
   }, 
   verifyOTFValues: function(objName, newsObjectname){
        var objectTypeValue= browser.getText("//table[@st-table='displayedCollection']/tbody/tr[1]/td[2]/span[@ng-style='getRowStyle(item.level)']");
        console.log("objectTypeValue"+objectTypeValue);
        expect(objectTypeValue).to.equal('Article');

        var objectNameValue = browser.getText("//table[@st-table='displayedCollection']/tbody/tr[1]/td[3]/a[@ng-click='itemSelected(item)']/span[@ng-style='getRowStyle(item.level)']");
        console.log("objectName:"+objectNameValue);
        expect(objectNameValue).to.equal(objName);

        var titleValue= browser.getText("//table[@st-table='displayedCollection']/tbody/tr[1]/td[4]");
        console.log("titleValue"+titleValue);
        expect(titleValue).to.equal(newsObjectname);

        var statusValue= browser.getText("//table[@st-table='displayedCollection']/tbody/tr[1]/td[5]");
        console.log("statusValue"+statusValue);
        expect(statusValue).to.equal('WIP');
        
         var linkImageExist = browser.isExisting("//table[@st-table='displayedCollection']/tbody/tr[1]/td[7]/button[@ng-click='doLinkItem(item)']");
         console.log("linkImageExist"+linkImageExist);
         expect(linkImageExist).to.equal(true);
   },
   verifyOTFOutputVersionValues: function(){
        var objectTypeValueOV= browser.getText("//table[@st-table='displayedCollection']/tbody/tr[2]/td[2]/span[@ng-style='getRowStyle(item.level)']");
        console.log("objectTypeValueOV"+objectTypeValueOV);
        expect(objectTypeValueOV).to.equal('Output Version');

        var objectNameValueOV = browser.getText("//table[@st-table='displayedCollection']/tbody/tr[2]/td[3]/a[@ng-click='itemSelected(item)']/span[@ng-style='getRowStyle(item.level)']");
        console.log("objectNameValueOV:"+objectNameValueOV);
        expect(objectNameValueOV).to.equal('text');

        var titleValueOV= browser.getText("//table[@st-table='displayedCollection']/tbody/tr[2]/td[4]");
        console.log("titleValueOV"+titleValueOV);
        expect(titleValueOV).to.equal('Transcript');

        var statusValueOV= browser.getText("//table[@st-table='displayedCollection']/tbody/tr[2]/td[5]");
        console.log("statusValueOV"+statusValueOV);
        expect(statusValueOV).to.equal('Active');
        
         //unable to validate the primary input radio button
         var isPrimaryOV = browser.getValue("//table[@st-table='displayedCollection']/tbody/tr[2]/td[6]/span/span/input");
         console.log("isPrimaryOV"+isPrimaryOV);

   },
   verifyCreateOutputVersion: function(){
        browser.click("//button[@id='single-button']");
        browser.click("//li[@ng-repeat='createItem in searchResponse.createItems']/a");
        browser.frameParent();
        browser.waitForExist("//div[@ng-repeat='attr in createItem.inputAttributes'][1]//div//input[@id='attr.attributeName']",maxWaitTimeInMs);
        browser.setValue("//div[@ng-repeat='attr in createItem.inputAttributes'][1]//div//input[@id='attr.attributeName']","OutputVersion-1");
        browser.setValue("//div[@ng-repeat='attr in createItem.inputAttributes'][2]//div//input[@id='attr.attributeName']","OutputVersion-Title-1");
        // var outputType = browser.element("");
        // outputType.selectByVisibleText("");
    }

}


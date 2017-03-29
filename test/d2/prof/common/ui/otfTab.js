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
    objectTypeHeader: function(){
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
    }
}


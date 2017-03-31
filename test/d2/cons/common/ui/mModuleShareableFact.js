var maxWaitTimeInMs = 20000;

var mModuleShareableFactUIObj = {

    titleLabelGet: function () {
        mModuleShareableFactUIObj.verfiyElementExists("div[data-test='sharefact-titlelabel']");
        return browser.getText("div[data-test='sharefact-titlelabel']");
    },
    titleGet: function () {
        mModuleShareableFactUIObj.verfiyElementExists("input[data-test='sharefact-title']");
        return browser.getText("input[data-test='sharefact-title']");
    },
    titleSet: function (textValue) {
        mModuleShareableFactUIObj.verfiyElementExists("input[data-test='sharefact-title']");
        browser.setValue("input[data-test='sharefact-title']",textValue);
    },

     defaulttitleGet: function () {
         mModuleShareableFactUIObj.verfiyElementExists("input[data-test='sharefact-title']");
         return browser.element("input[data-test='sharefact-title']").getValue();
         
    },
    descriptionLabelGet: function () {
        mModuleShareableFactUIObj.verfiyElementExists("div[data-test='sharefact-descriptionlabel']");
        return browser.getText("div[data-test='sharefact-descriptionlabel']");
    },
    descriptionGet: function () {
        mModuleShareableFactUIObj.verfiyElementExists("input[data-test='sharefact-description']");
        return browser.getText("input[data-test='sharefact-description']");
    },
    descriptionSet: function (textValue) {
        mModuleShareableFactUIObj.verfiyElementExists("input[data-test='sharefact-description']");
        browser.setValue("input[data-test='sharefact-description']",textValue);
    },
    alignLabelGet: function () {
        mModuleShareableFactUIObj.verfiyElementExists("div[data-test='sharefact-alignlabel']");
        return browser.getText("div[data-test='sharefact-alignlabel']");
    },
    alignGet: function(displayValue){
        mModuleShareableFactUIObj.verfiyElementExists("select[data-test='sharefact-align']");
         return browser.element("select[data-test='sharefact-align']").getValue();
    },
    alignSet: function(displayValue){
        mModuleShareableFactUIObj.verfiyElementExists("select[data-test='sharefact-align']");
         var selectBox = browser.element("select[data-test='sharefact-align']");
        selectBox.selectByVisibleText(displayValue);
    },
    supressSocialShareLabelGet: function(){
        mModuleShareableFactUIObj.verfiyElementExists("label[data-test='sharefact-suppresssocialsharelabel']");
        return browser.getText("label[data-test='sharefact-suppresssocialsharelabel']");
    },
    supressSocialShareChkBoxGet: function(){
        mModuleShareableFactUIObj.verfiyElementExists("input[data-test='sharefact-suppresssocialshare']");
        return browser.element("input[data-test='sharefact-suppresssocialshare']").isSelected();
    },
    supressSocialShareChkBoxSet: function(textValue){
        mModuleShareableFactUIObj.verfiyElementExists("input[data-test='sharefact-suppresssocialshare']");
        var isSSSChecked = mModuleShareableFactUIObj.supressSocialShareChkBoxGet();
        if(!isSSSChecked && isSSSChecked.toString() === textValue)
            return;
        
        browser.element("input[data-test='sharefact-suppresssocialshare']").click();
    },
    insert: function () {
        mModuleShareableFactUIObj.verfiyElementExists("button[data-test='sharefact-insertbutton']");
        browser.click("button[data-test='sharefact-insertbutton']");
        browser.pause(1000);
    },
    update: function () {
        mModuleShareableFactUIObj.verfiyElementExists("button[data-test='sharefact-updatebutton']");
        browser.click("button[data-test='sharefact-updatebutton']");
        browser.pause(1000);
    },
    cancel: function () {
        mModuleShareableFactUIObj.verfiyElementExists("button[data-test='sharefact-cancelbutton']");
        browser.click("button[data-test='sharefact-cancelbutton']");
        browser.pause(1000);       
    },
    verfiyElementExists: function (selectorVal) {
        if (!browser.isExisting(selectorVal)) {
            browser.frame();
            browser.waitForExist(selectorVal, maxWaitTimeInMs);
        }
    }
}

module.exports = mModuleShareableFactUIObj;
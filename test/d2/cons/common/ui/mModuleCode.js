var maxWaitTimeInMs = 20000;

var mModuleCodeUIObj = {
    
    getCodeLabel: function () {
        return browser.getText("div[data-test='codemodule-codelabel']");
    },
    getCodeTypeLabel: function () {
        return browser.getText("div[data-test='codemodule-codetypelabel']");
    },
    getCodeValue: function () {
        return browser.getValue("textarea[data-test='codemodule-code']");
    },
    getCodeTypeValue: function () {
        return browser.element("select[data-test='codemodule-codetype']").getValue();
    },
      
      getcode_socialvalue: function () {
        
         var inputlookuptypeinput= $('#wbmd_lookup_type-input');
         return inputlookuptypeinput.getValue();
    },
     
    codeAndTypeSetValue: function (codeText, codeType) {
        mModuleCodeUIObj.verfiyElementExists("textarea[data-test='codemodule-code']");
        browser.setValue("textarea[data-test='codemodule-code']", codeText);

        var selectBox = browser.element("select[data-test='codemodule-codetype']");
        selectBox.selectByVisibleText(codeType);
    },
    insertCode: function () {
        mModuleCodeUIObj.verfiyElementExists("button[data-test='codemodule-insertbutton']");
        browser.click("button[data-test='codemodule-insertbutton']");
        browser.pause(1000);
    },
    updateCode: function () {
        mModuleCodeUIObj.verfiyElementExists("button[data-test='codemodule-updatebutton']");
        browser.click("button[data-test='codemodule-updatebutton']");
        browser.pause(1000);
    },
    cancelCode: function () {
        mModuleCodeUIObj.verfiyElementExists("button[data-test='codemodule-cancelbutton']");
        browser.click("button[data-test='codemodule-cancelbutton']");
        browser.pause(1000);
    },
    verfiyElementExists: function(selectorVal){
        if(!browser.isExisting(selectorVal))
        {
            browser.frame();
            browser.waitForExist(selectorVal, maxWaitTimeInMs);
        }

    }   
}

module.exports = mModuleCodeUIObj;
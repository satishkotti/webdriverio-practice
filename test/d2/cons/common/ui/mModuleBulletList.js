var maxWaitTimeInMs = 20000;

var mModuleBulletUIObj = {
    
    moduleHeadlineLabelGet: function () {
        return browser.getText("div[data-test='bulletedlist-moduleheadlinelabel']");
    },
    moduleHeadlineSet: function (textValue) {
        browser.setValue("div[data-test='bulletedlist-moduleheadline']", textValue);
    },
    moduleDescriptionLabelGet: function () {
        return browser.getText("div[data-test='bulletedlist-moduledescriptionlabel']");
    },
    moduleDescriptionSet: function (textValue) {
        browser.setValue(,textValue);
    },
    alignLabelGet: function(){
        return browser.getText("div[data-test='bulletedlist-alignlabel']");
    },
    alignGet: function(){
        return browser.element("select[data-test='bulletedlist-align']").getValue();
    },
    alignSet: function(textValue){
        var selectBox = browser.element("select[data-test='bulletedlist-align']");
        selectBox.selectByVisibleText(textValue);
    },
    insertBulletTitleLabelGet: function(){
        return browser.getText("div[data-test='bulletedlist-bullettitlelabel']");
    },
    insertBulletTitleSet: function(){
        return browser.getText("div[data-test='bulletedlist-bullettitle']");
    },
    insertBulletDescriptionValueGet: function(){
        mModuleBulletUIObj.switchToBulletDescFrame();

    },

    switchToRichTextEditorFrame: function(){
        browser.element("//iframe");
    },
    switchToBulletDescFrame: function(){
        browser.frame();
        
        var bulletDescEditorFrame = browser.element("div[data-test='bulletedlist-bulletdescriptioniframe']");
        browser.frame(bulletDescEditorFrame.value);
    },

    insertBulletDescValueGet: function(){

    },
    titleListGet: function(){
    },
    insertBulletTitleValueSet: function(){
        return browser.getText("div[data-test='']");
    },
    insertBulletTitleValueGet: function(){

    },
    insertBulletDescValueGet: function(){

    },

   moduleHeadlineValueSet: function () {
        return browser.getValue("textarea[data-test='codemodule-code']");
    },
    alignValueSelectedSet: function () {
        return browser.getValue("textarea[data-test='codemodule-code']");
    },
    insertBulletDescriptionValueSet: function (bulletDescTextValue) {
        //Add logic to switch frames
        mModuleCodeUIObj.verfiyElementExists("button[data-test='codemodule-insertbutton']");
        browser.click("button[data-test='codemodule-insertbutton']");
        browser.pause(1000);
    },
    insert: function (codeText, codeType) {
        mModuleCodeUIObj.verfiyElementExists("button[data-test='codemodule-insertbutton']");
        browser.click("button[data-test='codemodule-insertbutton']");
        browser.pause(1000);
    },
    update: function (codeText, codeType) {
        mModuleCodeUIObj.verfiyElementExists("button[data-test='codemodule-updatebutton']");
        browser.click("button[data-test='codemodule-updatebutton']");
        browser.pause(1000);
    },
    cancel: function (codeText, codeType) {
        mModuleCodeUIObj.verfiyElementExists("button[data-test='codemodule-cancelbutton']");
        browser.click("button[data-test='codemodule-cancelbutton']");
        browser.pause(1000);
    }
}

module.exports = mModuleBulletUIObj;
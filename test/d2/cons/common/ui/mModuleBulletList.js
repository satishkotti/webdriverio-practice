var maxWaitTimeInMs = 20000;

var mModuleBulletUIObj = {
    
    getModuleHeadlineLabel: function () {
        return browser.getText("div[data-test='bulletedlist-moduleheadlinelabel']");
    },
    getModuleHeadline: function () {
        browser.getValue("input[data-test='bulletedlist-moduleheadline']");
    },
    setModuleHeadline: function (textValue) {
        $("input[data-test='bulletedlist-moduleheadline']").clearElement().setValue(textValue);
    },
    getModuleDescriptionLabel: function () {
        return browser.getText("div[data-test='bulletedlist-moduledescriptionlabel']");
    },
    getModuleDescription: function () {
        browser.getValue("input[data-test='bulletedlist-moduledescription']");
    },
    setModuleDescription: function (textValue) {
        $("input[data-test='bulletedlist-moduledescription']").clearElement().setValue(textValue);
    },
    getAlignLabel: function(){
        return browser.getText("div[data-test='bulletedlist-alignlabel']");
    },
    getAlign: function(){
        return browser.element("select[data-test='bulletedlist-align']").getValue();
    },
    setAlign: function(textValue){
        var selectBox = browser.element("select[data-test='bulletedlist-align']");
        selectBox.selectByVisibleText(textValue);
    },
    getInsertBulletTitleLabel: function(){
        return browser.getText("div[data-test='bulletedlist-bullettitlelabel']");
    },
    getInsertBulletTitle: function(){
        return browser.getValue("input[data-test='bulletedlist-bullettitle']");
    },
    setInsertBulletTitle: function(textValue){
       $("input[data-test='bulletedlist-bullettitle']").clearElement().setValue(textValue);
    },
     getBullets: function(){

        var rows = browser.elements("table[data-test='bulletedlist-bulletstable'] > tbody > tr");
        //iterateOverEach bullet

    },
    getBulletsTableTitle: function(){
        return browser.getText("div[data-test='bulletedlist-bulletstable-titleheader']");
    },
    getInsertBulletDescriptionLabel: function(){
          return browser.getValue("input[data-test='bulletedlist-bulletdescriptionlabel']");
    },
    getInsertBulletDescription: function(){
        mModuleBulletUIObj.switchToRichTextEditorFrame();
        return browser.element("body").getHTML();
    },
    getBulletsLabel: function(){
        return browser.getText("div[data-test='bulletedlist-bulletslabel']");
    },
   
    setInsertBulletDescription: function(textValue){
        mModuleBulletUIObj.switchToRichTextEditorFrame();
        browser.element("body").setValue(textValue);
    },
    switchToBulletDescFrame: function(){
        browser.frame();
        var bulletDescEditorFrame = browser.element("div[data-test='bulletedlist-bulletdescriptioniframe']");
        browser.frame(bulletDescEditorFrame.value);
    },
    switchToRichTextEditorFrame: function(){
        mModuleBulletUIObj.switchToBulletDescFrame();
        var richTextEditorFrame = browser.element("//iframe")[0];
        browser.frame(richTextEditorFrame.value);
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
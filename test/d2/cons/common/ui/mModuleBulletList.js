var maxWaitTimeInMs = 20000;

var mModuleBulletUIObj = {
    
    getModuleHeadlineLabel: function () {
        
        return browser.getText("div[data-test='bulletedlist-moduleheadlinelabel']");
    },
    getModuleHeadline: function () {
        browser.getValue("input[data-test='bulletedlist-moduleheadline']");
    },
    setModuleHeadline: function (textValue) {
        mModuleBulletUIObj.verfiyElementExists("input[data-test='bulletedlist-moduleheadline']");
        //$("input[data-test='bulletedlist-moduleheadline']").clearElement().setValue(textValue);
        browser.setValue("input[data-test='bulletedlist-moduleheadline']",textValue);
    },
    getModuleDescriptionLabel: function () {
        return browser.getText("div[data-test='bulletedlist-moduledescriptionlabel']");
    },
    getModuleDescription: function () {
        browser.getValue("input[data-test='bulletedlist-moduledescription']");
    },
    setModuleDescription: function (textValue) {
        //$("input[data-test='bulletedlist-moduledescription']").clearElement().setValue(textValue);
         browser.setValue("input[data-test='bulletedlist-moduledescription']",textValue);
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
      // $("input[data-test='bulletedlist-bullettitle']").clearElement().setValue(textValue);
       browser.setValue("input[data-test='bulletedlist-bullettitle']",textValue);
    },
     getBullets: function(){

        var rows = browser.elements("table[data-test='bulletedlist-bulletstable'] > tbody > tr");
        //iterateOverEach bullet

    },
    getBulletsTableTitle: function(){
        return browser.getText("div[data-test='bulletedlist-bulletstable-titleheader']");
    },
    getInsertBulletDescriptionLabel: function(){
          return browser.getText("div[data-test='bulletedlist-bulletdescriptionlabel']");
    },
    getInsertBulletDescription: function(){
         mModuleBulletUIObj.switchToBulletDescFrame();
       // mModuleBulletUIObj.switchToRichTextEditorFrame();
       // return browser.element("body").getHTML();
       browser.pause(5000);
            var expectedbulletdescription= browser.execute("return document.getElementsByTagName('iframe').item(0).contentDocument.getElementsByTagName('p').item(0).textContent").value;
        return expectedbulletdescription;
         browser.frameParent();
        
    },
    getBulletsLabel: function(){
        return browser.getText("div[data-test='bulletedlist-bulletslabel']");
    },
   
    setInsertBulletDescription: function(textValue){
        mModuleBulletUIObj.switchToBulletDescFrame();
        browser.click("//span[contains(@class,'bold_icon')]");
        mModuleBulletUIObj.switchToRichTextEditorFrame();
    },
    switchToBulletDescFrame: function(){
       
        browser.frame("bulletDescContentFrame");
        browser.pause(5000);
    },
    switchToRichTextEditorFrame: function(){
        //mModuleBulletUIObj.switchToBulletDescFrame();
        // var richTextEditorFrame = browser.element("//iframe")[0];
        // browser.frame(richTextEditorFrame.value);
        //  browser.pause(5000);
         browser.execute("document.getElementsByTagName('iframe').item(0).contentWindow.document.getElementsByTagName('p').item(0).textContent = 'D2'").pause(10000);
          browser.frameParent();
    },
   moduleHeadlineValueSet: function () {
        return browser.getValue("textarea[data-test='codemodule-code']");
    },
    alignValueSelectedSet: function () {
        return browser.getValue("textarea[data-test='codemodule-code']");
    },
    insertBulletDescriptionValueSet: function (bulletDescTextValue) {
        //Add logic to switch frames
        mModuleBulletUIObj.verfiyElementExists("button[data-test='codemodule-insertbutton']");
        browser.click("button[data-test='codemodule-insertbutton']");
        browser.pause(1000);
    },
    insert: function (codeText, codeType) {
        mModuleBulletUIObj.verfiyElementExists("button[data-test='codemodule-insertbutton']");
        browser.click("button[data-test='codemodule-insertbutton']");
        browser.pause(1000);
    },
    update: function (codeText, codeType) {
        mModuleBulletUIObj.verfiyElementExists("button[data-test='codemodule-updatebutton']");
        browser.click("button[data-test='codemodule-updatebutton']");
        browser.pause(1000);
    },
    cancel: function (codeText, codeType) {
        mModuleBulletUIObj.verfiyElementExists("button[data-test='codemodule-cancelbutton']");
        browser.click("button[data-test='codemodule-cancelbutton']");
        browser.pause(1000);
    
    },


     verfiyElementExists: function(selectorVal){
        if(!browser.isExisting(selectorVal))
        {
            browser.frame();
            browser.waitForExist(selectorVal, maxWaitTimeInMs);
        }
     },

     RepositoryRefresh:function()
        {

            browser.leftClick('//span[contains(.,"Repository browser")]//*[@id="menuDownArrow-button"]');
            browser.waitForVisible("//*[@id='refreshWidget-menuItem']");
            browser.leftClick("//*[@id='refreshWidget-menuItem']");
        }
}

module.exports = mModuleBulletUIObj;
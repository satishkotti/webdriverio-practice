var maxWaitTimeInMs = 20000;
var contentTab = require('./../../common/actions/contentTab.actions');

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
      mModuleBulletUIObj.verfiyElementExists("input[data-test='bulletedlist-bullettitle']");
     // browser.pause(2000);
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

    bulletEdit: function(bullettitle){
        browser.leftClick("//img[@ng-click='editBullet(bullet)']");
             browser.waitForVisible("//input[@ng-model='bulletTitle']", 50000);
             browser.setValue("//input[@ng-model='bulletTitle']",bullettitle);
             
            var bulletTitle= browser.execute("return document.querySelectorAll('.form-control').item(3).value").value;
             browser.frame("bulletDescContentFrame");
            browser.pause(5000);
            browser.click("//span[contains(@class,'bold_icon')]");
            browser.execute("document.getElementsByTagName('iframe').item(0).contentWindow.document.getElementsByTagName('p').item(0).textContent = 'D2QA'").pause(5000);
            var bulletdescription= browser.execute("return document.getElementsByTagName('iframe').item(0).contentDocument.getElementsByTagName('p').item(0).textContent").value;
            

            browser.frameParent();
			
            browser.leftClick('//button[@ng-click="saveBullet()"]');
			
			
            browser.leftClick("//img[@ng-click='editBullet(bullet)']");
            var expectedbulletTitle= browser.execute("return document.querySelectorAll('.form-control').item(3).value").value;
            browser.frame("bulletDescContentFrame");
            browser.pause(5000);
            var expectedbulletdescription= browser.execute("return document.getElementsByTagName('iframe').item(0).contentDocument.getElementsByTagName('p').item(0).textContent").value;
            

            browser.frameParent();
            expect(bulletTitle).to.equal(expectedbulletTitle);
            expect(bulletdescription).to.equal(expectedbulletdescription);


    },


    bulletTitleEdit: function(headline,updatedheadline){

        browser.doubleClick("(//figcaption[@class='embedModuleClickable' and contains(.,'"+headline+"')])");
        browser.frameParent();
         browser.pause(5000);
            browser.setValue("#moduleheadline",updatedheadline);
             browser.waitForVisible("//div[@class='modal-footer']//button[contains(.,'Update')]", 50000);
             browser.click("//div[@class='modal-footer']//button[contains(.,'Update')]");
             browser.pause(5000);
    },
   moduleHeadlineValueSet: function () {
        return browser.getValue("textarea[data-test='codemodule-code']");
    },
    alignValueSelectedSet: function () {
        return browser.getValue("textarea[data-test='codemodule-code']");
    },
    insertBulletDescriptionValueSet: function (bulletDescTextValue) {
        //Add logic to switch frames
        mModuleBulletUIObj.verfiyElementExists("button[data-test='bulletedlist-bulletinsertbutton']");
        browser.click("button[data-test='bulletedlist-bulletinsertbutton']");
        browser.pause(1000);
    },
    insert: function (codeText, codeType) {
            mModuleBulletUIObj.verfiyElementExists("button[data-test='bulletedlist-insertbutton']");
            browser.click("button[data-test='bulletedlist-insertbutton']");
            browser.pause(1000);
    },
    save: function (codeText, codeType) {
        mModuleBulletUIObj.verfiyElementExists("button[data-test='bulletedlist-bulletsavebutton']");
        browser.click("button[data-test='bulletedlist-bulletsavebutton']");
        browser.pause(1000);
    },
    insertModuleValidation: function (headline) {
       contentTab.contenttabframeswitching();
        expect(headline).to.equal(browser.getText("(//figcaption[@class='embedModuleClickable' and contains(.,'"+headline+"')])"));
    },
    cancel: function (codeText, codeType) {
        mModuleBulletUIObj.verfiyElementExists("button[data-test='bulletedlist-bulletcancelbutton']");
        browser.click("button[data-test='bulletedlist-bulletcancelbutton']");
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
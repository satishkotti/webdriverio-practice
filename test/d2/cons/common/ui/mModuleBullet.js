var maxWaitTimeInMs = 20000;

var mModuleBulletUIObj = {
    
    moduleHeadlineLabelGet: function () {
        return browser.getText("div[data-test='bulletedlist-moduleheadlinelabel']");
    },
    moduleDescLabelGet: function () {
        return browser.getText("div[data-test='bulletedlist-moduledescriptionlabel']");
    },
    moduleHeadlineValueGet: function () {
        return browser.getText("div[data-test='bulletedlist-moduleheadline']");
    },
    alignLabelGet: function(){
        return browser.getText("div[data-test='bulletedlist-alignlabel']");
    },
    bulletsLabelGet: function(){
        return browser.getText("div[data-test='bulletedlist-bulletslabel']");
    },
    alignValueSelectedGet: function () {
        return browser.getValue("textarea[data-test='codemodule-code']");
    },
    insertBulletTitleLabelGet: function(){
        return browser.getText("div[data-test='bulletedlist-bullettitlelabel']");
    },
    insertBulletTitleValueGet: function(textValue){
        browser.setValue("textarea#wbmd_keywords-input", textValue);
        browser.getText("div[data-test='bulletedlist-bullettitlelabel']");
    },

    insertBulletDescLabelGet: function(){
        return browser.getText("div[data-test='bulletedlist-bulletdescriptionlabel']");
    },

    insertBulletDescValueGet: function(){

    },

    titleListGet: function(){
    },
    insertBulletTitleValueSet: function(){
        return browser.getText("div[data-test='']");
    },
    insertBulletDescValueSet: function(){
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
    insertDescription: function (codeText, codeType) {
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
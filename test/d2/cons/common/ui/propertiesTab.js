var maxWaitTimeInMs = 30000;
var propertiesTabSelector= "//span[text()='Properties']";

module.exports = {
    chronicleIdGet: function(){
        return browser.getText("div#i_chronicle_id");
    },
    objectNameSet: function(textValue){
        browser.setValue("input#object_name-input", textValue);
    },
    objectNameGet: function(){
        return browser.getValue("input#object_name-input");
    },
    friendlyNameSet: function(textValue){
        browser.setValue("input#wbmd_c_frnd_nm-input", textValue);
    },
    friendlyNameGet: function(){
        return browser.getValue("input#wbmd_c_frnd_nm-input");
    },
    userDescriptionNameSet: function(textValue){
         browser.setValue("textarea#wbmd_desc_user-input", textValue);
    },
    userDescriptionNameGet: function(){
        return browser.getValue("textarea#wbmd_desc_user-input");
    },
    keywordsNameSet: function(textValue){
        browser.setValue("textarea#wbmd_keywords-input", textValue);
    },
    keywordsNameGet: function(){
        return browser.getValue("textarea#wbmd_keywords-input");
    },
    windowTitleSet:function(textValue){
        browser.setValue("input#wbmd_wdw_ttl-input", textValue);
    },
    windowTitleGet: function(){
        return browser.getValue("input#wbmd_wdw_ttl-input");
    },
    linkTitleSet: function(textValue){
        browser.setValue("input#wbmd_lk_ttl-input", textValue);
    },
    linkTitleGet: function(){
        return browser.getValue("input#wbmd_lk_ttl-input");
    },
    publicationSet: function(textValue){
         // browser.setValue("input#wbmd_publ-input", textValue);
          browser.click("//div[@id='wbmd_publ']/img")
          browser.pause(1000);  
          browser.click("//div[@title='"+textValue+"']")
          browser.pause(1000);
    },
    publicationGet: function(){
        return browser.getValue("input#wbmd_publ-input");
        browser.pause(1000);
    },
    copyrightSet: function(textValue){
         // browser.setValue("input#wbmd_cpyrt-input", textValue);
         browser.click("//div[@id='wbmd_cpyrt']/img")
          browser.pause(1000);  
          browser.click("//div[@title='"+textValue+"']")
          browser.pause(1000);
    },
    copyrightGet: function(){
        return browser.getValue("input#wbmd_cpyrt-input");
    },
    primaryTopicIdSet: function(textValue){
         // browser.setValue("input#wbmd_c_prim_top_id-input", textValue);
           browser.click("//div[@id='wbmd_c_prim_top_id']/img")
          browser.pause(1000);  
          browser.click("//div[@title='"+textValue+"']")
          browser.pause(1000);
    },
    primaryTopicIdGet: function(){
        return browser.getValue("input#wbmd_c_prim_top_id-input");
    },
    busRefNameSet: function(textValue){
          browser.click("//div[@id='wbmd_bus_ref']/img")
          browser.pause(1000);  
          browser.click("//div[@title='"+textValue+"']")
          //browser.setValue("input#wbmd_bus_ref-input", textValue);
          browser.pause(1000);
    },
    busRefNameGet: function(){
        return browser.getValue("input#wbmd_bus_ref-input");
    },
    originalPublishDateSet: function(){
          browser.click("//div[@id='wbmd_orig_pub_dt']/img");
          browser.waitForVisible("//button[contains(.,'Now')]");
          browser.click("//button[contains(.,'Now')]");
          //browser.setValue("input#wbmd_bus_ref-input", textValue);
          browser.pause(1000);
    },

    articleTabSelect: function(){
        browser.click("//span[@text()='Article']")
    },
    propertiesTabSelect: function(){
        browser.waitForVisible(propertiesTabSelector, maxWaitTimeInMs);
        browser.click(propertiesTabSelector);
        browser.waitForVisible("#i_chronicle_id", maxWaitTimeInMs);
    },

    edit: function(){
        browser.waitForVisible("//div[@tag_id='Properties-widget']//button[text()='Edit']", maxWaitTimeInMs);
        browser.click("//div[@tag_id='Properties-widget']//button[text()='Edit']");
    },
    save: function(){
         browser.click("//div[@tag_id='Properties-widget']//button[text()='Save']");
         browser.pause(5000);
    },
    cancelEdit: function(){
         browser.click("//div[@tag_id='Properties-widget']//button[text()='Cancel Edit']");
         browser.pause(5000);
    }
}


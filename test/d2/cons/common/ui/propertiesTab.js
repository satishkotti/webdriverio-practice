var maxWaitTimeInMs = 30000;
var propertiesTabSelector= "//span[text()='Properties']";
var moment =require('moment-timezone');

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
         browser.pause(6000);
    },
    cancelEdit: function(){
         browser.click("//div[@tag_id='Properties-widget']//button[text()='Cancel Edit']");
         browser.pause(5000);
    },
    originalPublishDateTimeset: function(dateTimeStamp){
        browser.setValue("#wbmd_orig_pub_dt-input", dateTimeStamp);
    },
      overrideSiteArchiveDateTimeset: function(dateTimeStamp){
        browser.setValue("#wbmd_site_archv_ovrd_dt-input", dateTimeStamp);
    },
      primaryMedicalReviewDateTimeset: function(dateTimeStamp){
        browser.setValue("#wbmd_prim_revw_dt-input", dateTimeStamp);
    },
       secondaryMedicalReviewDateTimeset: function(dateTimeStamp){
        browser.setValue("#wbmd_c_sec_med_revw_dt-input", dateTimeStamp);
    },
       editorReviewDateTimeset: function(dateTimeStamp){
        browser.setValue("#wbmd_c_edtr_revr_dt-input", dateTimeStamp);
    },
       copyEditorReviewDateTimeset: function(dateTimeStamp){
        browser.setValue("#wbmd_c_cons_revw_dt-input", dateTimeStamp);
    },
      sponsorMLRDateTimeset: function(dateTimeStamp){
        browser.setValue("#wbmd_sponsor_mlr_dt-input", dateTimeStamp);
    },
      sponsorInternalMLRDateTimeset: function(dateTimeStamp){
        browser.setValue("#wbmd_sponsor_int_mlr_dt-input", dateTimeStamp);
    },
     effectiveDateTimeset: function(dateTimeStamp){
        browser.setValue("#wbmd_eff_date-input", dateTimeStamp);
    },
     expirationDateTimeset: function(dateTimeStamp){
        browser.setValue("#wbmd_exp_date-input", dateTimeStamp);
    },
    authRevtab: function(){
        browser.click("//span/span[contains(.,'Auth & Rev')]");
        browser.pause(1000);
    },
     sponsorMLRtab: function(){
        browser.click("//span/span[contains(.,'Sponsor MLR')]");
        browser.pause(1000);
    },
     publishingtab: function(){
        browser.click("//span/span[contains(.,'Auth & Rev')]");
        browser.click("//span/span[contains(.,'Publishing')]");
        browser.pause(1000);
    },
 publishingTabSelect: function(){
        
        browser.click("//span/span[contains(.,'Publishing')]");
        browser.pause(1000);
    },
    otherTabSelect: function(){
        browser.click("//span/span[contains(.,'Other')]")
    },
    objectTitleGet: function(){
        return browser.getValue("input#title-input");
    },
     publishingTabSelect: function(){
        browser.click("//span//span[contains(.,'Publishing')]");

    },
      systemPublishingDateSet:function(textValue){
         browser.setValue("#wbmd_eff_date-input",textValue);
    },
     expirationDateSet:function(textValue){
         return browser.setValue("#wbmd_exp_date-input",textValue);

    },


}


var maxWaitTimeInMs = 30000;
var propertiesTabSelector= "//span[text()='Properties']";
var basicTabSelector="//span[text()='Basic Information']";
var isExist="";
module.exports = {
    chronicleIdGet: function(){
        return browser.getText("#wbmd_legacy_id");
    },
    objectNameSet: function(textValue){
        browser.setValue("input#object_name-input", textValue);
    },
    objectNameGet: function(){
        return browser.getValue("input#object_name-input");
    },
    TitleSet: function(textValue){
         browser.setValue("#title-input", textValue);
    },
    TitileGet: function(){
        return browser.getValue("#title-input");
    },
    WindowTitleOverrideSet: function(textValue){
        browser.setValue("input#wbmd_wdw_ttl-input", textValue);
    },
    WindowTitleOverrideGet: function(){
        return browser.getValue("input#wbmd_wdw_ttl-input");
    },
    SuperTitleSet: function(textValue){
         browser.setValue("#wbmd_super_title-input", textValue);
    },
    SuperTitleGet: function(){
        return browser.getValue("#wbmd_super_title-input");
    },
    SubTitleSet: function(textValue){
         browser.setValue("#wbmd_sub_title-input", textValue);
    },
    SubTitleGet: function(){
        return browser.getValue("#wbmd_sub_title-input");
    },

    ContentTypeSet: function(textValue){
         browser.setValue("#wbmd_bus_ref-input", textValue);
    },
    ContentTypeGet: function(){
        return browser.getValue("#wbmd_bus_ref-input");
    },

    LeadSpecialtySet: function(textValue){
        browser.setValue("#wbmd_lead_spclty-input", textValue);
    },
    LeadSpecialtyGet: function(){
        return browser.getValue("#wbmd_lead_spclty-input");
    },

    AssistanceType: function(AssistanceType){
         browser.click("//div[@id='"+ AssistanceType +"']//div[@id='assistance']");
    },
    AssistanceValue: function(AssistanceType,InputAssistanceValue){
         browser.waitForVisible("//div[@id='"+ AssistanceType +"']//div[@id='"+ InputAssistanceValue +"']", maxWaitTimeInMs);
         browser.doubleClick("//div[@id='"+ AssistanceType +"']//div[@id='"+ InputAssistanceValue +"']");
         browser.click("//*[@id='ok-button']//button[text()='OK']");
    },

     
    LeadConceptSet: function(textValue){
        browser.setValue("#wbmd_lead_concept-input", textValue);
    },
    
    LeadConceptGet: function(){
        return browser.getValue("#wbmd_lead_concept-input");
    },
       
    KeywordsSet: function(textValue){
        browser.setValue("#wbmd_keywords-input", textValue);
    },

     KeywordsGet: function(textValue){
        browser.getValue("#wbmd_keywords-input", textValue);
    },
    WbmddescuserSet: function(textValue){
        browser.setValue("#wbmd_desc_user-input", textValue);
    },
    WbmddescuserGet: function(textValue){
        browser.getValue("#wbmd_desc_user-input", textValue);
    },
    WbmddescmetaSet: function(textValue){
        browser.setValue("#wbmd_desc_meta-input", textValue);
    },
    WbmddescmetaGet: function(textValue){
        browser.getValue("#wbmd_desc_meta-input", textValue);
    },
  
    ImgthmbSet: function(textValue){
        browser.setValue("#wbmd_img_thmb-input", textValue);
    },
    ImgthmbGet: function(textValue){
        browser.getValue("#wbmd_img_thmb-input", textValue);
    },
    
   
    ArticleLink: function(){
         browser.click("//div[@id=='wbmd_rel_links_asset']//div[@id='add']");
    },
    AddArticleLink: function(textValue){
         browser.setValue("//div[@id='x3-message-box']//input[@type='text']",textValue);
         browser.click("//*[@id='x3-message-box']//button[text()='OK']");
    },
    WbmdrellinksinputSet: function(textValue){
        browser.setValue("#wbmd_rel_links_type-input", textValue);
    },
    WbmdrellinksinputGet: function(textValue){
        browser.getValue("#wbmd_rel_links_type-input", textValue);
    },
    WbmdrellinklblinputSet: function(textValue){
        browser.setValue("#wbmd_rel_link_lbl-input", textValue);
    },
    
    WbmdrellinklblinputGet: function(textValue){
        browser.getValue("#wbmd_rel_link_lbl-input", textValue);
    },
    SupresschkboxSet: function(supresschkboxtype,textValue){
        browser.waitForVisible(" "+supresschkboxtype+" > input.x-form-checkbox", maxWaitTimeInMs);
        var isSSSChecked = browser.element(" "+supresschkboxtype+" > input.x-form-checkbox").isSelected();
        if(!isSSSChecked && isSSSChecked.toString() === textValue)
            return;
        
        browser.element(" "+supresschkboxtype+" > input.x-form-checkbox']").click();
    },
    
    AdExclusion: function(){
         browser.click("//div[@id=='wbmd_ad_excl']//div[@id='add']");
    },
    AddAdExclusion: function(textValue){
         
         browser.setValue("//div[@id='x3-message-box']//input[@type='text']",textValue);
         browser.click("//div[@id='x3-message-box']//button[text()='OK']");
    },
    WbmdlanguageSet: function(textValue){
        browser.setValue("#wbmd_language-input", textValue);
    },
    
    WbmdlanguageGet: function(textValue){
        browser.getValue("#wbmd_language-input", textValue);
    },
  
    WbmdProdtypeSet: function(textValue){
        browser.setValue("#wbmd_prod_type-input", textValue);
    },
    
    WbmdProdtypeGet: function(textValue){
         browser.getValue("#wbmd_prod_type-input", textValue);
    },
   
    
    contentDeveloperSet: function(textValue){
        browser.setValue("#wbmd_cont_dev-input", textValue);
    },
    contentDeveloperGet: function(){
        return browser.getValue("#wbmd_cont_dev-input");
    },
    articleTOCDisplayFormatSet:function(textValue){
         return browser.setValue("#wbmd_toc_display-input",textValue);
    },
    articleTOCDisplayFormatGet:function(){
         return browser.getValue("#wbmd_toc_display-input");
    },

    systemPublishingDateSet:function(textValue){
         browser.setValue("#wbmd_exp_date-input",textValue);
    },
    systemPublishingDateGet:function(){
         return browser.getValue("#wbmd_exp_date-input");
    },


    expirationDateSet:function(textValue){
         return browser.setValue("#wbmd_toc_display-input",textValue);
    },
    expirationDateGet:function(){
         return browser.getValue("#wbmd_toc_display-input");
    },


       
    articleTabSelect: function(){
        browser.click("//div[@id='PropertiesDialog']//a//span[contains(text(),'Article')]")
    },
    publicationTabSelect: function(){
        browser.click("//span[text()='Publication']")
    },
    contributorsTabSelect: function(){
        browser.click("//span[@text()='Contributors']")
    },
    publishingTabSelect: function(){
        browser.click("//span[@text()='Publishing']")
    },
    otherTabSelect: function(){
        browser.click("//span[@text()='Other']")
    },
    propertiesTabSelect: function(){
        browser.waitForVisible(propertiesTabSelector, maxWaitTimeInMs);
        browser.click(propertiesTabSelector);
        browser.waitForVisible("#wbmd_legacy_id", maxWaitTimeInMs);
    },
    propertiesBasicTabSelect: function(){
        browser.waitForVisible(propertiesTabSelector, maxWaitTimeInMs);
        browser.click(propertiesTabSelector);
        browser.waitForVisible(basicTabSelector, maxWaitTimeInMs);
        browser.click(basicTabSelector);
        browser.waitForVisible("#wbmd_legacy_id", maxWaitTimeInMs);
    },
    edit: function(){
        browser.click("//div[@tag_id='Properties-widget']//button[text()='Edit']");
    },
    save: function(){
         browser.click("//div[@tag_id='Properties-widget']//button[text()='Save']");
         browser.pause(5000);
    },
    cancelEdit: function(){
         browser.click("//div[@tag_id='Properties-widget']//button[text()='Cancel Edit']");
         browser.pause(5000);
    },
    verifyProperties:function checkeditpropertieslabels(labelPropertiesArray){
        
        if(labelPropertiesArray && labelPropertiesArray.length > 0)
        {
        if(!browser.isExisting("//div/label[@for='"+labelPropertiesArray[0]+"']"))            
        isExist+="//div/label[@for='"+labelPropertiesArray[0]+"']";

        labelPropertiesArray.shift();
        return checkeditpropertieslabels( browser, labelPropertiesArray);
        }
        return isExist;
    },
    verifyBasicInfoProperties:function basicinfopropertieslabels(labelPropertiesArray){
        
        if(labelPropertiesArray && labelPropertiesArray.length > 0)
        {
        if(!browser.isExisting("//div/label[@for='"+labelPropertiesArray[0]+"']"))            
        isExist+="//div/label[@for='"+labelPropertiesArray[0]+"']";

        labelPropertiesArray.shift();
        return basicinfopropertieslabels( browser, labelPropertiesArray);
        }
        return isExist;
    }
    ,
    verifyArticleTabProperties:function articleTabpropertieslabels(labelPropertiesArray){
        
        if(labelPropertiesArray && labelPropertiesArray.length > 0)
        {
        if(!browser.isExisting("//div/label[@for='"+labelPropertiesArray[0]+"']"))            
        isExist+="//div/label[@for='"+labelPropertiesArray[0]+"']";

        labelPropertiesArray.shift();
        return articleTabpropertieslabels( browser, labelPropertiesArray);
        }
        return isExist;
    },
    verifyMandatoryFieldsforProperties: function(){
        var IsExistLead = browser.isExisting("//span[contains(., 'Lead Specialty')]");
        var IsExistContent = browser.isExisting("//span[contains(., 'Content Developer')]");
        var IsExistwarningClass = browser.isExisting("//div[contains(@class,'ext-mb-warning')]");
        browser.click("//div[@class='x-window-br']//button[contains(.,'OK')]");
        if(IsExistLead == true && IsExistwarningClass == true && IsExistContent == true)
            return true;
        else
            return false;
    }
}


var maxWaitTimeInMs = 60000;
var propertiesTabSelector= "//span[text()='Properties']";
var basicTabSelector="//span[text()='Basic Information']";
var outputTypeTabSelector="//span[text()='Output Type']";
var profOutputPublishingTabSelector="//span[text()='Publishing']";
var profOutputOtherTabSelector="//span[text()='Other']";
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
    titleSet: function(textValue){
         browser.setValue("#title-input", textValue);
    },
    titileGet: function(){
        return browser.getValue("#title-input");
    },
    outputTypeGet: function(){
        return browser.getValue("#wbmd_outpt_type-input");
    },
    shortTitleSet: function(textValue){
        browser.setValue("input#wbmd_wdw_ttl-input", textValue);
    },
    shortTitleGet: function(){
        return browser.getValue("input#wbmd_wdw_ttl-input");
    },
    superTitleSet: function(textValue){
         browser.setValue("#wbmd_super_title-input", textValue);
    },
    superTitleGet: function(){
        return browser.getValue("#wbmd_super_title-input");
    },
    subTitleSet: function(textValue){
         browser.setValue("#wbmd_sub_title-input", textValue);
    },
    subTitleGet: function(){
        return browser.getValue("#wbmd_sub_title-input");
    },
    leadSpecialtySet: function(textValue){
        browser.setValue("#wbmd_lead_spclty-input", textValue);
    },
    leadSpecialtyGet: function(){
        return browser.getValue("#wbmd_lead_spclty-input");
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
         browser.setValue("#wbmd_eff_date-input",textValue);
    },
    sysPublishingDateGet: function(){
        return browser.getValue("#wbmd_eff_date-input");
    },
    versionLabelGet: function(){
        return browser.getText("#r_version_label");
    }, 
    objectTypeGet: function(){
        return browser.getText("#r_object_type");
    },  
    systemPublishingDateGet:function(){
         return browser.getValue("#wbmd_eff_date-input");
    },
    expirationDateSet:function(textValue){
         return browser.setValue("#wbmd_exp_date-input",textValue);
    },
    expirationDateGet:function(){
         return browser.getValue("#wbmd_exp_date-input");
    },
    articleTabSelect: function(){
        browser.click("//div[@id='PropertiesDialog']//a//span[contains(text(),'Article')]");
    },
    publicationTabSelect: function(){
        browser.click("//span[text()='Publication']");
    },
    contributorsTabSelect: function(){
        browser.click("//span[text()='Contributors']");
    },
    publishingTabSelect: function(){
        browser.click("//span//span[contains(.,'Publishing')]");
    },
    otherTabSelect: function(){
        browser.pause(2000);
        browser.click("//span//span[contains(.,'Other')]");
    },
    propertiesTabSelect: function(){
        browser.waitForVisible(propertiesTabSelector, maxWaitTimeInMs);
        browser.click(propertiesTabSelector);
       browser.waitForVisible("#title-input", maxWaitTimeInMs);
    },
    ProfMediaPropertiesTabSelect: function(){
        browser.waitForVisible(propertiesTabSelector, maxWaitTimeInMs);
        browser.click(propertiesTabSelector);
        browser.waitForVisible("#object_name-input", maxWaitTimeInMs);
    },
    propertiesBasicTabSelect: function(){
        browser.waitForVisible(propertiesTabSelector, maxWaitTimeInMs);
        browser.click(propertiesTabSelector);
        browser.waitForVisible(basicTabSelector, maxWaitTimeInMs);
        browser.click(basicTabSelector);
        browser.waitForVisible("#wbmd_legacy_id", maxWaitTimeInMs);
    },
    propertiesOtherTabElements: function(){
        browser.isExisting("//label[@for='language_code']");
        browser.isExisting("//label[@for='r_current_state']");
        browser.isExisting("//label[@for='authors']");
        browser.isExisting("//label[@for='a_content_type']");
        browser.isExisting("//label[@for='r_full_content_size']");
        browser.isExisting("//label[@for='r_modify_date']");
        browser.isExisting("//label[@for='r_modifier']");
        browser.isExisting("//label[@for='r_creation_date']");
        browser.isExisting("//label[@for='r_creator_name']");
        browser.isExisting("//label[@for='r_lock_date']");
        browser.isExisting("//label[@for='r_lock_owner']");
        browser.isExisting("//label[@for='a_last_review_date']");
        browser.isExisting("//label[@for='r_access_date']");
        browser.isExisting("//label[@for='owner_name']");
        browser.isExisting("//label[@for='r_object_type']");
        browser.isExisting("//label[@for='r_version_label']");
    },

    propertiesOutputTypeTabSelect: function(){
        browser.waitForVisible(propertiesTabSelector, maxWaitTimeInMs);
        browser.click(propertiesTabSelector);
        browser.waitForVisible(outputTypeTabSelector, maxWaitTimeInMs);
        browser.click(outputTypeTabSelector);
        browser.waitForVisible("#object_name-input", maxWaitTimeInMs);
    },
    getProfOutputPublishingTab: function(){
        browser.waitForVisible(propertiesTabSelector, maxWaitTimeInMs);
        browser.click(propertiesTabSelector);
        browser.pause(5000);
        browser.waitForVisible(profOutputPublishingTabSelector, maxWaitTimeInMs);
        browser.click(profOutputPublishingTabSelector);
        browser.waitForVisible("#wbmd_eff_date-input", maxWaitTimeInMs);
    },
    getProfOutputOtherTab: function(){
        browser.waitForVisible(propertiesTabSelector, maxWaitTimeInMs);
        browser.click(propertiesTabSelector);
        browser.waitForVisible(profOutputOtherTabSelector, maxWaitTimeInMs);
        browser.click(profOutputOtherTabSelector);
        browser.waitForVisible("#r_version_label", maxWaitTimeInMs);
    },
    edit: function(){
        if (browser.isVisible("//div[@tag_id='Properties-widget']//button[text()='Edit']"))
        {
            browser.click("//div[@tag_id='Properties-widget']//button[text()='Edit']");
        }
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

    clearManadatoryFields: function(){
        browser.clearElement("#title-input");
        browser.setValue("#wbmd_bus_ref-input","");
        browser.click("//a[@class='x-tab-right']//span[contains(text(),'Article')]");
        browser.click("//div[@id='Transcript']");   
        browser.click("//div[@id='wbmd_outpt_vers']//td//div[@id='remove']");
        browser.setValue("#wbmd_site-input","");
        browser.setValue("#wbmd_site_only-input","");
    },

    verifyMandatoryFieldsforProperties: function(){
        var IsExistTitle = browser.isExisting("//span[contains(., 'Title')]");
        var IsExistContentType = browser.isExisting("//span[contains(., 'Content Type')]");
        var IsExistLead = browser.isExisting("//span[contains(., 'Lead Specialty')]");
        var IsExistContent = browser.isExisting("//span[contains(., 'Content Developer')]");
        var IsExistOutputVersions = browser.isExisting("//span[contains(., 'Output Versions')]");
        var IsExistPrimaryOutput = browser.isExisting("//span[contains(., 'Primary Output')]");
        var IsExistSiteOn = browser.isExisting("//span[contains(., 'Site On')]");
        var IsExistSiteRestrictions = browser.isExisting("//span[contains(., 'Site Restrictions')]");
        var IsExistwarningClass = browser.isExisting("//div[contains(@class,'ext-mb-warning')]");
        browser.click("//div[@class='x-window-br']//button[contains(.,'OK')]");
        if(IsExistTitle == true && IsExistContentType == true && IsExistLead == true && IsExistwarningClass == true && IsExistContent == true 
        && IsExistOutputVersions == true && IsExistPrimaryOutput == true && IsExistSiteOn == true && IsExistSiteRestrictions == true)
        {
            return true;
        }
        else
        {
            return false;
        }
    },
    
    systemPublishingDateSet:function(textValue){
         browser.setValue("#wbmd_eff_date-input",textValue);
    },

    expirationDateSet:function(textValue){
         return browser.setValue("#wbmd_exp_date-input",textValue);
    },

    verifyProfMediaMandatoryFields: function(){
        var IsExistMedia = browser.isExisting("//span[contains(., 'Media Format')]");
        var IsExistwarningClass = browser.isExisting("//div[contains(@class,'ext-mb-warning')]");
        browser.click("//div[@class='x-window-br']//button[contains(.,'OK')]");
        if(IsExistMedia == true && IsExistwarningClass == true )
            return true;
        else
            return false;
    }

}


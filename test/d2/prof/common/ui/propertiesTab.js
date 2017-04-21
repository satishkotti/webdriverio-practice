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
        browser.click("//div[@id='PropertiesDialog']//a//span[contains(text(),'Article')]")
    },
    publicationTabSelect: function(){
        browser.click("//span[text()='Publication']")
    },
    contributorsTabSelect: function(){
        browser.click("//span[text()='Contributors']")
    },
    publishingTabSelect: function(){
        browser.click("//span[text()='Publishing']")
    },
    publishingSubsectionTabSelect: function(){
        browser.click("//span//span[contains(.,'Pub Subsection')]")
    },
    otherTabSelect: function(){
        browser.click("//span[@text()='Other']")
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
    },
    verifyProfMediaMandatoryFields: function(){
        var IsExistMedia = browser.isExisting("//span[contains(., 'Media Format')]");
        var IsExistwarningClass = browser.isExisting("//div[contains(@class,'ext-mb-warning')]");
        browser.click("//div[@class='x-window-br']//button[contains(.,'OK')]");
        if(IsExistMedia == true && IsExistwarningClass == true )
            return true;
        else
            return false;
    },
     description: function(textValue){
        browser.setValue("#wbmd_desc-input", textValue);
    },
    indexPageAdOverrid: function(textValue){
        browser.setValue("#wbmd_publ_ad_ovrd-input", textValue);
    },
    articlesPubURL: function(textValue){
        browser.setValue("#wbmd_publ_url_ovrd-input", textValue);
    }
}


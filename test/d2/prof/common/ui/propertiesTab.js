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
    titleSet: function(textValue){
         browser.setValue("#title-input", textValue);
    },
    titileGet: function(){
        return browser.getValue("#title-input");
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
    clearManadatoryFieldsForPublishSection: function(){
        //browser.waitForVisible("#object_name-input", maxWaitTimeInMs);
        //browser.clearElement("#object_name-input");
        browser.waitForVisible("#title-input", maxWaitTimeInMs);
        browser.clearElement("#title-input");
    },
    verifyMandatoryFieldsforPubSectionProp: function(){
        var IsExistTitle = browser.isExisting("//span[contains(., 'Title')]");
        var IsExistName = browser.isExisting("//span[contains(., 'Name')]");
        var IsExistwarningClass = browser.isExisting("//div[contains(@class,'ext-mb-warning')]");
        browser.click("//div[@class='x-window-br']//button[contains(.,'OK')]");
        if(IsExistTitle == true && IsExistName == true && IsExistwarningClass == true)
        {
            return true;
        }
        else
        {
            return false;
        }
    },
    setRequiredPropertiesForPubSection: function(Name, Title){
        //browser.setValue("#object_name-input", Name);
        browser.setValue("#title-input", Title);
    },
    setAllPropertiesForPubSection: function(Title){
        browser.setValue("#title-input", Title);
        browser.setValue("#wbmd_desc-input", 'PubSection Description');
        browser.setValue("#wbmd_publ_ad_ovrd-input", 'TestPub Section Page Ad Override');
        browser.setValue("#wbmd_publ_url_ovrd-input", 'TestPubURL');
    },

}


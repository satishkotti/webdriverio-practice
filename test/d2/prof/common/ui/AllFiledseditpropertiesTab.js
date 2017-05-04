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
    AssistanceValue: function(InputAssistanceValue){
         //browser.waitForVisible("//div[@id='AssistanceListDialog']//div[@id='"+ InputAssistanceValue +"']", maxWaitTimeInMs);
         
         browser.waitForExist("//div[@id='AssistanceListDialog']//div[@id='"+ InputAssistanceValue +"']");
         browser.doubleClick("//div[@id='AssistanceListDialog']//div[@id='"+ InputAssistanceValue +"']");
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
         browser.click("//div[@id='wbmd_rel_links_asset']//div[@id='add']");
    },
    AddArticleLink: function(textValue){
         
         browser.addValue("#x3-message-box > div.x-window-bwrap > div.x-window-ml >div.x-window-mr >div.x-window-mc >div.x-window-body >div.ext-mb-content >div.x-form-field-wrap >input.x-form-field",textValue);
         browser.click("//div[@id='x3-message-box']//button[text()='OK']");

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
        browser.waitForVisible(""+supresschkboxtype+" > input.x-form-checkbox", maxWaitTimeInMs);
        var isSSSChecked = browser.element(""+supresschkboxtype+" > input.x-form-checkbox").isSelected();
        if(!isSSSChecked && isSSSChecked.toString() === textValue)
            return;
        
        browser.element(""+supresschkboxtype+" > input.x-form-checkbox").click();
    },
    
    AdExclusion: function(){
         browser.click("//div[@id='wbmd_ad_excl']//div[@id='add']");
    },
    AddAdExclusion: function(textValue){
         
           browser.addValue("#x3-message-box > div.x-window-bwrap > div.x-window-ml >div.x-window-mr >div.x-window-mc >div.x-window-body >div.ext-mb-content >div.x-form-field-wrap >input.x-form-field",textValue);
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

    PrimaryOutputSet: function(textValue){
        browser.setValue("#wbmd_outpt_prim-input", textValue);
    },
    PrimaryOutputGet: function(){
        return browser.getValue("#wbmd_outpt_prim-input");
    },
    articleTOCDisplayFormatSet:function(textValue){
         return browser.setValue("#wbmd_toc_display-input",textValue);
    },
    articleTOCDisplayFormatGet:function(){
         return browser.getValue("#wbmd_toc_display-input");
    },
    QuestionnaireSet:function(textValue){
         return browser.setValue("#wbmd_qna_id-input",textValue);
    },
    QuestionnaireGet:function(){
         return browser.getValue("#wbmd_qna_id-input");
    },
    ActivitySet:function(textValue){
         return browser.setValue("#wbmd_activity-input",textValue);
    },
    ActivityGet:function(){
         return browser.getValue("#wbmd_activity-input");
    },
    ProdnameSet:function(textValue){
         browser.setValue("#wbmd_prod_name-input",textValue);
    },
    ProdnameGet:function(){
         return browser.getValue("#wbmd_prod_name-input");
    },

    PrimCollSet:function(textValue){
         browser.setValue("#wbmd_prim_coll-input",textValue);
    },
    PrimCollGet:function(){
         return browser.getValue("#wbmd_prim_coll-input");
    },
    ProjctidSet:function(textValue){
         browser.setValue("#wbmd_proj_id-input",textValue);
    },
    ProjctidGet:function(){
         return browser.getValue("#wbmd_proj_id-input");
    },

    SupprtrSet:function(textValue){
         browser.setValue("#wbmd_supprtr",textValue);
    },
    SupprtrGet:function(){
         return browser.getValue("#wbmd_supprtr");
    },
    AdTagOverridSet:function(textValue){
         browser.setValue("#wbmd_ad_override-input",textValue);
    },
    AdTagOverridGet:function(){
         return browser.getValue("#wbmd_ad_override-input");
    },
    OHCPDiscssSet:function(textValue){
         browser.setValue("#wbmd_discuss_brd_ohcp-input",textValue);
    },
    OHCPDiscssGet:function(){
         return browser.getValue("#wbmd_discuss_brd_ohcp-input");
    },

    MDDiscussionBoardSet:function(textValue){
         browser.setValue("#wbmd_discuss_brd_md-input",textValue);
    },
    MDDiscussionBoardGet:function(){
         return browser.getValue("#wbmd_discuss_brd_md-input");
    },
    
    NurseDiscussionBoardSet:function(textValue){
         browser.setValue("#wbmd_discuss_brd_nrs-input",textValue);
    },
    NurseDiscussionBoardGet:function(){
         return browser.getValue("#wbmd_discuss_brd_nrs-input");
    },

    RevwDTSet:function(textValue){
        browser.click("//div[@id='wbmd_revw_dt']/img")
        browser.pause(1000);  
        browser.click("//button[contains(.,'Now')]")
        browser.pause(1000);
    },
    PubDTSet:function(){
        browser.click("//div[@id='wbmd_pub_dt']/img")
        browser.pause(1000);  
        browser.click("//button[contains(.,'Now')]")
        browser.pause(1000);
    },

    ExternalIDSet:function(textValue){
         browser.setValue("#wbmd_ext_id-input",textValue);
    },
    ExternalIDGet:function(){
         return browser.getValue("#wbmd_ext_id-input");
    },
    
    PublicationSet:function(textValue){
         browser.setValue("#wbmd_publ-input",textValue);
    },
    PublicationGet:function(){
         return browser.getValue("#wbmd_publ-input");
    },
    
    PublicationSectionSet:function(textValue){
         browser.setValue("#wbmd_pub_sec_id-input",textValue);
    },
    PublicationSectionGet:function(){
         return browser.getValue("#wbmd_pub_sec_id-input");
    },

       
    PublicationSubSectionSet:function(textValue){
         browser.setValue("#wbmd_pub_subsec_id-input",textValue);
    },
    PublicationSubSectionGet:function(){
         return browser.getValue("#wbmd_pub_subsec_id-input");
    },

    PMIDSet:function(textValue){
         browser.setValue("#wbmd_pmid-input",textValue);
    },
    PMIDGet:function(){
         return browser.getValue("#wbmd_pmid-input");
    },
    
    PublicationDateSet:function(){
        browser.click("//div[@id='wbmd_orig_pub_dt']/img")
        browser.pause(1000);  
        browser.click("//button[contains(.,'Now')]")
        browser.pause(1000);
    },

    PublicationVolumeSet:function(textValue){
         browser.setValue("#wbmd_pub_vol-input",textValue);
    },
    PublicationVolumeGet:function(){
         return browser.getValue("#wbmd_pub_vol-input");
    },
    PublicationIssueSet:function(textValue){
         browser.setValue("#wbmd_pub_issue-input",textValue);
    },
    PublicationIssueGet:function(){
         return browser.getValue("#wbmd_pub_issue-input");
    },
    
    PublicationPagesSet:function(textValue){
         browser.setValue("#wbmd_pub_pgs-input",textValue);
    },
    PublicationPagesGet:function(){
         return browser.getValue("#wbmd_pub_pgs-input");
    },

    
    BucketGeneratorBylineSet:function(textValue){
         browser.setValue("#wbmd_bkt_gen_byline-input",textValue);
    },
    BucketGeneratorBylineGet:function(){
         return browser.getValue("#wbmd_bkt_gen_byline-input");
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
        browser.click("//div[@id='PropertiesDialog']//a//span[contains(text(),'Publication')]")
    },
    contributorsTabSelect: function(){
        browser.click("//div[@id='PropertiesDialog']//a//span[contains(text(),'Contributors')]")
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
    },
    // Start verify prof Publication creation with all fields	
    publicationDisplaySet:function(textValue){
         browser.setValue("#wbmd_publ_display-input",textValue);
    },
    publicationDisplayGet:function(){
         return browser.getValue("#wbmd_publ_display-input");
    },
     publicationTypeSet:function(textValue){
         browser.setValue("#wbmd_publ_type-input",textValue);
    },
    publicationTypeGet:function(){
         return browser.getValue("#wbmd_publ_type-input");
    },
    publicationAbbreviationSet:function(textValue){
         browser.setValue("#wbmd_publ_abbr-input",textValue);
    },
    publicationAbbreviationGet:function(){
         return browser.getValue("#wbmd_publ_abbr-input");
    },
    publicationISSNSet:function(textValue){
         browser.setValue("#wbmd_publ_issn-input",textValue);
    },
    publicationISSNGet:function(){
         return browser.getValue("#wbmd_publ_issn-input");
    },
    publicationDescriptionSet:function(textValue){
         browser.setValue("#wbmd_publ_desc-input",textValue);
    },
    publicationDescriptionGet:function(){
         return browser.getValue("#wbmd_publ_desc-input");
    },
    articlePubsURLSet:function(textValue){
         browser.setValue("#wbmd_publ_url_ovrd-input",textValue);
    },
    articlePubsURLGet:function(){
         return browser.getValue("#wbmd_publ_url_ovrd-input");
    },
    primaryPubImageURLSet:function(textValue){
         browser.setValue("#wbmd_publ_url_prim-input",textValue);
    },
    primaryPubImageGet:function(){
         return browser.getValue("#wbmd_publ_url_prim-input");
    },
    secondaryPubImageURLSet:function(textValue){
         browser.setValue("#wbmd_publ_url_sec-input",textValue);
    },
    secondaryPubImageGet:function(){
         return browser.getValue("#wbmd_publ_url_sec-input");
    },
    linkOutURLSet:function(textValue){
         browser.setValue("#wbmd_publ_url_linkout-input",textValue);
    },
    linkOutURLGet:function(){
         return browser.getValue("#wbmd_publ_url_linkout-input");
    },
    pubPageAdOverrideSet:function(textValue){
         browser.setValue("#wbmd_publ_ad_ovrd-input",textValue);
    },
    pubPageAdOverrideGet:function(){
         return browser.getValue("#wbmd_publ_ad_ovrd-input");
    },
    companyNameSet:function(textValue){
         browser.setValue("#wbmd_publ_comp_id-input",textValue);
    },
    companyNameGet:function(){
         return browser.getValue("#wbmd_publ_comp_id-input");
    },
    //End verify prof Publication creation with all fields
}


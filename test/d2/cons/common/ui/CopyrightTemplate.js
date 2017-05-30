var maxWaitTimeInMs = 50000;
var CopyrightStatementSelector = "div > input.form-control.ng-pristine.ng-untouched.ng-valid.ng-scope";

var Helper = require('./../functions/functions');

var CopyrightTabUIObj = {
   
    CopyrightStatementSetValue: function (textval) {
         browser.setValue(CopyrightStatementSelector, textval);
    },
    CopyrightStatementGetValue: function(){
        return browser.getValue(CopyrightStatementSelector);
    },

    TitleSet: function(textValue){
        browser.setValue("input#title-input", textValue);
    },
    TitleGet: function(){
        return browser.getValue("input#title-input");
    },
    CopyrightHolderSet :function(textValue){
         browser.click("//div[@id='wbmd_copyright_holder']/img")
          browser.pause(1000);  
          browser.click("//div[@title='"+textValue+"']")
          browser.pause(1000);
    },
    CopyrightHolderGet: function(){
        return browser.getValue("wbmd_copyright_holder-input");
    },
    LegalReviewerSet :function(textValue){
         browser.click("//div[@id='wbmd_legal_revr']/img")
          browser.pause(1000);  
          browser.click("//div[@title='"+textValue+"']")
          browser.pause(1000);
    },
    LegalReviewerGet: function(){
        return browser.getValue("wbmd_legal_revr-input");
    },
    CopyrightStartDateSet: function(){
          browser.click("//div[@id='wbmd_copyright_strt_dt']/img");
          browser.waitForVisible("//button[contains(.,'Now')]");
          browser.click("//button[contains(.,'Now')]");
          browser.pause(1000);
    },
    CopyrightEndDateSet: function(){
          browser.click("//div[@id='wbmd_copyright_end_dt']/img");
          browser.waitForVisible("//button[contains(.,'Now')]");
          browser.click("//button[contains(.,'Now')]");
          browser.pause(1000);
    },
    LegalReviewDateSet: function(){
          browser.click("//div[@id='wbmd_legal_revw_dt']/img");
          browser.waitForVisible("//button[contains(.,'Now')]");
          browser.click("//button[contains(.,'Now')]");
          browser.pause(1000);
    },

     EfectiveDateSet: function(){
          browser.click("//div[@id='wbmd_eff_date']/img");
          browser.waitForVisible("//button[contains(.,'Now')]");
          browser.click("//button[contains(.,'Now')]");
          browser.pause(1000);
    },

     ExpirationDateSet: function(){
          browser.click("//div[@id='wbmd_exp_date']/img");
          browser.waitForVisible("//button[contains(.,'Now')]");
          browser.click("//button[contains(.,'Now')]");
          browser.pause(1000);
    },
    SubjectSet: function(textValue){
        browser.setValue("input#subject-input", textValue);
    },
    SubjectGet: function(){
        return browser.getValue("input#subject-input");
    },
    LanguagecodeSet: function(textValue){
        browser.setValue("input#language_code-input", textValue);
    },
    LanguagecodeGet: function(){
        return browser.getValue("input#language_code-input");
    },
    RcurrentstateGet: function(){
        return browser.getValue("input#r_current_state");
    },
     AuthorsGet: function(){
        return browser.getValue("input#authors");
    },
     AcontenttypeGet: function(){
        return browser.getValue("input#a_content_type");
    },
    rfullcontentsizeGet: function(){
        return browser.getValue("input#r_full_content_size");
    },
     r_version_labelGet: function(){
        return browser.getValue("input#r_version_label");
    },
     r_modify_dateGet: function(){
        return browser.getValue("input#r_modify_date");
    },
    r_modifierGet: function(){
        return browser.getValue("input#r_modifier");
    },
     r_creation_dateGet: function(){
        return browser.getValue("input#r_creation_date");
    },

     r_creator_nameGet: function(){
        return browser.getValue("input#r_creator_name");
    },
     r_lock_dateGet: function(){
        return browser.getValue("input#r_lock_date");
    },
    r_lock_ownerGet: function(){
        return browser.getValue("input#r_lock_owner");
    },
     a_last_review_dateGet: function(){
        return browser.getValue("input#a_last_review_date");
    },
    r_access_dateGet: function(){
        return browser.getValue("input#r_access_date");
    },

   owner_nameGet: function(){
        return browser.getValue("input#owner_name");
    },
    r_object_typeGet: function(){
        return browser.getValue("input#r_object_type");
    },
   

     publishingTabSelect: function(){
        
        browser.click("//span/span[contains(.,'Publishing')]");
        browser.pause(1000);
    },
    otherTabSelect: function(){
        browser.click("//span/span[contains(.,'Other')]")
    },
    dropdownlistSelect: function(ddlocator){
        var drpdwnvalues;
        browser.setValue("//input[@id='"+ddlocator+"']","");
        browser.pause(1000);
        browser.click("//input[@id='"+ddlocator+"']//following-sibling::img");
        drpdwnvalues=browser.getText("//div[@class='x-combo-list-item ']");
        return drpdwnvalues;

    },
    verifyValue: function(data){
        var isExisting;
        isExisting = browser.isExisting("//div[@title='"+data+"']");
       return isExisting;
    },


    

}

module.exports = CopyrightTabUIObj;
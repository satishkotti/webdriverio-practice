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

    copyrightMandatoryfieldsValidation: function(){
          var copyrightHolder =browser.isExisting("//span[contains(.,'Copyright Holder')]");
          expect(copyrightHolder).to.be.true;
          browser.click("//button[contains(.,'OK') and @aria-disabled=not('false')]");
          browser.click("//button[contains(.,'Cancel Edit')]");
    },

        copyright_Othertab_AttributesNames: function () {
        browser.click("//span/span[string()='Other']");
        var subject = browser.isExisting("//label[string()='Subject:']");
        expect(subject).to.be.true;
        var language = browser.isExisting("//label[string()='Language / Locale:']");
        expect(language).to.be.true;
        var status = browser.isExisting("//label[string()='Status:']");
        expect(status).to.be.true;
        var author = browser.isExisting("//label[string()='Authors:']");
        expect(author).to.be.true;
        var versionlabel = browser.isExisting("//label[string()='Version Label:']");
        expect(versionlabel).to.be.true;
        var modified = browser.isExisting("//label[string()='Modified:']");
        expect(modified).to.be.true;
        var modifiedby = browser.isExisting("//label[string()='Modified By:']");
        expect(modifiedby).to.be.true;
        var created = browser.isExisting("//label[string()='Created:']");
        expect(created).to.be.true;
        var creatorName = browser.isExisting("//label[string()='Creator Name:']");
        expect(creatorName).to.be.true;
        var checkoutDate = browser.isExisting("//label[string()='Checkout Date:']");
        expect(checkoutDate).to.be.true;
        var checkedOutBy = browser.isExisting("//label[string()='Checked Out By:']");
        expect(checkedOutBy).to.be.true;
        var ownerName = browser.isExisting("//label[string()='Owner:']");
        expect(ownerName).to.be.true;
        var type = browser.isExisting("//label[string()='Type:']");
        expect(type).to.be.true;
        var format = browser.isExisting("//label[string()='Format:']");
        expect(format).to.be.true;
        var fullContentSize = browser.isExisting("//label[string()='Full Content Size:']");
        expect(fullContentSize).to.be.true;
        var lastReviewDate = browser.isExisting("//label[string()='Last Reviewed On:']");
        expect(lastReviewDate).to.be.true;
        var accessed = browser.isExisting("//label[string()='Last Accessed On:']");
        expect(accessed).to.be.true;
    }

}

module.exports = CopyrightTabUIObj;
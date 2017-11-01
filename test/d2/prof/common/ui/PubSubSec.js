var maxWaitTimeInMs = 20000;

var pubSubSecObj = module.exports = {
        clearProperties: function(){
        browser.clearElement("#title-input");
    },
     validationmandatoryfields: function(){
         var message= browser.isExisting("//span[contains(.,'Property') and contains(.,'Title') and contains(.,'is required')]");
         browser.click("//td[@class='x-toolbar-left']//button[contains(.,'OK')]");
         return message;
     },
         pubSubSecRelation: function(){
         browser.isExisting("//td[contains(.,'wcm_category')]//following-sibling::td[contains(.,'Publication')]");
         browser.isExisting("//td[contains(.,'wcm_doc_template')]//following-sibling::td[contains(.,'professional_publication_subsection') and contains(.,'xml')]");
         browser.isExisting("//td[contains(.,'wcm_layout_template')]//following-sibling::td[contains(.,'publication_subsection_html') and contains(.,'xsl')]");
          browser.isExisting("//td[contains(.,'wcm_rules_template')]//following-sibling::td[contains(.,'Rule_Professional_for_Publication_Subsection') and contains(.,'xml')]");    
     },
     
}

var maxWaitTimeInMs = 20000;

var pointerObj = module.exports = {

    pointerContentProperties: function(objName){
        browser.waitForVisible("//h2[span[contains(.,'Display Title')]]//following-sibling::div//div[contains(.,'Enter text here') and contains(@class,'textarea')]");
        browser.setValue("//h2[span[contains(.,'Display Title')]]//following-sibling::div//div[contains(.,'Enter text here') and contains(@class,'textarea')]", objName);
         browser.waitForVisible("//h2[span[contains(.,'Link URL')]]//following-sibling::div//input[@type='text']");
        browser.setValue("//h2[span[contains(.,'Link URL')]]//following-sibling::div//input[@type='text']", objName);
        browser.frameParent();
        browser.pause(5000);
        },

        clearProperties: function(){
        browser.clearElement("#title-input");
    },
     validationmandatoryfields: function(){
         var message= browser.isExisting("//span[contains(.,'Property') and contains(.,'Title') and contains(.,'is required')]");
         browser.click("//td[@class='x-toolbar-left']//button[contains(.,'OK')]");
         return message;
     },
         pointerRelation: function(){
         browser.isExisting("//td[contains(.,'wcm_category')]//following-sibling::td[contains(.,'Other')]");
         browser.isExisting("//td[contains(.,'wcm_doc_template')]//following-sibling::td[contains(.,'professional_pointer') and contains(.,'xml')]");
         browser.isExisting("//td[contains(.,'wcm_layout_template')]//following-sibling::td[contains(.,'pointer_html') and contains(.,'xsl')]");
     }



    
}

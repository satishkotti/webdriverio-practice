var maxWaitTimeInMs = 20000;

var profOutputUIObj = {
    setProfOutputIntroText: function (introText) {
        browser.waitForVisible("//div[@title='Rich Text Editor, __ckd_1']",maxWaitTimeInMs);
        browser.setValue("//div[@title='Rich Text Editor, __ckd_1']",introText);
    },
     setProfOutputContentText: function (contentText) {
        browser.waitForVisible("//div[@title='Rich Text Editor, __ckd_2']",maxWaitTimeInMs);
        browser.setValue("//div[@title='Rich Text Editor, __ckd_2']",contentText);
    },
    profOutputRelation: function(){
         browser.isExisting("//td[contains(.,'wcm_category')]//following-sibling::td[contains(.,'Other')]");
         browser.isExisting("//td[contains(.,'wcm_doc_template')]//following-sibling::td[contains(.,'professional_output_versions') and contains(.,'xml')]");
         browser.isExisting("//td[contains(.,'wcm_layout_template')]//following-sibling::td[contains(.,'output_version_html') and contains(.,'xsl')]");
         browser.isExisting("//td[contains(.,'wcm_rules_editor')]//following-sibling::td[contains(.,'professional_output_versions') and contains(.,'xml')]");
         browser.isExisting("//td[contains(.,'wcm_rules_template')]//following-sibling::td[contains(.,'Rule_Professional_for_output_versions') and contains(.,'xml')]");
     },
     selectRelationTab: function(version){
        browser.click("//li[@tag_id='Relations-widgetTab']");
        browser.pause(1000);
    }
}

module.exports = profOutputUIObj;
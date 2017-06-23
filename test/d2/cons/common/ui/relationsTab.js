var maxWaitTimeInMs = 50000;

var relationTabUIObj = {

    relations: function () {
        browser.waitForVisible("//span[string()='Relations']", maxWaitTimeInMs);
        browser.click("//span[string()='Relations']");
        browser.waitForVisible("//span[contains(.,'wcm_category')]",maxWaitTimeInMs);
        var category = browser.isExisting("//span[contains(.,'wcm_category')]");
        expect(category).to.be.true;
        var doc_template = browser.isExisting("//span[contains(.,'wcm_doc_template')]");
        expect(doc_template).to.be.true;
        var layout_template = browser.isExisting("//span[contains(.,'wcm_layout_template')]");
        expect(layout_template).to.be.true;
        var rules_template = browser.isExisting("//span[contains(.,'wcm_rules_template')]");
        expect(rules_template).to.be.true;
    },
    layout_template_relation: function(){
        browser.waitForVisible("//span[string()='Relations']", maxWaitTimeInMs);
        browser.click("//span[string()='Relations']");
        browser.waitForVisible("//span[contains(.,'wcm_layout_template')]",maxWaitTimeInMs);
        var layout_template = browser.isExisting("//span//span[contains(.,'wcm_layout_template')]/../../..//following-sibling::td//span//span[contains(.,'wxml.WebMD XML')]");
        expect(layout_template).to.be.true;
    }
}

module.exports = relationTabUIObj;
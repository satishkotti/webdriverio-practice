var maxWaitTimeInMs = 50000;
var comparepaneFrameSelector = "iframe[id*='oam_id==ExternalWidget-5!!oam_target_type==ExternalWidget']";

var compareTabUIObj = {
    switchToExternalWidgetFrame: function () {
        browser.frame();
        var compareWidgetIFrameElement = browser.element(comparepaneFrameSelector);
        browser.frame(compareWidgetIFrameElement.value);
    },

    selectCompareWidget: function () {
        browser.waitForVisible("//span[string()='Compare']", maxWaitTimeInMs);
        browser.click("//span[string()='Compare']");
    },

    versionOnCompareWidgetValidation: function (asset1Withversion, asset2Withversion) {
        browser.pause(2000);
        var asset1 = browser.isExisting("//p[contains(.,'" + asset1Withversion + "')]");
        expect(asset1).to.be.true;
        var asset2 = browser.isExisting("//p[contains(.,'" + asset2Withversion + "')]");
        expect(asset2).to.be.true;
    },
    compareSummaryOnCompareWidget: function (attributeSummary, contentSummary, renditionSummary) {
        browser.waitForVisible("//h4[contains(.,'Comparison Summary')]//following-sibling::div[contains(.,'Attributes') and contains(.,'" + attributeSummary + "')]",maxWaitTimeInMs)
        var attribute = browser.isExisting("//h4[contains(.,'Comparison Summary')]//following-sibling::div[contains(.,'Attributes') and contains(.,'" + attributeSummary + "')]");
        var content = browser.isExisting("//h4[contains(.,'Comparison Summary')]//following-sibling::div[contains(.,'Content') and contains(.,'" + contentSummary + "')]");
        var rendition = browser.isExisting("//h4[contains(.,'Comparison Summary')]//following-sibling::div[contains(.,'Rendition') and contains(.,'" + renditionSummary + "')]");
        expect(attribute).to.be.true;
        expect(content).to.be.true;
        expect(rendition).to.be.true;
        browser.frameParent();
    }
}

module.exports = compareTabUIObj;
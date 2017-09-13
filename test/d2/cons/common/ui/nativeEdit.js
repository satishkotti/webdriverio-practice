var maxWaitTimeInMs = 50000;
var contentTab = require('../actions/contentTab.actions');
var comparepaneFrameSelector = "iframe[id*='oam_id==ExternalWidget-4!!oam_target_type==ExternalWidget']";
var nativeEditPaneFrameSelector ="//iframe[contains(@id,'xmlEditorFrame')]";

var nativeEditObj = {
    switchToExternalWidgetFrame: function () {
        browser.frame();
        var compareWidgetIFrameElement = browser.element(comparepaneFrameSelector);
        browser.frame(compareWidgetIFrameElement.value);
    },

    selectCompareWidget: function () {
        browser.waitForVisible("//span[string()='Compare']", maxWaitTimeInMs);
        browser.click("//span[string()='Compare']");
    },
    nativebutton: function () {
        browser.leftClick("//button[@data-test='wp-editbtn-dropdownarrow']");
        browser.leftClick("//a[@data-test='wp-editbtn-editrawxml']");
        browser.pause(4000);
    },
    titleupdate: function(){
         browser.click("//span[@class='cm-tag' and contains(.,'title')]//following-sibling::span[2]");
        //Arrow left key
        browser.keys('\uE012')
        //123 keys
        browser.keys(['\uE01B', '\uE01C', '\uE01D']);
    },
    copysection: function(){
         browser.click("(//span[@class='cm-tag' and contains(.,'section_group')]//preceding-sibling::span)[2]");
        browser.keys('\uE011');//home
        browser.keys('\uE008');//shift
        browser.keys(['\uE015', '\uE015', '\uE015', '\uE015', '\uE015', '\uE015', '\uE015', '\uE015']);//Arrowdown
        browser.keys('\uE008');//shift
        browser.keys('\uE009');//control
        browser.keys('c');
        browser.keys('\uE009');
        browser.click("(//span[@class='cm-tag' and contains(.,'section_group')]//preceding-sibling::span)[3]");
        browser.keys('\uE010');//end
        browser.keys('\uE007');//enter
        browser.keys('\uE009');//control
        browser.keys('v');
        browser.keys('\uE009');
    },
    closetagbreak: function(){
        browser.leftClick("//span[@class='cm-tag' and contains(.,'title')]//following-sibling::span[2]");
        browser.keys('\uE010');//end
        browser.keys('\uE003');//Backspace
    },
       switchToExternalWidgetFrame: function(){
        var nativeEditIFrameElement = browser.element(nativeEditPaneFrameSelector);
        browser.frame(nativeEditIFrameElement.value);
    },
    applyButton: function(){
        browser.pause(5000);
        browser.click("//button[contains(text(),'Apply')]")
        browser.pause(4000);
    },
    cancelButton: function(){
        browser.pause(4000);
        browser.click("//button[contains(text(),'Cancel')]")
        browser.pause(4000);
    },
    validation:function(){
        var title = contentTab.Titleinputgetvalue();
        expect(title).to.be.equal("QATest123");
        browser.frameParent();
        var text = contentTab.SectionTextgetvalue();
        expect(text[0]).to.be.equal("QA");
        expect(text[1]).to.be.equal("QA");
        browser.frameParent();

    },
     alertOk:function(){
        browser.alertAccept();
    }


  
}

module.exports = nativeEditObj;
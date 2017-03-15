var data = require('./../data/d2testRunConfig');

//E2E flow for inserting module


// Method to validate the availability of JavaScript Modules for richtext fields 
module.exports.interactiveModuleJavaScriptAvailability = function(browser,CKeditorfields,i)
{
             var testval = browser.execute(function () {
               // return document.getElementById('ExternalWidget-3').getElementsByTagName('iframe').item(0).id;
                 return document.querySelectorAll('div[tag_id="Content-widget"]').item(0).getElementsByTagName('iframe').item(0).id;
            });
            browser.frame(testval.value);
            browser.scroll("//h2[span[contains(.,'"+CKeditorfields+"')]]//following-sibling::div//div[text()='Enter text here']");
            browser.setValue("//h2[span[contains(.,'"+CKeditorfields+"')]]//following-sibling::div//div[text()='Enter text here']", "QA");
            browser.moveToObject("(//span[contains(.,'Module')]/following-sibling::span[@class='cke_button_arrow'])["+i+"]");
            browser.click("(//span[contains(.,'Module')]/following-sibling::span[@class='cke_button_arrow'])["+i+"]");

            var mModuleIF = browser.execute(function () {
                return document.getElementsByTagName('iframe').item(0).id;
                
            });
            
            
            browser.frame(mModuleIF.value);
             browser.waitForVisible("(//span[text()='Code'])["+i+"]", 50000);
            browser.moveToObject("(//span[text()='Code'])["+i+"]");

             expect(browser.getText("(//span[text()='Code'])["+i+"]")).to.equal("Code");
            
            browser.frameParent();
            browser.frameParent();
    
};




// Method to validate the options in the JavaScript Modules
module.exports.interactiveModuleJavaScript = function(browser,CKeditorfields,i)
{
    var contentWidgetIFrame = browser.element("iframe[id*='oam_id==ExternalWidget-2!!oam_target_type==ExternalWidget']");
    browser.frame(contentWidgetIFrame.value);
    browser.scroll("//h2[span[contains(.,'"+CKeditorfields+"')]]//following-sibling::div//div[text()='Enter text here']");
    browser.setValue("//h2[span[contains(.,'"+CKeditorfields+"')]]//following-sibling::div//div[text()='Enter text here']", "QA");
    browser.moveToObject("(//span[contains(.,'Module')]/following-sibling::span[@class='cke_button_arrow'])["+i+"]");
    browser.click("(//span[contains(.,'Module')]/following-sibling::span[@class='cke_button_arrow'])["+i+"]");
            
    var mModuleIF = browser.execute(function () {
                return document.getElementsByTagName('iframe').item(0).id;
                
            });
            
            
            browser.frame(mModuleIF.value);
            browser.waitForVisible("(//span[text()='Code'])["+i+"]", 50000);
            browser.moveToObject("(//span[text()='Code'])["+i+"]");
            browser.click("(//span[text()='Code'])["+i+"]");
             browser.pause(1000);
    
            //browser.waitForVisible("//button[contains(.,'Cancel')]", 5000);
            browser.moveToObject("//button[contains(.,'Cancel')]");
            browser.click("//button[contains(.,'Cancel')]");
            browser.pause(1000);

    
    
};




var data = require('./../data/d2testRunConfig');

var randomstring = require("randomstring");

function Generate5000RandomString()
{
    return randomstring.generate(5);
}

var Random5000char=Generate5000RandomString();
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
               var frameval = browser.execute(function () {
                return document.getElementById('x3_portal');
            });
            
       
            browser.frame(frameval.value);
            //browser.setValue("//div[@class='row']//textarea", "QA");
            browser.waitForVisible("//div[@class='modal edit ng-scope top am-fade-and-scale']//button[contains(text(),'Cancel')]", 50000);
           
            browser.moveToObject("//div[@class='modal edit ng-scope top am-fade-and-scale']//button[contains(text(),'Cancel')]");
            browser.click("//div[@class='modal edit ng-scope top am-fade-and-scale']//button[contains(text(),'Cancel')]");
            


    
    
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
             browser.pause(100);
               var frameval = browser.execute(function () {
                return document.getElementById('x3_portal');
            });
            
       
            browser.frame(frameval.value);
            //browser.setValue("//div[@class='row']//textarea", "QA");
            browser.waitForVisible("//div[@class='modal edit ng-scope top am-fade-and-scale']//button[contains(text(),'Cancel')]", 50000);
           
            browser.moveToObject("//div[@class='modal edit ng-scope top am-fade-and-scale']//button[contains(text(),'Cancel')]");
            browser.click("//div[@class='modal edit ng-scope top am-fade-and-scale']//button[contains(text(),'Cancel')]");
            browser.pause(1000);


    
    
};



// Method to validate the Verify the availability of Look up values in Code Type in the JavaScript Modules 
module.exports.interactiveModuleJavaScriptAvlblyCodeType = function(browser,CKeditorfields,i)
{
    
   
    var contentWidgetIFrame = browser.element("iframe[id*='oam_id==ExternalWidget-2!!oam_target_type==ExternalWidget']");
    browser.frame(contentWidgetIFrame.value);
    
    
    browser.scroll("//h2[span[contains(.,'"+CKeditorfields+"')]]//following-sibling::div//div[text()='Enter text here']");
    browser.setValue("//h2[span[contains(.,'"+CKeditorfields+"')]]//following-sibling::div//div[text()='Enter text here']", "QA");
    browser.moveToObject("(//span[contains(.,'Module')]/following-sibling::span[@class='cke_button_arrow'])["+i+"]");
    browser.pause(1000);
    browser.click("(//span[contains(.,'Module')]/following-sibling::span[@class='cke_button_arrow'])["+i+"]");
   
            
    var mModuleIF = browser.execute(function () {
                return document.getElementsByTagName('iframe').item(0).id;
                
            });
            
            
            browser.frame(mModuleIF.value);
            browser.timeoutsImplicitWait(10000);  
            browser.waitForVisible("(//span[text()='Code'])["+i+"]", 5000);
            browser.moveToObject("(//span[text()='Code'])["+i+"]");
            browser.click("(//span[text()='Code'])["+i+"]");
            browser.pause(10000);
               var frameval = browser.execute(function () {
                return document.getElementById('x3_portal');
            });
            
       
            browser.frame(frameval.value);
            browser.pause(10000);
            browser.leftClick("//*[@id='codeTypeSelect']");
            
            browser.moveToObject("//option[contains(.,'Youtube')]").click("//option[contains(.,'Youtube')]");
            browser.pause(1000);
            

           
            browser.moveToObject("//div[@class='modal edit ng-scope top am-fade-and-scale']//button[contains(text(),'Cancel')]");
            browser.click("//div[@class='modal edit ng-scope top am-fade-and-scale']//button[contains(text(),'Cancel')]");
            
               browser.pause(1000);
 
    
    
};

// Method to validate the a free text field capable of storing 5000+ characters in the JavaScript Modules 
module.exports.interactiveModuleJavaScript = function(browser,CKeditorfields,i)
{
   
   
    var contentWidgetIFrame = browser.element("iframe[id*='oam_id==ExternalWidget-2!!oam_target_type==ExternalWidget']");
    browser.frame(contentWidgetIFrame.value);
    
    
    browser.scroll("//h2[span[contains(.,'"+CKeditorfields+"')]]//following-sibling::div//div[text()='Enter text here']");
    browser.setValue("//h2[span[contains(.,'"+CKeditorfields+"')]]//following-sibling::div//div[text()='Enter text here']", "QAsdfsd");
    browser.moveToObject("(//span[contains(.,'Module')]/following-sibling::span[@class='cke_button_arrow'])["+i+"]");
    browser.pause(1000);
    browser.click("(//span[contains(.,'Module')]/following-sibling::span[@class='cke_button_arrow'])["+i+"]");
   
            
    var mModuleIF = browser.execute(function () {
                return document.getElementsByTagName('iframe').item(0).id;
                
            });
            
            
            browser.frame(mModuleIF.value);
            browser.timeoutsImplicitWait(10000);  
            browser.waitForVisible("(//span[text()='Code'])["+i+"]", 500);
            browser.moveToObject("(//span[text()='Code'])["+i+"]");
            browser.click("(//span[text()='Code'])["+i+"]");
            browser.pause(10000);
               var frameval = browser.execute(function () {
                return document.getElementById('x3_portal');
            });
            
       
            browser.frame(frameval.value);
            browser.pause(10000);
            browser.waitForVisible("//div[@class='row']//textarea", 500);
            browser.setValue("//div[@class='row']//textarea", Random5000char);

            browser.leftClick("//*[@id='codeTypeSelect']");
            
            browser.moveToObject("//option[contains(.,'Youtube')]").click("//option[contains(.,'Youtube')]");
            
            browser.pause(1000);
            
           
            browser.moveToObject("//div[@class='modal edit ng-scope top am-fade-and-scale']//button[contains(text(),'Insert')]");
            browser.click("//div[@class='modal edit ng-scope top am-fade-and-scale']//button[contains(text(),'Insert')]");
           
           
            
            browser.pause(1000);
 

            var contentWidgetIFrame = browser.element("iframe[id*='oam_id==ExternalWidget-2!!oam_target_type==ExternalWidget']");
            browser.frame(contentWidgetIFrame.value);
            browser.pause(500);
            
            browser.doubleClick("//h2[span[contains(.,'"+CKeditorfields+"')]]//following-sibling::div//strong[contains(.,'Module: jsembed')]["+i+"]");

             browser.pause(10000);
               var frameval = browser.execute(function () {
                return document.getElementById('x3_portal');
            });
            
       
            browser.frame(frameval.value);
            browser.pause(10000);
            
            browser.waitForVisible("//div[@class='row']//textarea", 500);

            
            var expectedJavascrptdescription=browser.execute("return document.querySelectorAll('.form-control').item(0).value").value
            console.log(expectedJavascrptdescription);

            browser.moveToObject("//div[@class='modal edit ng-scope top am-fade-and-scale']//button[contains(text(),'Cancel')]");
            browser.click("//div[@class='modal edit ng-scope top am-fade-and-scale']//button[contains(text(),'Cancel')]");
              
             browser.pause(1000);
 
    
    
};





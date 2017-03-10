var data = require('./../data/d2testRunConfig');

//E2E flow for inserting module
module.exports.interactivemodulebullet= function(browser,objectTitle)
{

         browser.leftClick("//span[@title='" + objectTitle + "']");
            browser.leftClick("//span[text()='Content']");
            browser.pause(10000);
            browser.doubleClick("//span[text()='Content']");
            browser.pause(5000);
            //IFrame switch start
            var testval = browser.execute(function () {
                return document.getElementById('ExternalWidget-3').getElementsByTagName('iframe').item(0).id;
            });


            browser.frame(testval.value);
            browser.leftClick('//button[contains(string(),"Check-out")]');
            browser.pause(20000);
            browser.scroll("//h2[span[contains(.,'Section Text')]]//following-sibling::div//div[text()='Enter text here']");
            browser.setValue("//h2[span[contains(.,'Section Text')]]//following-sibling::div//div[text()='Enter text here']", "QA");
            browser.click("(//span[contains(.,'Module')]/following-sibling::span[@class='cke_button_arrow'])[1]");

            var mModuleIF = browser.execute(function () {
                return document.getElementsByTagName('iframe').item(0).id;
            });

            browser.frame(mModuleIF.value);

            browser.pause(10000);

            browser.waitForVisible("//span[text()='Bulleted List']", 50000);
            browser.moveToObject("//span[text()='Bulleted List']");
            browser.click("//span[text()='Bulleted List']");
            browser.pause(5000);
            browser.frameParent();
            browser.frameParent();

            browser.setValue("#moduletitle", "QA");
            browser.setValue("#moduledescription", "QA");

            browser.leftClick("//select[@ng-model='moduleConfiguration.module.align']");
            browser.waitForVisible("//option[contains(.,'Left')]", 50000);
            browser.moveToObject("//option[contains(.,'Left')]").click("//option[contains(.,'Left')]");

 
            browser.pause(50000);
            browser.waitForVisible("//input[@ng-model='bulletTitle']", 50000);
            browser.setValue("//input[@ng-model='bulletTitle']","QAtest");
            browser.frame("bulletDescContentFrame").execute("document.getElementsByTagName('iframe').item(0).contentWindow.document.getElementsByTagName('p').item(0).textContent = 'D2'").pause(10000);

                browser.frameParent();
            browser.leftClick('//button[@ng-click="addBullet()"]');

            browser.waitForVisible("//div[@class='modal-footer']//button[contains(.,'Insert')]", 50000);
            browser.leftClick("//div[@class='modal-footer']//button[contains(.,'Insert')]");

            browser.pause(5000);

    
    }; 

// Method to validate the availability of bulletlist Modules for richtext fields 
module.exports.interactiveModuleBulletAvailability = function(browser,CKeditorfields,i)
{
             var testval = browser.execute(function () {
                return document.getElementById('ExternalWidget-3').getElementsByTagName('iframe').item(0).id;
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
             browser.waitForVisible("(//span[text()='Bulleted List'])["+i+"]", 50000);
            browser.moveToObject("(//span[text()='Bulleted List'])["+i+"]");

             expect(browser.getText("(//span[text()='Bulleted List'])["+i+"]")).to.equal(data.expectedResults.bulletlist);
            
            browser.frameParent();
            browser.frameParent();
    
};
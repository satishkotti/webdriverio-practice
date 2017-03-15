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
                //return document.getElementById('ExternalWidget-3').getElementsByTagName('iframe').item(0).id;
                 return document.querySelectorAll('div[tag_id="Content-widget"]').item(0).getElementsByTagName('iframe').item(0).id;
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

 
            browser.pause(5000);
            browser.waitForVisible("//input[@ng-model='bulletTitle']", 50000);
            browser.setValue("//input[@ng-model='bulletTitle']","QAtest");
            browser.frame("bulletDescContentFrame");
            browser.pause(5000);
            browser.click("//span[contains(@class,'bold_icon')]");
            browser.execute("document.getElementsByTagName('iframe').item(0).contentWindow.document.getElementsByTagName('p').item(0).textContent = 'D2'").pause(10000);
            //  var mModulebullet = browser.execute(function () {
            //     return document.getElementsByTagName('iframe').item(0).id;
            // });

            // browser.frame(mModulebullet.value);
     
            // browser.pause(5000);
           // browser.frame("bulletDescContentFrame");
            browser.click("//a[@title='body element']");
            // browser.pause(5000);
            // browser.click("//span[contains(@class,'bold_icon')]");
             browser.pause(5000);
            browser.click("//span[contains(@class,'italic_icon')]");
             browser.pause(5000);
            browser.click("//span[contains(@class,'underline_icon')]");
            browser.frameParent();
           // browser.frameParent();
            browser.leftClick('//button[@ng-click="addBullet()"]');

            browser.waitForVisible("//div[@class='modal-footer']//button[contains(.,'Insert')]", 50000);
            browser.leftClick("//div[@class='modal-footer']//button[contains(.,'Insert')]");

            browser.pause(5000);

          
    }; 

// Method to validate the availability of bulletlist Modules for richtext fields 
module.exports.interactiveModuleBulletAvailability = function(browser,CKeditorfields,i)
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
             browser.waitForVisible("(//span[text()='Bulleted List'])["+i+"]", 50000);
            browser.moveToObject("(//span[text()='Bulleted List'])["+i+"]");

             expect(browser.getText("(//span[text()='Bulleted List'])["+i+"]")).to.equal(data.expectedResults.bulletlist);
            
            browser.frameParent();
            browser.frameParent();
    
};


// Method to validate the options in the bulletlist menu
module.exports.interactiveModuleBulletMenu = function(browser,CKeditorfields,i)
{
    var contentWidgetIFrame = browser.element("iframe[id*='oam_id==ExternalWidget-2!!oam_target_type==ExternalWidget']");
    browser.frame(contentWidgetIFrame.value);
    browser.scroll("//h2[span[contains(.,'"+CKeditorfields+"')]]//following-sibling::div//div[text()='Enter text here']");
    browser.setValue("//h2[span[contains(.,'"+CKeditorfields+"')]]//following-sibling::div//div[text()='Enter text here']", "QA");
    browser.moveToObject("(//span[contains(.,'Module')]/following-sibling::span[@class='cke_button_arrow'])["+i+"]");
    browser.click("(//span[contains(.,'Module')]/following-sibling::span[@class='cke_button_arrow'])["+i+"]");
            
    var ckEditorIFrame = browser.element("iframe[id*='cke_251']");
    browser.frame(ckEditorIFrame.value);
    browser.waitForVisible("(//span[text()='Bulleted List'])["+i+"]", 50000);
    browser.moveToObject("(//span[text()='Bulleted List'])["+i+"]");
    browser.click("(//span[text()='Bulleted List'])["+i+"]");
    //browser.frameParent();
    //browser.frameParent();
    browser.frame();
    browser.pause(5000);

    var moduleHeadline = browser.element("#moduletitle").getValue();
    var moduleDescription = browser.element("#moduledescription").getValue();
    //var alignSelected =  browser.element("select[ng-model='moduleConfiguration.module.align']").getValue();

    browser.frame();
    var insertBulletiFrame = browser.element("iframe#bulletDescContentFrame");
    browser.frame(insertBulletiFrame.value);

    //get bullet desc text iframe
    var insertBulletiFrameText = browser.element("iframe.cke_wysiwyg_frame.cke_reset");
    browser.frame(insertBulletiFrameText.value);

    var insertBulletDescTextWithMarkup = browser.getHTML("body", false);



/*          var headline = browser.getText("//div[@class='row']//div[contains(.,'Module Headline')]");
            var moduleDescription = browser.getText("//div[@class='row']//div[contains(.,'Module Description')]");
            var align = browser.getText("//div[@class='row']//div[contains(.,'Align')]");
            var alignLeftOption = browser.getText("//option[contains(.,'Left')]");
            var alignMiddleOption = browser.getText("//option[contains(.,'Middle')]");
            var alignRightOption = browser.getText("//option[contains(.,'Right')]");
            var bullet= browser.getText("//div[@class='row']//div[contains(.,'Bullets')]");
            var bulletTitle = browser.getText("//div[@class='row']//div[contains(.,'Bullets')]//following-sibling::div//th[contains(.,'Title')]");
            var insertBulletTitle= browser.getText("//div[@class='row']//div[contains(.,'Insert Bullet Title')]");
            var insertBulletDescription = browser.getText("//div[@class='row']//div[contains(.,'Insert Bullet Description')]");
*/

            browser.frame();
            browser.waitForExist("button[ng-click='$cancel()']", 20000);
            browser.click("button[ng-click='$cancel()']");

            return vals = {
	        "headline": moduleHeadline,
            "moduleDescription": moduleDescription,
           /* "align": align,
            "alignLeftOption": alignLeftOption,
            "alignMiddleOption": alignMiddleOption,
            "alignRightOption": alignRightOption,
            "bullet": bullet,
            "bulletTitle": bulletTitle,
            "insertBulletTitle": insertBulletTitle, */
            "insertBulletDescription": insertBulletDescTextWithMarkup
            };      
    
};


// Method to pass the data of bulletlist Modules for richtext fields 
module.exports.interactiveModuleBulletList = function(browser,CKeditorfields,i)
{
             var testval = browser.execute(function () {
                 return document.querySelectorAll('div[tag_id="Content-widget"]').item(0).getElementsByTagName('iframe').item(0).id;
            });
            browser.frame(testval.value);
            browser.scroll("//h2[span[contains(.,'"+CKeditorfields+"')]]//following-sibling::div//div[text()='Enter text here']");
            browser.setValue("//h2[span[contains(.,'"+CKeditorfields+"')]]//following-sibling::div//div[text()='Enter text here']", "QA");
            browser.moveToObject("(//span[contains(.,'Module')]/following-sibling::span[@class='cke_button_arrow'])["+i+"]");
            browser.pause(1000);
            browser.click("(//span[contains(.,'Module')]/following-sibling::span[@class='cke_button_arrow'])["+i+"]");
            browser.pause(1000);
            var mModuleIF = browser.execute(function () {
                return document.getElementsByTagName('iframe').item(0).id;
                
            });
            
            
            browser.frame(mModuleIF.value);
                browser.pause(5000);
            browser.moveToObject("//span[text()='Bulleted List']");
            browser.leftClick("//span[text()='Bulleted List']");
            browser.frameParent();
            browser.frameParent();
            browser.pause(5000);
            browser.setValue("#moduletitle", "QA");
            browser.setValue("#moduledescription", "QA");

            browser.leftClick("//select[@ng-model='moduleConfiguration.module.align']");
            browser.waitForVisible("//option[contains(.,'Left')]", 50000);
            browser.moveToObject("//option[contains(.,'Left')]").click("//option[contains(.,'Left')]");

 
            browser.pause(5000);
            browser.waitForVisible("//input[@ng-model='bulletTitle']", 50000);
            browser.setValue("//input[@ng-model='bulletTitle']","QAtest");
            browser.frame("bulletDescContentFrame");
            browser.pause(5000);
            browser.click("//span[contains(@class,'bold_icon')]");
            browser.execute("document.getElementsByTagName('iframe').item(0).contentWindow.document.getElementsByTagName('p').item(0).textContent = 'D2'").pause(10000);

            browser.click("//a[@title='body element']");
            browser.pause(5000);
            browser.click("//span[contains(@class,'bold_icon')]");
            browser.click("//span[contains(@class,'italic_icon')]");
            browser.click("//span[contains(@class,'underline_icon')]");
            browser.frameParent();
            browser.leftClick('//button[@ng-click="addBullet()"]');

            browser.waitForVisible("//div[@class='modal-footer']//button[contains(.,'Insert')]", 50000);
            browser.leftClick("//div[@class='modal-footer']//button[contains(.,'Insert')]");

            browser.pause(5000);
            var contentframe = browser.execute(function () {
                 return document.querySelectorAll('div[tag_id="Content-widget"]').item(0).getElementsByTagName('iframe').item(0).id;
            });
            browser.frame(contentframe.value);
            browser.pause(5000);
            var mName = browser.getText("(//figcaption[@class='embedModuleClickable' and contains(.,'QA')])["+i+"]");
            browser.frameParent();

             var moduleName = {};
             moduleName = {
	        "mName": mName,
             };
            
            return moduleName;
};


// Method to insert multiple bullet Modules 
module.exports.interactiveModuleBulletModule = function(browser,CKeditorfields,i)
{
             var testval = browser.execute(function () {
                 return document.querySelectorAll('div[tag_id="Content-widget"]').item(0).getElementsByTagName('iframe').item(0).id;
            });
            browser.frame(testval.value);
            browser.scroll("//h2[span[contains(.,'"+CKeditorfields+"')]]//following-sibling::div//div[text()='Enter text here']");
            browser.setValue("//h2[span[contains(.,'"+CKeditorfields+"')]]//following-sibling::div//div[text()='Enter text here']", "QA");
            browser.moveToObject("(//span[contains(.,'Module')]/following-sibling::span[@class='cke_button_arrow'])["+i+"]");
            browser.pause(1000);
            browser.click("(//span[contains(.,'Module')]/following-sibling::span[@class='cke_button_arrow'])["+i+"]");
            browser.pause(1000);
            var mModuleIF = browser.execute(function () {
                return document.getElementsByTagName('iframe').item(0).id;
                
            });
            
            
            browser.frame(mModuleIF.value);
                browser.pause(5000);
            browser.moveToObject("//span[text()='Bulleted List']");
            browser.leftClick("//span[text()='Bulleted List']");
            browser.frameParent();
            browser.frameParent();
            
            browser.setValue("#moduletitle", "QA");
            browser.setValue("#moduledescription", "QA");

            browser.leftClick("//select[@ng-model='moduleConfiguration.module.align']");
            browser.waitForVisible("//option[contains(.,'Left')]", 50000);
            browser.moveToObject("//option[contains(.,'Left')]").click("//option[contains(.,'Left')]");

 
            browser.pause(5000);
            browser.waitForVisible("//input[@ng-model='bulletTitle']", 50000);
            browser.setValue("//input[@ng-model='bulletTitle']","QAtest");
            browser.frame("bulletDescContentFrame");
            browser.pause(5000);
            browser.click("//span[contains(@class,'bold_icon')]");
            browser.execute("document.getElementsByTagName('iframe').item(0).contentWindow.document.getElementsByTagName('p').item(0).textContent = 'D2'").pause(10000);
            browser.click("//a[@title='body element']");
            browser.pause(5000);
            browser.click("//span[contains(@class,'bold_icon')]");
            browser.click("//span[contains(@class,'italic_icon')]");
            browser.click("//span[contains(@class,'underline_icon')]");
            browser.frameParent();
            browser.leftClick('//button[@ng-click="addBullet()"]');


             browser.pause(5000);
            browser.waitForVisible("//input[@ng-model='bulletTitle']", 50000);
            browser.setValue("//input[@ng-model='bulletTitle']","QAtestbullet");
            browser.frame("bulletDescContentFrame");
            browser.pause(5000);
            browser.click("//span[contains(@class,'bold_icon')]");
            browser.execute("document.getElementsByTagName('iframe').item(0).contentWindow.document.getElementsByTagName('p').item(0).textContent = 'D2'").pause(10000);

            browser.click("//a[@title='body element']");
            browser.pause(5000);
            browser.click("//span[contains(@class,'bold_icon')]");
            browser.click("//span[contains(@class,'italic_icon')]");
            browser.click("//span[contains(@class,'underline_icon')]");
            browser.frameParent();
            browser.leftClick('//button[@ng-click="addBullet()"]');

            browser.waitForVisible("//div[@class='modal-footer']//button[contains(.,'Insert')]", 50000);
            browser.leftClick("//div[@class='modal-footer']//button[contains(.,'Insert')]");

            browser.pause(5000);
            var contentframe = browser.execute(function () {
                 return document.querySelectorAll('div[tag_id="Content-widget"]').item(0).getElementsByTagName('iframe').item(0).id;
            });
            browser.frame(contentframe.value);
            browser.pause(5000);
            var mName = browser.getText("(//figcaption[@class='embedModuleClickable' and contains(.,'QA')])["+i+"]");
            browser.frameParent();

             var moduleName = {};
             moduleName = {
	        "mName": mName,
             };
            
            return moduleName;
};

// Method to edit bulletlist Modules for richtext fields 
module.exports.interactiveModuleBulletListEdit = function(browser,CKeditorfields,i)
{
             var testval = browser.execute(function () {
                 return document.querySelectorAll('div[tag_id="Content-widget"]').item(0).getElementsByTagName('iframe').item(0).id;
            });
            browser.frame(testval.value);
            browser.scroll("//h2[span[contains(.,'"+CKeditorfields+"')]]//following-sibling::div//div[text()='Enter text here']");
            browser.setValue("//h2[span[contains(.,'"+CKeditorfields+"')]]//following-sibling::div//div[text()='Enter text here']", "QA");
            browser.moveToObject("(//span[contains(.,'Module')]/following-sibling::span[@class='cke_button_arrow'])["+i+"]");
            browser.pause(1000);
            browser.click("(//span[contains(.,'Module')]/following-sibling::span[@class='cke_button_arrow'])["+i+"]");
            browser.pause(1000);
            var mModuleIF = browser.execute(function () {
                return document.getElementsByTagName('iframe').item(0).id;
                
            });
            
            
            browser.frame(mModuleIF.value);
                    browser.pause(5000);
            browser.moveToObject("//span[text()='Bulleted List']");
            browser.click("//span[text()='Bulleted List']");
            browser.frameParent();
            browser.frameParent();
            browser.pause(5000);
            browser.setValue("#moduletitle", "QA");
            browser.setValue("#moduledescription", "QA");

            browser.leftClick("//select[@ng-model='moduleConfiguration.module.align']");
            browser.waitForVisible("//option[contains(.,'Left')]", 50000);
            browser.moveToObject("//option[contains(.,'Left')]").click("//option[contains(.,'Left')]");

 
            browser.pause(5000);
            browser.waitForVisible("//input[@ng-model='bulletTitle']", 50000);
            browser.setValue("//input[@ng-model='bulletTitle']","QAtest");

            browser.frame("bulletDescContentFrame");
            browser.pause(5000);
            browser.leftClick("//span[contains(@class,'bold_icon')]");
            browser.execute("document.getElementsByTagName('iframe').item(0).contentWindow.document.getElementsByTagName('p').item(0).textContent = 'D2'").pause(5000);
            browser.frameParent();
            browser.leftClick('//button[@ng-click="addBullet()"]');


            browser.leftClick("//img[@ng-click='editBullet(bullet)']");
             browser.waitForVisible("//input[@ng-model='bulletTitle']", 50000);
             browser.setValue("//input[@ng-model='bulletTitle']","QAtest123");
             
            var bulletTitle= browser.execute("return document.querySelectorAll('.form-control').item(3).value").value;
             browser.frame("bulletDescContentFrame");
            browser.pause(5000);
            browser.click("//span[contains(@class,'bold_icon')]");
            browser.execute("document.getElementsByTagName('iframe').item(0).contentWindow.document.getElementsByTagName('p').item(0).textContent = 'D2QA'").pause(5000);
            var bulletdescription= browser.execute("return document.getElementsByTagName('iframe').item(0).contentDocument.getElementsByTagName('p').item(0).textContent").value;
            

            browser.frameParent();
            browser.leftClick('//button[@ng-click="saveBullet()"]');
            browser.leftClick("//img[@ng-click='editBullet(bullet)']");
            var expectedbulletTitle= browser.execute("return document.querySelectorAll('.form-control').item(3).value").value;
            browser.frame("bulletDescContentFrame");
            browser.pause(5000);
            var expectedbulletdescription= browser.execute("return document.getElementsByTagName('iframe').item(0).contentDocument.getElementsByTagName('p').item(0).textContent").value;
            

            browser.frameParent();
            expect(bulletTitle).to.equal(expectedbulletTitle);
            expect(bulletdescription).to.equal(expectedbulletdescription);

             browser.waitForVisible("//input[@ng-model='bulletTitle']", 50000);
            browser.setValue("//input[@ng-model='bulletTitle']","QAtest123");
            browser.pause(10000);

};

// Method to validate bulletlist Modules for without Title and Description
module.exports.interactiveModuleBulletTitleDescription = function(browser,CKeditorfields,i)
{
             var testval = browser.execute(function () {
                 return document.querySelectorAll('div[tag_id="Content-widget"]').item(0).getElementsByTagName('iframe').item(0).id;
            });
            browser.frame(testval.value);
            browser.scroll("//h2[span[contains(.,'"+CKeditorfields+"')]]//following-sibling::div//div[text()='Enter text here']");
            browser.setValue("//h2[span[contains(.,'"+CKeditorfields+"')]]//following-sibling::div//div[text()='Enter text here']", "QA");
            browser.moveToObject("(//span[contains(.,'Module')]/following-sibling::span[@class='cke_button_arrow'])["+i+"]");
            browser.pause(1000);
            browser.click("(//span[contains(.,'Module')]/following-sibling::span[@class='cke_button_arrow'])["+i+"]");
            browser.pause(1000);
            var mModuleIF = browser.execute(function () {
                return document.getElementsByTagName('iframe').item(0).id;
                
            });
            
            
            browser.frame(mModuleIF.value);
            browser.pause(5000);
            browser.moveToObject("//span[text()='Bulleted List']");
            browser.leftClick("//span[text()='Bulleted List']");
            browser.frameParent();
            browser.frameParent();
            browser.pause(1000);
            browser.leftClick('//button[@ng-click="addBullet()"]');
            browser.moveToObject("//div[@class='toast-message' and contains(.,'Please enter a title for the bullet!')]");
            expect(browser.getText("//div[@class='toast-message' and contains(.,'Please enter a title for the bullet!')]")).to.equal(data.expectedResults.bulletTitleValidation);
            browser.setValue("//input[@ng-model='bulletTitle']","QAtest");
            browser.leftClick('//button[@ng-click="addBullet()"]');
            browser.moveToObject("//div[@class='toast-message' and contains(.,'Please enter a description for the bullet!')]");
            expect(browser.getText("//div[@class='toast-message' and contains(.,'Please enter a description for the bullet!')]")).to.equal(data.expectedResults.bulletDescriptionValidation);
           
            browser.waitForVisible("//button[contains(.,'Cancel')]", 50000);
            browser.moveToObject("//button[contains(.,'Cancel')]");
            browser.click("//button[contains(.,'Cancel')]");
            browser.pause(1000);


};


// Method to validate alignment for bulletlist Modules
module.exports.interactiveModuleBulletAlign = function(browser,CKeditorfields,i,align)
{
             var testval = browser.execute(function () {
                 return document.querySelectorAll('div[tag_id="Content-widget"]').item(0).getElementsByTagName('iframe').item(0).id;
            });
            browser.frame(testval.value);
            browser.scroll("//h2[span[contains(.,'"+CKeditorfields+"')]]//following-sibling::div//div[text()='Enter text here']");
            browser.setValue("//h2[span[contains(.,'"+CKeditorfields+"')]]//following-sibling::div//div[text()='Enter text here']", "QA");
            browser.moveToObject("(//span[contains(.,'Module')]/following-sibling::span[@class='cke_button_arrow'])["+i+"]");
            browser.pause(1000);
            browser.click("(//span[contains(.,'Module')]/following-sibling::span[@class='cke_button_arrow'])["+i+"]");
            browser.pause(1000);
            var mModuleIF = browser.execute(function () {
                return document.getElementsByTagName('iframe').item(0).id;
                
            });
            
            
            browser.frame(mModuleIF.value);
                browser.pause(5000);
            browser.moveToObject("//span[text()='Bulleted List']");
            browser.leftClick("//span[text()='Bulleted List']");
            browser.frameParent();
            browser.frameParent();
            browser.pause(5000);
            browser.setValue("#moduletitle", "QA");
            browser.setValue("#moduledescription", "QA");

            browser.leftClick("//select[@ng-model='moduleConfiguration.module.align']");
            browser.waitForVisible("//option[contains(.,'"+align+"')]", 50000);
            browser.moveToObject("//option[contains(.,'"+align+"')]").click("//option[contains(.,'"+align+"')]");

 
            browser.pause(5000);
            browser.waitForVisible("//input[@ng-model='bulletTitle']", 50000);
            browser.setValue("//input[@ng-model='bulletTitle']","QAtest");
            browser.frame("bulletDescContentFrame");
            browser.pause(5000);
            browser.click("//span[contains(@class,'bold_icon')]");
            browser.execute("document.getElementsByTagName('iframe').item(0).contentWindow.document.getElementsByTagName('p').item(0).textContent = 'D2'").pause(10000);

            browser.click("//a[@title='body element']");
            browser.pause(5000);
            browser.click("//span[contains(@class,'bold_icon')]");
            browser.click("//span[contains(@class,'italic_icon')]");
            browser.click("//span[contains(@class,'underline_icon')]");
            browser.frameParent();
            browser.leftClick('//button[@ng-click="addBullet()"]');

            browser.waitForVisible("//div[@class='modal-footer']//button[contains(.,'Insert')]", 50000);
            browser.leftClick("//div[@class='modal-footer']//button[contains(.,'Insert')]");

            browser.pause(5000);
            var contentframe = browser.execute(function () {
                 return document.querySelectorAll('div[tag_id="Content-widget"]').item(0).getElementsByTagName('iframe').item(0).id;
            });
            browser.frame(contentframe.value);
            browser.pause(5000);
            var mName = browser.getText("(//figcaption[@class='embedModuleClickable' and contains(.,'QA')])["+i+"]");
            browser.frameParent();

             var moduleName = {};
             moduleName = {
	        "mName": mName,
             };
            
            return moduleName;


};
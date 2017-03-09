var page = require('./../../../common/page');
var data = require('./../data/testRunConfig');
var testUrl = data.testData.url;


var feature = Object.create(page, {

    title: { get: function () { return browser.getTitle(); } },
    failLoginText: {
        get: function () {
            return browser.getText("span=Username or password incorrect");
        }
    },
    browser: { get: function () { return browser } },

    open: {
        value: function () {
            page.open.call(this, testUrl);
            browser.waitForVisible('.x-panel-body');

        }
    },

// Navigation for the desire folder
   Navigation: { value: function() {
       browser.waitForVisible("#menuDownArrow-button");
       // var rootpath="webmd::2/consumer_assets::3/editorial::4/articles::5/other::6"
       var rootpath=data.testData.path
        rootpath.split('/').forEach(function(x){
        var arr = x.split('::');
        browser.waitForVisible("//div[@aria-label='"+arr[0].trim()+"' and @aria-level='"+arr[1].trim()+"']",100000)
        //browser.leftClick("//div[@aria-label='"+arr[0].trim()+"' and @aria-level='"+arr[1].trim()+"'] //Span[contains(text(),'"+arr[0].trim()+"')]");

        //browser.element("//div[@aria-label='"+arr[0].trim()+"' and @aria-level='"+arr[1].trim()+"'] //Span[contains(text(),'"+arr[0].trim()+"')]").click();
        browser.element("//div[@aria-label='"+arr[0].trim()+"' and @aria-level='"+arr[1].trim()+"']").click();
        browser.pause(2000);
        });
} },

//  Initial creation for the article
    newArticle: {
        value: function (template, objectTitle) {
            browser.click('#menuFileNew');
            browser.waitForVisible("#menuFileNewDocument", 20000);
            browser.click('#menuFileNewDocument');
            browser.waitForVisible("#creationProfileChooser-input");
            browser.click('#creationProfileChooser-input');
            browser.leftClick('//div[@title="Consumer Portal US / Article Templates"]');
            browser.waitForVisible("//div[starts-with(@id,'combo')]");
            browser.leftClick("//div[starts-with(@id,'combo')]");
            browser.click('//div[@title="Article /  ' + template + '"]');
            browser.leftClick('//*[@id="next-button"]');
            browser.waitForVisible("#object_name-input");
            browser.setValue('#object_name-input', objectTitle);
            browser.waitForVisible("#title-input");
            browser.setValue('#title-input', objectTitle);
            browser.leftClick('//*[@id="next-button"]');
            browser.element("//span[@title='" + objectTitle + "']").waitForExist(40000);
        }
    },


// Mandatory and Validation fields for the article
    editProperties: {
        value: function (objectTitle,contentClassification,publication) {
            browser.leftClick("//span[@title='" + objectTitle + "']");

            browser.doubleClick("//span[text()='Properties']");
            browser.pause(30000);
            browser.element("//button[text()='Edit']");
            browser.moveToObject("//button[text()='Edit']");
            browser.leftClick("//button[text()='Edit']");

            //Friendly Name
            browser.waitForEnabled('#wbmd_c_frnd_nm-input', 30000);
            browser.waitForVisible("#wbmd_c_frnd_nm-input");
            browser.setValue('#wbmd_c_frnd_nm-input', objectTitle);

            //Content Classification
            browser.waitForVisible("#wbmd_bus_ref-input",5000);
            browser.leftClick("//div[@id='wbmd_bus_ref']/img");
            browser.leftClick("//div[@title='"+contentClassification+"']");

            // //Friendly Name
            // browser.waitForEnabled('#wbmd_med_ref_type-input', 30000);
            // browser.waitForVisible("#wbmd_med_ref_type-input");
            // browser.setValue('#wbmd_med_ref_type-input', 'QAtestArticle_' + randomtext);

            //Health Reference Type
           // browser.pause(30000);
            browser.waitForVisible("#wbmd_med_ref_type-input",5000);
            browser.leftClick("//div[@id='wbmd_med_ref_type']/img");
            browser.pause(30000);
            browser.leftClick("//div[@title='Disease & Condition - Causes']");

            //User Description
            browser.waitForVisible("#wbmd_desc_user-input",5000);
            browser.setValue('#wbmd_desc_user-input', objectTitle);

            //Meta Description
            browser.waitForVisible("#wbmd_desc_meta-input",5000);
            browser.setValue('#wbmd_desc_meta-input', objectTitle);

            //WebMD keyword
            browser.waitForVisible("#wbmd_keywords-input");
            browser.setValue('#wbmd_keywords-input', objectTitle);

            //Link Title
            browser.waitForVisible("#wbmd_lk_ttl-input",5000);
            browser.setValue('#wbmd_lk_ttl-input', objectTitle);

            //Window Title
            browser.waitForVisible("#wbmd_wdw_ttl-input",5000);
            browser.setValue('#wbmd_wdw_ttl-input', objectTitle);

            //Publication
            browser.leftClick("//div[@id='wbmd_publ']/img");
            browser.leftClick("//div[@title='"+publication+"']");

            //Copyright
            // browser.pause(30000);
            browser.waitForVisible("#wbmd_cpyrt-input",5000);
            browser.leftClick("//div[@id='wbmd_cpyrt']/img");
            // browser.pause(30000);
            browser.leftClick("//div[@title='2015 WebMD']");

            //Primary Topic ID
            //  browser.pause(30000);
            browser.waitForVisible("#wbmd_c_prim_top_id-input",5000);
            browser.leftClick("//div[@id='wbmd_c_prim_top_id']/img");
            //  browser.pause(30000);
            browser.leftClick("//div[@title='ADD-ADHD (Adult)']");

            //Original Publish Date
            browser.waitForVisible("#wbmd_orig_pub_dt-input",5000);
            browser.leftClick("//div[@id='wbmd_orig_pub_dt']/img");
            browser.leftClick("//button[contains(.,'Today')]");
            //Save
            browser.leftClick("#save-button");
            browser.pause(50000);
        }
    },

  // CheckoutCheckin operation  
    CheckoutCheckin: {
        value: function (objectTitle) {
            browser.leftClick("//span[@title='" + objectTitle + "']");
            browser.leftClick("//span[text()='Content']");
            browser.pause(500);
          //  browser.doubleClick("//span[text()='Content']");
            //IFrame switch start
            var testval = browser.execute(function () {
                return document.getElementById('ExternalWidget-3').getElementsByTagName('iframe').item(0).id;
            });
            browser.frame(testval.value);
            browser.leftClick('//button[contains(string(),"Check-out")]');
            browser.pause(30000);
            browser.setValue("//h2[span[contains(.,'Sub Headline')]]//following-sibling::div//input", "QAtest")
            browser.pause(15000);
            browser.leftClick("//button[contains(text(),'Check-in')]");
            browser.pause(7000);

        }
    },
    //Checkout Operation
        Checkout: {
        value: function (objectTitle) {
            browser.leftClick("//span[@title='" + objectTitle + "']");
            browser.pause(500);
            browser.leftClick("//span[text()='Content']");
            browser.pause(500);
           // browser.doubleClick("//span[text()='Content']");
            //IFrame switch start
            var testval = browser.execute(function () {
                return document.getElementById('ExternalWidget-3').getElementsByTagName('iframe').item(0).id;
            });
            browser.frame(testval.value);
            browser.leftClick('//button[contains(string(),"Check-out")]');
            browser.pause(7000);
            browser.frameParent();
            browser.pause(7000);
        }
    },

  //Checkin Operation
        Checkin: {
        value: function (objectTitle) {
            browser.leftClick("//span[@title='" + objectTitle + "']");
            browser.pause(500);
            browser.leftClick("//span[text()='Content']");
            browser.pause(500);
         //   browser.doubleClick("//span[text()='Content']");
            //IFrame switch start
            var testval = browser.execute(function () {
                return document.getElementById('ExternalWidget-3').getElementsByTagName('iframe').item(0).id;
            });
            browser.frame(testval.value);
            browser.pause(15000);
            browser.leftClick("//button[contains(text(),'Check-in')]");
            browser.pause(7000);
            browser.frameParent();
            browser.pause(7000);
        }
    },
// Interactivemodule for Video
    interactivemodule: {
        value: function (objectTitle) {
            browser.leftClick("//span[@title='" + objectTitle + "']");
            browser.leftClick("//span[text()='Content']");
            browser.pause(5000);
            browser.doubleClick("//span[text()='Content']");

            //IFrame switch start
            var testval = browser.execute(function () {
                return document.getElementById('ExternalWidget-2').getElementsByTagName('iframe').item(0).id;
            });



            browser.frame(testval.value);
            browser.leftClick('//button[contains(string(),"Check-out")]');
            browser.pause(20000);
            browser.setValue("//h2[span[contains(.,'Section Text')]]//following-sibling::div//div[text()='Enter text here']", "QA");
            browser.click("(//a[@title='Insert Module'])[1]");
            browser.pause(10000);
            browser.frameParent();
            browser.leftClick("//select[@ng-model='moduleConfig.moduleType']");
            browser.pause(10000);
            browser.moveToObject("//option[contains(.,'Video')]");
            browser.leftClick("//option[contains(.,'Video')]");
            browser.pause(50000);
            browser.setValue("//input[@placeholder='Search by keyword']", "heart");
            browser.click("//span[@class='input-group-addon']");
            browser.pause(50000);

            browser.click("//div[@class='modal-body']//tr[2]/td[2]");
            browser.pause(10000);
            var Name = browser.getText("//div[@class='modal-body']//tr[2]/td[2]/a");
            browser.leftClick("//button[contains(.,'Select')]");
            browser.waitForVisible("#moduletitle", 50000);
            browser.setValue("#moduletitle", "QA");
            browser.pause(10000);
            browser.leftClick("//button[contains(.,'Insert')]");
            browser.pause(10000);
            browser.frame(testval.value);
            browser.pause(15000);
            browser.leftClick("//button[contains(text(),'Check-in')]");
            browser.pause(30000);
            browser.frameParent();
            browser.doubleClick("//span[text()='Content']");
            browser.pause(60000);
            browser.click("//span[@title='QAtestArticle1']");

            browser.pause(30000);
            browser.waitForVisible("//span[text()='Relations' and not(@aria-hidden='true')]", 50000);
            browser.click("//span[text()='Relations' and not(@aria-hidden='true')]");
            browser.waitForVisible("//tr[contains(.,'wbmd_embeds_asset') and contains(.,'vd-0801-cond-mng-07_.xml')]", 50000);

        }
    },

     interactivemodulebullet: {
        value: function (objectTitle) {
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
            //browser.frameParent();
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
            browser.leftClick("//option[contains(.,'Left')]");
            browser.pause(50000);
            // browser.waitForVisible("//input[@ng-model='bulletTitle']", 50000);
            // browser.setValue("//input[@ng-model='bulletTitle']","QAtest");
            // // browser.frame("bulletDescContentFrame");
            // //  var bFrame = browser.execute(function () {
            // //     return document.getElementsByTagName('iframe').item(0).id;
            // // });
            // // browser.frame(iframe[class='cke_wysiwyg_frame cke_reset']);
            // // browser.waitForVisible("//body/p", 50000);
            // // browser.setValue("//body/p","QAtest");
            // // browser.frameParent();
            // // browser.frameParent();
            // browser.leftClick('//button[@ng-click="addBullet()"]');

            browser.waitForVisible("//div[@class='modal-footer']//button[contains(.,'Insert')]", 50000);
            browser.leftClick("//div[@class='modal-footer']//button[contains(.,'Insert')]");

            browser.pause(50000);

        }
    },


interactivemoduleBulletListAvailability: {
        value: function (objectTitle,CKeditorfields) {
             //IFrame switch start
            var testval = browser.execute(function () {
                return document.getElementById('ExternalWidget-3').getElementsByTagName('iframe').item(0).id;
            });



            browser.frame(testval.value);
            browser.scroll("//h2[span[contains(.,'"+CKeditorfields+"')]]//following-sibling::div//div[text()='Enter text here']");
            browser.setValue("//h2[span[contains(.,'"+CKeditorfields+"')]]//following-sibling::div//div[text()='Enter text here']", "QA");
            browser.moveToObject("(//span[contains(.,'Module')]/following-sibling::span[@class='cke_button_arrow'])[1]");
            browser.leftClick("(//span[contains(.,'Module')]/following-sibling::span[@class='cke_button_arrow'])[1]");

            var mModuleIF = browser.execute(function () {
                return document.getElementsByTagName('iframe').item(0).id;
            });

            browser.frame(mModuleIF.value);
             browser.waitForVisible("//span[text()='Bulleted List']", 50000);
            browser.moveToObject("//span[text()='Bulleted List']");


             expect(browser.getText("//span[text()='Bulleted List']")).to.equal(data.expectedResults.bulletlist);
            
            browser.frameParent();
            browser.frameParent();
            

        }
    },


//Promote Operation
    promote: {
        value: function (objectTitle) {

            browser.rightClick("//span[@title='" + objectTitle + "']");
            browser.waitForVisible("#menuContextDocumentLifeCycle", 5000);
            browser.leftClick("#menuContextDocumentLifeCycle");
            browser.waitForVisible("//a[contains(text(),'Promote')]", 5000);
            browser.leftClick("//a[contains(text(),'Promote')]");
            browser.waitForVisible("//div[@class='modal-content']//button[contains(text(),'OK')]", 50000);
            browser.leftClick("//div[@class='modal-content']//button[contains(text(),'OK')]");
            browser.pause(7000);
        }
    },

// Demote Operation
    demote: {
        value: function (objectTitle) {
            browser.rightClick("//span[@title='" + objectTitle + "']");
            browser.waitForVisible("#menuContextDocumentLifeCycle");
            browser.leftClick("#menuContextDocumentLifeCycle");
            browser.waitForVisible("//a[contains(text(),'Demote')]", 5000);
            browser.leftClick("//a[contains(text(),'Demote')]");
            browser.waitForVisible("//div[@class='modal-content']//button[contains(text(),'OK')]", 50000);
            browser.leftClick("//div[@class='modal-content']//button[contains(text(),'OK')]");
            browser.pause(7000);
        }
    },

// PowerPromote Operation
    powerpromote: {
        value: function (objectTitle) {
            browser.rightClick("//span[@title='" + objectTitle + "']");
            browser.waitForVisible("#menuContextDocumentLifeCycle");
            browser.leftClick("#menuContextDocumentLifeCycle");
            browser.waitForVisible("//a[contains(text(),'Power Promote')]", 5000);
            browser.leftClick("//a[contains(text(),'Power Promote')]");
            browser.waitForVisible("//div[@class='modal-dialog prompt']//button[contains(text(),'OK')]", 50000);
            browser.leftClick("//div[@class='modal-dialog prompt']//button[contains(text(),'OK')]");
            browser.pause(7000);
        }
    },


// Publish Operation
    publish: {
        value: function (objectTitle,publishState ) {
            browser.rightClick("//span[@title='" + objectTitle + "']");
            browser.waitForVisible("#menuContextDocumentLifeCycle");
            browser.leftClick("#menuContextDocumentLifeCycle");
            browser.waitForVisible("//a[contains(text(),'Publish')]", 5000);
            browser.leftClick("//a[contains(text(),'Publish')]");
            // Select the state for the publishing(stagingo or Active)
            browser.waitForVisible("//input[@value='"+publishState+"']", 50000);
            browser.leftClick("//input[@value='"+publishState+"']");
            browser.waitForVisible("//div[@class='modal-dialog prompt']//button[contains(text(),'OK')]", 50000);
            browser.leftClick("//div[@class='modal-dialog prompt']//button[contains(text(),'OK')]");
            browser.pause(7000);
        }
    },
});

module.exports = feature
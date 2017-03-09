var page = require('./../../../common/page')

var pfArticle = Object.create(page, {
      
    title:    { get: function () { return browser.getTitle(); } },
    failLoginText: { get: function () {
        return browser.getText("span=Username or password incorrect");
    } },
    browser: { get: function()  { return browser }},

    open: { value: function() {
        page.open.call(this, testUrl);
        browser.waitForVisible('.x-panel-body');

    } },

     Navigation: { value: function() {
        var rootpath="webmd::2/professional_assets::3/medscape::4/articles::5/article::6/2015::7"
        rootpath.split('/').forEach(function(x){
        var arr = x.split('::');
        browser.waitForVisible("//div[@aria-label='"+arr[0].trim()+"' and @aria-level='"+arr[1].trim()+"']",80000)
        //browser.leftClick("//div[@aria-label='"+arr[0].trim()+"' and @aria-level='"+arr[1].trim()+"'] //Span[contains(text(),'"+arr[0].trim()+"')]");

        browser.element("//div[@aria-label='"+arr[0].trim()+"' and @aria-level='"+arr[1].trim()+"'] //Span[contains(text(),'"+arr[0].trim()+"')]").click();
        browser.pause(2000);
        });
    } },
    newArticle: { value: function() {
        browser.click('#menuFileNew');
        browser.waitForVisible("#menuFileNewDocument",20000);
        browser.click('#menuFileNewDocument');
        browser.waitForVisible("#creationProfileChooser-input");
        browser.click('#creationProfileChooser-input');
        browser.leftClick('//div[@title="US / Article Templates"]');
        browser.waitForVisible("#combo_1");
        browser.leftClick('#combo_1');
        browser.leftClick('//div[@title="Professional Article"]');
        browser.leftClick('//*[@id="next-button"]');
        browser.waitForVisible("#title-input");
        browser.setValue('#title-input', 'DemoArticleWebDIO');
        browser.leftClick('//div[@id="wbmd_bus_ref"]//img');
        browser.leftClick('//div[@title="Article"]');
        browser.leftClick('//*[@id="next-button"]');
        browser.element("//span[@title='DemoArticleWebDIO']").waitForExist(40000);  
  
    } },    

    editProperties: { value: function() {
        browser.pause(5000);
        browser.element("//span[contains(.,'Properties')]//following-sibling::span[@id='menuDownArrow-button' and not(@aria-haspopup='true')]").waitForExist(50000);  
        browser.leftClick("//span[contains(.,'Properties')]//following-sibling::span[@id='menuDownArrow-button' and not(@aria-haspopup='true')]");
        browser.pause(4000);
        //browser.waitForVisible('//div[@id="owner_name"]',80000)

        browser.element("//button[text()='Edit']");
        browser.moveToObject("//button[text()='Edit']");
        browser.leftClick("//button[text()='Edit']");
        browser.waitForEnabled('#wbmd_lead_spclty-input', 30000);
        browser.waitForVisible("#wbmd_lead_spclty-input");

        browser.leftClick("#wbmd_lead_spclty-input");
        browser.leftClick('//div[@title="Allergy & Clinical Immunology"]');
        browser.leftClick("#wbmd_cont_dev-input");
        browser.leftClick('//div[@title="N/A" and @role="listitem"]');
        browser.leftClick("#save-button");
        browser.pause(5000); 
    } },
    CheckoutCheckin: { value: function() {

        browser.leftClick("//span[text()='Content']"); 
        browser.pause(500);
        browser.doubleClick("//span[text()='Content']"); 
        //IFrame switch start
        var testval=browser.execute(function(){
        return document.getElementById('ExternalWidget-3').getElementsByTagName('iframe').item(0).id;
        });
        browser.frame(testval.value);
        browser.leftClick('//button[contains(string(),"Check-out")]');
        browser.pause(30000);
        browser.setValue("//h2[span[contains(.,'Above Title')]]//following-sibling::div//div[text()='Enter text here']","Sample Text entered")
        browser.pause(15000);
        browser.leftClick("//button[contains(text(),'Check-in')]");
        browser.pause(60000);
       
        //button[contains(string(),'Check-out')]
        // IFrame swith end   
     } },
    promote: { value: function() {

        browser.rightClick("//span[@title='DemoArticleWebDIO']");
        browser.waitForVisible("#menuContextDocumentLifeCycle", 5000);
        browser.leftClick("#menuContextDocumentLifeCycle");
        browser.waitForVisible("//a[contains(text(),'Promote')]", 5000);
        browser.leftClick("//a[contains(text(),'Promote')]");
        browser.waitForVisible("//div[@class='modal-content']//button[contains(text(),'OK')]", 5000);
        browser.leftClick("//div[@class='modal-content']//button[contains(text(),'OK')]");
        browser.pause(7000);        
     } },
    demote: { value: function() {
        browser.rightClick("//span[@title='DemoArticleWebDIO']");
        browser.waitForVisible("#menuContextDocumentLifeCycle");
        browser.leftClick("#menuContextDocumentLifeCycle");
        browser.waitForVisible("//a[contains(text(),'Demote')]", 5000);
        browser.leftClick("//a[contains(text(),'Demote')]");
        browser.waitForVisible("//div[@class='modal-content']//button[contains(text(),'OK')]", 5000);
        browser.leftClick("//div[@class='modal-content']//button[contains(text(),'OK')]");
        browser.pause(7000);
    } },
    powerpromote: { value: function() {
        browser.rightClick("//span[@title='DemoArticleWebDIO']");
        browser.waitForVisible("#menuContextDocumentLifeCycle");
        browser.leftClick("#menuContextDocumentLifeCycle");
        browser.waitForVisible("//a[contains(text(),'Power Promote')]", 5000);
        browser.leftClick("//a[contains(text(),'Power Promote')]");
        browser.waitForVisible("//div[@class='modal-dialog prompt']//button[contains(text(),'OK')]",7000);
        browser.leftClick("//div[@class='modal-dialog prompt']//button[contains(text(),'OK')]");
        browser.pause(7000);
        } },
});

module.exports = pfArticle
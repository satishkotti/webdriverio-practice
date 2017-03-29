var randomstring = require("randomstring");
var maxWaitInMs = 20000;

module.exports.getUrlAndTitle = function(){
    return {
            url: this.getUrl(),
            title: this.getTitle()};
};

module.exports.getEnvTestUrl = function()
{
    return global.envSettings.d2prof.url;
};

module.exports.getQAPublicationUserInfo = function()
{
    return global.envSettings.d2prof.users[0];
};
module.exports.getQANewsUserInfo = function()
{
    return global.envSettings.d2prof.users[1];
};

module.exports.login = function (browser, params) {
  
    browser.url(params.url);
    browser.waitForVisible("#login_username-input",20000);
    browser.element('#login_username-input').setValue(params.username);
    browser.element('#login_password-input').setValue(params.password);
    browser.click('#Login-button button.x-btn-text');
    browser.waitForVisible("#menuDownArrow-button",60000);
    return;
};

module.exports.isFindByIdExists = function(browser){

    browser.waitForExist("//div[@id='border-layout-container-1']//span[text()='Find']/parent::*", maxWaitInMs);
    return browser.isExisting("//div[@id='border-layout-container-1']//span[text()='Find']/parent::*");
};
module.exports.traverspath = function(browser,parms){
    parms.rootpath.split('/').forEach(function(x){
    var arr = x.split('::');
    browser.waitForVisible("//div[@aria-label='"+arr[0].trim()+"' and @aria-level='"+arr[1].trim()+"']",100000)
    browser.element("//div[@aria-label='"+arr[0].trim()+"' and @aria-level='"+arr[1].trim()+"'] //Span[contains(text(),'"+arr[0].trim()+"')]").click();
    browser.pause(2000);
    });
};
module.exports.articlecreation = function(browser,parms){
    browser.click('#menuFileNew');
    browser.waitForVisible("#menuFileNewDocument", 20000);
    browser.click('#menuFileNewDocument');
    browser.waitForVisible("#creationProfileChooser-input");
    browser.click('#creationProfileChooser-input');
    browser.leftClick('//div[@title="'+parms.profilename+'"]');
    browser.waitForVisible("//div[starts-with(@id,'combo')]");
    browser.leftClick("//div[starts-with(@id,'combo')]");
    browser.click("//div[@title='"+parms.template+"']");
    browser.leftClick('//*[@id="next-button"]');
    browser.waitForVisible("#title-input",50000);
    browser.setValue('#title-input', parms.objectTitle);
    browser.leftClick('//div[@id="wbmd_bus_ref"]//img');
    browser.leftClick('//div[@title="'+parms.contentType+'"]');
    browser.leftClick('//*[@id="next-button"]');
    browser.element("//span[@title='" + parms.objectTitle + "']").waitForExist(40000); 
};
module.exports.verifyeditproperties = function(browser,labelPropertiesArray){
    
    browser.pause(5000);
    browser.leftClick("//span[text()='Properties']");
    browser.doubleClick("//span[text()='Properties']");
    browser.pause(10000);
    browser.moveToObject("//button[text()='Edit']");
    browser.leftClick("//button[text()='Edit']");
    browser.pause(15000);
    var isexistlabels=this.verifypropertieslabels(browser,labelPropertiesArray);   
    return isexistlabels;
};

module.exports.verifyproperties = function checkeditproperties(browser, propertiesArray,propertiestextArray)
{ 
    var isExist=true;
    if(propertiesArray && propertiesArray.length > 0)
    {
        if(browser.isExisting("//div/label[@for='"+propertiesArray[0]+"']"))
            isExist=propertiestextArray.includes(browser.getText("//div/label[@for='"+propertiesArray[0]+"']"));
        else
            isExist=false;
       
        if (isExist)
        {
             propertiesArray.shift();
             return checkeditproperties( browser, propertiesArray,propertiestextArray);
        }
    }
    if (isExist)
        return "";
    else
        return browser.getText("//div/label[@for='"+propertiesArray[0]+"']")
};
var isExist="";
module.exports.verifypropertieslabels = function checkeditpropertieslabels(browser, labelPropertiesArray)
{ 
    if(labelPropertiesArray && labelPropertiesArray.length > 0)
    {
        if(!browser.isExisting("//div/label[@for='"+labelPropertiesArray[0]+"']"))            
            isExist+="//div/label[@for='"+labelPropertiesArray[0]+"']";
       
             labelPropertiesArray.shift();
             return checkeditpropertieslabels( browser, labelPropertiesArray);
    }
    return isExist;
};

// module.exports.verifypropertiesfields = function checkeditpropertiesfields(browser,fieldspropertiestArray)
// {     
//     if(fieldspropertiestArray && fieldspropertiestArray.length > 0)
//     {       
//         if(!browser.isExisting("//fieldset[@class='x-fieldset x-component x-border']//label[@for='"+fieldspropertiestArray[0]+"']"))
//              isExist+="//div/label[@for='"+fieldspropertiestArray[0]+"']";
       
//              fieldspropertiestArray.shift();
//              return checkeditpropertiesfields( browser,fieldspropertiestArray);
//     }
//     return isExist;
// };

module.exports.editproperties = function(browser,ArtTitle)
{ 
    //browser.pause(10000);
        browser.leftClick("//span[@title='"+ArtTitle+"']")
        browser.pause(7000);
        browser.leftClick("//span[text()='Properties']");
        browser.doubleClick("//span[text()='Properties']");
        browser.pause(10000);
        browser.moveToObject("//button[text()='Edit']");
        browser.leftClick("//button[text()='Edit']");
        browser.pause(10000);

        //Window Title Override
        browser.setValue('#wbmd_wdw_ttl-input',randomstring.generate(5));
        //Super Title
        browser.setValue('#wbmd_super_title-input',randomstring.generate(5));
        //Sub Title
        browser.setValue('#wbmd_sub_title-input',randomstring.generate(5));
        //Lead Specialty
        browser.leftClick("//div[@id='wbmd_lead_spclty']/img");
        browser.waitForVisible("//div[@title='"+global.d2ProfDataSettings.LeadSpecialty+"']",20000);
        browser.leftClick("//div[@title='"+global.d2ProfDataSettings.LeadSpecialty+"']");
        //Specialties ( High )
        browser.click("#assistance");
        browser.waitForVisible("#AssistanceListDialog",60000);
        browser.waitForVisible("//div[@id='Cardiology']",30000);
        browser.leftClick("//div[@id='Cardiology']");
        browser.leftClick("#toRight-button");
        browser.pause(3000);
        browser.waitForVisible("//table[@id='ok-button']//button[contains(text(),'OK')]",20000);
        browser.leftClick("//table[@id='ok-button']//button[contains(text(),'OK')]");
        browser.pause(3000);
        //Specialties ( Low )
        browser.leftClick("//div[@id='x-form-el-wbmd_spclty_low']//div[@id='assistance']");
        browser.waitForVisible("#AssistanceListDialog",60000);
        browser.waitForVisible("//div[@id='Critical Care']",30000);
        browser.leftClick("//div[@id='Critical Care']");
        browser.leftClick("#toRight-button");
        browser.pause(3000);
        browser.waitForVisible("//table[@id='ok-button']//button[contains(text(),'OK')]",20000);
        browser.leftClick("//table[@id='ok-button']//button[contains(text(),'OK')]");
        browser.pause(3000);

        //Specialties ( Featured )
        browser.leftClick("//div[@id='x-form-el-wbmd_spclty_featured']//div[@id='assistance']");
        browser.waitForVisible("#AssistanceListDialog",60000);
        browser.waitForVisible("//div[@id='Critical Care']",30000);
        browser.leftClick("//div[@id='Critical Care']");
        browser.leftClick("#toRight-button");
        browser.pause(3000);
        browser.waitForVisible("//table[@id='ok-button']//button[contains(text(),'OK')]",20000);
        browser.leftClick("//table[@id='ok-button']//button[contains(text(),'OK')]");
        browser.pause(3000);

        //Lead Concept
        browser.leftClick("//div[@id='x-form-el-wbmd_lead_concept']//img");
        browser.waitForVisible("//div[@title='Asthma']")
        browser.leftClick("//div[@title='Asthma']");

        //Concepts
        browser.leftClick("//div[@id='x-form-el-wbmd_concept']//div[@id='assistance']");
        browser.waitForVisible("#AssistanceListDialog",60000);
        browser.waitForVisible("//div[@id='Abdomen']",30000);
        browser.leftClick("//div[@id='Abdomen']");
        browser.leftClick("#toRight-button");
        browser.pause(3000);
        browser.waitForVisible("//table[@id='ok-button']//button[contains(text(),'OK')]",20000);
        browser.leftClick("//table[@id='ok-button']//button[contains(text(),'OK')]");
        browser.pause(3000);

        //WebMD Keywords
        browser.setValue('#wbmd_keywords-input',randomstring.generate(5));
         //User Description
        browser.setValue('#wbmd_desc_user-input',randomstring.generate(5));
        //Meta Description
        browser.setValue('#wbmd_desc_meta-input',randomstring.generate(5));
         //Thumbnail Image
       // browser.setValue('#wbmd_desc_meta-input',"testing");


         //Related Links
        browser.leftClick("//div[@id='x-form-el-wbmd_rel_links']//div[@id='assistance']");
        browser.waitForVisible("#AssistanceListDialog",60000);
        browser.waitForVisible("//div[@id='20 Best Movies for Doctors']",60000);
        browser.leftClick("//div[@id='20 Best Movies for Doctors']");
        browser.leftClick("#toRight-button");
        browser.pause(3000);
        browser.waitForVisible("//table[@id='ok-button']//button[contains(text(),'OK')]",20000);
        browser.leftClick("//table[@id='ok-button']//button[contains(text(),'OK')]");
        browser.pause(3000);

        //Suppress from Search
        browser.leftClick("//div[@id='wbmd_suppress_search']//input");
        //Suppress System Generated Link
        browser.leftClick("//div[@id='wbmd_suppress_link']//input");
        //Suppress Commenting
        browser.leftClick("//div[@id='wbmd_suppress_comment']//input");

        //Content Developer
        browser.leftClick("//div[@id='wbmd_cont_dev']/img");
        browser.waitForVisible("//div[@title='"+global.d2ProfDataSettings.ContentDeveloper+"']",20000);
        browser.leftClick("//div[@title='"+global.d2ProfDataSettings.ContentDeveloper+"']");  
   
        //Bucket Collections
        browser.leftClick("//div[@id='x-form-el-wbmd_bkt_gen_coll_id']//div[@id='assistance']");
        browser.waitForVisible("#AssistanceListDialog",60000);
        browser.waitForVisible("//div[@id='12th EURETINA Congress']",60000);
        browser.leftClick("//div[@id='12th EURETINA Congress']");
        browser.leftClick("#toRight-button");
        browser.pause(3000);
        browser.waitForVisible("//table[@id='ok-button']//button[contains(text(),'OK')]",20000);
        browser.leftClick("//table[@id='ok-button']//button[contains(text(),'OK')]");
        browser.pause(3000); 

        //Primary Collection
        browser.leftClick("//div[@id='wbmd_prim_coll']//img");
        browser.waitForVisible("//div[text()='12th EURETINA Congress']",90000);
        browser.leftClick("//div[text()='12th EURETINA Congress']");

        //Suppress Ads
        browser.leftClick("//div[@id='wbmd_supp_ads']//input");
        //Suppress Rectangle Ads
        browser.leftClick("//div[@id='wbmd_supp_rec_ads']//input");

        //Posting Date
        browser.leftClick("//div[@id='wbmd_pub_dt']/img");
        browser.waitForVisible("//button[contains(.,'Today')]",30000);
        browser.leftClick("//button[contains(.,'Today')]");

         //Publication
        browser.leftClick("//div[@id='wbmd_publ']//img");
        browser.waitForVisible("//div[text()='AHRQ']",90000);
        browser.leftClick("//div[text()='AHRQ']");

        //Publication Section
        browser.leftClick("//div[@id='x-form-el-wbmd_pub_sec_id']//img");
        browser.waitForVisible("//div[text()='Information from AHRQ']",90000);
        browser.leftClick("//div[text()='Information from AHRQ']");

            //Publication Subsection
        // browser.leftClick("//div[@id='wbmd_pub_subsec_id']//img");
        // browser.waitForVisible("//div[text()='AHRQ']",90000);
        // browser.leftClick("//div[text()='AHRQ']");
        
        //Publication Date
        browser.leftClick("//div[@id='wbmd_orig_pub_dt']/img");
        browser.waitForVisible("//button[contains(.,'Now')]",30000);
        browser.leftClick("//button[contains(.,'Now')]");

         //Authors
        browser.leftClick("//div[@id='x-form-el-wbmd_authr_prim']//div[@id='assistance']");
        browser.waitForVisible("#AssistanceListDialog",90000);
        browser.waitForVisible("//div[@id='Aasen_Kim']",90000);
        browser.leftClick("//div[@id='Aasen_Kim']");
        browser.leftClick("#toRight-button");
        browser.pause(3000);
        browser.waitForVisible("//table[@id='ok-button']//button[contains(text(),'OK')]",20000);
        browser.leftClick("//table[@id='ok-button']//button[contains(text(),'OK')]");
        browser.pause(3000);

        //System publishing date
        browser.leftClick("//div[@id='wbmd_eff_date']/img");
        browser.waitForVisible("//button[contains(.,'Now')]",30000);
        browser.leftClick("//button[contains(.,'Now')]");
       
        //Save
        browser.leftClick("#save-button");
        browser.pause(40000);
};

module.exports.editMandatoryFields  = function(browser,ArtTitle)
{ 
    //browser.pause(10000);
        browser.leftClick("//span[@title='"+ArtTitle+"']")
        browser.pause(15000);
        browser.leftClick("//span[text()='Properties']");
        browser.doubleClick("//span[text()='Properties']");
        browser.pause(7000);
        console.log(browser.getAttribute('#title-input', 'readonly'))
        
        browser.moveToObject("//button[text()='Edit']");
        browser.leftClick("//button[text()='Edit']");
        browser.pause(7000);
        console.log(browser.getAttribute('#title-input', 'readonly'))
        //Window Title Override
        browser.setValue('#wbmd_wdw_ttl-input',randomstring.generate(5));
        //Super Title
        browser.setValue('#wbmd_super_title-input',randomstring.generate(5));
        //Sub Title
        browser.setValue('#wbmd_sub_title-input',randomstring.generate(5));
         //Lead Specialty
        browser.leftClick("//div[@id='wbmd_lead_spclty']/img");
        browser.waitForVisible("//div[@title='"+global.d2ProfDataSettings.LeadSpecialty+"']",20000);
        browser.leftClick("//div[@title='"+global.d2ProfDataSettings.LeadSpecialty+"']");
       

        //Content Developer
        browser.leftClick("//div[@id='wbmd_cont_dev']/img");
        browser.waitForVisible("//div[@title='"+global.d2ProfDataSettings.ContentDeveloper+"']",20000);
        browser.leftClick("//div[@title='"+global.d2ProfDataSettings.ContentDeveloper+"']");  
             
        //Save
        browser.leftClick("#save-button");
        browser.pause(30000);
        //browser.doubleClick("//span[text()='Properties']");
};

//Promote Operation
module.exports.promote = function(browser,objectTitle,promotemsg)
   {
    browser.rightClick("//span[@title='" + objectTitle + "']");
    browser.waitForVisible("#menuContextDocumentLifeCycle", 5000);
    browser.leftClick("#menuContextDocumentLifeCycle");
    browser.waitForVisible("//a[contains(text(),'Promote')]", 5000);
    browser.leftClick("//a[contains(text(),'Promote')]");
    browser.waitForVisible("//div[@class='modal-content']//button[contains(text(),'OK')]", 50000);
    browser.waitForVisible("//table[@id='validateTable']//td[text()='"+promotemsg+"']",50000);
    var msg= browser.getText("//table[@id='validateTable']//td[text()='"+promotemsg+"']");
    browser.leftClick("//div[@class='modal-content']//button[contains(text(),'OK')]");
   
    browser.pause(5000); 
    return msg; 
    };

// Demote Operation
module.exports.demote = function(browser,objectTitle,msg)
   {
    browser.rightClick("//span[@title='" + objectTitle + "']");
    browser.waitForVisible("#menuContextDocumentLifeCycle");
    browser.leftClick("#menuContextDocumentLifeCycle");
    browser.waitForVisible("//a[contains(text(),'Demote')]", 5000);
    browser.leftClick("//a[contains(text(),'Demote')]");
    browser.waitForVisible("//div[@class='modal-content']//button[contains(text(),'OK')]", 5000);
    var rmsg= browser.getText("//table[@id='validateTable']//td[text()='"+msg+"']");
    browser.leftClick("//div[@class='modal-content']//button[contains(text(),'OK')]");
    browser.pause(7000);
    return rmsg;
   };


// PowerPromote Operation
module.exports.powerpromote = function(browser,objectTitle,promotemsg)
    {
        browser.rightClick("//span[@title='" + objectTitle + "']");
        browser.waitForVisible("#menuContextDocumentLifeCycle");
        browser.leftClick("#menuContextDocumentLifeCycle");
        browser.waitForVisible("//a[contains(text(),'Power Promote')]", 5000);
        browser.leftClick("//a[contains(text(),'Power Promote')]");
        browser.waitForVisible("//div[@class='modal-dialog prompt']//button[contains(text(),'OK')]", 50000);
        browser.leftClick("//div[@class='modal-dialog prompt']//button[contains(text(),'OK')]");
        browser.waitForVisible("//div[@class='modal-content']//button[contains(text(),'OK')]", 50000);
        var msg= browser.getText("//table[@id='validateTable']//td[text()='"+promotemsg+"']");
        browser.leftClick("//div[@class='modal-content']//button[contains(text(),'OK')]");
        browser.pause(7000);
        return msg;
    };
// Publish
module.exports.publish=function(browser,objectTitle,publishState)
{
    browser.rightClick("//span[@title='" + objectTitle + "']");
    browser.waitForVisible("#menuContextDocumentLifeCycle");
    browser.leftClick("#menuContextDocumentLifeCycle");
    browser.waitForVisible("//a[contains(text(),'Publish')]", 35000);
    browser.leftClick("//a[contains(text(),'Publish')]");
    browser.waitForVisible("//div[@class='modal-dialog prompt']//button[contains(text(),'OK')]", 30000);
    browser.waitForVisible("//input[@value='"+publishState+"']", 50000);
    browser.leftClick("//input[@value='"+publishState+"']");
    browser.leftClick("//div[@class='modal-dialog prompt']//button[contains(text(),'OK')]");
    browser.pause(7000);
};
//Expire Now
module.exports.expireNow = function(browser,objectTitle,msg)
   {
    browser.rightClick("//span[@title='" + objectTitle + "']");
    browser.waitForVisible("#menuContextDocumentLifeCycle", 5000);
    browser.leftClick("#menuContextDocumentLifeCycle");
    browser.waitForVisible("//a[contains(text(),'Expire Now')]", 5000);
    browser.leftClick("//a[contains(text(),'Expire Now')]");
    browser.waitForVisible("//div[@class='modal-content']//button[contains(text(),'OK')]", 50000);
    var rmsg= browser.getText("//table[@id='validateTable']//td[text()='"+msg+"']");
    browser.leftClick("//div[@class='modal-content']//button[contains(text(),'OK')]");
   
    browser.pause(5000); 
    return rmsg; 
};

// CheckoutCheckin operation  
    module.exports.checkoutCheckIn = function(browser,objectTitle)
    {
        browser.leftClick("//span[@title='" + objectTitle + "']");
        browser.leftClick("//span[text()='Content']");
        browser.pause(1000);
        browser.doubleClick("//span[text()='Content']");
        browser.pause(5000);
        //IFrame switch start
        var testval = browser.execute(function () {
            return document.getElementById('ExternalWidget-3').getElementsByTagName('iframe').item(0).id;
        });
        browser.frame(testval.value);
        browser.leftClick('//button[contains(string(),"Check-out")]');
        browser.pause(15000);
        browser.setValue("//h2[span[contains(.,'Above Title')]]//following-sibling::div//div[text()='Enter text here']", "Sample Text entered")
        browser.leftClick("//button[contains(text(),'Check-in')]");
        browser.pause(5000);
    };
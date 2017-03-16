var randomstring = require("randomstring");
module.exports.getUrlAndTitle = function(){
    return {
            url: this.getUrl(),
            title: this.getTitle()};
};

module.exports.getEnvTestUrl = function()
{
    return global.envSettings.d2cons.url;
};

module.exports.getQAPublicationInfo = function()
{
    return global.envSettings.d2cons.users[0];
};

module.exports.login = function (params) {
  
    this.url(params.url);
    this.waitForVisible("#login_username-input",20000);
    this.element('#login_username-input').setValue(params.username);
    this.element('#login_password-input').setValue(params.password);
    this.click('#Login-button button.x-btn-text');
    this.waitForVisible("#menuDownArrow-button",20000);
    return;
};

// Newcontent create operation  
module.exports.CreateNewContent = function(browser, FillcreationprofileName, FillcreationprofileTemplate, object_name_input, DescriptiveName)
{

        browser.click('#menuFileNew');
        browser.waitForVisible("#menuFileNewDocument",30000);
        browser.click('#menuFileNewDocument');
        
        browser.waitForVisible("#creationProfileChooser-input");
        browser.click('#creationProfileChooser-input');

        browser.leftClick('//div[@title="'+FillcreationprofileName+'"]');
        browser.waitForVisible("//div[starts-with(@id,'combo')]");
        browser.leftClick("//div[starts-with(@id,'combo')]");
        browser.click('//div[@title="'+FillcreationprofileTemplate+'"]');

        browser.leftClick('//*[@id="next-button"]');
        browser.waitForVisible("#object_name-input");

        browser.setValue('#object_name-input', object_name_input);
        browser.waitForVisible("#title-input");
        browser.setValue('#title-input', DescriptiveName);
        
        browser.leftClick('//*[@id="next-button"]');
        browser.waitForText('//span[@title="'+DescriptiveName+'"]',40000);


    
    };
    
module.exports.traverseTree = function traverseTree(browser, nodePathArray)
{
    if(nodePathArray && nodePathArray.length > 0)
    {
        browser.waitForExist("span[class='x-tree3-node-text'][title='"+nodePathArray[0]+"']", 20000);
        browser.click("span[class='x-tree3-node-text'][title='"+nodePathArray[0]+"']");
        nodePathArray.shift();
        return traverseTree( browser, nodePathArray);
    }
    return;
};

// Navigation operation  
module.exports.Navigation = function(browser,rootnode,rootpath)
{



browser.waitForVisible('//div[@aria-label="'+rootnode+'" ]//img[contains(@class,"node-joint")]',60000);           
isExist= browser.isExisting('//div[@aria-label="'+rootnode+'" and @aria-expanded="true"]//img[contains(@class,"node-joint")]');         
    
if(isExist==true)         

{      
      

    browser.pause(6000);   
    browser.element('//div[@aria-label="'+rootnode+'"] //Span[contains(text(),"'+ rootnode +'")]').click();  
  
}     
   

        rootpath.split('/').forEach(function(x){
        var arr = x.split('::');
       
        browser.waitForVisible("//div[@aria-label='"+arr[0].trim()+"' and @aria-level='"+arr[1].trim()+"']",100000)
        browser.element("//div[@aria-label='"+arr[0].trim()+"' and @aria-level='"+arr[1].trim()+"']").click();

        browser.pause(4000);
        });
};

// EditProperties operation  
 module.exports.EditProperties = function(browser,ArticleTitle, FriendlyName, DescriptiveName, ContentClassification, UserDescription, WebMDKeywords,LinkTitle,WindowTitle,Publication,Wbmdcpyright,PrimaryTopicID)
{

        browser.leftClick("//span[@title='" + ArticleTitle + "']");

        browser.pause(5000);
        browser.waitForVisible("//span[contains(.,'Properties')]",50000);
        browser.leftClick("//span[contains(.,'Properties')]");
        browser.pause(10000);
        

        browser.element("//button[text()='Edit']");
        browser.moveToObject("//button[text()='Edit']");
        browser.leftClick("//button[text()='Edit']");   
        var chronicleID = browser.getText("#i_chronicle_id");
        console.log(chronicleID);
       
        
        browser.waitForEnabled('#wbmd_c_frnd_nm-input', 30000);
       
        //browser.waitForVisible("#wbmd_c_frnd_nm-input");
        browser.waitForVisible('#wbmd_c_frnd_nm-input',40000);
        browser.setValue('#wbmd_c_frnd_nm-input', FriendlyName);
        
        //browser.waitForVisible("#wbmd_desc_user-input");
        browser.waitForVisible('#wbmd_desc_user-input',40000);
        browser.setValue('#wbmd_desc_user-input', DescriptiveName);
        
        //browser.waitForVisible("#wbmd_keywords-input");
        browser.waitForVisible('#wbmd_bus_ref-input',40000);
        browser.pause(5000);
        browser.setValue('#wbmd_bus_ref-input', ContentClassification);
        
        browser.waitForVisible('#wbmd_desc_user-input',40000);
        browser.setValue('#wbmd_desc_user-input', UserDescription);

        browser.waitForVisible("#wbmd_keywords-input");
        browser.setValue('#wbmd_keywords-input', WebMDKeywords);


        browser.waitForVisible("#wbmd_lk_ttl-input");
        browser.setValue('#wbmd_lk_ttl-input', LinkTitle);

        browser.waitForVisible("#wbmd_wdw_ttl-input");
        browser.setValue('#wbmd_wdw_ttl-input', WindowTitle);

        browser.scroll("//div[@id='wbmd_publ']/img");
        browser.waitForVisible("#wbmd_publ-input",5000);
        browser.leftClick("//div[@id='wbmd_publ']/img");
        browser.pause(5000);
        browser.leftClick("//div[@title='"+Publication+"']");
        
        
        browser.waitForVisible("#wbmd_cpyrt-input",5000);
        browser.leftClick("//div[@id='wbmd_cpyrt']/img");
        browser.pause(5000);
        browser.leftClick("//div[@title='"+Wbmdcpyright+"']");


        browser.scroll("//div[@id='wbmd_c_prim_top_id']/img");
        browser.waitForVisible("#wbmd_c_prim_top_id-input",5000);
        browser.leftClick("//div[@id='wbmd_c_prim_top_id']/img");
        browser.pause(5000);
        browser.leftClick("//div[@title='"+PrimaryTopicID+"']");
        //Original Publish Date
        browser.waitForVisible("#wbmd_orig_pub_dt-input",5000);
        browser.leftClick("//div[@id='wbmd_orig_pub_dt']/img");
        browser.leftClick("//button[contains(.,'Today')]");
        //Save
        browser.leftClick("#save-button");
        browser.pause(5000);
         var chronicleID = {};
             chronicleID = {
	        "chronicleID": chronicleID,
             };
            
            return chronicleID;

} ;




//Checkout Operation
module.exports.CheckoutAndCheckin = function(browser, Articletitle,ChkAction)
{
        
            browser.leftClick("//span[@title='" + Articletitle + "']");
            browser.pause(500);
            browser.leftClick("//span[text()='Content']");
            browser.pause(500);
           // browser.doubleClick("//span[text()='Content']");
            //IFrame switch start
            var frameval = browser.execute(function () {
                //return document.getElementById('ExternalWidget-3').getElementsByTagName('iframe').item(0).id;
                return document.querySelectorAll('div[tag_id="Content-widget"]').item(0).getElementsByTagName('iframe').item(0).id;
            });
            
       
            browser.frame(frameval.value);
            browser.leftClick('//button[contains(string(),"'+ChkAction+'")]');
            browser.pause(7000);
            browser.frameParent();
            browser.pause(7000);
};
    


//lifecycle  Operation

     module.exports.LifeCycle = function(browser, Articletitle,LAction)
{

            browser.rightClick("//span[@title='" + Articletitle + "']");
            browser.waitForVisible("#menuContextDocumentLifeCycle", 5000);
            browser.click("#menuContextDocumentLifeCycle");
            browser.waitForVisible("//a[contains(text(),'"+LAction+"')]", 5000);
            browser.click("//a[contains(text(),'"+LAction+"')]");
            browser.pause(5000);
            browser.waitForVisible("//div[@class='modal-content']//button[contains(text(),'OK')]", 50000);
            browser.click("//div[@class='modal-content']//button[contains(text(),'OK')]");

            if(LAction=="Power Promote")
            {
            browser.waitForVisible("//div[@class='modal-content']//button[contains(text(),'OK')]", 50000);
            browser.click("//div[@class='modal-content']//button[contains(text(),'OK')]");
            }
            browser.pause(7000);
};
    




// Publish Operation
module.exports.Publish = function(browser, Articletitle,publishState)
{
            browser.rightClick("//span[@title='" + Articletitle + "']");
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
    
};


module.exports.GenerateRandomText = function GenerateRandomString() {
    return randomstring.generate(5);
}
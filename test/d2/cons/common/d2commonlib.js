//var smdb = require('./../../common/smdb/siteManagementDb');

module.exports.getUrlAndTitle = function(){
    return {
            url: this.getUrl(),
            title: this.getTitle()};
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
        browser.waitForVisible("#menuFileNewDocument",20000);
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
// Navigation operation  
module.exports.Navigation = function(browser,rootnode,rootpath)
{



browser.waitForVisible('//div[@aria-label="'+rootnode+'" ]//img[contains(@class,"node-joint")]',60000);           
isExist= browser.isExisting('//div[@aria-label="'+rootnode+'" and @aria-expanded="true"]//img[contains(@class,"node-joint")]');         
    
if(isExist==true)         

{      
      

    browser.timeoutsImplicitWait(6000);   
    browser.element('//div[@aria-label="'+rootnode+'"] //Span[contains(text(),"'+ rootnode +'")]').click();  
  
}     
   

        rootpath.split('/').forEach(function(x){
        var arr = x.split('::');
       
        browser.waitForVisible("//div[@aria-label='"+arr[0].trim()+"' and @aria-level='"+arr[1].trim()+"']",100000)
        

        browser.element("//div[@aria-label='"+arr[0].trim()+"' and @aria-level='"+arr[1].trim()+"']").click();

        browser.pause(2000);
        });
};

// EditProperties operation  
 module.exports.EditProperties = function(browser,ArticleTitle, FriendlyName, DescriptiveName, ContentClassification, UserDescription, WebMDKeywords,WindowTitle,Publication,Wbmdcpyright,PrimaryTopicID)
{

        browser.leftClick("//span[@title='" + ArticleTitle + "']");

        browser.pause(5000);
        browser.waitForVisible("//span[contains(.,'Properties')]",5000);
        browser.leftClick("//span[contains(.,'Properties')]");
        browser.pause(4000);
        

        browser.element("//button[text()='Edit']");
        browser.moveToObject("//button[text()='Edit']");
        browser.leftClick("//button[text()='Edit']");   

        
        browser.waitForEnabled('#wbmd_c_frnd_nm-input', 3000);
       
        //browser.waitForVisible("#wbmd_c_frnd_nm-input");
        browser.waitForVisible('#wbmd_c_frnd_nm-input',4000);
        browser.setValue('#wbmd_c_frnd_nm-input', FriendlyName);
        
        //browser.waitForVisible("#wbmd_desc_user-input");
        browser.waitForVisible('#wbmd_desc_user-input',4000);
        browser.setValue('#wbmd_desc_user-input', DescriptiveName);
        
        //browser.waitForVisible("#wbmd_keywords-input");
        browser.waitForVisible('#wbmd_bus_ref-input',4000);
        browser.setValue('#wbmd_bus_ref-input', ContentClassification);
        
        browser.waitForVisible('#wbmd_desc_user-input',4000);
        browser.setValue('#wbmd_desc_user-input', UserDescription);

        browser.waitForVisible("#wbmd_keywords-input");
        browser.setValue('#wbmd_keywords-input', WebMDKeywords);

        browser.waitForVisible("#wbmd_wdw_ttl-input");
        browser.setValue('#wbmd_wdw_ttl-input', WindowTitle);

        browser.waitForVisible("#wbmd_publ-input");
        browser.setValue('#wbmd_publ-input', Publication);
        
        
        browser.waitForVisible("#wbmd_cpyrt-input",5000);
        browser.leftClick("//div[@id='wbmd_cpyrt']/img");
        browser.leftClick("//div[@title='"+Wbmdcpyright+"']");

        browser.waitForVisible("#wbmd_c_prim_top_id-input",5000);
        browser.leftClick("//div[@id='wbmd_c_prim_top_id']/img");
        browser.leftClick("//div[@title='"+PrimaryTopicID+"']");
        //Original Publish Date
        browser.waitForVisible("#wbmd_orig_pub_dt-input",5000);
        browser.leftClick("//div[@id='wbmd_orig_pub_dt']/img");
        browser.leftClick("//button[contains(.,'Today')]");
        //Save
        browser.leftClick("#save-button");
        browser.pause(5000);

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
                return document.getElementById('ExternalWidget-2').getElementsByTagName('iframe').item(0).id;
            });
            
       
            browser.frame(frameval.value);
            browser.leftClick('//button[contains(string(),"'+ChkAction+'")]');
            browser.pause(7000);
            browser.doubleClick("//span[text()='Content']");
            browser.pause(10000);
            browser.frameParent();
            browser.pause(7000);
};
    


//lifecycle  Operation

     module.exports.LifeCycle = function(browser, Articletitle,LAction)
{

            browser.rightClick("//span[@title='" + Articletitle + "']");
            browser.waitForVisible("#menuContextDocumentLifeCycle", 5000);
            browser.leftClick("#menuContextDocumentLifeCycle");
            browser.waitForVisible("//a[contains(text(),'"+LAction+"')]", 5000);
            browser.leftClick("//a[contains(text(),'"+LAction+"')]");
            browser.waitForVisible("//div[@class='modal-content']//button[contains(text(),'OK')]", 50000);
            browser.leftClick("//div[@class='modal-content']//button[contains(text(),'OK')]");

            if(LAction="Power Promote")
            {
            browser.waitForVisible("//div[@class='modal-content']//button[contains(text(),'OK')]", 50000);
            browser.leftClick("//div[@class='modal-content']//button[contains(text(),'OK')]");
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

// Postlife cycle validation 
module.exports.Postlifecyclevalidation = function(browser, Articletitle,LifecycleState)
{
            browser.leftClick("//span[@title='" + Articletitle + "']");
            browser.pause(500);
            browser.leftClick("//span[text()='Content']");
            browser.pause(500);
           //IFrame switch start
            var frameval = browser.execute(function () {
                return document.getElementById('ExternalWidget-2').getElementsByTagName('iframe').item(0).id;
            });
            
       
            browser.frame(frameval.value);
            browser.isExisting(' //center[contains(text(),"'+LifecycleState+'")]');
            browser.pause(7000);
            browser.frameParent();
            browser.pause(7000);     

           
};


// Get Orginal Parent Version  
module.exports.GetVersionvalue = function(browser, Articletitle)
{
          
            browser.leftClick("//span[@title='" + Articletitle + "']");
            browser.pause(500);
            browser.leftClick("//span[text()='Versions']");
            browser.leftClick("//span[text()='Versions']");
            
            

             browser.pause(500);
            
            var Outversionval = browser.execute(function () 
            {
                

               var inversionval=document.evaluate('//td[contains(@class,"cell-first")]//following-sibling::td[contains(@class,"r_version_label")]//span', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
  
  
                return inversionval;
            });
                var splitOutversionval =Outversionval.value;

                  splitOutversionval = splitOutversionval.split(',')[0];
                 
               return splitOutversionval;
            
};


// Get Version Values  
module.exports.GetmajorVersionvalue = function(browser, Articletitle,versiontype)
{
            var result=false;
            var splitOutversionval=browser.GetVersionvalue(browser,Articletitle) ;
                beforemajorversionval = splitOutversionval.split('.')[0]+1;
                beforeminorversionval = splitOutversionval.split('.')[1]+1;
                var afterversion;
                browser.CheckoutAndCheckin(browser,data.inputData.articletitle,'Check-out');
               if(versiontype="Mejor Version")
               {
                 var splitOutversionval=browser.GetVersionvalue(browser,Articletitle) ;
                     afterversion = splitOutversionval.split('.')[0];
               }

               else
               {
                   var splitOutversionval=browser.GetVersionvalue(browser,Articletitle) ;
                     afterversion = splitOutversionval.split('.')[1];

               }

               if(beforemajorversionval=afterversion)
               {
                result=true;
               }
               if(beforeminorversionval=afterversion)
               {
                result=true;
               }
                  return result;
            
};



// Get XML Results   
module.exports.getXmlResults = function(browser, url, options)
{
          
            var parseString = require('xml2js').parseString;
            var request = require('request');
            var Promise = require('bluebird');
            
           

 return new Promise(function (resolve, reject) {
        if (options !== 'undefined') {
            options = {
                method: "GET",
                url: url,
                json: false
            };
        }
        try {
            request.get(url, options, function (err, response, body) {
                if (!err && response.statusCode == 200)
                 {
                    parseString(body, function (err, result) 
                    {
                        if (!err && result !== '') 
                        {
                           resolve(result);
                        } else 
                        {
                            reject(err);
                        }
                    });
                } 
                else
                    reject(err);
            })
        } 
        catch (error) {
            console.log('getXmlResults' + error);
            reject(error);
        }
    });
            
};




            
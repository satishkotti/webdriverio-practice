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

    browser.waitForExist("//div[@id='tab-container-0']//span[text()='Find']/parent::*", maxWaitInMs);
    return browser.isExisting("//div[@id='tab-container-0']//span[text()='Find']/parent::*");
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
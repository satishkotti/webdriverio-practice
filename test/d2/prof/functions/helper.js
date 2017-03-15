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
    //var rootpath="webmd::2/consumer_assets::3/editorial::4/articles::5/other::6"    
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
    browser.leftClick('//div[@title="US / Article Templates"]');
    browser.waitForVisible("//div[starts-with(@id,'combo')]");
    browser.leftClick("//div[starts-with(@id,'combo')]");
    browser.click("//div[@title='"+parms.template+"']");
    browser.leftClick('//*[@id="next-button"]');
    browser.waitForVisible("#title-input",50000);
    browser.setValue('#title-input', parms.objectTitle);
    browser.leftClick('//div[@id="wbmd_bus_ref"]//img');
    browser.leftClick('//div[@title="News"]');
    browser.leftClick('//*[@id="next-button"]');
    browser.element("//span[@title='" + parms.objectTitle + "']").waitForExist(40000); 
};
module.exports.verifyeditproperties = function(browser,parms){
    
    browser.pause(5000);
    browser.element("//span[contains(.,'Properties')]//following-sibling::span[@id='menuDownArrow-button' and not(@aria-haspopup='true')]").waitForExist(50000);  
    browser.leftClick("//span[contains(.,'Properties')]//following-sibling::span[@id='menuDownArrow-button' and not(@aria-haspopup='true')]");
    browser.pause(15000);
    browser.moveToObject("//button[text()='Edit']");
    browser.leftClick("//button[text()='Edit']");
    browser.pause(20000);
    var isExists=false;
    var pt= parms.propertiestext.split(',');
    console.log(pt)
    parms.properties.split(',').forEach(function(x){
    isExists = pt.includes(browser.getText(x));
    if(isExists==false)
    {console.log(x +"Text is not matching");
        return isExists;
    }
    console.log(isExists);
    // parms.propertiestext.split(',').forEach(function(y){
        // if (y==browser.getText(x))
        //     isExists=true;
       });
    //    });

return isExists;
}
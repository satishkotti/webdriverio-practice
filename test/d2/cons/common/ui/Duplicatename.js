var maxWaitTimeInMs = 50000;


var DuplicateNameUIObj = {

      createNewArticle: function(creationProflieName, articleTemplateName, objectName, descriptionName){

        DuplicateNameUIObj.setProfile(creationProflieName, articleTemplateName);
        DuplicateNameUIObj.setObjectName(objectName, descriptionName);
    },

      setProfile: function(profileName, template){
        
        browser.waitForVisible("#creationProfileChooser-input");
        browser.click('#creationProfileChooser-input');
        browser.leftClick('//div[@title="'+profileName+'"]');
        browser.waitForVisible("//div[starts-with(@id,'combo')]");
        browser.leftClick("//div[starts-with(@id,'combo')]");
        browser.click('//div[@title="'+template+'"]');
        browser.click('//*[@id="next-button"]');
    },
    setObjectName: function(objName, descName){
        browser.waitForVisible("#object_name-input");
        browser.setValue('#object_name-input', objName);
        browser.waitForVisible("#title-input");
        browser.setValue('#title-input', descName);
        browser.waitForVisible('//*[@id="next-button"]');
        browser.click('//*[@id="next-button"]');
        
    },

    DuplicateNamevalidation: function(objName){
       objName=objName.trim();
       browser.pause(5000);
       var DuplicateAssetError = browser.isExisting("//div[@id='x3-message-box']//span[contains(., '"+objName+"')]");
       expect(DuplicateAssetError).to.be.true;
        
        browser.click("//button[contains(.,'OK') and @aria-disabled=not('false')]");
        browser.pause(5000);
        browser.waitForVisible('//*[@id="cancel-button"]');
        browser.click('//*[@id="cancel-button"]');
        
    },
   
   

}

module.exports = DuplicateNameUIObj;
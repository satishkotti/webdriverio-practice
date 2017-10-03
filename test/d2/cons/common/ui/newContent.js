var maxWaitTimeInMs = 50000;

var newContentObj = module.exports = {

    createNewArticle: function(creationProflieName, articleTemplateName, objectName, descriptionName){

        newContentObj.setProfile(creationProflieName, articleTemplateName);
        newContentObj.setObjectName(objectName, descriptionName);
    },
    createNewCollection: function(creationProflieName, collectionTemplateName, objectName, descriptionName){ 
          newContentObj.setProfile(creationProflieName, collectionTemplateName);
        newContentObj.setObjectName(objectName, descriptionName);
    },
    createShortTextCollection: function(){ 

    },
    createVideoTextCollection: function(){ 

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
        browser.waitForVisible('//span[@title="'+descName+'"]',maxWaitTimeInMs);
    }
}

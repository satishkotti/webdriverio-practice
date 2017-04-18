var maxWaitTimeInMs = 20000;

var newContentObj = module.exports = {

    createNewArticle: function(creationProflieName, articleTemplateName, objectName, descriptionName){

        newContentObj.setProfile(creationProflieName, articleTemplateName);
        newContentObj.setObjectName(objectName, descriptionName);
    },
    createNewCollection: function(){ 
    },
    createShortTextCollection: function(){ 

    },
    createVideoTextCollection: function(){ 

    },
    setProfile: function(profileName, template){
        
        browser.waitForVisible("#creationProfileChooser-input");
        browser.click('#creationProfileChooser-input');
        browser.leftClick('//div[@title="'+profileName+'"]');
        browser.waitForVisible("//label[contains(text(), 'US Publication Types:')]//following::img", maxWaitTimeInMs)
        browser.leftClick("//label[contains(text(), 'US Publication Types:')]//following::img");
        browser.click('//div[@title="'+template+'"]');
        browser.click('//*[@id="next-button"]');
    },
    setObjectName: function(objName, descName){
        browser.waitForVisible("#title-input");
        browser.setValue('#title-input', objName);
        browser.waitForVisible('//*[@id="next-button"]');
        browser.click('//*[@id="next-button"]');
        browser.waitForVisible('//span[@title="'+objName+'"]',40000);
    }
}

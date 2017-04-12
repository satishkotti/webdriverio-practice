var maxWaitTimeInMs = 20000;

var newContentObj = module.exports = {

    createNewArticle: function(creationProflieName, articleTemplateName, objectName, descriptionName){

        newContentObj.setProfile(creationProflieName, articleTemplateName);
        newContentObj.setObjectName(objectName, descriptionName);
    },
    createNewOutputProfArticle: function(creationProflieName, articleTemplateName, objectName, descriptionName){

        newContentObj.setProfile(creationProflieName, articleTemplateName);
        newContentObj.setOutputProfObjectData(objectName, descriptionName);
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
        browser.waitForVisible("//div[starts-with(@id,'combo')]");
        browser.leftClick("//div[starts-with(@id,'combo')]");
        browser.click('//div[@title="'+template+'"]');
        browser.click('//*[@id="next-button"]');
    },
    setObjectName: function(objName, descName){
        browser.waitForVisible("#title-input");
        browser.setValue('#title-input', objName);
        browser.click('//div[@id="wbmd_bus_ref"]//img');
        browser.waitForVisible('//div[@title="'+descName+'"]',maxWaitTimeInMs);
        browser.click('//div[@title="'+descName+'"]');
        browser.waitForVisible('//*[@id="next-button"]');
        browser.click('//*[@id="next-button"]');
        browser.waitForVisible('//span[@title="'+objName+'"]',40000);
    },
    setOutputProfObjectData: function(objName, descName){
        browser.waitForVisible("#object_name-input");
        browser.setValue('#object_name-input', objName);
        browser.waitForVisible("#title-input");
        browser.setValue('#title-input', objName);
        browser.click('#wbmd_outpt_type-input');
        browser.waitForVisible('//div[@title="'+descName+'"]',maxWaitTimeInMs);
        browser.click('//div[@title="'+descName+'"]');
        browser.waitForVisible('//*[@id="next-button"]');
        browser.click('//*[@id="next-button"]');
        browser.waitForVisible('//span[@title="'+objName+'"]',40000);
    }
}

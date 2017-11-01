var maxWaitTimeInMs = 120000;
var random = require('randomstring');

var newContentObj = module.exports = {

    createNewArticle: function (creationProflieName, articleTemplateName, objectName, descriptionName) {

        newContentObj.setProfile(creationProflieName, articleTemplateName);
        newContentObj.setObjectName(objectName, descriptionName);
    },
    createNewPubSectionArticle: function(creationProflieName, articleTemplateName, objectName, descriptionName){

        newContentObj.setProfilePubSection(creationProflieName, articleTemplateName);
        newContentObj.setObjectNamePubSection(objectName, descriptionName);
    },
    createNewArticle1: function (cabinet, props) {

        switch (cabinet) {
            case 'US':
                var articleName = props.ArticleObjectName + random.generate(2);
                newContentObj.setProfile(props.ProfileName, props.ArticleTemplate);
                newContentObj.setObjectName(articleName, props.ContentType);
                return articleName;
                break;

            case 'DE':
                var articleName = props.ArticleObjectName + random.generate(2);
                newContentObj.setProfile(props.ProfileName_de, props.ArticleTemplate);
                newContentObj.setObjectName(articleName, props.ContentType);
                return articleName;
                break;
             case 'FR':
                var articleName = props.ArticleObjectName + random.generate(2);
                newContentObj.setProfile(props.ProfileName_fr, props.ArticleTemplate);
                newContentObj.setObjectName(articleName, props.ContentType);
                return articleName;
                break;
            case 'PT':
                var articleName = props.ArticleObjectName + random.generate(2);
                newContentObj.setProfile(props.ProfileName_pt, props.ArticleTemplate);
                newContentObj.setObjectName(articleName, props.ContentType);
                return articleName;
                break;
            case 'SP':
                var articleName = props.ArticleObjectName + random.generate(2);
                newContentObj.setProfile(props.ProfileName_sp, props.ArticleTemplate);
                newContentObj.setObjectName(articleName, props.ContentType_SP);
                return articleName;
                break;
        }

        newContentObj.setProfile(props.creationProflieName, articleTemplateName);
        newContentObj.setObjectName(objectName, descriptionName);
    },
    createNewOutputProfArticle: function (creationProflieName, articleTemplateName, objectName, descriptionName) {

        newContentObj.setProfile(creationProflieName, articleTemplateName);
        newContentObj.setOutputProfObjectData(objectName, descriptionName);
    },
    createNewCollection: function () {
    },
    createShortTextCollection: function () {

    },
    createVideoTextCollection: function () {

    },
    createPointerObject: function (creationProflieName, pointerTemplateName, objectName, objectTitle) {
        newContentObj.setProfile(creationProflieName, pointerTemplateName);
        newContentObj.setPointerObjectName(objectName, objectTitle);
    },
    createMediaObject: function (creationProflieName, mediaTemplateName, objectName, objectTitle) {
        newContentObj.setProfile(creationProflieName, mediaTemplateName);
        newContentObj.setMediaObjectName(objectName, objectTitle);
    },
    setProfile: function (profileName, template) {

        browser.waitForVisible("#creationProfileChooser-input");
        browser.click('#creationProfileChooser-input');
        browser.leftClick('//div[@title="' + profileName + '"]');
        browser.waitForVisible("//div[starts-with(@id,'combo')]");
        browser.leftClick("//div[starts-with(@id,'combo')]");
        browser.click('//div[@title="' + template + '"]');
        browser.click('//*[@id="next-button"]');
    },
    setObjectName: function (objName, descName) {
        browser.waitForVisible("#title-input");
        browser.setValue('#title-input', objName);
        browser.click('//div[@id="wbmd_bus_ref"]//img');
        browser.waitForVisible('//div[@title="' + descName + '"]', maxWaitTimeInMs);
        browser.click('//div[@title="' + descName + '"]');
        browser.waitForVisible('//*[@id="next-button"]');
        browser.click('//*[@id="next-button"]');
        browser.waitForVisible('//span[@title="'+objName+'"]',maxWaitTimeInMs);
    },
    setPointerObjectName: function(objName, objTitle){
        browser.waitForVisible("#object_name-input")
        browser.setValue('#object_name-input',objName)
        browser.waitForVisible("#title-input");
        browser.setValue('#title-input', objTitle);
        browser.waitForVisible('//*[@id="next-button"]');
        browser.click('//*[@id="next-button"]');
        browser.waitForVisible('//span[@title="' + objName + '"]', maxWaitTimeInMs);
    },
    setMediaObjectName: function (objName, objTitle) {
        browser.waitForVisible("#object_name-input")
        browser.setValue('#object_name-input', objName)
        browser.waitForVisible("#title-input");
        browser.setValue('#title-input', objTitle);
        browser.waitForVisible('//*[@id="next-button"]');
        browser.click('//*[@id="next-button"]');
        browser.waitForVisible('//span[@title="' + objTitle + '"]', maxWaitTimeInMs);
    },
    setOutputProfObjectData: function (objName, descName) {
        browser.waitForVisible("#object_name-input");
        browser.setValue('#object_name-input', objName);
        browser.waitForVisible("#title-input");
        browser.setValue('#title-input', objName);
        browser.click('#wbmd_outpt_type-input');
        browser.waitForVisible('//div[@title="' + descName + '"]', maxWaitTimeInMs);
        browser.click('//div[@title="' + descName + '"]');
        browser.waitForVisible('//*[@id="next-button"]');
        browser.click('//*[@id="next-button"]');
        browser.waitForVisible('//span[@title="'+objName+'"]',maxWaitTimeInMs);
    },
    setPointerObjectName: function (objName, objTitle) {
        browser.waitForVisible("#object_name-input");
        browser.setValue('#object_name-input', objName);
        browser.waitForVisible("#title-input");
        browser.setValue('#title-input', objTitle);
        browser.waitForVisible('//*[@id="next-button"]');
        browser.click('//*[@id="next-button"]');
        browser.waitForVisible('//span[@title="' + objTitle + '"]', maxWaitTimeInMs);
    },

    setProfilePubSection: function(profileName, template){
        
        browser.waitForVisible("#creationProfileChooser-input");
        browser.click('#creationProfileChooser-input');
        browser.leftClick('//div[@title="'+profileName+'"]');
        browser.waitForVisible("//div[starts-with(@id,'combo')]");
        browser.leftClick("//div[starts-with(@id,'combo')]");
        browser.click('//div[@title="'+template+'"]');
        browser.click('//*[@id="next-button"]');
    },
    setObjectNamePubSection: function(objName, descName){
        browser.waitForVisible("#title-input");
        browser.setValue('#title-input', objName);
        browser.waitForVisible('//*[@id="next-button"]');
        browser.click('//*[@id="next-button"]');
        browser.waitForVisible('//span[@title="'+objName+'"]',40000);
    },
        setPublicationSubsectionTitle: function(objName){
        browser.waitForVisible("#title-input");
        browser.setValue('#title-input', objName);
        browser.waitForVisible('//*[@id="next-button"]');
        browser.click('//*[@id="next-button"]');
        browser.waitForVisible('//span[@title="'+objName+'"]',maxWaitTimeInMs);
    },

    createPublicationSubsection: function(creationProflieName, articleTemplateName, objectName){

        newContentObj.setProfile(creationProflieName, articleTemplateName);
        newContentObj.setPublicationSubsectionTitle(objectName);
    },
    createProfPublication: function(creationProflieName, publicationType, objectTitle,publicationName){ 
        newContentObj.setProfile(creationProflieName, publicationType);
        newContentObj.setProfPublicationName(objectTitle, publicationName);
    },
    setProfPublicationName: function(objectTitle, publicationName){        
        browser.waitForVisible("#title-input");
        browser.setValue('#title-input', objectTitle);
        browser.waitForVisible("#wbmd_publ_name-input")
        browser.setValue('#wbmd_publ_name-input',publicationName)
        browser.waitForVisible('//*[@id="next-button"]');
        browser.click('//*[@id="next-button"]');
        browser.waitForVisible('//span[@title="'+objectTitle+'"]',maxWaitTimeInMs);
    },

}


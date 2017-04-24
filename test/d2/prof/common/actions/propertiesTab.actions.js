var propertiesTabUI = require('./../ui/propertiesTab');
var pubSubSecPropertiestabUI = require('./../ui/PubSubSec');
var maxWaitTimeInMs = 30000;
module.exports = {
    
    getChronicleIdAndName: function(){
            propertiesTabUI.propertiesTabSelect();
        return {
            chronicleId: propertiesTabUI.chronicleIdGet(),
            objectName: propertiesTabUI.objectNameGet(),
            title:propertiesTabUI.titileGet()
        };
    },
    getObjectNameBasicTab: function(){
        propertiesTabUI.propertiesBasicTabSelect();
        return {
            chronicleId: propertiesTabUI.chronicleIdGet(),
            objectName: propertiesTabUI.objectNameGet(),
            title:propertiesTabUI.titileGet()
        };
    },
    getObjectNameMediaTab: function(){
        propertiesTabUI.ProfMediaPropertiesTabSelect();
        return {
            chronicleId: propertiesTabUI.chronicleIdGet(),
            objectName: propertiesTabUI.objectNameGet(),
            title:propertiesTabUI.titileGet()
        };
    },
    getObjectOutputTypeTab: function(){
        propertiesTabUI.propertiesOutputTypeTabSelect();
        return {    
            objectName: propertiesTabUI.objectNameGet(),
            title:propertiesTabUI.titileGet(),
            outputType: propertiesTabUI.outputTypeGet()
        };
    },
    getProfOutputPublishingTab: function(){
        propertiesTabUI.getProfOutputPublishingTab();
        return {    
            sysPublishingDate: propertiesTabUI.sysPublishingDateGet(),
            expirationDate:propertiesTabUI.expirationDateGet()
        };
    },
    getProfOutputOtherTab: function(){
        propertiesTabUI.getProfOutputOtherTab();
        return {    
            versionLabel: propertiesTabUI.versionLabelGet(),
            objectType:propertiesTabUI.objectTypeGet()
        };
    },
    setRequiredProperties: function(shortTitle,subTitle,superTitle,leadSpecialty,contentDeveloper){
        
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        propertiesTabUI.shortTitleSet(shortTitle);
        propertiesTabUI.subTitleSet(subTitle);
        propertiesTabUI.superTitleSet(superTitle);
        propertiesTabUI.leadSpecialtySet(leadSpecialty);
        propertiesTabUI.contentDeveloperSet(contentDeveloper);
        propertiesTabUI.articleTabSelect();
        propertiesTabUI.articleTOCDisplayFormatSet("");
        propertiesTabUI.save();
    },
     verifyNewsProperties:function(labelPropertiesArray){
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        var result=propertiesTabUI.verifyProperties(labelPropertiesArray);
        return result;
     },
     getPropertiesValues:function(){
        return propertiesTabUI.articleTOCDisplayFormatGet() ;
     },
     verifyBasciInfoTabProperties:function(labelPropertiesArray){
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        var basicresult=propertiesTabUI.verifyBasicInfoProperties(labelPropertiesArray);
        return basicresult;
     },
     verifyArticleTabProperties:function(labelPropertiesArray){
         propertiesTabUI.articleTabSelect();
         var articleresult=propertiesTabUI.verifyArticleTabProperties(labelPropertiesArray);
         return articleresult;
     },
     verifyMandatoryFieldsforProperties:function(){
         propertiesTabUI.propertiesTabSelect();
         propertiesTabUI.edit();
         propertiesTabUI.save();
         var AlertMessage = propertiesTabUI.verifyMandatoryFieldsforProperties();
         propertiesTabUI.cancelEdit();
         return AlertMessage;
     },
     setRequiredPropertiesforPublish: function(systempubdate,expdate){
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        browser.pause(2000);
        propertiesTabUI.publishingTabSelect();
        browser.waitForVisible("#wbmd_eff_date-input",maxWaitTimeInMs);
        propertiesTabUI.systemPublishingDateSet(systempubdate);
        browser.click("//label[text()='Expire On']");
        propertiesTabUI.expirationDateSet(expdate);
        propertiesTabUI.save();
    },
    setRequiredPropertiesforExpire: function(expdate){
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        browser.pause(2000);
        propertiesTabUI.publishingTabSelect();

        browser.waitForVisible("#wbmd_exp_date-input",maxWaitTimeInMs);
        browser.click("//label[text()='Expire On']");
        propertiesTabUI.expirationDateSet(expdate);
        propertiesTabUI.save();
    },
    setPubsubsectionProperties: function(shortTitle,subTitle,superTitle,leadSpecialty,contentDeveloper){
        
        propertiesTabUI.publishingSubsectionTabSelect();
        propertiesTabUI.edit();
       propertiesTabUI.titleSet(subTitle);
        propertiesTabUI.save();
    },
    SetPubsubsectionALLProperties: function(AssetTitle){
         browser.pause(1000);
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
       propertiesTabUI.titleSet(AssetTitle);
       propertiesTabUI.description(AssetTitle);
       propertiesTabUI.indexPageAdOverrid(AssetTitle);
       propertiesTabUI.articlesPubURL(AssetTitle);
        propertiesTabUI.save();
    },
    
}
var propertiesTabUI = require('./../ui/propertiesTab');

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
     }
}
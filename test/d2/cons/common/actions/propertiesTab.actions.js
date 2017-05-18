var propertiesTabUI = require('./../ui/propertiesTab');

module.exports = {
    
    getChronicleIdAndName: function(){
        propertiesTabUI.propertiesTabSelect();
        return {
            chronicleId: propertiesTabUI.chronicleIdGet(),
            objectName: propertiesTabUI.objectNameGet()
        };
    },
    setRequiredProperties: function(friendlyName, busRef, userDescr, keywords, lnkTtl, windowTtl, publication,
    copyright, primaryTopicId){
        
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();

        propertiesTabUI.friendlyNameSet(friendlyName);
        propertiesTabUI.busRefNameSet(busRef);
        propertiesTabUI.userDescriptionNameSet(userDescr);
        propertiesTabUI.keywordsNameSet(keywords);
        propertiesTabUI.linkTitleSet(lnkTtl);
        propertiesTabUI.windowTitleSet(windowTtl);
        propertiesTabUI.publicationSet(publication);
        propertiesTabUI.copyrightSet(copyright);
        propertiesTabUI.primaryTopicIdSet(primaryTopicId);
        propertiesTabUI.originalPublishDateSet();
        
        propertiesTabUI.save();


//Add: assert set properties

    },
    DateTimeValidation: function(friendlyName, busRef, userDescr, keywords, lnkTtl, windowTtl, publication,
    copyright, primaryTopicId,dateTimeStamp){
        
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        propertiesTabUI.friendlyNameSet(friendlyName);
        propertiesTabUI.busRefNameSet(busRef);
        propertiesTabUI.userDescriptionNameSet(userDescr);
        propertiesTabUI.keywordsNameSet(keywords);
        propertiesTabUI.linkTitleSet(lnkTtl);
        propertiesTabUI.windowTitleSet(windowTtl);
        propertiesTabUI.publicationSet(publication);
        propertiesTabUI.copyrightSet(copyright);
        propertiesTabUI.primaryTopicIdSet(primaryTopicId);
        propertiesTabUI.overrideSiteArchiveDateTimeset(dateTimeStamp);
        propertiesTabUI.originalPublishDateTimeset(dateTimeStamp);
        propertiesTabUI.authRevtab();
        propertiesTabUI.primaryMedicalReviewDateTimeset(dateTimeStamp);
        propertiesTabUI.secondaryMedicalReviewDateTimeset(dateTimeStamp);
        propertiesTabUI.editorReviewDateTimeset(dateTimeStamp);
        propertiesTabUI.copyEditorReviewDateTimeset(dateTimeStamp);
        propertiesTabUI.sponsorMLRtab(dateTimeStamp);
        propertiesTabUI.sponsorMLRDateTimeset(dateTimeStamp);
        propertiesTabUI.sponsorInternalMLRDateTimeset(dateTimeStamp);
        propertiesTabUI.publishingtab();
        propertiesTabUI.effectiveDateTimeset(dateTimeStamp);
        propertiesTabUI.expirationDateTimeset(dateTimeStamp);
        propertiesTabUI.save();


//Add: assert set properties

    },
    PublishDateTimeValidation: function(friendlyName, busRef, userDescr, keywords, lnkTtl, windowTtl, publication,
    copyright, primaryTopicId,dateTimeStamp){
        
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        propertiesTabUI.friendlyNameSet(friendlyName);
        propertiesTabUI.busRefNameSet(busRef);
        propertiesTabUI.userDescriptionNameSet(userDescr);
        propertiesTabUI.keywordsNameSet(keywords);
        propertiesTabUI.linkTitleSet(lnkTtl);
        propertiesTabUI.windowTitleSet(windowTtl);
        propertiesTabUI.publicationSet(publication);
        propertiesTabUI.copyrightSet(copyright);
        propertiesTabUI.primaryTopicIdSet(primaryTopicId);
        propertiesTabUI.publishingtab();
        propertiesTabUI.effectiveDateTimeset(dateTimeStamp)
        propertiesTabUI.save();


//Add: assert set properties

    }
}
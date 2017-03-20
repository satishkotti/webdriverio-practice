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
        
        propertiesTabUI.save();


//Add: assert set properties

    }
}
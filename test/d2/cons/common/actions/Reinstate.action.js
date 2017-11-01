var maxWaitTimeInMs = 50000;
var ReinstateTabUI = require('./../ui/ReinstateTab');
var propertiesTabUI = require('./../ui/propertiesTab');

var ReinstateTabUIObj = {

 
     selectReinstate:  function(assetName, assetVersion){
        ReinstateTabUI.selectReinstate(assetName, assetVersion);
    },

    setRequiredProperties: function(friendlyName, Collectiontype, userDescr, keywords, lnkTtl, windowTtl, primaryTopicId){
        
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        propertiesTabUI.friendlyNameSet(friendlyName);
        propertiesTabUI.CollectionTypeSet(Collectiontype);
        propertiesTabUI.userDescriptionNameSet(userDescr);
        propertiesTabUI.keywordsNameSet(keywords);
        propertiesTabUI.linkTitleSet(lnkTtl);
        propertiesTabUI.windowTitleSet(windowTtl);
        propertiesTabUI.primaryTopicIdSet(primaryTopicId);
        propertiesTabUI.originalPublishDateSet();
        
        propertiesTabUI.save();


//Add: assert set properties

    },


}

module.exports = ReinstateTabUIObj;
var auditTabUI = require('./../ui/auditTab');
var documentListTab = require('./../../common/actions/documentListTab.actions');
var contentTab = require('./../../common/actions/contentTab.actions');

module.exports = {

        auditWidget: function () {
            auditTabUI.auditWidget();
    },
    categories: function(){
        auditTabUI.categories();
    },
    creationEvent: function(){
        auditTabUI.creationEvent();
    },
    mandatoryFieldsEvent: function(ver){
        auditTabUI.mandatoryFieldsEvent();
        auditTabUI.saveEvent(ver);
    },
    checkoutEvent: function(){
        contentTab.AssetcheckOut();
        auditTabUI.checkoutEvent();
    },
    checkinEvent: function(ver){
        contentTab.Assetcheckin();
        auditTabUI.checkinEvent();
         auditTabUI.saveEvent(ver);
    },
    promoteEvent: function(AssetTitle,ver){
         documentListTab.promoteAsset(AssetTitle);
        auditTabUI.promoteEvent();
        auditTabUI.saveEvent(ver);
    },
    demoteEvent: function(AssetTitle,ver){
         documentListTab.demoteAsset(AssetTitle);
        auditTabUI.demoteEvent();
        auditTabUI.saveEvent(ver);
    },
    powerpromoteEvent: function(AssetTitle,ver){
        documentListTab.powerPromoteAsset(AssetTitle);
        auditTabUI.promoteEvent();
        auditTabUI.saveEvent(ver);
    },
    expireEvent: function(AssetTitle,ver){
        documentListTab.expireAsset(AssetTitle);
        auditTabUI.expireEvent();
        auditTabUI.saveEvent(ver);
    },
    existingAsset: function(AssetTitle){
        documentListTab.selectAsset(AssetTitle);
        contentTab.AssetcheckOut();
        auditTabUI.checkoutEvent();
        contentTab.Assetcheckin();
        auditTabUI.checkinEvent();
        auditTabUI.save();
        documentListTab.promoteAsset(AssetTitle);
        auditTabUI.promoteEvent();
        auditTabUI.save();
        documentListTab.demoteAsset(AssetTitle);
        auditTabUI.demoteEvent();
        auditTabUI.save();
        documentListTab.powerPromoteAsset(AssetTitle);
        auditTabUI.powerpromoteEvent();
        auditTabUI.save();
        documentListTab.expireAsset(AssetTitle);
        auditTabUI.expireEvent();
        auditTabUI.save();
    }


    
}
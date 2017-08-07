var auditTabUI = require('./../ui/auditTab');

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
        auditTabUI.checkoutEvent();
    },
    checkinEvent: function(ver){
        auditTabUI.checkinEvent();
         auditTabUI.saveEvent(ver);
    },
    promoteEvent: function(ver){
        auditTabUI.promoteEvent();
        auditTabUI.saveEvent(ver);
    },
    demoteEvent: function(ver){
        auditTabUI.demoteEvent();
        auditTabUI.saveEvent(ver);
    },
    powerpromoteEvent: function(ver){
        auditTabUI.promoteEvent();
        auditTabUI.saveEvent(ver);
    },
    expireEvent: function(ver){
        auditTabUI.expireEvent(ver);
    }


    
}
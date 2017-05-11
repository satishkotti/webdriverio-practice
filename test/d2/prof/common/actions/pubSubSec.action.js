var pubSubSecUI = require('./../ui/PubSubSec');
var contentTabUI = require('./../ui/contentTab');
var propertiesTabUI = require('./../ui/propertiesTab');
var documentListUI = require('./../ui/documentListTab');


module.exports = {
  
    propertiesFieldsValidation: function(){
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.otherTabSelect();
        propertiesTabUI.propertiesOtherTabElements();
    },

    verifyPubSubSecProperties:function(){
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        pubSubSecUI.clearProperties();
        propertiesTabUI.save();
        var validationmessage = pubSubSecUI.validationmandatoryfields();
        expect(validationmessage).to.be.true;
        propertiesTabUI.cancelEdit();
     },
      verifyPubSubSecRelation: function(){
        documentListUI.selectRelationTab();
         pubSubSecUI.pubSubSecRelation();
     },

}
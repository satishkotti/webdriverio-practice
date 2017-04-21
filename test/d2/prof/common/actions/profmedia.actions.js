var propertiesTabUI = require('./../ui/propertiesTab');
var maxWaitTimeInMs = 30000;
module.exports = {

     verifyProfMediaMandatoryFields:function(){
         propertiesTabUI.ProfMediaPropertiesTabSelect();
         propertiesTabUI.edit();
         propertiesTabUI.save();
         var AlertMessage = propertiesTabUI.verifyProfMediaMandatoryFields();
         propertiesTabUI.cancelEdit();
         return AlertMessage;
     },
}


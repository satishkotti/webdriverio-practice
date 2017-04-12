var pointerUI = require('./../ui/pointer');
var contentTabUI = require('./../ui/contentTab');

module.exports = {
    contentFieldsPointer: function(objectName){
        contentTabUI.selectContenTab();
        contentTabUI.switchToExternalWidget4Frame();
        pointerUI.pointerContentProperties(objectName);
        
    },
    contentHeaderValidationPointer: function(){
        contentTabUI.selectContenTab();
        contentTabUI.switchToExternalWidget4Frame();
        pointerUI.pointerContentHeaderValidation();

    }


}
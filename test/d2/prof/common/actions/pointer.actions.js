var pointerUI = require('./../ui/pointer');
var contentTabUI = require('./../ui/contentTab');
var propertiesTabUI = require('./../ui/propertiesTab');

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
    },
    propertiesFieldsValidation: function(){
        browser.frameParent();
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.otherTabSelect();
        propertiesTabUI.propertiesOtherTabElements();
    }


}
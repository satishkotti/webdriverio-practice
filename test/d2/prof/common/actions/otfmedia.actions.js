var otfmediaUI = require('./../ui/otfmedia');
var contentTabUI = require('./../ui/contentTab');
var propertiesTabUI = require('./../ui/propertiesTab');

module.exports = {
    mediaProperties: function(){
        propertiesTabUI.propertiesTabSelect();
        otfmediaUI.mediaProperties();
        propertiesTabUI.otherTabSelect();
        otfmediaUI.propertiesOtherTabElements();
    },

    otfOutputversionDefaultValidation: function(){
        otfmediaUI.otfOutputversionDefaultValidation();
    }


}
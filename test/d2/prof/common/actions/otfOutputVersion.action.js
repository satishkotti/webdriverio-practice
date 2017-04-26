var otfmediaUI = require('./../ui/otfOutputVersion');
var contentTabUI = require('./../ui/contentTab');
var propertiesTabUI = require('./../ui/propertiesTab');

module.exports = {
    OutputVersionProperties: function(){
        propertiesTabUI.propertiesTabSelect();
        otfmediaUI.OutputVersionProperties();
        propertiesTabUI.otherTabSelect();
        otfmediaUI.propertiesOtherTabElements();
    },

    otfOutputversionDefaultValidation: function(){
        otfmediaUI.otfOutputversionDefaultValidation();
    }


}
var otfOutputVersionUI = require('./../ui/otfOutputVersion');
var contentTabUI = require('./../ui/contentTab');
var propertiesTabUI = require('./../ui/propertiesTab');

module.exports = {
    OutputVersionProperties: function(){
        propertiesTabUI.propertiesTabSelect();
        otfOutputVersionUI.OutputVersionProperties();
        propertiesTabUI.otherTabSelect();
        otfOutputVersionUI.propertiesOtherTabElements();
    },
    FillOutputVersionProperties: function(){
        contentTabUI.selectContenTab();
        contentTabUI.switchToExternalWidget4Frame();
        contentTabUI.checkOut();
        contentTabUI.switchToExternalWidget4Frame();
        contentTabUI.checkIn();
        browser.pause(5000);
        browser.frameParent();
        propertiesTabUI.propertiesTabSelect();
        browser.pause(5000);
        propertiesTabUI.edit();
        browser.pause(1000);
        propertiesTabUI.save();
        browser.pause(3000);
    },

    otfOutputversionDefaultValidation: function(){
        otfOutputVersionUI.otfOutputversionDefaultValidation();
    }


}
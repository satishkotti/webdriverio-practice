var otfTabUI = require('./../ui/otfTab');

module.exports = {
    selectOTFTab: function(shortTitle,subTitle,superTitle,leadSpecialty,contentDeveloper){
        otfTabUI.otfTabSelect();
    },
    verfiyElementExists: function(selectorVal){
        return browser.isExisting(selectorVal);
    }
}
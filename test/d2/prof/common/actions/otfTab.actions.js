var otfTabUI = require('./../ui/otfTab');
var contentTabUI = require('./../ui/contentTab');

module.exports = {
    selectOTFTab: function(shortTitle,subTitle,superTitle,leadSpecialty,contentDeveloper){
        otfTabUI.otfTabSelect();
    },
    selectExternalWidget: function(data) {
        contentTabUI.switchToExternalWidget3Frame();
    },
    verfiyIfElementExists: function(selectorVal) {
        var isExisting =  browser.isExisting(selectorVal);
        return isExisting;
    },
    verifyOTFHeader: function() {
        otfTabUI.verifyOTFHeader();
    },
    verifyOTFValues: function(objName, newsObjectname){
        otfTabUI.verifyOTFValues(objName, newsObjectname);
    },
    verifyOTFOutputVersionValues: function(){
        otfTabUI.verifyOTFOutputVersionValues();
    },
    verifyCreateOutputVersion: function(newsObjectname) {
        otfTabUI.verifyCreateOutputVersion(newsObjectname);
    }
}
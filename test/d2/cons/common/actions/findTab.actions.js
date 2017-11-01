var findTabUI = require('./../ui/findTab');

module.exports = {
    verifyFindWidgetExistsInLeftContainer: function() {
        var widgetExists = findTabUI.isFindWidgetInLeftContainerExists();
        expect(widgetExists).to.true;
    },
     findByChronicleId: function(chronicleId){
        findTabUI.switchToExternalWidget0Frame();
        findTabUI.findByChronicleId(chronicleId);
        browser.frameParent();
        findTabUI.verifyFindByIdResult(chronicleId);
    },
    findByText: function(){
        findTabUI.switchToExternalWidget0Frame();
        findTabUI.findByText();
        browser.frameParent();
        findTabUI.verifyNoMatchingMessage();
    },
      searchTextDeleteValidation: function(AssetName){
        findTabUI.switchToExternalWidget0Frame();
        findTabUI.Searchtext(AssetName);
        browser.frameParent();
        findTabUI.DeleteValidation();
    },
    findbyId: function(chronicleId){
        
        findTabUI.switchToExternalWidget0Frame();
        findTabUI.findByChronicleId(chronicleId);
        browser.frameParent();
    },

}
var findTabUI = require('./../ui/findTab');

module.exports = {
    verifyFindWidgetExistsInLeftContainer: function() {
        var widgetExists = findTabUI.isFindWidgetInLeftContainerExists();
        expect(widgetExists).to.true;
    },
    searchTextDeleteValidation: function(AssetName){
        findTabUI.switchToExternalWidget0Frame();
        findTabUI.Searchtext(AssetName);
        browser.frameParent();
        findTabUI.pointerDeleteValidation();
    },
     searchText: function(AssetName){
        findTabUI.switchToExternalWidget0Frame();
        findTabUI.Searchtext(AssetName);
        browser.frameParent();
        browser.pause(5000);

    }
}
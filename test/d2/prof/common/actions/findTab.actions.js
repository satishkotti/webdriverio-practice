var findTabUI = require('./../ui/findTab');

module.exports = {
    verifyFindWidgetExistsInLeftContainer: function() {
        var widgetExists = findTabUI.isFindWidgetInLeftContainerExists();
        expect(widgetExists).to.true;
    }
}
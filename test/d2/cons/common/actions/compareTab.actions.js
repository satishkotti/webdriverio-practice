var compareTabUI = require('./../ui/compareTab');
var versionTabUI = require('../actions/versionTab.action');

var compareTabObj = {

    compareVersions: function (assetName, assetVersion1, assetVersion2, asset1Withversion, asset2Withversion, attributeSummary, contentSummary, renditionSummary) {
        compareTabUI.selectCompareWidget();
        versionTabUI.selectversions(assetName, assetVersion1, assetVersion2);
        compareTabUI.switchToExternalWidgetFrame();
        compareTabUI.versionOnCompareWidgetValidation(asset1Withversion, asset2Withversion);
        compareTabUI.compareSummaryOnCompareWidget(attributeSummary, contentSummary, renditionSummary);
    }
}
module.exports = compareTabObj;
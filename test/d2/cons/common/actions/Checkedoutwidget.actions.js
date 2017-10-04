var CheckedoutWidgetTabUI = require('./../ui/CheckedoutWidgetTab');


var CheckedoutWidgetTabUIObj = {

    CheckedoutWidget: function () {
        CheckedoutWidgetTabUI.CheckedoutWidget();
    },
    verifyCheckedAsset:function (AssetTitle) {
        CheckedoutWidgetTabUI.verifyCheckedAsset(AssetTitle);
    },
    verifyChkoutWidgt:function () {
        CheckedoutWidgetTabUI.verifyChkoutWidgt();
    }

}


module.exports = CheckedoutWidgetTabUIObj;
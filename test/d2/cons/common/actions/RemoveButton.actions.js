var relationTabUI = require('./../ui/RemovecloseTab');
var contentTabUI = require('./../ui/contentTab');

module.exports = {

    VerifyRemoveclose: function () {
        contentTabUI.selectContenTab();
        contentTabUI.switchToExternalWidgetFrame();
        relationTabUI.removeclosebutton();
    }
}
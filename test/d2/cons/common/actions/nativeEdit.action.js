var nativeEdit = require('./../ui/nativeEdit');
var contentTab = require('../actions/contentTab.actions');
var contentTabUI = require('./../ui/contentTab');

var nativeEditObj = {

    nativeEditXML: function () {
        contentTab.checkOut();
        contentTab.Titleinputsetvalue("QATest");
        browser.frameParent();
        contentTab.sectionTextSetValue("QA");
        browser.frameParent();
        contentTabUI.switchToExternalWidgetFrame();
        nativeEdit.nativebutton();
        browser.frameParent();
    },

    titleupdate: function () {
        nativeEdit.switchToExternalWidgetFrame();
        nativeEdit.titleupdate();
    },
    copysection: function () {
        nativeEdit.copysection();
        browser.frameParent();
    },
    applybutton: function () {
        nativeEdit.applyButton();
    },
    cancelbutton: function () {
        nativeEdit.cancelButton();
    },
    validation: function () {
        contentTab.checkIn();
        nativeEdit.validation();
        contentTab.checkOut();
        contentTabUI.switchToExternalWidgetFrame();
        nativeEdit.nativebutton();
        browser.frameParent()
        nativeEdit.switchToExternalWidgetFrame();
        nativeEdit.closetagbreak();
        browser.frameParent();
        nativeEdit.applyButton();
        nativeEdit.alertOk();
        nativeEdit.cancelButton();
        contentTab.checkIn();
    }

}
module.exports = nativeEditObj;
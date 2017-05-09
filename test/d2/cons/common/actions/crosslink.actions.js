var bottomwidgets = require('./bottomwidgets.actions');
var crosslink = require('./../ui/crosslink');

module.exports = {

    crosslinkArticle: function () {

        //Switch to Crosslink tab
        bottomwidgets.SwitchTo('Crosslink');
        var iFrameId = crosslink.crosslinker_bottom_iframe().getAttribute('id');
        browser.frame(iFrameId);

        //Click on Open Crosslinker button
        crosslink.openCrosslinker().click();
        browser.pause(5000);
        tabs = browser.getTabIds();
        if (tabs[1] != browser.getCurrentTabId()) {
            browser.switchTab(tabs[1]);
        }

        //Wait until cross linker page is displayed
        crosslink.crosslinkerSummary().waitForVisible();

    },
    saveCrosslink = function (expectedStatus) {
        switch (expectedStatus) {
            default:
                crosslink.saveCrosslink().click();
                crosslink.successMessage();
                crosslink.close().click();
                browser.switchTab();
                break;
        }
    }
}
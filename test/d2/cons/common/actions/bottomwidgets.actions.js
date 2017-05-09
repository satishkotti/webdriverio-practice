var bwidgets = require('./../ui/bottomwidgets');

module.exports = {
    SwitchTo: function(widget){
        bwidgets.switchToWidget(widget).click();
        browser.waitForExist("//li[contains(@class, 'tab-strip-active') and contains(.,'" + widget + "')]");
    }
}
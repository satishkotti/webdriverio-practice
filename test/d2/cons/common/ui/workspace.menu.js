var maxWaitTimeInMs = 50000;

var NewMenuOptionSelector = '#menuFileNew';
var ContentMenuOptionSelector = '#menuFileNewDocument';

module.exports = {

    selectNewContent: function(nodeName){
        browser.waitForVisible(NewMenuOptionSelector,maxWaitTimeInMs);
        browser.click(NewMenuOptionSelector);
        browser.waitForVisible(ContentMenuOptionSelector, maxWaitTimeInMs);
        browser.click(ContentMenuOptionSelector);
    }
}

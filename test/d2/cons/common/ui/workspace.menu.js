var maxWaitTimeInMs = 20000;

var NewMenuOptionSelector = '#menuFileNew';
var ContentMenuOptionSelector = '#menuFileNewDocument';

module.exports = {

    selectNewContent: function(nodeName){
        
        browser.click(NewMenuOptionSelector);
        browser.waitForVisible(ContentMenuOptionSelector, maxWaitTimeInMs);
        browser.click(ContentMenuOptionSelector);
    }
}

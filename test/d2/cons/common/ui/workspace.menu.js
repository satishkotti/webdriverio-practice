var maxWaitTimeInMs = 50000;

var NewMenuOptionSelector = '#menuFileNew';
var ContentMenuOptionSelector = '#menuFileNewDocument';
var FilterVersionsSelector = '#menuFilter-button';
var InclExpiredFilterSelector = "//span[@id='WMD Status 2 All Including Expired']";

module.exports = {

    selectNewContent: function(nodeName){
        browser.waitForVisible(NewMenuOptionSelector,maxWaitTimeInMs);
        browser.click(NewMenuOptionSelector);
        browser.waitForVisible(ContentMenuOptionSelector, maxWaitTimeInMs);
        browser.click(ContentMenuOptionSelector);
    },

    IncludeExpiredFilterVersions: function(){
        browser.waitForVisible(FilterVersionsSelector,maxWaitTimeInMs);
        browser.click(FilterVersionsSelector);
        browser.waitForVisible(InclExpiredFilterSelector, maxWaitTimeInMs);
        browser.click(InclExpiredFilterSelector);
    }
}

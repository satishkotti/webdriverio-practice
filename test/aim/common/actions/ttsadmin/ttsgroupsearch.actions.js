var TTSSrchPage = require('./../../elements/ttsadmin/ttssearch.page');

module.exports.TTSGroupSrch = (keygrp) => {
        TTSSrchPage.homeLnk.click();     
        TTSSrchPage.enterGrpName.setValue(keygrp);
        TTSSrchPage.findButton.click();
     
        
        TTSSrchPage.configureSrchRsltLnk.click();   // selection of configure link  shonw in the resultset
         TTSSrchPage.waitForSearchToComplete();   // wait for processing bar to complete and show resultset
};

module.exports.GetGroupUrlData = function (row) {

        let GetText = function (webElement) {
                webElement.waitForExist();
                webElement.waitForVisible();
                return webElement.getText();
        }

        browser.pause(3000);
        let TTSGroupUrlDataWebElements = TTSSrchPage.GetGroupUrlData(row);
        let TTSGroupData = {};
        TTSGroupData = {
                status: GetText(TTSGroupUrlDataWebElements.status),
                full_url: GetText(TTSGroupUrlDataWebElements.full_url),
                page_name: GetText(TTSGroupUrlDataWebElements.page_name),
 

        }
        console.log("##########");
        console.log(TTSGroupData);
        return TTSGroupData;
}
var EditTTSConfigPage = require('./../../elements/ttsadmin/editttsconfig.page');

module.exports.FindUrlData = function () {
        EditTTSConfigPage.fndUrlLnk.click();
        


};

module.exports.TTSGroupSrch = (keygrp) => {
        TTSSrchPage.homeLnk.click();     
        TTSSrchPage.enterGrpName.setValue(keygrp);
        TTSSrchPage.findButton.click();
     
        
        TTSSrchPage.configureSrchRsltLnk.click();   // selection of configure link  shown in the resultset
         TTSSrchPage.waitForSearchToComplete();   // wait for processing bar to complete and show resultset
};
// get the result set record data  for the row provided 
module.exports.GetGroupUrlData = function (row) {

        let GetText = function (webElement) {
                webElement.waitForExist();
                webElement.waitForVisible();
                return webElement.getText();
        }

        browser.pause(3000);
                let TTSGroupUrlDataWebElements = TTSSrchPage.GetGroupUrlData(row); // getting the record data in TTS Configuration for the provided row
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
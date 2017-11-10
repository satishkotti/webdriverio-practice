var UrlSrchPage = require('./../../elements/aim/Aimurlsearch.page');

module.exports.AimUrlSrch = (keyurl) => {
                 AimUrlSrch.keySrch.setValue(keyurl);
                 AimUrlSrch.keySrchParm.selectByIndex(0);
        AimUrlSrch.keySrchbtn.click();
   
         AimUrlSrch.waitForSearchToComplete();     
        
};
module.exports.AimAdvUrlSrch = (keyurl) => {
                 AimUrlSrch.keySrch.setValue(keyurl);
                 AimUrlSrch.keySrchParm.selectByIndex(0);
                 AimUrlSrch.advSrchlnk.click();// advanced search link selection
          AimUrlSrch.advSrchaddFltrDrpDwn.selectByIndex(3); // selection of full url form dropdown
          AimUrlSrch.advSrchaddFltrOpDrpDwn.selectByIndex(0);// selection of contains any from drop down
          AimUrlSrch.advSrchBtn.click(); // selection of advanced search button
         
         AimUrlSrch.waitForSearchToComplete();     
        
};

module.exports.GetUrlData = function (row) {

        let GetText = function (webElement) {
                webElement.waitForExist();
                webElement.waitForVisible();
                return webElement.getText();
        }

        browser.pause(3000);
        let UrlDataWebElements = UrlSrchPage.GetUrlData(row);
        let UrlData = {};
        UrlData = {
                details: GetText(UrlDataWebElements.details),
                reservation: GetText(UrlDataWebElements.reservation),
                runtime_system: GetText(UrlDataWebElements.runtime_system),
                url_status: GetText(UrlDataWebElements.url_status),
                full_url: GetText(UrlDataWebElements.full_url),                
                asset_id: GetText(UrlDataWebElements.asset_id),
                title: GetText(UrlDataWebElements.title),
                channel: GetText(UrlDataWebElements.channel),
                primary_topicid: GetText(UrlDataWebElements.primary_topicid),
                product: GetText(UrlDataWebElements.product),
                package_name: GetText(UrlDataWebElements.package_name),

         
        }
       
        console.log(UrlData);
        return UrlData;
}
var UrlSrchPage = require('./../../elements/aim/Aimurlsearch.page');

module.exports.AimUrlSrch = (keyurl) => {
        UrlSrchPage.keywordsrch.setValue(keyurl);
        UrlSrchPage.keySrchParm.click();
        UrlSrchPage.keySrchParmSelect.click();
        UrlSrchPage.keySrchbtn.click();
        UrlSrchPage.waitForSearchToComplete();
};
module.exports.AimAdvUrlSrch = (value) => {
        browser.pause(1000);
        UrlSrchPage.keywordsrch.setValue(value);
        UrlSrchPage.keySrchParm.click();
        UrlSrchPage.keySrchParmSelect.click();
        UrlSrchPage.advSrchlnk.click();// advanced search link selection
        UrlSrchPage.advSrchaddFltrDrpDwn.click(); // selection of dropdown
        UrlSrchPage.advSrchaddFltrDrpDwnSelect.click(); // selection of full url form dropdown
        UrlSrchPage.advSrchaddFltrOpDrpDwn.click();// selection of contains any  drop down
        // selection of contains any from drop down
        UrlSrchPage.advSrchaddFltrOpDrpDwnSelect.click();
        UrlSrchPage.advSrchBtn.click(); // selection of advanced search button

        UrlSrchPage.waitForSearchToComplete();

};
module.exports.AdvancedSearch = (filter, value) => {
        UrlSrchPage.keywordsrch.setValue(value);
        UrlSrchPage.keySrchParm.click();
        UrlSrchPage.keySrchParmSelect.click();
        UrlSrchPage.advSrchlnk.click();// advanced search link selection
        UrlSrchPage.advSrchaddFltrDrpDwn.click(); // selection of dropdown
        UrlSrchPage.advSrchaddFltrDrpDwnSelect.click(); // selection of full url form dropdown
        UrlSrchPage.advSrchaddFltrOpDrpDwn.click();// selection of contains any  drop down
        switch (filter.toLowerCase()) {
                case 'full url':
                        // selection of contains any from drop down
                        UrlSrchPage.advSrchaddFltrOpDrpDwnSelect.click();
                        break;
                default:
                        // selection of contains any from drop down
                        UrlSrchPage.advSrchaddFltrDrpDwnSelect2(filter).click();
        }
        UrlSrchPage.advSrchBtn.click(); // selection of advanced search button

        UrlSrchPage.waitForSearchToComplete();

};
module.exports.selUrlSrch = function () {
        UrlSrchPage.searchdrpdown.waitForVisible();
        UrlSrchPage.searchdrpdown.click();
        UrlSrchPage.selUrlSrchDn.waitForVisible();
        UrlSrchPage.selUrlSrchDn.click();



};

// no result set for urls search
module.exports.GetNoData = function () {


        var result= UrlSrchPage.noRsltUrl.isExisting();
        return result;
};
// to check result set available for urls search
module.exports.GetDataAvailable = function () {

        return UrlSrchPage.keySrchRslt.isExisting();
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
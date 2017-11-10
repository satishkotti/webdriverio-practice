var ProdSrchPage = require('./../../elements/aim/Aimproductsearch.page');

module.exports.AimProdSrch = (keyprod) => {
        ProdSrchPage.searchdrpdown.click();
        ProdSrchPage.productsearchdrpdown.click();
        ProdSrchPage.keywordsrch.setValue(keyprod);

        ProdSrchPage.keySrchbtn.click();
        ProdSrchPage.waitForSearchToComplete();
        
        ProdSrchPage.urlSelLink.click();   // selection of link urls shonw in the resultset
};

module.exports.GetProductUrlData = function (row) {

        let GetText = function (webElement) {
                webElement.waitForExist();
                webElement.waitForVisible();
                return webElement.getText();
        }

        browser.pause(3000);
        let productUrlDataWebElements = ProdSrchPage.GetProductUrlData(row);
        let productUrlData = {};
        productUrlData = {
                runtime_or_system: GetText(productUrlDataWebElements.runtime_or_system),
                url_status: GetText(productUrlDataWebElements.url_status),
                full_url: GetText(productUrlDataWebElements.full_url),
                title: GetText(productUrlDataWebElements.title),
                channel_id: GetText(productUrlDataWebElements.channel_id),
                topic_id: GetText(productUrlDataWebElements.topic_id),
                asset_id: GetText(productUrlDataWebElements.asset_id),


        }
       
        console.log(productUrlData);
        return productUrlData;
}
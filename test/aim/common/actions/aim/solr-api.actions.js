const solrApi = require('../../../../common/api/solr-api.js');

module.exports = {
    GetDataFromSolr: function (baseUrl, queryString) {
        let solrData = null;
        solrApi.SetAgent(baseUrl);
        browser.call(function () {
            solrApi.Get(queryString).then(function (result) {
                solrData = result;
            })
        });
        browser.waitUntil(function () {
            return solrData != null;
        }, 60000, 'Solr Data Retreival Timeout!', 200);

        return solrData;

    }
}
const salestest = require('./../../../../../common/functions/salesforce/functions');
const ttstest = require('./../..//../../../common/functions/ttsadmin/functions');
const aimtest = require('./../../../../../common/functions/AIM/functions');
const testdata = require('../../../../../data/testdata/ppe-75230.testdata');
const api = require('../../../../../../common/api/dctm-api');

describe('PPE-75320 Use SOLR for WebMD Drugs Data in AIM', function () {

    let productSearchData = null, asset_id = null,solrBaseUrl= null, queryString = null,solrData = null ;
    before(function () {
        
        aimtest.LaunchApp();
        aimtest.ProductSearch(testdata.testDrug);
         productSearchData = aimtest.GetProductSearchData(testdata.rowOne);
         asset_id = productSearchData.asset_id;
          solrBaseUrl = testdata.solrBaseUrl;
        queryString = testdata.queryString.replace('***', asset_id);
          solrData = aimtest.GetDataFromSolr(solrBaseUrl, queryString);

    });

    it('Verify user is able to search the product', function () {

           console.log("Verify comparing the AIM asset metadata with Solr meta data");
         
         productSearchData.title.should.equal(solrData.data.docs[0].title);         
         productSearchData.topic_id.should.equal(solrData.data.docs[0].topic[0]);         
         console.log(solrData);         
         console.log(solrData.data.docs[0].channel);
         console.log(solrData.data.docs[0].title);
         console.log(solrData.data.docs[0].topic[0]);
         console.log(solrData.data.docs[0].urls[0].status);
         console.log(solrData.data.docs[0].urls[0].url);   


    });

});
const salestest = require('./../../../../../common/functions/salesforce/functions');
const ttstest = require('./../..//../../../common/functions/ttsadmin/functions');
const aimtest = require('./../../../../../common/functions/AIM/functions');
const testdata = require('../../../../../data/testdata/ppe-135337.testdata');
const api = require('../../../../../../common/api/dctm-api');

describe('PPE-135337 Modify Rules for URL Status for Some Content', function () {

    let urlSearchData = null, UrlExists = null,UrlExistsDfStDel = null,UrlExistsDfStAct = null, asset_id = null,asset_id_diffstat = null,solrBaseUrl= null, queryString = null,solrData = null,
    solrStatData = null,UrlNotExistsExpDel = null, UrlNew=null ;
   
    before(function () {      
        

        UrlExists = testdata.UrlExists;
       asset_id = testdata.AssetIdExists;
          solrBaseUrl = testdata.solrBaseUrl;
        queryString = testdata.queryString.replace('***', asset_id);
          solrData = aimtest.GetDataFromSolr(solrBaseUrl, queryString);
          
          aimtest.LaunchApp();
        aimtest.UrlAdvSearch(UrlExists);
        urlSearchData = aimtest.GetUrlData(testdata.rowOne);      

    }); 

    it('Verify user is able to search the urls for exists with Uniqueid and Assetid are same in Solr / AIM', function () {
console.log(solrData);
console.log("########################");
    console.log(urlSearchData);
    console.log(urlSearchData.url_status);
        console.log(urlSearchData.full_url);   
       // urlSearchData.full_url.should.equal(solrData.data.docs[0].urls[0].url);   
        if(solrData.data.docs[0].urls[0].status =='A')  {
           urlSearchData.url_status.should.equal('Active') ;
        }    
        console.log(solrData.data.docs[0].urls[0].status);
         console.log(solrData.data.docs[0].urls[0].url);   


     });
it('Verify user is able to search the urls for exists with different status with deleted in Solr , does not exist in AIM  having Uniqueid and Assetid are same', function () {
   
UrlExistsDfStDel = testdata.UrlExistsDiffStatusDel;
       asset_id = testdata.AssetIdExistsDiffStatusDel;
          solrBaseUrl = testdata.solrBaseUrl;
         
        queryString = testdata.queryString.replace('***', asset_id);
          solrData = aimtest.GetDataFromSolr(solrBaseUrl, queryString);

          aimtest.selUrlSrch();
        aimtest.UrlAdvSearch(UrlExistsDfStDel);

    if(aimtest.GetNoData() ==  false) {
console.log("validated record does not exist In AIM for deleted status url in Solr");    } 

     });
     it('Verify user is able to search the urls for Not Exists - Expired/Deleted in Solr , so not exist in AIM with Uniqueid and Assetid are same', function () {
UrlNotExistsExpDel = testdata.UrlNotExistsExpDel;
       asset_id = testdata.AssetIdNotExistsExpDel;
          solrBaseUrl = testdata.solrBaseUrl;
         
        queryString = testdata.queryString.replace('***', asset_id);
          solrData = aimtest.GetDataFromSolr(solrBaseUrl, queryString);
          console.log(" 3 case ########################");
          console.log(solrData);
          aimtest.selUrlSrch();
        aimtest.UrlAdvSearch(UrlNotExistsExpDel);

    if(aimtest.GetNoData() ==  false) {
console.log("validated record does not exist In AIM for deleted/ expired  status url in Solr");    } 

     

  }); 
  it('Verify user is able to search the newly added urls  in Solr / AIM   with Uniqueid and Assetid are different', function () {

UrlNew = testdata.UrlNew;
       asset_id = testdata.AssetIdNew;
          solrBaseUrl = testdata.solrBaseUrl;
         
        queryString = testdata.queryString.replace('***', asset_id);
          solrData = aimtest.GetDataFromSolr(solrBaseUrl, queryString);
          console.log(solrData);
          console.log(solrData.data.docs[0].urls[2].status);
         console.log(solrData.data.docs[0].urls[2].url);   

          aimtest.selUrlSrch();
        aimtest.UrlAdvSearch(UrlNew);
        urlSearchData = aimtest.GetUrlData(testdata.rowOne);
   console.log(urlSearchData);
 
 }); 

});
//const testdata = require('./../../../../../data/testdata/test.csv');
const testdata = require('../../../../../data/testdata/ppe-135337.testdata');
const api = require('../../../../../../common/api/dctm-api');
const aimtest = require('./../../../../../common/functions/AIM/functions');
var mssql = require('mssql');
var Promise = require('bluebird');
var assetIds_db = null, queryString = null, solrData = null;
const solrBaseUrl = testdata.solrBaseUrl;




describe('PPE-135337 Modify Rules for URL Status for Some Content', function () {

    before(function () {
        assetIds_db = aimtest.FetchDataFromDB(testdata.DBconfig, testdata.SQLQuery.fetchAssetIds);
        do {
        } while (assetIds_db == null)
    })


    it(`PPE-135337 Validation`, function () {
        /*
    console.log("Source_UniqueId:" + i + "=" + assetIds_db[i].Source_UniqueId);
    console.log("Source_AssetId:" + i + "=" + assetIds_db[i].Source_AssetId);
    console.log("Source_URI:" + i + "=" + assetIds_db[i].Source_URI);
    console.log("Source_URLType:" + i + "=" + assetIds_db[i].Source_URLType);
    console.log("Source_Status:" + i + "=" + assetIds_db[i].Source_Status);
    console.log("Target_AssetId:" + i + "=" + assetIds_db[i].Target_AssetId);
    console.log("Target_URIassetIds_db:" + i + "=" + assetIds_db[i].Target_URI);
    console.log("Target_Status:" + i + "=" + assetIds_db[i].Target_Status);
    console.log("COMMENT:" + i + "=" + assetIds_db[i].COMMENT);
    */
        assetIds_db.forEach(function (each) {
            let assetId = null;
            let isSourceAssetIdNull = false;
            let assetData = null;
            if (each.Source_AssetID != null) {
                //get data from database 
                console.log('Test for ' + each.Source_AssetID);
                assetId = each.Source_AssetID;
                assetData = aimtest.FetchDataFromDB(testdata.DBconfig, testdata.SQLQuery.fetchAssetData.Source_AssetID.replace('***', assetId));
                console.log(assetData);
            }
            else {
                  //get data from database 
                console.log('Test for ' + each.Target_AssetID);
                assetId = each.Target_AssetID;
                isSourceAssetIdNull = true;
                assetData = aimtest.FetchDataFromDB(testdata.DBconfig, testdata.SQLQuery.fetchAssetData.Target_AssetID.replace('***', assetId));
                 console.log(assetData);
         }
           // get data from  Solr using the Assetid
            queryString = testdata.queryString.replace('***', assetId);
            solrData = aimtest.GetDataFromSolr(solrBaseUrl, queryString);
            aimtest.LaunchApp();
            aimtest.AdvancedSearch('Asset ID', assetId);


            if (aimtest.NoData()) {
                //Case: If only 1 record exists and the record is in deleted state inactive in AIM
                //Compare against DB
                expect(assetData).to.have.length(1);
                expect(assetData[0].Source_Status).to.equal('D');
                //Compare against SOLR
                expect(solrData.dataa.docs[0].urls).to.have.length(1);
                expect(solrData.data.docs[0].status).to.equal('D');
            }
            else {
                //Case: 
                // If only 1 record exists and the record is in active state
                // (or)
                // If multiple records exist

                let activeAssets_db = [], activeAssets_solr = [], activeAssets_ui,asset_db;

                //Capture only the active assets - DB
                for (asset_db in assetData) {
                    if (asset_db.Source_Status == 'A') {
                        activeAssets_db.push(asset_db);
                    }
                    // added code start 
                        if (asset_db.Source_Status == 'D') {
                        activeAssets_db.push(asset_db);
                    }
                    // added code end 
                }

                //Capture only the active assets - SOLR
                for (let asset_solr in solrData.data.docs[0].urls) {
                    if (asset_solr.status == 'A') {
                        activeAssets_solr.push(asset_solr);
                    }
                    // added code start 
                     if (asset_solr.status == 'D') {
                        activeAssets_solr.push(asset_solr);
                    }
                    // added code end
                }

                //Capture asset data from the ui 
                for (let i = 1; i <= activeAssets_db.length; i++) {
                    let rowData = aimtest.GetUrlData(i);
                    activeAssets_ui.push(rowData);
                }

                //Compare UI vs DB
                for (let activeAsset_ui in activeAssets_ui) {
                    let ui_db_match_found = false, ui_solr_match_found = false;
                    for (let activeAsset_db in activeAssets_db) {
                        if (activeAsset_ui.full_url == activeAsset_db.Source_URI) {
                            ui_db_match_found = true;
                            expect(activeAsset_ui.status).to.equal(activeAsset_db.Source_Status);
                        }
                    }
                    expect(ui_db_match_found).to.be.true;

                    //Compare UI vs SOLR
                    for (let activeAsset_solr in activeAssets_solr) {
                        if (activeAsset_ui.full_url == activeAsset_solr.url) {
                            ui_solr_match_found = true;
                            expect(activeAsset_ui.status).to.equal(activeAsset_solr.status);
                        }
                    }
                    expect(ui_solr_match_found).to.be.true;
                }
            }
        })
    })

});


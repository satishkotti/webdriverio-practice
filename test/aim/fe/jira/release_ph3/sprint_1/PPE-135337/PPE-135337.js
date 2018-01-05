//const testdata = require('./../../../../../data/testdata/test.csv');
const testdata = require('../../../../../data/testdata/ppe-135337.testdata');
var fs = require('fs');
var jsonfile = require('jsonfile')
const testfilestatus = require('../../../../../data/testdata/ppe-135337.status');

const api = require('../../../../../../common/api/dctm-api');
const aimtest = require('./../../../../../common/functions/AIM/functions');
var mssql = require('mssql');
var Promise = require('bluebird');
var dbRecords = null, MobileA = null, DesktopD = null;
var DesktopA = null, DesktopU = null, MobileD = null, AlternateA = null, AlternateD = null, ExpiredD = null;




describe('PPE-135337 Modify Rules for URL Status for Some Content', function () {
    before(function () {
        let urlSearchData = null;

        dbRecords = aimtest.FetchDataFromDB(testdata.DBconfig, testdata.SqlQuery);
        /*    for (var i = 1; i <= dbRecords.length; i++) {
        console.log("Source_UniqueId:" + i + "=" + dbRecords[i].Source_UniqueId);
        console.log("Source_AssetId:" + i + "=" + dbRecords[i].Source_AssetId);
        console.log("Source_URI:" + i + "=" + dbRecords[i].Source_URI);
        console.log("Source_URLType:" + i + "=" + dbRecords[i].Source_URLType);
        console.log("Source_Status:" + i + "=" + dbRecords[i].Source_Status);
        console.log("Target_AssetId:" + i + "=" + dbRecords[i].Target_AssetId);
        console.log("Target_URI:" + i + "=" + dbRecords[i].Target_URI);
        console.log("Target_Status:" + i + "=" + dbRecords[i].Target_Status);
        console.log("COMMENT:" + i + "=" + dbRecords[i].COMMENT);

    }*/

    });

    it('Verify user is able to search the urls for exists with Uniqueid and Assetid are same in Solr / AIM', function () {
        for (var i = 1; i <= dbRecords.length; i++) {
            var channel = null;
            if (dbRecords[i].COMMENT == 'Exists' && dbRecords[i].Source_URLType == 'Desktop' && dbRecords[i].Source_Status == 'D') {
                channel = 'DesktopD';
            }
            if (dbRecords[i].COMMENT == 'Exists' && dbRecords[i].Source_URLType == 'Desktop' && dbRecords[i].Source_Status == 'A') {
                channel = 'DesktopA';
            }
            if (dbRecords[i].COMMENT == 'Exists' && dbRecords[i].Source_URLType == 'Desktop' && dbRecords[i].Source_Status == 'U') {
                channel = 'DesktopU';
            }
            if (dbRecords[i].COMMENT == 'Exists' && dbRecords[i].Source_URLType == 'Mobile' && dbRecords[i].Source_Status == 'D') {
                channel = 'MobileD';
            }
            if (dbRecords[i].COMMENT == 'Exists' && dbRecords[i].Source_URLType == 'Mobile' && dbRecords[i].Source_Status == 'A') {
                channel = 'MobileA';
            }
            if (dbRecords[i].COMMENT == 'Exists' && dbRecords[i].Source_URLType == 'Alternate' && dbRecords[i].Source_Status == 'D') {
                channel = 'AlternateD';
            }
            if (dbRecords[i].COMMENT == 'Exists' && dbRecords[i].Source_URLType == 'Alternate' && dbRecords[i].Source_Status == 'A') {
                channel = 'AlternateA';
            }
            if (dbRecords[i].COMMENT == 'Not Exists - Expired/Deleted' && dbRecords[i].Target_Status == 'D' && (dbRecords[i].Target_Asset_Type == 'wbmd_cons_article' || dbRecords[i].Target_Asset_Type == 'Blog')) {
                channel = 'ExpiredD';
            }


            switch (channel) {
                case 'DesktopD':

                    console.log('current record i:=' + i + "-assetid:" + dbRecords[i].Source_AssetId + "-channel-" + channel);
                    solrBaseUrl = testdata.solrBaseUrl;
                    queryString = testdata.queryString.replace('***', dbRecords[i].Source_AssetId);
                    solrData = aimtest.GetDataFromSolr(solrBaseUrl, queryString);
                    aimtest.LaunchApp();
                    aimtest.UrlAdvSearch(dbRecords[i].Source_URI);
                    var obj = {
                         "counter" : i,
                        "Assetid": dbRecords[i].Source_AssetId,
                        "Channel": channel,
                        "Status": 'pass',

                    }
                    fs.writeFileSync('.\\test\\aim\\data\\testdata\\ppe-135337.status.json', JSON.stringify(obj), ({ flag: 'a' }), ({ spaces: 2, EOL: '\r\n' }));
                    // aimtest.GetRecordStatus(testfilestatus,dbRecords[i].Source_AssetId, channel,'pass');
                    if (aimtest.NoData() == true) {
                        //    solrData.data.docs[0].urls[0].status.should.equal('D');
                    }
                    break;

                case 'DesktopA':
                    console.log('current record i:=' + i + "-assetid:" + dbRecords[i].Source_AssetId + "-channel-" + channel);
                    solrBaseUrl = testdata.solrBaseUrl;
                    queryString = testdata.queryString.replace('***', dbRecords[i].Source_AssetId);
                    solrData = aimtest.GetDataFromSolr(solrBaseUrl, queryString);
                    aimtest.LaunchApp();
                    aimtest.UrlAdvSearch(dbRecords[i].Source_URI);
                    //aimtest.GetRecordStatus(testfilestatus,dbRecords[i].Source_AssetId, channel,'pass');
                    if (aimtest.GetDataAvailable() == true)// check whether result set is available 
                    {
                        browser.pause(2000);
                        urlSearchData = aimtest.GetUrlData(testdata.rowOne);
                        console.log("urlSearchData: " + urlSearchData);
                    }
                    if (solrData.data.docs[0].urls[0].status == 'A') {
                        urlSearchData.url_status.should.equal('Active');

                        console.log("url status: " + "i:=" + urlSearchData.url_status);
                        console.log("full url: " + urlSearchData.full_url);
                    }
                    var obj = {
                         "counter" : i,
                        "Assetid": dbRecords[i].Source_AssetId,
                        "Channel": channel,
                        "Status": 'pass',

                    }
                    fs.writeFileSync('.\\test\\aim\\data\\testdata\\ppe-135337.status.json', JSON.stringify(obj), ({ flag: 'a' }), ({ spaces: 2, EOL: '\r\n' }));
                    break;
                case 'DesktopU':
                    console.log('current record i:=' + i + "-assetid:" + dbRecords[i].Source_AssetId + "-channel-" + channel);
                    solrBaseUrl = testdata.solrBaseUrl;
                    queryString = testdata.queryString.replace('***', dbRecords[i].Source_AssetId);
                    solrData = aimtest.GetDataFromSolr(solrBaseUrl, queryString);
                    aimtest.LaunchApp();
                    aimtest.UrlAdvSearch(dbRecords[i].Source_URI);

                    if (aimtest.GetDataAvailable() == true)// check whether result set is available 
                    {
                        browser.pause(2000);
                        urlSearchData = aimtest.GetUrlData(testdata.rowOne);
                        console.log("urlSearchData: " + urlSearchData);
                    }
                    if (solrData.data.docs[0].urls[0].status == 'U') {
                        urlSearchData.url_status.should.equal('Active');

                        console.log("url status: " + "i:=" + urlSearchData.url_status);
                        console.log("full url: " + urlSearchData.full_url);
                    }
                    var obj = {
                         "counter" : i,
                        "Assetid": dbRecords[i].Source_AssetId,
                        "Channel": channel,
                        "Status": 'pass',

                    }
                    fs.writeFileSync('.\\test\\aim\\data\\testdata\\ppe-135337.status.json', JSON.stringify(obj), ({ flag: 'a' }), ({ spaces: 2, EOL: '\r\n' }));
                    break;
                case 'MobileD':
                    console.log('current record i:=' + i + "-assetid:" + dbRecords[i].Source_AssetId + "-channel-" + channel);
                    solrBaseUrl = testdata.solrBaseUrl;
                    queryString = testdata.queryString.replace('***', dbRecords[i].Source_AssetId);
                    solrData = aimtest.GetDataFromSolr(solrBaseUrl, queryString);
                    aimtest.LaunchApp();
                    aimtest.UrlAdvSearch(dbRecords[i].Source_URI);
                    var obj = {
                         "counter" : i,
                        "Assetid": dbRecords[i].Source_AssetId,
                        "Channel": channel,
                        "Status": 'pass',

                    }
                    // fs.writeFileSync('.\\test\\aim\\data\\testdata\\ppe-135337.status.json',  JSON.stringify(obj),({flag: 'a'}),({spaces: 2, EOL: '\r\n'}));
                    fs.writeFileSync('.\\test\\aim\\data\\testdata\\ppe-135337.status.json', JSON.stringify(obj), ({ flag: 'a' }), ({ spaces: 2, EOL: '\r\n' }));
                    // aimtest.GetRecordStatus(testfilestatus,dbRecords[i].Source_AssetId, channel,'pass');
                    if (aimtest.NoData() == true) {
                        //  solrData.data.docs[0].urls[0].status.should.equal('D');
                    }
                    break;
                case 'MobileA':
                    console.log('current record i:=' + i + "-assetid:" + dbRecords[i].Source_AssetId + "-channel-" + channel);
                    solrBaseUrl = testdata.solrBaseUrl;
                    queryString = testdata.queryString.replace('***', dbRecords[i].Source_AssetId);
                    solrData = aimtest.GetDataFromSolr(solrBaseUrl, queryString);
                    aimtest.LaunchApp();
                    aimtest.UrlAdvSearch(dbRecords[i].Source_URI);
                    //  aimtest.FileWrite();
                    // aimtest.FileWriting(testfilestatus,dbRecords[i].Source_AssetId, channel,'pass');
                    // obj.table.push({'Assetid:'+ dbRecords[i].Source_AssetId, 'Channel:' + channel,'Status:' + pass});
                    // sandep code  
                    var obj = {
                         "counter" : i,
                        "Assetid": dbRecords[i].Source_AssetId,
                        "Channel": channel,
                        "Status": 'pass',

                    }
                    fs.writeFileSync('.\\test\\aim\\data\\testdata\\ppe-135337.status.json', JSON.stringify(obj), ({ flag: 'a' }), ({ spaces: 2, EOL: '\r\n' }));
                   

                    if (aimtest.GetDataAvailable() == true)// check whether result set is available 
                    {
                        browser.pause(2000);
                        urlSearchData = aimtest.GetUrlData(testdata.rowOne);
                        console.log("urlSearchData: " + urlSearchData);
                    }
                    if (solrData.data.docs[0].urls[0].status == 'A') {
                        urlSearchData.url_status.should.equal('Active');

                        console.log("url status: " + "i:=" + urlSearchData.url_status);
                        console.log("full url: " + urlSearchData.full_url);
                    }
                    break;
                case 'AlternateD':
                    console.log('current record i:=' + i + "-alternate assetid:" + dbRecords[i].Source_AssetId + "-channel-" + channel);
                    solrBaseUrl = testdata.solrBaseUrl;
                    queryString = testdata.queryString.replace('***', dbRecords[i].Source_AssetId + "-channel-" + channel);
                    solrData = aimtest.GetDataFromSolr(solrBaseUrl, queryString);
                    aimtest.LaunchApp();
                    aimtest.UrlAdvSearch(dbRecords[i].Source_URI);
                    //   aimtest.GetRecordStatus(testfilestatus,dbRecords[i].Source_AssetId, channel,'pass');
                    if (aimtest.NoData() == true) {
                        solrData.data.docs[0].urls[0].status.should.equal('D');
                    }
                   
                    var obj = {
                         "counter" : i,
                        "Assetid": dbRecords[i].Source_AssetId,
                        "Channel": channel,
                        "Status": 'pass',

                    }
                    fs.writeFileSync('.\\test\\aim\\data\\testdata\\ppe-135337.status.json', JSON.stringify(obj), ({ flag: 'a' }), ({ spaces: 2, EOL: '\r\n' }));
                    break;
                case 'AlternateA':
                    console.log('current record i:=' + i + "- alternate assetid:" + dbRecords[i].Source_AssetId + "-channel-" + channel);
                    solrBaseUrl = testdata.solrBaseUrl;
                    queryString = testdata.queryString.replace('***', dbRecords[i].Source_AssetId);
                    solrData = aimtest.GetDataFromSolr(solrBaseUrl, queryString);
                    aimtest.LaunchApp();
                    aimtest.UrlAdvSearch(dbRecords[i].Source_URI);
                    //     aimtest.GetRecordStatus(testfilestatus,dbRecords[i].Source_AssetId, channel,'pass');
                    if (aimtest.GetDataAvailable() == true)// check whether result set is available 
                    {
                        browser.pause(2000);
                        urlSearchData = aimtest.GetUrlData(testdata.rowOne);
                        console.log("urlSearchData: " + urlSearchData);
                    }
                    if (solrData.data.docs[0].urls[0].status == 'A') {
                        urlSearchData.url_status.should.equal('Active');

                        console.log("url status: " + "i:=" + urlSearchData.url_status);
                        console.log("full url: " + urlSearchData.full_url);
                    }
                  
                    var obj = {
                         "counter" : i,
                        "Assetid": dbRecords[i].Source_AssetId,
                        "Channel": channel,
                        "Status": 'pass',

                    }
                    fs.writeFileSync('.\\test\\aim\\data\\testdata\\ppe-135337.status.json', JSON.stringify(obj), ({ flag: 'a' }), ({ spaces: 2, EOL: '\r\n' }));
                    break;
                case 'ExpiredD':

                    console.log('current record i:=' + i + "-targetassetid:" + dbRecords[i].Target_AssetId + "-channel-" + channel);
                    solrBaseUrl = testdata.solrBaseUrl;
                    queryString = testdata.queryString.replace('***', dbRecords[i].Target_AssetId);
                    solrData = aimtest.GetDataFromSolr(solrBaseUrl, queryString);
                    aimtest.LaunchApp();
                    aimtest.UrlAdvSearch(dbRecords[i].Target_URI);

                    if (aimtest.NoData() == true) {
                        console.log('Validated Expired record-' + i);

                    }
                 
                    var obj = {
                       "counter" : i,
                        "Assetid": dbRecords[i].Target_AssetId,
                        "Channel": channel,
                        "Status": 'pass',

                    }
                    fs.writeFileSync('.\\test\\aim\\data\\testdata\\ppe-135337.status.json', JSON.stringify(obj), ({ flag: 'a' }), ({ spaces: 2, EOL: '\r\n' }));
                    break;

                default:
                    break;
            }
        }

    })

});
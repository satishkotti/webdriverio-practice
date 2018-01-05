
const app = require('./../../actions/aim/login.actions');
const productsearch = require('./../../actions/aim/Aimproductsearch.actions');
const advSearch = require('./../../actions/aim/Aimurlsearch.actions');

const solrActions = require('../../../common/actions/aim/solr-api.actions');
var mssql = require('mssql');
var jsonfile = require('jsonfile')
var fs = require("fs");

/*----------------------------------------------------------------------------------------------------- */
/**************************************** A P P   L A U N C H *****************************************/
/*----------------------------------------------------------------------------------------------------- */

/* ------------------
** A P P  L A U N C H
** ------------------
** Description:
** Just launches the AIM app (does not do the login part)
*/
module.exports.LaunchApp = () => {
    app.LaunchApp();
}

/* -----------------
** Product   Search
** -----------------
** Description:
** Just search for the product metadata 
*/

module.exports.GetProductSearchData = (row) => {
    return productsearch.GetProductUrlData(row);

}
/* -----------------
** Url   Search
** -----------------
** Description:
** Just search for the URL  metadata 
*/

module.exports.GetUrlSearchData = (row) => {
    return advSearch.GetProductUrlData(row);

}
/* -----------------
** get Product  search  resultset data 
** -----------------
** Description:
** Get  search for the product search result set metadata 
*/

module.exports.ProductSearch = (drug) => {
    return productsearch.AimProdSrch(drug);

}

module.exports.GetDataFromSolr = function (baseUrl, queryString) {
    return solrActions.GetDataFromSolr(baseUrl, queryString);
}
/* -----------------
** get urls  search  resultset data 
** -----------------
** Description:
** Get  search for the url search result set metadata 
*/
module.exports.UrlSearch = (url) => {
    return advSearch.AimUrlSrch(url);

}
/* -----------------
** get urls  advanced search  resultset data 
** -----------------
** Description:
** Get  search for the advanced url search result set metadata 
*/

module.exports.UrlAdvSearch = (url) => {
    return advSearch.AimAdvUrlSrch(url);

}

module.exports.AdvancedSearch = (filter, option) => {
    return advSearch.AdvancedSearch(filter, option);

}
/* -----------------
** get urls   data 
** -----------------
** Description:
** Get  result set data
*/

module.exports.GetUrlData = (row) => {
    return advSearch.GetUrlData(row);

}
/* -----------------
** get no data for urls  search
** -----------------
** Description:
** Get  zero result set data
*/

module.exports.NoData = () => {
    return advSearch.GetNoData();

}
/* -----------------
** get resultset available for urls  search
** -----------------
** Description:
** Check records in result set available
*/

module.exports.GetDataAvailable = () => {
    return advSearch.GetDataAvailable();

}
/* -----------------
** select  urls  search from drop down
** -----------------
** Description:
** select url search
*/

module.exports.selUrlSrch = () => {
    return advSearch.selUrlSrch();

}

module.exports.FetchDataFromDB = (dbConfig, sqlQuery) => {

    /*
    config = {
            user: 'qaautomation1',
            password: 'qaautomation1',
            server: 'sqlvp-cq01-08.portal.webmd.com',
            database: 'URLGrouping',
            requestTimeout: 12000000
        }
    */
    let dbRecords = null;
    mssql.connect(dbConfig).then(pool => {
        pool.request().query(sqlQuery).then(result => {
            dbRecords = result;
        })
    }).catch(err => {
        dbRecords = err;
    });
    browser.waitUntil(function () {
        return dbRecords !== null ? true : false;
    }, 1200000, 'DB Timeout!', 5000);

    return dbRecords;
}
//write the status of record into file
module.exports.GetRecordStatus = (file,Assetid, Channel,Status) => {

jsonfile.writeFile(file,Assetid, Channel,Status, {flag: 'a'}, function (err) {
  console.error(err);

})
}

module.exports.FileWriting = (file,Assetid, Channel,Status) => {

fs.writeFile(JSON.stringify(file,Assetid, Channel,Status, {flag: 'a'}), function (err) {
if (err) {
  //      console.ERROR(err);
        return;
    };
    });
}

module.exports.FileWrite = () => {

var sampleObject = {
    a: 1,
    b: 2,
    c: {
        x: 11,
        y: 22
    }
};

fs.writeFile("./testdata.json", JSON.stringify(sampleObject, null, 4), (err) => {
    if (err) {
        console.ERROR(err);
        return;
    };
    console.log("File has been created");
});
}




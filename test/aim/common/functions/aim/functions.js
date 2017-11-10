
const app = require('./../../actions/aim/login.actions');
const productsearch = require('./../../actions/aim/Aimproductsearch.actions');
const urlsearch = require('./../../actions/aim/Aimurlsearch.actions');

const solrActions = require('../../../common/actions/aim/solr-api.actions');

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
    return urlsearch.AimUrlSrch(url);
  
}
/* -----------------
** get urls  advanced search  resultset data 
** -----------------
** Description:
** Get  search for the advanced url search result set metadata 
*/

module.exports.UrlAdvSearch = (url) => {
    return urlsearch.AimAdvUrlSrch(url);
  
}
/* -----------------
** get urls   data 
** -----------------
** Description:
** Get  result set data
*/

module.exports.GetUrlData = (row) => {
    return urlsearch.GetUrlData(row);
  
}
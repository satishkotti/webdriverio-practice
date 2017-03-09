var sql = require('mssql');
var config = require('./../config');
var Promise = require('bluebird');

/*
var dbConfig = {
    user: "appsa",
    password: "Dconapp$",
    server: "sqlvp-cdv1-08.portal.webmd.com",
    database: "Pagebuilder_SiteManagement"
};
*/
var dbConfig = global.envSettings.siteMgmtDb;
module.exports = {
    executeQuery: function ExecuteQuery(query) {
    
       
        //console.log(query);
        return new Promise(function (resolve, reject) {
            sql.connect(dbConfig, function(connErr){
                    if(connErr != null)
                    {
                        console.log(connErr);
                        return reject(connErr);
                    }
                    
                    new sql.Request().query(query, function(queryErr, recordset) {
                        if(queryErr != null)
                        {
                            console.log(queryErr);
                            return reject(queryErr);
                        }

/*                         recordset.forEach(function (value) {
                                console.log(value);
                            });
*/
                    return resolve(recordset);
                    });
                });
            });
        }
};
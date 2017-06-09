var sql = require('mssql');
var Promise = require('bluebird');


var dbConfig = {
    user: "webmd_runtime",
    password: "w3bmd$runtim3",
    server: "sqlvp-cdv1-08.portal.webmd.com\\cdv1",
    database: "Live_RT",
    port:1433
};

//var dbConfig = global.envSettings.siteMgmtDb;
module.exports = {
    executeQuery: function ExecuteQuery(query) {


        //console.log(query);
        return new Promise(function(resolve, reject) {
            sql.connect(dbConfig, function(connErr) {
                if (connErr != null) {
                    console.log(connErr);
                    return reject(connErr);
                }

                new sql.Request().query(query, function(queryErr, recordset) {
                    if (queryErr != null) {
                        console.log(queryErr);
                        return reject(queryErr);
                    }

                    return resolve(recordset);
                });
            });
        });
    }
};
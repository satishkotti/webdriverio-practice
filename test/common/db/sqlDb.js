var sql = require('mssql');
var Promise = require('bluebird');


var dbConfig = global.envSettings.siteMgmtDb;
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
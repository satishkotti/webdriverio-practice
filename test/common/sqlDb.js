var sql = require('mssql');
var config = require('./config');
var Promise = require('bluebird');

var dbConfig = {
    user: "appsa",
    password: "Dintapp$",
    server: "sqlvp-cdv2-08.portal.webmd.com\\cdv2",
    database: "Pagebuilder_SiteManagement",
    port:1433
};

module.exports = {
    executeQuery: function ExecuteQuery(query) {
        //console.log(query);
       var msUrl = "mssql://" + dbConfig.user + ":" + dbConfig.password + "@" + dbConfig.server + "/" + dbConfig.database;
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

                      recordset.forEach(function (value) {
                                console.log(value);
                            });

                    return resolve(recordset);
                    });
                });
            });
        }
};
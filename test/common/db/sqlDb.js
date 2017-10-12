var sql = require('mssql');
var Promise = require('bluebird');
var dbconnection = require('./rtdbconnection').rtdbconnections;

/*
var dbConfig = {
    user: "appsa",
    password: "Dconapp$",
    server: "sqlvp-cdv1-08.portal.webmd.com",
    database: "Pagebuilder_SiteManagement"
};
*/
var dbConfig = {};

if(global.envSettings === undefined){
    global.envSettings = {};
    switch(global.testEnv){
        case 'dev01': global.envSettings.rtDb = dbconnection.dev01; break;
        case 'qa01': global.envSettings.rtDb = dbconnection.qa01; break;
        case 'qa00': global.envSettings.rtDb = dbconnection.qa00; break;
    }
    dbConfig = global.envSettings.rtDb;
}
else{
    dbConfig = global.envSettings.siteMgmntDb;
}

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
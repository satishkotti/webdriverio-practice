var mssql = require('mssql');
var Promise = require('bluebird');

module.exports = {

    connection:
         {
             user: "",
             password: "",
             server: "",
             database: ""
         },

    executeSql: function (sql)
    {
        var msUrl = "mssql://" + this.connection.user + ":" + this.connection.password + "@" + this.connection.server + "/" + this.connection.database;
        return new Promise(function(resolve, reject)
        {
            mssql
                .connect(msUrl)
                .then(function ()
                {
                    new mssql.Request()
                        .query(sql)
                        .then(function(records)
                        {
                            resolve(records);
                        })
                        .catch(function(err)
                        {
                            console.log("Error in mssqlService.js: " + err + "\r\n" + sql );
                            reject("Error in mssqlService.js: " + err);
                        })
                })
                .catch(function(err)
                {
                    var strError = "mssqlService.js - Error connecting to database: " + err;
                    console.log(strError);
                    reject(err);
                });
        });
    }
};

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
                            console.log(err);
                            reject(err);
                        })
                })
                .catch(function(err)
                {
                    console.log(err);
                    reject(err);
                });
        });
    }
};
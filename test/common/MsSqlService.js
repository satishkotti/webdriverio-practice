module.exports = {
    /**
     * pram 1: options.callback
     * pram 2: options.query
     */
    execute: function (options) {
        var config = require('./config');
        var sql = require('mssql');
        
        var msUrl = "mssql://" + config.siteMgmtConfigDev01.user + ":" + config.siteMgmtConfigDev01.password + "@" + config.siteMgmtConfigDev01.server + "/" + config.siteMgmtConfigDev01.database;
        sql.connect(config.siteMgmtConfigDev01)
            .then(function () {
                new sql.Request()
                    .query(options.query)
                    .then(options.callback)
                    .catch(function (error) {
                        console.log(JSON.stringify(error));
                        throw error;
                    });
            })
            .catch(function (error) {
                console.log(JSON.stringify(error));
                throw error;
            });
    }
}
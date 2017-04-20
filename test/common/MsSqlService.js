module.exports = {
    /**
     * pram 1: options.callback
     * pram 2: options.query
     */
    execute: function(options) {
        var sql = require('mssql');

        var msUrl = "mssql://" + global.envSettings.siteMgmtDb.user + ":" + global.envSettings.siteMgmtDb.password + "@" + global.envSettings.siteMgmtDb.server + "/" + global.envSettings.siteMgmtDb.database;
        sql.connect(msUrl)
            .then(function() {
                new sql.Request()
                    .query(options.query)
                    .then(options.callback)
                    .catch(function(error) {
                        console.log(JSON.stringify(error));
                        throw error;
                    });
            })
            .catch(function(error) {
                console.log(JSON.stringify(error));
                throw error;
            });
    }
}
var mssql = require('./mssqlservices');
var dbcondetails = require('./../../config/rtdbconnection').rtdbconnections;

module.exports = {

    connection:
    {
        user: "",
        password: "",
        server: "",
        database: ""
    },

    getQueryResults: function (query, env ) {
        env = env.toLowerCase();
        console.log(env);
        this.connection = dbcondetails[env];
        console.log(this.connection);
        mssql.connection = this.connection;
        console.log(mssql.connection);

        var sql = query;
        return Promise.resolve(
            mssql.executeSql(sql)
        );
    }
}
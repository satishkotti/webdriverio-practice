var sql = require('mssql');
var config = require('./config');
var q = require('q');

module.exports.executeQuery = function ExecuteQuery(sqlQuery)
{
    console.log(query);
    return sql.connect(config).then(function(){
        new sql.Request().query(sqlQuery)
            .then(function(recordset){ 
                
                 recordset.forEach(function(value){ 
                     console.log(value); 
                    });

                return q.resolve(recordset);
            
        })
            .catch(function(err){ 
                console.log(err); });
        });
};
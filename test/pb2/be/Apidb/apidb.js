var db = require('./../db/sqlDb');
var util = require('util');



var apiData = "select * from MANUAL_REDIRECT where id='A19338F8-DA37-4ED6-9FCC-00312C79465A'";

module.exports = {
   
    getOneRedirectByID: function(){
        return db.executeQuery(util.format(apiData));
    }
}


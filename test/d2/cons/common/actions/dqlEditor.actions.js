var dqlEditorTabUI = require('./../ui/dqlEditorTab');

module.exports = {

    dqlEditorWidget: function () {
        dqlEditorTabUI.dqlEditorWidget();
    },
    dqlEditorQueryExecution: function (query, queryresult) {
        dqlEditorTabUI.dqlEditorQueryExecution(query, queryresult);
    },
    dqlEditorQueryUpdate: function (updatequery, selectquery, randomSubject) {
        dqlEditorTabUI.dqlEditorQueryUpdate(updatequery, selectquery, randomSubject);
    },
    dqlEditiorOption: function () {
        dqlEditorTabUI.dqlEditiorOption();
    },
    dqlEditorSQLQuery: function (query, WPSQLQuery) {
        dqlEditorTabUI.dqlEditorSQLQuery(query, WPSQLQuery);
    },
    dqlQueryExecution: function(query){
       return dqlEditorTabUI.dqlQueryExecution(query);
    }
    
}
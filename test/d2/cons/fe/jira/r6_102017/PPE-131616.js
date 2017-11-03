var functions = require('./../../../common/functions/functions');
var login = require('./../../../common/actions/login.actions');
var dqlEditorTab = require('./../../../common/actions/dqlEditor.actions');
var sort = require('./../../../common/actions/sorting.actions');

describe('Sorting in a folder that has +1000 assets PPE-131616', function () {
    before(function () {
        login.loginWithNewWindow({
            url: functions.getEnvTestUrl(),
            username: functions.getQAPublicationUser().username,
            password: functions.getQAPublicationUser().password
        });
        
    });

    it('Verify user is able to perform the descending sort by object name PPE-133004, Verify user is able to perform descending sort by object name in D2 and compare with the DQL for the folder has more than 1000+ assets PPE-133008, Verify user is able to perform the ascending sort by object name PPE-133005, Verify user is able to perform ascending sort by object name in D2 and compare with the DQL for the folder has more than 1000+ assets PPE-133009', function () {
      dqlEditorTab.dqlEditorWidget();
        var Namedescending = dqlEditorTab.dqlQueryExecution("select object_name from dm_sysobject where folder('/webmd/consumer_assets/editorial/articles/features/healthy_living/diet_and_nutrition')order by object_name desc");
        var NameAscending = dqlEditorTab.dqlQueryExecution("select object_name from dm_sysobject where folder('/webmd/consumer_assets/editorial/articles/features/healthy_living/diet_and_nutrition')order by object_name asc");

        sort.documentWidgetSelection();
        sort.folderSelectionFromFavortiesWidget("diet_and_nutrition");
        var AssertName= sort.descendingSort("object_name");
        expect(AssertName[0]).to.be.equal(Namedescending);
        var AssertName= sort.ascendingSort("object_name");
        expect(AssertName[0]).to.be.equal(NameAscending);
        var Modifydate= sort.descendingSort("r_modify_date");
          });

});


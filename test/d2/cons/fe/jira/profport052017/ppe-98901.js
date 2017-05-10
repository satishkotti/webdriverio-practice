var functions = require('./../../../common/functions/functions');
var login = require('./../../../common/actions/login.actions');
var findTab = require('./../../../common/actions/findTab.actions');
var chronicleId = "091e9c5e80ba1a7a";

describe('Find by Id Widget PPE-98901', function () {
    before(function () {
        login.login({
            url: functions.getEnvTestUrl(),
            username: functions.getQAPublicationUser().username,
            password: functions.getQAPublicationUser().password
        });
    });

    it('Should Find By Id Widget exists in left pane and verify the functionality', function () {
        findTab.verifyFindWidgetExistsInLeftContainer();
    });
    it('Verify if Find By Id Widget allows to search based on i_chronicle_id', function () {
        findTab.findByChronicleId(chronicleId);
    });
    it('Verify if Find By Id Widget allows to search based on any text other than i_chronicle_id', function () {
        findTab.findByText();
    });

});
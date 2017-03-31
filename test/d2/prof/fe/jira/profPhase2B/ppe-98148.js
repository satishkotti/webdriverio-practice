var functions = require('./../../../common/functions/functions');
var login = require('./../../../common/actions/login.actions');
var findTab = require('./../../../common/actions/findTab.actions');

describe('Find by Id Widget PPE-98148', function () {
    before(function () {
        login.login({
            url: functions.getEnvTestUrl(),
            username: functions.getQAPublicationUser().username,
            password: functions.getQAPublicationUser().password
        });
    });

    it('Should Find By Id Widget exists in left pane', function () {
        findTab.verifyFindWidgetExistsInLeftContainer();
    });
});
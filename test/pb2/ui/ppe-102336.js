var test = require('./../common/functions/functions');
var moment = require('moment-timezone');

describe('PPE-77199:Verify the default sort order on Activity Queue Page is by action date', () => {
    var assetDetails = {};
    var at1, at2;
    var chronID;
    var actionTimes;

    before(() => {

        test.LaunchAppAndLogin();
        test.EnterActivityQueueStatusPage();
        browser.pause(5000);
        actionTimes = browser.getText('//tbody//td[4]');

    });

    //assertions
    it('Default sort should be based on the action time', () => {
        var i = 0;
        var flag = true;
        while(i < actionTimes.length-1)
        {
            at1 = moment(actionTimes[i]);
            at2 = moment(actionTimes[i + 1]);

            if(at1 < at2)
            {
                flag = false;
            }
            i++;
        };
        expect(flag).to.be.true;
    });

});

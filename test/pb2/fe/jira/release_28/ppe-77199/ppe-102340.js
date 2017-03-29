var test = require('./../common/functions/functions');
var moment = require('moment-timezone');

describe('PPE-77199: Verify the ability to sort the Activity Queue Page results by Date', () => {
    var assetDetails = {};
    var actionDates = [];
    before(() => {

        test.LaunchAppAndLogin();
        test.EnterActivityQueueStatusPage();

    });

    //assertions
    it('Verify for Ascending Sort', () => {
        browser.waitForVisible('//tbody//td[4]');
        browser.pause(3000);
        test.EnableDisableAutoRefresh('Disable');
        browser.getText('//tbody//td[4]').forEach((each) => {
            actionDates.push(moment(each).format('x'));
        });
        actionDates.sort();
        test.SortTableColumn(null, 'Time of Action', 'Ascending');
        browser.pause(3000);
        var ascUISort = [];
        browser.getText('//tbody//td[4]').forEach((each) => {
            ascUISort.push(moment(each).format('x'));
        });

        var ofEqualLength = actionDates.length == ascUISort.length ? true : false;
        var flag;
        var count = 0;

        if (ofEqualLength) {
            while (count < actionDates.length) {
                if (actionDates[count] != ascUISort[count]) {
                    flag = false;
                }
                count++;
            }
        }
        expect(count == actionDates.length && flag != false).to.be.true;
    });

    it('Verify for Descending Sort', () => {

        actionDates.reverse();
        test.SortTableColumn(null, 'Time of Action', 'Descending');
        browser.pause(3000);
        var dscUISort = [];
        browser.getText('//tbody//td[4]').forEach((each) => {
            dscUISort.push(moment(each).format('x'));
        });

        var ofEqualLength = actionDates.length == dscUISort.length ? true : false;
        var flag;
        var count = 0;

        if (ofEqualLength) {
            while (count < actionDates.length) {
                if (actionDates[count] != dscUISort[count]) {
                    flag = false;
                }
                count++;
            }
        }
        expect(count == actionDates.length && flag != false).to.be.true;
    });
});
var test = require('./../common/functions/functions');

describe('PPE-77199: Verify the ability to sort the Activity Queue Page results by Action Name', () => {
    var actionNames = [];
    before(() => {

        test.LaunchAppAndLogin();
        test.EnterActivityQueueStatusPage();
        browser.pause(5000);
        test.EnableDisableAutoRefresh('Disable');
        actionNames = browser.getText('//tbody/tr/td[3]/span');
        actionNames.sort();
    });

     //assertions
    it('Verify for Ascending sort', () => {
        test.SortTableColumn(null, 'Action', 'Ascending');
        browser.pause(4000);
        var afterSortAsc = browser.getText('//tbody/tr/td[3]/span');
        var areOfEqualLength, areEqual = true;
        areOfEqualLength = actionNames.length == afterSortAsc.length ? true : false;
        if(areOfEqualLength)
        {
            for (var i = 0; i < actionNames.length; i++)
            {
                if(actionNames[i] != afterSortAsc[i])
                {
                    areEqual = false;
                }
            }
            expect(areOfEqualLength && areEqual).to.be.true;
        }
        
    });

    it('Verify for Descending sort', () => {
        test.SortTableColumn(null, 'Action', 'Descending');
        browser.pause(4000);
        actionNames.reverse();
        var afterSortDesc = browser.getText('//tbody/tr/td[3]/span');
        var areOfEqualLength, areEqual = true;
        areOfEqualLength = actionNames.length == afterSortDesc.length ? true : false;
        if(areOfEqualLength)
        {
            for (var i = 0; i < actionNames.length; i++)
            {
                if(actionNames[i] != afterSortDesc[i])
                {
                    areEqual = false;
                }
            }
            expect(areOfEqualLength && areEqual).to.be.true;
        }
        
    });
});
var page = require('./../../../common/page');
var locator = '';

var queue = Object.create(page, {

    statusFilter: {value: {get: (filter) => {
        switch (filter)
        {
            case 'Áll': 
            locator = '//li[@data-ng-click="filterByStatus(\'all\')"]';
            browser.waitForExist(locator); 
            return browser.element(locator); break;
            case 'Completed':
            locator = '//li[@data-ng-click="filterByStatus(\'ok\')"]';
            browser.waitForExist(locator); 
            return browser.element(locator); break;
            case 'Failed':
            locator = '//li[@data-ng-click="filterByStatus(\'failed\')"]';
            browser.waitForExist(locator); 
            return browser.element(locator); break;
            case 'In Progress':
            locator = '//li[@data-ng-click="filterByStatus(\'progress\')"]';
            browser.waitForExist(locator); 
            return browser.element(locator); break;
        }
    }}},
    getAssetDetailsFromQueue:
    {
        value: {
            get: (chronID) => {
                browser.waitForExist('#activityGrid');
                browser.waitForVisible('#activityGrid');
                locator = '//td[span[@chron="' + chronID + '"]]';
                var assetDetailsInQueue = {};
                browser.waitUntil( () => {
                    return browser.isExisting('#activityGrid tbody tr') == true;
                }, 30000, "Grid items not displayed", 1000);

                if (browser.isExisting(locator)) {

                    assetDetailsInQueue =
                        {
                            "ChronID": chronID,
                            "Name": browser.getText(locator + '//following-sibling::td[1]//span'),
                            "Action": browser.getText(locator + '//following-sibling::td[2]//span'),
                            "Time": browser.getText(locator + '//following-sibling::td[3]'),
                            "Site": browser.getText(locator + '//following-sibling::td[4]//span'),
                            "Status": browser.getText(locator + '//following-sibling::td[5]//span[contains(@class,"pb-activity-status")]')
                        };

                    return assetDetailsInQueue;
                }
                else {
                    return assetDetailsInQueue =
                        {
                            "ChronID": null,
                            "Name": null,
                            "Action": null,
                            "Time": null,
                            "Site": null,
                            "Status": null
                        }
                }

            }
        }
    }
});
module.exports =  queue;
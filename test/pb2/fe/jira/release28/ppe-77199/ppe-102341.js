var test = require('./../../../../common/functions/functions');

describe('PPE-77199: Verify the ability to sort the Activity Queue Page results by Action Name', () => {
    var assetDetails = {};
    before(() => {

        test.LaunchAppAndLogin();
        test.SearchFor(null, 'Irritable Bowel Syndrome Center New Feature Page', 'Interior Workcenter', 'Level 0/Centers - Health/Irritable Bowel Syndrome');
        var chronID = test.GetChronIDOfTheSelectedAsset();
        test.CheckoutAndEditTheAsset();
        test.SaveOrPublishTheAsset('Publish to Live', 'Testing activity queue');
        //enter into the Queue Page 
    });
    //assertions
    describe('Completed', () => {
        it('Should display Only Completed Results or No Results', () => {
            test.EnterActivityQueueStatusPage();
            test.FilterResultsInQueue('Completed');
            browser.pause(2000);
            if (browser.isExisting('.pb-activity-status.success')) {
                expect(browser.isExisting('.pb-activity-status.success')).to.be.true;
            }
            else {
                expect(browser.isExisting('.pb-activity-status.success')).to.be.false;
            }
       });
        it('Should not display InProgress Items', () => {
            expect(browser.isExisting('//span[@class="pb-activity-status"]')).to.be.false;
        });
        it('Should Not Display Failed items', () => {
            expect(browser.isExisting('.pb-activity-status.failed')).to.be.false;
        });
    });


    //assertions
    describe('InProgress', () => {
        it('Should not display Only Completed Results', () => {
            test.FilterResultsInQueue('In Progress');
            browser.pause(2000);
            expect(browser.isExisting('.pb-activity-status.success')).to.be.false;
        });
        it('Should display InProgress Items or No items', () => {
            if (browser.isExisting('//span[@class="pb-activity-status"]')) {
                expect(browser.isExisting('//span[@class="pb-activity-status"]')).to.be.true;
            }
            else {
                expect(browser.isExisting('//span[@class="pb-activity-status"]')).to.be.false;
            }
              });
        it('Should Not Display Failed items', () => {
            expect(browser.isExisting('.pb-activity-status.failed')).to.be.false;
        });
    });

    //assertions
    describe('failed', () => {
        it('Should not display Only Completed Results', () => {
            test.FilterResultsInQueue('Failed');
            browser.pause(2000);
            expect(browser.isExisting('.pb-activity-status.success')).to.be.false;
        });
        it('Should not display InProgress Items', () => {
            expect(browser.isExisting('//span[@class="pb-activity-status"]')).to.be.false;
        });
        it('Should Display Failed items or No items', () => {
            if (browser.isExisting('.pb-activity-status.failed')) {
                expect(browser.isExisting('.pb-activity-status.failed')).to.be.true;
            }
            else {
                expect(browser.isExisting('.pb-activity-status.failed')).to.be.false;
            }

        });
    });
});
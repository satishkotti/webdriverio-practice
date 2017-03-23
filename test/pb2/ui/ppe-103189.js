var test = require('./../common/functions/functions');
var moment = require('moment-timezone');

describe('PPE-77199:Verify Template Check In functionality from Edit Screen', () => {
    var assetDetails = {};
    var indT, nycT, actionTime;
    var chronID;
    var preData, postData;

    before(() => {

        test.LaunchAppAndLogin();
        test.SearchFor(null, 'Irritable Bowel Syndrome Center New Feature Page', 'Interior Workcenter', 'Level 0/Centers - Health/Irritable Bowel Syndrome');
        chronID = test.GetChronIDOfTheSelectedAsset();
        preData = test.GetAssetVersionAndStage('selected');
        test.CheckoutAndEditTheAsset();
        test.SaveOrPublishTheAsset('Publish to Live', 'Testing activity queue');
        test.EnterActivityQueueStatusPage();
        browser.waitUntil(() => {
            assetDetails = test.GetAssetDetailsFromQueue(chronID);
            return assetDetails.Status != 'IN PROGRESS';
        }, 120000, "Asset not pushed to the publishing queue yet", 30000);

        test.SearchFor('Page', 'Irritable Bowel Syndrome Center New Feature Page', 'Global Search', null);
        test.SelectAsset('Irritable Bowel Syndrome Center New Feature Page');
        preData = test.GetAssetVersionAndStage('selected');
        test.EditTheAsset();

        indT = moment().tz('Asia/Kolkata');
        nycT = indT.clone().tz('America/New_York');
        test.SaveOrPublishTheAsset('Checkin', 'Activty Queue publish to live');

    });

    //assertions
    it('Page Version should be incremented by 1 when checked in', () => {
        test.EnterIWC('Edit', 'Templates & Pages');
        test.SelectAsset('Irritable Bowel Syndrome Center New Feature Page');
        postData = test.GetAssetVersionAndStage('selected');
        expect(postData.version).to.equal(preData.version + 1.0);
    });

    it('Page must have wip label when checked in', () => {
        expect(postData.stage).to.equal('wip');
    });

    it('Page checkin must be sync; no action for checkin must be present in the activity status queue screen', () => {
        test.EnterActivityQueueStatusPage();

        browser.waitUntil(() => {
            assetDetails = test.GetAssetDetailsFromQueue(chronID);
            return assetDetails.Status != 'IN PROGRESS';
        }, 120000, "Asset not pushed to the publishing queue yet", 30000);

        actionTime = moment(assetDetails.Time);
        expect(actionTime < nycT).to.be.true;
    });

});

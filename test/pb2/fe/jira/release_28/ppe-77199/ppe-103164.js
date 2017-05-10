var test = require('./../../../../common/functions/functions');
var moment = require('moment-timezone');

describe('PPE-77199:Verify Template Cancel Checkout functionality from Edit Screen', () => {
    var assetDetails = {};
    var indT, nycT, actionTime;
    var chronID;
    var preData, postData;

    before(() => {

        test.LaunchAppAndLogin();
        test.SearchFor(null, 'Irritable Bowel Center Harmony Flexible Template', 'Interior Workcenter', 'Level 0/Centers - Health/Irritable Bowel Syndrome');
        chronID = test.GetChronIDOfTheSelectedAsset();
        test.CheckoutAndEditTheAsset();
        test.SaveOrPublishTheAsset('Publish to Live', 'Testing activity queue');
        test.EnterActivityQueueStatusPage();
        browser.waitUntil(() => {
            assetDetails = test.GetAssetDetailsFromQueue(chronID);
            return assetDetails.Status != 'IN PROGRESS';
        }, 120000, "Asset not pushed to the publishing queue yet", 30000);

        test.SearchFor('Template', 'Irritable Bowel Center Harmony Flexible Template', 'Global Search', null);
        test.SelectAsset('Irritable Bowel Center Harmony Flexible Template');
        preData = test.GetAssetVersionAndStage('selected');
        test.EditTheAsset();

        indT = moment().tz('Asia/Kolkata');
        nycT = indT.clone().tz('America/New_York');
        test.CancelCheckout();

    });

    //assertions
    it('Template Version should match that of the previous vesrion when the checkout is cancelled', () => {
        test.EnterIWC('Edit', 'Templates & Pages');
        test.SelectAsset('Irritable Bowel Center Harmony Flexible Template');
        postData = test.GetAssetVersionAndStage('selected');
        expect(postData.version).to.equal(preData.version);
    });

    it('Template must have active label when the checkout is cancelled', () => {
        expect(postData.stage).to.equal('active');
    });

    it('Template cancel checkout from edit screen must be sync; no action for checkin must be present in the activity status queue screen', () => {
        test.EnterActivityQueueStatusPage();

        browser.waitUntil(() => {
            assetDetails = test.GetAssetDetailsFromQueue(chronID);
            return assetDetails.Status != 'IN PROGRESS';
        }, 120000, "Asset not pushed to the publishing queue yet", 30000);

        actionTime = moment(assetDetails.Time);
        expect(actionTime < nycT).to.be.true;
    });

});

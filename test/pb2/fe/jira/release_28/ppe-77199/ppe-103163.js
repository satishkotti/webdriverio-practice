var test = require('./../common/functions/functions');
var moment = require('moment-timezone');

describe('PPE-77199:Verify Template Check In functionality from Edit Screen', () => {
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
        
        test.SearchFor('Template', 'Irritable Bowel Center Harmony Flexible Template', 'Global Search', null);
        test.SelectAsset('Irritable Bowel Center Harmony Flexible Template');
        preData = test.GetAssetVersionAndStage('selected');

        test.EnterActivityQueueStatusPage();
        browser.waitUntil(() => {
            assetDetails = test.GetAssetDetailsFromQueue(chronID);
            return assetDetails.Status != 'IN PROGRESS';
        }, 120000, "Asset not pushed to the publishing queue yet", 30000);

        test.SearchFor('Template', 'Irritable Bowel Center Harmony Flexible Template', 'Global Search', null);
        test.SelectAsset('Irritable Bowel Center Harmony Flexible Template');
        test.EditTheAsset();

        indT = moment().tz('Asia/Kolkata');
        nycT = indT.clone().tz('America/New_York');
        test.SaveOrPublishTheAsset('Save', 'Activty Queue publish to live');

    });

    //assertions
    it('Template Version should be incremented by 1 when checked in', () => {
        test.EnterIWC('Edit', 'Templates & Pages');
        test.SelectAsset('Irritable Bowel Center Harmony Flexible Template');
        postData = test.GetAssetVersionAndStage('selected');
        expect(postData.version).to.equal(preData.version + 1.0);
    });

    it('Template must have wip label when checked in', () => {
        expect(postData.stage).to.equal('wip');
    });

    it('Template checkin must be sync; no action for checkin must be present in the activity status queue screen', () => {
        test.EnterActivityQueueStatusPage();

        browser.waitUntil(() => {
            assetDetails = test.GetAssetDetailsFromQueue(chronID);
            return assetDetails.Status != 'IN PROGRESS';
        }, 120000, "Asset not pushed to the publishing queue yet", 30000);

        actionTime = moment(assetDetails.Time);
        expect(actionTime < nycT).to.be.true;
    });

});

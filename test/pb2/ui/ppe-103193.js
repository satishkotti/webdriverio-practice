var test = require('./../common/functions/functions');
var moment = require('moment-timezone');

describe('PPE-77199:Verify Page Cancel Check Out functionality from Checked Out Objects widget', () => {

    var assetDetails = {};
    var preData = {};
    var postData = {};
    var testAsset = 'Irritable Bowel Syndrome Center New Feature Page';
    var beforeCC = '';
    var actionTime = '';
    var chronID;

    before(() => {

        test.LaunchAppAndLogin();
        test.SearchFor(null, testAsset, 'Interior Workcenter', 'Level 0/Centers - Health/Irritable Bowel Syndrome');
        chronID = test.GetChronIDOfTheSelectedAsset();
        test.CheckoutAndEditTheAsset();
        test.SaveOrPublishTheAsset('Publish to Live', 'Testing Activity Queue');
        test.EnterActivityQueueStatusPage();
        browser.waitUntil(() => {
            assetDetails = test.GetAssetDetailsFromQueue(chronID);
            return assetDetails.Status != 'IN PROGRESS';
        }, 120000, "Asset not pushed to the publishing queue yet", 20000);

    });

    //assertions
    it('No entry should be present in the Activity Status Queue when the asset is cancelled checkout from Edit Screen', () => {
        test.SearchFor(null, chronID, 'Global Search', null);
        preData = test.GetAssetVersionAndStage(null, 'Asset Screen');
        test.EditTheAsset();
        test.NavigateToHomepage();
        test.SearchFor(null, chronID, 'Global Search', null);
        beforeCC = moment().tz('Asia/Kolkata').clone().tz('America/New_York').format('x');
        test.CancelCheckout();
        test.EnterActivityQueueStatusPage();
        browser.pause(3000);
        assetDetails = test.GetAssetDetailsFromQueue(chronID);
        actionTime = moment(assetDetails.Time).format('x');
        expect(actionTime < beforeCC).to.be.true;
    });

    it('Site should be the current Site under test', () => {
        expect(assetDetails.Site).to.equal(test.GetCurrentSite());
    });

    it('Version of the asset should remain the same after Cancel Checkout', () => {
        test.SearchFor(null, chronID, 'Global Search', null);
        postData = test.GetAssetVersionAndStage(null, 'Asset Screen');
        expect(postData.version).to.equal(preData.version);
    });

    it('Stage of the asset should remain the same after Cancel Checkout', () => {
        expect(postData.stage).to.equal(preData.stage);
    })

});

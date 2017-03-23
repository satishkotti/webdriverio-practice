var test = require('./../common/functions/functions');
var moment = require('moment-timezone');

describe('PPE-77199:Verify Template Check In functionality from Edit Screen', () => {
    var assetDetails = {};
    var indT, nycT, actionTime;
    var chronID;
    var preData, postData;

    before(() => {

        test.LaunchAppAndLogin();
        test.SearchFor('SM', 'healthy-blood-sugar-levels-quiz-results', 'Global Search', null);
        test.SelectAsset('healthy-blood-sugar-levels-quiz-results');
        chronID = test.GetChronIDOfTheSelectedAsset('Search Results');
        test.EditTheAsset();
        test.SaveOrPublishTheAsset('Publish to Live', 'Testing activity queue');
        test.EnterActivityQueueStatusPage();
        browser.waitUntil(() => {
            assetDetails = test.GetAssetDetailsFromQueue(chronID);
            return assetDetails.Status != 'IN PROGRESS';
        }, 120000, "Asset not pushed to the publishing queue yet", 20000);

        test.SearchFor('SM', 'healthy-blood-sugar-levels-quiz-results', 'Global Search', null);
        test.SelectAsset('healthy-blood-sugar-levels-quiz-results');
        preData = test.GetAssetVersionAndStage('selected');
        test.EditTheAsset();

        indT = moment().tz('Asia/Kolkata');
        nycT = indT.clone().tz('America/New_York');
        test.SaveOrPublishTheAsset('Checkin', 'Testing activity queue');

    });

    //assertions
    it('Shared Module Version should be incremented by 1 when checked in', () => {
        test.SearchFor('SM', 'healthy-blood-sugar-levels-quiz-results', 'Global Search', null);
        test.SelectAsset('healthy-blood-sugar-levels-quiz-results');
        postData = test.GetAssetVersionAndStage('selected');
        expect(postData.version).to.equal(preData.version + 1.0);
    });

    it('Shared Module must have wip label when checked in', () => {
        expect(postData.stage).to.equal('wip');
    });

    it('Shared Module checkin must be sync; no action for checkin must be present in the activity status queue screen', () => {
        test.EnterActivityQueueStatusPage();

        browser.waitUntil(() => {
            assetDetails = test.GetAssetDetailsFromQueue(chronID);
            return assetDetails.Status != 'IN PROGRESS';
        }, 120000, "Asset not pushed to the publishing queue yet", 30000);

        actionTime = moment(assetDetails.Time);
        expect(actionTime < nycT).to.be.true;
    });

});

var test = require('./../../../../common/functions/functions');
var smTestData = require('./../../../../data/sm.assets');

describe('PPE-77199:Verify Page Expire functionality from Search Results Screen', () => {
    var assetDetails = {};
    var preData = {};
    var postData = {};
    var testAssetDetails = smTestData.htmlModule;
    var testAsset = testAssetDetails.moduleName;
    before(() => {

        test.LaunchAppAndLogin();
        test.Create('Shared Module', testAssetDetails);
        test.SaveOrPublishTheAsset('Publish to Live', 'Testing Activity Status Queue');
        test.SearchFor('SM', testAsset, 'Global Search', null);
        test.SelectAsset(testAsset);
        var chronID = test.GetChronIDOfTheSelectedAsset('Search Results');
        preData = test.GetAssetVersionAndStage('selected');
        test.EnterActivityQueueStatusPage();
        browser.waitUntil(() => {
            assetDetails = test.GetAssetDetailsFromQueue(chronID);
            return assetDetails.Status != 'IN PROGRESS';
        }, 120000, "Asset not pushed to the publishing queue yet", 20000);
        test.SearchFor('SM', testAsset, 'Global Search', null);
        test.SelectAsset(testAsset);
        test.SelectMoreActionsMenuItem('Expire');

        //enter into the Queue Page  
        test.EnterActivityQueueStatusPage();

        browser.waitUntil(() => {
            assetDetails = test.GetAssetDetailsFromQueue(chronID);
            return assetDetails.Status != 'IN PROGRESS';
        }, 120000, "Asset not pushed to the publishing queue yet", 20000);

    });

    //assertions
    it('Page Name should be QASM-ActivtyQueue-xxxxx', () => {
        expect(assetDetails.Name).to.equal(testAsset);
    });

    it('Action should be Expire Page', () => {
        expect(assetDetails.Action).to.equal('Expire Shared Module');
    });

    it('Site should be the current Site under test', () => {
        expect(assetDetails.Site).to.equal(test.GetCurrentSite());
    });

    it('Version of the asset should remain the same after expiring the asset', () => {
        test.SearchFor('SM', testAsset, 'Global Search', null);
        test.ClickShowExpired();
        browser.click('//uib-tab-heading[contains(.,"Shared Modules")]');
        test.SelectAsset(testAsset);
        postData = test.GetAssetVersionAndStage('selected');
        expect(postData.version).to.equal(preData.version);
    });

    it('Stage of the asset should be expired after expiring the asset', () => {
        expect(postData.stage).to.equal('expired');
    });

});

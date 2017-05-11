var test = require('./../../../../common/functions/functions');

describe('PPE-77199:Verify Page Publish to Staging functionality from Edit Screen', () => {

    var assetDetails = {};

    before(() => {
        
        test.LaunchAppAndLogin();
        test.SearchFor(null, 'Irritable Bowel Syndrome Center New Feature Page', 'Interior Workcenter', 'Level 0/Centers - Health/Irritable Bowel Syndrome');
        var chronID = test.GetChronIDOfTheSelectedAsset();
        var preData = test.GetAssetVersionAndStage('selected');
        test.CheckoutAndEditTheAsset();
        test.SaveOrPublishTheAsset('Publish to Staging', 'Testing activity queue');
        test.EnterActivityQueueStatusPage();
        browser.waitUntil( () => 
        {
            assetDetails = test.GetAssetDetailsFromQueue(chronID);
            return assetDetails.Status != 'IN PROGRESS';
        }, 120000, "Asset not pushed to the publishing queue yet", 10000);
        
        assetDetails = test.GetAssetDetailsFromQueue(chronID);

    });

    //assertions
    it('Page Name should be Irritable Bowel Syndrome Center New Feature Page', () => {
        expect(assetDetails.Name).to.equal('Irritable Bowel Syndrome Center New Feature Page');
    });

    it('Page Action should be Publish Page', () => {
        expect(assetDetails.Action).to.equal('Publish Page');
    });
    
    it('Site should be the current Site under test', () => {
        expect(assetDetails.Site).to.equal(test.GetCurrentSite());
    });
});
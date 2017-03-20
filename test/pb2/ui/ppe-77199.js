var test = require('./../common/functions/functions');

describe('Page Flows - Publish to Live', () => {

    before(() => {
        
        test.LaunchAppAndLogin();
        test.SearchFor(null, 'Irritable Bowel Syndrome Center New Feature Page', 'Interior Workcenter', 'Level 0/Centers - Health/Irritable Bowel Syndrome');
        var chronID = test.GetChronIDOfTheSelectedAsset();
        var preData = test.GetAssetVersionAndStage('selected');
        test.CheckoutAndEditTheAsset();
        test.SaveOrPublishTheAsset('Publish to Live', 'Testing activity queue');
        test.EnterActivityQueueStatusPage();
        var assetDetails = {};
        browser.waitUntil( () => 
        {
            assetDetails = test.GetAssetDetailsFromQueue(chronID);
            return assetDetails.Status[0] != 'IN PROGRESS';
        }, 120000, "Asset not pushed to the publishing queue yet", 30000);

    });

    //assertions
    it('Page Name should be Irritable Bowel Syndrome Center New Feature Page', () => {
        expect(assetDetails.Name[0]).to.equal('Irritable Bowel Syndrome Center New Feature Page');
    });

    it('Page Action should be Publish Page', () => {
        expect(assetDetails.Action[0]).to.equal('Publish Page');
    });
    
    it('Site should be the current Site under test', () => {
        expect(assetDetails.Site[0]).to.equal(test.GetCurrentSite());
    });
});
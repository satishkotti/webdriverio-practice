var test = require('./../common/functions/functions');

describe('Page Flows', () => {

    it('Publish to Live', () => {

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
        }, 120000, "Asset not pushed to the publishing queue yet", 10000);
        
        //assertions
        expect(assetDetails.Name[0]).to.equal('Irritable Bowel Syndrome Center New Feature Page');
        expect(assetDetails.Action[0]).to.equal('Publish Page');
        expect(assetDetails.Site[0]).to.equal(test.GetCurrentSite());


    });
    
});
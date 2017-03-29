var test = require('./../../../../common/functions/functions');

describe('PPE-77199:Verify Shared Module Cancel Check Out functionality from Search Results Screen', () => {
  var assetDetails = {};
  var preData = {};
  var postData = {};
  
  var testAsset = 'healthy-blood-sugar-levels-quiz-results';
    before(() => {
        
         test.LaunchAppAndLogin();
         test.SearchFor('SM', testAsset, 'Global Search', null);
         test.SelectAsset(testAsset);
         var chronID = test.GetChronIDOfTheSelectedAsset('Search Results');
         preData = test.GetAssetVersionAndStage('selected');
         test.EditTheAsset();
         test.NavigateToHomepage();
         test.SearchFor('SM', testAsset, 'Global Search', null);
         test.SelectAsset(testAsset);
         test.SelectMoreActionsMenuItem('Cancel Checkout');

        //enter into the Queue Page  
        test.EnterActivityQueueStatusPage();       
        
        browser.waitUntil( () => 
        {
            assetDetails = test.GetAssetDetailsFromQueue(chronID);
            return assetDetails.Status != 'IN PROGRESS';
        }, 120000, "Asset not pushed to the publishing queue yet", 20000);

    });
   
    //assertions
    it('Shared Module Name should be healthy-blood-sugar-levels-quiz-results', () => {
        expect(assetDetails.Name).to.equal(testAsset);
    });

    it('Action should be Cancel Checkout Page', () => {
        expect(assetDetails.Action).to.equal('Cancel Checkout Shared Module');
    });
    
    it('Site should be the current Site under test', () => {
        expect(assetDetails.Site).to.equal(test.GetCurrentSite());
    });

    it('Version of the asset should remain the same after Cancel Checkout', () => {
        test.SearchFor('SM', testAsset, 'Global Search', null);
        test.SelectAsset(testAsset);
        postData = test.GetAssetVersionAndStage('selected');
        expect(postData.version).to.equal(preData.version);
    });

    it('Stage of the asset should remain the same after Cancel Checkout', () => {
        expect(postData.stage).to.equal(preData.stage);
    })
   
});

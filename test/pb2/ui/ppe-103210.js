var test = require('./../common/functions/functions');
var pageTestData = require('./../data/page.assets');

describe('PPE-77199:Verify Shared Module Publish to Staging functionality from Edit Screen', () => {
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
         test.SaveOrPublishTheAsset('Publish to Staging', 'Testing Activity Status Queue');

         //enter activity queue page
         test.EnterActivityQueueStatusPage();
         browser.waitUntil( () => 
            {
                assetDetails = test.GetAssetDetailsFromQueue(chronID);
                return assetDetails.Status != 'IN PROGRESS';
            }, 120000, "Asset not pushed to the publishing queue yet", 20000);
    });
   
    //assertions
    it('Page Name should be healthy-blood-sugar-levels-quiz-results', () => {
        expect(assetDetails.Name).to.equal(testAsset);
    });

    it('Action should be Publish Shared Module', () => {
        expect(assetDetails.Action).to.equal('Publish Shared Module');
    });
    
    it('Site should be the current Site under test', () => {
        expect(assetDetails.Site).to.equal(test.GetCurrentSite());
    });

    it('Version of the asset should increment by 1 after publishing the asset', () => {
        test.SearchFor('SM', testAsset, 'Global Search', null);
        test.SelectAsset(testAsset);
        postData = test.GetAssetVersionAndStage('selected');
        expect(postData.version).to.equal(preData.version + 1.0);
    });

    it('Stage of the shared module should be active after publishing it to staging', () => {
        expect(postData.stage).to.equal('staging');
    });
   
});

var common = require('./../../common/commonLib');
var data = require('./../../data/testRunConfig');

describe('PB2 Favorite and Unfavorite', function () {

    it('Should create Favorite and Unfavorite for Template from Edit Template & Pages', function () {

        templatePageToggeleFav(data.expectedResults.baseTemplateName, data.expectedResults.level0NavMapNodeId)
    });

    it('Should create Favorite and Unfavorite for Page from Edit Template & Pages', function () {

        templatePageToggeleFav(data.expectedResults.errorPage, data.expectedResults.level0NavMapNodeId)
    });

    it('Should create Favorite and Unfavorite for Node from Edit site structure', function () {

        browser.clickHome();
        browser.selectEditTemplatesAndPages();
        var nodeId = browser.getWorkcenterNavMapNodeId();
        expect(nodeId).to.equal(nodeId);

        browser.toggleFavoriteForNode();
        browser.clickHome();
        expect(browser.isFavoriteSaved(data.expectedResults.level0NodeDisplayName)).to.true;

        browser.selectEditTemplatesAndPages();
        browser.toggleFavoriteForNode();
        browser.clickHome();
        expect(browser.isFavoriteSaved(data.expectedResults.level0NodeDisplayName)).to.false;
    });
    it.skip('Should create Favorite and Unfavorite for Search Query', function () {

          throw new Error("Add Test");
    });

    it.skip('Should create Favorite and Unfavorite for Sharedmodule', function () {

         throw new Error("Add Test");
    });
    var templatePageToggeleFav = function(objectName, nodeId) {
        browser.selectEditTemplatesAndPages();
        var nodeId =browser.getWorkcenterNavMapNodeId();
        expect(nodeId).to.equal(nodeId);

        browser.selectNodeResultGridRowByName(objectName);
        browser.toggleFavoriteFromWorkcenter();
        browser.clickHome();
        expect(browser.isFavoriteSaved(objectName)).to.true;

        browser.selectEditTemplatesAndPages();
        browser.selectNodeResultGridRowByName(objectName);
        browser.toggleFavoriteFromWorkcenter();
        browser.clickHome();
        expect(browser.isFavoriteSaved(objectName)).to.false;
    }

before( function(){
      browser.addCommand('login', common.login.bind(browser));
      browser.addCommand('selectEditTemplatesAndPages', common.selectEditTemplatesAndPages.bind(browser));
      browser.addCommand('getWorkcenterNavMapNodeId', common.getWorkcenterNavMapNodeId.bind(browser)); 
      browser.addCommand('selectNodeResultGridRowByName', common.selectNodeResultGridRowByName.bind(browser));
      browser.addCommand('toggleFavoriteFromWorkcenter', common.toggleFavoriteFromWorkcenter.bind(browser));
      browser.addCommand('isFavoriteSaved', common.isFavoriteSaved.bind(browser));
      browser.addCommand('clickHome', common.clickHome.bind(browser));
      browser.addCommand('toggleFavoriteForNode', common.toggleFavoriteForNode.bind(browser));
      
      browser.setViewportSize({
            width: 1024,
            height: 768
        });
      browser.login(data.testData);
      
      //clean up fav if exits.
    });
});


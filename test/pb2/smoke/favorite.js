var common = require('./../common/commonLib');
var data = require('./../data/testRunConfig');

describe('PB2 Favorite and Unfavorite Tests', function () {

    it.only('Should create Favorite and Unfavorite for Template', function () {
        
        browser.selectEditTemplatesAndPages();
        var nodeId = browser.getWorkcenterNavMapNodeId();
        expect(nodeId).to.equal(data.expectedResults.level0NavMapNodeId);

        browser.selectNodeResultGridRowByName(data.expectedResults.baseTemplateName);
        
        debugger
        browser.setFavorite();
        browser.clickHome();
        var favName = browser.getFavoriteByName(data.expectedResults.baseTemplateName);

        expect(favName).to.equal(data.expectedResults.baseTemplateName);
    });

    it('Should create Favorite and Unfavorite for Page', function () {
        
    });

    it('Should create Favorite and Unfavorite for Search Query', function () {
    });

    it('Should create Favorite and Unfavorite for Node', function () {
    });

    it('Should create Favorite and Unfavorite for Sharedmodule', function () {
    });

before( function(){
      browser.addCommand('login', common.login.bind(browser));
      browser.addCommand('selectEditTemplatesAndPages', common.selectEditTemplatesAndPages.bind(browser));
      browser.addCommand('getWorkcenterNavMapNodeId', common.getWorkcenterNavMapNodeId.bind(browser)); 
      browser.addCommand('selectNodeResultGridRowByName', common.selectNodeResultGridRowByName.bind(browser));
      browser.addCommand('setFavorite', common.setFavorite.bind(browser));
      browser.addCommand('getFavoriteByName', common.getFavoriteByName.bind(browser));
      browser.addCommand('clickHome', common.clickHome.bind(browser));
      
      browser.login(data.testData);
    });
});


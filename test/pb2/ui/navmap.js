var LoginPage = require('./../common/pbLogin');
var common = require('./../common/commonLib');
var data = require('./../data/testRunConfig');

describe('PB2 Navigation Map Tests', function () {

     it('Should display NavMap node id in interior work center from Create menu - PPE-72925', function () {

         browser.login(data.testData);
         browser.selectCreateTemplatesAndPages();
         var nodeId = browser.getWorkcenterNavMapNodeId();
         expect(nodeId).to.equal(data.expectedResults.level0NavMapNodeId);
    });

    it('Should display NavMap node id in interior work center from Edit menu - PPE-72925', function () {
        browser.selectEditTemplatesAndPages();
        var nodeId = browser.getWorkcenterNavMapNodeId();
        expect(nodeId).to.equal(data.expectedResults.level0NavMapNodeId);

    });

before( function(){
      browser.addCommand('login', common.login.bind(browser));
      browser.addCommand('getUrlAndTitle', common.getUrlAndTitle.bind(browser));
      browser.addCommand('selectCreateTemplatesAndPages', common.selectCreateTemplatesAndPages.bind(browser));
      browser.addCommand('getWorkcenterNavMapNodeId', common.getWorkcenterNavMapNodeId.bind(browser)); 
      browser.addCommand('selectEditTemplatesAndPages', common.selectEditTemplatesAndPages.bind(browser));
});
});
var LoginPage = require('./../common/pbLogin');
var common = require('./../common/commonLib');
var data = require('./../data/testRunConfig');

describe('PB2 Navigation Map Tests', function () {

     it('Should display site structure nodes when Edit Site Structure from menu selected - PPE-81340', function () {
         browser.selectSiteStructureFromEdit();
         var node = browser.getSiteStructureNavMapNodeIdAndName();
         expect(node.id).to.equal(data.expectedResults.level0NodeId); //verify node id
         expect(node.displayName).to.equal(data.expectedResults.level0NodeDisplayName); //verify node display name
         
         var tabs = browser.getSiteStructureNavMapTabsNames(); //verify two tabs exist
         expect(tabs.nodePropTab).to.equal(data.expectedResults.nodePropTab); //verify node id
         expect(tabs.nodeCQTab).to.equal(data.expectedResults.nodeCQTab); //verify node display name
    });

    it('Should display site structure nodes when Edit Site Structure from interior work center dropdown menu selected - PPE-81340', function () {
        
         browser.selectSiteStructureFromInteriorMenu();
         var node = browser.getSiteStructureNavMapNodeIdAndName();
         expect(node.id).to.equal(data.expectedResults.level0NodeId); //verify node id
         expect(node.displayName).to.equal(data.expectedResults.level0NodeDisplayName); //verify node display name

        var tabs = browser.getSiteStructureNavMapTabsNames(); //verify two tabs exist
         expect(tabs.nodePropTab).to.equal(data.expectedResults.nodePropTab); //verify node id
         expect(tabs.nodeCQTab).to.equal(data.expectedResults.nodeCQTab); //verify node display name
    });


before( function(){
      browser.addCommand('login', common.login.bind(browser));
      browser.addCommand('selectSiteStructureFromEdit', common.selectSiteStructureFromEdit.bind(browser));
      browser.addCommand('getSiteStructureNavMapNodeIdAndName', common.getSiteStructureNavMapNodeIdAndName.bind(browser));
      browser.addCommand('selectSiteStructureFromInteriorMenu', common.selectSiteStructureFromInteriorMenu.bind(browser));
      browser.addCommand('getSiteStructureNavMapTabsNames', common.getSiteStructureNavMapTabsNames.bind(browser));
      
      browser.login(data.testData);
    });
});
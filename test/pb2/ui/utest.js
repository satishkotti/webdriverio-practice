
var func = require('./../common/functions/functions');
var pageTestData = require('./../data/page.assets');
var templateTestData = require('./../data/template.assets');
var smTestData = require('./../data/sm.assets');
var pmTestData = require('./../data/pagemodule.assets');

describe('Unit Tests', () => {

    it('Launch App and login', () => {
        func.LaunchAppAndLogin();
    });

    it.skip('Enter Interior Workcenter', () => {
        func.EnterIWC('Create', 'Templates & Pages');
    });

    it.skip('Traverse Site Structure', () => {
        func.TraverseSS('Level 0/zTest/zSubTest1');
    });

    it.skip('Add Normal Standalone Page to the Node', () => {
        func.Create('Page', pageTestData.normalStandalonePage);
    });

    it.skip('Add a page module', () => {
        func.AddModule('ContentPane0', pmTestData.adModule);
    })

    it.skip('Add Normal Standalone Template to the Node', () => { 
        func.Create('Template', templateTestData.normalStandaloneTemplate);
    });

    it.skip('Create a Shared Module', () => { 
        func.Create('Shared Module', smTestData.adModule);
    });

    it.skip('Sreach using Chronicle ID in global search', () => {
        func.SearchFor(null, '091e9c5e81521752', 'Global Search', null);
        expect(browser.getTitle()).to.equal('QA-Test-Page-SponsorBox-omOCG - WebMD PageBuilder');
    });

    it.skip('Sreach using Keyword in global search', () => {
        func.SearchFor('Pages', 'test', 'Global Search', null);
        expect(browser.elements('span[data-ng-hide="pLoading"]').value.length).to.equal(1);
    });

    it('Sreach using Interior Workcenter', () => {
        func.SearchFor(null, '02QATestPage002', 'Interior Workcenter', 'Level 0/zTest/zSubTest1');
        expect(browser.elements('//tr[@aria-selected="true"]//td[contains(.,"02QATestPage002")]').value.length).to.equal(1);
    });
    
});
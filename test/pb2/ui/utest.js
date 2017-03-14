
var func = require('./../common/functions/functions');
var pageTestData = require('./../data/page.assets');
var templateTestData = require('./../data/template.assets');
var smTestData = require('./../data/sm.assets');
var pmTestData = require('./../data/pagemodule.assets');

describe('Unit Tests', () => {

    it('Launch App and login', () => {
        func.LaunchAppAndLogin();
    });

    it('Enter Interior Workcenter', () => {
        func.EnterIWC('Create', 'Templates & Pages');
    });

    it('Traverse Site Structure', () => {
        func.TraverseSS('Level 0/zTest/zSubTest1');
    });

    it('Add Normal Standalone Page to the Node', () => {
        func.Create('Page', pageTestData.normalStandalonePage);
    });

    it('Add a page module', () => {
        func.AddModule('ContentPane0', pmTestData.adModule);
    })

    it.skip('Add Normal Standalone Template to the Node', () => { 
        func.Create('Template', templateTestData.normalStandaloneTemplate);
    });

    it.skip('Create a Shared Module', () => { 
        func.Create('Shared Module', smTestData.adModule);
    });
    
});
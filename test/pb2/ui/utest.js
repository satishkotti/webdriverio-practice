<<<<<<< HEAD
var func = require('./../common/functions/functions');
var pageTestData = require('./../data/page.assets');
var templateTestData = require('./../data/template.assets');

describe('Unit Tests', () => {
=======
var func = require('./../common/functions/functions')

describe('U-Tests', () => {
>>>>>>> 02aa792cb553da063878b037d5c1787c0272f85f

    it('Launch App and login', () => {
        func.LaunchAppAndLogin();
    });

    it('Enter Interior Workcenter', () => {
        func.EnterIWC('Create', 'Templates & Pages');
    });

    it('Traverse Site Structure', () => {
        func.TraverseSS('Level 0/zTest/zSubTest1');
    });

<<<<<<< HEAD
    it.skip('Add Normal Standalone Page to the Node', () => {
        func.Create('Page', pageTestData.normalStandalonePage);
    });

    it('Add Normal Standalone Template to the Node', () => { 
        func.Create('Template', templateTestData.normalStandaloneTemplate);
=======
    it('Add to Node', () => {
        func.AddToNode('Page', null);
>>>>>>> 02aa792cb553da063878b037d5c1787c0272f85f
    });
    
});
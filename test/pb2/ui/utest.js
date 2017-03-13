var func = require('./../common/functions/functions')

describe('U-Tests', () => {

    it('Launch App and login', () => {
        func.LaunchAppAndLogin();
    });

    it('Enter Interior Workcenter', () => {
        func.EnterIWC('Create', 'Templates & Pages');
    });

    it('Traverse Site Structure', () => {
        func.TraverseSS('Level 0/zTest/zSubTest1');
    });

    it('Add to Node', () => {
        func.AddToNode('Page', null);
    });
    
});
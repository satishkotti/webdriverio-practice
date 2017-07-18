//Constants
const test = require('./../../../../common/functions/functions');

//Tests
describe('PPE-94120: Ability to Create/Edit Site XSL/CSS outside of PB', () => {

    it('PPE-120822: Verify whether XSL is versioned up and Published to Staging'
        + 'when changes made to an existing XSL are committed and build is generated'
        + 'and deployed successfully', () => {



        });

    it('PPE-120823: Verify whether appropriate relations are updated when existing XSL'
        + 'is successfully published to Staging', () => {

        });

    it('PPE-120824: Verify whether XSL is versioned up and Published to Staging'
        + 'when new XSL is committed and build is generated and deployed successfully', () => {

        });

    it('PPE-120825: Verify whether appropriate relations are created when new XSL'
        + 'is successfully published to Staging', () => {

        });

    describe('PPE-120826: Verify whether XSL is not versioned up when CSS files are missing from the build', () => {

        before(() => {
            //Launch PB2 app and login
            test.LaunchAppAndLogin();

            //Search for the required XSL using global search
            test.SearchFor('XSL', '', 'Global Search', null); // <--- Replace with valid keyword
        })

        it('PPE-120826: Verify whether XSL is not versioned up when CSS files are missing from the build', () => {
            
        });

    });

    it('PPE-120827: Verify whether XSL is not versioned up when JS files are missing from the build', () => {
        
    });

    it('PPE-120828: Verify whether XSL is not versioned up when metadata.xml file is missing from the build', () => {
        
    });

    it('PPE-120830: Verify whether XSL is not versioned up when metadata.xml file is not well formed', () => {

    });

    it('PPE-120831: Verify whether XSL is not versioned up when CSS files are not changed', () => {
        
    });

    it('PPE-120832: Verify whether XSL is not versioned up when JS files are not changed', () => {
        
    });
});
/*
** Imports
** 1. PB2 functions
** 2. Test data file
** 3. Asset Properties Fields
*/
const pb2 = require('../../../../common/functions/functions.js');
const testdata = require('../../../../data/testdata/ppe-96474.testdata').fe;
const fields = require('../../../../common/elements/assetprops.page');

/*
** Describe: User Story
*/
describe('PPE-96474: Sub-Domain Support for search / URL look-up', () => {

    /*
    ** Describe: Test Case 1
    */
    describe(`PPE-136423: Verify whether user is displayed with appropriate search results
                when the user searches for sub-domain assets using Global Search in PB2 app`, () => {

            let testAssetData = testdata.asset;
            /*
            ** Describe: Test Case 1 - Validation 1
            */
            describe(`Verify whether user is displayed with asset read-only screen when the 
                   user searches for an asset using it's chronicle id`, () => {

                    let testAssetData_validation1 = testAssetData.val1;
                    let _PageNameField = null;

                    /*
                    ** Before
                    */
                    before(() => {
                        //Launch app and login
                        pb2.LaunchAppAndLogin();

                        //Search for the asset using it's chronicle id
                        pb2.SearchFor(null, testAssetData_validation1.chronicle_id, 'Global Search', null);

                        _PageNameField = fields.input.get('Page Name');
                    })
                    /*
                    ** It
                    */
                    it(`User must be displayed with asset read-only screen when the 
                        user searches for an asset using it's chronicle id`, () => {
                            //Verify whether the asset read-only screen is displayed
                            expect(_PageNameField.isVisible()).to.be.true;
                        })
                })
            /*
            ** Describe: Test Case 1 - Validation 2
            */
            describe(`Verify whether user is displayed with asset read-only screen when the 
                   user searches for the asset using it's friendly-url`, () => {

                    let testAssetData_validation2 = testAssetData.val2;
                    let _PageNameField = null;
                    /*
                    ** Before
                    */
                    before(() => {
                        //Search for the asset using it's friendly-url
                        pb2.SearchFor(null, testAssetData_validation2.friendly_url, 'Global Search', null);

                        _PageNameField = fields.input.get('Page Name');

                    })

                    /*
                    ** It
                    */
                    it(`User must be displayed with asset read-only screen when the 
                        user searches for the asset using it's friendly-url`, () => {
                            //Verify whether the asset read-only screen is displayed
                            expect(_PageNameField.isVisible()).to.be.true;
                        })


                })

            /*
            ** Describe: User must be displayed with search results when the 
            **           user provides a keyword in the global search
            */
            describe(`Verify whether user is displayed with search results when the 
                    user provides a keyword in the global search`, () => {

                    let testAssetData_validation3 = testAssetData.val3;
                    let _PageNameField = null;
                    /*
                    ** Before
                    */
                    before(() => {
                        //Search for assets using the keyword
                        pb2.SearchFor('Page', testAssetData_validation3.keyword, 'Global Search', null);
                        browser.waitForExist(`//td[string()="${testAssetData_validation3.keyword}"]`);
                    })
                    /*
                    ** It
                    */
                    it(`User must be displayed with search results when the 
                        user provides a keyword in the global search`, () => {
                            //Verify whether search results are displayed
                            expect(browser.isVisible(`//td[string()="${testAssetData_validation3.keyword}"]`)).to.be.true;

                        })

                })
        });
});
/*
** Describe: Test Case 2
*/
describe(`PPE-136424: Verify whether the URL Look-up fields in PB2 app accepts asset id's/url's 
           from Sub-Domains without prompting the user to create a pointer`, () => {

    let _SmProps = testdata.LinkListModule;

    /*
    ** Before
    */
    before(() => {
        //Create a Shared Module
        pb2.Create('Shared Module', _SmProps);
    })

    /*
    ** It - Validation
    */
    it(`URL Look-up fields in PB2 app should accept asset id's/url's 
              from Sub-Domains without prompting the user to create a pointer`, () => {
        let noErr = true;

        try {
            //Populate the look-up field with chronicle id of a sub-domain asset
            pb2.ConfigureModule()
        } catch (err) {
            noErr = false;
        }
        //Verify whether the asset read-only screen is displayed
        expect(noErr).to.be.true;
    });

    /*
    ** After
    */
    after(() => {
        //Check-in the asset
        pb2.SaveOrPublishTheAsset('Checkin', 'Testing PPE-96474 using automation script.');
    })
});

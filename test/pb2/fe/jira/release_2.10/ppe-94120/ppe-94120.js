//Constants
const test = require('./../../../../common/functions/functions');
const testdata = require('./../../../../data/testdata/ppe-94120.testdata')

//Tests
describe('PPE-94120: Ability to Create/Edit Site XSL/CSS outside of PB', () => {

    //Re-usable functions
    var assetExists = function (assetName) {
        let locator = `td[contains(.,${assetName})]`;
        return browser.isExisting(locator);
    }

    var assetVisible = function (locator) {
        let locator = `td[contains(.,${assetName})]`;
        return browser.isVisible(locator);
    }

    describe('PPE-120822: Verify whether XSL is versioned up and Published to Staging'
        + 'when changes made to an existing XSL are committed and build is generated'
        + 'and deployed successfully', () => {

            var assetVersionAndStage;
            var existing_xsl = testdata.ppe_120822;

            before(() => {
                //Launch PB2 app and login
                test.LaunchAppAndLogin();

                //Search for the required XSL using global search
                test.SearchFor('XSL', existing_xsl.xsl_name, 'Global Search', null);
            });

            it('Verify whether XSL exists and is visible in PB2', () => {

                expect(assetExists(existing_xsl.xsl_name)).to.be.true;
                expect(assetVisible(existing_xsl.xsl_name)).to.be.true;

            });

            it('Verify whether XSL is versioned up', () => {

                assetVersionAndStage = test.GetAssetVersionAndStage(existing_xsl.xsl_name, 'Search Results');
                expect(assetVersionAndStage.version).to.equal(existing_xsl.expected_version);

            });

            it('Verify whether XSL is published to Staging', () => {

                expect(assetVersionAndStage.stage).to.equal(existing_xsl.expected_stage);

            });

        });

    describe('PPE-120823: Verify whether appropriate relations are updated when existing XSL'
        + 'is successfully published to Staging', () => {

            var resp;

            before(() => {
                //Generate access token for DCTM API
                let accessToken = test.GenerateApiAccessToken();

                //Execute the DQL and obtain the relation info from the api
                resp = test.ExecuteDQLUsingApi(accessToken, ''); //<--- Replace with DQL
            })

            it('Verify whether relations are created with CSS files', function () {

            });

            it('Verify whether relations are created with JS files', function () {

            });

        });

    describe('PPE-120824: Verify whether XSL is versioned up and Published to Staging'
        + 'when new XSL is committed and build is generated and deployed successfully', () => {

            var assetVersionAndStage;
            var existing_xsl = testdata.ppe_120824;

            before(() => {
                //Search for the required XSL using global search
                test.SearchFor('XSL', existing_xsl.xsl_name, 'Global Search', null);
            });

            it('Verify whether XSL exists and is visible in PB2', () => {

                expect(assetExists(existing_xsl.xsl_name)).to.be.true;
                expect(assetVisible(existing_xsl.xsl_name)).to.be.true;

            });

            it('Verify whether XSL is versioned up', () => {

                assetVersionAndStage = test.GetAssetVersionAndStage(existing_xsl.xsl_name, 'Search Results');
                expect(assetVersionAndStage.version).to.equal(existing_xsl.expected_version);

            });

            it('Verify whether XSL is published to Staging', () => {

                expect(assetVersionAndStage.stage).to.equal(existing_xsl.expected_stage);

            });

        });

    describe('PPE-120825: Verify whether appropriate relations are created when new XSL'
        + 'is successfully published to Staging', () => {

            var resp;

            before(() => {
                //Generate access token for DCTM API
                let accessToken = test.GenerateApiAccessToken();

                //Execute the DQL and obtain the relation info from the api
                resp = test.ExecuteDQLUsingApi(accessToken, ''); //<--- Replace with DQL
            })

            it('Verify whether relations are created with CSS files', function () {

            });

            it('Verify whether relations are created with JS files', function () {

            });

        });

    describe('PPE-120826: Verify whether XSL is not versioned up when CSS files are missing from the build', () => {

        var assetVersionAndStage;
        var existing_xsl_invalid = testdata.ppe_120826;

        before(() => {
            //Search for the required XSL using global search
            test.SearchFor('XSL', existing_xsl_invalid.xsl_name, 'Global Search', null);
        });

        it('Verify whether XSL exists and is visible in PB2', () => {

            expect(assetExists(existing_xsl_invalid.xsl_name)).to.be.true;
            expect(assetVisible(existing_xsl_invalid.xsl_name)).to.be.true;

        });

        it('Verify whether XSL is not versioned up when CSS files are missing from the build', () => {

            assetVersionAndStage = test.GetAssetVersionAndStage('', 'Search Results');
            expect(assetVersionAndStage.version).to.equal(existing_xsl_invalid.expected_version);

        });

        it('Verify whether XSL stage is not disturbed when CSS files are missing from the build', () => {

            expect(assetVersionAndStage.stage).to.equal(existing_xsl_invalid.expected_stage);

        });

    });

    describe('PPE-120827: Verify whether XSL is not versioned up when JS files are missing from the build', () => {

        var assetVersionAndStage;
        var existing_xsl_invalid = testdata.ppe_120827;

        before(() => {
            //Search for the required XSL using global search
            test.SearchFor('XSL', existing_xsl_invalid.xsl_name, 'Global Search', null);
        });

        it('Verify whether XSL exists and is visible in PB2', () => {

            expect(assetExists(existing_xsl_invalid.xsl_name)).to.be.true;
            expect(assetVisible(existing_xsl_invalid.xsl_name)).to.be.true;

        });

        it('Verify whether XSL is not versioned up when JS files are missing from the build', () => {

            assetVersionAndStage = test.GetAssetVersionAndStage(existing_xsl_invalid.xsl_name, 'Search Results');
            expect(assetVersionAndStage.version).to.equal(existing_xsl_invalid.expected_version);

        });

        it('Verify whether XSL stage is not disturbed when JS files are missing from the build', () => {

            expect(assetVersionAndStage.stage).to.equal(existing_xsl_invalid.expected_stage);

        });

    });

    describe('PPE-120828: Verify whether XSL is not versioned up when metadata.xml file is missing from the build', () => {

        var assetVersionAndStage;
        var existing_xsl_invalid = testdata.ppe_120828;

        before(() => {
            //Search for the required XSL using global search
            test.SearchFor('XSL', existing_xsl_invalid.xsl_name, 'Global Search', null);
        });

        it('Verify whether XSL exists and is visible in PB2', () => {

            expect(assetExists(existing_xsl_invalid.xsl_name)).to.be.true;
            expect(assetVisible(existing_xsl_invalid.xsl_name)).to.be.true;

        });

        it('Verify whether XSL is not versioned up when metadata.xml file is missing from the build', () => {

            assetVersionAndStage = test.GetAssetVersionAndStage(existing_xsl_invalid.xsl_name, 'Search Results');
            expect(assetVersionAndStage.version).to.equal(existing_xsl_invalid.expected_version);

        });

        it('Verify whether XSL stage is not disturbed when metadata.xml file is missing from the build', () => {

            expect(assetVersionAndStage.stage).to.equal(existing_xsl_invalid.expected_stage);

        });

    });

    describe('PPE-120830: Verify whether XSL is not versioned up when metadata.xml file is not well formed', () => {

        var assetVersionAndStage;
        var existing_xsl_invalid = testdata.ppe_120830;

        before(() => {
            //Search for the required XSL using global search
            test.SearchFor('XSL', existing_xsl_invalid.xsl_name, 'Global Search', null);
        });

        it('Verify whether XSL exists and is visible in PB2', () => {

            expect(assetExists(existing_xsl_invalid.xsl_name)).to.be.true;
            expect(assetVisible(existing_xsl_invalid.xsl_name)).to.be.true;

        });

        it('Verify whether XSL is not versioned up when metadata.xml file is not well formed', () => {

            assetVersionAndStage = test.GetAssetVersionAndStage(existing_xsl_invalid.xsl_name, 'Search Results');
            expect(assetVersionAndStage.version).to.equal(existing_xsl_invalid.expected_version);

        });

        it('Verify whether XSL stage is not disturbed when metadata.xml file is not well formed', () => {

            expect(assetVersionAndStage.stage).to.equal(existing_xsl_invalid.expected_stage); //<--- Replace with test data

        });

    });

    describe('PPE-120831: Verify whether XSL is not versioned up when CSS files are not changed', () => {

        var assetVersionAndStage;
        var existing_xsl_valid = testdata.ppe_120831;

        before(() => {
            //Search for the required XSL using global search
            test.SearchFor('XSL', existing_xsl_valid.xsl_name, 'Global Search', null);
        });

        it('Verify whether XSL exists and is visible in PB2', () => {

            expect(assetExists(existing_xsl_valid.xsl_name)).to.be.true;
            expect(assetVisible(existing_xsl_valid.xsl_name)).to.be.true;

        });

        it('Verify whether XSL is not versioned up when CSS files are not changed', () => {

            assetVersionAndStage = test.GetAssetVersionAndStage(existing_xsl_valid.xsl_name, 'Search Results');
            expect(assetVersionAndStage.version).to.equal(existing_xsl_valid.expected_version);

        });

        it('Verify whether XSL stage is not disturbed when CSS files are not changed', () => {

            expect(assetVersionAndStage.stage).to.equal(existing_xsl_valid.expected_stage);

        });

    });

    describe('PPE-120832: Verify whether XSL is not versioned up when JS files are not changed', () => {

        var assetVersionAndStage;
        var existing_xsl_valid = testdata.ppe_120832;

        before(() => {
            //Search for the required XSL using global search
            test.SearchFor('XSL', existing_xsl_valid.xsl_name, 'Global Search', null);
        });

        it('Verify whether XSL exists and is visible in PB2', () => {

            expect(assetExists(existing_xsl_valid.xsl_name)).to.be.true;
            expect(assetVisible(existing_xsl_valid.xsl_name)).to.be.true;

        });

        it('Verify whether XSL is not versioned up when JS files are not changed', () => {

            assetVersionAndStage = test.GetAssetVersionAndStage('', 'Search Results');
            expect(assetVersionAndStage.version).to.equal(existing_xsl_valid.expected_stage);

        });

        it('Verify whether XSL stage is not disturbed when JS files are not changed', () => {

            expect(assetVersionAndStage.stage).to.equal(existing_xsl_valid.expected_version);

        });

    });

    describe('PPE-121625: Verify whether a new XSL is not created when CSS files are missing from the build', () => {

        var existing_xsl_invalid = testdata.ppe_121625;

        before(() => {
            //Search for the required XSL using global search
            test.SearchFor('XSL', existing_xsl_invalid, 'Global Search', null);
        });

        it('Verify whether XSL does not exist PB2', () => {

            expect(assetExists(existing_xsl_invalid.xsl_name)).to.be.false;
        });
    });

    describe('PPE-121626: Verify whether a new XSL is not created when JS files are missing from the build', () => {

        var existing_xsl_invalid = testdata.ppe_121626;

        before(() => {
            //Search for the required XSL using global search
            test.SearchFor('XSL', existing_xsl_invalid.xsl_name, 'Global Search', null);
        });

        it('Verify whether XSL does not exist PB2', () => {

            expect(assetExists(existing_xsl_invalid.xsl_name)).to.be.false;
        });
    });

    describe('PPE-121627: Verify whether a new XSL is not created when metadata.xml file is missing from the build', () => {

        var existing_xsl_invalid = testdata.ppe_121627;

        before(() => {
            //Search for the required XSL using global search
            test.SearchFor('XSL', existing_xsl_invalid.xsl_name, 'Global Search', null);
        });

        it('Verify whether XSL does not exist PB2', () => {

            expect(assetExists(existing_xsl_invalid.xsl_name)).to.be.false;
        });
    });

    describe('PPE-121628: Verify whether a new XSL is not created when metadata.xml file is malformed', () => {

        var existing_xsl_invalid = testdata.ppe_121628;

        before(() => {
            //Search for the required XSL using global search
            test.SearchFor('XSL', existing_xsl_invalid.xsl_name, 'Global Search', null);
        });

        it('Verify whether XSL does not exist PB2', () => {

            expect(assetExists(existing_xsl_invalid.xsl_name)).to.be.false;
        });
    });
});
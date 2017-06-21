const test = require('./../../../../common/functions/functions.js');
const testdata = require('./../../../../data/testdata/PPE-101698.testdata');
const field = require('./../../../../common/elements/assetprops.page');
const action = require('./../../../../common/elements/actions.page');

describe('PPE-101698: Ability to Edit Existing Redirects', function () {

    //Web Elements

    //From URL field
    const fromUrlField = field.input.get('From URL');
    //To URL Field
    const toUrlField = field.input.get('To URL');
    //Update Redirect button
    const updateButton = action.button.get('Update Redirect');
    //First Search Result
    const firstSearchResult = '//tbody//tr';
    //Select a search result
    var SelectSearchResult = function(searchResult){
        browser.waitForExist(searchResult);
        browser.waitForVisible(searchResult);
        browser.click(searchResult);
    };
    //Verify whether an input field is editable
    var IsEditable = function(element){
        return element.isEnabled();
    }

    var GetTextPresentIn = function(field){
        return browser.execute(`return $('label:contains("${field}") input')[1].value`);
    }

    before(function () {

        //Launch app and login
        test.LaunchAppAndLogin();

        //Naviagate to Redirect Tool Page
        test.NavigateToRedirectToolPage();

        //Search for redirects
        test.SearchForRedirects({
            from: '',
            to: ''
        });
    })

    /* Current Implementation does not require these test cases
    describe('PPE-117152: Verify whether Edit button is available against each redirect search result', function () {

        it('Verify whether Edit button is visible for each redirect search result', function () {

            //Validation

        });

        it('Verify whether Edit button is enabled for each redirect search result', function () {

            //Validation

        });

    })
    */

    describe('PPE-117154: When a redirect is selected from the search results, verify the various properties of the update reditrect from', function () {

        before(function () {

            //Select a redirect pair from the displayed list of search result
            SelectSearchResult(firstSearchResult);

        })

        it("When user selects a redirect from the search results, verify whether From URL field is disabled in the update redirect form", function () {

            //Validation: From URL field must not be editable by the user
            expect(IsEditable(fromUrlField)).to.be.false;

        })

        it("Verify whether 'To URL' field is enabled and editable in the form", function () {

            //Validation: To URL field must enabled and can be editable by the user
            expect(IsEditable(toUrlField)).to.be.true;
        })

        it("Verify whether user is not displayed with Chronicle ID's in From URL field in the form", function () {

            //Validation: User must be displayed with only url in the From URL field
            expect(GetTextPresentIn('From URL').toString().startsWith('091')).to.be.false;

        })

        it("Verify whether user is not displayed with Chronicle ID's in To URL field in the form", function () {

            //Validation: User must be displayed with only url in the To URL field
            expect(GetTextPresentIn('To URL').toString().startsWith('091')).to.be.false;

        })
    })

    describe("Verify the various rules that apply to 'To URL' field", function () {

        it("Verify whether user is displayed with an error when user enters same value in 'From URL' and 'To URL' fields", function () {

            //Enter the url in 'To URL' field, which is same as the one present in 'From URL' field

            //Validation: User must be displayed with an error when attempted to add same value in the From and To URL fields

        })

        it("Verify whether user is displayed with an error if the URL does not start with either 'HTTP' or 'HTTPS'", function () {

            //Enter url in 'To URL' that doesn't start with HTTP

            //Validation: User must be displayed with an error, if the value populated in the To URL field does not start with either HTTP or HTTPS

        })

        it("Verify whether error is not displayed when user populates To URL field with value that starts with 'HTTP'", function () {

            //Enter url in 'To URL' that starts with HTTPS

            //Validation: User must be not displayed with any error when To URL field is populated with a value that starts with HTTP

        })

        it("Verify whether error is not displayed when user populates To URL field with value that starts with 'HTTPS'", function () {

            //Enter url in 'To URL' that starts with HTTPS

            //Validation: User must be not displayed with any error when To URL field is populated with a value that starts with HTTPS

        })

        it("Verify whether user is able to enter a url that goes thru/click. Example: http://www.webmd.com/click?url=http://www.cnn.com", function () {

            //Enter url in 'To URL' field that goes thru/click

            //Validation: User must not be displayed with error when To URL field is populated with a URL that goes thru/click

        })

    })

    describe('Verify the functionality of Update redirect button', function () {

        it('Verify whether update redirect button is disabled when user leaves the "To URL" field blank', function () {

            //Leave the 'To URL' field blank

            //Validation: Update redirect button must be disabled when user leaves To URL field blank

        })

        describe('Verify whether user is displayed with a status message when user clicks on Update after populating the "To URL" field with an acceptable value', function () {

            it('Verify whether user is displayed with a status message when user clicks on Update after populating the "To URL" field with a valid Chronicle ID', function () {

                //Populate the 'To URL' field with a valid chronicle id

                //Click Update button

                //Validation: User must be displayed with a status message (Either Success or Failed)

            })

            it('Verify whether user is displayed with a status message when user clicks on Update after populating the "To URL" field with a valid URL', function () {

                //Click Edit button for a redirect search result

                //Populate the 'To URL' field with a valid url

                //Click Update button

                //Validation: User must be displayed with a status message (Either Success or Failed)

            })

            it('Verify whether user is displayed with a status message when user clicks on Update after populating the "To URL" field with a valid URL that goes thru/click', function () {

                //Click Edit button for a redirect search result

                //Populate the 'To URL' field with a valid url that goes thru/click

                //Click Update button

                //Validation: User must be displayed with a status message (Either Success or Failed)

            })

        })

        it('Verify whether the value populated in the DB column corresponds to the displayed status message after Update redirect button is clicked', function () {

            //Click Edit button for a redirect search result

            //Populate the 'To URL' field with a valid url

            //Click Update button

            //Wait for the status message

            //Validation: If the status is Success, User must find the updated value in the DB column or else user must find the previous value in the DB column

        })

        it('Verify whether user is taken back to redirect search results screen after the update operation is successful', function () {

            //Click Edit button for a redirect search result

            //Populate the 'To URL' field with a valid url

            //Click Update button

            //Wait for the status message

            //Validation: If the status message is successful, user must be taken back to the redirect search result screen or else user must continue in the edit mode

        })

        it('When user attempts to create duplicate redirect pair, verify whether user is displayed with an error when Update button is clicked', function () {

            //Click Edit button for a redirect search result

            //Populate the 'To URL' field with a valid url

            //Click Update button

            //Wait for the status message

            //Validation: User must be displayed with an error if user attempts to make a duplicate redirect pair

        })

    })

    describe('Verify the functionality of Cancel button', function(){

        it("Verify whether user is taken back to redirect search results screen once user cancel's editing the redirect", function () {

            //Click Edit button for a redirect search result

            //Populate the 'To URL' field with a valid url

            //Click Cancel button

            //Validation: User must be taken back to redirect search results screen

        })

        it("Verify whether the redirect is not updated once user cancel's editing the redirect", function () {

            //Click Edit button for a redirect search result

            //Populate the 'To URL' field with a valid url

            //Click Cancel button

            //Validation: Value contained in the To URL field must not be updated when user cancel's the update operation

        })

        it("Verify whether the value contained in the DB column of the To URL field is not updated once user cancel's editing the redirect", function () {

            //Click Edit button for a redirect search result

            //Populate the 'To URL' field with a valid url

            //Click Cancel button

            //Validation: Value contained in the DB column of the To URL field must not be updated when user cancel's the update operation

        })

    })

    describe('Verify the single-hop functionality', function(){

        before(function(){

            //Replicate the Hop Scenario

        })

        it('Verify the value present in the DB column when hop scenario is replicated', function(){

            //Validation: The value present in the DB Column must be the updated value if the operation is successful or previous value (value present before update operation) if the operation fails

        })

    })

    describe('When search operation is performed, verify whether the updated redirect pair is visible / invisible in the redirect search results, depending on the status of the update operation', function(){

        before(function(){

            //Edit a redirect

            //Update the value in the To URL field

            //Click Update button

            //Wait for the status message

            //Perform search operation

        })

        it('When redirect search operation is performed, verify the presence of updated / old redirect pair, depending on the status of the update operation', function(){

            //Validation: User must find the updated or previous redirect pair when redirect search operation is performed, depending on the status of the update operation

        })
    })

})
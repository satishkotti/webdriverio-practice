const test = require('./../../../../common/functions/functions.js');
const testdata = require('./../../../../data/testdata/PPE-101698.testdata');
const urls = testdata.urls;
const chronicleIds = testdata.chronicleIds;
const field = require('./../../../../common/elements/assetprops.page');
const action = require('./../../../../common/elements/actions.page');
const randomstring = require('randomstring');

describe('PPE-101698: Ability to Edit Existing Redirects', function () {

    // <--- Web Elements --->

    //From URL field
    var fromUrlField;
    //To URL Field
    var toUrlField;
    //Update Redirect button
    var updateRedirectButton;
    //Modal Okay button
    var okayButton;

    // <--- Locators --->

    //Redirect From
    var redirectForm = 'form[name="redirectForm"]';
    //First Search Result
    var firstSearchResult = '//tbody//tr';
    //Failed Modal
    const failedModal = '//div[contains(@class, "pb-overlay-content") and contains(.,"Redirect Update Failed")]';
    //Success Modal
    const successNotification = '.pb-notification-container';
    const successNotificationProperty = 'top';
    const successNotificationPropertyValue = '106px';
    //Close button
    const closeButton = '.fa-close';

    // <--- Re-usable functions --->

    //Select a search result
    var SelectSearchResult = function (searchResult) {
        browser.waitForExist(searchResult);
        browser.waitForVisible(searchResult);
        browser.click(searchResult);
    };
    //Verify whether an input field is editable
    var IsEditable = function (element) {
        return element.isEnabled();
    }

    var GetTextPresentIn = function (field) {
        return browser.execute(`return $('label:contains("${field}") input')[1].value`).value;
    }

    var IsInvalidMessageVisible = function (fieldName) {
        browser.pause(500);
        return field.invalid.get(fieldName).isVisible();
    }

    var IsSuccessNotificationDisplayed = function () {

        return browser.getCssProperty(successNotification, successNotificationProperty).value == successNotificationPropertyValue ? true : false;
    }

    var IsFailedModalDisplayed = function () {

        return browser.isVisible(failedModal);
    }

    var WaitForStatus = function () {
        let statusDisplayed = false;
        let count = 0;
        while (count < 240 && !statusDisplayed) {
            success = IsSuccessNotificationDisplayed();
            failed = IsFailedModalDisplayed();
            if (success || failed) {
                statusDisplayed = true;
            }
            count++;
            browser.pause(250);
        }
        return {
            success: success,
            failed: failed
        }
    }

    //Verify the presence of a redirect pair in the search results grid
    var VerifyThePresenceOfRedirectPair = function (from, to) {
        return browser.isExisting(`//tr[td[contains(.,"${from}")] and td[contains(.,"${to}")]]`)
    }

    // <--- Variables --->
    var fromUrlVal, toUrlVal;
    var success, failed;

    before(function () {

        //Launch app and login
        test.LaunchAppAndLogin();

        //Naviagate to Redirect Tool Page
        test.NavigateToRedirectToolPage();

        //Search for redirects
        test.SearchForRedirects({
            from: testdata.search.from.replace('qa02', 'perf'),
            to: null
        });
    })

    // <--- Tests --->

    describe('PPE-117154: When a redirect is selected from the search results, verify the various properties of the update reditrect from', function () {

        before(function () {

            //Select a redirect pair from the displayed list of search result
            SelectSearchResult(firstSearchResult);

        })

        it("When user selects a redirect from the search results, verify whether From URL field is disabled in the update redirect form", function () {

            //Validation: From URL field must not be editable by the user
            fromUrlField = field.input3.get('From URL', 2);
            expect(IsEditable(fromUrlField)).to.be.false;

        })

        it("Verify whether 'To URL' field is enabled and editable in the form", function () {

            //Validation: To URL field must enabled and can be editable by the user
            toUrlField = field.input3.get('To URL', 2);
            expect(IsEditable(toUrlField)).to.be.true;
        })

        it("Verify whether user is not displayed with Chronicle ID's in From URL field in the form", function () {

            //Validation: User must be displayed with only url in the From URL field
            fromUrlVal = GetTextPresentIn('From URL').toString();
            expect(fromUrlVal.startsWith('091')).to.be.false;

        })

        it("Verify whether user is not displayed with Chronicle ID's in To URL field in the form", function () {

            //Validation: User must be displayed with only url in the To URL field
            toUrlVal = GetTextPresentIn('To URL').toString();
            expect(toUrlVal.startsWith('091')).to.be.false;

        })
    })

    describe("PPE-117156: Verify the various rules that apply to 'To URL' field", function () {

        it("Verify whether user is displayed with an error when user enters the value thats present in 'From URL' in 'To URL' field", function () {

            //Enter the url in 'To URL' field, which is same as the one present in 'From URL' field
            toUrlField.setValue(fromUrlVal.replace('qa02', 'perf'));

            //Validation: User must be displayed with an error when attempted to add same value in the From and To URL fields
            expect(IsInvalidMessageVisible('To URL')).to.be.true;
        })

        it("Verify whether user is displayed with an error if the URL does not start with 'HTTP'", function () {

            //Enter url in 'To URL' that doesn't start with HTTP
            toUrlField.setValue(urls.doesNotStartWithHttp.replace('qa02', 'perf'));

            //Validation: User must be displayed with an error, if the value populated in the To URL field does not start with HTTP
            expect(IsInvalidMessageVisible('To URL')).to.be.true;
        })

        it("Verify whether user is displayed with an error if the URL does not start with 'HTTPS'", function () {

            //Enter url in 'To URL' that doesn't start with HTTPS
            toUrlField.setValue(urls.doesNotStartWithHttps.replace('qa02', 'perf'));

            //Validation: User must be displayed with an error, if the value populated in the To URL field does not start with HTTPS
            expect(IsInvalidMessageVisible('To URL')).to.be.true;
        })

        it("Verify whether error is not displayed when user populates To URL field with value that starts with 'HTTP'", function () {

            //Enter url in 'To URL' that starts with HTTP
            toUrlField.setValue(urls.startsWithHttp.replace('qa02', 'perf'));

            //Validation: User must be not displayed with any error when To URL field is populated with a value that starts with HTTP
            expect(IsInvalidMessageVisible('To URL')).to.be.false;
        })

        it("Verify whether error is not displayed when user populates To URL field with value that starts with 'HTTPS'", function () {

            //Enter url in 'To URL' that starts with HTTPS
            toUrlField.setValue(urls.startsWithHttps.replace('qa02', 'perf'));

            //Validation: User must be not displayed with any error when To URL field is populated with a value that starts with HTTPS
            expect(IsInvalidMessageVisible('To URL')).to.be.false;
        })

        it("Verify whether user is able to enter a url that goes thru/click. Example: http://www.webmd.com/click?url=http://www.cnn.com", function () {

            //Enter url in 'To URL' field that goes thru/click
            toUrlField.setValue(urls.goesThruOrClick.replace('qa02', 'perf'));

            //Validation: User must not be displayed with error when To URL field is populated with a URL that goes thru/click
            expect(IsInvalidMessageVisible('To URL')).to.be.false;
        })

    })

    describe('PPE-117160: Verify the functionality of Update redirect button', function () {

        it('Verify whether update redirect button is disabled when user leaves the "To URL" field blank', function () {

            //Leave the 'To URL' field blank
            toUrlField.setValue('');

            //Validation: Update redirect button must be disabled when user leaves To URL field blank
            updateRedirectButton = action.button.get('Update Redirect');
            expect(updateRedirectButton.isEnabled()).to.be.false;

        });

        it('Verify whether user is taken back to redirect search results screen after the update operation is successful', function () {

            //Populate the 'To URL' field with a valid url
            toUrlField.setValue(urls.startsWithHttp.replace('qa02', 'perf') + '-' + randomstring.generate(7));

            //Click Update button
            updateRedirectButton.click();

            //Wait for the status message
            let status = WaitForStatus();

            //Validation: If the status message is successful, user must be taken back to the redirect search result screen or else user must continue in the edit mode
            if (!status.success) {
                expect(browser.isVisible(redirectForm)).to.be.true;
                okayButton.click();
            }
            else {
                expect(browser.isVisible(redirectForm)).to.be.false;
            }
        })

        describe('Verify whether user is displayed with a status message when user clicks on Update after populating the "To URL" field with an acceptable value', function () {

            it('Verify whether user is displayed with an "Invalid" message when user populates the "To URL" field with a valid Chronicle ID', function () {

                //Select Search Result
                SelectSearchResult(firstSearchResult);

                //Populate the 'To URL' field with a valid chronicle id
                toUrlField = field.input3.get('To URL', 2);
                toUrlField.setValue(chronicleIds.valid);

                //Validation: User must be displayed with an Invalid message
                expect(IsInvalidMessageVisible('To URL')).to.be.true;

            })

            it('Verify whether user is displayed with a status message when user clicks on Update after populating the "To URL" field with a valid URL', function () {

                //Populate the 'To URL' field with a valid url
                toUrlField.setValue(urls.startsWithHttp.replace('qa02', 'perf')+ '-' + randomstring.generate(7));

                //Click Update button
                updateRedirectButton.click();

                //Validation: User must be displayed with a status message (Either Success or Failed)
                let status = WaitForStatus();

                if (!status.success) {
                    expect(IsFailedModalDisplayed()).to.be.true;
                    okayButton.click();
                }
                else {
                    expect(IsSuccessNotificationDisplayed()).to.be.true;
                }


            })

            it('Verify whether user is displayed with a status message when user clicks on Update after populating the "To URL" field with a valid URL that goes thru/click', function () {

                //Select the search result
                SelectSearchResult(firstSearchResult);

                //Populate the 'To URL' field with a valid url that goes thru/click
                toUrlField = field.input3.get('To URL', 2);
                toUrlField.setValue(urls.goesThruOrClick.replace('qa02', 'perf'));

                //Click Update button
                updateRedirectButton = action.button.get('Update Redirect');
                updateRedirectButton.click();

                //Validation: User must be displayed with a status message (Either Success or Failed)let count = 0;
                let status = WaitForStatus();

                if (!status.success) {
                    expect(IsFailedModalDisplayed()).to.be.true;
                    okayButton = action.button.get('Okay');
                    okayButton.click();
                }
                else {
                    expect(IsSuccessNotificationDisplayed()).to.be.true;
                }

            })

        })

    })

    describe('PPE-117162: Verify the functionality of Cancel button', function () {

        it("Verify whether user is taken back to redirect search results screen once user cancel's editing the redirect", function () {

            //Select a redirect search result
            browser.pause(2000);
            SelectSearchResult(firstSearchResult);

            //Click Cancel button
            browser.click(closeButton);

            //Validation: Update redirect form should not be visible
            browser.pause(2000);
            expect(browser.isExisting(redirectForm)).to.be.false;

        })

        it("Verify whether the redirect is not updated once user cancel's editing the redirect", function () {

            //Select a redirect search result
            SelectSearchResult(firstSearchResult);

            //Populate the 'To URL' field with a valid url
            let updatedToUrlVal = urls.startsWithHttp.replace('qa02', 'perf');
            toUrlField = field.input3.get('To URL', 2);
            toUrlField.setValue(updatedToUrlVal);

            //Click Cancel button
            browser.click(closeButton);
            browser.pause(2000);

            //Validation: Value contained in the To URL field must not be updated when user cancel's the update operation
            expect(VerifyThePresenceOfRedirectPair(fromUrlVal, updatedToUrlVal)).to.be.false;

        })

    })

    describe.skip('PPE-117163: Verify the single-hop functionality', function () {

        it('Verify the value present in the DB column when hop scenario is replicated', function () {

            //Replicate the Hop Scenario

            //Select a redirect search result
            SelectSearchResult(firstSearchResult);

            //Populate the 'To URL' field with a valid url
            let updatedToUrlVal = urls.hopscenario;
            toUrlField = field.input3.get('To URL', 2);
            toUrlField.setValue(updatedToUrlVal);

            //Click Update button
            updateRedirectButton.click();

            //Wait for the status message
            let status = WaitForStatus();

            //Validation: User must be able to replicate the scenario successfully without any issues
            if (!status.success) {
                expect(VerifyThePresenceOfRedirectPair(fromUrlVal, updatedToUrlVal)).to.be.false;
                okayButton.click();
            }
            else {
                expect(VerifyThePresenceOfRedirectPair(fromUrlVal, updatedToUrlVal)).to.be.true;
            }
        })

    })

    describe('PPE-117164: When search operation is performed, verify whether the updated redirect pair is visible / invisible in the redirect search results, depending on the status of the update operation', function () {


        it('When redirect search operation is performed, verify the presence of updated / old redirect pair, depending on the status of the update operation', function () {

            //Select a redirect search result
            SelectSearchResult(firstSearchResult);

            //Populate the 'To URL' field with a valid url
            let updatedToUrlVal = urls.startsWithHttp.replace('qa02', 'perf');
            toUrlField = field.input3.get('To URL', 2);
            toUrlField.setValue(updatedToUrlVal);

            //Click Cancel button
            updateRedirectButton.click();
            browser.pause(2000);

            //Wait for the status message
            let status = WaitForStatus();

            //Validation: User must find the updated or previous redirect pair when redirect search operation is performed, depending on the status of the update operation
            if (!status.success) {
                expect(VerifyThePresenceOfRedirectPair(fromUrlVal, updatedToUrlVal)).to.be.false;
                okayButton.click();
            }
            else {
                expect(VerifyThePresenceOfRedirectPair(fromUrlVal, updatedToUrlVal)).to.be.true;
            }

        })
    })

})
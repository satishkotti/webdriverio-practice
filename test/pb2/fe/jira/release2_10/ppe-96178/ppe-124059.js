//Constants
const test = require('./../../../../common/functions/functions');
const iwcActs = require('./../../../../common/actions/iwc.actions.js');
const acts = require('./../../../../common/actions/assetactions.actions.js')
const field = require('./../../../../common/elements/actions.page.js');
const button = require('./../../../../common/elements/assetprops.page.js');
const testdata = require('./../../../../data/testdata/ppe-96178.testdata').TestData.ppe_124059;


describe('PPE-96178: Verify the various conditions set on Page Title input field'
    + 'with respect to the number of characters that the field can accept for a new page', () => {

        let _InvalidMessage, _TitleInputField, _SavePublishButton;

        //Function to execute javascript and obtain the value present in the title field
        let GetTheValuePresentInField = function (fieldName) {
            return browser.execute(`return $("label:contains('${fieldName}') input").get(0).value`);
        }

        //Pre-test steps
        before(() => {

            //Launch app and login
            test.LaunchAppAndLogin();

            //Search for the existing asset
            test.SearchFor(null, testdata.assetChronId, 'Global Search', null);

            //Enter the edit mode of the asset
            test.EditTheAsset();

        });

        //Tests
        it("If the Page Title is >65 characters long,"
            + "user must be displayed with 'Invalid' message above the field", () => {

                //Verify the presence of 'Invalid' message field - message should be displayed
                _InvalidMessage = field.invalid.get('Title');
                expect(_InvalidMessage).to.be.true;

            });

        it("If the Page Title is >65 characters long,"
            + "'Save/Publish' button must be disabled", () => {

                //Verify the state of 'Save/Publish' button - button must be enabled
                _SavePublishButton = button.get('Save/Publish');
                expect(_SavePublishButton.isEnabled()).to.be.false;
            });

        it("When user enters page title which is 64 characters long,"
            + "user must not be displayed with 'Invalid' message for Page Title Input Field", () => {

                //Enter 64 chars long valid text in Page Title field
                _TitleInputField = field.input.get('Title');
                _TitleInputField.setValue(testdata._64CharsLong);

                //Verify the presence of 'Invalid' message field - message should not displayed
                expect(_InvalidMessage).to.be.false;

            });

        it("When user enters page title which is 64 characters long,"
            + "'Save/Publish' button must be enabled", () => {

                //Verify the state of 'Save/Publish' button - button must be enabled
                _SavePublishButton = button.get('Save/Publish');
                expect(_SavePublishButton.isEnabled()).to.be.true;
            });

        it("When user enters page title which is 65 characters long,"
            + "user must not be displayed with 'Invalid' message for Page Title Input Field", () => {

                //Enter 65 chars long valid text in Page Title field
                _TitleInputField.setValue(testdata._65CharsLong);

                //Verify the presence of 'Invalid' message field - message should not displayed
                expect(_InvalidMessage).to.be.false;

            });

        it("When user enters page title which is 65 characters long,"
            + "'Save/Publish' button must be enabled", () => {

                //Verify the state of 'Save/Publish' button - button must be enabled
                expect(_SavePublishButton.isEnabled()).to.be.true;

            });

        it("When user enters page title which is 66 characters long,"
            + "Page Title input field must contain only 65 characters", () => {

                //Enter 66 chars long valid text in Page Title field
                _TitleInputField.setValue(testdata._66CharsLong);

                //Verify the text present in Page Title field - text should be of length 65 and NOT 66
                expect(GetTheValuePresentInField('Title')).to.have.length(65);

            });
    });
//Constants
const test = require('./../../../../common/functions/functions');
const iwcActs = require('./../../../../common/actions/iwc.actions.js');
const acts = require('./../../../../common/actions/assetactions.actions.js')
const field = require('./../../../../common/elements/actions.page.js');
const button = require('./../../../../common/elements/assetprops.page.js');

//Variables
var testdata = require('./../../../../data/testdata/ppe-96178.testdata').TestData.ppe_124045;


describe('PPE-96178: Verify the various conditions set on Page Title input field'
    + 'with respect to the number of characters that the field can accept for a new page', () => {

        let _InvalidMessage, _PageTitleInputField;

        //Pre-test steps
        before(() => {

            //Launch app and login
            test.LaunchAppAndLogin();

            //Enter IWC
            test.EnterIWC('Create', 'Templates & Pages');

            //Traverse SS
            test.TraverseSS();

            //Click Add to Node button and then select Page
            iwcActs.AddToNode('Page');

            //Select the type of the page
            field.checkbox.get('New Standalone').click();

            //Select page layout
            field.dropdown('Layout', testdata.layout);

            //Select layout css
            field.dropdown('CSS Option', testdata.layoutCSS);

            //Click Continue button
            acts.ClickModalContinueButton();

        });

        //Tests
        it("When user enters page title which is 64 characters long,"
            + "user must not be displayed with 'Invalid' message for Page Title Input Field", () => {

                //Enter 64 chars long valid text in Page Title field
                _PageTitleInputField = field.input.get('Title');
                _PageTitleInputField.setValue(testdata._64CharsLong);
                
                //Verify the presence of 'Invalid' message field - message should not displayed
                _InvalidMessage = field.invalid.get('Title');
                expect(_InvalidMessage).to.be.false;


            });

        it("When user enters page title which is 64 characters long,"
            + "'Save/Publish' button must be enabled", () => {

                //Enter 64 chars long valid text in Page Title field

                //Verify the state of 'Save/Publish' button - button must be enabled

            });

        it("When user enters page title which is 65 characters long,"
            + "user must not be displayed with 'Invalid' message for Page Title Input Field", () => {

                //Enter 64 chars long valid text in Page Title field

                //Verify the presence of 'Invalid' message field - message should not displayed

            });

        it("When user enters page title which is 65 characters long,"
            + "'Save/Publish' button must be enabled", () => {

                //Enter 64 chars long valid text in Page Title field

                //Verify the state of 'Save/Publish' button - button must be enabled

            });

        it("When user enters page title which is 66 characters long,"
            + "Page Title input field must contain only 65 characters", () => {

                //Enter 64 chars long valid text in Page Title field

                //Verify the text present in Page Title field - text should be of length 65 and NOT 66

            });


    });
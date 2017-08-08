//Constants
const test = require('./../../../../common/functions/functions');
const props = require('./../../../../common/elements/assetprops.page');
const buttons = require('./../../../../common/elements/actions.page.js');
const field = require('./../../../../common/elements/assetprops.page.js');
const testdata = require('./../../../../data/testdata/ppe-96178.testdata').TestData.ppe_124057;


describe('PPE-96178: Verify the various conditions set on Page Title input field'
    + 'with respect to the number of characters that the field can accept for a new page', () => {

        let _InvalidMessage, _TitleInputField, _SavePublishButton;

        //Function to execute javascript and obtain the value present in the title field
        let GetTheValuePresentInField = function (fieldName) {
            return browser.execute(`return $("label:contains('${fieldName}') input").get(0).value`).value;
        }

        //Function to click on add-module button in the required content pane
        let AddModuleIn = function (contentPane) {
            props.element('.fa-eye').click();
            props.element('div[name="' + contentPane + '"').waitForVisible();
            let location = props.element('div[name="' + contentPane + '"').getLocation('y');
            props.element('div[name="' + contentPane + '"').scroll(0, parseInt(location) - 200);
            props.element('div[name="' + contentPane + '"').moveToObject();
            //props.element('div[name="' + contentPane + '"').scroll(0, 200);
            props.element('div[name="' + contentPane + '"] .fa-plus.add-module').click();
            props.element('.pb-add-module.section-open').waitForVisible();
        }

        //Pre-test steps
        before(() => {

            //Launch app and login
            test.LaunchAppAndLogin();

            //Enter IWC
            test.EnterIWC('Create', 'Templates & Pages');

            //Traverse SS
            test.TraverseSS();

            //Create a page
            test.Create('Template', testdata._TemplateProps);

            //Add module
            AddModuleIn('ContentPane0');

        });

        //Tests
        it("When user enters template module title which is 64 characters long,"
            + "user must not be displayed with 'Invalid' message for Template Module Title Input Field", () => {

                //Enter 64 chars long valid text in Page Title field
                _TitleInputField = field.input.get('Module Name');
                _TitleInputField.setValue(testdata._64CharsLong);

                //Verify the presence of 'Invalid' message field - message should not displayed
                _InvalidMessage = field.invalid.get('Module Name');
                expect(_InvalidMessage.state).to.equal('failure');
                expect(_InvalidMessage.type).to.equal('NoSuchElement');

            });

        it("When user enters template module title which is 65 characters long,"
            + "user must not be displayed with 'Invalid' message for Template Module Title Input Field", () => {

                //Enter 65 chars long valid text in Page Title field
                _TitleInputField.setValue(testdata._65CharsLong);

                //Verify the presence of 'Invalid' message field - message should not displayed
                expect(_InvalidMessage.state).to.equal('failure');
                expect(_InvalidMessage.type).to.equal('NoSuchElement');

            });

        it("When user enters template module title which is 66 characters long,"
            + "Template Module Title input field must contain only 65 characters", () => {

                //Enter 66 chars long valid text in Page Title field
                _TitleInputField.setValue(testdata._66CharsLong);

                //Verify the text present in Page Title field - text should be of length 65 and NOT 66
                expect(GetTheValuePresentInField('Module Name')).to.have.length(65);

            });

        after(() => {
            //Click on Cancel Button
            buttons.button2.get('Cancel', 3).click();

            //Checkin the page
            test.SaveOrPublishTheAsset('Checkin', 'Created through automation script to test PPE-124057');
        });
    });
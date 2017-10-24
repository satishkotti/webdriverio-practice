//Constants
const test = require('./../../../../common/functions/functions.js');
const props = require('./../../../../common/elements/assetprops.page');

//Testdata
const testdata = require('./../../../../data/testdata/ppe-121231.testdata');

//Tests
describe(`PPE-121231: Verify whether user is able to expand text boxes for 
certain fields present in Sponsor Boxes module configuration screen`, () => {

        var _SMData = testdata.sm_data;
        var _AdjustSizeTo = testdata.adjust_size;

        var body_copy_header_text_field_expand_to = _AdjustSizeTo.expand.body_copy.header_text_field;
        var body_links_text_field_expand_to = _AdjustSizeTo.expand.body_links_field;
        var lower_links_text_field_expand_to = _AdjustSizeTo.expand.lower_links_field;

        var _HeaderTextField = null;
        var _Add_BodyLinks_Field = null; var _TextField_BodyLinks_1 = null, _TextField_BodyLinks_2 = null, _TextField_BodyLinks_3 = null;
        var _Add_LowerLinks_Field = null; var _TextField_LowerLinks_1 = null, _TextField_LowerLinks_2 = null, _TextField_LowerLinks_3 = null;

        var AdjustSizeOfTheTextField = function (fieldName, itemNumber, dimensions) {
            browser.execute(`$("label:contains('${fieldName}:') textarea").get(${itemNumber}).setAttribute('style', 'margin: 5px -0.25px 0px 0px; width: ${dimensions.width}px; height: ${dimensions.height}px;')`);
        }

        before(() => {

            //Launch PB2 app and login
            test.LaunchAppAndLogin();

            //Create a Shared Module
            test.Create('Shared Module', _SMData);

            //Capture the initial size of Header Text field (Body Copy Section), Text field (Body Links section) and Text field (Lower Links section)
            _HeaderTextField = props.textarea2.get('Body Copy', 'Header Text', 1);

            //Add 2 more Body Links
            props.addLinks('Body Links', 'Add Body Links', 1, 2);

            //Get web elements for all the body links - text fields
            _TextField_BodyLinks_1 = props.textarea2.get('Body Links', 'Text', 1);
            _TextField_BodyLinks_2 = props.textarea2.get('Body Links', 'Text', 2);
            _TextField_BodyLinks_3 = props.textarea2.get('Body Links', 'Text', 3);

            //Add 2 more Lower Links
            props.addLinks('Lower Links', 'Add Lower Links', 1, 2);
            
            //Get web elements for all the lower links - text fields
            _TextField_LowerLinks_1 = props.textarea2.get('Lower Links', 'Text', 1);
            _TextField_LowerLinks_2 = props.textarea2.get('Lower Links', 'Text', 2);
            _TextField_LowerLinks_3 = props.textarea2.get('Lower Links', 'Text', 3);

        });

        describe('Verify whether user is able to expand Header Text field under Body Copy section', () => {

            var _AfterResize_Header_Text_Field = null;
            var size1 = body_copy_header_text_field_expand_to.size1;
            var size2 = body_copy_header_text_field_expand_to.size2;
            var size3 = body_copy_header_text_field_expand_to.size3;

            describe(`Expand and verify whether the Header Text field is
            ${size1.width}px in width and
            ${size1.height}px in height`, () => {

                    before(() => {

                        //Adjust the size of the field - size 1
                        AdjustSizeOfTheTextField('Header Text', 1, size1);

                        //Get the size of the Header Text field after the field is resized
                        _HeaderTextField = props.textarea2.get('Body Copy', 'Header Text', 1);
                        _AfterResize_Header_Text_Field = _HeaderTextField.getElementSize();
                    });

                    //Assertion - field dimensions should be equal to the adjusted field dimensions
                    it(`Width of the field should be ${size1.width}px`, () => {

                        expect(_AfterResize_Header_Text_Field.width).to.equal(size1.width);

                    });

                    it(`Height of the field should be ${size1.height}px`, () => {

                        expect(_AfterResize_Header_Text_Field.height).to.equal(size1.height);

                    });


                });

            describe(`Expand and verify whether the Header Text field is
            ${size2.width}px in width and
            ${size2.height}px in height`, () => {

                    before(() => {
                        //Adjust the size of the field - size 2
                        AdjustSizeOfTheTextField('Header Text', 1, size2);

                        //Get the size of the Header Text field after the field is resized
                        _HeaderTextField = props.textarea2.get('Body Copy', 'Header Text', 1);
                        _AfterResize_Header_Text_Field = _HeaderTextField.getElementSize();
                    });

                    //Assertion - field dimensions should be equal to the adjusted field dimensions
                    it(`Width of the field should be ${size2.width}px`, () => {
                        expect(_AfterResize_Header_Text_Field.width).to.equal(size2.width);
                    });

                    it(`Height of the field should be ${size2.height}px`, () => {
                        expect(_AfterResize_Header_Text_Field.height).to.equal(size2.height);
                    });
                });

            describe(`Expand and verify whether the Header Text field is
            ${size3.width}px in width and
            ${size3.height}px in height`, () => {

                    before(() => {
                        //Adjust the size of the field - size 3
                        AdjustSizeOfTheTextField('Header Text', 1, size3);

                        //Get the size of the Header Text field after the field is resized
                        _HeaderTextField = props.textarea2.get('Body Copy', 'Header Text', 1);
                        _AfterResize_Header_Text_Field = _HeaderTextField.getElementSize();
                    });

                    //Assertion - field dimensions should be equal to the adjusted field dimensions
                    it(`Width of the field should be ${size3.width}px`, () => {
                        expect(_AfterResize_Header_Text_Field.width).to.equal(size3.width);
                    });

                    it(`Height of the field should be ${size3.height}px`, () => {
                        expect(_AfterResize_Header_Text_Field.height).to.equal(size3.height);
                    });
                });


        });

        describe('Verify whether user is able to expand Text fields under Body Links section', () => {

            var _AfterResize_BodyLinks_Text_Field = null;

            var textField1_size1 = body_links_text_field_expand_to.text_field_1.size1;
            var textField1_size2 = body_links_text_field_expand_to.text_field_1.size2;
            var textField1_size3 = body_links_text_field_expand_to.text_field_1.size3;

            var textField2_size1 = body_links_text_field_expand_to.text_field_2.size1;
            var textField2_size2 = body_links_text_field_expand_to.text_field_2.size2;
            var textField2_size3 = body_links_text_field_expand_to.text_field_2.size3;

            var textField3_size1 = body_links_text_field_expand_to.text_field_3.size1;
            var textField3_size2 = body_links_text_field_expand_to.text_field_3.size2;
            var textField3_size3 = body_links_text_field_expand_to.text_field_3.size3;

            //Body Links Text Field 1 - Size 1
            describe(`Expand and verify whether the Body Links - Text field (1) is
                        ${textField1_size1.width}px in width and
                        ${textField1_size1.height}px in height`, () => {

                    before(() => {

                        //Adjust the size of the field - size 1
                        AdjustSizeOfTheTextField('Text', 3, textField1_size1);

                        //Get the size of the Header Text field after the field is resized
                        _AfterResize_BodyLinks_Text_Field = _TextField_BodyLinks_1.getElementSize();
                    });

                    //Assertion - field dimensions should be equal to the adjusted field dimensions
                    it(`Width of the field should be ${textField1_size1.width}px`, () => {

                        expect(_AfterResize_BodyLinks_Text_Field.width).to.equal(textField1_size1.width);

                    });

                    it(`Height of the field should be ${textField1_size1.height}px`, () => {

                        expect(_AfterResize_BodyLinks_Text_Field.height).to.equal(textField1_size1.height);

                    });


                });
            
            //Body Links Text Field 1 - Size 2
            describe(`Expand and verify whether the Body Links - Text field (1) is
                        ${textField1_size2.width}px in width and
                        ${textField1_size2.height}px in height`, () => {

                    before(() => {
                        //Adjust the size of the field - size 2
                        AdjustSizeOfTheTextField('Text', 3, textField1_size2);

                        //Get the size of the Header Text field after the field is resized
                        _AfterResize_BodyLinks_Text_Field = _TextField_BodyLinks_1.getElementSize();
                    });

                    //Assertion - field dimensions should be equal to the adjusted field dimensions
                    it(`Width of the field should be ${textField1_size2.width}px`, () => {
                        expect(_AfterResize_BodyLinks_Text_Field.width).to.equal(textField1_size2.width);
                    });

                    it(`Height of the field should be ${textField1_size2.height}px`, () => {
                        expect(_AfterResize_BodyLinks_Text_Field.height).to.equal(textField1_size2.height);
                    });
                });
            
            //Body Links Text Field 1 - Size 3
            describe(`Expand and verify whether the Body Links - Text field (1) is
                        ${textField1_size3.width}px in width and
                        ${textField1_size3.height}px in height`, () => {

                    before(() => {
                        //Adjust the size of the field - size 3
                        AdjustSizeOfTheTextField('Text', 3, textField1_size3);

                        //Get the size of the Header Text field after the field is resized
                        _AfterResize_BodyLinks_Text_Field = _TextField_BodyLinks_1.getElementSize();
                    });

                    //Assertion - field dimensions should be equal to the adjusted field dimensions
                    it(`Width of the field should be ${textField1_size3.width}px`, () => {
                        expect(_AfterResize_BodyLinks_Text_Field.width).to.equal(textField1_size3.width);
                    });

                    it(`Height of the field should be ${textField1_size3.height}px`, () => {
                        expect(_AfterResize_BodyLinks_Text_Field.height).to.equal(textField1_size3.height);
                    });
                });
            
            //Body Links Text Field 2 - Size 1
            describe(`Expand and verify whether the Body Links - Text field (2) is
                ${textField2_size1.width}px in width and
                ${textField2_size1.height}px in height`, () => {

                    before(() => {

                        //Adjust the size of the field - size 1
                        AdjustSizeOfTheTextField('Text', 4, textField2_size1);

                        //Get the size of the Header Text field after the field is resized
                        _AfterResize_BodyLinks_Text_Field = _TextField_BodyLinks_2.getElementSize();
                    });

                    //Assertion - field dimensions should be equal to the adjusted field dimensions
                    it(`Width of the field should be ${textField2_size1.width}px`, () => {

                        expect(_AfterResize_BodyLinks_Text_Field.width).to.equal(textField2_size1.width);

                    });

                    it(`Height of the field should be ${textField2_size1.height}px`, () => {

                        expect(_AfterResize_BodyLinks_Text_Field.height).to.equal(textField2_size1.height);

                    });


                });

            //Body Links Text Field 2 - Size 2
            describe(`Expand and verify whether the Body Links - Text field (2) is
                ${textField2_size2.width}px in width and
                ${textField2_size2.height}px in height`, () => {

                    before(() => {
                        //Adjust the size of the field - size 2
                        AdjustSizeOfTheTextField('Text', 4, textField2_size2);

                        //Get the size of the Header Text field after the field is resized
                        _AfterResize_BodyLinks_Text_Field = _TextField_BodyLinks_2.getElementSize();
                    });

                    //Assertion - field dimensions should be equal to the adjusted field dimensions
                    it(`Width of the field should be ${textField2_size2.width}px`, () => {
                        expect(_AfterResize_BodyLinks_Text_Field.width).to.equal(textField2_size2.width);
                    });

                    it(`Height of the field should be ${textField2_size2.height}px`, () => {
                        expect(_AfterResize_BodyLinks_Text_Field.height).to.equal(textField2_size2.height);
                    });
                });

            //Body Links Text Field 2 - Size 3
            describe(`Expand and verify whether the Body Links - Text field (2) is
                ${textField2_size3.width}px in width and
                ${textField2_size3.height}px in height`, () => {

                    before(() => {
                        //Adjust the size of the field - size 3
                        AdjustSizeOfTheTextField('Text', 4, textField2_size3);

                        //Get the size of the Header Text field after the field is resized
                        _AfterResize_BodyLinks_Text_Field = _TextField_BodyLinks_2.getElementSize();
                    });

                    //Assertion - field dimensions should be equal to the adjusted field dimensions
                    it(`Width of the field should be ${textField2_size3.width}px`, () => {
                        expect(_AfterResize_BodyLinks_Text_Field.width).to.equal(textField2_size3.width);
                    });

                    it(`Height of the field should be ${textField2_size3.height}px`, () => {
                        expect(_AfterResize_BodyLinks_Text_Field.height).to.equal(textField2_size3.height);
                    });
                });
                
            //Body Links Text Field 3 - Size 1
            describe(`Expand and verify whether the Body Links - Text field (3) is
                ${textField3_size1.width}px in width and
                ${textField3_size1.height}px in height`, () => {

                    before(() => {

                        //Adjust the size of the field - size 1
                        AdjustSizeOfTheTextField('Text', 5, textField3_size1);

                        //Get the size of the Header Text field after the field is resized
                        _AfterResize_BodyLinks_Text_Field = _TextField_BodyLinks_3.getElementSize();
                    });

                    //Assertion - field dimensions should be equal to the adjusted field dimensions
                    it(`Width of the field should be ${textField3_size1.width}px`, () => {

                        expect(_AfterResize_BodyLinks_Text_Field.width).to.equal(textField3_size1.width);

                    });

                    it(`Height of the field should be ${textField3_size1.height}px`, () => {

                        expect(_AfterResize_BodyLinks_Text_Field.height).to.equal(textField3_size1.height);

                    });


                });
            
            //Body Links Text Field 3 - Size 2
            describe(`Expand and verify whether the Body Links - Text field (3) is
                ${textField3_size2.width}px in width and
                ${textField3_size2.height}px in height`, () => {

                    before(() => {
                        //Adjust the size of the field - size 2
                        AdjustSizeOfTheTextField('Text', 5, textField3_size2);

                        //Get the size of the Header Text field after the field is resized
                        _AfterResize_BodyLinks_Text_Field = _TextField_BodyLinks_3.getElementSize();
                    });

                    //Assertion - field dimensions should be equal to the adjusted field dimensions
                    it(`Width of the field should be ${textField3_size2.width}px`, () => {
                        expect(_AfterResize_BodyLinks_Text_Field.width).to.equal(textField3_size2.width);
                    });

                    it(`Height of the field should be ${textField3_size2.height}px`, () => {
                        expect(_AfterResize_BodyLinks_Text_Field.height).to.equal(textField3_size2.height);
                    });
                });

            //Body Links Text Field 3 - Size 3
            describe(`Expand and verify whether the Body Links - Text field (3) is
                ${textField3_size3.width}px in width and
                ${textField3_size3.height}px in height`, () => {

                    before(() => {
                        //Adjust the size of the field - size 3
                        AdjustSizeOfTheTextField('Text', 5, textField3_size3);

                        //Get the size of the Header Text field after the field is resized
                        _AfterResize_BodyLinks_Text_Field = _TextField_BodyLinks_3.getElementSize();
                    });

                    //Assertion - field dimensions should be equal to the adjusted field dimensions
                    it(`Width of the field should be ${textField3_size3.width}px`, () => {
                        expect(_AfterResize_BodyLinks_Text_Field.width).to.equal(textField3_size3.width);
                    });

                    it(`Height of the field should be ${textField3_size3.height}px`, () => {
                        expect(_AfterResize_BodyLinks_Text_Field.height).to.equal(textField3_size3.height);
                    });
                });

        });

        describe('Verify whether user is able to expand Text fields under Lower Links section', () => {

            var _AfterResize_LowerLinks_Text_Field = null;

            var textField1_size1 = lower_links_text_field_expand_to.text_field_1.size1;
            var textField1_size2 = lower_links_text_field_expand_to.text_field_1.size2;
            var textField1_size3 = lower_links_text_field_expand_to.text_field_1.size3;

            var textField2_size1 = lower_links_text_field_expand_to.text_field_2.size1;
            var textField2_size2 = lower_links_text_field_expand_to.text_field_2.size2;
            var textField2_size3 = lower_links_text_field_expand_to.text_field_2.size3;

            var textField3_size1 = lower_links_text_field_expand_to.text_field_3.size1;
            var textField3_size2 = lower_links_text_field_expand_to.text_field_3.size2;
            var textField3_size3 = lower_links_text_field_expand_to.text_field_3.size3;

            //Lower Links Text Field 1 - Size 1
            describe(`Expand and verify whether the Lower Links - Text field (1) is
                                    ${textField1_size1.width}px in width and
                                    ${textField1_size1.height}px in height`, () => {

                    before(() => {

                        //Adjust the size of the field - size 1
                        AdjustSizeOfTheTextField('Text', 6, textField1_size1);

                        //Get the size of the Header Text field after the field is resized
                        _AfterResize_LowerLinks_Text_Field = _TextField_LowerLinks_1.getElementSize();
                    });

                    //Assertion - field dimensions should be equal to the adjusted field dimensions
                    it(`Width of the field should be ${textField1_size1.width}px`, () => {

                        expect(_AfterResize_LowerLinks_Text_Field.width).to.equal(textField1_size1.width);

                    });

                    it(`Height of the field should be ${textField1_size1.height}px`, () => {

                        expect(_AfterResize_LowerLinks_Text_Field.height).to.equal(textField1_size1.height);

                    });


                });

            //Lower Links Text Field 1 - Size 2
            describe(`Expand and verify whether the Lower Links - Text field (1) is
                                    ${textField1_size2.width}px in width and
                                    ${textField1_size2.height}px in height`, () => {

                    before(() => {
                        //Adjust the size of the field - size 2
                        AdjustSizeOfTheTextField('Text', 6, textField1_size2);

                        //Get the size of the Header Text field after the field is resized
                        _AfterResize_LowerLinks_Text_Field = _TextField_LowerLinks_1.getElementSize();
                    });

                    //Assertion - field dimensions should be equal to the adjusted field dimensions
                    it(`Width of the field should be ${textField1_size2.width}px`, () => {
                        expect(_AfterResize_LowerLinks_Text_Field.width).to.equal(textField1_size2.width);
                    });

                    it(`Height of the field should be ${textField1_size2.height}px`, () => {
                        expect(_AfterResize_LowerLinks_Text_Field.height).to.equal(textField1_size2.height);
                    });
                });

            //Lower Links Text Field 1 - Size 3
            describe(`Expand and verify whether the Lower Links - Text field (1) is
                                    ${textField1_size3.width}px in width and
                                    ${textField1_size3.height}px in height`, () => {

                    before(() => {
                        //Adjust the size of the field - size 3
                        AdjustSizeOfTheTextField('Text', 6, textField1_size3);

                        //Get the size of the Header Text field after the field is resized
                        _AfterResize_LowerLinks_Text_Field = _TextField_LowerLinks_1.getElementSize();
                    });

                    //Assertion - field dimensions should be equal to the adjusted field dimensions
                    it(`Width of the field should be ${textField1_size3.width}px`, () => {
                        expect(_AfterResize_LowerLinks_Text_Field.width).to.equal(textField1_size3.width);
                    });

                    it(`Height of the field should be ${textField1_size3.height}px`, () => {
                        expect(_AfterResize_LowerLinks_Text_Field.height).to.equal(textField1_size3.height);
                    });
                });

            //Lower Links Text Field 2 - Size 1
            describe(`Expand and verify whether the Lower Links - Text field (2) is
                            ${textField2_size1.width}px in width and
                            ${textField2_size1.height}px in height`, () => {

                    before(() => {

                        //Adjust the size of the field - size 1
                        AdjustSizeOfTheTextField('Text', 7, textField2_size1);

                        //Get the size of the Header Text field after the field is resized
                        _AfterResize_LowerLinks_Text_Field = _TextField_LowerLinks_2.getElementSize();
                    });

                    //Assertion - field dimensions should be equal to the adjusted field dimensions
                    it(`Width of the field should be ${textField2_size1.width}px`, () => {

                        expect(_AfterResize_LowerLinks_Text_Field.width).to.equal(textField2_size1.width);

                    });

                    it(`Height of the field should be ${textField2_size1.height}px`, () => {

                        expect(_AfterResize_LowerLinks_Text_Field.height).to.equal(textField2_size1.height);

                    });


                });
            
            //Lower Links Text Field 2 - Size 2
            describe(`Expand and verify whether the Lower Links - Text field (2) is
                            ${textField2_size2.width}px in width and
                            ${textField2_size2.height}px in height`, () => {

                    before(() => {
                        //Adjust the size of the field - size 2
                        AdjustSizeOfTheTextField('Text', 7, textField2_size2);

                        //Get the size of the Header Text field after the field is resized
                        _AfterResize_LowerLinks_Text_Field = _TextField_LowerLinks_2.getElementSize();
                    });

                    //Assertion - field dimensions should be equal to the adjusted field dimensions
                    it(`Width of the field should be ${textField2_size2.width}px`, () => {
                        expect(_AfterResize_LowerLinks_Text_Field.width).to.equal(textField2_size2.width);
                    });

                    it(`Height of the field should be ${textField2_size2.height}px`, () => {
                        expect(_AfterResize_LowerLinks_Text_Field.height).to.equal(textField2_size2.height);
                    });
                });

            //Lower Links Text Field 2 - Size 3
            describe(`Expand and verify whether the Lower Links - Text field (2) is
                            ${textField2_size3.width}px in width and
                            ${textField2_size3.height}px in height`, () => {

                    before(() => {
                        //Adjust the size of the field - size 3
                        AdjustSizeOfTheTextField('Text', 7, textField2_size3);

                        //Get the size of the Header Text field after the field is resized
                        _AfterResize_LowerLinks_Text_Field = _TextField_LowerLinks_2.getElementSize();
                    });

                    //Assertion - field dimensions should be equal to the adjusted field dimensions
                    it(`Width of the field should be ${textField2_size3.width}px`, () => {
                        expect(_AfterResize_LowerLinks_Text_Field.width).to.equal(textField2_size3.width);
                    });

                    it(`Height of the field should be ${textField2_size3.height}px`, () => {
                        expect(_AfterResize_LowerLinks_Text_Field.height).to.equal(textField2_size3.height);
                    });
                });

            //Lower Links Text Field 3 - Size 1
            describe(`Expand and verify whether the Lower Links - Text field (3) is
                            ${textField3_size1.width}px in width and
                            ${textField3_size1.height}px in height`, () => {

                    before(() => {

                        //Adjust the size of the field - size 1
                        AdjustSizeOfTheTextField('Text', 8, textField3_size1);

                        //Get the size of the Header Text field after the field is resized
                        _AfterResize_LowerLinks_Text_Field = _TextField_LowerLinks_3.getElementSize();
                    });

                    //Assertion - field dimensions should be equal to the adjusted field dimensions
                    it(`Width of the field should be ${textField3_size1.width}px`, () => {

                        expect(_AfterResize_LowerLinks_Text_Field.width).to.equal(textField3_size1.width);

                    });

                    it(`Height of the field should be ${textField3_size1.height}px`, () => {

                        expect(_AfterResize_LowerLinks_Text_Field.height).to.equal(textField3_size1.height);

                    });


                });

            //Lower Links Text Field 3 - Size 2
            describe(`Expand and verify whether the Lower Links - Text field (3) is
                            ${textField3_size2.width}px in width and
                            ${textField3_size2.height}px in height`, () => {

                    before(() => {
                        //Adjust the size of the field - size 2
                        AdjustSizeOfTheTextField('Text', 8, textField3_size2);

                        //Get the size of the Header Text field after the field is resized
                        _AfterResize_LowerLinks_Text_Field = _TextField_LowerLinks_3.getElementSize();
                    });

                    //Assertion - field dimensions should be equal to the adjusted field dimensions
                    it(`Width of the field should be ${textField3_size2.width}px`, () => {
                        expect(_AfterResize_LowerLinks_Text_Field.width).to.equal(textField3_size2.width);
                    });

                    it(`Height of the field should be ${textField3_size2.height}px`, () => {
                        expect(_AfterResize_LowerLinks_Text_Field.height).to.equal(textField3_size2.height);
                    });
                });

            //Lower Links Text Field 3 - Size 3
            describe(`Expand and verify whether the Body Links - Text field (3) is
                            ${textField3_size3.width}px in width and
                            ${textField3_size3.height}px in height`, () => {

                    before(() => {
                        //Adjust the size of the field - size 3
                        AdjustSizeOfTheTextField('Text', 8, textField3_size3);

                        //Get the size of the Header Text field after the field is resized
                        _AfterResize_LowerLinks_Text_Field = _TextField_LowerLinks_3.getElementSize();
                    });

                    //Assertion - field dimensions should be equal to the adjusted field dimensions
                    it(`Width of the field should be ${textField3_size3.width}px`, () => {
                        expect(_AfterResize_LowerLinks_Text_Field.width).to.equal(textField3_size3.width);
                    });

                    it(`Height of the field should be ${textField3_size3.height}px`, () => {
                        expect(_AfterResize_LowerLinks_Text_Field.height).to.equal(textField3_size3.height);
                    });
                });

        });

        after(() => {
            //Checkin the Shared Module
            test.SaveOrPublishTheAsset('Checkin', 'Testing PPE-121231 through automation script');

            //Expire the shared module
            test.SelectMoreActionsMenuItem('Expire');
        });
    });
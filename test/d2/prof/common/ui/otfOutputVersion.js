var maxWaitTimeInMs = 20000;

var OutputVersionObj = module.exports = {

    OutputVersionProperties: function(objName){
       
        var name = browser.isExisting("//label[@for='object_name-input']");
        expect(name).to.be.true;
        var title = browser.isExisting("//label[@for='title-input']");
        expect(title).to.be.true;
        var outputType = browser.isExisting("//label[@for='wbmd_outpt_type-input']");
        expect(outputType).to.be.true;   
        var media = browser.isExisting("//label[@for='wbmd_media-input']");
        expect(media).to.be.true;  
        
        },

    propertiesOtherTabElements: function(){
        var language =browser.isExisting("//label[@for='language_code']");
        expect(language).to.be.true;
        var status =browser.isExisting("//label[@for='r_current_state']");
        expect(status).to.be.true;
        var author = browser.isExisting("//label[@for='authors']");
        expect(author).to.be.true;
        var format = browser.isExisting("//label[@for='a_content_type']");
        expect(format).to.be.true;
        var fullContentSize = browser.isExisting("//label[@for='r_full_content_size']");
        expect(fullContentSize).to.be.true;
        var modified = browser.isExisting("//label[@for='r_modify_date']");
        expect(modified).to.be.true;
        var modifiedBy = browser.isExisting("//label[@for='r_modifier']");
        expect(modifiedBy).to.be.true;
        var createDate = browser.isExisting("//label[@for='r_creation_date']");
        expect(createDate).to.be.true;
        var creatorname = browser.isExisting("//label[@for='r_creator_name']");
        expect(creatorname).to.be.true;
        var checkoutDate = browser.isExisting("//label[@for='r_lock_date']");
        expect(checkoutDate).to.be.true;
        var checkoutBy = browser.isExisting("//label[@for='r_lock_owner']");
        expect(checkoutBy).to.be.true;
        var reviewDate = browser.isExisting("//label[@for='a_last_review_date']");
        expect(reviewDate).to.be.true;
        var accessBy = browser.isExisting("//label[@for='r_access_date']");
        expect(accessBy).to.be.true;
        var Owner = browser.isExisting("//label[@for='owner_name']");
        expect(Owner).to.be.true;
        var type =browser.isExisting("//label[@for='r_object_type']");
        expect(type).to.be.true;
        var version = browser.isExisting("//label[@for='r_version_label']");
        expect(version).to.be.true;
    },

    otfOutputversionDefaultValidation: function(){
        var defaultOutputlink = browser.isExisting("//td[contains(.,'text')]//following-sibling::td[contains(.,'Transcript')]//following-sibling::td[button[@popover-html='Unlink this item']]");
        expect(defaultOutputlink).to.be.false;
    },
    MovetoframeParent: function(){
        browser.frameParent();
    },
}
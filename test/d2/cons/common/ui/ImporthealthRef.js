var maxWaitTimeInMs = 50000;


var ImporthealthrefTabUIObj = {

    ImportHealthrefMandatoryfieldsValidation: function(){
        var Frndlyname = browser.isExisting("//span[contains(., 'Friendly Name')]");
        var ContentClassiification = browser.isExisting("//span[contains(., 'Content Classification')]");
        var UserDescription = browser.isExisting("//span[contains(., 'User Description')]");
        var WebmdKeywords = browser.isExisting("//span[contains(., 'WebMD Keywords')]");
        var WindowTitle = browser.isExisting("//span[contains(., 'Window Title')]");
        var Publication = browser.isExisting("//span[contains(., 'Publication')]");
        var PrimaryTopicid = browser.isExisting("//span[contains(., 'Primary Topic ID')]");
        expect(Frndlyname).to.be.true;
        expect(ContentClassiification).to.be.true;
        expect(UserDescription).to.be.true;
        expect(WebmdKeywords).to.be.true;
        expect(WindowTitle).to.be.true;
        expect(Publication).to.be.true;
        expect(PrimaryTopicid).to.be.true;
        browser.click("//button[contains(.,'OK') and @aria-disabled=not('false')]");
        browser.click("//button[contains(.,'Cancel Edit')]");
    },
     dropdownlistSelect: function(ddlocator){
        var drpdwnvalues;
        browser.setValue("//input[@id='"+ddlocator+"']","");
        browser.pause(1000);
        browser.click("//input[@id='"+ddlocator+"']//following-sibling::img");
        drpdwnvalues=browser.getText("//div[@class='x-combo-list-item ']");
        return drpdwnvalues;

    },


        ImportHealthref_Othertab_AttributesNames: function () {
        browser.click("//span/span[string()='Other']");
        var language = browser.isExisting("//label[string()='Language / Locale:']");
        expect(language).to.be.true;
        var status = browser.isExisting("//label[string()='Status:']");
        expect(status).to.be.true;
        var Wbmdstatus = browser.isExisting("//label[string()='wbmd_status:']");
        expect(Wbmdstatus).to.be.true;
        var author = browser.isExisting("//label[string()='Authors:']");
        expect(author).to.be.true;
        var versionlabel = browser.isExisting("//label[string()='Version Label:']");
        expect(versionlabel).to.be.true;
        var modified = browser.isExisting("//label[string()='Modified:']");
        expect(modified).to.be.true;
        var modifiedby = browser.isExisting("//label[string()='Modified By:']");
        expect(modifiedby).to.be.true;
        var created = browser.isExisting("//label[string()='Created:']");
        expect(created).to.be.true;
        var creatorName = browser.isExisting("//label[string()='Creator Name:']");
        expect(creatorName).to.be.true;
        var checkoutDate = browser.isExisting("//label[string()='Lock Date:']");
        expect(checkoutDate).to.be.true;
        var checkedOutBy = browser.isExisting("//label[string()='Lock Owner:']");
        expect(checkedOutBy).to.be.true;
        var ownerName = browser.isExisting("//label[string()='Owner:']");
        expect(ownerName).to.be.true;
        var type = browser.isExisting("//label[string()='Type:']");
        expect(type).to.be.true;
        var format = browser.isExisting("//label[string()='Format:']");
        expect(format).to.be.true;
        var fullContentSize = browser.isExisting("//label[string()='Full Content Size:']");
        expect(fullContentSize).to.be.true;
        var lastReviewDate = browser.isExisting("//label[string()='Last Reviewed On:']");
        expect(lastReviewDate).to.be.true;
        var accessed = browser.isExisting("//label[string()='Last Accessed On:']");
        expect(accessed).to.be.true;
    }

}

module.exports = ImporthealthrefTabUIObj;
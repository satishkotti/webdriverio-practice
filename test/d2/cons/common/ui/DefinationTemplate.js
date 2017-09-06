var maxWaitTimeInMs = 50000;


var DefinationTemplateTabUIObj = {

        DefenationtemplateMandatoryfieldsValidation: function(){
            

        var Name = browser.isExisting("//span[contains(., 'Name')]");
        var Title = browser.isExisting("//span[contains(., 'Title')]");
        var Frndlyname = browser.isExisting("//span[contains(., 'Friendly Name')]");
        var ContentClassiification = browser.isExisting("//span[contains(., 'Content Classification')]");
        var UserDescription = browser.isExisting("//span[contains(., 'User Description')]");
        var WebmdKeywords = browser.isExisting("//span[contains(., 'WebMD Keywords')]");
        var WindowTitle = browser.isExisting("//span[contains(., 'Window Title')]");
        var Publication = browser.isExisting("//span[contains(., 'Publication')]");
        var PrimaryTopicid = browser.isExisting("//span[contains(., 'Primary Topic ID')]");
        
        expect(ContentClassiification).to.be.true;
        browser.click("//button[contains(.,'OK') and @aria-disabled=not('false')]");
        browser.click("//button[contains(.,'Cancel Edit')]");
    },
   
    article_Othertab_AttributesNames: function () {
        browser.pause(10000);
        browser.click("//span/span[string()='Other']");
        var language = browser.isExisting("//label[string()='Language / Locale:']");
        expect(language).to.be.true;
        var status = browser.isExisting("//label[string()='Status:']");
        expect(status).to.be.true;
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
        var checkoutDate = browser.isExisting("//label[string()='Checkout Date:']");
        expect(checkoutDate).to.be.true;
        var checkedOutBy = browser.isExisting("//label[string()='Checked Out By:']");
        expect(checkedOutBy).to.be.true;
        var ownerName = browser.isExisting("//label[string()='Owner Name:']");
        expect(ownerName).to.be.true;
        var type = browser.isExisting("//label[string()='Type:']");
        expect(type).to.be.true;
        var format = browser.isExisting("//label[string()='Format:']");
        expect(format).to.be.true;
        var fullContentSize = browser.isExisting("//label[string()='Full Content Size:']");
        expect(fullContentSize).to.be.true;
        var lastReviewDate = browser.isExisting("//label[string()='Last Review Date:']");
        expect(lastReviewDate).to.be.true;
        var accessed = browser.isExisting("//label[string()='Accessed:']");
        expect(accessed).to.be.true;
    },
 
    article_AuthRevtab_AttributesNames: function () {
        browser.click("//span/span[string()='Auth & Rev']");
        var PrimaryAuthor = browser.isExisting("//label[string()='Primary Author(s):']");
        expect(PrimaryAuthor).to.be.true;
        var AdditionalAuthor = browser.isExisting("//label[string()='Additional Author(s):']");
        expect(AdditionalAuthor).to.be.true;
        var PrimaryMedicalReviewer = browser.isExisting("//label[string()='Primary Medical Reviewer:']");
        expect(PrimaryMedicalReviewer).to.be.true;
        var PrimaryMedicalReviewDate = browser.isExisting("//label[string()='Primary Medical Review Date:']");
        expect(PrimaryMedicalReviewDate).to.be.true;
        var SecondaryMedicalReviewer = browser.isExisting("//label[string()='Secondary Medical Reviewer:']");
        expect(SecondaryMedicalReviewer).to.be.true;
        var SecondaryMedicalReviewDate = browser.isExisting("//label[string()='Secondary Medical Review Date:']");
        expect(SecondaryMedicalReviewDate).to.be.true;
        var EditorReviewer = browser.isExisting("//label[string()='Editor Reviewer:']");
        expect(EditorReviewer).to.be.true;
        var EditorReviewDate = browser.isExisting("//label[string()='Editor Review Date:']");
        expect(EditorReviewDate).to.be.true;
        var CopyEditor = browser.isExisting("//label[string()='Copy Editor:']");
        expect(CopyEditor).to.be.true;
        var CopyEditorReviewDate = browser.isExisting("//label[string()='Copy Editor Review Date:']");
        expect(CopyEditorReviewDate).to.be.true;
    },
    article_AudChartab_AttributesNames: function () {
        browser.click("//span/span[string()='Aud Char.']");
        var AudienceAgeGroup = browser.isExisting("//label[string()='Audience Age Group:']");
        expect(AudienceAgeGroup).to.be.true;
        var AudienceGender = browser.isExisting("//label[string()='Audience Gender:']");
        expect(AudienceGender).to.be.true;
        var AudienceGeographicRegion = browser.isExisting("//label[string()='Audience Geographic Region:']");
        expect(AudienceGeographicRegion).to.be.true;
        var AudienceReadingLevel = browser.isExisting("//label[string()='Audience Reading Level:']");
        expect(AudienceReadingLevel).to.be.true;
        var AudienceEthnicity = browser.isExisting("//label[string()='Audience Ethnicity:']");
        expect(AudienceEthnicity).to.be.true;
        var AudienceSpecialInterests = browser.isExisting("//label[string()='Audience Special Interests:']");
        expect(AudienceSpecialInterests).to.be.true;
        var AudienceRelationtoRecipient = browser.isExisting("//label[string()='Audience Relation to Recipient:']");
        expect(AudienceRelationtoRecipient).to.be.true;
        var StageofCondition = browser.isExisting("//label[string()='Stage of Condition:']");
        expect(StageofCondition).to.be.true;
        var TimeofYear = browser.isExisting("//label[string()='Time of Year:']");
        expect(TimeofYear).to.be.true;
    },
    article_SponsorMLRtab_AttributesNames: function () {
        browser.click("//span/span[string()='Sponsor MLR']");
        var SponsorMLR = browser.isExisting("//label[string()='Sponsor MLR:']");
        expect(SponsorMLR).to.be.true;
        var SponsorMLRDate = browser.isExisting("//label[string()='Sponsor MLR Date:']");
        expect(SponsorMLRDate).to.be.true;
        var SponsorInternalMLR = browser.isExisting("//label[string()='Sponsor Internal MLR:']");
        expect(SponsorInternalMLR).to.be.true;
        var SponsorInternalMLRDate = browser.isExisting("//label[string()='Sponsor Internal MLR Date:']");
        expect(SponsorInternalMLRDate).to.be.true;
    },

}

module.exports = DefinationTemplateTabUIObj;
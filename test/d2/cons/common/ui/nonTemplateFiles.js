var maxWaitTimeInMs = 30000;
var propertiesTabUI = require('./../ui/propertiesTab');
var loadingresult = true;


var nonTemplateFiles = {
    importConsumerArticle: function (filetoupload) {

        browser.waitForVisible("//button[contains(text(),'IMPORT')]")
        browser.click('//button[contains(text(),"IMPORT")]');
        browser.waitForVisible("//a[contains(.,'WBMD Consumer Article')]");
        browser.click("//a[contains(.,'WBMD Consumer Article')]");
        browser.waitForVisible("#MultiImportDialog");
        browser.chooseFile('#importFiles-input-file', filetoupload);
        browser.click('//button[contains(text(),"Next")]');
    },
    importConsumerArticleProfile: function (profile) {
        browser.waitForVisible("//div[@id='creationProfileChooser']//img");
        browser.click("//div[@id='creationProfileChooser']//img");
        browser.waitForVisible("//div[string()='" + profile + "']")
        browser.click("//div[string()='" + profile + "']");
        browser.waitForVisible("//div[starts-with(@id,'combo')]//img");
        browser.click("//div[starts-with(@id,'combo')]//img");
        browser.waitForVisible("//div[@title='Consumer Article']");
        browser.click("//div[@title='Consumer Article']");
        browser.click('//button[contains(text(),"Next")]');
    },
    importMultipleConsumerArticle: function (filetoupload, filetoupload2) {
        browser.waitForVisible("//button[contains(text(),'IMPORT')]")
        browser.click('//button[contains(text(),"IMPORT")]');
        browser.waitForVisible("//a[contains(.,'WBMD Consumer Article')]");
        browser.click("//a[contains(.,'WBMD Consumer Article')]");
        browser.waitForVisible("#MultiImportDialog");
        browser.chooseFile('#importFiles-input-file', filetoupload);
        browser.chooseFile('#importFiles-input-file', filetoupload2);
        browser.waitForVisible("//div[@id='same_properties']//input[@type='checkbox']")
        browser.click("//div[@id='same_properties']//input[@type='checkbox']");
        browser.click('//button[contains(text(),"Next")]');
    },
    setMandatoryProperties: function (objName, descName, friendlyName, busRef, userDescr, keywords, windowTtl, publication,
        primaryTopicId) {
        browser.waitForVisible("#object_name-input");
        browser.setValue('#object_name-input', objName);
        browser.waitForVisible("#title-input");
        browser.setValue('#title-input', descName);
        propertiesTabUI.friendlyNameSet(friendlyName);
        propertiesTabUI.busRefNameSet(busRef);
        propertiesTabUI.userDescriptionNameSet(userDescr);
        propertiesTabUI.keywordsNameSet(keywords);
        propertiesTabUI.windowTitleSet(windowTtl);
        propertiesTabUI.publicationSet(publication);
        propertiesTabUI.primaryTopicIdSet(primaryTopicId);
        browser.click('//button[contains(text(),"Next")]');
        browser.pause(18000);

    },
    fileloading: function () {
        return browser.isVisible("//div[@class='ext-el-mask-msg x3-loading-medium']");
    },

    unSelectFile: function (filetoupload, filetoupload) {
        browser.waitForVisible("//button[contains(text(),'IMPORT')]")
        browser.click('//button[contains(text(),"IMPORT")]');
        browser.waitForVisible("//a[contains(.,'WBMD Consumer Article')]");
        browser.click("//a[contains(.,'WBMD Consumer Article')]");
        browser.waitForVisible("#MultiImportDialog");
        browser.chooseFile('#importFiles-input-file', filetoupload);
        browser.chooseFile('#importFiles-input-file', filetoupload);
        browser.waitForVisible("//div[@id='TestNonArticleTXT.txt']");
        browser.click("//div[@id='TestNonArticleTXT.txt']");
        browser.click("//div[@id='remove']");
        browser.click('//button[contains(text(),"Cancel") and @type="button"]');
    },
    checkout: function (assetName) {
        browser.waitForVisible("//span[@title='" + assetName + "']", maxWaitTimeInMs);
        browser.rightClick("//span[@title='" + assetName + "']");
        browser.pause(1000);
        browser.waitForVisible("div.x-menu-list", maxWaitTimeInMs);
        browser.waitForVisible("//a[contains(.,'Checkout')]");
        browser.click("//a[contains(.,'Checkout')]");
        browser.pause(4000);
    },
    cancelCheckout: function (assetName) {
        browser.waitForVisible("//span[@title='" + assetName + "']", maxWaitTimeInMs);
        browser.rightClick("//span[@title='" + assetName + "']");
        browser.pause(2000);
        browser.waitForVisible("div.x-menu-list", maxWaitTimeInMs);
        browser.waitForVisible("//a[contains(.,'Cancel checkout')]");
        browser.click("//a[contains(.,'Cancel checkout')]");
        browser.pause(4000);
    },
    checkin: function (assetName, filetoupload) {
        browser.waitForVisible("//span[@title='" + assetName + "']", maxWaitTimeInMs);
        browser.rightClick("//span[@title='" + assetName + "']");
        browser.pause(2000);
        browser.waitForVisible("div.x-menu-list", maxWaitTimeInMs);
        browser.waitForVisible("//a[contains(.,'Check in')]");
        browser.click("//a[contains(.,'Check in')]");
        browser.pause(4000);
        browser.waitForVisible("//span//span[contains(.,'Options')]");
        browser.click("//span//span[contains(.,'Options')]");
        browser.chooseFile('#checkinFromFile-input-file', filetoupload);
        browser.waitForVisible("//button[string()='OK' and @type='submit']");
        browser.click("//button[string()='OK' and @type='submit']");
        browser.pause(2000);
    },
    selectItemByName: function (assetName) {
        browser.pause(1000);
        browser.waitForVisible("//span[@title='" + assetName + "']", maxWaitTimeInMs);
        browser.click("//span[@title='" + assetName + "']");
        browser.pause(1000);
    },

    validationArticleProperties: function () {
        browser.pause(4000);
        browser.click('//button[contains(text(),"Next")]');
        var vad = browser.isExisting("//span[contains(.,'Descriptive Name') and contains(.,'Friendly Name') and contains(.,'Content Classification') and contains(.,'User Description') and contains(.,'WebMD Keywords') and contains(.,'Window Title') and contains(.,'Publication') and contains(.,'Primary Topic ID')]");
        browser.click('//button[contains(text(),"OK") and @aria-disabled=not("false")]');
        expect(vad).to.be.true;
    },
    article_Othertab_AttributesNames: function () {
        browser.click("//span/span[string()='Other']");
        var language = browser.isExisting("//label[string()='Language / Locale:']");
        expect(language).to.be.true;
        var status = browser.isExisting("//label[string()='Status:']");
        expect(status).to.be.true;
        var WPstatus = browser.isExisting("//label[string()='WP Status:']");
        expect(WPstatus).to.be.true;
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
    article_Articletab_AttributesNames: function () {
        var ChronicleID = browser.isExisting("//label[string()='Chronicle ID:']");
        expect(ChronicleID).to.be.true;
        var name = browser.isExisting("//label[string()='Name:']");
        expect(name).to.be.true;
        var FriendlyName = browser.isExisting("//label[string()='Friendly Name:']");
        expect(FriendlyName).to.be.true;
        var OmnitureAssetName = browser.isExisting("//label[string()='Omniture Asset Name:']");
        expect(OmnitureAssetName).to.be.true;
        var DescriptiveName = browser.isExisting("//label[string()='Descriptive Name:']");
        expect(DescriptiveName).to.be.true;
        var Subject = browser.isExisting("//label[string()='Subject:']");
        expect(Subject).to.be.true;
        var Category = browser.isExisting("//label[string()='Category:']");
        expect(Category).to.be.true;
        var Subheadline = browser.isExisting("//label[string()='Subheadline:']");
        expect(Subheadline).to.be.true;
        var ContentClassification = browser.isExisting("//label[string()='Content Classification:']");
        expect(ContentClassification).to.be.true;
        var HealthReferenceType = browser.isExisting("//label[string()='Health Reference Type:']");
        expect(HealthReferenceType).to.be.true;
        var UserDescription = browser.isExisting("//label[string()='User Description:']");
        expect(UserDescription).to.be.true;
        var MetaDescription = browser.isExisting("//label[string()='Meta Description:']");
        expect(MetaDescription).to.be.true;
        var WebMDKeywords = browser.isExisting("//label[string()='WebMD Keywords:']");
        expect(WebMDKeywords).to.be.true;
        var LinkTitle = browser.isExisting("//label[string()='Link Title:']");
        expect(LinkTitle).to.be.true;
        var WindowTitle = browser.isExisting("//label[string()='Window Title:']");
        expect(WindowTitle).to.be.true;
        var Publication = browser.isExisting("//label[string()='Publication:']");
        expect(Publication).to.be.true;
        var Copyright = browser.isExisting("//label[string()='Copyright:']");
        expect(Copyright).to.be.true;
        var Disclaimer = browser.isExisting("//label[string()='Disclaimer:']");
        expect(Disclaimer).to.be.true;
        var Channel = browser.isExisting("//label[string()='Channel:']");
        expect(Channel).to.be.true;
        var PrimarySubjectCode = browser.isExisting("//label[string()='Primary Subject Code:']");
        expect(PrimarySubjectCode).to.be.true;
        var Relevance1SubjectCode = browser.isExisting("//label[string()='Relevance1 Subject Code:']");
        expect(Relevance1SubjectCode).to.be.true;
        var InitialProductUse = browser.isExisting("//label[string()='Initial Product Use:']");
        expect(InitialProductUse).to.be.true;
        var SecondaryProductUse = browser.isExisting("//label[string()='Secondary Product Use:']");
        expect(SecondaryProductUse).to.be.true;
        var AdExclusion = browser.isExisting("//label[string()='Ad Exclusion:']");
        expect(AdExclusion).to.be.true;
        var PrimaryTopicID = browser.isExisting("//label[string()='Primary Topic ID:']");
        expect(PrimaryTopicID).to.be.true;
        var SecondaryTopicID = browser.isExisting("//label[string()='Secondary Topic ID:']");
        expect(SecondaryTopicID).to.be.true;
        var OverrideSiteArchiveDate = browser.isExisting("//label[string()='Override Site Archive Date:']");
        expect(OverrideSiteArchiveDate).to.be.true;
        var ExternalID = browser.isExisting("//label[string()='External ID:']");
        expect(ExternalID).to.be.true;
        var ProgramCollection = browser.isExisting("//label[string()='Program Collection:']");
        expect(ProgramCollection).to.be.true;
        var OriginalPublishDate = browser.isExisting("//label[string()='Original Publish Date:']");
        expect(OriginalPublishDate).to.be.true;
        var Archive = browser.isExisting("//label[string()='Archive?:']");
        expect(Archive).to.be.true;
        var ArticlewithinArticle = browser.isExisting("//label[string()='Article within Article:']");
        expect(ArticlewithinArticle).to.be.true;
        var PresentDynamically = browser.isExisting("//label[string()='Present Dynamically?:']");
        expect(PresentDynamically).to.be.true;
        var SiteOwner = browser.isExisting("//label[string()='Site Owner:']");
        expect(SiteOwner).to.be.true;
        var SitesNOTAllowedOn = browser.isExisting("//label[string()='Sites NOT Allowed On:']");
        expect(SitesNOTAllowedOn).to.be.true;
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

module.exports = nonTemplateFiles;
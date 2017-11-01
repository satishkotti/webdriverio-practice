var maxWaitTimeInMs = 30000;

module.exports = {

    pagebuilderPage_Pagetab_AttributesNames: function () {
        var chronicleID = browser.isExisting("//label[contains(.,'Chronicle ID')]");
        expect(chronicleID).to.be.true;
        var name = browser.isExisting("//label[string()='Name:']");
        expect(name).to.be.true;
        var friendlyName = browser.isExisting("//label[string()='Friendly Name:']");
        expect(friendlyName).to.be.true;
        var omnitureAssetName = browser.isExisting("//label[string()='Omniture Asset Name:']");
        expect(omnitureAssetName).to.be.true;
        var title = browser.isExisting("//label[string()='Title:']");
        expect(title).to.be.true;
        var linkTitle = browser.isExisting("//label[string()='Link Title:'] ");
        expect(linkTitle).to.be.true;
        var contentClassification = browser.isExisting("//label[string()='Content Classification:']");
        expect(contentClassification).to.be.true;
        var webMDAssetCSS = browser.isExisting("//label[string()='WebMD Asset CSS:']");
        expect(webMDAssetCSS).to.be.true;
        var channelID = browser.isExisting("//label[string()='Channel ID:']");
        expect(chronicleID).to.be.true;
        var primaryCollection = browser.isExisting("//label[string()='Primary Collection:']");
        expect(primaryCollection).to.be.true;
        var secondaryCollection = browser.isExisting("//label[string()='Secondary Collection:']");
        expect(secondaryCollection).to.be.true;
        var collectionCategory = browser.isExisting("//label[string()='Collection Category:']");
        expect(collectionCategory).to.be.true;
        var programCollection = browser.isExisting("//label[string()='Program Collection:']");
        expect(programCollection).to.be.true;
        var userDescription = browser.isExisting("//label[string()='User Description:']");
        expect(userDescription).to.be.true;
        var originalPublishDate = browser.isExisting("//label[string()='Original Publish Date:']");
        expect(originalPublishDate).to.be.true;
        var externallySearchable = browser.isExisting("//label[string()='Externally Searchable?:']");
        expect(externallySearchable).to.be.true;
        var internallySearchable = browser.isExisting("//label[string()='Internally Searchable?:']");
        expect(internallySearchable).to.be.true;
        var nodeID = browser.isExisting("//label[string()='Node ID:']");
        expect(nodeID).to.be.true;
        var parentTemplate = browser.isExisting("//label[string()='Parent Template:']");
        expect(parentTemplate).to.be.true;
        var schemaTarget = browser.isExisting("//label[string()='Schema Target:']");
        expect(schemaTarget).to.be.true;
        var programObject = browser.isExisting("//label[string()='Program Object (CBP):']");
        expect(programObject).to.be.true;
        var CAPPageType = browser.isExisting("//label[string()='CAP Page Type:']");
        expect(CAPPageType).to.be.false;
        var pageThumbnail = browser.isExisting("//label[string()='Page Thumbnail:']");
        expect(pageThumbnail).to.be.true;
        var adExclusion = browser.isExisting("//label[string()='Ad Exclusion:']");
        expect(adExclusion).to.be.true;
        var primaryTopicID = browser.isExisting("//label[string()='Primary Topic ID:']");
        expect(primaryTopicID).to.be.true;
        var IsCap = browser.isExisting("//label[string()='IsCap:']");
        expect(IsCap).to.be.true;
        var IsDefault = browser.isExisting("//label[string()='IsDefault:']");
        expect(IsDefault).to.be.true;
        var IsSlotted = browser.isExisting("//label[string()='IsSlotted:']");
        expect(IsSlotted).to.be.true;
        var slots = browser.isExisting("//label[string()='Slots:']");
        expect(slots).to.be.true;
        var versionID = browser.isExisting("//label[string()='Version ID (r_object_id):']");
        expect(versionID).to.be.true;
    },

    pagebuilderPage_Pagetab_AttributesTags: function () {
        var chronicleID = browser.isExisting("//div[@id='i_chronicle_id']");
        expect(chronicleID).to.be.true;
        var name = browser.isExisting("//div[@id='object_name']");
        expect(name).to.be.true;
        var friendlyName = browser.isExisting("//div[@id='wbmd_c_frnd_nm']");
        expect(friendlyName).to.be.true;
        var omnitureAssetName = browser.isExisting("//div[@id='wbmd_c_asset_name']");
        expect(omnitureAssetName).to.be.true;
        var title = browser.isExisting("//div[@id='title']");
        expect(title).to.be.true;
        var linkTitle = browser.isExisting("//div[@id='wbmd_lk_ttl']");
        expect(linkTitle).to.be.true;
        var contentClassification = browser.isExisting("//div[@id='wbmd_bus_ref']");
        expect(contentClassification).to.be.true;
        var webMDAssetCSS = browser.isExisting("//div[@id='wbmd_pb_asset_css']");
        expect(webMDAssetCSS).to.be.true;
        var channelID = browser.isExisting("//div[@id='wbmd_c_channel_id']");
        expect(chronicleID).to.be.true;
        var primaryCollection = browser.isExisting("//div[@id='wbmd_prim_col']");
        expect(primaryCollection).to.be.true;
        var secondaryCollection = browser.isExisting("//div[@id='wbmd_sec_col']");
        expect(secondaryCollection).to.be.true;
        var collectionCategory = browser.isExisting("//div[@id='wbmd_col_cat']");
        expect(collectionCategory).to.be.true;
        var programCollection = browser.isExisting("//div[@id='wbmd_prog_col']");
        expect(programCollection).to.be.true;
        var userDescription = browser.isExisting("//div[@id='wbmd_desc_user']");
        expect(userDescription).to.be.true;
        var originalPublishDate = browser.isExisting("//div[@id='wbmd_orig_pub_dt']");
        expect(originalPublishDate).to.be.true;
        var externallySearchable = browser.isExisting("//div[@id='wbmd_pb_isextsearchable']");
        expect(externallySearchable).to.be.true;
        var internallySearchable = browser.isExisting("//div[@id='wbmd_pb_isintsearchable']");
        expect(internallySearchable).to.be.true;
        var nodeID = browser.isExisting("//div[@id='wbmd_pb_node_id']");
        expect(nodeID).to.be.true;
        var parentTemplate = browser.isExisting("//div[@id='wbmd_pb_parenttemplate']");
        expect(parentTemplate).to.be.true;
        var schemaTarget = browser.isExisting("//div[@id='wbmd_pb_schema_tgt']");
        expect(schemaTarget).to.be.true;
        var programObject = browser.isExisting("//div[@id='wbmd_prog_id']");
        expect(programObject).to.be.true;
        var CAPPageType = browser.isExisting("//div[@id='wbmd_pb_cap_type']");
        expect(CAPPageType).to.be.false;
        var pageThumbnail = browser.isExisting("//div[@id='wbmd_pb_thmbnl']");
        expect(pageThumbnail).to.be.true;
        var adExclusion = browser.isExisting("//div[@id='wbmd_relv3_subj_cd']");
        expect(adExclusion).to.be.true;
        var primaryTopicID = browser.isExisting("//div[@id='wbmd_c_prim_top_id']");
        expect(primaryTopicID).to.be.true;
        var IsCap = browser.isExisting("//div[@id='wbmd_pb_is_cap']");
        expect(IsCap).to.be.true;
        var IsDefault = browser.isExisting("//div[@id='wbmd_pb_is_default']");
        expect(IsDefault).to.be.true;
        var IsSlotted = browser.isExisting("//div[@id='wbmd_pb_is_slotted']");
        expect(IsSlotted).to.be.true;
        var slots = browser.isExisting("//div[@id='wbmd_pb_slots']");
        expect(slots).to.be.true;
        var versionID = browser.isExisting("//div[@id='r_object_id']");
        expect(versionID).to.be.true;

    },

    pagebuilderAsset_Othertab_AttributesNames: function () {
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
    pagebuilderAsset_Othertab_AttributesTag: function () {
        browser.click("//span/span[string()='Other']");
        var language = browser.isExisting("//div[@id='language_code']");
        expect(language).to.be.true;
        var status = browser.isExisting("//div[@id='r_current_state']");
        expect(status).to.be.true;
        var WPstatus = browser.isExisting("//div[@id='a_status']");
        expect(WPstatus).to.be.true;
        var author = browser.isExisting("//div[@id='authors']");
        expect(author).to.be.true;
        var versionlabel = browser.isExisting("//div[@id='r_version_label']");
        expect(versionlabel).to.be.true;
        var modified = browser.isExisting("//div[@id='r_modify_date']");
        expect(modified).to.be.true;
        var modifiedby = browser.isExisting("//div[@id='r_modifier']");
        expect(modifiedby).to.be.true;
        var created = browser.isExisting("//div[@id='r_creation_date']");
        expect(created).to.be.true;
        var creatorName = browser.isExisting("//div[@id='r_creator_name']");
        expect(creatorName).to.be.true;
        var checkoutDate = browser.isExisting("//div[@id='r_lock_date']");
        expect(checkoutDate).to.be.true;
        var checkedOutBy = browser.isExisting("//div[@id='r_lock_owner']");
        expect(checkedOutBy).to.be.true;
        var ownerName = browser.isExisting("//div[@id='owner_name']");
        expect(ownerName).to.be.true;
        var type = browser.isExisting("//div[@id='r_object_type']");
        expect(type).to.be.true;
        var format = browser.isExisting("//div[@id='a_content_type']");
        expect(format).to.be.true;
        var fullContentSize = browser.isExisting("//div[@id='r_full_content_size']");
        expect(fullContentSize).to.be.true;
        var lastReviewDate = browser.isExisting("//div[@id='a_last_review_date']");
        expect(lastReviewDate).to.be.true;
        var accessed = browser.isExisting("//div[@id='r_access_date']");
        expect(accessed).to.be.true;
    },
    pagebuilderAsset_Publishingtab_AttributesNames: function () {
        browser.click("//span/span[string()='Publishing']");
        var effectiveDate = browser.isExisting("//label[string()='Effective Date:']");
        expect(effectiveDate).to.be.true;
        var expirationDate = browser.isExisting("//label[string()='Expiration Date:']");
        expect(expirationDate).to.be.true;
        var publishFormat = browser.isExisting("//label[string()='Publish Formats:']");
        expect(publishFormat).to.be.true;
    },
    pagebuilderAsset_Publishingtab_AttributesTag: function () {
        browser.click("//span/span[string()='Publishing']");
        var effectiveDate = browser.isExisting("//div[@id='a_effective_date']");
        expect(effectiveDate).to.be.true;
        var expirationDate = browser.isExisting("//div[@id='a_expiration_date']");
        expect(expirationDate).to.be.true;
        var publishFormat = browser.isExisting("//div[@id='a_publish_formats']");
        expect(publishFormat).to.be.true;
    },

    pagebuilderTemplate_Templatetab_AttributesNames: function () {
        var chronicleID = browser.isExisting("//label[contains(.,'Chronicle ID')]");
        expect(chronicleID).to.be.true;
        var name = browser.isExisting("//label[string()='Name:']");
        expect(name).to.be.true;
        var title = browser.isExisting("//label[string()='Title:']");
        expect(title).to.be.true;
        var webMDAssetCSS = browser.isExisting("//label[string()='WebMD Asset CSS:']");
        expect(webMDAssetCSS).to.be.true;
        var userDescription = browser.isExisting("//label[string()='User Description:']");
        expect(userDescription).to.be.true;
        var originalPublishDate = browser.isExisting("//label[string()='Original Publish Date:']");
        expect(originalPublishDate).to.be.true;
        var externallySearchable = browser.isExisting("//label[string()='Externally Searchable?:']");
        expect(externallySearchable).to.be.true;
        var internallySearchable = browser.isExisting("//label[string()='Internally Searchable?:']");
        expect(internallySearchable).to.be.true;
        var nodeID = browser.isExisting("//label[string()='Node ID:']");
        expect(nodeID).to.be.true;
        var parentTemplate = browser.isExisting("//label[string()='Parent Template:']");
        expect(parentTemplate).to.be.true;
        var schemaTarget = browser.isExisting("//label[string()='Schema Target:']");
        expect(schemaTarget).to.be.true;
        var programObject = browser.isExisting("//label[string()='Program Object (CBP):']");
        expect(programObject).to.be.true;
        var gatedUsername = browser.isExisting("//label[string()='Gated Username:']");
        expect(gatedUsername).to.be.true;
        var IsGated = browser.isExisting("//label[string()='Is Gated?:']");
        expect(IsGated).to.be.true;
        var pbAsset = browser.isExisting("//label[string()='wbmd_pb_assetjs:']");
        expect(pbAsset).to.be.true;
        var skin = browser.isExisting("//label[string()='Skin:']");
        expect(skin).to.be.true;
        var versionID = browser.isExisting("//label[string()='Version ID (r_object_id):']");
        expect(versionID).to.be.true;
    },

    pagebuilderTemplate_Templatetab_AttributesTags: function () {
        var chronicleID = browser.isExisting("//div[@id='i_chronicle_id']");
        expect(chronicleID).to.be.true;
        var name = browser.isExisting("//div[@id='object_name']");
        expect(name).to.be.true;
        var title = browser.isExisting("//div[@id='title']");
        expect(title).to.be.true;
        var webMDAssetCSS = browser.isExisting("//div[@id='wbmd_pb_asset_css']");
        expect(webMDAssetCSS).to.be.true;
        var userDescription = browser.isExisting("//div[@id='wbmd_desc_user']");
        expect(userDescription).to.be.true;
        var originalPublishDate = browser.isExisting("//div[@id='wbmd_orig_pub_dt']");
        expect(originalPublishDate).to.be.true;
        var externallySearchable = browser.isExisting("//div[@id='wbmd_pb_isextsearchable']");
        expect(externallySearchable).to.be.true;
        var internallySearchable = browser.isExisting("//div[@id='wbmd_pb_isintsearchable']");
        expect(internallySearchable).to.be.true;
        var nodeID = browser.isExisting("//div[@id='wbmd_pb_node_id']");
        expect(nodeID).to.be.true;
        var parentTemplate = browser.isExisting("//div[@id='wbmd_pb_parenttemplate']");
        expect(parentTemplate).to.be.true;
        var schemaTarget = browser.isExisting("//div[@id='wbmd_pb_schema_tgt']");
        expect(schemaTarget).to.be.true;
        var programObject = browser.isExisting("//div[@id='wbmd_prog_id']");
        expect(programObject).to.be.true;
        var gatedusername = browser.isExisting("//div[@id='wbmd_pb_gatedusername']");
        expect(gatedusername).to.be.true;
        var IsGated = browser.isExisting("//div[@id='wbmd_pb_is_gated']");
        expect(IsGated).to.be.true;
        var pbAsset = browser.isExisting("//div[@id='wbmd_pb_assetjs']");
        expect(pbAsset).to.be.true;
        var skin = browser.isExisting("//div[@id='wbmd_pb_skin']");
        expect(skin).to.be.true;
        var versionID = browser.isExisting("//div[@id='r_object_id']");
        expect(versionID).to.be.true;

    },
    pagebuilderTemplateModule_TemplateModuletab_AttributesNames: function () {
        var chronicleID = browser.isExisting("//label[contains(.,'Chronicle ID')]");
        expect(chronicleID).to.be.true;
        var name = browser.isExisting("//label[string()='Name:']");
        expect(name).to.be.true;
        var title = browser.isExisting("//label[string()='Title:']");
        expect(title).to.be.true;
        var cacheDuration = browser.isExisting("//label[string()='Cache Duration:']");
        expect(cacheDuration).to.be.true;
        var moduleCategory = browser.isExisting("//label[string()='Module Category:']");
        expect(moduleCategory).to.be.true;
        var dynamicModuleCategory = browser.isExisting("//label[string()='Dynamic Module Category:']");
        expect(dynamicModuleCategory).to.be.true;
        var moduleLabel1 = browser.isExisting("//label[string()='Module Label 1:']");
        expect(moduleLabel1).to.be.true;
        var moduleLabel2 = browser.isExisting("//label[string()='Module Label 2:']");
        expect(moduleLabel2).to.be.true;
        var pagebuilderModuleTier = browser.isExisting("//label[string()='Pagebuilder Module Tier:']");
        expect(pagebuilderModuleTier).to.be.true;
        var moduleXSL = browser.isExisting("//label[string()='Module XSL:']");
        expect(moduleXSL).to.be.true;
        var moduleCSS = browser.isExisting("//label[string()='Module CSS:']");
        expect(moduleCSS).to.be.true;
        //var programObject = browser.isExisting("//label[string()='Program Object (CBP):']");
        //expect(programObject).to.be.false;
        var moduleDataSchema = browser.isExisting("//label[string()='Module Data Schema:']");
        expect(moduleDataSchema).to.be.true;
        var ownerPageID  = browser.isExisting("//label[string()='Owner Page ID:']");
        expect(ownerPageID).to.be.true;
        var versionID = browser.isExisting("//label[string()='Version ID (r_object_id):']");
        expect(versionID).to.be.true;
    },

    pagebuilderTemplateModule_TemplateModuletab_AttributesTags: function () {
        var chronicleID = browser.isExisting("//div[@id='i_chronicle_id']");
        expect(chronicleID).to.be.true;
        var name = browser.isExisting("//div[@id='object_name']");
        expect(name).to.be.true;
        var title = browser.isExisting("//div[@id='title']");
        expect(title).to.be.true;
        var cacheDuration = browser.isExisting("//div[@id='wbmd_pb_cache_duration']");
        expect(cacheDuration).to.be.true;
        var moduleCategory = browser.isExisting("//div[@id='wbmd_pb_module_category']");
        expect(moduleCategory).to.be.true;
        var dynamicModuleCategory = browser.isExisting("//div[@id='wbmd_pb_dyn_module_category']");
        expect(dynamicModuleCategory).to.be.true;
        var moduleLabel1 = browser.isExisting("//div[@id='wbmd_pb_module_label1']");
        expect(moduleLabel1).to.be.true;
        var moduleLabel2 = browser.isExisting("//div[@id='wbmd_pb_module_label2']");
        expect(moduleLabel2).to.be.true;
        var pagebuilderModuleTier = browser.isExisting("//div[@id='wbmd_pb_module_tier']");
        expect(pagebuilderModuleTier).to.be.true;
        var moduleXSL = browser.isExisting("//div[@id='wbmd_pb_module_xsl']");
        expect(moduleXSL).to.be.true;
        var moduleCSS = browser.isExisting("//div[@id='wbmd_pb_asset_css']");
        expect(moduleCSS).to.be.true;
       // var programObject = browser.isExisting("//div[@id='wbmd_prog_id']");
       // expect(programObject).to.be.false;
        var moduleDataSchema = browser.isExisting("//div[@id='wbmd_pb_moduledataschema']");
        expect(moduleDataSchema).to.be.true;
        var ownerPageID  = browser.isExisting("//div[@id='wbmd_pb_owner_page_id']");
        expect(ownerPageID).to.be.true;
        var versionID = browser.isExisting("//div[@id='r_object_id']");
        expect(versionID).to.be.true;

    },
     pagebuilderModule_Moduletab_AttributesNames: function () {
        var chronicleID = browser.isExisting("//label[contains(.,'Chronicle ID')]");
        expect(chronicleID).to.be.true;
        var name = browser.isExisting("//label[string()='Name:']");
        expect(name).to.be.true;
        var title = browser.isExisting("//label[string()='Title:']");
        expect(title).to.be.true;
        var cacheDuration = browser.isExisting("//label[string()='Cache Duration:']");
        expect(cacheDuration).to.be.true;
        var moduleCategory = browser.isExisting("//label[string()='Module Category:']");
        expect(moduleCategory).to.be.true;
        var dynamicModuleCategory = browser.isExisting("//label[string()='Dynamic Module Category:']");
        expect(dynamicModuleCategory).to.be.true;
        var moduleLabel1 = browser.isExisting("//label[string()='Module Label 1:']");
        expect(moduleLabel1).to.be.true;
        var moduleLabel2 = browser.isExisting("//label[string()='Module Label 2:']");
        expect(moduleLabel2).to.be.true;
        var pagebuilderModuleTier = browser.isExisting("//label[string()='Pagebuilder Module Tier:']");
        expect(pagebuilderModuleTier).to.be.true;
        var moduleXSL = browser.isExisting("//label[string()='Module XSL:']");
        expect(moduleXSL).to.be.true;
        var moduleCSS = browser.isExisting("//label[string()='Module CSS:']");
        expect(moduleCSS).to.be.true;
       // var programObject = browser.isExisting("//label[string()='Program Object (CBP):']");
        //expect(programObject).to.be.false;
        var moduleDataSchema = browser.isExisting("//label[string()='Module Data Schema:']");
        expect(moduleDataSchema).to.be.true;
        var ownerPageID  = browser.isExisting("//label[string()='Owner Page ID:']");
        expect(ownerPageID).to.be.true;
        var versionID = browser.isExisting("//label[string()='Version ID (r_object_id):']");
        expect(versionID).to.be.true;
        var channelID = browser.isExisting("//label[string()='Channel IDs:']");
        expect(channelID).to.be.true;
        var programCollection = browser.isExisting("//label[string()='Program Collection:']");
        expect(programCollection).to.be.true;
        var displayProperties = browser.isExisting("//label[string()='Display Properties:']");
        expect(displayProperties).to.be.true;
    },

    pagebuilderModule_Moduletab_AttributesTags: function () {
        var chronicleID = browser.isExisting("//div[@id='i_chronicle_id']");
        expect(chronicleID).to.be.true;
        var name = browser.isExisting("//div[@id='object_name']");
        expect(name).to.be.true;
        var title = browser.isExisting("//div[@id='title']");
        expect(title).to.be.true;
        var cacheDuration = browser.isExisting("//div[@id='wbmd_pb_cache_duration']");
        expect(cacheDuration).to.be.true;
        var moduleCategory = browser.isExisting("//div[@id='wbmd_pb_module_category']");
        expect(moduleCategory).to.be.true;
        var dynamicModuleCategory = browser.isExisting("//div[@id='wbmd_pb_dyn_module_category']");
        expect(dynamicModuleCategory).to.be.true;
        var moduleLabel1 = browser.isExisting("//div[@id='wbmd_pb_module_label1']");
        expect(moduleLabel1).to.be.true;
        var moduleLabel2 = browser.isExisting("//div[@id='wbmd_pb_module_label2']");
        expect(moduleLabel2).to.be.true;
        var pagebuilderModuleTier = browser.isExisting("//div[@id='wbmd_pb_module_tier']");
        expect(pagebuilderModuleTier).to.be.true;
        var moduleXSL = browser.isExisting("//div[@id='wbmd_pb_module_xsl']");
        expect(moduleXSL).to.be.true;
        var moduleCSS = browser.isExisting("//div[@id='wbmd_pb_asset_css']");
        expect(moduleCSS).to.be.true;
        //var programObject = browser.isExisting("//div[@id='wbmd_prog_id']");
        //expect(programObject).to.be.false;
        var moduleDataSchema = browser.isExisting("//div[@id='wbmd_pb_moduledataschema']");
        expect(moduleDataSchema).to.be.true;
        var ownerPageID  = browser.isExisting("//div[@id='wbmd_pb_owner_page_id']");
        expect(ownerPageID).to.be.true;
        var versionID = browser.isExisting("//div[@id='r_object_id']");
        expect(versionID).to.be.true;
        var channelID = browser.isExisting("//div[@id='wbmd_c_channel_ids']");
        expect(channelID).to.be.true;
        var programCollection = browser.isExisting("//div[@id='wbmd_prog_col']");
        expect(programCollection).to.be.true;
        var displayProperties = browser.isExisting("//div[@id='wbmd_pb_module_visibility']");
        expect(displayProperties).to.be.true;

    },
    pagebuilderSharedModule_SharedModuletab_AttributesNames: function () {
        var chronicleID = browser.isExisting("//label[contains(.,'Chronicle ID')]");
        expect(chronicleID).to.be.true;
        var name = browser.isExisting("//label[string()='Name:']");
        expect(name).to.be.true;
        var title = browser.isExisting("//label[string()='Title:']");
        expect(title).to.be.true;
        var cacheDuration = browser.isExisting("//label[string()='Cache Duration:']");
        expect(cacheDuration).to.be.true;
        var moduleCategory = browser.isExisting("//label[string()='Module Category:']");
        expect(moduleCategory).to.be.true;
        var dynamicModuleCategory = browser.isExisting("//label[string()='Dynamic Module Category:']");
        expect(dynamicModuleCategory).to.be.true;
        var moduleLabel1 = browser.isExisting("//label[string()='Module Label 1:']");
        expect(moduleLabel1).to.be.true;
        var moduleLabel2 = browser.isExisting("//label[string()='Module Label 2:']");
        expect(moduleLabel2).to.be.true;
        var pagebuilderModuleTier = browser.isExisting("//label[string()='Pagebuilder Module Tier:']");
        expect(pagebuilderModuleTier).to.be.true;
        var moduleXSL = browser.isExisting("//label[string()='Module XSL:']");
        expect(moduleXSL).to.be.true;
        var moduleCSS = browser.isExisting("//label[string()='Module CSS:']");
        expect(moduleCSS).to.be.true;
        var defaultDynamicModuleCategory = browser.isExisting("//label[string()='Default Dynamic Module Category:']");
        expect(defaultDynamicModuleCategory).to.be.true;
        var moduleDataSchema = browser.isExisting("//label[string()='Module Data Schema:']");
        expect(moduleDataSchema).to.be.true;
        var ownerPageID  = browser.isExisting("//label[string()='Owner Page ID:']");
        expect(ownerPageID).to.be.true;
        var versionID = browser.isExisting("//label[string()='Version ID (r_object_id):']");
        expect(versionID).to.be.true;
        var channelID = browser.isExisting("//label[string()='Channel IDs:']");
        expect(channelID).to.be.true;
        var programCollection = browser.isExisting("//label[string()='Program Collections:']");
        expect(programCollection).to.be.true;
        var moduleVisibility = browser.isExisting("//label[string()='Module Visibility:']");
        expect(moduleVisibility).to.be.true;
        var friendlyName = browser.isExisting("//label[string()='Friendly Name:']");
        expect(friendlyName).to.be.true;
    },

    pagebuilderSharedModule_SharedModuletab_AttributesTags: function () {
        var chronicleID = browser.isExisting("//div[@id='i_chronicle_id']");
        expect(chronicleID).to.be.true;
        var name = browser.isExisting("//div[@id='object_name']");
        expect(name).to.be.true;
        var title = browser.isExisting("//div[@id='title']");
        expect(title).to.be.true;
        var cacheDuration = browser.isExisting("//div[@id='wbmd_pb_cache_duration']");
        expect(cacheDuration).to.be.true;
        var moduleCategory = browser.isExisting("//div[@id='wbmd_pb_module_category']");
        expect(moduleCategory).to.be.true;
        var dynamicModuleCategory = browser.isExisting("//div[@id='wbmd_pb_dyn_module_category']");
        expect(dynamicModuleCategory).to.be.true;
        var moduleLabel1 = browser.isExisting("//div[@id='wbmd_pb_module_label1']");
        expect(moduleLabel1).to.be.true;
        var moduleLabel2 = browser.isExisting("//div[@id='wbmd_pb_module_label2']");
        expect(moduleLabel2).to.be.true;
        var pagebuilderModuleTier = browser.isExisting("//div[@id='wbmd_pb_module_tier']");
        expect(pagebuilderModuleTier).to.be.true;
        var moduleXSL = browser.isExisting("//div[@id='wbmd_pb_module_xsl']");
        expect(moduleXSL).to.be.true;
        var moduleCSS = browser.isExisting("//div[@id='wbmd_pb_asset_css']");
        expect(moduleCSS).to.be.true;
        var defaultDynamicModuleCategory = browser.isExisting("//div[@id='wbmd_pb_dyn_module_cat_def']");
        expect(defaultDynamicModuleCategory).to.be.true;
        var moduleDataSchema = browser.isExisting("//div[@id='wbmd_pb_moduledataschema']");
        expect(moduleDataSchema).to.be.true;
        var ownerPageID  = browser.isExisting("//div[@id='wbmd_pb_owner_page_id']");
        expect(ownerPageID).to.be.true;
        var versionID = browser.isExisting("//div[@id='r_object_id']");
        expect(versionID).to.be.true;
        var channelID = browser.isExisting("//div[@id='wbmd_c_channel_id']");
        expect(channelID).to.be.true;
        var programCollection = browser.isExisting("//div[@id='wbmd_prog_cols']");
        expect(programCollection).to.be.true;
        var moduleVisibility = browser.isExisting("//div[@id='wbmd_pb_module_visibility']");
        expect(moduleVisibility).to.be.true;
        var friendlyName = browser.isExisting("//div[@id='wbmd_c_frnd_nm']");
        expect(friendlyName).to.be.true;

    },
     pagebuilderSchemas_Schemastab_AttributesNames: function () {
        var chronicleID = browser.isExisting("//label[contains(.,'Chronicle ID')]");
        expect(chronicleID).to.be.true;
        var name = browser.isExisting("//label[string()='Name:']");
        expect(name).to.be.true;
        var title = browser.isExisting("//label[string()='Title:']");
        expect(title).to.be.true;
        var targetSchema = browser.isExisting("//label[string()='Target Schema:']");
        expect(targetSchema).to.be.true;
        var originalDotNetNukeidentifier = browser.isExisting("//label[string()='Original DotNetNuke identifier:']");
        expect(originalDotNetNukeidentifier).to.be.true;
        var schemaCategory = browser.isExisting("//label[string()='Schema Category:']");
        expect(schemaCategory).to.be.true;
        var versionID = browser.isExisting("//label[string()='Version ID (r_object_id):']");
        expect(versionID).to.be.true;
    },

    pagebuilderSchemas_Schemastab_AttributesTags: function () {
        var chronicleID = browser.isExisting("//div[@id='i_chronicle_id']");
        expect(chronicleID).to.be.true;
        var name = browser.isExisting("//div[@id='object_name']");
        expect(name).to.be.true;
        var title = browser.isExisting("//div[@id='title']");
        expect(title).to.be.true;
        var targetSchema = browser.isExisting("//div[@id='wbmd_pb_schema_tgt']");
        expect(targetSchema).to.be.true;
        var originalDotNetNukeidentifier = browser.isExisting("//div[@id='wbmd_pb_dnn_module_def_id']");
        expect(originalDotNetNukeidentifier).to.be.true;
        var schemaCategory = browser.isExisting("//div[@id='wbmd_pb_schema_category']");
        expect(schemaCategory).to.be.true;
        var versionID = browser.isExisting("//div[@id='r_object_id']");
        expect(versionID).to.be.true;

    },
         pagebuilderXSL_XSLtab_AttributesNames: function () {
        var chronicleID = browser.isExisting("//label[contains(.,'Chronicle ID')]");
        expect(chronicleID).to.be.true;
        var name = browser.isExisting("//label[string()='Name:']");
        expect(name).to.be.true;
        var title = browser.isExisting("//label[string()='Title:']");
        expect(title).to.be.true;
        var level = browser.isExisting("//label[string()='Level:']");
        expect(level).to.be.true;
        var XSLCategory = browser.isExisting("//label[string()='XSL Category:']");
        expect(XSLCategory).to.be.true;
        var XSLSchema = browser.isExisting("//label[string()='XSL Schema:']");
        expect(XSLSchema).to.be.true;
        var versionID = browser.isExisting("//label[string()='Version ID (r_object_id):']");
        expect(versionID).to.be.true;
    },

    pagebuilderXSL_XSLtab_AttributesTags: function () {
        var chronicleID = browser.isExisting("//div[@id='i_chronicle_id']");
        expect(chronicleID).to.be.true;
        var name = browser.isExisting("//div[@id='object_name']");
        expect(name).to.be.true;
        var title = browser.isExisting("//div[@id='title']");
        expect(title).to.be.true;
        var level = browser.isExisting("//div[@id='wbmd_pb_level']");
        expect(level).to.be.true;
        var XSLCategory = browser.isExisting("//div[@id='wbmd_pb_xsl_category']");
        expect(XSLCategory).to.be.true;
        var XSLSchema = browser.isExisting("//div[@id='wbmd_pb_xsl_schema']");
        expect(XSLSchema).to.be.true;
        var versionID = browser.isExisting("//div[@id='r_object_id']");
        expect(versionID).to.be.true;

    },
        pagebuilderCSS_CSStab_AttributesNames: function () {
        var chronicleID = browser.isExisting("//label[contains(.,'Chronicle ID')]");
        expect(chronicleID).to.be.true;
        var name = browser.isExisting("//label[string()='Name:']");
        expect(name).to.be.true;
        var title = browser.isExisting("//label[string()='Title:']");
        expect(title).to.be.true;
        var level = browser.isExisting("//label[string()='Level:']");
        expect(level).to.be.true;
        var CSSCategory = browser.isExisting("//label[string()='CSS Category:']");
        expect(CSSCategory).to.be.true;
        var PBXSL = browser.isExisting("//label[string()='PB XSL:']");
        expect(PBXSL).to.be.true;
        var versionID = browser.isExisting("//label[string()='Version ID (r_object_id):']");
        expect(versionID).to.be.true;
    },

    pagebuilderCSS_CSStab_AttributesTags: function () {
        var chronicleID = browser.isExisting("//div[@id='i_chronicle_id']");
        expect(chronicleID).to.be.true;
        var name = browser.isExisting("//div[@id='object_name']");
        expect(name).to.be.true;
        var title = browser.isExisting("//div[@id='title']");
        expect(title).to.be.true;
        var level = browser.isExisting("//div[@id='wbmd_pb_level']");
        expect(level).to.be.true;
        var CSSCategory = browser.isExisting("//div[@id='wbmd_pb_css_category']");
        expect(CSSCategory).to.be.true;
        var PBXSL = browser.isExisting("//div[@id='wbmd_pb_xsl']");
        expect(PBXSL).to.be.true;
        var versionID = browser.isExisting("//div[@id='r_object_id']");
        expect(versionID).to.be.true;

    },
       pagebuilderJS_JStab_AttributesNames: function () {
        var chronicleID = browser.isExisting("//label[contains(.,'Chronicle ID')]");
        expect(chronicleID).to.be.true;
        var name = browser.isExisting("//label[string()='Name:']");
        expect(name).to.be.true;
        var title = browser.isExisting("//label[string()='Title:']");
        expect(title).to.be.true;
        var versionID = browser.isExisting("//label[string()='Version ID (r_object_id):']");
        expect(versionID).to.be.true;
    },

    pagebuilderJS_JStab_AttributesTags: function () {
        var chronicleID = browser.isExisting("//div[@id='i_chronicle_id']");
        expect(chronicleID).to.be.true;
        var name = browser.isExisting("//div[@id='object_name']");
        expect(name).to.be.true;
        var title = browser.isExisting("//div[@id='title']");
        expect(title).to.be.true;
        var versionID = browser.isExisting("//div[@id='r_object_id']");
        expect(versionID).to.be.true;

    },
}
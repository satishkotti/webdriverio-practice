var maxWaitTimeInMs = 20000;

var mediaObj = module.exports = {

    mediaProperties: function(objName){
       
        var name = browser.isExisting("//label[@for='object_name-input']");
        expect(name).to.be.true;
        var title = browser.isExisting("//label[@for='title-input']");
        expect(title).to.be.true;
        var mediaFormat = browser.isExisting("//label[@for='wbmd_media_type-input']");
        expect(mediaFormat).to.be.true;
        var mediaLocation = browser.isExisting("//label[@for='wbmd_media_dl_url-input']");
        expect(mediaLocation).to.be.true;
        var videoRSSMediaLocation = browser.isExisting("//label[@for='wbmd_vid_rss_media_loc-input']");
        expect(videoRSSMediaLocation).to.be.true;
        var audioRSSMediaLocation = browser.isExisting("//label[@for='wbmd_aud_rss_media_loc-input']");
        expect(audioRSSMediaLocation).to.be.true;
        var autoplay = browser.isExisting("//label[@for='wbmd_autoplay-input']");
        expect(autoplay).to.be.true;
        var startImageLocation = browser.isExisting("//label[@for='wbmd_start_img_loc-input']");
        expect(startImageLocation).to.be.true;
        var endImageLocation = browser.isExisting("//label[@for='wbmd_end_img_loc-input']");
        expect(endImageLocation).to.be.true;
        var configFileLocation = browser.isExisting("//label[@for='wbmd_config_loc-input']");
        expect(configFileLocation).to.be.true;
        var SWFLocation = browser.isExisting("//label[@for='wbmd_swf_loc-input']");
        expect(SWFLocation).to.be.true;
        var duration = browser.isExisting("//label[@for='wbmd_media_duration-input']");
        expect(duration).to.be.true;
        var audioDownloadBytes = browser.isExisting("//label[@for='wbmd_file_size-input']");
        expect(audioDownloadBytes).to.be.true;
        var videoDownloadBytes = browser.isExisting("//label[@for='wbmd_vid_file_size-input']");
        expect(videoDownloadBytes).to.be.true;
        var width = browser.isExisting("//label[@for='wbmd_media_width-input']");
        expect(width).to.be.true;
        var height = browser.isExisting("//label[@for='wbmd_media_height-input']");
        expect(height).to.be.true;
        var baseFolder = browser.isExisting("//label[@for='wbmd_media_base-input']");
        expect(baseFolder).to.be.true;
        var userDescription = browser.isExisting("//label[@for='wbmd_desc_user-input']");
        expect(userDescription).to.be.true;
        var WebMDKeywords = browser.isExisting("//label[@for='wbmd_keywords-input']");
        expect(WebMDKeywords).to.be.true;
        var windowTitle = browser.isExisting("//label[@for='wbmd_wdw_ttl-input']");
        expect(windowTitle).to.be.true;
        var publication = browser.isExisting("//label[@for='wbmd_publ-input']");
        expect(publication).to.be.true;
        var externalID = browser.isExisting("//label[@for='wbmd_ext_id-input']");
        expect(externalID).to.be.true;
        var publicationDate = browser.isExisting("//label[@for='wbmd_orig_pub_dt-input']");
        expect(publicationDate).to.be.true;    
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
    }

        
}

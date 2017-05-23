module.exports.MultipleVideoLaunchXMLValues = (result) => {
    var obj = {};

    var rowNumber = 0;
    var moduleSettings = result.webmd_rendition.content.wbmd_asset.webmd_module.module_settings;
    //Module settings
    obj["title"] = moduleSettings.hasOwnProperty('title') ? moduleSettings.title : 'title missed on xml';
    obj["object_name"] = moduleSettings.hasOwnProperty('object_name') ? moduleSettings.object_name : 'object_name missed on xml';
    obj["object_type"] = moduleSettings.hasOwnProperty('object_type') ? moduleSettings.object_type : 'object_type missed on xml';
    obj["wbmd_pb_module_category"] = moduleSettings.hasOwnProperty('wbmd_pb_module_category') ? moduleSettings.wbmd_pb_module_category : 'wbmd_pb_module_category missed on xml';
    obj["wbmd_pb_dyn_module_category"] = moduleSettings.hasOwnProperty('wbmd_pb_dyn_module_category') ? moduleSettings.wbmd_pb_dyn_module_category : 'wbmd_pb_dyn_module_category missed on xml';
    obj["wbmd_pb_module_label1"] = (moduleSettings.hasOwnProperty('md_pb_module_label1_group') && moduleSettings.md_pb_module_label1_group.wbmd_pb_module_label1 != undefined) ? moduleSettings.md_pb_module_label1_group.wbmd_pb_module_label1 : 'md_pb_module_label1_group.wbmd_pb_module_label1 missed on xml';
    obj["wbmd_pb_module_label2"] = (moduleSettings.hasOwnProperty('md_pb_module_label2_group') && moduleSettings.md_pb_module_label1_group.wbmd_pb_module_label1 != undefined) ? moduleSettings.md_pb_module_label2_group.wbmd_pb_module_label2 : 'md_pb_module_label2_group.wbmd_pb_module_label2 missed on xml';
    obj["wbmd_pb_module_sp_program"] = moduleSettings.hasOwnProperty('wbmd_pb_module_sp_program') ? moduleSettings.wbmd_pb_module_sp_program : 'wbmd_pb_module_sp_program missed on xml';
    obj["wbmd_pb_cache_duration"] = moduleSettings.hasOwnProperty('wbmd_pb_cache_duration') ? moduleSettings.wbmd_pb_cache_duration : 'wbmd_pb_cache_duration missed on xml';
    obj["wbmd_c_channel_ids_group"] = moduleSettings.hasOwnProperty('wbmd_c_channel_ids_group') ? moduleSettings.wbmd_c_channel_ids_group : 'wbmd_c_channel_ids_group missed on xml';
    obj["wbmd_program_group"] = moduleSettings.hasOwnProperty('wbmd_program_group') ? moduleSettings.wbmd_program_group : 'wbmd_program_group missed on xml';
    obj["wbmd_pb_asset_css_path"] = moduleSettings.hasOwnProperty('wbmd_pb_asset_css') && moduleSettings.wbmd_pb_asset_css ? moduleSettings.wbmd_pb_asset_css.$.path : 'wbmd_pb_asset_css.$.path missed on xml';
    obj["wbmd_pb_asset_css_object_type"] = moduleSettings.hasOwnProperty('wbmd_pb_asset_css') && moduleSettings.wbmd_pb_asset_css ? moduleSettings.wbmd_pb_asset_css.$.object_type : 'wbmd_pb_asset_css.$.object_type missed on xml';
    obj["wbmd_pb_module_xsl_path"] = moduleSettings.hasOwnProperty('wbmd_pb_module_xsl') && moduleSettings.wbmd_pb_module_xsl ? moduleSettings.wbmd_pb_module_xsl.$.path : 'wbmd_pb_module_xsl.$.path missed on xml';
    obj["wbmd_pb_module_xsl_object_type"] = moduleSettings.hasOwnProperty('wbmd_pb_module_xsl') && moduleSettings.wbmd_pb_module_xsl ? moduleSettings.wbmd_pb_module_xsl.$.object_type : 'wbmd_pb_module_xsl_object_type missed on xml';

    // moduleSettings.wbmd_pb_moduledataschema.forEach(function (element) {
    //     rowNumber = rowNumber + 1;
    //     obj["wbmd_pb_moduledataschema_path_" + rowNumber] = element.$.path;
    //     obj["wbmd_pb_moduledataschema_object_type_" + rowNumber] = element.$.object_type;
    // }, this);

    obj["wbmd_pb_owner_page_id_path"] = moduleSettings.hasOwnProperty('wbmd_pb_owner_page_id') && moduleSettings.wbmd_pb_owner_page_id ? moduleSettings.wbmd_pb_owner_page_id.$.path : 'wbmd_pb_owner_page_id.$.path missed on xml';
    obj["wbmd_pb_owner_page_id_object_type"] = moduleSettings.hasOwnProperty('wbmd_pb_owner_page_id') && moduleSettings.wbmd_pb_owner_page_id ? moduleSettings.wbmd_pb_owner_page_id.$.object_type : 'wbmd_pb_owner_page_id_object_type missed on xml';
    obj["dnn_id"] = moduleSettings.hasOwnProperty('dnn_id') ? moduleSettings.dnn_id : 'dnn_id missed on xml';
    obj["class"] = moduleSettings.hasOwnProperty('class') ? moduleSettings.class : 'class missed on xml';

    //moduledata 
    var moduleData = result.webmd_rendition.content.wbmd_asset.webmd_module.module_data;
    obj["VideoBrand"] = moduleData.hasOwnProperty('VideoBrand') ? moduleData.VideoBrand : 'VideoBrand missed on xml';
    obj["VideoLinkView"] = moduleData.hasOwnProperty('VideoLinkView') ? moduleData.VideoLinkView : 'VideoLinkView missed on xml';
    obj["ModuleDescription"] = moduleData.hasOwnProperty('ModuleDescription') ? moduleData.ModuleDescription : 'ModuleDescription missed on xml';
    obj["ModuleTitle"] = moduleData.hasOwnProperty('ModuleTitle') ? moduleData.ModuleTitle : 'ModuleTitle missed on xml';

    if (moduleData.Videos.length != undefined) {
        moduleData.Videos.forEach(function (element) {
            rowNumber = rowNumber + 1;
            obj["VideoTitleOverride_" + rowNumber] = element.hasOwnProperty('VideoTitleOverride') ? element.VideoTitleOverride : 'VideoTitleOverride missed on xml';
            obj["VideoDescriptionOverride_" + rowNumber] = element.hasOwnProperty('VideoDescriptionOverride') ? element.VideoDescriptionOverride : 'VideoDescriptionOverride missed on xml';
            obj["videosource_chronic_id_" + rowNumber] = element.hasOwnProperty('VideoSource') && element.VideoSource ? element.VideoSource.$.chronic_id : 'VideoSource.$.chronic_id missed on xml';
            obj["VideoLink_chronic_id_" + rowNumber] = element.hasOwnProperty('VideoLink') && element.VideoLink && element.VideoLink.$.chronic_id != undefined ? true : false;
            obj["PopupLink_chronic_id_" + rowNumber] = element.hasOwnProperty('PopupLink') && element.PopupLink && element.PopupLink.$.chronic_id != undefined ? true : false;

        }, this);
    }
    else {
        obj["VideoTitleOverride_1"] = moduleData.Videos.Video.hasOwnProperty('VideoTitleOverride') ? moduleData.Videos.Video.VideoTitleOverride : 'VideoTitleOverride missed on xml';
        obj["VideoDescriptionOverride_1"] = moduleData.Videos.Video.hasOwnProperty('VideoDescriptionOverride') ? moduleData.Videos.Video.VideoDescriptionOverride : 'VideoDescriptionOverride missed on xml';
        obj["videosource_chronic_id_1"] = moduleData.Videos.Video.hasOwnProperty('VideoSource') && moduleData.Videos.Video.VideoSource ? moduleData.Videos.Video.VideoSource.$.chronic_id : 'VideoSource.$.chronic_id missed on xml';
        obj["VideoLink_chronic_id_1"] = moduleData.Videos.Video.hasOwnProperty('VideoLink') && moduleData.Videos.Video.VideoLink && moduleData.Videos.Video.VideoLink.$.chronic_id != undefined ? true : false;
        obj["PopupLink_chronic_id_1"] = moduleData.Videos.Video.hasOwnProperty('PopupLink') && moduleData.Videos.Video.PopupLink && moduleData.Videos.Video.PopupLink.$.chronic_id != undefined ? true : false;

    }

    //chronic_id exits checking on different attributes
    obj['chronic_id'] = moduleSettings.hasOwnProperty('chronic_id');
    obj['wbmd_pb_asset_css_chronic_id'] = false;
    if (moduleSettings.hasOwnProperty('wbmd_pb_asset_css')) {
        // var keys=Object.keys(moduleSettings.wbmd_pb_asset_css.$);
        if ('chronic_id' in moduleSettings.wbmd_pb_asset_css.$) {
            obj['wbmd_pb_asset_css_chronic_id'] = true;
        }
    }
    obj['wbmd_pb_module_xsl_chronic_id'] = false;
    if (moduleSettings.hasOwnProperty('wbmd_pb_module_xsl')) {
        //var keys=Object.keys(moduleSettings.wbmd_pb_module_xsl.$);
        if (moduleSettings.wbmd_pb_module_xsl.$.chronic_id != undefined) {
            obj['wbmd_pb_module_xsl_chronic_id'] = true;
        }
    }

    return obj;
}

module.exports.SponsorModuleLaunchXMLValues = (result) => {

    var obj = {};
    var rowNumber = 0;
    var moduleSettings = result.webmd_rendition.content.wbmd_asset.webmd_module.module_settings;
    //Module settings
    obj["title"] = moduleSettings.hasOwnProperty('title') ? moduleSettings.title : 'title missed on xml';
    obj["object_name"] = moduleSettings.hasOwnProperty('object_name') ? moduleSettings.object_name : 'object_name missed on xml';
    obj["object_type"] = moduleSettings.hasOwnProperty('object_type') ? moduleSettings.object_type : 'object_type missed on xml';
    obj["wbmd_pb_module_category"] = moduleSettings.hasOwnProperty('wbmd_pb_module_category') ? moduleSettings.wbmd_pb_module_category : 'wbmd_pb_module_category missed on xml';
    obj["wbmd_pb_dyn_module_category"] = moduleSettings.hasOwnProperty('wbmd_pb_dyn_module_category') ? moduleSettings.wbmd_pb_dyn_module_category : 'wbmd_pb_dyn_module_category missed on xml';
    obj["wbmd_pb_module_label1"] = (moduleSettings.hasOwnProperty('md_pb_module_label1_group') && moduleSettings.md_pb_module_label1_group.wbmd_pb_module_label1 != undefined) ? moduleSettings.md_pb_module_label1_group.wbmd_pb_module_label1 : 'md_pb_module_label1_group.wbmd_pb_module_label1 missed on xml';
    obj["wbmd_pb_module_label2"] = (moduleSettings.hasOwnProperty('md_pb_module_label2_group') && moduleSettings.md_pb_module_label1_group.wbmd_pb_module_label1 != undefined) ? moduleSettings.md_pb_module_label2_group.wbmd_pb_module_label2 : 'md_pb_module_label2_group.wbmd_pb_module_label2 missed on xml';
    obj["wbmd_pb_module_sp_program"] = moduleSettings.hasOwnProperty('wbmd_pb_module_sp_program') ? moduleSettings.wbmd_pb_module_sp_program : 'wbmd_pb_module_sp_program missed on xml';
    obj["wbmd_pb_cache_duration"] = moduleSettings.hasOwnProperty('wbmd_pb_cache_duration') ? moduleSettings.wbmd_pb_cache_duration : 'wbmd_pb_cache_duration missed on xml';
    obj["wbmd_c_channel_ids_group"] = moduleSettings.hasOwnProperty('wbmd_c_channel_ids_group') ? moduleSettings.wbmd_c_channel_ids_group : 'wbmd_c_channel_ids_group missed on xml';
    obj["wbmd_program_group"] = moduleSettings.hasOwnProperty('wbmd_program_group') ? moduleSettings.wbmd_program_group : 'wbmd_program_group missed on xml';
    obj["wbmd_pb_asset_css_path"] = moduleSettings.hasOwnProperty('wbmd_pb_asset_css') && moduleSettings.wbmd_pb_asset_css ? moduleSettings.wbmd_pb_asset_css.$.path : 'wbmd_pb_asset_css.$.path missed on xml';
    obj["wbmd_pb_asset_css_object_type"] = moduleSettings.hasOwnProperty('wbmd_pb_asset_css') && moduleSettings.wbmd_pb_asset_css ? moduleSettings.wbmd_pb_asset_css.$.object_type : 'wbmd_pb_asset_css.$.object_type missed on xml';
    obj["wbmd_pb_module_xsl_path"] = moduleSettings.hasOwnProperty('wbmd_pb_module_xsl') && moduleSettings.wbmd_pb_module_xsl ? moduleSettings.wbmd_pb_module_xsl.$.path : 'wbmd_pb_module_xsl.$.path missed on xml';
    obj["wbmd_pb_module_xsl_object_type"] = moduleSettings.hasOwnProperty('wbmd_pb_module_xsl') && moduleSettings.wbmd_pb_module_xsl ? moduleSettings.wbmd_pb_module_xsl.$.object_type : 'wbmd_pb_module_xsl_object_type missed on xml';
    obj["wbmd_pb_owner_page_id_path"] = moduleSettings.hasOwnProperty('wbmd_pb_owner_page_id') && moduleSettings.wbmd_pb_owner_page_id ? moduleSettings.wbmd_pb_owner_page_id.$.path : 'wbmd_pb_owner_page_id.$.path missed on xml';
    obj["wbmd_pb_owner_page_id_object_type"] = moduleSettings.hasOwnProperty('wbmd_pb_owner_page_id') && moduleSettings.wbmd_pb_owner_page_id ? moduleSettings.wbmd_pb_owner_page_id.$.object_type : 'wbmd_pb_owner_page_id_object_type missed on xml';
    obj["dnn_id"] = moduleSettings.hasOwnProperty('dnn_id') ? moduleSettings.dnn_id : 'dnn_id missed on xml';
    obj["class"] = moduleSettings.hasOwnProperty('class') ? moduleSettings.class : 'class missed on xml';
    obj['chronic_id'] = moduleSettings.hasOwnProperty('chronic_id');


    //module data from xml
    var moduleData = result.webmd_rendition.content.wbmd_asset.webmd_module.module_data;

    //sponsor_logo info
    var sponsorLogo = moduleData.sponsor_logo;
    obj['sponsor_logo_override_text'] = sponsorLogo.hasOwnProperty('sponsor_logo_override_text') ? sponsorLogo.sponsor_logo_override_text : 'sponsor_logo_override_text missed on xml';
    obj['sponsor_logo_link_view'] = sponsorLogo.hasOwnProperty('sponsor_logo_link_view') ? sponsorLogo.sponsor_logo_link_view : 'sponsor_logo_link_view missed on xml';
    obj['sponsor_logo_source_directive'] = sponsorLogo.hasOwnProperty('sponsor_logo_source') && sponsorLogo.sponsor_logo_source ? sponsorLogo.sponsor_logo_source.$.directive : 'sponsor_logo_source missed on xml';
    obj['sponsor_logo_source_object_type'] = sponsorLogo.hasOwnProperty('sponsor_logo_source') && sponsorLogo.sponsor_logo_source ? sponsorLogo.sponsor_logo_source.$.object_type : 'sponsor_logo_source missed on xml';;
    obj['sponsor_logo_source_wbmd_lookup_type'] = sponsorLogo.hasOwnProperty('sponsor_logo_source') && sponsorLogo.sponsor_logo_source ? sponsorLogo.sponsor_logo_source.$.wbmd_lookup_type : 'sponsor_logo_source missed on xml';;
    obj['sponsor_logo_source_wbmd_storage_value'] = sponsorLogo.hasOwnProperty('sponsor_logo_source') && sponsorLogo.sponsor_logo_source ? sponsorLogo.sponsor_logo_source.$.wbmd_storage_value : 'sponsor_logo_source missed on xml';;
    obj['sponsor_logo_source_path'] = sponsorLogo.hasOwnProperty('sponsor_logo_source') && sponsorLogo.sponsor_logo_source ? sponsorLogo.sponsor_logo_source.$.path : 'sponsor_logo_source missed on xml';
    obj['sponsor_logo_source_alt'] = sponsorLogo.hasOwnProperty('sponsor_logo_source') && sponsorLogo.sponsor_logo_source ? sponsorLogo.sponsor_logo_source.$.alt : 'sponsor_logo_source missed on xml';
    obj['sponsor_logo_link_directive'] = sponsorLogo.hasOwnProperty('sponsor_logo_link') && sponsorLogo.sponsor_logo_link ? sponsorLogo.sponsor_logo_link.$.directive : 'sponsor_logo_link missed on xml';
    obj['sponsor_logo_link_object_type'] = sponsorLogo.hasOwnProperty('sponsor_logo_link') && sponsorLogo.sponsor_logo_link ? sponsorLogo.sponsor_logo_link.$.object_type : 'sponsor_logo_link missed on xml';
    obj['sponsor_logo_link_wbmd_lookup_type'] = sponsorLogo.hasOwnProperty('sponsor_logo_link') && sponsorLogo.sponsor_logo_link ? sponsorLogo.sponsor_logo_link.$.wbmd_lookup_type : 'sponsor_logo_link missed on xml';
    obj['sponsor_logo_link_wbmd_storage_value'] = sponsorLogo.hasOwnProperty('sponsor_logo_link') && sponsorLogo.sponsor_logo_link ? sponsorLogo.sponsor_logo_link.$.wbmd_storage_value : 'sponsor_logo_link missed on xml';
    obj['sponsor_logo_source_chronic_id'] = sponsorLogo.hasOwnProperty('sponsor_logo_source') && sponsorLogo.sponsor_logo_source && sponsorLogo.sponsor_logo_source.$.chronic_id != undefined ? true : false;
    obj['sponsor_logo_link_chronic_id'] = sponsorLogo.hasOwnProperty('sponsor_logo_link') && sponsorLogo.sponsor_logo_link && sponsorLogo.sponsor_logo_link.$.chronic_id != undefined ? true : false;

    //header info
    var header = moduleData.header;
    obj["header_text"] = header.hasOwnProperty('header_text') ? header.header_text : 'header_text missed on xml';
    obj['header_link_view'] = header.hasOwnProperty('header_link_view') ? header.header_link_view : 'header_link_view missed on xml';;
    obj['header_link_directive'] = header.hasOwnProperty('header_link') && header.header_link ? header.header_link.$.directive : 'header_link missed on xml';;
    obj['header_link_object_type'] = header.hasOwnProperty('header_link') && header.header_link ? header.header_link.$.object_type : 'header_link missed on xml';;
    obj['header_link_wbmd_lookup_type'] = header.hasOwnProperty('header_link') && header.header_link ? header.header_link.$.wbmd_lookup_type : 'header_link missed on xml';;
    obj['header_link_wbmd_storage_value'] = header.hasOwnProperty('header_link') && header.header_link ? header.header_link.$.wbmd_storage_value : 'header_link missed on xml';;
    obj['header_link_chronic_id'] = header.hasOwnProperty('header_link') && header.header_link && header.header_link.$.chronic_id != undefined ? true : false;

    //body_copies info
    var bodyCopies = moduleData.body_copies;
    rowNumber = 0;
    if (bodyCopies.body_copy.length != undefined) {
        bodyCopies.body_copy.forEach(function (element) {
            rowNumber = rowNumber + 1;
            obj['body_copy_body_copy_text_' + rowNumber] = element.hasOwnProperty('body_copy_text') ? element.body_copy_text : 'body_copy_text missed on xml';
            obj['body_copy_body_copy_link_view_' + rowNumber] = element.hasOwnProperty('body_copy_link_view') ? element.body_copy_link_view : 'body_copy_link_view missed on xml';
            obj['body_copy_body_copy_link_directive_' + rowNumber] = element.hasOwnProperty('body_copy_link') && element.body_copy_link ? element.body_copy_link.$.directive : 'body_copy_link missed on xml';
            obj['body_copy_body_copy_link_object_type_' + rowNumber] = element.hasOwnProperty('body_copy_link') && element.body_copy_link ? element.body_copy_link.$.object_type : 'body_copy_link missed on xml';
        }, this);
    } else {
        obj['body_copy_body_copy_text_1'] = bodyCopies.body_copy.hasOwnProperty('body_copy_text') ? bodyCopies.body_copy.body_copy_text : 'body_copy_text missed on xml';
        obj['body_copy_body_copy_link_view_'] = bodyCopies.body_copy.hasOwnProperty('body_copy_link_view') ? bodyCopies.body_copy.body_copy_link_view : 'body_copy_link_view missed on xml';
        obj['body_copy_body_copy_link_directive_1'] = bodyCopies.body_copy.hasOwnProperty('body_copy_link') && (bodyCopies.body_copy.body_copy_link) ? bodyCopies.body_copy.body_copy_link.$.directive : 'body_copy_link missed on xml';
        obj['body_copy_body_copy_link_object_type_1'] = bodyCopies.body_copy.hasOwnProperty('body_copy_link') && (bodyCopies.body_copy.body_copy_link) ? bodyCopies.body_copy.body_copy_link.$.object_type : 'body_copy_link missed on xml';
    }

    //body_image info
    var bodyImg = moduleData.body_image;
    obj['body_image_override_text'] = bodyImg.hasOwnProperty('body_image_override_text') ? bodyImg.body_image_override_text : 'body_image_override_text missed on xml';
    obj['body_image_link_view'] = bodyImg.hasOwnProperty('body_image_link_view') ? bodyImg.body_image_link_view : 'body_image_link_view missed on xml';
    obj['body_image_align'] = bodyImg.hasOwnProperty('body_image_align') ? bodyImg.body_image_align : 'body_image_align missed on xml';
    obj['body_image_source_directive'] = bodyImg.hasOwnProperty('body_image_source') && bodyImg.body_image_source ? bodyImg.body_image_source.$.directive : 'body_image_source missed on xml';
    obj['body_image_source_object_type'] = bodyImg.hasOwnProperty('body_image_source') && bodyImg.body_image_source ? bodyImg.body_image_source.$.object_type : 'body_image_source missed on xml';
    obj['body_image_source_wbmd_lookup_type'] = bodyImg.hasOwnProperty('body_image_source') && bodyImg.body_image_source ? bodyImg.body_image_source.$.wbmd_lookup_type : 'body_image_source missed on xml';
    obj['body_image_source_wbmd_storage_value'] = bodyImg.hasOwnProperty('body_image_source') && bodyImg.body_image_source ? bodyImg.body_image_source.$.wbmd_storage_value : 'body_image_source missed on xml';
    obj['body_image_source_path'] = bodyImg.hasOwnProperty('body_image_source') && bodyImg.body_image_source ? bodyImg.body_image_source.$.path : 'body_image_source missed on xml';
    obj['body_image_source_alt'] = bodyImg.hasOwnProperty('body_image_source') && bodyImg.body_image_source ? bodyImg.body_image_source.$.alt : 'body_image_source missed on xml';
    obj['body_image_link_directive'] = bodyImg.hasOwnProperty('body_image_link') && bodyImg.body_image_link ? bodyImg.body_image_link.$.directive : 'body_image_link missed on xml';
    obj['body_image_link_object_type'] = bodyImg.hasOwnProperty('body_image_link') && bodyImg.body_image_link ? bodyImg.body_image_link.$.object_type : 'body_image_link missed on xml';
    obj['body_image_source_chronic_id'] = bodyImg.hasOwnProperty('body_image_source') && bodyImg.body_image_source && bodyImg.body_image_source.$.chronic_id != undefined ? true : false;
    obj['body_image_link_chronic_id'] = bodyImg.hasOwnProperty('body_image_link') && bodyImg.body_image_link && bodyImg.body_image_link.$.chronic_id != undefined ? true : false;


    //body_links info
    var bodyLnks = moduleData.body_links;
    rowNumber = 0;
    obj['body_bullet'] = bodyLnks.hasOwnProperty('body_bullet') ? bodyLnks.body_bullet : 'body_bullet missed on xml';

    if (bodyLnks.body_link.length != undefined) {
        bodyLnks.body_link.forEach(function (element) {
            rowNumber = rowNumber + 1;
            obj['body_link_body_link_text_' + rowNumber] = element.hasOwnProperty('body_link_text') ? element.body_link_text : 'body_link_text missed on xml';
            obj['body_link_body_link_link_view' + rowNumber] = element.hasOwnProperty('body_link_link_view') ? element.body_link_link_view : 'body_link_link_view missed on xml';
            obj['body_link_link_directive_' + rowNumber] = element.hasOwnProperty('body_link_link') && element.body_link_link ? element.body_link_link.$.directive : 'body_link_link missed on xml';
            obj['body_link_link_object_type_' + rowNumber] = element.hasOwnProperty('body_link_link') && element.body_link_link ? element.body_link_link.$.object_type : 'body_link_link missed on xml';
            obj['body_link_link_chronic_id_' + rowNumber] = element.hasOwnProperty('body_link_link') && element.body_link_link && element.body_link_link.$.chronic_id != undefined ? true : false;

        }, this);
    }
    else {
        obj['body_link_body_link_text_1'] = bodyLnks.body_link.hasOwnProperty('body_link_text') ? bodyLnks.body_link.body_link_text : 'body_link_text missed on xml';
        obj['body_link_body_link_link_view_1'] = bodyLnks.body_link.hasOwnProperty('body_link_link_view') ? bodyLnks.body_link.body_link_link_view : 'body_link_link_view missed on xml';
        obj['body_link_link_directive_1'] = bodyLnks.body_link.hasOwnProperty('body_link_link') && bodyLnks.body_link.body_link_link ? bodyLnks.body_link.body_link_link.$.directive : 'body_link_link missed on xml';
        obj['body_link_link_object_type_1'] = bodyLnks.body_link.hasOwnProperty('body_link_link') && bodyLnks.body_link.body_link_link ? bodyLnks.body_link.body_link_link.$.object_type : 'body_link_link missed on xml';
        obj['body_link_link_chronic_id_1'] = bodyLnks.body_link.hasOwnProperty('body_link_link') && bodyLnks.body_link.body_link_link && bodyLnks.body_link.body_link_link.$.chronic_id != undefined ? true : false;

    }

    //lower_links info
    var lowerLinks = moduleData.lower_links;
    obj['link_display'] = lowerLinks.hasOwnProperty('link_display') ? lowerLinks.link_display : 'link_display missed on xml';
    obj['link_bullet'] = lowerLinks.hasOwnProperty('link_bullet') ? lowerLinks.link_bullet : 'link_bullet missed on xml';
    rowNumber = 0;
    if (lowerLinks.lower_link.length != undefined) {
        lowerLinks.lower_link.forEach(function (element) {
            rowNumber = rowNumber + 1;
            obj['lower_link_lower_link_lower_link_text_' + rowNumber] = element.hasOwnProperty('lower_link_text') ? element.lower_link_text : 'lower_link_text missed on xmll';
            obj['lower_link_lower_link_lower_link_link_view_' + rowNumber] = element.hasOwnProperty('lower_link_link_view') ? element.lower_link_link_view : 'lower_link_link_view missed on xmll';
            obj['lower_link_lower_link_lower_lower_link_link_directive_' + rowNumber] = element.hasOwnProperty('lower_link_link') && element.lower_link_link ? element.lower_link_link.$.directive : 'lower_link_link missed on xmll';
            obj['lower_link_lower_link_lower_lower_link_link_object_type_' + rowNumber] = element.hasOwnProperty('lower_link_link') && element.lower_link_link ? element.lower_link_link.$.object_type : 'lower_link_link missed on xmll';
            obj['lower_link_link_chronic_id_' + rowNumber] = element.hasOwnProperty('lower_link_link') && element.lower_link_link && element.lower_link_link.$.chronic_id != undefined ? true : false;
        }, this);
    } else {
        obj['lower_link_lower_link_lower_link_text_1'] = lowerLinks.lower_link.hasOwnProperty('lower_link_text') ? lowerLinks.lower_link.lower_link_text : 'lower_link_text missed on xmll';
        obj['lower_link_lower_link_lower_link_link_view_1'] = lowerLinks.lower_link.hasOwnProperty('lower_link_link_view') ? lowerLinks.lower_link.lower_link_link_view : 'lower_link_link_view missed on xmll';
        obj['lower_link_lower_link_lower_lower_link_link_directive_1'] = lowerLinks.lower_link.hasOwnProperty('lower_link_link') && lowerLinks.lower_link.lower_link_link ? lowerLinks.lower_link.lower_link_link.$.directive : 'lower_link_link missed on xmll';
        obj['lower_link_lower_link_lower_lower_link_link_object_type_1'] = lowerLinks.lower_link.hasOwnProperty('lower_link_link') && lowerLinks.lower_link.lower_link_link ? lowerLinks.lower_link.lower_link_link.$.object_type : 'lower_link_link missed on xmll';
        obj['lower_link_link_chronic_id_1'] = lowerLinks.lower_link.hasOwnProperty('lower_link_link') && lowerLinks.lower_link.lower_link_link && lowerLinks.lower_link.lower_link_link.$.chronic_id != undefined ? true : false;
    }

    return obj;
}

module.exports.NavigationModuleLaunchXMLValues = (result) => {
    var obj = {};
    var rowNumber = 0;
    var moduleSettings = result.webmd_rendition.content.wbmd_asset.webmd_module.module_settings;

    //Module settings
    obj["title"] = moduleSettings.hasOwnProperty('title') ? moduleSettings.title : 'title missed on xml';
    obj["object_name"] = moduleSettings.hasOwnProperty('object_name') ? moduleSettings.object_name : 'object_name missed on xml';
    obj["object_type"] = moduleSettings.hasOwnProperty('object_type') ? moduleSettings.object_type : 'object_type missed on xml';
    obj["wbmd_pb_module_category"] = moduleSettings.hasOwnProperty('wbmd_pb_module_category') ? moduleSettings.wbmd_pb_module_category : 'wbmd_pb_module_category missed on xml';
    obj["wbmd_pb_dyn_module_category"] = moduleSettings.hasOwnProperty('wbmd_pb_dyn_module_category') ? moduleSettings.wbmd_pb_dyn_module_category : 'wbmd_pb_dyn_module_category missed on xml';
    obj["wbmd_pb_module_label1"] = (moduleSettings.hasOwnProperty('md_pb_module_label1_group') && moduleSettings.md_pb_module_label1_group.wbmd_pb_module_label1 != undefined) ? moduleSettings.md_pb_module_label1_group.wbmd_pb_module_label1 : 'md_pb_module_label1_group.wbmd_pb_module_label1 missed on xml';
    obj["wbmd_pb_module_label2"] = (moduleSettings.hasOwnProperty('md_pb_module_label2_group') && moduleSettings.md_pb_module_label1_group.wbmd_pb_module_label1 != undefined) ? moduleSettings.md_pb_module_label2_group.wbmd_pb_module_label2 : 'md_pb_module_label2_group.wbmd_pb_module_label2 missed on xml';
    obj["wbmd_pb_module_sp_program"] = moduleSettings.hasOwnProperty('wbmd_pb_module_sp_program') ? moduleSettings.wbmd_pb_module_sp_program : 'wbmd_pb_module_sp_program missed on xml';
    obj["wbmd_pb_cache_duration"] = moduleSettings.hasOwnProperty('wbmd_pb_cache_duration') ? moduleSettings.wbmd_pb_cache_duration : 'wbmd_pb_cache_duration missed on xml';
    obj["wbmd_c_channel_ids_group"] = moduleSettings.hasOwnProperty('wbmd_c_channel_ids_group') ? moduleSettings.wbmd_c_channel_ids_group : 'wbmd_c_channel_ids_group missed on xml';
    obj["wbmd_program_group"] = moduleSettings.hasOwnProperty('wbmd_program_group') ? moduleSettings.wbmd_program_group : 'wbmd_program_group missed on xml';
    obj["wbmd_pb_asset_css_path"] = moduleSettings.hasOwnProperty('wbmd_pb_asset_css') && moduleSettings.wbmd_pb_asset_css ? moduleSettings.wbmd_pb_asset_css.$.path : 'wbmd_pb_asset_css.$.path missed on xml';
    obj["wbmd_pb_asset_css_object_type"] = moduleSettings.hasOwnProperty('wbmd_pb_asset_css') && moduleSettings.wbmd_pb_asset_css ? moduleSettings.wbmd_pb_asset_css.$.object_type : 'wbmd_pb_asset_css.$.object_type missed on xml';
    obj["wbmd_pb_module_xsl_path"] = moduleSettings.hasOwnProperty('wbmd_pb_module_xsl') && moduleSettings.wbmd_pb_module_xsl ? moduleSettings.wbmd_pb_module_xsl.$.path : 'wbmd_pb_module_xsl.$.path missed on xml';
    obj["wbmd_pb_module_xsl_object_type"] = moduleSettings.hasOwnProperty('wbmd_pb_module_xsl') && moduleSettings.wbmd_pb_module_xsl ? moduleSettings.wbmd_pb_module_xsl.$.object_type : 'wbmd_pb_module_xsl_object_type missed on xml';
    obj["wbmd_pb_owner_page_id_path"] = moduleSettings.hasOwnProperty('wbmd_pb_owner_page_id') && moduleSettings.wbmd_pb_owner_page_id ? moduleSettings.wbmd_pb_owner_page_id.$.path : 'wbmd_pb_owner_page_id.$.path missed on xml';
    obj["wbmd_pb_owner_page_id_object_type"] = moduleSettings.hasOwnProperty('wbmd_pb_owner_page_id') && moduleSettings.wbmd_pb_owner_page_id ? moduleSettings.wbmd_pb_owner_page_id.$.object_type : 'wbmd_pb_owner_page_id_object_type missed on xml';
    obj["dnn_id"] = moduleSettings.hasOwnProperty('dnn_id') ? moduleSettings.dnn_id : 'dnn_id missed on xml';
    obj["class"] = moduleSettings.hasOwnProperty('class') ? moduleSettings.class : 'class missed on xml';
    obj['chronic_id'] = moduleSettings.hasOwnProperty('chronic_id');


    //module data from xml
    var moduleData = result.webmd_rendition.content.wbmd_asset.webmd_module.module_data;
    obj['module_title_text'] = moduleData.hasOwnProperty('module_title_text') && moduleData.module_title_text ? moduleData.module_title_text : 'module_title_text missed on xml';

    var groups = moduleData.groups;
    var linkItemCount = 0;
    if (groups.group.length != undefined) {
        groups.group.forEach(function (element) {
            rowNumber = rowNumber + 1;
            obj['group_name_' + rowNumber] = element.hasOwnProperty('group_name') && element.group_name ? element.group_name : 'group_name missed on xml';
            obj['group_link_view_' + rowNumber] = element.hasOwnProperty('group_link_view') && element.group_link_view ? element.group_link_view : 'group_link_view missed on xml';
            obj['group_link_chronic_id_' + rowNumber] = element.hasOwnProperty('group_link') && element.group_link.$.chronic_id ? true : false;
            obj['group_link_object_type_' + rowNumber] = element.hasOwnProperty('group_link') && element.group_link ? element.group_link.$.object_type : 'group_link object_type missed on xml';

            var linkItems = element.link_items.link_item;
            if (linkItems.length != undefined) {
                linkItems.forEach(function (linkelement) {
                    linkItemCount = linkItemCount + 1;
                    obj['link_item_link_text_' + rowNumber + '_' + linkItemCount] = linkelement.hasOwnProperty('link_text') && linkelement.link_text ? linkelement.link_text : 'link_text missed on xml';
                    obj['link_item_article_link_view_' + rowNumber + '_' + linkItemCount] = linkelement.hasOwnProperty('article_link_view') && linkelement.article_link_view ? linkelement.article_link_view : 'article_link_view missed on xml';
                    obj['link_item_link_chronic_id_' + rowNumber + '_' + linkItemCount] = linkelement.hasOwnProperty('link') && linkelement.link ? true : false;
                    obj['link_item_link_object_type_' + rowNumber + '_' + linkItemCount] = linkelement.hasOwnProperty('link') && linkelement.link ? linkelement.link.$.object_type : 'link object_type missed on xml';
                    obj['link_item_link_directive_' + rowNumber + '_' + linkItemCount] = linkelement.hasOwnProperty('link') && linkelement.link ? linkelement.link.$.directive : 'link directive missed on xml';
                }, this);
            }
            else {
                obj['link_item_link_text_' + rowNumber + '_1'] = linkItems.hasOwnProperty('link_text') && linkItems.link_text ? linkItems.link_text : 'link_text missed on xml';
                obj['link_item_article_link_view_' + rowNumber + '_1'] = linkItems.hasOwnProperty('article_link_view') && linkItems.article_link_view ? linkItems.article_link_view : 'article_link_view missed on xml';
                obj['link_item_link_chronic_id_' + rowNumber + '_1'] = linkItems.hasOwnProperty('link') && linkItems.link ? true : false;
                obj['link_item_link_object_type_' + rowNumber + '_1'] = linkItems.hasOwnProperty('link') && linkItems.link ? linkItems.link.$.object_type : 'link object_type missed on xml';
                obj['link_item_link_directive_' + rowNumber + '_1'] = linkItems.hasOwnProperty('link') && linkItems.link ? linkItems.link.$.directive : 'link directive missed on xml';

            }
        }, this);

    }
    else {
        rowNumber = 1;
        obj['group_name_1'] = groups.group.hasOwnProperty('group_name') && groups.group.module_title_text ? groups.group.group_name : 'group_name missed on xml';
        obj['group_link_view_1'] = groups.group.hasOwnProperty('group_link_view') && groups.group.module_title_text ? groups.group.group_link_view : 'group_link_view missed on xml';
        obj['group_link_chronic_id_1'] = groups.group.hasOwnProperty('group_link') && groups.group.group_link.$.chronic_id ? true : false;
        obj['group_link_object_type_1'] = groups.group.hasOwnProperty('group_link') && groups.group.group_link ? groups.group.group_link.$.object_type : 'group_link object_type missed on xml';

        var linkItems = element.link_items.link_item;
        if (linkItems.length != undefined) {
            linkItems.forEach(function (linkelement) {
                linkItemCount = linkItemCount + 1;
                obj['link_item_link_text_' + rowNumber + '_' + linkItemCount] = linkelement.hasOwnProperty('link_text') && linkelement.link_text ? linkelement.link_text : 'link_text missed on xml';
                obj['link_item_article_link_view_' + rowNumber + '_' + linkItemCount] = linkelement.hasOwnProperty('article_link_view') && linkelement.article_link_view ? linkelement.article_link_view : 'article_link_view missed on xml';
                obj['link_item_link_chronic_id_' + rowNumber + '_' + linkItemCount] = linkelement.hasOwnProperty('link') && linkelement.link ? true : false;
                obj['link_item_link_object_type_' + rowNumber + '_' + linkItemCount] = linkelement.hasOwnProperty('link') && linkelement.link ? linkelement.link.$.object_type : 'link object_type missed on xml';
                obj['link_item_link_directive_' + rowNumber + '_' + linkItemCount] = linkelement.hasOwnProperty('link') && linkelement.link ? linkelement.link.$.directive : 'link directive missed on xml';
            }, this);
        }
        else {
            obj['link_item_link_text_' + rowNumber + '_1'] = linkItems.hasOwnProperty('link_text') && linkItems.link_text ? linkItems.link_text : 'link_text missed on xml';
            obj['link_item_article_link_view_' + rowNumber + '_1'] = linkItems.hasOwnProperty('article_link_view') && linkItems.article_link_view ? linkItems.article_link_view : 'article_link_view missed on xml';
            obj['link_item_link_chronic_id_' + rowNumber + '_1'] = linkItems.hasOwnProperty('link') && linkItems.link ? true : false;
            obj['link_item_link_object_type_' + rowNumber + '_1'] = linkItems.hasOwnProperty('link') && linkItems.link ? linkItems.link.$.object_type : 'link object_type missed on xml';
            obj['link_item_link_directive_1_' + rowNumber + '_1'] = linkItems.hasOwnProperty('link') && linkItems.link ? linkItems.link.$.directive : 'link directive missed on xml';

        }
    }
    return obj;
}

module.exports.ConfigureEditorialModule = (result) => {
    var obj = {};
    var rowNumber = 0;
    var moduleSettings = result.webmd_rendition.content.wbmd_asset.webmd_module.module_settings;
    //Module settings
    obj["title"] = moduleSettings.hasOwnProperty('title') ? moduleSettings.title : 'title missed on xml';
    obj["object_name"] = moduleSettings.hasOwnProperty('object_name') ? moduleSettings.object_name : 'object_name missed on xml';
    obj["object_type"] = moduleSettings.hasOwnProperty('object_type') ? moduleSettings.object_type : 'object_type missed on xml';
    obj["wbmd_pb_module_category"] = moduleSettings.hasOwnProperty('wbmd_pb_module_category') ? moduleSettings.wbmd_pb_module_category : 'wbmd_pb_module_category missed on xml';
    obj["wbmd_pb_dyn_module_category"] = moduleSettings.hasOwnProperty('wbmd_pb_dyn_module_category') ? moduleSettings.wbmd_pb_dyn_module_category : 'wbmd_pb_dyn_module_category missed on xml';
    obj["wbmd_pb_module_label1"] = (moduleSettings.hasOwnProperty('md_pb_module_label1_group') && moduleSettings.md_pb_module_label1_group.wbmd_pb_module_label1 != undefined) ? moduleSettings.md_pb_module_label1_group.wbmd_pb_module_label1 : 'md_pb_module_label1_group.wbmd_pb_module_label1 missed on xml';
    obj["wbmd_pb_module_label2"] = (moduleSettings.hasOwnProperty('md_pb_module_label2_group') && moduleSettings.md_pb_module_label1_group.wbmd_pb_module_label1 != undefined) ? moduleSettings.md_pb_module_label2_group.wbmd_pb_module_label2 : 'md_pb_module_label2_group.wbmd_pb_module_label2 missed on xml';
    obj["wbmd_pb_module_sp_program"] = moduleSettings.hasOwnProperty('wbmd_pb_module_sp_program') ? moduleSettings.wbmd_pb_module_sp_program : 'wbmd_pb_module_sp_program missed on xml';
    obj["wbmd_pb_cache_duration"] = moduleSettings.hasOwnProperty('wbmd_pb_cache_duration') ? moduleSettings.wbmd_pb_cache_duration : 'wbmd_pb_cache_duration missed on xml';
    obj["wbmd_c_channel_ids_group"] = moduleSettings.hasOwnProperty('wbmd_c_channel_ids_group') ? moduleSettings.wbmd_c_channel_ids_group : 'wbmd_c_channel_ids_group missed on xml';
    obj["wbmd_program_group"] = moduleSettings.hasOwnProperty('wbmd_program_group') ? moduleSettings.wbmd_program_group : 'wbmd_program_group missed on xml';
    obj["wbmd_pb_asset_css_path"] = moduleSettings.hasOwnProperty('wbmd_pb_asset_css') && moduleSettings.wbmd_pb_asset_css ? moduleSettings.wbmd_pb_asset_css.$.path : 'wbmd_pb_asset_css.$.path missed on xml';
    obj["wbmd_pb_asset_css_object_type"] = moduleSettings.hasOwnProperty('wbmd_pb_asset_css') && moduleSettings.wbmd_pb_asset_css ? moduleSettings.wbmd_pb_asset_css.$.object_type : 'wbmd_pb_asset_css.$.object_type missed on xml';
    obj["wbmd_pb_module_xsl_path"] = moduleSettings.hasOwnProperty('wbmd_pb_module_xsl') && moduleSettings.wbmd_pb_module_xsl ? moduleSettings.wbmd_pb_module_xsl.$.path : 'wbmd_pb_module_xsl.$.path missed on xml';
    obj["wbmd_pb_module_xsl_object_type"] = moduleSettings.hasOwnProperty('wbmd_pb_module_xsl') && moduleSettings.wbmd_pb_module_xsl ? moduleSettings.wbmd_pb_module_xsl.$.object_type : 'wbmd_pb_module_xsl_object_type missed on xml';
    obj["wbmd_pb_owner_page_id_path"] = moduleSettings.hasOwnProperty('wbmd_pb_owner_page_id') && moduleSettings.wbmd_pb_owner_page_id ? moduleSettings.wbmd_pb_owner_page_id.$.path : 'wbmd_pb_owner_page_id.$.path missed on xml';
    obj["wbmd_pb_owner_page_id_object_type"] = moduleSettings.hasOwnProperty('wbmd_pb_owner_page_id') && moduleSettings.wbmd_pb_owner_page_id ? moduleSettings.wbmd_pb_owner_page_id.$.object_type : 'wbmd_pb_owner_page_id_object_type missed on xml';
    obj["dnn_id"] = moduleSettings.hasOwnProperty('dnn_id') ? moduleSettings.dnn_id : 'dnn_id missed on xml';
    obj["class"] = moduleSettings.hasOwnProperty('class') ? moduleSettings.class : 'class missed on xml';
    obj['chronic_id'] = moduleSettings.hasOwnProperty('chronic_id');


    //module data from xml
    var moduleData = result.webmd_rendition.content.wbmd_asset.webmd_module.module_data;
    obj['module_title'] = moduleData.hasOwnProperty('module_title') && moduleData.module_title ? moduleData.module_title : 'module_title missed on xml';
    obj['module_link_view'] = moduleData.hasOwnProperty('module_link_view') && moduleData.module_link_view ? moduleData.module_link_view : 'module_link_view missed on xml';
    obj['module_link_chronic_id'] = moduleData.hasOwnProperty('module_link') && moduleData.module_link ? true : false;
    obj['module_link_directive'] = moduleData.hasOwnProperty('module_link') && moduleData.module_link ? moduleData.module_link.$.directive : 'module_link missed on xml';
    obj['module_link_object_type'] = moduleData.hasOwnProperty('module_link') && moduleData.module_link ? moduleData.module_link.$.object_type : 'module_link missed on xml';
    obj['module_link_wbmd_lookup_type'] = moduleData.hasOwnProperty('module_link') && moduleData.module_link ? moduleData.module_link.$.wbmd_lookup_type : 'module_link missed on xml';
    obj['module_link_wbmd_storage_value'] = moduleData.hasOwnProperty('module_link') && moduleData.module_link ? moduleData.module_link.$.wbmd_storage_value : 'module_link missed on xml';


    //links info
    var links = moduleData.links;
    obj['link_bullet'] = links.hasOwnProperty('link_bullet') ? links.link_bullet : 'link_bullet missed on xml';
    rowNumber = 0;
    if (links.link.length != undefined) {
        links.link.forEach(function (element) {
            rowNumber = rowNumber + 1;
            obj['link_text_' + rowNumber] = element.hasOwnProperty('link_text') ? element.link_text : 'link_text missed on xmll';
            obj['action_text_' + rowNumber] = element.hasOwnProperty('action_text') ? element.action_text : 'lower_link_link_view missed on xmll';
            obj['link_link_view_' + rowNumber] = element.hasOwnProperty('link_link_view') && element.link_link_view ? element.link_link_view : 'lower_link_link missed on xmll';
            obj['link_url_chronic_id_' + rowNumber] = element.hasOwnProperty('link_url') && element.link_url ? true : false;
            obj['link_url_directive_' + rowNumber] = element.hasOwnProperty('link_url') && element.link_url ? element.link_url.$.directive : 'link_url missed on xmll';
            obj['link_url_object_type_' + rowNumber] = element.hasOwnProperty('link_url') && element.link_url ? element.link_url.$.object_type : 'link_url missed on xmll';
            obj['link_url_wbmd_lookup_type_' + rowNumber] = element.hasOwnProperty('link_url') && element.link_url ? element.link_url.$.wbmd_lookup_type : 'link_url missed on xmll';

            obj['link_source_icon_chronic_id_' + rowNumber] = element.hasOwnProperty('link_source_icon') && element.link_source_icon ? true : false;
            obj['link_source_icon_directive_' + rowNumber] = element.hasOwnProperty('link_source_icon') && element.link_source_icon ? element.link_source_icon.$.directive : 'link_url missed on xmll';
            obj['link_source_icon_object_type_' + rowNumber] = element.hasOwnProperty('link_source_icon') && element.link_source_icon ? element.link_source_icon.$.object_type : 'link_url missed on xmll';
            obj['link_source_icon_wbmd_lookup_type_' + rowNumber] = element.hasOwnProperty('link_source_icon') && element.link_source_icon ? element.link_source_icon.$.wbmd_lookup_type : 'link_url missed on xmll';
            obj['link_source_icon_path_' + rowNumber] = element.hasOwnProperty('link_source_icon') && element.link_source_icon ? element.link_source_icon.$.path : 'link_url missed on xmll';
            obj['link_source_icon_alt_' + rowNumber] = element.hasOwnProperty('link_source_icon') && element.link_source_icon ? element.link_source_icon.$.alt : 'link_url missed on xmll';
        }, this);
    } else {
        rowNumber = 1;
        obj['link_text_' + rowNumber] = links.link.hasOwnProperty('link_text') ? links.link.link_text : 'link_text missed on xmll';
        obj['action_text_' + rowNumber] = links.link.hasOwnProperty('action_text') ? links.link.action_text : 'lower_link_link_view missed on xmll';
        obj['link_link_view_' + rowNumber] = links.link.hasOwnProperty('link_link_view') && links.link.link_link_view ? links.link.link_link_view : 'lower_link_link missed on xmll';
        obj['link_url_chronic_id_' + rowNumber] = links.link.hasOwnProperty('link_url') && links.link.link_url ? true : false;
        obj['link_url_directive_' + rowNumber] = links.link.hasOwnProperty('link_url') && links.link.link_url ? links.link.link_url.$.directive : 'link_url missed on xmll';
        obj['link_url_object_type_' + rowNumber] = links.link.hasOwnProperty('link_url') && links.link.link_url ? links.link.link_url.$.object_type : 'link_url missed on xmll';
        obj['link_url_wbmd_lookup_type_' + rowNumber] = links.link.hasOwnProperty('link_url') && links.link.link_url ? links.link.link_url.$.wbmd_lookup_type : 'link_url missed on xmll';

        obj['link_source_icon_chronic_id_' + rowNumber] = links.link.hasOwnProperty('link_source_icon') && links.link.link_source_icon ? true : false;
        obj['link_source_icon_directive_' + rowNumber] = links.link.hasOwnProperty('link_source_icon') && links.link.link_source_icon ? links.link.link_source_icon.$.directive : 'link_url missed on xmll';
        obj['link_source_icon_object_type_' + rowNumber] = links.link.hasOwnProperty('link_source_icon') && links.link.link_source_icon ? links.link.link_source_icon.$.object_type : 'link_url missed on xmll';
        obj['link_source_icon_wbmd_lookup_type_' + rowNumber] = links.link.hasOwnProperty('link_source_icon') && links.link.link_source_icon ? links.link.link_source_icon.$.wbmd_lookup_type : 'link_url missed on xmll';
        obj['link_source_icon_path_' + rowNumber] = links.link.hasOwnProperty('link_source_icon') && links.link.link_source_icon ? links.link.link_source_icon.$.path : 'link_url missed on xmll';
        obj['link_source_icon_alt_' + rowNumber] = links.link.hasOwnProperty('link_source_icon') && links.link.link_source_icon ? links.link.link_source_icon.$.alt : 'link_url missed on xmll';
    }

    //descriptions info
    var descr = moduleData.descriptions;
    rowNumber = 0;
    if (descr.description.length != undefined) {
        descr.description.forEach(function (element) {
            rowNumber = rowNumber + 1;
            obj['description_text_' + rowNumber] = element.hasOwnProperty('description_text') && element.description_text ? element.description_text : 'description_text missed on xmll';
        }, this);
    }
    else {
        obj['description_text_1'] = descr.description.hasOwnProperty('description_text') && descr.description.description_text ? descr.description.description_text : 'description_text missed on xmll';
    }

    //body_images info

    var bodyImages = moduleData.body_images.body_image;
    if (bodyImages != undefined) {
        rowNumber = 0;
        if (bodyImages.length != undefined) {
            bodyImages.forEach(function (element) {
                rowNumber = rowNumber + 1
                obj['body_image_override_text_' + rowNumber] = element.hasOwnProperty('override_text') ? element.override_text : 'override_text missed on xml';
                obj['body_image_link_view_' + rowNumber] = element.hasOwnProperty('image_link_view') ? element.image_link_view : 'image_link_view missed on xml';
                obj['body_image_align_' + rowNumber] = element.hasOwnProperty('alignment') ? element.alignment : 'alignment missed on xml';
                obj['body_image_source_directive_' + rowNumber] = element.hasOwnProperty('source') && element.source ? element.source.$.directive : 'body_image_source missed on xml';
                obj['body_image_source_object_type_' + rowNumber] = element.hasOwnProperty('source') && element.source ? element.source.$.object_type : 'body_image_source missed on xml';
                obj['body_image_source_wbmd_lookup_type_' + rowNumber] = element.hasOwnProperty('source') && element.source ? element.source.$.wbmd_lookup_type : 'body_image_source missed on xml';
                obj['body_image_source_wbmd_storage_value_' + rowNumber] = element.hasOwnProperty('source') && element.source ? element.source.$.wbmd_storage_value : 'body_image_source missed on xml';
                obj['body_image_source_path_' + rowNumber] = element.hasOwnProperty('source') && element.source ? element.source.$.path : 'body_image_source missed on xml';
                obj['body_image_source_alt_' + rowNumber] = element.hasOwnProperty('source') && element.source ? element.source.$.alt : 'body_image_source missed on xml';
                obj['body_image_link_directive_' + rowNumber] = element.hasOwnProperty('image_link') && element.image_link ? element.image_link.$.directive : 'body_image_link missed on xml';
                obj['body_image_link_object_type_' + rowNumber] = element.hasOwnProperty('image_link') && element.image_link ? element.image_link.$.object_type : 'body_image_link missed on xml';
                obj['body_image_source_chronic_id_' + rowNumber] = element.hasOwnProperty('image_link') && element.image_link && element.image_link.$.chronic_id != undefined ? true : false;
                obj['body_image_link_chronic_id_' + rowNumber] = element.hasOwnProperty('image_link') && element.image_link && element.image_link.$.chronic_id != undefined ? true : false;
            }, this);
        }
        else {
            rowNumber = 1;
            obj['body_image_override_text_' + rowNumber] = bodyImages.hasOwnProperty('override_text') ? bodyImages.override_text : 'override_text missed on xml';
            obj['body_image_link_view_' + rowNumber] = bodyImages.hasOwnProperty('image_link_view') ? bodyImages.image_link_view : 'image_link_view missed on xml';
            obj['body_image_align_' + rowNumber] = bodyImages.hasOwnProperty('alignment') ? bodyImages.alignment : 'alignment missed on xml';
            obj['body_image_source_directive_' + rowNumber] = bodyImages.hasOwnProperty('source') && bodyImages.source ? bodyImages.source.$.directive : 'body_image_source missed on xml';
            obj['body_image_source_object_type_' + rowNumber] = bodyImages.hasOwnProperty('source') && bodyImages.source ? bodyImages.source.$.object_type : 'body_image_source missed on xml';
            obj['body_image_source_wbmd_lookup_type_' + rowNumber] = bodyImages.hasOwnProperty('source') && bodyImages.source ? bodyImages.source.$.wbmd_lookup_type : 'body_image_source missed on xml';
            obj['body_image_source_wbmd_storage_value_' + rowNumber] = bodyImages.hasOwnProperty('source') && bodyImages.source ? bodyImages.source.$.wbmd_storage_value : 'body_image_source missed on xml';
            obj['body_image_source_path_' + rowNumber] = bodyImages.hasOwnProperty('source') && bodyImages.source ? bodyImages.source.$.path : 'body_image_source missed on xml';
            obj['body_image_source_alt_' + rowNumber] = bodyImages.hasOwnProperty('source') && bodyImages.source ? bodyImages.source.$.alt : 'body_image_source missed on xml';
            obj['body_image_link_directive_' + rowNumber] = bodyImages.hasOwnProperty('image_link') && bodyImages.image_link ? bodyImages.image_link.$.directive : 'body_image_link missed on xml';
            obj['body_image_link_object_type_' + rowNumber] = bodyImages.hasOwnProperty('image_link') && bodyImages.image_link ? bodyImages.image_link.$.object_type : 'body_image_link missed on xml';
            obj['body_image_source_chronic_id_' + rowNumber] = bodyImages.hasOwnProperty('image_link') && bodyImages.image_link && bodyImages.image_link.$.chronic_id != undefined ? true : false;
            obj['body_image_link_chronic_id_' + rowNumber] = bodyImages.hasOwnProperty('image_link') && bodyImages.image_link && bodyImages.image_link.$.chronic_id != undefined ? true : false;
        }
    }
    return obj;

}

module.exports.ConfigureVerticalPromoModule = (result) => {
    var obj = {};
    var rowNumber = 0;
    var moduleSettings = result.webmd_rendition.content.wbmd_asset.webmd_module.module_settings;
    //Module settings
    obj["title"] = moduleSettings.hasOwnProperty('title') ? moduleSettings.title : 'title missed on xml';
    obj["object_name"] = moduleSettings.hasOwnProperty('object_name') ? moduleSettings.object_name : 'object_name missed on xml';
    obj["object_type"] = moduleSettings.hasOwnProperty('object_type') ? moduleSettings.object_type : 'object_type missed on xml';
    obj["wbmd_pb_module_category"] = moduleSettings.hasOwnProperty('wbmd_pb_module_category') ? moduleSettings.wbmd_pb_module_category : 'wbmd_pb_module_category missed on xml';
    obj["wbmd_pb_dyn_module_category"] = moduleSettings.hasOwnProperty('wbmd_pb_dyn_module_category') ? moduleSettings.wbmd_pb_dyn_module_category : 'wbmd_pb_dyn_module_category missed on xml';
    obj["wbmd_pb_module_label1"] = (moduleSettings.hasOwnProperty('md_pb_module_label1_group') && moduleSettings.md_pb_module_label1_group.wbmd_pb_module_label1 != undefined) ? moduleSettings.md_pb_module_label1_group.wbmd_pb_module_label1 : 'md_pb_module_label1_group.wbmd_pb_module_label1 missed on xml';
    obj["wbmd_pb_module_label2"] = (moduleSettings.hasOwnProperty('md_pb_module_label2_group') && moduleSettings.md_pb_module_label1_group.wbmd_pb_module_label1 != undefined) ? moduleSettings.md_pb_module_label2_group.wbmd_pb_module_label2 : 'md_pb_module_label2_group.wbmd_pb_module_label2 missed on xml';
    obj["wbmd_pb_module_sp_program"] = moduleSettings.hasOwnProperty('wbmd_pb_module_sp_program') ? moduleSettings.wbmd_pb_module_sp_program : 'wbmd_pb_module_sp_program missed on xml';
    obj["wbmd_pb_cache_duration"] = moduleSettings.hasOwnProperty('wbmd_pb_cache_duration') ? moduleSettings.wbmd_pb_cache_duration : 'wbmd_pb_cache_duration missed on xml';
    obj["wbmd_c_channel_ids_group"] = moduleSettings.hasOwnProperty('wbmd_c_channel_ids_group') ? moduleSettings.wbmd_c_channel_ids_group : 'wbmd_c_channel_ids_group missed on xml';
    obj["wbmd_program_group"] = moduleSettings.hasOwnProperty('wbmd_program_group') ? moduleSettings.wbmd_program_group : 'wbmd_program_group missed on xml';
    obj["wbmd_pb_asset_css_path"] = moduleSettings.hasOwnProperty('wbmd_pb_asset_css') && moduleSettings.wbmd_pb_asset_css ? moduleSettings.wbmd_pb_asset_css.$.path : 'wbmd_pb_asset_css.$.path missed on xml';
    obj["wbmd_pb_asset_css_object_type"] = moduleSettings.hasOwnProperty('wbmd_pb_asset_css') && moduleSettings.wbmd_pb_asset_css ? moduleSettings.wbmd_pb_asset_css.$.object_type : 'wbmd_pb_asset_css.$.object_type missed on xml';
    obj["wbmd_pb_module_xsl_path"] = moduleSettings.hasOwnProperty('wbmd_pb_module_xsl') && moduleSettings.wbmd_pb_module_xsl ? moduleSettings.wbmd_pb_module_xsl.$.path : 'wbmd_pb_module_xsl.$.path missed on xml';
    obj["wbmd_pb_module_xsl_object_type"] = moduleSettings.hasOwnProperty('wbmd_pb_module_xsl') && moduleSettings.wbmd_pb_module_xsl ? moduleSettings.wbmd_pb_module_xsl.$.object_type : 'wbmd_pb_module_xsl_object_type missed on xml';
    obj["wbmd_pb_owner_page_id_path"] = moduleSettings.hasOwnProperty('wbmd_pb_owner_page_id') && moduleSettings.wbmd_pb_owner_page_id ? moduleSettings.wbmd_pb_owner_page_id.$.path : 'wbmd_pb_owner_page_id.$.path missed on xml';
    obj["wbmd_pb_owner_page_id_object_type"] = moduleSettings.hasOwnProperty('wbmd_pb_owner_page_id') && moduleSettings.wbmd_pb_owner_page_id ? moduleSettings.wbmd_pb_owner_page_id.$.object_type : 'wbmd_pb_owner_page_id_object_type missed on xml';
    obj["dnn_id"] = moduleSettings.hasOwnProperty('dnn_id') ? moduleSettings.dnn_id : 'dnn_id missed on xml';
    obj["class"] = moduleSettings.hasOwnProperty('class') ? moduleSettings.class : 'class missed on xml';
    obj['chronic_id'] = moduleSettings.hasOwnProperty('chronic_id');


    //module data from xml
    var moduleData = result.webmd_rendition.content.wbmd_asset.webmd_module.module_data;

    obj["image_alt_text"] = moduleData.image_alt_text;
    obj["intro_text"] = moduleData.intro_text;
    obj["button_label"] = moduleData.button_label;
    obj["button_link_view"] = moduleData.button_link_view;
    obj["description_text"] = moduleData.description_text;

    obj['image_source_directive'] = moduleData.hasOwnProperty('image_source') && moduleData.image_source ? moduleData.image_source.$.directive : 'image_link missed on xml';
    obj['image_source_object_type'] = moduleData.hasOwnProperty('image_source') && moduleData.image_source ? moduleData.image_source.$.object_type : 'image_link missed on xml';
    obj['image_source_path'] = moduleData.hasOwnProperty('image_source') && moduleData.image_source ? moduleData.image_source.$.path : 'image_link missed on xml';
    obj['image_source_alt'] = moduleData.hasOwnProperty('image_source') && moduleData.image_source ? moduleData.image_source.$.alt : 'image_link missed on xml';
    obj['image_source_chronic_id'] = moduleData.hasOwnProperty('image_source') && moduleData.image_source && moduleData.image_source.$.chronic_id != undefined ? true : false;
  //  obj['image_source_chronic_id'] = moduleData.hasOwnProperty('image_source') && moduleData.image_link && moduleData.image_link.$.chronic_id != undefined ? true : false;

    obj["button_link_directive"] = moduleData.hasOwnProperty('button_link') && moduleData.button_link ? moduleData.button_link.$.directive : 'button_link missed on xml';
    obj["button_link_object_type"] = moduleData.hasOwnProperty('button_link') && moduleData.button_link ? moduleData.button_link.$.object_type : 'button_link missed on xml';
    obj["button_link_chronic_id"] = moduleData.hasOwnProperty('button_link') && moduleData.button_link && moduleData.button_link.$.chronic_id != undefined ? true : false;

    var iconicOverlays = moduleData.iconic_overlays.iconic_overlay;
    if (iconicOverlays.length != undefined) {
        iconicOverlays.forEach(function (element) {
            rowNumber = rowNumber + 1;
            obj["iconic_overlay_title_" + rowNumber] = element.hasOwnProperty('title') && element.title ? element.title : 'title missed on xml';
            obj["iconic_overlay_text_" + rowNumber] = element.hasOwnProperty('text') && element.text ? element.text : 'text missed on xml';
            obj["iconic_overlay_description_text_" + rowNumber] = element.hasOwnProperty('description_text') && element.description_text ? element.description_text : 'description_text missed on xml';
            obj["iconic_overlay_link_view_" + rowNumber] = element.hasOwnProperty('link_view') && element.link_view ? element.link_view : 'link_view missed on xml';
            obj["icon_directive_" + rowNumber] = element.hasOwnProperty('icon') && element.icon ? element.icon.$.directive : 'icon missed on xml';
            obj["icon_object_type_" + rowNumber] = element.hasOwnProperty('icon') && element.icon ? element.icon.$.object_type : 'icon missed on xml';
            obj["icon_path_" + rowNumber] = element.hasOwnProperty('icon') && element.icon ? element.icon.$.path : 'icon missed on xml';
            obj["icon_alt_" + rowNumber] = element.hasOwnProperty('icon') && element.icon ? element.icon.$.alt : 'icon missed on xml';
            obj["icon_chronic_id_" + rowNumber] = element.hasOwnProperty('icon') && element.icon && element.icon.$.chronic_id != undefined ? true : false;

            obj["link_directive_" + rowNumber] = element.hasOwnProperty('link') && element.link ? element.link.$.directive : 'link missed on xml';
            obj["link_object_type_" + rowNumber] = element.hasOwnProperty('link') && element.link ? element.link.$.object_type : 'link missed on xml';
            obj["link_chronic_id_" + rowNumber] = element.hasOwnProperty('link') && element.link && element.link.$.chronic_id != undefined ? true : false;
        }, this);
    }
    else {
        obj["iconic_overlay_title_1"] = iconicOverlays.hasOwnProperty('title') && iconicOverlays.title ? iconicOverlays.title : 'title missed on xml';
        obj["iconic_overlay_text_1"] = iconicOverlays.hasOwnProperty('text') && iconicOverlays.text ? iconicOverlays.text : 'text missed on xml';
        obj["iconic_overlay_description_text_1"] = iconicOverlays.hasOwnProperty('description_text') && iconicOverlays.description_text ? iconicOverlays.description_text : 'description_text missed on xml';
        obj["iconic_overlay_link_view_1"] = iconicOverlays.hasOwnProperty('link_view') && iconicOverlays.link_view ? iconicOverlays.link_view : 'link_view missed on xml';
        obj['icon_directive_1'] = iconicOverlays.hasOwnProperty('icon') && iconicOverlays.icon ? iconicOverlays.icon.$.directive : 'icon missed on xml';
        obj['icon_object_type_1'] = iconicOverlays.hasOwnProperty('icon') && iconicOverlays.icon ? iconicOverlays.icon.$.object_type : 'icon missed on xml';
        obj['icon_path_1'] = iconicOverlays.hasOwnProperty('icon') && iconicOverlays.icon ? iconicOverlays.icon.$.path : 'icon missed on xml';
        obj['icon_alt_1'] = iconicOverlays.hasOwnProperty('icon') && iconicOverlays.icon ? iconicOverlays.icon.$.alt : 'icon missed on xml';
        obj['icon_chronic_id_1'] = iconicOverlays.hasOwnProperty('icon') && iconicOverlays.icon && iconicOverlays.icon.$.chronic_id != undefined ? true : false;

        obj['link_directive_1'] = iconicOverlays.hasOwnProperty('link') && iconicOverlays.link ? iconicOverlays.link.$.directive : 'link missed on xml';
        obj['link_object_type_1'] = iconicOverlays.hasOwnProperty('link') && iconicOverlays.link ? iconicOverlays.link.$.object_type : 'link missed on xml';
        obj['link_chronic_id_1'] = iconicOverlays.hasOwnProperty('link') && iconicOverlays.link && iconicOverlays.link.$.chronic_id != undefined ? true : false;

    }

    return obj;

}

module.exports.EditNavigationModuleLaunchXMLValues = (result) => {
    var obj = {};
    var rowNumber = 0;

    var moduleData = result.webmd_rendition.content.wbmd_asset.webmd_module.module_data;

    var groups = moduleData.groups;
    var linkItemCount = 0;
    if (groups.group.length != undefined) {
        var group1 = groups.group[0];
        obj["group1_group_name"] = group1["group_name"];
        obj["group1_group_link"] = group1.group_link.$.chronic_id;
        var linkItems = group1.link_items.link_item;
        obj["group1_grouplinkitemtext"] = linkItems.link_text;
        obj["group1_grouplinkitemlink"] = linkItems.link.$.chronic_id;

        var group2 = groups.group[groups.group.length - 1];
        obj["group2_group_name"] = group2["group_name"];
        obj["group2_group_link"] = group2.group_link.$.chronic_id;
        var linkItems1 = group2.link_items.link_item;
        obj["group2_grouplinkitemtext"] = linkItems1.link_text;
        obj["group2_grouplinkitemlink"] = linkItems1.link.$.chronic_id;
    }
    return obj;
}
module.exports.HTMlModuleXMLValues = (result) => {
    var obj = {};
    var rowNumber = 0;
    var moduleSettings = result.webmd_rendition.content.wbmd_asset.webmd_module.module_settings;

    //Module settings
    obj["title"] = moduleSettings.hasOwnProperty('title') ? moduleSettings.title : 'title missed on xml';
    obj["object_name"] = moduleSettings.hasOwnProperty('object_name') ? moduleSettings.object_name : 'object_name missed on xml';
    obj["object_type"] = moduleSettings.hasOwnProperty('object_type') ? moduleSettings.object_type : 'object_type missed on xml';
    obj["wbmd_pb_module_category"] = moduleSettings.hasOwnProperty('wbmd_pb_module_category') ? moduleSettings.wbmd_pb_module_category : 'wbmd_pb_module_category missed on xml';
    obj["wbmd_pb_dyn_module_category"] = moduleSettings.hasOwnProperty('wbmd_pb_dyn_module_category') ? moduleSettings.wbmd_pb_dyn_module_category : 'wbmd_pb_dyn_module_category missed on xml';
    obj["wbmd_pb_module_label1"] = (moduleSettings.hasOwnProperty('md_pb_module_label1_group') && moduleSettings.md_pb_module_label1_group.wbmd_pb_module_label1 != undefined) ? moduleSettings.md_pb_module_label1_group.wbmd_pb_module_label1 : 'md_pb_module_label1_group.wbmd_pb_module_label1 missed on xml';
    obj["wbmd_pb_module_label2"] = (moduleSettings.hasOwnProperty('md_pb_module_label2_group') && moduleSettings.md_pb_module_label1_group.wbmd_pb_module_label1 != undefined) ? moduleSettings.md_pb_module_label2_group.wbmd_pb_module_label2 : 'md_pb_module_label2_group.wbmd_pb_module_label2 missed on xml';
    obj["wbmd_pb_module_sp_program"] = moduleSettings.hasOwnProperty('wbmd_pb_module_sp_program') ? moduleSettings.wbmd_pb_module_sp_program : 'wbmd_pb_module_sp_program missed on xml';
    obj["wbmd_pb_cache_duration"] = moduleSettings.hasOwnProperty('wbmd_pb_cache_duration') ? moduleSettings.wbmd_pb_cache_duration : 'wbmd_pb_cache_duration missed on xml';
    obj["wbmd_c_channel_ids_group"] = moduleSettings.hasOwnProperty('wbmd_c_channel_ids_group') ? moduleSettings.wbmd_c_channel_ids_group : 'wbmd_c_channel_ids_group missed on xml';
    obj["wbmd_program_group"] = moduleSettings.hasOwnProperty('wbmd_program_group') ? moduleSettings.wbmd_program_group : 'wbmd_program_group missed on xml';
    obj["wbmd_pb_asset_css_path"] = moduleSettings.hasOwnProperty('wbmd_pb_asset_css') && moduleSettings.wbmd_pb_asset_css ? moduleSettings.wbmd_pb_asset_css.$.path : 'wbmd_pb_asset_css.$.path missed on xml';
    obj["wbmd_pb_asset_css_object_type"] = moduleSettings.hasOwnProperty('wbmd_pb_asset_css') && moduleSettings.wbmd_pb_asset_css ? moduleSettings.wbmd_pb_asset_css.$.object_type : 'wbmd_pb_asset_css.$.object_type missed on xml';
    obj["wbmd_pb_module_xsl_path"] = moduleSettings.hasOwnProperty('wbmd_pb_module_xsl') && moduleSettings.wbmd_pb_module_xsl ? moduleSettings.wbmd_pb_module_xsl.$.path : 'wbmd_pb_module_xsl.$.path missed on xml';
    obj["wbmd_pb_module_xsl_object_type"] = moduleSettings.hasOwnProperty('wbmd_pb_module_xsl') && moduleSettings.wbmd_pb_module_xsl ? moduleSettings.wbmd_pb_module_xsl.$.object_type : 'wbmd_pb_module_xsl_object_type missed on xml';
    obj["wbmd_pb_owner_page_id_path"] = moduleSettings.hasOwnProperty('wbmd_pb_owner_page_id') && moduleSettings.wbmd_pb_owner_page_id ? moduleSettings.wbmd_pb_owner_page_id.$.path : 'wbmd_pb_owner_page_id.$.path missed on xml';
    obj["wbmd_pb_owner_page_id_object_type"] = moduleSettings.hasOwnProperty('wbmd_pb_owner_page_id') && moduleSettings.wbmd_pb_owner_page_id ? moduleSettings.wbmd_pb_owner_page_id.$.object_type : 'wbmd_pb_owner_page_id_object_type missed on xml';
    obj["dnn_id"] = moduleSettings.hasOwnProperty('dnn_id') ? moduleSettings.dnn_id : 'dnn_id missed on xml';
    obj["class"] = moduleSettings.hasOwnProperty('class') ? moduleSettings.class : 'class missed on xml';
    obj['chronic_id'] = moduleSettings.hasOwnProperty('chronic_id');


    //module data from xml
    var moduleData = result.webmd_rendition.content.wbmd_asset.webmd_module.module_data;
    obj['contentText'] = moduleData.hasOwnProperty('contentText') && moduleData.contentText ? moduleData.contentText : 'contentText missed on xml';
    return obj;
}

module.exports.StandardPromomodule = (result) => {
    var obj = {};
    var rowNumber = 0;
    var moduleSettings = result.webmd_rendition.content.wbmd_asset.webmd_module.module_settings;

    //Module settings
    obj["title"] = moduleSettings.hasOwnProperty('title') ? moduleSettings.title : 'title missed on xml';
    obj["object_name"] = moduleSettings.hasOwnProperty('object_name') ? moduleSettings.object_name : 'object_name missed on xml';
    obj["object_type"] = moduleSettings.hasOwnProperty('object_type') ? moduleSettings.object_type : 'object_type missed on xml';
    obj["wbmd_pb_module_category"] = moduleSettings.hasOwnProperty('wbmd_pb_module_category') ? moduleSettings.wbmd_pb_module_category : 'wbmd_pb_module_category missed on xml';
    obj["wbmd_pb_dyn_module_category"] = moduleSettings.hasOwnProperty('wbmd_pb_dyn_module_category') ? moduleSettings.wbmd_pb_dyn_module_category : 'wbmd_pb_dyn_module_category missed on xml';
    obj["wbmd_pb_module_label1"] = (moduleSettings.hasOwnProperty('md_pb_module_label1_group') && moduleSettings.md_pb_module_label1_group.wbmd_pb_module_label1 != undefined) ? moduleSettings.md_pb_module_label1_group.wbmd_pb_module_label1 : 'md_pb_module_label1_group.wbmd_pb_module_label1 missed on xml';
    obj["wbmd_pb_module_label2"] = (moduleSettings.hasOwnProperty('md_pb_module_label2_group') && moduleSettings.md_pb_module_label1_group.wbmd_pb_module_label1 != undefined) ? moduleSettings.md_pb_module_label2_group.wbmd_pb_module_label2 : 'md_pb_module_label2_group.wbmd_pb_module_label2 missed on xml';
    obj["wbmd_pb_module_sp_program"] = moduleSettings.hasOwnProperty('wbmd_pb_module_sp_program') ? moduleSettings.wbmd_pb_module_sp_program : 'wbmd_pb_module_sp_program missed on xml';
    obj["wbmd_pb_cache_duration"] = moduleSettings.hasOwnProperty('wbmd_pb_cache_duration') ? moduleSettings.wbmd_pb_cache_duration : 'wbmd_pb_cache_duration missed on xml';
    obj["wbmd_c_channel_ids_group"] = moduleSettings.hasOwnProperty('wbmd_c_channel_ids_group') ? moduleSettings.wbmd_c_channel_ids_group : 'wbmd_c_channel_ids_group missed on xml';
    obj["wbmd_program_group"] = moduleSettings.hasOwnProperty('wbmd_program_group') ? moduleSettings.wbmd_program_group : 'wbmd_program_group missed on xml';
    obj["wbmd_pb_asset_css_path"] = moduleSettings.hasOwnProperty('wbmd_pb_asset_css') && moduleSettings.wbmd_pb_asset_css ? moduleSettings.wbmd_pb_asset_css.$.path : 'wbmd_pb_asset_css.$.path missed on xml';
    obj["wbmd_pb_asset_css_object_type"] = moduleSettings.hasOwnProperty('wbmd_pb_asset_css') && moduleSettings.wbmd_pb_asset_css ? moduleSettings.wbmd_pb_asset_css.$.object_type : 'wbmd_pb_asset_css.$.object_type missed on xml';
    obj["wbmd_pb_module_xsl_path"] = moduleSettings.hasOwnProperty('wbmd_pb_module_xsl') && moduleSettings.wbmd_pb_module_xsl ? moduleSettings.wbmd_pb_module_xsl.$.path : 'wbmd_pb_module_xsl.$.path missed on xml';
    obj["wbmd_pb_module_xsl_object_type"] = moduleSettings.hasOwnProperty('wbmd_pb_module_xsl') && moduleSettings.wbmd_pb_module_xsl ? moduleSettings.wbmd_pb_module_xsl.$.object_type : 'wbmd_pb_module_xsl_object_type missed on xml';
    obj["wbmd_pb_owner_page_id_path"] = moduleSettings.hasOwnProperty('wbmd_pb_owner_page_id') && moduleSettings.wbmd_pb_owner_page_id ? moduleSettings.wbmd_pb_owner_page_id.$.path : 'wbmd_pb_owner_page_id.$.path missed on xml';
    obj["wbmd_pb_owner_page_id_object_type"] = moduleSettings.hasOwnProperty('wbmd_pb_owner_page_id') && moduleSettings.wbmd_pb_owner_page_id ? moduleSettings.wbmd_pb_owner_page_id.$.object_type : 'wbmd_pb_owner_page_id_object_type missed on xml';
    obj["dnn_id"] = moduleSettings.hasOwnProperty('dnn_id') ? moduleSettings.dnn_id : 'dnn_id missed on xml';
    obj["class"] = moduleSettings.hasOwnProperty('class') ? moduleSettings.class : 'class missed on xml';
    obj['chronic_id'] = moduleSettings.hasOwnProperty('chronic_id');


    //module data from xml
    var moduleData = result.webmd_rendition.content.wbmd_asset.webmd_module.module_data;
    obj["ModuleTitle"] = moduleData.module_title.hasOwnProperty("title") && moduleData.module_title.title ? moduleData.module_title.title : "title is missed on xml";
    obj["link_url_chronic_id"] = moduleData.module_title.hasOwnProperty('link_url') && moduleData.module_title.link_url.$.chronic_id ? true : false;
    obj["link_url_directive"] = moduleData.module_title.hasOwnProperty('link_url') && moduleData.module_title.link_url.$.directive ? moduleData.module_title.link_url.$.directive : "link_url directive missed on xml";
    obj["link_url_object_type"] = moduleData.module_title.hasOwnProperty('link_url') && moduleData.module_title.link_url.$.object_type ? moduleData.module_title.link_url.$.object_type : "link_url object_type missed on xml";

    var logos = moduleData.logos;
    obj["logo_overridetext"] = logos.logo.hasOwnProperty('logo_overridetext') && logos.logo.logo_overridetext ? logos.logo.logo_overridetext : "logo_overridetext missied on xml";

    obj["logo_source_chronic_id"] = logos.logo.hasOwnProperty('logo_source') && logos.logo.logo_source.$.chronic_id ? true : false;
    obj["logo_source_directive"] = logos.logo.hasOwnProperty('logo_source') && logos.logo.logo_source.$.directive ? logos.logo.logo_source.$.directive : "logo_source directive missed on xml";
    obj["logo_source_object_type"] = logos.logo.hasOwnProperty('logo_source') && logos.logo.logo_source.$.object_type ? logos.logo.logo_source.$.object_type : "logo_source object_type missed on xml";
    obj["logo_link_url_chronic_id"] = logos.logo.hasOwnProperty('logo_link_url') && logos.logo.logo_link_url.$.chronic_id ? true : false;
    obj["logo_link_url_directive"] = logos.logo.hasOwnProperty('logo_link_url') && logos.logo.logo_link_url.$.directive ? logos.logo.logo_link_url.$.directive : "logo_link_url directive missed on xml";
    obj["logo_link_url_object_type"] = logos.logo.hasOwnProperty('logo_link_url') && logos.logo.logo_link_url.$.object_type ? logos.logo.logo_link_url.$.object_type : "logo_link_url object_type missed on xml";

    var slides = moduleData.slides;
    if (slides.slide.length != undefined) {
        slides.slide.forEach(function (element) {
            rowNumber = rowNumber + 1;
            obj["slide_name_" + rowNumber] = element.hasOwnProperty('slide_name') && element.slide_name ? element.slide_name : "slide_name missed on xml";
            obj["slide_title_" + rowNumber] = element.hasOwnProperty('slide_title') && element.slide_title ? element.slide_title : "slide_title missed on xml";
            obj["slide_sub_text_" + rowNumber] = element.hasOwnProperty('slide_sub_text') && element.slide_sub_text ? element.slide_sub_text : "slide_sub_text missed on xml";
            obj["slide_title_emphasized_text_" + rowNumber] = element.hasOwnProperty('slide_title_emphasized_text') && element.slide_title_emphasized_text ? element.slide_title_emphasized_text : "slide_title_emphasized_text missed on xml";
            obj["image_alt_text_override_" + rowNumber] = element.hasOwnProperty('image_alt_text_override') && element.image_alt_text_override ? element.image_alt_text_override : "image_alt_text_override missed on xml";

            obj["image_source_chronic_id_" + rowNumber] = element.hasOwnProperty('image_source') && element.image_source.$.chronic_id ? true : false;
            obj["image_source_directive_" + rowNumber] = element.hasOwnProperty('image_source') && element.image_source.$.directive ? element.image_source.$.directive : "image_source directive missed on xml";
            obj["image_source_object_type_" + rowNumber] = element.hasOwnProperty('image_source') && element.image_source.$.object_type ? element.image_source.$.object_type : "image_source object_type missed on xml";

        }, this);
    }
    else {
        rowNumber = 1;
        obj["slide_name_" + rowNumber] = slides.slide.hasOwnProperty('slide_name') && slides.slide.slide_name ? slides.slide.slide_name : "slide_name missed on xml";
        obj["slide_title_" + rowNumber] = slides.slide.hasOwnProperty('slide_title') && slides.slide.slide_title ? slides.slide.slide_title : "slide_title missed on xml";
        obj["slide_sub_text_" + rowNumber] = slides.slide.hasOwnProperty('slide_sub_text') && slides.slide.slide_sub_text ? slides.slide.slide_sub_text : "slide_sub_text missed on xml";
        obj["slide_title_emphasized_text_" + rowNumber] = slides.slide.hasOwnProperty('slide_title_emphasized_text') && slides.slide.slide_title_emphasized_text ? slides.slide.slide_title_emphasized_text : "slide_title_emphasized_text missed on xml";
        obj["image_alt_text_override_" + rowNumber] = slides.slide.hasOwnProperty('image_alt_text_override') && slides.slide.image_alt_text_override ? slides.slide.image_alt_text_override : "image_alt_text_override missed on xml";

        obj["image_source_chronic_id_" + rowNumber] = slides.slide.hasOwnProperty('image_source') && slides.slide.image_source.$.chronic_id ? true : false;
        obj["image_source_directive_" + rowNumber] = slides.slide.hasOwnProperty('image_source') && slides.slide.image_source.$.directive ? slides.slide.image_source.$.directive : "image_source directive missed on xml";
        obj["image_source_object_type_" + rowNumber] = slides.slide.hasOwnProperty('image_source') && slides.slide.image_source.$.object_type ? slides.slide.image_source.$.object_type : "image_source object_type missed on xml";
    }

    return obj;
}

module.exports.twocolumnheadermodule = (result) => {
    var obj = {};
    var rowNumber = 0;
    var moduleSettings = result.webmd_rendition.content.wbmd_asset.webmd_module.module_settings;

    //Module settings
    obj["title"] = moduleSettings.hasOwnProperty('title') ? moduleSettings.title : 'title missed on xml';
    obj["object_name"] = moduleSettings.hasOwnProperty('object_name') ? moduleSettings.object_name : 'object_name missed on xml';
    obj["object_type"] = moduleSettings.hasOwnProperty('object_type') ? moduleSettings.object_type : 'object_type missed on xml';
    obj["wbmd_pb_module_category"] = moduleSettings.hasOwnProperty('wbmd_pb_module_category') ? moduleSettings.wbmd_pb_module_category : 'wbmd_pb_module_category missed on xml';
    obj["wbmd_pb_dyn_module_category"] = moduleSettings.hasOwnProperty('wbmd_pb_dyn_module_category') ? moduleSettings.wbmd_pb_dyn_module_category : 'wbmd_pb_dyn_module_category missed on xml';
    obj["wbmd_pb_module_label1"] = (moduleSettings.hasOwnProperty('md_pb_module_label1_group') && moduleSettings.md_pb_module_label1_group.wbmd_pb_module_label1 != undefined) ? moduleSettings.md_pb_module_label1_group.wbmd_pb_module_label1 : 'md_pb_module_label1_group.wbmd_pb_module_label1 missed on xml';
    obj["wbmd_pb_module_label2"] = (moduleSettings.hasOwnProperty('md_pb_module_label2_group') && moduleSettings.md_pb_module_label1_group.wbmd_pb_module_label1 != undefined) ? moduleSettings.md_pb_module_label2_group.wbmd_pb_module_label2 : 'md_pb_module_label2_group.wbmd_pb_module_label2 missed on xml';
    obj["wbmd_pb_module_sp_program"] = moduleSettings.hasOwnProperty('wbmd_pb_module_sp_program') ? moduleSettings.wbmd_pb_module_sp_program : 'wbmd_pb_module_sp_program missed on xml';
    obj["wbmd_pb_cache_duration"] = moduleSettings.hasOwnProperty('wbmd_pb_cache_duration') ? moduleSettings.wbmd_pb_cache_duration : 'wbmd_pb_cache_duration missed on xml';
    obj["wbmd_c_channel_ids_group"] = moduleSettings.hasOwnProperty('wbmd_c_channel_ids_group') ? moduleSettings.wbmd_c_channel_ids_group : 'wbmd_c_channel_ids_group missed on xml';
    obj["wbmd_program_group"] = moduleSettings.hasOwnProperty('wbmd_program_group') ? moduleSettings.wbmd_program_group : 'wbmd_program_group missed on xml';
    obj["wbmd_pb_asset_css_path"] = moduleSettings.hasOwnProperty('wbmd_pb_asset_css') && moduleSettings.wbmd_pb_asset_css ? moduleSettings.wbmd_pb_asset_css.$.path : 'wbmd_pb_asset_css.$.path missed on xml';
    obj["wbmd_pb_asset_css_object_type"] = moduleSettings.hasOwnProperty('wbmd_pb_asset_css') && moduleSettings.wbmd_pb_asset_css ? moduleSettings.wbmd_pb_asset_css.$.object_type : 'wbmd_pb_asset_css.$.object_type missed on xml';
    obj["wbmd_pb_module_xsl_path"] = moduleSettings.hasOwnProperty('wbmd_pb_module_xsl') && moduleSettings.wbmd_pb_module_xsl ? moduleSettings.wbmd_pb_module_xsl.$.path : 'wbmd_pb_module_xsl.$.path missed on xml';
    obj["wbmd_pb_module_xsl_object_type"] = moduleSettings.hasOwnProperty('wbmd_pb_module_xsl') && moduleSettings.wbmd_pb_module_xsl ? moduleSettings.wbmd_pb_module_xsl.$.object_type : 'wbmd_pb_module_xsl_object_type missed on xml';
    obj["wbmd_pb_owner_page_id_path"] = moduleSettings.hasOwnProperty('wbmd_pb_owner_page_id') && moduleSettings.wbmd_pb_owner_page_id ? moduleSettings.wbmd_pb_owner_page_id.$.path : 'wbmd_pb_owner_page_id.$.path missed on xml';
    obj["wbmd_pb_owner_page_id_object_type"] = moduleSettings.hasOwnProperty('wbmd_pb_owner_page_id') && moduleSettings.wbmd_pb_owner_page_id ? moduleSettings.wbmd_pb_owner_page_id.$.object_type : 'wbmd_pb_owner_page_id_object_type missed on xml';
    obj["dnn_id"] = moduleSettings.hasOwnProperty('dnn_id') ? moduleSettings.dnn_id : 'dnn_id missed on xml';
    obj["class"] = moduleSettings.hasOwnProperty('class') ? moduleSettings.class : 'class missed on xml';
    obj['chronic_id'] = moduleSettings.hasOwnProperty('chronic_id');


    //module data from xml
    var moduleData = result.webmd_rendition.content.wbmd_asset.webmd_module.module_data;
    obj["moduleTitle"] = moduleData.hasOwnProperty("moduleTitle") && moduleData.moduleTitle ? moduleData.moduleTitle : "moduleTitle is missed on xml";
    obj["module_subtitle"] = moduleData.hasOwnProperty('module_subtitle') && moduleData.module_subtitle ? moduleData.module_subtitle : "module_subtitle is missed on xml";
    obj["attribution_link_text"] = moduleData.hasOwnProperty('attribution_link_text') && moduleData.attribution_link_text ? moduleData.attribution_link_text : "attribution_link_text missed on xml";

    var images = moduleData.body_images;
    if (images.body_image.length != undefined) {
        images.body_image.forEach(function (element) {
            rowNumber = rowNumber + 1;
            obj["image_link_" + rowNumber] = element.hasOwnProperty('image_link') && element.image_link.$.chronic_id ? true : false;
            obj["source_" + rowNumber] = element.hasOwnProperty('source') && element.source.$.chronic_id ? true : false;
        }, this);
    }
    else {
        rowNumber=1;
        obj["image_link_" + rowNumber] = images.body_image.hasOwnProperty('image_link') && images.body_image.image_link.$.chronic_id ? true : false;
        obj["source_" + rowNumber] = images.body_image.hasOwnProperty('source') && images.body_image.source.$.chronic_id ? true : false;
    }
    return obj;

}

module.exports.EditMultipulVideoLaunchXMLValues = (result) => {
    var obj = {};
    var rowNumber = 0;

    
    var moduleData = result.webmd_rendition.content.wbmd_asset.webmd_module.module_data;
    obj["VideoBrand"] = moduleData.hasOwnProperty('VideoBrand') ? moduleData.VideoBrand : 'VideoBrand missed on xml';
    obj["VideoLinkView"] = moduleData.hasOwnProperty('VideoLinkView') ? moduleData.VideoLinkView : 'VideoLinkView missed on xml';
    obj["ModuleDescription"] = moduleData.hasOwnProperty('ModuleDescription') ? moduleData.ModuleDescription : 'ModuleDescription missed on xml';
    obj["ModuleTitle"] = moduleData.hasOwnProperty('ModuleTitle') ? moduleData.ModuleTitle : 'ModuleTitle missed on xml';
    obj["VideoTitleOverride"] = moduleData.Videos.Video.hasOwnProperty('VideoTitleOverride') ? moduleData.Videos.Video.VideoTitleOverride : 'VideoTitleOverride missed on xml';
    obj["VideoDescriptionOverride"] = moduleData.Videos.Video.hasOwnProperty('VideoDescriptionOverride') ? moduleData.Videos.Video.VideoDescriptionOverride : 'VideoDescriptionOverride missed on xml';
    obj["videosource_chronic_id"] = moduleData.Videos.Video.hasOwnProperty('VideoSource') &&  moduleData.Videos.Video.VideoSource ? moduleData.Videos.Video.VideoSource.$.chronic_id : 'VideoSource.$.chronic_id missed on xml';
    obj["VideoLink_chronic_id"] = moduleData.Videos.Video.hasOwnProperty('VideoLink') && moduleData.Videos.Video.VideoLink && moduleData.Videos.Video.VideoLink.$.chronic_id != undefined ? moduleData.Videos.Video.VideoLink.$.chronic_id : "";
    obj["PopupLink_chronic_id"] = moduleData.Videos.Video.hasOwnProperty('PopupLink') && moduleData.Videos.Video.PopupLink && moduleData.Videos.Video.PopupLink.$.chronic_id != undefined ? true : false;

    return obj;
    
    }

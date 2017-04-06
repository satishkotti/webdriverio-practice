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
    obj["wbmd_pb_asset_css_path"] = moduleSettings.hasOwnProperty('wbmd_pb_asset_css') ? moduleSettings.wbmd_pb_asset_css.$.path : 'wbmd_pb_asset_css.$.path missed on xml';
    obj["wbmd_pb_asset_css_object_type"] = moduleSettings.hasOwnProperty('wbmd_pb_asset_css') ? moduleSettings.wbmd_pb_asset_css.$.object_type : 'wbmd_pb_asset_css.$.object_type missed on xml';
    obj["wbmd_pb_module_xsl_path"] = moduleSettings.hasOwnProperty('wbmd_pb_module_xsl') ? moduleSettings.wbmd_pb_module_xsl.$.path : 'wbmd_pb_module_xsl.$.path missed on xml';
    obj["wbmd_pb_module_xsl_object_type"] = moduleSettings.hasOwnProperty('wbmd_pb_module_xsl') ? moduleSettings.wbmd_pb_module_xsl.$.object_type : 'wbmd_pb_module_xsl_object_type missed on xml';

    // moduleSettings.wbmd_pb_moduledataschema.forEach(function (element) {
    //     rowNumber = rowNumber + 1;
    //     obj["wbmd_pb_moduledataschema_path_" + rowNumber] = element.$.path;
    //     obj["wbmd_pb_moduledataschema_object_type_" + rowNumber] = element.$.object_type;
    // }, this);

    obj["wbmd_pb_owner_page_id_path"] = moduleSettings.hasOwnProperty('wbmd_pb_owner_page_id') ? moduleSettings.wbmd_pb_owner_page_id.$.path : 'wbmd_pb_owner_page_id.$.path missed on xml';
    obj["wbmd_pb_owner_page_id_object_type"] = moduleSettings.hasOwnProperty('wbmd_pb_owner_page_id') ? moduleSettings.wbmd_pb_owner_page_id.$.object_type : 'wbmd_pb_owner_page_id_object_type missed on xml';
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
            obj["videosource_chronic_id_" + rowNumber] = element.hasOwnProperty('VideoSource') ? element.VideoSource.$.chronic_id : 'VideoSource.$.chronic_id missed on xml';
            obj["VideoLink_chronic_id_" + rowNumber] = element.hasOwnProperty('VideoLink') && element.VideoLink.$.chronic_id != undefined ? true : false;
            obj["PopupLink_chronic_id_" + rowNumber] = element.hasOwnProperty('PopupLink') && element.PopupLink.$.chronic_id != undefined ? true : false;

        }, this);
    }
    else {
        obj["VideoTitleOverride_1"] = moduleData.Videos.Video.hasOwnProperty('VideoTitleOverride') ? moduleData.Videos.Video.VideoTitleOverride : 'VideoTitleOverride missed on xml';
        obj["VideoDescriptionOverride_1"] = moduleData.Videos.Video.hasOwnProperty('VideoDescriptionOverride') ? moduleData.Videos.Video.VideoDescriptionOverride : 'VideoDescriptionOverride missed on xml';
        obj["videosource_chronic_id_1"] = moduleData.Videos.Video.hasOwnProperty('VideoSource') ? moduleData.Videos.Video.VideoSource.$.chronic_id : 'VideoSource.$.chronic_id missed on xml';
        obj["VideoLink_chronic_id_1"] = moduleData.Videos.Video.hasOwnProperty('VideoLink') && moduleData.Videos.Video.VideoLink.$.chronic_id != undefined ? true : false;
        obj["PopupLink_chronic_id_1"] = moduleData.Videos.Video.hasOwnProperty('PopupLink') && moduleData.Videos.Video.PopupLink.$.chronic_id != undefined ? true : false;

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
    obj["wbmd_pb_asset_css_object_type"] = moduleSettings.hasOwnProperty('wbmd_pb_asset_css')&& moduleSettings.wbmd_pb_asset_css ? moduleSettings.wbmd_pb_asset_css.$.object_type : 'wbmd_pb_asset_css.$.object_type missed on xml';
    obj["wbmd_pb_module_xsl_path"] = moduleSettings.hasOwnProperty('wbmd_pb_module_xsl') &&moduleSettings.wbmd_pb_module_xsl? moduleSettings.wbmd_pb_module_xsl.$.path : 'wbmd_pb_module_xsl.$.path missed on xml';
    obj["wbmd_pb_module_xsl_object_type"] = moduleSettings.hasOwnProperty('wbmd_pb_module_xsl') && moduleSettings.wbmd_pb_module_xsl? moduleSettings.wbmd_pb_module_xsl.$.object_type : 'wbmd_pb_module_xsl_object_type missed on xml';
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
    obj['sponsor_logo_source_directive'] = sponsorLogo.hasOwnProperty('sponsor_logo_source') && sponsorLogo.sponsor_logo_source? sponsorLogo.sponsor_logo_source.$.directive : 'sponsor_logo_source missed on xml';
    obj['sponsor_logo_source_object_type'] = sponsorLogo.hasOwnProperty('sponsor_logo_source')&& sponsorLogo.sponsor_logo_source ? sponsorLogo.sponsor_logo_source.$.object_type : 'sponsor_logo_source missed on xml';;
    obj['sponsor_logo_source_wbmd_lookup_type'] = sponsorLogo.hasOwnProperty('sponsor_logo_source') && sponsorLogo.sponsor_logo_source ? sponsorLogo.sponsor_logo_source.$.wbmd_lookup_type : 'sponsor_logo_source missed on xml';;
    obj['sponsor_logo_source_wbmd_storage_value'] = sponsorLogo.hasOwnProperty('sponsor_logo_source') && sponsorLogo.sponsor_logo_source ? sponsorLogo.sponsor_logo_source.$.wbmd_storage_value : 'sponsor_logo_source missed on xml';;
    obj['sponsor_logo_source_path'] = sponsorLogo.hasOwnProperty('sponsor_logo_source')  && sponsorLogo.sponsor_logo_source? sponsorLogo.sponsor_logo_source.$.path : 'sponsor_logo_source missed on xml';
    obj['sponsor_logo_source_alt'] = sponsorLogo.hasOwnProperty('sponsor_logo_source') && sponsorLogo.sponsor_logo_source ? sponsorLogo.sponsor_logo_source.$.alt : 'sponsor_logo_source missed on xml';
    obj['sponsor_logo_link_directive'] = sponsorLogo.hasOwnProperty('sponsor_logo_link') && sponsorLogo.sponsor_logo_link ? sponsorLogo.sponsor_logo_link.$.directive : 'sponsor_logo_link missed on xml';
    obj['sponsor_logo_link_object_type'] = sponsorLogo.hasOwnProperty('sponsor_logo_link') && sponsorLogo.sponsor_logo_link? sponsorLogo.sponsor_logo_link.$.object_type : 'sponsor_logo_link missed on xml';
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
        lowerLinks.lower_link.forEach(function (element) {
            rowNumber = rowNumber + 1;
            obj['body_copy_body_copy_text_' + rowNumber] = element.hasOwnProperty('body_copy_text') ? element.body_copy_text : 'body_copy_text missed on xml';
            obj['body_copy_body_copy_link_view_' + rowNumber] = element.hasOwnProperty('body_copy_link_view') ? element.body_copy_link_view : 'body_copy_link_view missed on xml';
            obj['body_copy_body_copy_link_directive_' + rowNumber] = element.hasOwnProperty('body_copy_link') && element.body_copy_link ? element.body_copy_link.$.directive : 'body_copy_link missed on xml';
            obj['body_copy_body_copy_link_object_type_' + rowNumber] = element.hasOwnProperty('body_copy_link') && element.body_copy_link ? element.body_copy_link.$.object_type : 'body_copy_link missed on xml';
        }, this);
    } else {
        obj['body_copy_body_copy_text_1'] = bodyCopies.body_copy.hasOwnProperty('body_copy_text') ? bodyCopies.body_copy.body_copy_text : 'body_copy_text missed on xml';
        obj['body_copy_body_copy_link_view_'] = bodyCopies.body_copy.hasOwnProperty('body_copy_link_view') ? bodyCopies.body_copy.body_copy_link_view : 'body_copy_link_view missed on xml';
        obj['body_copy_body_copy_link_directive_1'] = bodyCopies.body_copy.hasOwnProperty('body_copy_link') && (bodyCopies.body_copy.body_copy_link)? bodyCopies.body_copy.body_copy_link.$.directive : 'body_copy_link missed on xml';
        obj['body_copy_body_copy_link_object_type_1'] = bodyCopies.body_copy.hasOwnProperty('body_copy_link') && (bodyCopies.body_copy.body_copy_link)? bodyCopies.body_copy.body_copy_link.$.object_type : 'body_copy_link missed on xml';
    }

    //body_image info
    var bodyImg = moduleData.body_image;
    obj['body_image_override_text'] = bodyImg.hasOwnProperty('body_image_override_text') ? bodyImg.body_image_override_text : 'body_image_override_text missed on xml';
    obj['body_image_link_view'] = bodyImg.hasOwnProperty('body_image_link_view') ? bodyImg.body_image_link_view : 'body_image_link_view missed on xml';
    obj['body_image_align'] = bodyImg.hasOwnProperty('body_image_align') ? bodyImg.body_image_align : 'body_image_align missed on xml';
    obj['body_image_source_directive'] = bodyImg.hasOwnProperty('body_image_source') &&bodyImg.body_image_source ? bodyImg.body_image_source.$.directive : 'body_image_source missed on xml';
    obj['body_image_source_object_type'] = bodyImg.hasOwnProperty('body_image_source') && bodyImg.body_image_source? bodyImg.body_image_source.$.object_type : 'body_image_source missed on xml';
    obj['body_image_source_wbmd_lookup_type'] = bodyImg.hasOwnProperty('body_image_source')&& bodyImg.body_image_source ? bodyImg.body_image_source.$.wbmd_lookup_type : 'body_image_source missed on xml';
    obj['body_image_source_wbmd_storage_value'] = bodyImg.hasOwnProperty('body_image_source') && bodyImg.body_image_source ? bodyImg.body_image_source.$.wbmd_storage_value : 'body_image_source missed on xml';
    obj['body_image_source_path'] = bodyImg.hasOwnProperty('body_image_source') && bodyImg.body_image_source? bodyImg.body_image_source.$.path : 'body_image_source missed on xml';
    obj['body_image_source_alt'] = bodyImg.hasOwnProperty('body_image_source') && bodyImg.body_image_source? bodyImg.body_image_source.$.alt : 'body_image_source missed on xml';
    obj['body_image_link_directive'] = bodyImg.hasOwnProperty('body_image_link') &&bodyImg.body_image_link ? bodyImg.body_image_link.$.directive : 'body_image_link missed on xml';
    obj['body_image_link_object_type'] = bodyImg.hasOwnProperty('body_image_link') && bodyImg.body_image_link? bodyImg.body_image_link.$.object_type : 'body_image_link missed on xml';
    obj['body_image_source_chronic_id'] = bodyImg.hasOwnProperty('body_image_source')&& bodyImg.body_image_source && bodyImg.body_image_source.$.chronic_id != undefined ? true : false;
    obj['body_image_link_chronic_id'] = bodyImg.hasOwnProperty('body_image_link') && bodyImg.body_image_link && bodyImg.body_image_link.$.chronic_id != undefined ? true : false;


    //body_links info
    var bodyLnks = moduleData.body_links;
    obj['body_bullet'] = bodyLnks.hasOwnProperty('body_bullet') ? bodyLnks.body_bullet : 'body_bullet missed on xml';
    obj['body_link_body_link_text'] = bodyLnks.body_link.hasOwnProperty('body_link_text') ? bodyLnks.body_link.body_link_text : 'body_link_text missed on xml';
    obj['body_link_body_link_link_view'] = bodyLnks.body_link.hasOwnProperty('body_link_link_view') ? bodyLnks.body_link.body_link_link_view : 'body_link_link_view missed on xml';
    obj['body_link_link_directive'] = bodyLnks.body_link.hasOwnProperty('body_link_link') && bodyLnks.body_link.body_link_link? bodyLnks.body_link.body_link_link.$.directive : 'body_link_link missed on xml';
    obj['body_link_link_object_type'] = bodyLnks.body_link.hasOwnProperty('body_link_link')&& bodyLnks.body_link.body_link_link ? bodyLnks.body_link.body_link_link.$.object_type : 'body_link_link missed on xml';
    obj['body_link_link_chronic_id'] = bodyLnks.body_link.hasOwnProperty('body_link_link') && bodyLnks.body_link.body_link_link && bodyLnks.body_link.body_link_link.$.chronic_id != undefined ? true : false;

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
            obj['lower_link_lower_link_lower_lower_link_link_object_type_' + rowNumber] = element.hasOwnProperty('lower_link_link')&& element.lower_link_link ? element.lower_link_link.$.object_type : 'lower_link_link missed on xmll';
            obj['lower_link_link_chronic_id_' + rowNumber] = element.hasOwnProperty('lower_link_link') && element.lower_link_link && element.lower_link_link.$.chronic_id != undefined ? true : false;
        }, this);
    } else {
        obj['lower_link_lower_link_lower_link_text_1'] = lowerLinks.lower_link.hasOwnProperty('lower_link_text') ? lowerLinks.lower_link.lower_link_text : 'lower_link_text missed on xmll';
        obj['lower_link_lower_link_lower_link_link_view_1'] = lowerLinks.lower_link.hasOwnProperty('lower_link_link_view') ? lowerLinks.lower_link.lower_link_link_view : 'lower_link_link_view missed on xmll';
        obj['lower_link_lower_link_lower_lower_link_link_directive_1'] = lowerLinks.lower_link.hasOwnProperty('lower_link_link') && lowerLinks.lower_link.lower_link_link ?  lowerLinks.lower_link.lower_link_link.$.directive : 'lower_link_link missed on xmll';
        obj['lower_link_lower_link_lower_lower_link_link_object_type_1'] = lowerLinks.lower_link.hasOwnProperty('lower_link_link') && lowerLinks.lower_link.lower_link_link ? lowerLinks.lower_link.lower_link_link.$.object_type : 'lower_link_link missed on xmll';
        obj['lower_link_link_chronic_id_1'] = lowerLinks.lower_link.hasOwnProperty('lower_link_link') && lowerLinks.lower_link.lower_link_link && lowerLinks.lower_link.lower_link_link.$.chronic_id != undefined ? true : false;
    }

    return obj;
}
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
    obj["wbmd_pb_module_label1"] = (moduleSettings.hasOwnProperty('md_pb_module_label1_group')&& moduleSettings.md_pb_module_label1_group.wbmd_pb_module_label1!=undefined) ? moduleSettings.md_pb_module_label1_group.wbmd_pb_module_label1 : 'md_pb_module_label1_group.wbmd_pb_module_label1 missed on xml';
    obj["wbmd_pb_module_label2"] = (moduleSettings.hasOwnProperty('md_pb_module_label2_group')&& moduleSettings.md_pb_module_label1_group.wbmd_pb_module_label1!=undefined) ? moduleSettings.md_pb_module_label2_group.wbmd_pb_module_label2 : 'md_pb_module_label2_group.wbmd_pb_module_label2 missed on xml';
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
    var moduleData=result.webmd_rendition.content.wbmd_asset.webmd_module.module_data;
    obj["VideoBrand"] = moduleData.hasOwnProperty('VideoBrand') ? moduleData.VideoBrand: 'VideoBrand missed on xml';
    obj["VideoLinkView"] = moduleData.hasOwnProperty('VideoLinkView') ? moduleData.VideoLinkView: 'VideoLinkView missed on xml';
    obj["ModuleDescription"] = moduleData.hasOwnProperty('ModuleDescription') ? moduleData.ModuleDescription: 'ModuleDescription missed on xml';
    obj["ModuleTitle"] = moduleData.hasOwnProperty('ModuleTitle') ? moduleData.ModuleTitle: 'ModuleTitle missed on xml';

    if (moduleData.Videos.length != undefined) {
        rowNumber = rowNumber + 1;
        moduleData.Videos.forEach(function (element) {
            obj["VideoTitleOverride_" + rowNumber] = element.hasOwnProperty('VideoTitleOverride') ? element.VideoTitleOverride: 'VideoTitleOverride missed on xml';
            obj["VideoDescriptionOverride_" + rowNumber] = element.hasOwnProperty('VideoDescriptionOverride') ? element.VideoDescriptionOverride: 'VideoDescriptionOverride missed on xml';
            obj["videosource_chronic_id_" + rowNumber] = element.hasOwnProperty('VideoSource') ? element.VideoSource.$.chronic_id: 'VideoSource.$.chronic_id missed on xml';
            obj["VideoLink_chronic_id_" + rowNumber] = element.hasOwnProperty('VideoLink') && element.VideoLink.$.chronic_id!=undefined ? true: false;
            obj["PopupLink_chronic_id_" + rowNumber] = element.hasOwnProperty('PopupLink') && element.PopupLink.$.chronic_id!=undefined ? true: false;
        
    }, this);
    }
    else {
        obj["VideoTitleOverride_1"] = moduleData.Videos.Video.hasOwnProperty('VideoTitleOverride') ? moduleData.Videos.Video.VideoTitleOverride: 'VideoTitleOverride missed on xml';
        obj["VideoDescriptionOverride_1"] = moduleData.Videos.Video.hasOwnProperty('VideoDescriptionOverride') ? moduleData.Videos.Video.VideoDescriptionOverride: 'VideoDescriptionOverride missed on xml';
        obj["videosource_chronic_id_1"] = moduleData.Videos.Video.hasOwnProperty('VideoSource') ? moduleData.Videos.Video.VideoSource.$.chronic_id: 'VideoSource.$.chronic_id missed on xml';
        obj["VideoLink_chronic_id_" + rowNumber] = moduleData.Videos.Video.hasOwnProperty('VideoLink') && moduleData.Videos.Video.VideoLink.$.chronic_id!=undefined ? true: false;
        obj["PopupLink_chronic_id_" + rowNumber] = moduleData.Videos.Video.hasOwnProperty('PopupLink') && moduleData.Videos.Video.PopupLink.$.chronic_id!=undefined ? true: false;
          
}

    //chronic_id exits checking on different attributes
    obj['chronic_id']=moduleSettings.hasOwnProperty('chronic_id');
    obj['wbmd_pb_asset_css_chronic_id']=false;
    if(moduleSettings.hasOwnProperty('wbmd_pb_asset_css'))
    {
       // var keys=Object.keys(moduleSettings.wbmd_pb_asset_css.$);
        if('chronic_id' in moduleSettings.wbmd_pb_asset_css.$)
        {
            obj['wbmd_pb_asset_css_chronic_id']=true;
        }
    }
    obj['wbmd_pb_module_xsl_chronic_id']=false;
    if(moduleSettings.hasOwnProperty('wbmd_pb_module_xsl'))
    {
        //var keys=Object.keys(moduleSettings.wbmd_pb_module_xsl.$);
        if(moduleSettings.wbmd_pb_module_xsl.$.chronic_id!=undefined)
        {
            obj['wbmd_pb_module_xsl_chronic_id']=true;
        }
    }

    return obj;
}
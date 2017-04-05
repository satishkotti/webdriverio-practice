var props = require('./../elements/assetprops.page');
var act = require('./../elements/actions.page');
var page = require('./../../../common/page');
var actions = require('./assetactions.actions');
var iwc = require('./iwc.actions');
var menu = require('./menus.actions');


module.exports.ConfigureMultipleVideoLaunchModule = (assetProps) => {

    if (assetProps.brand != "None") { props.dropdown('Brand', assetProps.brand); }
    if (assetProps.moduleTitle != null) { props.input.get('Module Title').setValue(assetProps.moduleTitle); }
    if (assetProps.moduleDesc != null) { props.input.get('Module Description').setValue(assetProps.moduleDesc); }
    if (assetProps.AddLinks > "1") {
        //for more than one link.
    }
    else {
        if (assetProps.videos[0].videoObject != null) { props.lookup('Video Object', assetProps.videos[0].videoObject); }
        if (assetProps.videos[0].videoTitleOverride != null) { props.input.get('Video Title Override').setValue(assetProps.videos[0].videoTitleOverride); }
        if (assetProps.videos[0].videoDescOverride != null) { props.input.get('Video Description Override').setValue(assetProps.videos[0].videoDescOverride); }
    }
}
var acts = require('./../elements/actions.page');
var page = require('./../elements/assetprops.page');

module.exports.SelectMoreActions = (action) => {
    acts.button.get('More Actions').click();
    browser.pause(10000);
}

module.exports.ClickContinueButton = () => {
    acts.button.get('Continue').click();
}

module.exports.ClickModalOkayButton = () => {
    acts.button.get('Okay').click();
}

module.exports.ClickModalContinueButton = () => {
    acts.splbutton.get('Continue').click();
}

module.exports.ClickAddModuleButton = () => {
    acts.splbutton.get('Add Module').click();
}

module.exports.ClickShowEmptyContentPanes = () => {

    acts.splbutton.get(' Show').click();
}

module.exports.ClickShowExpired = () => {

    acts.splbutton.get('Expired').click();
}

module.exports.SavePublish = (action, comment) => {
    switch (action) {
        case 'Publish to Staging':
            acts.buttonMenu.get('Save/Publish', 'Publish to Staging');
            page.textarea.get('Enter a comment below to publish to staging').waitForVisible();
            page.textarea.get('Enter a comment below to publish to staging').setValue(comment);
            acts.button.get('Okay').click();
            browser.waitUntil(() => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '106px';
            }, 30000, 'Publish is taking longer than expected', 500);
            browser.waitUntil(() => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '-20px';
            }, 30000, 'Publish is taking longer than expected', 500);
            acts.button.get('More Actions').waitForVisible();
            page.element('(//section[contains(@class, "pb-module-bottom-pad")])[2]').waitForVisible();
            break;
        case 'Publish to Live':
            acts.buttonMenu.get('Save/Publish', 'Publish to Live');
            page.textarea.get('Enter a comment below to publish to live').waitForVisible();
            page.textarea.get('Enter a comment below to publish to live').setValue(comment);
            acts.button.get('Okay').click();
            browser.waitUntil(() => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '106px';
            }, 30000, 'Publish is taking longer than expected', 500);
            browser.waitUntil(() => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '-20px';
            }, 30000, 'Publish is taking longer than expected', 500);
            acts.button.get('More Actions').waitForVisible();
            page.element('(//section[contains(@class, "pb-module-bottom-pad")])[2]').waitForVisible();
            break;
        case 'Schedule Publish':
            acts.buttonMenu.get('Save/Publish', 'Publish to Live');
            page.textarea.get('Enter a comment below to publish to live').waitForVisible();
            page.textarea.get('Enter a comment below to publish to live').setValue(comment);
            $('//input[@id="schedPub"]').click();
            var datetime = browser.execute(function () { return $('input#pubDateTime').get(0).value }).value
            var splitDate = datetime.split(' ');
            var time = splitDate[1].split(':');
            var minutues = parseInt(time[1]) + 2;
            minutues = minutues > 9 ? "" + minutues : "0" + minutues;
            var futureDate = splitDate[0] + ' ' + time[0] + ':' + minutues + ' ' + splitDate[2];
            browser.execute(function (date) { $('input#pubDateTime').get(0).value = date; }, futureDate);
            acts.button.get('Okay').click();
            browser.waitUntil(() => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '106px';
            }, 30000, 'Checkin is taking longer than expected', 500);
            browser.waitUntil(() => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '-20px';
            }, 30000, 'Checkin is taking longer than expected', 500);
            acts.button.get('More Actions').waitForVisible();
            page.element('(//section[contains(@class, "pb-module-bottom-pad")])[2]').waitForVisible();
            break;
        default:
            acts.buttonMenu.get('Save/Publish', 'Checkin');
            page.textarea.get('Enter a comment below to checkin asset').waitForVisible();
            page.textarea.get('Enter a comment below to checkin asset').setValue(comment);
            acts.button.get('Okay').click();
            browser.waitUntil(() => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '106px';
            }, 30000, 'Checkin is taking longer than expected', 500);
            browser.waitUntil(() => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '-20px';
            }, 30000, 'Checkin is taking longer than expected', 500);
            acts.button.get('More Actions').waitForVisible();
            page.element('(//section[contains(@class, "pb-module-bottom-pad")])[2]').waitForVisible();
            break;
    }
}

module.exports.ClickEditButton = () => {
    acts.button.get('Edit').click();
    acts.splbutton.get('Save/Publish').waitForVisible();
    page.element('div.tab-pane.active').waitForVisible();
    browser.pause(3000);
}

module.exports.ClickCheckoutAndEditButton = () => {
    acts.splbutton.get('Checkout & Edit').click();
    acts.splbutton.get('Save/Publish').waitForVisible();
    page.element('.pb-layout-view').waitForVisible();
    browser.pause(3000);
}

module.exports.SavePublishFromMoreActions = (action, comment) => {
    switch (action) {
        case 'Publish to Staging':
            acts.buttonMenu.get('More Actions', 'Publish');
            $('//input[@value="staging"]').waitForVisible();
            $('//input[@value="staging"]').click();
            acts.button.get('Publish').click();
            browser.waitUntil(() => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '106px';
            }, 30000, 'Publish is taking longer than expected', 500);
            browser.waitUntil(() => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '-20px';
            }, 30000, 'Publish is taking longer than expected', 500);
            break;
        case 'Publish to Live':
            acts.buttonMenu.get('More Actions', 'Publish');
            $('//input[@value="live"]').waitForVisible();
            $('//input[@value="live"]').click();
            acts.button.get('Publish').click();
            browser.waitUntil(() => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '106px';
            }, 30000, 'Publish is taking longer than expected', 500);
            browser.waitUntil(() => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '-20px';
            }, 30000, 'Publish is taking longer than expected', 500);
            break;

    }
}

module.exports.SelectMoreActionsMenuItem = (menuItem) => {
    acts.buttonMenu.get('More Actions', menuItem);

    switch (menuItem) {
        case 'Cancel Checkout':
            var ele = acts.button.get('Okay');
            ele.waitForVisible();
            ele.click();
            browser.waitUntil(() => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '106px';
            }, 30000, 'Cancel Checkout is not pushed to queue yet', 500);
            browser.waitUntil(() => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '-20px';
            }, 30000, 'Cancel Checkout is not pushed to queue yet', 500);
            break;

        case 'Expire':
            browser.waitForVisible('#modal-ok');
            browser.click('#modal-ok');
            browser.waitUntil(() => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '106px';
            }, 30000, 'Expire is not pushed to queue yet', 500);
            browser.waitUntil(() => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '-20px';
            }, 30000, 'Expire is not pushed to queue yet', 500);
            break;
    }
}

module.exports.CancelCheckout = () => {
    acts.button.get('Cancel Checkout').click();
    var ele = acts.button.get('Okay');
    ele.waitForVisible();
    ele.click();
    browser.waitUntil(() => {
        return browser.getCssProperty('.pb-notification-container', 'top').value == '106px';
    }, 30000, 'Cancel Checkout did not happen yet', 500);
    browser.waitUntil(() => {
        return browser.getCssProperty('.pb-notification-container', 'top').value == '-20px';
    }, 30000, 'Cancel Checkout did not happen yet', 500);
}
module.exports.SelectNodeAction = ([actionName, publishNode, templateStatus, pageStatus]) => {
    acts.buttonMenu.get('Node Actions', actionName);
    switch (actionName) {
        case 'Publish Node':
            browser.waitForVisible('//span[text()="' + publishNode + '"]//parent::span//preceding-sibling::span//input');
            var node = $('//span[text()="' + publishNode + '"]//parent::span//preceding-sibling::span//input');
            node.click();
            if (templateStatus == 'Live' && pageStatus == 'Live') {
                $('//span[@class="pb-lifecycle active" and text()="Live"]//parent::span[text()="Template"]//parent::div//preceding-sibling::input').click();
            }
            else if (templateStatus == 'Live' && pageStatus == 'Staging') {
                $('(//span[@class="pb-lifecycle active" and text()="Live"]//parent::span[text()="Templates"]//parent::div//preceding-sibling::input)[1]').click();
            }
            else {
                $('(//span[@class="pb-lifecycle active" and text()="Live"]//parent::span[text()="Templates"]//parent::div//preceding-sibling::input)[2]').click();
            }
            $('//button[contains(.,"Publish")]').click();
            break;
    }
}
module.exports.ArrayFromJSONObjforMultiVideoLunch = (result) => {
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
            obj["VideoTitleOverride_" + rowNumber] = moduleData.hasOwnProperty('VideoTitleOverride') ? element.VideoTitleOverride: 'VideoTitleOverride missed on xml';
            obj["VideoDescriptionOverride_" + rowNumber] = moduleData.hasOwnProperty('VideoDescriptionOverride') ? element.VideoDescriptionOverride: 'VideoDescriptionOverride missed on xml';
            obj["videosource_chronic_id_" + rowNumber] = moduleData.hasOwnProperty('VideoSource') ? element.VideoSource.$.chronic_id: 'VideoSource.$.chronic_id missed on xml';
        }, this);
    }
    else {
        obj["VideoTitleOverride_1"] = moduleData.hasOwnProperty('VideoTitleOverride') ? moduleData.Videos.Video.VideoTitleOverride: 'VideoTitleOverride missed on xml';
        obj["VideoDescriptionOverride_1"] = moduleData.hasOwnProperty('VideoDescriptionOverride') ? moduleData.Videos.Video.VideoDescriptionOverride: 'VideoDescriptionOverride missed on xml';
        obj["videosource_chronic_id_1"] = moduleData.hasOwnProperty('VideoSource') ? moduleData.Videos.Video.VideoSource.$.chronic_id: 'VideoSource.$.chronic_id missed on xml';
    }
    return obj;
}
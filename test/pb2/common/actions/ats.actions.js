var ats = require('./../elements/ats.page');

module.exports.Navigate = function (chronID, stage) {
    return ats.gotoURL(chronID, stage);
}
module.exports.ClickOn = function (buttonText) {
    switch (buttonText.toLowerCase()) {
        case 'preview':
        case 'staging':
        case 'live':
            ats.stage(buttonText).click();
            break;
        case 'show asset info':
            ats.assetInfo.click();
            break;
        default:
            ats.button.get(buttonText).click();
            break;
    }
}
module.exports.WaitFor = (fileType) =>
{   
    var atsUrl = browser.getUrl();
    if(atsUrl.includes('preview') || atsUrl.includes('Preview'))
    {
        ats.downloadLink(fileType, 10000);
    }
    else
    {
        ats.downloadLink(fileType, 30000);
    }
}
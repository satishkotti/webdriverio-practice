var ats = require('./../elements/ats.page');

module.exports.Navigate = function (chronID, stage) {
    return ats.gotoURL(chronID, stage);
}
module.exports.ClickOn = function (buttonText) {
    switch (buttonText) {
        case 'Preview':
        case 'Staging':
        case 'Live':
            ats.stage(buttonText).click();
            break;
        default:
            ats.button.get(buttonText).click();
            break;
    }
}
module.exports.WaitFor = (fileType) =>
{   
    var atsUrl = browser.getUrl();
    //if(atsUrl.includes('preview') || atsUrl.includes('Preview'))
    //{
        ats.downloadLink(fileType, 10000);
    //}
    //else
    //{
        //ats.downloadLink(fileType, 30000);
    //}
}
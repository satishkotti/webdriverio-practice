var acts = require('./../elements/actions.page');
var page = require('./../elements/assetprops.page');

module.exports.SelectMoreActions = (action) => 
{
    acts.button.get('More Actions').click();
    browser.pause(10000);
    
}

module.exports.ClickContinueButton = () =>
{
    acts.button.get('Continue').click();
}

module.exports.ClickModalContinueButton = () =>

{
    acts.splbutton.get('Continue').click();
}

module.exports.ClickAddModuleButton = () =>
{
    acts.splbutton.get('Add Module').click();
}

module.exports.ClickShowEmptyContentPanes = () =>
{

    acts.splbutton.get(' Show').click();
}

module.exports.SavePublish = (action, comment) =>
{
    switch(action)
    {
        case 'Publish to Staging': 
            acts.buttonMenu.get('Save/Publish', 'Publish to Staging');
            page.textarea.get('Enter a comment below to publish to staging').setValue(comment);
            acts.button.get('Okay').click();
            acts.button.get('More Actions').waitForVisible();
            break;
        case 'Publish to Live':
            acts.buttonMenu.get('Save/Publish', 'Publish to Live');
            page.textarea.get('Enter a comment below to publish to live').setValue(comment);
            acts.button.get('Okay').click();
            acts.button.get('More Actions').waitForVisible();
            break;
        default:
            acts.buttonMenu.get('Save/Publish', 'Checkin');
            page.textarea.get('Enter a comment below to checkin asset').setValue(comment);
            acts.button.get('Okay').click();
            acts.button.get('More Actions').waitForVisible();
            break;
    }
}

module.exports.ClickEditButton = () =>
{
    acts.button.get('Edit').click();
    acts.button.get('Save/Publish').waitForVisible();
}

module.exports.ClickCheckoutAndEditButton = () =>
{
    acts.button.get('Checkout & Edit').click();
    acts.button.get('Save/Publish').waitForVisible();
}
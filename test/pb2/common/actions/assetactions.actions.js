var acts = require('./../elements/actions.page');

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

module.exports.CheckinTheAsset = () =>
{
    acts.buttonMenu.get('Save/Publish', 'Checkin');

}
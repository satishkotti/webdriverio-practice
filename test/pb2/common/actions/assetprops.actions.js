var props = require('./../elements/assetprops.page');
var page = require('./../../../common/page');
var actions = require('./assetactions.actions');

module.exports.PopulatePageProps = (assetProps) =>
{
    browser.pause(25000);

    switch (pageType)
    {
        case 'inherited': props.checkbox.get('Inherit from Template').click(); props.dropdown('Inherit From Template', inheritFromORLayout); break;
        case 'standalone': props.checkbox.get('New Standalone').click(); browser.pause(2000); props.dropdown('Layout', inheritFromORLayout); 
        if( layoutCSS != null ) { browser.pause(2000); props.dropdown('CSS Option', layoutCSS); } break;
    }

    actions.ClickContinueButton();
}

module.exports.PopulateTextIn = (labelName, text) =>
{
    switch (labelName)
    {
        case 'keywords': props.text
    }
}
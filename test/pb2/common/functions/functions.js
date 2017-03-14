var app = require('./../actions/login.actions');
var iwc = require('./../actions/iwc.actions')
var act = require('./../actions/assetactions.actions')
var props = require('./../actions/assetprops.actions')

module.exports.LaunchAppAndLogin = () =>
{
    app.Login();
}

module.exports.EnterIWC = (menu, option) => 
{
    iwc.EnterIWC(menu, option);

}

module.exports.TraverseSS = (level) =>
{
    iwc.TraverseSS(level);
}

module.exports.Create = (assetType, assetDetails) =>
{
    switch (assetType)
    {
        case 'Page': iwc.AddToNode(assetType); return props.PopulatePageProps(assetDetails); break;
        case 'Template': iwc.AddToNode(assetType); return props.PopulateTemplateProps(assetDetails); break;
        case 'Shared Module': return props.PopulateSMProps(assetDetails); break;
    }
}

module.exports.AddModule = (contentPane, moduleDetails) =>
{
    props.AddModule(contentPane, moduleDetails);
}
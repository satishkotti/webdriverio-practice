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

<<<<<<< HEAD
module.exports.Create = (assetType, assetDetails) =>
{
    iwc.AddToNode(assetType);
    switch (assetType)
    {
        case 'Page': props.PopulatePageProps(assetDetails); break;
        case 'Template': props.PopulateTemplateProps(assetDetails); break;
        case 'Shared Module': break;
    }
    
=======
module.exports.AddToNode = (assetType, assetDetails) =>
{
    var assetProps = this.assetDetails;
    iwc.AddToNode('Page');
    props.SelectTypeOfPage('standalone', 'Responsive', '3 Column Responsive');
>>>>>>> 02aa792cb553da063878b037d5c1787c0272f85f

}
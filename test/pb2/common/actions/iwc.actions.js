var Menus = require('./../elements/menu.page');
var IWC = require('./../elements/iwc.page');

module.exports.EnterIWC = function(menu, option)
{
    Menus.createEdit.get(menu).moveToObject().click('//li[text()="' +  menu + '"]//li[text()="' + option + '"]').waitForVisible('//span[text()="Level 0"]');
}

module.exports.TraverseSS = function(level)
{
    var nodes = level.split('/');
    for ( var i = 0; i < nodes.length; i++)
    {
        switch (i)
        {
            case nodes.length -1 : IWC.node.get(nodes[nodes.length-1]).click(); break;
            default: IWC.nodeExpand.get(nodes[i]).click(); break;
        }
    }

    return IWC.browser;
}

module.exports.AddToNode = function(assetType)
{
    IWC.addToNode.get(assetType);
    return IWC.browser;
}

module.exports.CollapseSS = () =>
{
    if (IWC.isTreeExpanded) {
        var elements = IWC.collapseIcons;

        for (var i = 0; i < elements.length; i++) {
            elements[i].ELEMENT.click();
        }
    }
}

module.exports.SelectAsset = (assetName) =>
{
    IWC.selectGridAsset.get(assetName);
}
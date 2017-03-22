var app = require('./../actions/login.actions');
var iwc = require('./../actions/iwc.actions');
var act = require('./../actions/assetactions.actions');
var props = require('./../actions/assetprops.actions');
var search = require('./../actions/search.actions');
var menu = require('./../actions/menus.actions');
var queue = require('./../actions/queue.actions');

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

module.exports.SearchFor = (assetType, keyword, from, level) => // assetType can have 'Page', 'Template', 'SM', 'DPM'. keyword can be Chronicle ID or keyword like test
{
    switch (from)
    {
        case 'Global Search':
            if (assetType == null && (keyword.length == 16 && keyword.startsWith('091')))
            {
                search.GlobalSearchUsingChronID(keyword);
            }
            else
            {
                search.GlobalSearchUsingKeyword(assetType, keyword);
            }
            break;
        case 'Interior Workcenter':
            if (level != null)
            {
                search.SearchFromIWC(level, keyword);
            }
            break;
    }
}

module.exports.EditTheAsset = () =>
{
    act.ClickEditButton();
}

module.exports.CheckoutAndEditTheAsset = () =>
{
    act.ClickCheckoutAndEditButton();
}

module.exports.SaveOrPublishTheAsset = (action, comment) =>
{
    act.SavePublish(action, comment);
}

module.exports.SwitchAssetTabs = (tabName) =>
{
    props.SwitchAssetTabs(tabName);
}

module.exports.GetAssetVersionAndStage = (assetName, from) =>
{
    switch(from)
    {
        case 'Asset Screen' : return props.GetAssetVersionAndStage(); break;
        default : return iwc.GetVersionAndStageOfAsset(assetName); break;
    }
}

module.exports.EnterActivityQueueStatusPage = () =>
{
    menu.EnterActivityQueueStatusPage();
}

module.exports.FilterResultsInQueue = (filter) =>
{
    queue.Show(filter);
}

module.exports.GetAssetDetailsFromQueue = (chronID) =>
{
    return queue.GetAssetDetailsFromQueue(chronID);
}

module.exports.RefreshTheQueue = () =>
{
    queue.RefreshTheQueue();
}

module.exports.EnableDisableAutoRefresh = (action) =>
{
    queue.ClickAutoRefresh(action);
}

module.exports.GetCurrentSite = () =>
{
    return app.GetCurrentSite();
}

module.exports.GetChronIDOfTheSelectedAsset = (screen) =>
{
    return iwc.GetChronIDOfTheSelectedAsset(screen);
}

module.exports.SaveOrPublishTheAssetFromMoreActions = (action, comment) =>
{
    act.SavePublishFromMoreActions(action, comment);
}

module.exports.SelectAsset = (assetName) =>
{
    iwc.SelectAsset(assetName);
}

module.exports.NavigateToHomepage = () =>
{
    menu.GoHome();
}

module.exports.SortTableColumn = (table, column, sortType) =>
{
    menu.SortColumn(table, column, sortType);
}

module.exports.SelectMoreActionsMenuItem = (menuItem) =>
{
    act.SelectMoreActionsMenuItem(menuItem);
}

module.exports.ClickShowExpired = () =>
{
    act.ClickShowExpired();
}

module.exports.Propagate = (specs) =>
{
    props.Propagate(specs);
}
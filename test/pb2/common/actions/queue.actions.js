var queue = require('./../elements/queue.page');
var action = require('./../elements/actions.page');
var props = require('./../elements/assetprops.page');

module.exports.Show = (filter) =>
{
    switch (filter)
    {
        case 'All': queue.statusFilter.get('All').click(); break;
        case 'Completed': queue.statusFilter.get('Completed').click(); break;
        case 'Failed': queue.statusFilter.get('Failed').click(); break;
        case 'In Progress': queue.statusFilter.get('In Progress').click(); break;
    }
}

module.exports.GetAssetDetailsFromQueue = (chronID) =>
{
    return queue.getAssetDetailsFromQueue.get(chronID);
}

module.exports.RefreshTheQueue = () =>
{
    action.button.get('Refresh').click();
}

module.exports.ClickAutoRefresh = (action) =>
{
    var isChecked = browser.execute( () => {
        return $('label:contains("Auto Refresh") input').get(0).checked;
    }).value;

    switch(action)
    {
        default:
        if(!isChecked)
        {
            props.checkbox.get('Auto Refresh').click(); break;
        }
        case 'Disable':
        if(isChecked)
        {
            props.checkbox.get('Auto Refresh').click(); break;
        }
    }
}
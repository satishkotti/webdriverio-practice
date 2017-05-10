var search = require('./../elements/search.page');
var iwc = require('./iwc.actions');

module.exports.GlobalSearchUsingKeyword = (category, keyword) =>
{
    search.globalSearch.setValue(keyword);
    search.magnifyingGlass.click();
    search.switchToCategory(category);

}

module.exports.GlobalSearchUsingChronID = (chronID) =>
{
    search.globalSearch.setValue(chronID);
    search.magnifyingGlass.click();
    search.waitForAssetScreen();
}

module.exports.SearchFromIWC = (level, assetName) =>
{
    iwc.EnterIWC('Edit', 'Templates & Pages');
    iwc.CollapseSS();
    iwc.TraverseSS(level);
    iwc.SelectAsset(assetName);

}
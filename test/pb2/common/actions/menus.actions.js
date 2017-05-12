var homepage = require('./../elements/menu.page');


module.exports.SelectCreateMenuItem = function(option) {
    homepage.createEdit.get('Create').moveToObject().click('//li[text()="Create"]//li[text()="' + option + '"]');
}

module.exports.SelectEditMenuItem = function(option) {
    homepage.createEdit.get('Edit').moveToObject().click('//li[text()="Edit"]//li[text()="' + option + '"]');
}

module.exports.EnterActivityQueueStatusPage = () => {
    homepage.queue.click();
}

module.exports.GoHome = () => {
    homepage.home.click();
    homepage.checkedOutDB.waitForVisible();
    homepage.favoritesDB.waitForVisible();
}

module.exports.SortColumn = (table, column, sortType) => {
    homepage.tableColumnSort.get(table, column, sortType);

}

module.exports.GoToRedirectTool = () => {
    homepage.hamburger.click();
    browser.click("ul.pb-menu.tools > menu-item:nth-of-type(3) > li");
}
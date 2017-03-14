var Menus = require('./../elements/menu.page');


module.exports.SelectCreateMenuItem = function(option)
{
    Menus.createEdit.get('Create').moveToObject().click('//li[text()="Create"]//li[text()="' + option + '"]');
}

module.exports.SelectEditMenuItem = function(option)
{
    Menus.createEdit.get('Edit').moveToObject().click('//li[text()="Edit"]//li[text()="' + option + '"]');
}
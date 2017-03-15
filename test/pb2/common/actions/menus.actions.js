var homepage = require('./../elements/menu.page');


module.exports.SelectCreateMenuItem = function(option)
{
    homepage.createEdit.get('Create').moveToObject().click('//li[text()="Create"]//li[text()="' + option + '"]');
}

module.exports.SelectEditMenuItem = function(option)
{
    homepage.createEdit.get('Edit').moveToObject().click('//li[text()="Edit"]//li[text()="' + option + '"]');
}

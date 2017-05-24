var rel = require('./../ui/relations');
var locator;

module.exports = {
    getRelation: function (relation) {
        var allRelations = rel.getRelation(relation);
        locator = allRelations.locator;
        var numberOfRelations = allRelations.elements.value.length;
        var relations = [];
        for (var i = 0; i < numberOfRelations; i++) {
            relations.push({
                relation: relation,
                name: browser.getText('(' + locator + '//td[2]//span)[' + (i + 1) + ']'),
                description: browser.getText('(' + locator + '//td[3]//span)[' + (i + 1) + ']'),
                modified: browser.getText('(' + locator + '//td[4]//span)[' + (i + 1) + ']'),
                modifiedBy: browser.getText('(' + locator + '//td[5]//span)[' + (i + 1) + ']'),
            });
        }
        return relations;
    }
}
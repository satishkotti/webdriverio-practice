var workspaceMenuUI = require('./../ui/workspace.menu.js');
var newContentModal = require('./newContent.actions');

module.exports = {
    createContent: function(creationProflieName, articleTemplateName, objectName, descriptionName){
       workspaceMenuUI.selectNewContent();
       newContentModal.createNewArticle(creationProflieName, articleTemplateName, objectName, descriptionName);
    }
}
var workspaceMenuUI = require('./../ui/workspace.menu.js');
var newContentModal = require('./newContent.actions');

module.exports = {
    createContent: function(creationProflieName, articleTemplateName, objectName, descriptionName){
       workspaceMenuUI.selectNewContent();
       newContentModal.createNewArticle(creationProflieName, articleTemplateName, objectName, descriptionName);

//Add: assert new article is created and added to documentList Tab.
    },
     createPointer: function(creationProflieName, pointerTemplateName,objectName, objectTitle){
       workspaceMenuUI.selectNewContent();
       newContentModal.createPointerObject(creationProflieName, pointerTemplateName,objectName, objectTitle);
     },
     createMedia: function(creationProflieName, mediaTemplateName,objectName, objectTitle){
       workspaceMenuUI.selectNewContent();
       newContentModal.createMediaObject(creationProflieName, mediaTemplateName,objectName, objectTitle);
     }
}
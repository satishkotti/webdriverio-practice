var workspaceMenuUI = require('./../ui/workspace.menu.js');
var newContentModal = require('./newContent.actions');

module.exports = {
    createContent: function(creationProflieName, articleTemplateName, objectName, descriptionName){
       workspaceMenuUI.selectNewContent();
       newContentModal.createNewArticle(creationProflieName, articleTemplateName, objectName, descriptionName);

//Add: assert new article is created and added to documentList Tab.
    },
    createContentPubSection : function(creationProflieName, articleTemplateName, objectName, descriptionName){
        workspaceMenuUI.selectNewContent();
       newContentModal.createNewPubSectionArticle(creationProflieName, articleTemplateName, objectName, descriptionName);
    },
    createContent1: function(cabinet, props){
       workspaceMenuUI.selectNewContent();
       return newContentModal.createNewArticle1(cabinet, props);
    },

     createPointer: function(creationProflieName, pointerTemplateName,objectName, objectTitle){
       workspaceMenuUI.selectNewContent();
       newContentModal.createPointerObject(creationProflieName, pointerTemplateName,objectName, objectTitle);
     },
     createMedia: function(creationProflieName, mediaTemplateName,objectName, objectTitle){
       workspaceMenuUI.selectNewContent();
       newContentModal.createMediaObject(creationProflieName, mediaTemplateName,objectName, objectTitle);
     },

    createPublicationSubsection: function(creationProflieName, articleTemplateName, objectName){
        workspaceMenuUI.selectNewContent();
        newContentModal.createPublicationSubsection(creationProflieName, articleTemplateName, objectName);
    },
    createOutputProfContent: function(creationProflieName, articleTemplateName, objectName, descriptionName){
       workspaceMenuUI.selectNewContent();
       newContentModal.createNewOutputProfArticle(creationProflieName, articleTemplateName, objectName, descriptionName);
    },
     createProfPublication: function(creationProflieName, publicationType, objectTitle,publicationName){
       workspaceMenuUI.selectNewContent();
       newContentModal.createProfPublication(creationProflieName, publicationType, objectTitle,publicationName);

     },
}
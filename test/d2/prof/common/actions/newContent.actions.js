var newContentUI = require('./../ui/newContent');

module.exports = {
   
    createNewArticle: function(creationProflieName, articleTemplateName, objectName, descriptionName){
       
       newContentUI.createNewArticle(creationProflieName, articleTemplateName, objectName, descriptionName);
    },
    createNewOutputProfArticle: function(creationProflieName, articleTemplateName, objectName, descriptionName){
       newContentUI.createNewOutputProfArticle(creationProflieName, articleTemplateName, objectName, descriptionName);
    },
     createMediaObject: function(creationProflieName, mediaTemplateName,objectName, objectTitle){
       
       newContentUI.createMediaObject(creationProflieName, mediaTemplateName,objectName, objectTitle);
    },
    createPublicationSubsection: function(creationProflieName, articleTemplateName, objectName){
       
       newContentUI.createPublicationSubsection(creationProflieName, articleTemplateName, objectName);
    }
}
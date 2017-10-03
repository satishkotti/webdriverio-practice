var newContentUI = require('./../ui/newContent');

module.exports = {
   
    createNewArticle: function(creationProflieName, articleTemplateName, objectName, descriptionName){
       
       newContentUI.createNewArticle(creationProflieName, articleTemplateName, objectName, descriptionName);
    },
     createNewCollection: function(creationProflieName, collectionTemplateName, objectName, descriptionName){
       
       newContentUI.createNewCollection(creationProflieName, collectionTemplateName, objectName, descriptionName);
    }
}
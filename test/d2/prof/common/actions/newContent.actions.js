var newContentUI = require('./../ui/newContent');

module.exports = {
   
    createNewArticle: function(creationProflieName, articleTemplateName, objectName, descriptionName){
       
       newContentUI.createNewArticle(creationProflieName, articleTemplateName, objectName, descriptionName);
    },
    createNewOutputProfArticle: function(creationProflieName, articleTemplateName, objectName, descriptionName){
       newContentUI.createNewOutputProfArticle(creationProflieName, articleTemplateName, objectName, descriptionName);
    }

}
var newContentUI = require('./../ui/newContent');

module.exports = {
  createNewArticle: function (creationProflieName, articleTemplateName, objectName, descriptionName) {

    newContentUI.createNewArticle(creationProflieName, articleTemplateName, objectName, descriptionName);
  },
  createNewPubSectionArticle: function(creationProflieName, articleTemplateName, objectName, descriptionName){
    newContentUI.createNewPubSectionArticle(creationProflieName, articleTemplateName, objectName, descriptionName);
  },
  createNewArticle1: function (cabinet, props)
  { 
    return newContentUI.createNewArticle1(cabinet, props)
  },
  createPointerObject: function (creationProflieName, pointerTemplateName, objectName, objectTitle) {

    newContentUI.createPointerObject(creationProflieName, pointerTemplateName, objectName, objectTitle);
  },

  createNewOutputProfArticle: function (creationProflieName, articleTemplateName, objectName, descriptionName) {
    newContentUI.createNewOutputProfArticle(creationProflieName, articleTemplateName, objectName, descriptionName);
  },
  createMediaObject: function (creationProflieName, mediaTemplateName, objectName, objectTitle) {

    newContentUI.createMediaObject(creationProflieName, mediaTemplateName, objectName, objectTitle);
  }
}
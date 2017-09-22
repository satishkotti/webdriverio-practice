var DuplicatenameUI = require('./../ui/Duplicatename');
var workspaceMenuUI = require('./../ui/workspace.menu.js');


var DuplicateObj = {
  DuplicateNamevalidation: function (Duplicatename){
        DuplicatenameUI.DuplicateNamevalidation(Duplicatename);
      },

  
DuplicateContentcreate: function(creationProflieName, articleTemplateName, objectName, descriptionName){
       workspaceMenuUI.selectNewContent();
       DuplicatenameUI.createNewArticle(creationProflieName, articleTemplateName, objectName, descriptionName);


    },

    

}

module.exports = DuplicateObj;
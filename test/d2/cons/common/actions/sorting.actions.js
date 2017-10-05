var versionTabUI = require('./../ui/sorting');

module.exports = {
    
     documentWidgetSelection: function () {
         versionTabUI.documentWidgetSelection();
     },
     folderSelectionFromFavortiesWidget: function(folder){
         versionTabUI.favortiesWidgetSelection();
         versionTabUI.favortiesWidgetFolderSelection(folder);
     },
     descendingSort: function(Type){
         return versionTabUI.descendingSort(Type);
     },
     ascendingSort: function(Type){
         return versionTabUI.ascendingSort(Type);
     }
    
}
var repositoryBrowserUI = require('./../ui/repositoryBrowserTab');

module.exports = {
    selectRepositoryBrowserTab: function(){
        repositoryBrowserUI.selectRepositoryBrowserTab();
    },
    openFolder: function(folderPath){

        repositoryBrowserUI.RepositoryRefresh();
        var folerPathArr = folderPath.split('/');
        var folderLevel = 1;
         do {
                if(folerPathArr && folerPathArr.length > 0)
                {
                    repositoryBrowserUI.openFolder(folerPathArr[0], folderLevel);
                    folerPathArr.shift();
                    folderLevel++;
                }
            } while(folerPathArr && folerPathArr.length > 0)
    }
}
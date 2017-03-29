var repositoryBrowserPage = require('./../ui/repositoryBrowserTab');

module.exports = {
    selectRepositoryBrowserTab: function(){
        repositoryBrowserPage.selectRepositoryBrowserTab();
    },
    openFolder: function(folderPath){

        var folerPathArr = folderPath.split('/');
         do {
                if(folerPathArr && folerPathArr.length > 0)
                {
                    repositoryBrowserPage.openFolder(folerPathArr[0]); 
                    folerPathArr.shift();
                }
            } while(folerPathArr && folerPathArr.length > 0)
    }
}
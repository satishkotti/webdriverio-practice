var repositoryBrowserPage = require('./../ui/repositoryBrowserTab');

module.exports = {
    selectRepositoryBrowserTab: function(){
        repositoryBrowserPage.selectRepositoryBrowserTab();
    },
    openFolder: function(folderPath){

        var folerPathArr = folderPath.split('/');
        var folderLevel = 2;
         do {
                if(folerPathArr && folerPathArr.length > 0)
                {
                    //console.log("folderPathArr[0]:"+folerPathArr[0]+"||folderLevel:"+ folderLevel);
                    repositoryBrowserPage.openFolder(folerPathArr[0], folderLevel); 
                    folerPathArr.shift();
                    folderLevel = folderLevel + 1;
                }
            } while(folerPathArr && folerPathArr.length > 0)
    }
}
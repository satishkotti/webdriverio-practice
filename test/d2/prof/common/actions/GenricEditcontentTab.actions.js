var contentTabUI = require('./../ui/GenricEditcontentTab');

var contentTabObj = {
    
   SetallContentValues: function(data){
        contentTabUI.TitleandTextSetValue("Above Title","AboveTitletext");
        contentTabUI.ImageClick("Title Background Image");
        //contentTabObj.selectImageSearch(imagetype);
        // contentTabUI.ImageClick("Publication Logo Override");
        // contentTabObj.selectImageSearch(imagetype);
        contentTabUI.InputTextSetValue("Contributor Name","Samplecontributor");
        
    },


   selectImageSearch: function (searchimagetype) {
        ModuleUI.setImageType("Image");
        ModuleUI.setImageSearchValue(moduleSearch);
        ModuleUI.clickImageSearchResult();
        ModuleUI.selectImage();
    }
    
}

module.exports = contentTabObj;
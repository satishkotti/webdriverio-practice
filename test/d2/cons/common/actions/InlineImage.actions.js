var ImageUI = require('./../ui/InlineImageeditTab');
var contentTabUI = require('./../ui/contentTab');

var ImageObj = {

    SelectImageSearch: function (Image, Imagename) {
        ImageUI.SwitchToImageFrame();
        ImageUI.setSearchtype(Image);
        ImageUI.setSearchValue(Imagename);
        ImageUI.clickImageSearchResult();
        ImageUI.selectImage();
    },
   
    Cancel: function () {
        ImageUI.cancelImage();
    },
     ClickandUpdateProperties: function (Alttext,height,width,Hspace,Vspace) 
    {
        contentTabUI.switchToExternalWidgetFrame();
        ImageUI.DoubleClickImage();
        ImageUI.SwitchToImageFrame();
        ImageUI.setAlternativeText(Alttext);
        ImageUI.setHeight(height);
        ImageUI.setWidth(width);
        ImageUI.setHSpace(Hspace);
        ImageUI.setVSpace(Vspace);
        ImageUI.selectImage();
    },

    getimagurl: function () 
    {
        contentTabUI.switchToExternalWidgetFrame();
        return  ImageUI.getimagurl();
        
       
    },
}

module.exports = ImageObj;
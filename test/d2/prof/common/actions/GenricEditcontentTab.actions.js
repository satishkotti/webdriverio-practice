var contentTabUI = require('./../ui/GenricEditcontentTab');

var contentTabObj = {
    
   SetallContentValues: function(data){
        contentTabUI.TitleandTextSetValue("Above Title","AboveTitletext");
        contentTabUI.ImageClick("Title Background Image");
        contentTabObj.selectImageSearch("Heart");
        contentTabUI.ImageClick("Publication Logo Override");
        contentTabObj.selectImageSearch("Heart");
        contentTabUI.TitleandTextSetValue("Copyright Holder","CopyrightHoldertext");
        contentTabUI.TitleandTextSetValue("Copyright Statement","CopyrightStatementtext");
        contentTabUI.TitleandTextSetValue("Disclaimer","Disclaimertext");
        contentTabUI.ImageClick("Grant Attribution");
        contentTabObj.selectImageSearch("Heart");
        contentTabUI.TitleandTextSetValue("Content Above Contributors","ContentAboveContributorstext");
        contentTabUI.TitleandTextSetValue("Contributor Byline","Contributor Byline text");
        contentTabUI.TitleandTextSetValue("Bulk Contributor Info","Bulk Contributor Info text");
        contentTabUI.TitleandTextSetValue("Content Below Contributors","Content Below Contributors text");
        contentTabUI.InputTextSetValue("Contributor Name","Samplecontributor");
        contentTabUI.TitleandTextSetValue("Contributor Title","Contributor Title text");
        contentTabUI.TitleandTextSetValue("Contributor Bio","Contributor Bio text");
        contentTabUI.TitleandTextSetValue("Contributor Disclosure","Contributor Disclosure text");
        contentTabUI.TitleandTextSetValue("TOC Element Label","TOC Element Label text");
        contentTabUI.TitleandTextSetValue("TOC Element Footnotes","TOC Element Footnotes text");
        contentTabUI.TitleandTextSetValue("Section Header","Section Header text");
        contentTabUI.TitleandTextSetValue("SubSection Content","SubSection Content text");
        contentTabUI.InputTextSetValue("Question Form","Question Form Text");
        contentTabUI.TitleandTextSetValue("Label","Label text");
        contentTabUI.TitleandTextSetValue("Caption","Caption text");
        contentTabUI.InputTextSetValue("Alt Text","Alt Text");
        contentTabUI.ImageClick("Full Size Image");
        contentTabObj.selectImageSearch("Heart");
        contentTabUI.TitleandTextSetValue("Table","Table text");
        contentTabUI.TitleandTextSetValue("Reference","Reference text");
        contentTabUI.TitleandTextSetValue("Back Matter Front Page","Back Matter Front Page  text");
        contentTabUI.TitleandTextSetValue("Glossary","Glossary text");
        contentTabUI.TitleandTextSetValue("Acknowledgements","Acknowledgements text");
        contentTabUI.TitleandTextSetValue("Back Matter Disclaimer","Back Matter Disclaimer text");
        contentTabUI.TitleandTextSetValue("Back Matter Disclaimer","Back Matter Disclaimer text");
        contentTabUI.TitleandTextSetValue("Funding Info","Funding Info text");
        contentTabUI.TitleandTextSetValue("Reprint Address","Reprint Address text");

        contentTabUI.TitleandTextSetValue("Abbreviation Notes","Abbreviation Notes text");
        contentTabUI.TitleandTextSetValue("Back Matter Last Page","Back Matter Last Page text");


        
        

    },


   selectImageSearch: function (searchimagetype) {
        contentTabUI.setImageType("Image");
        contentTabUI.setImageSearchValue(searchimagetype);
        contentTabUI.clickImageSearchResult();
        contentTabUI.selectImage();
    }
    
}

module.exports = contentTabObj;
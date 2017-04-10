var propertiesTabUI = require('./../ui/AllFiledseditpropertiesTab');
var maxWaitTimeInMs = 30000;
module.exports = {
    
    getChronicleIdAndName: function(){
        propertiesTabUI.propertiesTabSelect();
        return {
            chronicleId: propertiesTabUI.chronicleIdGet(),
            objectName: propertiesTabUI.objectNameGet(),
            title:propertiesTabUI.TitileGet()
        };
    },
    getObjectNameBasicTab: function(){
        propertiesTabUI.propertiesBasicTabSelect();
        return {
            chronicleId: propertiesTabUI.chronicleIdGet(),
            objectName: propertiesTabUI.objectNameGet(),
            title:propertiesTabUI.TitileGet()
        };
    },
    setAllRequiredProperties: function(
    Title,WindowTitle,superTitle,subTitle,contentType,leadSpecialty,HighAssistanceValue,LowAssistanceValue,FeaturedAssistanceValue,
    LeadConceptValue,wbmdcncptAssistanceValue,wbmdKeywords,wbmdcncptfcsAssistanceVal,WbmduserDescr,
    WbmdMetaDescr,ImgthumbVal,RellinkAssistanceVal,ArticleLinkVal,RelatedLinkType,RelatedLinkLable,
    SupressSearchchkVal,SupressLinkchkVal,SupressSharechkVal,SupressCommentchkVal,SupressFeaturebealtchkval,
    contentDeveloper,AdExclusionvalue,Wbmdlng,ProdType){
        
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        propertiesTabUI.TitleSet(Title);
        propertiesTabUI.WindowTitleOverrideSet(WindowTitle);
        propertiesTabUI.SuperTitleSet(superTitle);
        propertiesTabUI.SubTitleSet(subTitle);
        propertiesTabUI.ContentTypeSet(contentType);
        propertiesTabUI.LeadSpecialtySet(leadspecialty);
        propertiesTabUI.AssistanceType("#wbmd_spclty_high");
        propertiesTabUI.AssistanceValue("#wbmd_spclty_high",HighAssistanceValue);
        propertiesTabUI.AssistanceType("#wbmd_spclty_low");
        propertiesTabUI.AssistanceValue("#wbmd_spclty_low",LowAssistanceValue);
        propertiesTabUI.AssistanceType("#wbmd_spclty_featured");
        propertiesTabUI.AssistanceValue("#wbmd_spclty_featured",FeaturedAssistanceValue);
        propertiesTabUI.LeadConceptSet(LeadConceptValue);
        propertiesTabUI.AssistanceType("#wbmd_concept");
        propertiesTabUI.AssistanceValue("#wbmd_concept",wbmdcncptAssistanceValue);
        propertiesTabUI.KeywordsSet(wbmdKeywords);
        propertiesTabUI.AssistanceType("#wbmd_content_fcs");
        propertiesTabUI.AssistanceValue("#wbmd_concept",wbmdcncptfcsAssistanceVal);
        propertiesTabUI.WbmddescuserSet(WbmduserDescr);
        propertiesTabUI.WbmddescmetaSet(WbmdMetaDescr);
        propertiesTabUI.ImgthmbSet(ImgthumbVal);
        propertiesTabUI.AssistanceType("#wbmd_rel_links");
        propertiesTabUI.AssistanceValue("#wbmd_rel_links",RellinkAssistanceVal);
        propertiesTabUI.ArticleLink();
        propertiesTabUI.AddArticleLink(ArticleLinkVal);
        propertiesTabUI.WbmdrellinksinputSet(RelatedLinkType);
        propertiesTabUI.WbmdrellinklblinputSet(RelatedLinkLable);
        propertiesTabUI.SupresschkboxSet("#wbmd_suppress_search",SupressSearchchkVal);
        propertiesTabUI.SupresschkboxSet("#wbmd_suppress_link",SupressLinkchkVal);
        propertiesTabUI.SupresschkboxSet("#wbmd_suppress_share",SupressSharechkVal);
        propertiesTabUI.SupresschkboxSet("#wbmd_suppress_comment",SupressCommentchkVal);
        propertiesTabUI.SupresschkboxSet("#wbmd_suppress_feature_belt",SupressFeaturebealtchkval);
        propertiesTabUI.contentDeveloperSet(contentDeveloper);
        propertiesTabUI.AdExclusion();
        propertiesTabUI.AddAdExclusion(AdExclusionvalue);
        propertiesTabUI.WbmdlanguageSet(Wbmdlng);
        propertiesTabUI.WbmdProdtypeSet(ProdType);
        propertiesTabUI.save();
    },
     verifyNewsProperties:function(labelPropertiesArray){
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        var result=propertiesTabUI.verifyProperties(labelPropertiesArray);
        return result;
     },
     getPropertiesValues:function(){
        return propertiesTabUI.articleTOCDisplayFormatGet() ;
     },
     verifyBasciInfoTabProperties:function(labelPropertiesArray){
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        var basicresult=propertiesTabUI.verifyBasicInfoProperties(labelPropertiesArray);
        return basicresult;
     },
     verifyArticleTabProperties:function(labelPropertiesArray){
         propertiesTabUI.articleTabSelect();
         var articleresult=propertiesTabUI.verifyArticleTabProperties(labelPropertiesArray);
         return articleresult;
     },
     verifyMandatoryFieldsforProperties:function(){
         propertiesTabUI.propertiesTabSelect();
         propertiesTabUI.edit();
         propertiesTabUI.save();
         var AlertMessage = propertiesTabUI.verifyMandatoryFieldsforProperties();
         propertiesTabUI.cancelEdit();
         return AlertMessage;
     },
     setRequiredPropertiesforPublish: function(systempubdate){
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        propertiesTabUI.publishingTabSelect();
        browser.waitForVisible("#wbmd_eff_date-input",maxWaitTimeInMs);
        propertiesTabUI.systemPublishingDateSet(systempubdate);
        //propertiesTabUI.expirationDateSet(expdate);
        propertiesTabUI.save();
    },
}
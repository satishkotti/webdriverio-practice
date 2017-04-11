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
        propertiesTabUI.LeadSpecialtySet("Cardiology");
        propertiesTabUI.AssistanceType("wbmd_spclty_high");
        propertiesTabUI.AssistanceValue(HighAssistanceValue);
        propertiesTabUI.AssistanceType("wbmd_spclty_low");
        propertiesTabUI.AssistanceValue(LowAssistanceValue);
        propertiesTabUI.AssistanceType("wbmd_spclty_featured");
        propertiesTabUI.AssistanceValue(FeaturedAssistanceValue);
        propertiesTabUI.LeadConceptSet(LeadConceptValue);
        propertiesTabUI.AssistanceType("wbmd_concept");
        propertiesTabUI.AssistanceValue(wbmdcncptAssistanceValue);
        propertiesTabUI.KeywordsSet(wbmdKeywords);
        propertiesTabUI.AssistanceType("wbmd_content_fcs");
        propertiesTabUI.AssistanceValue(wbmdcncptfcsAssistanceVal);
        propertiesTabUI.WbmddescuserSet(WbmduserDescr);
        propertiesTabUI.WbmddescmetaSet(WbmdMetaDescr);
        propertiesTabUI.ImgthmbSet(ImgthumbVal);
        propertiesTabUI.AssistanceType("wbmd_rel_links");
        propertiesTabUI.AssistanceValue(RellinkAssistanceVal);
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
        
        propertiesTabUI.articleTabSelect();
        propertiesTabUI.PrimaryOutputSet(Poutputval);
        propertiesTabUI.AssistanceType("wbmd_icons");
        propertiesTabUI.AssistanceValue(wbmdiconsVal);
        propertiesTabUI.articleTOCDisplayFormatSet(AtoDispformat);
        propertiesTabUI.QuestionnaireSet(Questionnaireval);
        propertiesTabUI.ActivitySet(Activityval);
        propertiesTabUI.ProdnameSet(Prdnameval);
        propertiesTabUI.SupresschkboxSet("#wbmd_cme_lnk",SupressFeaturebealtchkval);
        propertiesTabUI.AssistanceType("wbmd_bkt_gen_coll_id");
        propertiesTabUI.AssistanceValue(BucketCollectionsValue);
        propertiesTabUI.PrimCollSet(Primcollval);
        propertiesTabUI.ProjctidSet(Projctidval);
        propertiesTabUI.AssistanceType("wbmd_supprtr");
        propertiesTabUI.AssistanceValue(wbmdSupprtrVal);
        propertiesTabUI.AdTagOverridSet(AdTagoverrideval);
        propertiesTabUI.SupresschkboxSet("#wbmd_supp_ads",SupressAdval);
        propertiesTabUI.SupresschkboxSet("#wbmd_supp_rec_ads",SupressrecAdval);
        propertiesTabUI.SupresschkboxSet("#wbmd_disp_cite",Supresdispciteval);
        propertiesTabUI.OHCPDiscssSet(OHCPval);
        propertiesTabUI.MDDiscussionBoardSet(MDDiscssnBoardval);
        propertiesTabUI.NurseDiscussionBoardSet(NurseDiscussionBoardVal);
        propertiesTabUI.RevwDTSet();
        propertiesTabUI.PubDTGet();
        propertiesTabUI.AssistanceType("wbmd_tgt_cntry");
        propertiesTabUI.AssistanceValue(wbmdtgtCntryVal);
        propertiesTabUI.SupresschkboxSet("#wbmd_supp_print",SupressuppPrintval);
        propertiesTabUI.SupresschkboxSet("#wbmd_supp_mobile",SupressuppMblval);
        propertiesTabUI.ExternalIDSet(ExtrnlIdVal);
        propertiesTabUI.SupresschkboxSet("#wbmd_supp_prog_lnk",SupressuppProgval);
        
        
    
        
        
        
        
        
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
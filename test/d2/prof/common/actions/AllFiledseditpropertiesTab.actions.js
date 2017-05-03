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
    contentDeveloper,AdExclusionvalue,Wbmdlng,ProdType,
    OutputVersval,Poutputval,wbmdiconsVal,AtoDispformat,Questionnaireval,Activityval,Prdnameval,SupressFeaturebealtchkval,BucketCollectionsValue,Primcollval,
    Projctidval,wbmdSupprtrVal,AdTagoverrideval,SupressAdval,SupressrecAdval,Supresdispciteval,OHCPval,MDDiscssnBoardval,NurseDiscussionBoardVal,
    wbmdtgtCntryVal,SupressuppPrintval,SupressuppMblval,Gatedval,ExtrnlIdVal,SupressuppProgval,
    Publicationval,PublicationSecval,PublicationSubsecval,PMIDVal,PublicationVolval,PublicationIssueval,PublicPageVal,
    AuthorsVal,CoAuthorsVal,WritersVal,EditorsVal,RevwrsVal,ModeratorsVal,PresenterVal,BucktgenbylnVal){
        
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
        
        // propertiesTabUI.AssistanceType("wbmd_outpt_vers");
        // propertiesTabUI.AssistanceValue(OutputVersval);
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
        propertiesTabUI.PubDTSet();
        propertiesTabUI.AssistanceType("wbmd_tgt_cntry");
        propertiesTabUI.AssistanceValue(wbmdtgtCntryVal);
        propertiesTabUI.SupresschkboxSet("#wbmd_supp_print",SupressuppPrintval);
        propertiesTabUI.SupresschkboxSet("#wbmd_supp_mobile",SupressuppMblval);
        propertiesTabUI.SupresschkboxSet("#wbmd_gated",Gatedval);
        propertiesTabUI.ExternalIDSet(ExtrnlIdVal);
        propertiesTabUI.SupresschkboxSet("#wbmd_supp_prog_lnk",SupressuppProgval);
      
        
        propertiesTabUI.publicationTabSelect();
        propertiesTabUI.PublicationSet(Publicationval);
        propertiesTabUI.PublicationSectionSet(PublicationSecval);
        propertiesTabUI.PublicationSubSectionSet(PublicationSubsecval);
        propertiesTabUI.PMIDSet(PMIDVal);
        propertiesTabUI.PublicationDateSet();
        propertiesTabUI.PublicationVolumeSet(PublicationVolval);
        propertiesTabUI.PublicationIssueSet(PublicationIssueval);
        propertiesTabUI.PublicationPagesSet(PublicPageVal);
        
        propertiesTabUI.contributorsTabSelect();
        propertiesTabUI.AssistanceType("wbmd_authr_prim");
        propertiesTabUI.AssistanceValue(AuthorsVal);
        propertiesTabUI.AssistanceType("wbmd_authr_sec");
        propertiesTabUI.AssistanceValue(CoAuthorsVal);
        propertiesTabUI.AssistanceType("wbmd_wrtr");
        propertiesTabUI.AssistanceValue(WritersVal);
        propertiesTabUI.AssistanceType("wbmd_edtr");
        propertiesTabUI.AssistanceValue(EditorsVal);
        propertiesTabUI.AssistanceType("wbmd_med_revr");
        propertiesTabUI.AssistanceValue(RevwrsVal);
        propertiesTabUI.AssistanceType("wbmd_modrtr");
        propertiesTabUI.AssistanceValue(ModeratorsVal);
        propertiesTabUI.AssistanceType("wbmd_presntr");
        propertiesTabUI.AssistanceValue(PresenterVal);
        propertiesTabUI.BucketGeneratorBylineSet(BucktgenbylnVal);
       
        
        
        
        
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
    // Start verify prof Publication creation with all fields	
    setProfPublicationAllFields:function(publicationDisplay,publicationType,publobbervation,publISSN,PublDesc,ArticleURL,primaryPubURL,SecPubURL,linkOutURL,
    pageAdOverride,companyName,publicationSections,copyRights)
    {   
        propertiesTabUI.edit();
        browser.waitForVisible("//div[@id='wbmd_publ_medline']//input",maxWaitTimeInMs);
        propertiesTabUI.publicationDisplaySet(publicationDisplay);
        propertiesTabUI.publicationTypeSet(publicationType);
        browser.click("//label[@for='wbmd_publ_sectn']/..//td[@valign='TOP']//td/div[@id='assistance']");
        browser.waitForVisible("//div[@id='"+publicationSections+"']",maxWaitTimeInMs);
        browser.doubleClick("//div[@id='"+publicationSections+"']");
        browser.click("//table[@id='ok-button']/tbody//td[contains(@class,'btn-mc')]//button");
        browser.pause(2000);
        propertiesTabUI.publicationAbbreviationSet(publobbervation);
        propertiesTabUI.publicationISSNSet(publISSN);
        propertiesTabUI.publicationDescriptionSet(PublDesc);
        propertiesTabUI.articlePubsURLSet(ArticleURL);
        propertiesTabUI.primaryPubImageURLSet(primaryPubURL);
        propertiesTabUI.secondaryPubImageURLSet(SecPubURL);
        propertiesTabUI.linkOutURLSet(linkOutURL);
        browser.click("//div[@id='wbmd_publ_medline']//input");
        browser.click("//div[@id='wbmd_publ_select']//input");
        propertiesTabUI.pubPageAdOverrideSet(pageAdOverride);
        browser.click("//div[@id='wbmd_publ_print']//input");
        browser.click("//div[@id='wbmd_publ_pg_supp']//input");        
        browser.click("//div[@id='wbmd_no_bots']//input");
        if(copyRights!="")
        {
            browser.click("//label[@for='wbmd_publ_cpyrt_id']/..//td[@valign='TOP']//td/div[@id='assistance']");
            browser.waitForVisible("//div[@id='"+copyRights+"']",maxWaitTimeInMs);
            browser.doubleClick("//div[@id='"+copyRights+"']");
            browser.click("//table[@id='ok-button']/tbody//td[contains(@class,'btn-mc')]//button");
            browser.pause(2000);
        }

        propertiesTabUI.companyNameSet(companyName);
        browser.click("//div[@id='wbmd_featured_supp']//input");
        propertiesTabUI.save();
         browser.pause(2000);
        // browser.click("//label[@for='wbmd_publ_disclmr_id']/..//td[@valign='TOP']//td/div[@id='assistance']");
        // browser.waitForVisible("//div[@id='AAEM Articles']",maxWaitTimeInMs);
        // browser.doubleClick("//div[@id='AAEM Articles']");
        // browser.click("//table[@id='ok-button']/tbody//td[contains(@class,'btn-mc')]//button");
        // browser.pause(2000);
    },
}
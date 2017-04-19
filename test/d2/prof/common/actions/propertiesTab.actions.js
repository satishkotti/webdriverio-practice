var propertiesTabUI = require('./../ui/propertiesTab');
var pointerPropertiestabUI = require('./../ui/pointer');
var maxWaitTimeInMs = 30000;

module.exports = {
    
    getChronicleIdAndName: function(){
        propertiesTabUI.propertiesTabSelect();
        return {
            chronicleId: propertiesTabUI.chronicleIdGet(),
            objectName: propertiesTabUI.objectNameGet(),
            title:propertiesTabUI.titileGet()
        };
    },
    getObjectNameBasicTab: function(){
        propertiesTabUI.propertiesBasicTabSelect();
        return {
            chronicleId: propertiesTabUI.chronicleIdGet(),
            objectName: propertiesTabUI.objectNameGet(),
            title:propertiesTabUI.titileGet()
        };
    },
    getMediaObjectName: function(){
        propertiesTabUI.ProfMediaPropertiesTabSelect();
        return {
            mediaName: propertiesTabUI.mediaNameGet(),
            title:propertiesTabUI.titileGet()
        };
    },
    setRequiredPropertiesForProfMedia: function(mediaFormat){
        
        propertiesTabUI.ProfMediaPropertiesTabSelect();
        propertiesTabUI.edit();
        propertiesTabUI.mediaFormatSet(mediaFormat);
        propertiesTabUI.save();
    },
    setAllPropertiesForProfMedia: function(mediaFormat,mediaLocation,videorss,audiorss,startimg,endimage,configfile,swfloc,duration,
    audiodownload,videodownload,width,height,basefolder,userdesc,keywords,windowtitle,externalid){
        
        propertiesTabUI.ProfMediaPropertiesTabSelect();
        propertiesTabUI.edit();
        propertiesTabUI.mediaFormatSet(mediaFormat);
        propertiesTabUI.mediaLocationSet(mediaLocation);
        propertiesTabUI.videoRSSSet(videorss);
        propertiesTabUI.audioRSSSet(audiorss);
        browser.click("//div[@id='wbmd_autoplay']//input");
        propertiesTabUI.startimgLocSet(startimg);
        propertiesTabUI.endImgLocSet(endimage);
        propertiesTabUI.configLocSet(configfile);
        propertiesTabUI.swfLocSet(swfloc);
        propertiesTabUI.durationSet(duration);
        propertiesTabUI.audioDownloadBytesSet(audiodownload);
        propertiesTabUI.videoDownloadBytesSet(videodownload);
        propertiesTabUI.widthSet(width);
        propertiesTabUI.heightSet(height);
        propertiesTabUI.baseFolderSet(basefolder);
        propertiesTabUI.userDescriptionSet(userdesc);
        propertiesTabUI.webmdKeyWordsSet(keywords);
        propertiesTabUI.windowTitleSet(windowtitle);
        propertiesTabUI.externalIDSet(externalid);
        browser.click("//input[@id='wbmd_orig_pub_dt-input']//following-sibling::img");
        browser.waitForVisible("//button[text()='Today']",maxWaitTimeInMs);
        browser.click("//button[text()='Today']");
        propertiesTabUI.save();
    },
    setRequiredProperties: function(shortTitle,subTitle,superTitle,leadSpecialty,contentDeveloper){
        
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        propertiesTabUI.shortTitleSet(shortTitle);
        propertiesTabUI.subTitleSet(subTitle);
        propertiesTabUI.superTitleSet(superTitle);
        propertiesTabUI.leadSpecialtySet(leadSpecialty);
        propertiesTabUI.contentDeveloperSet(contentDeveloper);
        propertiesTabUI.save();
    },
     verifyNewsProperties:function(labelPropertiesArray){
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        var result=propertiesTabUI.verifyProperties(labelPropertiesArray);
        return result;
     },
      verifyPointerProperties:function(){
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        pointerPropertiestabUI.clearProperties();
        propertiesTabUI.save();
        var validationmessage = pointerPropertiestabUI.validationmandatoryfields();
        expect(validationmessage).to.be.true;
        propertiesTabUI.cancelEdit();
     },
      updatePointerProperties:function(){
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        pointerPropertiestabUI.pointerTitleupdate();
        propertiesTabUI.save();
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
       setRequiredPropertiesforPublish: function(systempubdate,expdate){
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        browser.pause(2000);
        propertiesTabUI.publishingTabSelect();
        browser.waitForVisible("#wbmd_eff_date-input",maxWaitTimeInMs);
        propertiesTabUI.systemPublishingDateSet(systempubdate);
        browser.click("//label[text()='Expire On']");
        propertiesTabUI.expirationDateSet(expdate);
        propertiesTabUI.save();
    },
    setRequiredPropertiesforExpire: function(expdate){
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        browser.pause(2000);
        propertiesTabUI.publishingTabSelect();

        browser.waitForVisible("#wbmd_exp_date-input",maxWaitTimeInMs);
        browser.click("//label[text()='Expire On']");
        propertiesTabUI.expirationDateSet(expdate);
        propertiesTabUI.save();
    },
}
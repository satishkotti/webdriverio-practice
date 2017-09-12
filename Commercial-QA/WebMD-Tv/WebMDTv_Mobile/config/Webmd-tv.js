module.exports = {
  staging: {
    environment: "http://www.preview.webmd.com/zztest/webmd-tv/video-early-cancer-detection-robin-roberts",
    gridurl1: "http://www.preview.webmd.com/cancer/cutting-edge-16/cancer-custom-genetic-treatment",
    gridurl2: "http://www.preview.webmd.com/cancer/cutting-edge-16/cancer-new-research-treatment",
      webmdurl:"http://www.webmd.com/default.htm",
    gridurl3: "http://www.preview.webmd.com/cancer/cutting-edge-16/cancer-mind-spirit-support",
    gridurl5: "http://www.preview.webmd.com/oral-health/rm-quiz-know-jaw-pain",
    gridurl4: "http://www.preview.webmd.com/diet/ss/slideshow-bad-foods-that-are-good-for-weight-loss",
    gridurl6: "http://www.preview.webmd.com/eye-health/eye-vision-tv/video-the-aging-eye",
    layout:"http://www.preview.webmd.com/zztest/webmd-tv/video-early-cancer-detection-robin-roberts-pv-layout",
    adlayout:"http://www.staging.webmd.com/zztest/webmd-tv/video-cancer-treat-whole-you-robin-roberts-with-ad",
    splash:'http://www.preview.webmd.com/zztest/webmd-tv/video-early-cancer-detection-robin-roberts-splash',

    //PPE-99104 URLS GIVEN IN Jira
    withrightad:["http://www.preview.webmd.com/zztest/webmd-tv/video-cancer-treat-whole-you-robin-roberts-with-ad","http://www.preview.webmd.com/zztest/webmd-tv/video-targeted-cancer-therapy-robin-roberts","http://www.preview.webmd.com/zztest/webmd-tv/video-early-cancer-detection-robin-roberts-splash","http://www.preview.webmd.com/zztest/webmd-tv/webmd-tv-article2"],
    apps:["withad",'withoutad',"splash","article"],
    //99107
    article:"http://www.preview.webmd.com/zztest/webmd-tv/webmd-tv-article2",
    splashpage:"http://www.preview.webmd.com/zztest/webmd-tv/video-early-cancer-detection-robin-roberts-splash",
  },
  preview: {
      environment:"http://www.preview.qa00.webmd.com/zztest/webmd-tv/video-cancer-survivors-robin-roberts",
    article:"http://www.staging.qa00.webmd.com/zztest/webmd-tv/webmd-tv-article2",
    webmdurl:"http://www.webmd.com/default.htm",
    //101411
    marqueeheader: "http://www.preview.qa00.webmd.com/zztest/webmd-tv/video-cancer-survivors-robin-roberts",
    layout:"http://www.preview.qa00.webmd.com/zztest/webmd-tv/video-early-cancer-detection-robin-roberts-pv-layout",
    adlayout:"http://www.preview.qa00.webmd.com/zztest/webmd-tv/video-cancer-treat-whole-you-robin-roberts-with-ad",
    gridurl1: "http://www.preview.qa00.webmd.com/cancer/cutting-edge-16/cancer-custom-genetic-treatment",
    gridurl2: "http://www.preview.qa00.webmd.com/cancer/cutting-edge-16/cancer-new-research-treatment",
    gridurl3: "http://www.preview.qa00.webmd.com/cancer/cutting-edge-16/cancer-mind-spirit-support",
    gridurl5: "http://www.preview.qa00.m.webmd.com/oral-health/rm-quiz-know-jaw-pain",
    gridurl4: "http://www.preview.qa00.m.webmd.com/diet/ss/slideshow-bad-foods-that-are-good-for-weight-loss",
    gridurl6: "http://www.preview.qa00.webmd.com/eye-health/eye-vision-tv/video-the-aging-eye",
    splashpage:"http://www.preview.qa00.webmd.com/zztest/webmd-tv/video-early-cancer-detection-robin-roberts-splash",
    Responsive:{"largedesktop":{
      width: 980,
      height: 691
    },
   "smalldesktop":{
      width: 768,
      height: 561
    }
},
  }
}

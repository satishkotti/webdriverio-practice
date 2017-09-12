module.exports = {
  prod: {
    environment: 'http://mediakit.webmd.com/',
    Responsive: {
      "largedesktop": {
        width: 1240,
        height: 1000
      },
      "smalldesktop": {
        width: 1024,
        height: 1366
      },
      "tablet": {
        width: 768,
        height: 1366
      },
      "mobile": {
        width: 320,
        height: 600
      }
    }
  },

  staging: {
    environment: ['http://www.webmd.com/skin-problems-and-treatments/ss/slideshow-ringworm',
'http://www.webmd.com/allergies/rm-quiz-indoor-allergies',
'http://www.webmd.com',
'http://www.webmd.com/rx',
'http://www.webmd.com/sleep-disorders/rm-quiz-dreams',
'http://www.webmd.com/sleep-disorders/understanding-insomnia-basic-information',
'http://www.webmd.com/sleep-disorders/dreams-nightmares-directory',
'http://www.webmd.com/sleep-disorders/tc/benzodiazepines-for-sleep-problems-related-information',
'http://www.webmd.com/cancer/bladder-cancer/tc/bladder-cancer-treatment-overview',
'http://www.webmd.com/cancer/bone-cancer-directory',
'http://www.webmd.com/diet/guide/rapid-weight-loss',
'http://www.webmd.com/brain/autism/autism-home-treatment',
'http://www.webmd.com/women/features/avoiding-pain',
'http://www.webmd.com/vaccines/video/destress-for-a-healthy-immune-system',
'http://www.webmd.com/parenting/video/myths-facts-bedwetting',
'http://www.webmd.com/diet/video/personal-diet-video',
'http://www.webmd.com/diet/video/hangover-tips']},
  perf: {
    environment: "http://www.mediakit.webmd.com",
    Responsive: {
      "largedesktop": {
        width: 1240,
        height: 1000
      },
      "smalldesktop": {
        width: 1024,
        height: 1366
      },
      "tablet": {
        width: 768,
        height: 1366
      },
      "mobile": {
        width: 320,
        height: 600
      }
    }
  }
}

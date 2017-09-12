module.exports= {
  prod:{
        environment: 'http://mediakit.webmd.com/',
         Responsive:{"largedesktop":{
          width: 1240,
          height: 1000
        },
       "smalldesktop":{
          width: 1024,
          height: 1366
        },
       "tablet":{
          width: 768,
        height: 1366
      },
        "mobile":{
          width: 320,
          height: 600
        }
    }
 },

 staging:{
        environment: ['http://www.staging.webmd.com/allergies/detect-allergen#1',
        'https://www.staging.webmd.com/skin-problems-and-treatments/contact-dermatitis']},
 perf:{
   environment:"http://www.mediakit.webmd.com",
     Responsive:{"largedesktop":{
     width: 1240,
     height: 1000
   },
  "smalldesktop":{
     width: 1024,
     height: 1366
   },
  "tablet":{
     width: 768,
   height: 1366
 },
   "mobile":{
     width: 320,
     height: 600
   }
}
}
}

module.exports= {
  prod:{
        environment: 'http://www.google.com',
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
        environment: ['https://www.staging.webmd.com/a-to-z-guides/tc/urinary-tract-infections-in-teens-and-adults-topic-overview',
        'https://www.staging.webmd.com/osteoarthritis/news/20170407/stem-cells-for-knees-promising-treatment-or-hoax',
        'https://www.staging.webmd.com/back-pain/guide/low-back-strain']
 },
 perf:{
   environment:"http://www.google.com",
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

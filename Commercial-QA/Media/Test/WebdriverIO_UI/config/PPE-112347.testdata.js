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
        environment: ['https://www.qa01.webmd.com/a-to-z-guides/tc/urinary-tract-infections-in-teens-and-adults-topic-overview',
        'https://www.qa01.webmd.com/osteoarthritis/news/20170407/stem-cells-for-knees-promising-treatment-or-hoax',
        'https://www.qa01.webmd.com/back-pain/guide/low-back-strain']
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

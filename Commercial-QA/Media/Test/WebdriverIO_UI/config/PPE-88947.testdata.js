module.exports= {
  prod:{
        environment: 'http://www.webmd.com/brandcast/default.htm',
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
        environment: 'http://www.staging.webmd.com/brandcast/default.htm',
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
 perf:{
   environment:"http://www.perf.webmd.com/brandcast/default.htm",
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

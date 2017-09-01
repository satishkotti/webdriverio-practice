var chai = require('chai');
var should = chai.should();
//var urls1 = require("./urls.js");
var urls1 = require("./DFP1");
var webdriverio = require("webdriverio");
var Promise = require("bluebird");
var qs = require('querystring');
var ada = require("./../../../common/functions/AdcallsActions");

var options = {
    desiredCapabilities: {
        browserName: 'firefox'
    }
};
var browser = webdriverio.remote(options);
var webmd_proxy = require('wdio-browser-proxy')(browser);

var qs1, qs2;
var counter = 1;

describe('basic test', function () {
    this.timeout(1000000);
    var Addata;
    before(function (done) {
      //var promises = []
      var omnitureCompleted = 0;
 
        Promise.mapSeries(urls1,function(url){
            
            return new Promise(function (resolve, reject) {
           var d=  browser
             .enableProxy({})//.then(function () { console.log(currentUrl1); console.log('finsihed enabling proxy'); })
             .url(url.URL)
             .end()
             d.getNetworkCalls('https://securepubads.g.doubleclick.net/gampad').then(function (result) {
                 resolve(result);
             });
    });
        }).then(function(data){
            console.log(data);
           Addata = data;
            if(counter==1 || counter/2 !=0 ){
                qs1=Addata;
                //console.log("Staging Ad Call Data",qs1);
            }
            if(counter/2==0){
                qs2=Addata;
                //console.log(qs2);
            }
            counter++;
            
            done();
            console.log(Addata);
            
        })

        console.log(Addata);

    });


 it('should make omniture call with the expected prop values', function(){
        //take the last omniture call
        for(i=0; i< Addata.length;i++ ){
            var propValues = qs.parse(Addata[i][Addata[i].length - 1].request.url);
            console.log(propValues);
        }
 });

  it('should make omniture call with the expected prop values', function(){
        //take the last omniture call
     console.log(qs1);
        });

// function fn (qs1) {
//     it('it should make some calls to omniture', function () {
//         console.log(qs1.length);
//         for (i = 0; i < qs1.length; i++)
//             qs1[i].length.should.be.above(0);
//     });
// }
//     for(var j=0;j<qs1.length || qs2.length;j++) {
//         console.log("Staging");
//         console.log(qs1[j].request.queryString);
//         console.log("Production");
//         console.log(qs2[j].request.queryString);
//         fn(qs1);
//     }




// for(var i=0;i<Addata.length;i++){
//     it(" pt Validation with production", function () { 
//             var DFPpt,prodpt;
//             DFPpt = ada.extractPtfromAdcall(qs1);
//             prodpt= ada.extractPtfromAdcall(qs2);
//             ada.compareStrings(DFPpt,prodpt);
//      });

//     it('it should make some calls to omniture', function () {
//         for(i=0; i< Addata.length;i++ )
//         Addata[i].length.should.be.above(0);
//     });

// }
    // it('should make omniture call with the expected prop values', function(){
    //     //take the last omniture call
    //     for(i=0; i< Addata.length;i++ ){
    //         var propValues = qs.parse(Addata[i][Addata[i].length - 1].request.url);
    //         console.log(propValues);
    //     }
        
    // });
});

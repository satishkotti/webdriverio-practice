var path = require('path');
var rootPath = path.normalize(__dirname);
var Page = require('./../../page');
var webdriverio = require("webdriverio");
var qs = require('querystring');


/* Glabal Variable Declaration */


var self = module.exports = {


    stdCallVerification: function (Calltype, Actual, Expected) {

        var count = 0;
        var currentcal;
        var pev2 = Expected.pev2;
        for (var i = 0; i < Actual.length; i++) {
                 
            var Propvalues = qs.parse(Actual[i].request.url);
              
            if (Calltype == "Pageviewcall" && Propvalues.c66) {
                    // console.log("i"+i);
                if (count == 0) {
                    currentcal=i
                    self.verifyOmnitureParams(Propvalues, Expected);
                }
               // count++;
                if((currentcal++)==i)
                count++;

            }
            if (Calltype == "Modulecall" && Propvalues.mmodule && Propvalues.pev2 == pev2) {

                if (count == 0) {
                    self.verifyOmnitureParams(Propvalues, Expected);
                }
                //count++;
               // if((currentcal++)==i)
                count++;
            }



        }
      //  console.log("count"+count);
        if (count !=1) {
            console.log("observed multiple " + Calltype);
            count.should.equal(1);
            

        }

    },

    verifyOmnitureParams: function (Propvalues, Expected) {
        var failprops = [];
        for (var expeckey in Expected) {
            var exist = 0;
            for (var pvkey in Propvalues) {
                if (pvkey == expeckey) {
                    Expected[expeckey].should.equal(Propvalues[pvkey]);
                    console.log(pvkey +":" +Expected[expeckey]);
                        exist = 1;

                }

            }
            if (exist == 0) {
                failprops.push(expeckey);

            }
        }

        if (failprops.length > 0) {
            failprops.length.should.equal(0);
        }




    },




   

} 

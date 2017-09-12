/*
****************************************************
This test case to verify Google Pixel Parameters
****************************************************
 */

// Declare required variables

var chai = require("chai");
var should = chai.should();
//var argv = require("yargs").argv;
//var urls1 = require("./../../../config/PPE-112352TaboolaTestData")[argv.env];
//var urls1 = require("../../../config/PPE-118381_TestData")[argv.env];
var ada = require("./../../../common/functions/AdcallsActions");
// console.log(urls1.URL[0]);
// console.log(urls1.URL.length)
var browser = require('../../../utilities/wdioconfig');
var webmd_proxy = require("wdio-browser-proxy")(browser);
var qs = require("querystring");

// Describe Network calls function

//function _Fn(val) {
describe(' Google Pixel - Add Parameters ', function () {
    //var produrl = val1.URL;

    //  var stagingurl = val.URL;
    //var stagingurl = 'http://www.staging.webmd.com/diabetes/ss/slideshow-type-2-diabetes-overview?ecd=wgt_taboola_nosp_3630_ss_ad257';
    var stagingurl = 'http://www.staging.webmd.com/allergies/detect-allergen';
   // argv.env = "O&O";
    this.timeout(0);
    var Addata1, googlead;
    var qs1,googledata;


    before(function (done) {
        var x = browser.enableProxy({})//.then(function () { console.log('finsihed enabling proxy'); })

            .url(stagingurl)
            .end()
            .getNetworkCalls('https://securepubads.g.doubleclick.net/gampad').then(function (result) {
                Addata1 = result;
                console.log(Addata1.length);
                qs1 = Addata1[0].request.queryString;
           
            });

        x.getNetworkCalls('https://googleads.g.doubleclick.net/pagead/viewthrough').then(function (result) {
            googlead = result;
            console.log(googlead.length);
             googledata = googlead[0].request.queryString;
            done();
        });
    });


    it('Verify Article / art Value', function () {
       
        var custparams = ada.extractCustParams(qs1);
        console.log(custparams);
        var art = ada.extractParamsFromList(custparams,"art");
        console.log("Securepubadcall art"+ art);

        var temp = ada.extractParamsFromAdcall(googledata,"data");
        var data = ada.splitStringwithDelimiter(temp,";");
        console.log(data);
        var art1 = ada.extractParamsFromList(data,"art");
        console.log("GooglePixel art"+ art1);
        ada.compareStrings(art,art1);
    });
       
        it('Verify Topic Mini Guide / tmg Value', function () {
       
        var custparams = ada.extractCustParams(qs1);
        console.log(custparams);
        var tmg = ada.extractParamsFromList(custparams,"tmg");
        console.log("Securepubadcall tmg"+ tmg);

        var temp = ada.extractParamsFromAdcall(googledata,"data");
        var data = ada.splitStringwithDelimiter(temp,";");
        console.log(data);
        var tmg1 = ada.extractParamsFromList(data,"tmg");
        console.log("GooglePixel tmg"+ tmg1);
        ada.compareStrings(tmg,tmg1);
    });

        it('Verify Leaf / leaf Value', function () {
       
        var custparams = ada.extractCustParams(qs1);
        console.log(custparams);
        var leaf = ada.extractParamsFromList(custparams,"leaf");
        console.log("Securepubadcall leaf"+ leaf);

        var temp = ada.extractParamsFromAdcall(googledata,"data");
        var data = ada.splitStringwithDelimiter(temp,";");
        console.log(data);
        var leaf1 = ada.extractParamsFromList(data,"leaf");
        console.log("GooglePixel leaf"+ leaf1);
        ada.compareStrings(leaf,leaf1);
    });

        it('Verify Patient Select / tug Value', function () {
       
        var custparams = ada.extractCustParams(qs1);
        console.log(custparams);
        var tug = ada.extractParamsFromList(custparams,"tug");
        console.log("Securepubadcall tug"+ tug);

        var temp = ada.extractParamsFromAdcall(googledata,"data");
        var data = ada.splitStringwithDelimiter(temp,";");
        console.log(data);
        var tug1 = ada.extractParamsFromList(data,"tug");
        console.log("GooglePixel tug"+ tug1);
        ada.compareStrings(tug,tug1);
          
}); 

  it('Verify Primary Topic / pt', function () {
       
        var custparams = ada.extractCustParams(qs1);
        console.log(custparams);
        var pt = ada.extractParamsFromList(custparams,"pt");
        console.log("Securepubadcall pt"+ pt);

        var temp = ada.extractParamsFromAdcall(googledata,"data");
        var data = ada.splitStringwithDelimiter(temp,";");
        console.log(data);
        var pt1 = ada.extractParamsFromList(data,"pt");
        console.log("GooglePixel pt"+ pt1);
        ada.compareStrings(pt,pt1);
    });

      it('Verify Super Center / scent Value', function () {
       
        var custparams = ada.extractCustParams(qs1);
        console.log(custparams);
        var scent = ada.extractParamsFromList(custparams,"scent");
        console.log("Securepubadcall scent"+ scent);

        var temp = ada.extractParamsFromAdcall(googledata,"data");
        var data = ada.splitStringwithDelimiter(temp,";");
        console.log(data);
        var scent1 = ada.extractParamsFromList(data,"scent");
        console.log("GooglePixel scent"+ scent1);
        ada.compareStrings(scent,scent1);
    });

    it('Verify Health Center / hcent', function () {
       
        var custparams = ada.extractCustParams(qs1);
        console.log(custparams);
        var hcent = ada.extractParamsFromList(custparams,"hcent");
        console.log("Securepubadcall hcent"+ hcent);

        var temp = ada.extractParamsFromAdcall(googledata,"data");
        var data = ada.splitStringwithDelimiter(temp,";");
        console.log(data);
        var hcent1 = ada.extractParamsFromList(data,"hcent");
        console.log("GooglePixel hcent"+ hcent1);
        ada.compareStrings(hcent,hcent1);
    });

    it('Verify Mini Center / mcent', function () {
       
        var custparams = ada.extractCustParams(qs1);
        console.log(custparams);
        var mcent = ada.extractParamsFromList(custparams,"mcent");
        console.log("Securepubadcall mcent"+ mcent);

        var temp = ada.extractParamsFromAdcall(googledata,"data");
        var data = ada.splitStringwithDelimiter(temp,";");
        console.log(data);
        var mcent1 = ada.extractParamsFromList(data,"mcent");
        console.log("GooglePixel mcent"+ mcent1);
        ada.compareStrings(mcent,mcent1);
    });

    it('Verify Line Item following / lif Value', function () {
       
        var custparams = ada.extractCustParams(qs1);
        console.log(custparams);
        var lif = ada.extractParamsFromList(custparams,"lif");
        console.log("Securepubadcall lif"+ lif);

        var temp = ada.extractParamsFromAdcall(googledata,"data");
        var data = ada.splitStringwithDelimiter(temp,";");
        console.log(data);
        var lif1 = ada.extractParamsFromList(data,"lif");
        console.log("GooglePixel lif"+ lif1);
        ada.compareStrings(lif,lif1);
    });

        it('Verify Micro Center / mic Value', function () {
       
        var custparams = ada.extractCustParams(qs1);
        console.log(custparams);
        var mic = ada.extractParamsFromList(custparams,"mic");
        console.log("Securepubadcall mic"+ mic);

        var temp = ada.extractParamsFromAdcall(googledata,"data");
        var data = ada.splitStringwithDelimiter(temp,";");
        console.log(data);
        var mic1 = ada.extractParamsFromList(data,"mic");
        console.log("GooglePixel mic"+ mic1);
        ada.compareStrings(mic,mic1);
    }); 

    it('Verify Segment ID / segm Value', function () {
       
        var custparams = ada.extractCustParams(qs1);
        console.log(custparams);
        var segm = ada.extractParamsFromList(custparams,"segm");
        console.log("Securepubadcall segm"+ segm);

        var temp = ada.extractParamsFromAdcall(googledata,"data");
        var data = ada.splitStringwithDelimiter(temp,";");
        console.log(data);
        var segm1 = ada.extractParamsFromList(data,"segm");
        console.log("GooglePixel segm"+ segm1);
        ada.compareStrings(segm,segm1);
    });

});
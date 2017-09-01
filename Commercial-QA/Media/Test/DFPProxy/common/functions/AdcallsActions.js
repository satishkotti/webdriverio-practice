var path = require('path');
var rootPath = path.normalize(__dirname);
var Page = require('./../pageobjects/page');
var qs = require('querystring');

/* Glabal Variable Declaration */



var self = module.exports = {

    compareStrings: function (str1, str2) {
        str1.should.equal(str2);
    },

    extractCustParams: function (Adcall) {
        var cp;
        for (var x = 0; x < Adcall.length; x++) {
            if (Adcall[x].name == 'cust_params') {
                var temp = Adcall[x].value;
                //console.log(temp);
                cp = temp.split('&');
            }
        }
        return cp;
    },

    //PPE-121501 - Pass Lotame's Profile ID into DFP

    extarctLpidfromAdcall: function (Adcall) {
        var DFPLpid;
        var custparams = self.extractCustParams(Adcall);
        for (var s = 0; s < custparams.length; s++) {
            if (custparams[s].includes("pvid=")) {
                DFPLpid = custparams[s];
                DFPLpid = DFPLpid.substring(5);
                console.log("Extracted Lpid from DFP=" + DFPLpid);
            }
        }
        return DFPLpid;
    },
    
    extarctPVIDfromAdcall: function (Adcall) {
        var DFPpvid;
        var custparams = self.extractCustParams(Adcall);
        for (var s = 0; s < custparams.length; s++) {
            if (custparams[s].includes("pvid=")) {
                DFPpvid = custparams[s];
                DFPpvid = DFPpvid.substring(5);
                console.log("Extracted PVID from DFP" + DFPpvid);
            }
        }
        return DFPpvid;
    },

    extractPtfromAdcall: function (Adcall) {
        var DFPpt;
        var custparams = self.extractCustParams(Adcall);
        //console.log(custparams);
        for (var s = 0; s < custparams.length; s++) {
            if (custparams[s].includes("pt=")) {
                DFPpt = custparams[s];
                DFPpt = DFPpt.substring(3);
                console.log(DFPpt);
            }
        }
        return DFPpt;
    },

    extractFiptfromAdcall: function (Adcall) {
        var DFPfipt;
        var custparams = self.extractCustParams(Adcall);
        for (var s = 0; s < custparams.length; s++) {
            if (custparams[s].includes("fipt=")) {
                DFPfipt = custparams[s];
                DFPfipt = DFPfipt.substring(5);
                console.log(DFPfipt);
            }
        }
        return DFPfipt;
    },

    extractFisfromAdcall: function (Adcall) {
        var DFPfis;
        var custparams = self.extractCustParams(Adcall);
        for (var s = 0; s < custparams.length; s++) {
            if (custparams[s].includes("fis=")) {
                DFPfis = custparams[s];
                DFPfis = DFPfis.substring(4);
                console.log(DFPfis);
            }
        }
        return DFPfis;
    },

    extractECDfromAdcall: function (Adcall) {
        var DFPECD;
        var custparams = self.extractCustParams(Adcall);
        //console.log(custparams);
        for (var s = 0; s < custparams.length; s++) {
            if (custparams[s].includes("ecd=")) {
                DFPECD = custparams[s];
                DFPECD = DFPECD.substring(4);
                //console.log("Index"+custparams[s]);
                //DFPECD = DFPECD.substring(4);
                console.log("Extracted Value" + DFPECD);
            }
        }
        return DFPECD;
    },

    extractenv: function (Adcall) {
        var env;
        var custparams = self.extractCustParams(Adcall);
        env = self.extractParamsFromList(custparams, "env");
        //console.log("After param call",env);
        return env;
    },

    splitScp: function (Adcall) {
        for (var x = 0; x < Adcall.length; x++) {
            if (Adcall[x].name == 'prev_scp') {
                var temp = Adcall[x].value;
                var temp1 = temp.split('&').join('|');
                var prevscplist = temp1.split('|');
            }
        }
        return prevscplist;
    },

    extractPOSValues: function (list) {
        var l1 = [];
        for (x = 0; x < list.length; x++) {
            //console.log(strscpl[x]);
            if (list[x].includes("pos=")) {
                l1.push(list[x]);
            }
        }
        return l1;
    },

    extractLikeValuesFromList: function (list,paramname){
         var l1 =[];
        for (x = 0; x < list.length; x++) {
            //console.log(strscpl[x]);
            if (list[x].includes(paramname)) {
                l1.push(list[x]);
            }
        }
        return l1;
    },
    extractNativeKeys: function (list) {
        var l1 = [];
        for (x = 0; x < list.length; x++) {
            //console.log(strscpl[x]);
            if (list[x].includes("strnativekey=")) {
                l1.push(list[x]);
            }
        }
        return l1;
    },

    verifyTwoLists: function (l1, l2) {

        if (l1.length == l2.length) {
            var boolean = JSON.stringify(l1) == JSON.stringify(l2);
            boolean.should.equal(true);
        }
        else {
            for (var s = 0; s < l1.length; s++) {
                var counter = 0;
                for (var a = 0; s < l2.length; a++) {
                    if (l1[s] == l2[a]) {
                        counter++;
                    }
                    if (counter == 2) {
                        console.log("Duplicated item" + l2[a]);
                    }
                }
            }
        }
    },



    extractParamsFromAdcall: function (Adcall, paramname) {
        console.log("Parameter" + paramname);
        for (var x = 0; x < Adcall.length; x++) {
            if (Adcall[x].name == paramname) {
                var requirestring = Adcall[x].value;
            }
        }
        return requirestring;
    },

    extractParamsFromList: function (custparams, paramname) {
        //console.log("Parameter:"+paramname);
        for (var s = 0; s < custparams.length; s++) {
            //console.log(custparams[s] +",Bool,"+custparams[s].includes(paramname));

            if (custparams[s].includes(paramname)) {
                var temp = custparams[s];
                console.log(temp);
                var requiredstring = temp.split('=')[1];
                console.log(requiredstring);
            }
        }
        return requiredstring;
    },

    splitStringwithDelimiter: function (str1, delimeter) {
        var list = str1.split(delimeter);
        return list;
    },

    verifyNativeKey: function (expected, actual, Key) {
        // console.log(Expected);
        // console.log(Actual);
        var b;
        //expected=qs.parse(expected);
        console.log("K^^^^^" + Key);
        console.log("exe" + expected.length);
        console.log("act" + actual.length);
        // for (var k = 0; k < expected.length; k++) {
        //     console.log("What happend"+expected[k].name);   
        //   for(var k in expected) { 
        //  if ( Key == expeckey) {
        var t = expected.Key;
        console.log(t);
        for (var l = 0; l < actual.length; l++) {
            console.log(actual[l]);
            if (t.should.includes(actual[l])) {
                console.log("****** In to Loop");
                b = t.should.includes(actual[l]);
                console.log(b);
                break;

            }
            else {
                b = false;
            }
        }
        //  }
        //}
        return b;
    },

    verifyAmazonSlotsDFPcall: function (list) {
        for (var x=0; x<list.length;x++) {
            list[x].should.includes("pos=");
            if(list[x].includes("pos=101") || list[x].includes("pos=121") || list[x].includes("pos=113")|| list[x].includes("pos=137"))
            list[x].should.includes("amznbid=");
            list[x].should.includes("amzniid=");
        }
    },
		
		verifyAmazonDesktopMobileFilterPOS: function (list) {
        for (var x=0; x<list.length;x++) {
            //list[x].should.includes("div-gpt-placeholder-desktop");
            if(list[x].includes("div-gpt-placeholder-desktop-101") && list[x].includes("div-gpt-placeholder-desktop-121") && list[x].includes("div-gpt-placeholder-desktop-137") && list[x].includes("div-gpt-placeholder-desktop-113")||list[x].includes("div-gpt-placeholder-mobile-2025") && list[x].includes("div-gpt-placeholder-mobile-2026"))
            console.log(list[x]+" is included which is expected");
        }
    },

    verifyAmazonDesktopMobileFilterPOS1: function (list) {
        for (var x=0; x<list.length;x++) {
            //list[x].should.includes("div-gpt-placeholder-desktop");
            if(list[x].includes("div-gpt-placeholder-desktop-103") || list[x].includes("div-gpt-placeholder-desktop-115") || list[x].includes("div-gpt-placeholder-desktop-409") || list[x].includes("div-gpt-placeholder-desktop-700") || list[x].includes("div-gpt-placeholder-desktop-701") || list[x].includes("div-gpt-placeholder-desktop-901") || list[x].includes("div-gpt-placeholder-desktop-902") || list[x].includes("div-gpt-placeholder-desktop-921") || list[x].includes("div-gpt-placeholder-desktop-923") || list[x].includes("div-gpt-placeholder-desktop-924") || list[x].includes("div-gpt-placeholder-desktop-925") || list[x].includes("div-gpt-placeholder-desktop-5000") || list[x].includes("div-gpt-placeholder-desktop-5001") || list[x].includes("div-gpt-placeholder-desktop-5002") || list[x].includes("div-gpt-placeholder-desktop-5003") || list[x].includes("div-gpt-placeholder-desktop-5100") || list[x].includes("div-gpt-placeholder-desktop-1901") || list[x].includes("div-gpt-placeholder-desktop-1921") || list[x].includes("div-gpt-placeholder-desktop-1923") || list[x].includes("div-gpt-placeholder-desktop-1924") || list[x].includes("div-gpt-placeholder-desktop-1925"))
            console.log(list[x]+" is included which is not expected");
        }
    },
    // verifyAmazonDesktopMobileFilterPOSADcall: function (list) {
    //     for (var x=0; x<list.length;x++) {
    //         //list[x].should.includes("div-gpt-placeholder-desktop");
    //         if(list[x].includes("pos=101") && list[x].includes("pos=121") && list[x].includes("pos=137") && list[x].includes("pos=113"))
    //         console.log(list[x]+" is included in ad call which is expected");
    //     }
    // },

    verifySlotsFromAAXCall: function () {
        var slotpos=[],slotsizes=[];
        var expectedpos= ['101','121','137','113'];
        var expectedsize = ['970x90','970x250','728x90','160x600'];
        var slots = self.extractParamsFromAdcall();
        console.log(slots);
        var b=false;
        for (var i=0;i<slots.length;i++){
            for (var j=0;j<expectedpos.length;j++){
            if (slots[i].sd.should.includes(expectedpos[j])) {
                slotpos.push(slots[i].sd);
                b=true;
            }
        }
        
        
        for (var z=0;z<expectedsize.length;z++){
            if(slots[i].s.should.includes(expectedsize[z]) && b==true){
                slotsizes.push(slots[i].s);
            }
        }
        b = false;
        }
    }






}

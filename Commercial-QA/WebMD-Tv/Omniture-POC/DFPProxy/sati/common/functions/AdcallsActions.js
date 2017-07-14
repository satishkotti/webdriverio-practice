var path = require('path');
var rootPath = path.normalize(__dirname);
var Page = require('./../pageobjects/page');
var webdriverio = require("webdriverio");

/* Glabal Variable Declaration */



var self = module.exports = {

    compareStrings: function (str1,str2) {
        str1.should.equal(str2);
    },

    extractCustParams : function(Adcall) {
        var cp;
        for (var x = 0; x < Adcall.length; x++) {
            if (Adcall[x].name == 'cust_params') {
                var temp = Adcall[x].value;
                console.log(temp);
                cp = temp.split('&');
            }
        }
        return cp;
    },

    extarctPVIDfromAdcall : function (Adcall) {
        var DFPpvid;
        var custparams = self.extractCustParams(Adcall);
        for (var s = 0; s < custparams.length; s++) {
            if (custparams[s].includes("pvid=")) {
                DFPpvid = custparams[s];
                DFPpvid = DFPpvid.substring(5);
                console.log("Extracted PVID from DFP"+DFPpvid);
            }
        }
        return DFPpvid;
    },

    extractPtfromAdcall : function (Adcall) {
        var DFPpt;
        var custparams = self.extractCustParams(Adcall);
        for (var s = 0; s < custparams.length; s++) {
            if (custparams[s].includes("pt=")) {
                DFPpt = custparams[s];
                DFPpt = DFPpt.substring(3);
                console.log(DFPpt);
            }
        }
        return DFPpt;
    },

    extractFiptfromAdcall : function (Adcall) {
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

    extractPOSValues: function (list){
        var l1 =[];
        for (x = 0; x < list.length; x++) {
            //console.log(strscpl[x]);
            if (list[x].includes("pos=")) {
                l1.push(list[x]);
            }
        }
        return l1;
    },

    verifyTwoLists: function (l1,l2) {

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

    extractParamsFromAdcall : function (Adcall,paramname) {

        for (var x = 0; x < Adcall.length; x++) {
            if (Adcall[x].name == paramname) {
                var requirestring = Adcall[x].value;
            }
        }
        return requirestring;
    },

    splitStringwithDelimiter: function (str1,delimeter) {
        var list = str1.split(delimeter);
        return list;
    },

}

var path = require('path');
var rootPath = path.normalize(__dirname);
var Page = require('./../../page');
var webdriverio = require("webdriverio");


module.exports = {
   comparePOS: function (qs1,qs2) {
        var temp, temp1, strscpl, strscpprod, f;
            var l1 = [], l2 = [];
            for (var x = 0; x < qs1.length; x++) {
                if (qs1[x].name == 'prev_scp') {
                    var temp = qs1[x].value;
                    // console.log(temp);
                    var temp1 = temp.split('&').join('|');
                    //  console.log("Lower Environment replace"+strscpl);
                    //  console.log("*****************************************");
                    strscpl = temp1.split('|');
                    //   console.log("Suceess Staging"+strscpl);
                    //  console.log(strscpl);
                }
                if (qs2[x].name == 'prev_scp') {
                    var temp = qs2[x].value;
                    //console.log("*****************************************");
                    //console.log(temp);
                    var temp1 = temp.split('&').join('|');
                    //  console.log("prod replace"+strscpprod);
                    //  console.log("*****************************************");
                    strscpprod = temp1.split('|');
                    //  console.log("Suceess Prod"+strscpprod);
                    //  console.log(strscpprod);

                }
            }

            for (x = 0; x < strscpl.length; x++) {
                //console.log(strscpl[x]);
                if (strscpl[x].includes("pos=")) {
                    l1.push(strscpl[x]);
                }
            }

            for (x = 0; x < strscpprod.length; x++) {
                //console.log(strscpl[x]);
                if (strscpprod[x].includes("pos=")) {
                    l2.push(strscpprod[x]);
                }
            }

            console.log("Only POS Values of Staging");
            console.log(l1);
            console.log("Only POS Values of Prod");
            console.log(l2);

            if (l1.length == l2.length) {
                console.log("Strings Matched");
                console.log(JSON.stringify(l1) == JSON.stringify(l2));
            }
            else {
                for (var s = 0; s < l1.length; s++) {
                    var counter = 0;
                    for (var a = 0; s < l2.length; a++) {
                        if (l1[s] == l2[a]) {
                            counter++;
                        }
                        if (counter == 2) {
                            console.log("Duplicated POS" + l2[a]);
                        }

                    }
                }
            }

    },

}

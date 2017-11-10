var page = require('./../../../../../page');
var wdioConf = require('./../../../../../wdio.conf.js');
var maxTimeOut= 3000;




var aimLoginPg = Object.create(page, {

 


    open: {
        value: function (url) {
            page.open(url);
        }
    },


});

module.exports = aimLoginPg
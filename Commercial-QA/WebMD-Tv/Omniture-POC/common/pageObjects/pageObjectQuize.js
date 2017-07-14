var Page = require('./page');
//var browser = require('../../config/wdioConfig');

e

var ArticlePage = Object.create(Page, {
    quize: { get: function (browser) { return browser.element('//*[@id="ContentPane28"]/div/ul/li[2]/a/span'); } },
    open: {
        value: function () {
            Page.open.call(this, testData.production.article);
        }
    },
});

module.exports = ArticlePage
var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
var Page = require('./../../../prdemo/page');
var rootPath = path.normalize(__dirname)
var input = require('./../../config/Webmd-tv')[argv.env];
var url = input.splash;
var splashpage = Object.create(Page, {
    /**
     * define elements
     */
    grids: { get: function () { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div[" + n + "]"); } },
    category: { get: function () { return browser.element("//h6[@class='category']"); } },
    videogridn: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div[" + n + "]//div[@class='overlay']//div[@class='button']//span[@class='txt']"); } },
    text: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div[" + n + "]//div[@class='overlay']//p[@class='title']"); } },
    grid1: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div[" + n + "]"); } },
    overlay: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div[" + n + "]//div[@class='overlay']"); } },
    watchnow: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div[" + n + "]//div[@class='overlay']//div[@class='button']//span[@class='icon']"); } },
    episode: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div[" + n + "]//div[@class='overlay']//p[@class='counter']//span[@class='default']"); } },
    sponsorepisode: { get: function () { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div[4]//div[@class='overlay']//p[@class='counter']//span[@class='sponsored']"); } },
    playbutton: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div[" + n + "]//div[@class='overlay']//div[@class='button']//span[@class='icon']"); } },
    image: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div[" + n + "]//img"); } },
    ad: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div[" + n + "]//div[@class='quote-ad-wrapper']"); } },
    onlyquote: { value: function (n) { return browser.element("#multimedia-grid > div > div:nth-child(" + n + ") > div > div > p.quote"); } },
    onlyquoteauthor: { value: function (n) { return browser.element("#multimedia-grid > div > div:nth-child(" + n + ") > div > div > p.quote-attr > span.name"); } },
    authorcity: { value: function (n) { return browser.element("#multimedia-grid > div > div:nth-child(" + n + ") > div > div > p.quote-attr > span.city"); } },
    authorstate: { value: function (n) { return browser.element("#multimedia-grid > div > div:nth-child(" + n + ") > div > div > p.quote-attr > span.state"); } },
    bluelinecolor: { value: function (n) { return browser.element("#multimedia-grid > div > div:nth-child(" + n + ") > div > span:nth-child(1)"); } },
    bottombluelinecolor: { value: function (n) { return browser.element("#multimedia-grid > div > div:nth-child(" + n + ") > div > span:nth-child(3)"); } },
    adscount: { value: function () { return browser.element("//div[@class='splashhead-wrapper clearfix']//img[2]"); } },
    ads: { value: function () { return browser.element("//div[@class='ad-wrapper']"); } },
    

    

    open: {
        value: function () {
            Page.open.call(this, url);
        }
    },

});
module.exports = splashpage

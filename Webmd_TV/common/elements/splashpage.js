var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
var Page = require('./../../page');
var rootPath = path.normalize(__dirname)
//var input = require('./../../config/Webmd-tv')[argv.env];
//var url = input.splash;
var splashpage = Object.create(Page, {
    /**
     * define elements
     */
    grids: { get: function () { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div[" + n + "]"); } },
    category: { get: function () { return browser.element("//h6[@class='category']"); } },
    videogridn: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div[" + n + "]//div[@class='overlay']//div[@class='button']//span[@class='txt']"); } },
    text: { value: function (n) { return browser.element("(//div[@id='multimedia-grid']//div[@class='item-duo-wrapper'])//div[" + n + "]//div[@class='overlay']//p[@class='title']"); } },
    grid1: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div[" + n + "]"); } },
    overlay: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div[" + n + "]//div[@class='overlay']"); } },
    watchnow: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div[" + n + "]//div[@class='overlay']//div[@class='button']//span[@class='txt']"); } },
    episode: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div[" + n + "]//div[@class='overlay']//p[@class='counter']//span[@class='default']"); } },
    sponsorepisode: { get: function () { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div[4]//div[@class='overlay']//p[@class='counter']//span[@class='sponsored']"); } },
    playbutton: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div[" + n + "]//div[@class='overlay']//div[@class='button']//span[@class='icon']"); } },
    image: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div[" + n + "]//img"); } },
    ad: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div[" + n + "]//div[@class='quote-ad-wrapper']"); } },
    quote: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div[" + n + "]//div[@class='quote-next-to-ad']//div[@class='quote-wrapper']/p[@class='quote']"); } },
    adquoteauthor: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div[" + n + "]//div[@class='quote-next-to-ad']//div[@class='quote-wrapper']/p[@class='quote-attr']/span[@class='name']"); } },
    adquotecity: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div[" + n + "]//div[@class='quote-next-to-ad']//div[@class='quote-wrapper']/p[@class='quote-attr']/span[@class='city']"); } },
    adquotestate: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div[" + n + "]//div[@class='quote-next-to-ad']//div[@class='quote-wrapper']/p[@class='quote-attr']/span[@class='state']"); } },
    bluelinecolor: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div[" + n + "]//div[@class='quote-ad-wrapper']//div[@class='quote-next-to-ad']/span[1]"); } },
    bottombluelinecolor: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div[" + n + "]//div[@class='quote-ad-wrapper']//div[@class='quote-next-to-ad']/span[2]"); } },
    //ads:{ value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div["+n+"]//div[@id='google_ads_iframe_/8668145/consumer/webmd_1__container__']//iframe"); } },-qa00
    ads: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div[" + n + "]//div[@class='quote-ad-wrapper']//div[@class='ad-wrapper']"); } },
    //adposition:{ value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div["+n+"]//div[@id='google_ads_iframe_/8668145/consumer/webmd_1__container__']//iframe"); } },-qa00
    adposition: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div[" + n + "]//div[@class='quote-ad-wrapper']//div[@class='ad-wrapper']"); } },
    adposition2: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div[" + n + "]//div[@class='quote-ad-wrapper']//div[@class='quote-next-to-ad']//div"); } },
    onlyquote: { value: function (n) { return browser.element("(//div[@id='multimedia-grid']//div[@class='item-duo-wrapper'])//div[" + n + "]//div[@class='quote-wrapper']//p[@class='quote']"); } },
    onlyquoteauthor: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div[" + n + "]//p[@class='quote-attr']//span[@class='name']"); } },
    authorcity: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div[" + n + "]//p[@class='quote-attr']//span[@class='city']"); } },
    authorstate: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div[" + n + "]//p[@class='quote-attr']//span[@class='state']"); } },
	videotext: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+n+"]//div[@class='overlay']//p[@class='counter']//span[@class='default']"); } },

    /**
* define or overwrite page methods
*/
    open: {
        value: function () {
            Page.open.call(this, url);
        }
    },

});
module.exports = splashpage

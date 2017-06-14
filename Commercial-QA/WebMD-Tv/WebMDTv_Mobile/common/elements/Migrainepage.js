var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
var Page = require('./../../../prdemo/page');
var rootPath = path.normalize(__dirname)

var input = require('./../../config/Webmd-tv')[argv.env];
var url = input.environment;
var migraine = Object.create(Page, {
    /**
     * define elements
     */
    gridtitle: { get: function () { return browser.element("//div[@class='list-header']"); } },
    grid1articletitle1: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[1]//h4'); } },
    grid1articletitle2: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[1]//h5'); } },
    grid2articletitle1: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[2]//h4'); } },
    grid2articletitle2: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[2]//h5'); } },
    grid3articletitle1: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[3]//h4'); } },
    grid3articletitle2: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[3]//h5'); } },
    grid1image: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[1]//img'); } },
    grid2image: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[2]//img'); } },
    grid3image: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[3]//img'); } },
    breadcrum: { get: function () { return browser.element("//section[@class='breadcrumb']/h6"); } },
    grid4articletitle1: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[4]//h4'); } },
    grid4articletitle2: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[4]//h5'); } },
    grid5articletitle1: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[5]//h4'); } },
    grid5articletitle2: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[5]//h5'); } },
    grid6articletitle1: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[6]//h4'); } },
    grid6articletitle2: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[6]//h5'); } },
    inforbartitle: { get: function () { return browser.element("//div[@class='info-container clearfix']/div[@class='title-section']/div[@class='title2']"); } },

    loadMore: { get: function () { return browser.element("//div[@class='load-more']"); } },

    filmstripelements: { get: function () { return browser.element("div.more-videos > div > ul > li"); } },
    /**
* define or overwrite page methods
*/
    open: {
        value: function () {
            Page.open.call(this, url);
        }
    },
    /*submit: { value: function() {
        this.form.submitForm();
    } },*/

});
module.exports = migraine

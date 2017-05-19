var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
var Page = require('./../../../prdemo/page');
var input=require('./../../config/rxtestdata')[argv.env];
var url=input.environment;
var searchhomepage = Object.create(Page, {
    /**
     * define elements
     */
    search: { get: function () { return browser.element('#name'); } },
    drug: { get: function () { return browser.element("//*[@id='home-searchForm']/form/ul[contains(@id,'typeahead')]"); } },
    drugheader:{get:function(){return browser.element("//span[contains(@class,'generic-subtext')]/following-sibling::h1");}},
    //form: { get: function () { return browser.element('#loginbtn'); } },
              /**
     * define or overwrite page methods
     */
    open: { value: function() {
        Page.open.call(this,url);
    } },
    /*submit: { value: function() {
        this.form.submitForm();
    } },*/

});
module.exports = searchhomepage

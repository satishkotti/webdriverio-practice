var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
//var functions = require(rootPath + '\\Helper\\PPE-104331-functions.js');
//var search.actions = require(rootPath + '\\Objectrepository\\objectrepository.js');
var search = require('./../../../../common/functions/search.actions.js');
//var Input = require(rootPath + '\\config\\rxtestdata.js')[argv.env];
var Input = require('./../../../../config/rxtestdata.js')[argv.env];;
var registrationurl = Input.url;
var url = Input.environment;


describe('Validation for font SOURCE SANS PRO with Bold 700,Regular 400,Light 300', function () {
  this.timeout(60000);
  it("Validation for SOURCE SANS PRO font- searchFooterInfo", function () {
    search.open();
    var actions=search.search();
    console.log(actions.sasank);
  });
});

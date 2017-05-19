var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var search = require('./../../../../common/functions/search.actions');
var Input = require('./../../../../config/rxtestdata')[argv.env];

describe('Validation for font SOURCE SANS PRO with Bold 700,Regular 400,Light 300', function () {
  this.timeout(60000);
  it("Validation for SOURCE SANS PRO font- searchFooterInfo", function () {
    var actions=search.search('Advil');
    console.log(actions.sasank);
    //actions.sasank.shoul.equal("Advil");
  });
});

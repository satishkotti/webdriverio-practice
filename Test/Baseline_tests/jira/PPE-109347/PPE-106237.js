var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var input = require('./../../../config/PPE-109347.testdata')[argv.env];
//var input = require('./../../config/PPE-101748.testdata')[argv.env];

var url = input.environment;
//var functions = require(rootPath + '\\Helper\\PPE-104331-functions.js');
//var search.actions = require(rootPath + '\\Objectrepository\\objectrepository.js');
var actn = require('./../../../common/functions/Common.actions');
var Commonlocators = require('./../../../common/elements/Common.elements');
describe('Verfiy Line of Entitlement displays in Desktops', function () {
  this.timeout(60000);
  it("Verfiy Line of Entitlement displays in Desktops", function () {
    // console.log(search.twitter);
   // actn.open();
//Commonlocators.open();
browser.url(url);
       var LOE = browser.getText(Commonlocators.LOE.selector);
    console.log(LOE);
   LOE.should.equal("The sponsor has sole editorial control. From Our Sponsor.");
   
  });
  });
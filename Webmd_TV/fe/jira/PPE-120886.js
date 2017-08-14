var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var assetpage = require('./../../common/functions/functions');
var spage = require('./../../common/actions/PPE-12886.actions')
var splashelement = require('./../../common/elements/webmdtvpage');
var rootPath = path.normalize(__dirname)
console.log(__dirname);
var Input = require('./../../config/Webmd-tv')[argv.env];
var splashpage = Input.splashpage;
 var Surveyclose=  splashelement.Surveyclose.selector;
 
describe('PPE-120886  Episodes Counter Is not Aligned Correctly', function () {
  
  it(' Verify Episodes counter text should be flush left and always left aligned under the Video Title ', function () {
    
 

  });

  
});
var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var assetpage = require('./../../common/functions/functions');
var spage = require('./../../common/actions/PPE-121307.actions')
var splashelement = require('./../../common/elements/webmdtvpage');
var rootPath = path.normalize(__dirname)
console.log(__dirname);
var Input = require('./../../config/Webmd-tv')[argv.env];
var splashpage = Input.splashpage;
 var Surveyclose=  splashelement.Surveyclose.selector;
 
describe('    PPE-121307 Style Poll Module', function () {
  
  it(' PPE-125153 Verify Poll Module is available ', function () {
   poll = spage.splashpollexist();
   poll.exist.should.equal(true);
   
 

  });

  it(' PPE-125154 Verify for the selected question User is able to autosubmit the answer for splash page', function () {              
 spage.splashpoll();
 
   
 
  }); 
  /*it('PPE-125155 Verify after autosubmit User is only able to reselect the answers for the question , when browser is refreshed', function () {              

 
  }); */
});
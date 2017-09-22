var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var functions = require('./../../common/functions/functions');
var spage = require('./../../common/actions/PPE-119379.actions')
var splashelement = require('./../../common/elements/webmdtvpage');
var rootPath = path.normalize(__dirname)
console.log(__dirname);
var Input = require('./../../config/Webmd-tv')[argv.env];
var splashpage = Input.splashpage;
 var Surveyclose=  splashelement.Surveyclose.selector;
 var readme;
describe('PPE-119379 > PPE-115090 Read more Module', function () {
  
  it(' PPE-125153 Verify Read more  is available ', function () {
    readme = spage.readmoreexist();
 readme.exist.should.equal(true);
  });

  it('PPE-119379 Verify Read more disclaimer content is  matching mock ', function () {              
readme = spage.readmoretext();
   readme.discclaimerexist.should.equal(true);
 
  }); 
});
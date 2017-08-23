var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var functions = require('./../../common/functions/functions');
var spage = require('./../../common/actions/PPE-121301.actions')
var splashelement = require('./../../common/elements/webmdtvpage');
var rootPath = path.normalize(__dirname)
console.log(__dirname);
var Input = require('./../../config/Webmd-tv')[argv.env];

 var Surveyclose=  splashelement.Surveyclose.selector;
 var artractionvotecntexist, videoractionvotecntexist,artractionvotecntopt, videoractionvotecntopt;
describe('     PPE-121301 Reaction Button Vote Count Display Optional ', function () {
  
  it('PPE-125660 Verify that number of votes count is displayed by default ', function () {
  videoractionvotecntexist = spage.reactionvotecntexist();
  videoractionvotecntexist.exist.should.equal(true);
    artractionvotecntexist = spage.reactionarticlevotecntexist();
  artractionvotecntexist.exist.should.equal(true);
 

  });

  it(' PPE-125661 Verify that number of votes count is not displayed when publishing turned-off', function () {
   videoractionvotecntopt = spage.reactionvotecntoptional();
   videoractionvotecntopt.exist.should.equal(false);
   artractionvotecntopt = spage.reactionarticlevotecntoptional();
   artractionvotecntopt.exist.should.equal(false);
   
 

  });
 
  it.only('PPE-125664 Verify that button is clickable on reloading the page', function () {
   spage.reactionvotecntclick();
  spage.reactionarticlevotecntclick();

  });
 
  
});

var webdriverio = require('webdriverio');
var should = require('should');
var assert = require('assert');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var assert = require("assert");
console.log(__dirname);
var ss_Actions = require('./../../common/functions/FE_Smoke_Toc_Actions');
//var ssElements = require('./../../common/elements/FE_Smoke_Toc_Elements');
//var Article_Actions = require('./../../common/functions/FE_Smoke_Article_Actions');

module.exports =
    {
        get_toctitle: function(){
            var Toc_title=browser.getTitle();
            console.log(Toc_title);
            Toc_title.should.containEql('FED2 Segment 1 TOC');
        },
        image_visibility: function (image) {
            var image=browser.isVisible(image);
            console.log(image);
            assert.equal(image,true);

        },
        masonarygrid_visibility: function(masonarygrid){
            var masonarygrid=browser.isVisible(masonarygrid);
            console.log(masonarygrid);
            assert.equal(masonarygrid,true);
        },
        seemore_working: function(seemore){
            browser.leftClick(seemore);
            browser.pause(1000);
        },
        Verify_ElementIsVisible:function(elements){

//browser.scroll(elements.elements_visible[i].scroll);
 var count =  elements.elements.length;
    for( i=0; i<count;i++)
  {
   if(browser.isVisible(elements.elements[i].locator))
   {
console.log(elements.elements[i].text," is visible");
   }
   else
   {
     console.log(elements.elements[i].text,"element is not visible");
   }
  }
},
 menuitem_working: function(menuitem){
            browser.leftClick(menuitem);
            browser.pause(1000);
        }

    }
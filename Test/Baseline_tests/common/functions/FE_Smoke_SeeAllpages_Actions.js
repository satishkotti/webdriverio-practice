
var webdriverio = require('webdriverio');
var should = require('should');
var assert = require('assert');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var assert = require("assert");
console.log(__dirname);
var sap_Actions = require('./../../common/functions/FE_Smoke_SeeAllpages_Actions');
//var ssElements = require('./../../common/elements/FE_Smoke_Toc_Elements');
//var Article_Actions = require('./../../common/functions/FE_Smoke_Article_Actions');

module.exports =
    {
        get_saptitle: function(){
            var sap_title=browser.getTitle();
            console.log(sap_title);
            //Toc_title.should.containEql('FED2 Segment 1 TOC');
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
        },
        page_header: function(page_header){
            var ph_visible=browser.isVisible(page_header);
            assert.equal(ph_visible,true);
        },
        see_all_grid: function(see_all_grid){
            var sag_visible=browser.isVisible(see_all_grid);
            assert.equal(sag_visible,true);
        },

    }
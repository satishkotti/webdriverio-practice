var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var pageobjects = require('./../../common/elements/FE_Smoke_Articles_ISI_Elements');
//var input = require('./../../../config/FE.testdata');
//var url = input.ISI_url;
module.exports = {

  verify_width_height: function (ele) {
    socialshareIcons.open();

    var icon = $(ele);
    var paddle = $(ele);
    //console.log(icon);
    var width = icon.getCssProperty('width');
    var height = icon.getCssProperty('height')

    var actions = {
      width: width,
      height: height

    }
    return actions;
  },

Verify_ElementIsVisible:function(elements){


 var count =  elements.elements.length;
    for( i=0; i<count;i++)
  {
  browser.scroll(elements.elements[i].scroll);
   if(browser.isExisting(elements.elements[i].locator))
   {
console.log(elements.elements[i].text," is visible");
   }
   else
   {
     console.log(elements.elements[i].text,"element is not visible");
   }
  }
},
// Not Required now
  // search: function (Icons, scroll_value) {

  //   pageobjects.open();
  //   browser.scroll(scroll_value);
  //   browser.pause(4000);
 
  // var breadcrumb_text = article_pageobjects.Breadcrumb.getText();
  //   var actions = {
  //     breadcrumb_text: breadcrumb_text,
  //     LOE_Text: LOE_Text,
  //   }
  //   return actions;
 
  // },


Click_Elements: function (Icons, scroll_value) {

    
    browser.scroll(scroll_value);
    browser.pause(4000);
    
    // This will click on social share icons
    browser.waitForVisible(Icons);
    browser.click(Icons);
    browser.pause(4000);

    var handle = browser.windowHandles();
    browser.window(handle.value[1]);

    var Page_title_Text = browser.getTitle();
    browser.close(handle[1]);

    var actions = {
      Page_title_Text: Page_title_Text,

    }
    return actions;
  },
 
  
  
}
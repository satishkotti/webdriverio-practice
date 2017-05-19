//verify_width_height : used to get the height and width of an element
//open : used to  navigate to page
//click_getWindowTitle :click on element and get the new window title and close the new opened window




var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var socialshareIcons = require('./../elements/Common.elements');
var input = require('./../../config/PPE-101748.testdata');

module.exports = {

  /*Description:used to get the height and width of an element
Params: ele - element locator value
returns: width - width , height - height*/ 

  verify_width_height: function (ele) {
    socialshareIcons.open();

    var icon = $(ele);
    //console.log(icon);
    var width = icon.getCssProperty('width');
    var height = icon.getCssProperty('height')
   // var text_text-decoration-line

    var actions = {
      width: width,
      height: height

    }
    return actions;
  },


verify_Css:function (ele, property) {
       var icon = $(ele);
        var value = icon.getCssProperty(property);
   
    return value;
  },

  verify_text_decoration: function (ele) {
   // socialshareIcons.open();

    var icon = $(ele);
    //console.log(icon);
    //browser.moveToObject(icon);
    var text_decoration_line = icon.getCssProperty('text-decoration-line');
   // console.log(text_decoration_line);
        var actions = {
      text_decoration_line: text_decoration_line,
      

    }
    return actions;
  },

  verify_background_color: function (ele) {
   // socialshareIcons.open();

    var icon = $(ele);
    //console.log(icon);
    //browser.moveToObject(icon);
    var background_color = icon.getCssProperty('background-color');
    console.log(background_color);
        var actions = {
      background_color: background_color,
      

    }
    return actions;
  },

  /*Description:used to get the height and width of an element
Params: Icons - clickable element locator value
        scroll_value - scrolls the page 
returns:  Navigated_Title- new window title
         Home_Title- Original window title*/ 
         
  click_getWindowTitle: function (Icons,scroll_value) {
    socialshareIcons.open();
    //It will verifies that element is visable
    
browser.scroll(scroll_value);
browser.waitForVisible(Icons, 4000);
//browser.pause(5000);
    //It will clicks on social share icon
    browser.click(Icons);
    browser.pause(10000);

    //It will handles the opened windows
    var handle = browser.windowHandles();
    console.log(handle.value[1]);
    //It will change focus to another window
    browser.window(handle.value[1]);

    //It will get the title of the current focusing window
    var Navigated_Title = browser.getTitle();
    //It will close the current opened window
    browser.close();

    var Home_Title = browser.getTitle();
    //  console.log(title1); 
    // Home_Title.should.equal();

    var actions = {
      Navigated_Title: Navigated_Title,
      Home_Title: Home_Title

    }
    return actions;
  },

    click_GetPage_Title: function (Icons,scroll_value) {
    //socialshareIcons.open();
    //It will verifies that element is visable
    var current_page = browser.getTitle();
browser.scroll(scroll_value);
browser.waitForVisible(Icons, 4000);
//browser.pause(5000);
    //It will clicks on social share icon
    browser.click(Icons);
    browser.pause(10000);

    //It will get the navigated window title
    var navigated_title = browser.getTitle();

    console.log(current_page);
    console.log(navigated_title);


    var actions = {
      current_page: current_page,
      navigated_title: navigated_title

    }
    return actions;
  },
}
var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var PlayerOptions = require('./../../common/elements/WebMDtv');
           

module.exports = {

  get_cssValue: function (objElement, property) {
 //var 
 try {
   if (property == 'color') {
     return ((objElement.getCssProperty(property)).parsed.hex);
    } else {
      return ((objElement.getCssProperty(property)).value);
    }
  } catch (error) {
    console.log('Element with selector: ' + objElement.selector + ' is not displayed');
  }
},

/* -- This Method would get the text from the page-- */

    get_Text: function (objElement) {
    try {
      return (objElement.getText());
    } catch (error) {
      console.log('Element with selector: ' + objElement.selector + ' is not displayed');
    }
  },
    is_Visible: function (objElement) {
    try {
      return (objElement.isVisible());
    } catch (error) {
      console.log('Element with selector: ' + objElement.selector + ' is not displayed');
    }
  },

  handlePopup: function (ele){
    var boolean = is_Visible(ele);
     if (boolean == true){
       browser.click();
     }
  },

    is_Existing: function (objElement) {
    try {
      return (objElement.isExisting());
    } catch (error) {
      console.log('Element with selector: ' + objElement.selector + ' is not Existing');
    }
  },

  
  elements: function (objElement) {
    try {
      return (objElement.elements());
    } catch (error) {
      console.log('Element with selector: ' + objElement.selector + ' is not Existing');
    }
  },

  cssProperties: function (objElement) {
    var properties = [];
    var fontSize = (objElement.getCssProperty('font-size').value);
    properties['fontSize']=  fontSize ;
    var fontColor = (objElement.getCssProperty('color').parsed.hex);
    properties['fontColor'] =  fontColor ;
    var fontFamily = (objElement.getCssProperty('font-family').value);
    properties['fontFamily'] =  fontFamily;
    var height = (objElement.getCssProperty('height').value);
    properties['height'] = height;
   var width = (objElement.getCssProperty('width').value);
    properties['width'] = width;
    var backgroundcolor = (objElement.getCssProperty('background').parsed.hex);
    properties['backgroundcolor'] = backgroundcolor;
    return properties;
  },


    Socialshare_validations: function (Icons, scroll_value) {

        browser.scroll(scroll_value)
        browser.pause(4000);
        //browser.click(element);
        //It will click on social share icons
        browser.waitForVisible(Icons)
        browser.click(Icons)
        browser.pause(4000)

        var handle = browser.windowHandles()
        browser.window(handle.value[1])

        var Page_title_Text = browser.getTitle()
        browser.close(handle[1])
        var actions = {
            Page_title_Text: Page_title_Text,

        }
        return actions
    },

  arraysAreEqual: function (array1, array2) {
    if (array1.length !== array1.length)
      return false;
    for (var i = 0, len = array1.length; i < len; i++) {
      if (array1[i] !== array2[i]) {
        console.log('mismatch at ' + array1[i] + ' to : ' + array2[i]);
        return false;
      }
    }
    return true;
  },
     //checks functionality of the full screen button  present on the video control bar
        check_working_of_full_screen_button: function (ele,ele1) {
            var normal_height = browser.getCssProperty(ele, 'height');
            console.log(normal_height);
            browser.click(ele1);
            var full_screen_height = browser.getCssProperty(ele, 'height');
            console.log(full_screen_height);
             browser.click(ele1);
            return full_screen_height.parsed.value;
        },
        currentVideoTimestampVerification: function (ele,ele1) {
            //browser.pause(3000);
            browser.click(ele);
                browser.pause(20000);
            for (i = 0; i <= 50; i++) // Looping is used to verify that the current time mentioned in if condition on every iteration
            {
                //browser.moveToObject(videoElements.akamai_video.selector);
                
                var currentTime = browser.getText(ele1);
                //console.log("current Time" + currentTime);
                
                var currentVideoTimestamp = currentTime.split(":");  // Getting the current running time of the video and splitting it to hrs and mints
                if (currentVideoTimestamp[1] > 01 || currentVideoTimestamp[1] < 05) {
                    // Checking the condition that mts or sec are greater than "0". if the seconds nuber is greate than "0" means that video has already started
                    return (currentVideoTimestamp[1]);  // Displaying the current video time
                    break; // Once the condition is met break the loop and will come out of the loop
                }
                else {
                    return (currentVideoTimestamp[1]);
                }
            }
        },
 //checks visibility of Element present on the page
        Element_visibility: function (element) {
            //browser.touch(videoElements.akamai_video.selector);
            //browser.s
            browser.pause(3000);
            var Element_visible = browser.isVisible(element);
            return Element_visible;
        },

}
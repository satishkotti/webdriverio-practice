var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
//var searchhomepage = require('./../elements/elements');
//var input = require('./../../config/rxtestdata');

module.exports = {
  open_Page: function () {
    try {
      searchhomepage.open();
    } catch (error) {
      console.log('page is not displayed');
    }
  },
  close_Overlay: function () {
    try {
      var isdisplayed = browser.isVisible('#webmdHoverClose');
      if (isdisplayed) {
        console.log('overlay:true');
        browser.click('#webmdHoverClose');
      }
    } catch (error) {
      console.log('overlay:false');
    }
  },
  get_Text: function (objElement) {
    try {
      return (objElement.getText());
    } catch (error) {
      console.log('Element with selector: ' + objElement.selector + ' is not displayed');
    }
  },

  get_cssValue: function (objElement, property) {
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
  is_Visible: function (objElement) {
    try {
      return (objElement.isVisible());
    } catch (error) {
      console.log('Element with selector: ' + objElement.selector + ' is not displayed');
    }
  },
  get_LocationInView: function (objElement) {
    try {
      return (objElement.getLocationInView());
    } catch (error) {
      console.log('Element with selector: ' + objElement.selector + ' is not displayed');
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
  position: function (objElement1, objElement2) {
    var postion;

    try {
      var height1 = objElement1.getAttribute('offsetLeft');
      var height2 = objElement2.getAttribute('offsetLeft');

      console.log(height1);
      console.log(height2);
      if (height1 > height2) {
        console.log('Element' + objElement1.selector + ' is displayed top to ' + objElement2.selector);
        postion = 'below';
        return postion;
      }
      else {
        console.log('Element' + objElement1.selector + ' is displayed below to ' + objElement2.selector);
        postion = 'above';
        return postion;
      }
    } catch (error) {
      console.log('Element height property can not be determined')
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


}

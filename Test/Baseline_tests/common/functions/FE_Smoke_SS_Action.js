
var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var assert = require("assert");
console.log(__dirname);
var ss_Actions = require('./../../common/functions/FE_Smoke_SS_Action');
var ssElements = require('./../../common/elements/FE_Smoke_SS_Elements');
var Article_Actions = require('./../../common/functions/FE_Smoke_Article_Actions');


module.exports =
    {
 search: function (Icons, scroll_value) {

    ssElements.open();
    var breadcrumb_text = ssElements.Breadcrumb.getText();
    var flag_visible = browser.isVisible(Icons);
    browser.pause(4000);

    var actions = {
      breadcrumb_text: breadcrumb_text,
      flag_visible: flag_visible,
    }
    return actions;
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
 menuitem_working: function(menuitem)
 {
            browser.windowHandleMaximize();   
            browser.scroll(menuitem);  
            browser.pause(2000); 
            browser.click(menuitem);
            browser.pause(2000);
        },

        imageandtitle_visibility: function () {

            var elements = browser.getText(ssElements.slides_Count.selector);
            for (var i = 1; i < parseInt(elements) - 1; i++) {

                browser.leftClick(ssElements.secondary_next.selector);
                var img=browser.isVisible('//div [@id="dyn-ss"]//div [@class="bx-wrapper"]//div [@class="slide"]["+i+"]//div [@class="image"]/img');
                console.log(img[i]);
               //var imagevisible = browser.isVisible('//div [@id="dyn-ss"]//div [@class="bx-wrapper"]//div [@class="slide"]["+i+"]//div [@class="image"]/img');
                var titlevisible = browser.isVisible('//div [@class="slides"]//div [@class="slide"]["+i+"]//div [@class="caption"]/h2');
              //var image_status = assert.equal(img[i], true);
                var title_status = assert.equal(titlevisible[i], true);
                assert.equal(img[i], true);
                assert.equal(titlevisible[i], true);
                browser.pause(1000);
            }
                  for (var i = elements; ((i <= elements) && (i != 2)); i--) 
            {
                browser.leftClick('//div [@id="dyn-ss"]//div [@class="controls primary"]//a [@class="prev"]/i');
                browser.pause(1000); 
            }
                /*
                  var actions = 
                 {
                 titlevisible: titlevisible,
                  titlevisible: titlevisible,
                  }
                 return actions;
                 */


        },
        //Verify that Disclaimer text is visible on the vrey first slide
        Disclaimer_visibility: function () {
            var elements = browser.getText(ssElements.slides_Count.selector);
            for (var i = 1; i < parseInt(elements) - 1; i++) {
                if (i == 1) {
                    var sourcerightvisible = browser.isVisible('//div [@class="sources"]//div [@class="sources-right"]//p [@class="disclaimer"]');
                    assert.equal(sourcerightvisible, true);
                }
                else {
                    var sourcerightvisible = browser.isVisible('//div [@class="sources"]//div [@class="sources-right"]//p [@class="disclaimer"]');
                    assert.equal(sourcerightvisible, false);
                }
                browser.leftClick("//div[@class='controls secondary']/a[@class='next']/i");
                var sourcevisible = browser.isVisible('//div [@id="ContentPane31"]//div [@class="sources"]//div [@class="sources-left"]/p/a');
                assert.equal(sourcevisible, true);
                browser.pause(1000);
            }
                    for (var i = elements; ((i <= elements) && (i != 2)); i--) 
            {
                browser.leftClick('//div [@id="dyn-ss"]//div [@class="controls primary"]//a [@class="prev"]/i');
                browser.pause(1000); 
            }
        },

        background_color_secondary: function () {
            var elements = browser.getText(ssElements.slides_Count.selector);
            for (var i = 1; i < parseInt(elements) - 1; i++) {
                if (i == 1) {
                    var backgroundcolorp = browser.getCssProperty('//div [@id="dyn-ss"]//div [@class="controls-secondary-cont"]//a [@class="prev first"]/i', 'background-color');
                    console.log(backgroundcolorp);
                    assert.equal(backgroundcolorp.parsed.hex, '#dbdad9');
                    var enable = browser.isVisible('//div [@id="dyn-ss"]//a [@class="prev"]/i');
                    console.log(enable);
                    //assert.equal(enable, false);

                }
                if (i > 1) //2 
                {
                    var leftarrowbuttonenabled = browser.isEnabled('//div [@id="dyn-ss"]//a [@class="prev"]/i');
                    assert.equal(leftarrowbuttonenabled[0], true)
                }
                browser.leftClick("//div[@class='controls secondary']/a[@class='next']/i");
                var backgroundcolorn = browser.getCssProperty("//div[@class='controls secondary']/a[@class='next']/i", 'background');
                //console.log(backgroundcolorn);
                assert.equal(backgroundcolorn.parsed.hex, '#1b88bf');
                browser.pause(1000);
            }
                        for (var i = elements; ((i <= elements) && (i != 2)); i--) 
            {
                browser.leftClick('//div [@id="dyn-ss"]//div [@class="controls primary"]//a [@class="prev"]/i');
                browser.pause(1000); 
            }
            // --not required
            /*
            for (var i = elements; ((i <= elements) && (i != 2)); i--) 
            {
                browser.leftClick('//div [@id="dyn-ss"]//a [@class="prev"]/i');
                var backgroundcolorp = browser.getCssProperty('//div [@id="dyn-ss"]//a [@class="prev"]/i', 'background');
                //console.log(backgroundcolorp[0].parsed.hex);
                assert.equal(backgroundcolorp[0].parsed.hex, '#1b88bf');
                browser.pause(1000);
            }*/
        },
        source_working: function () {
            var elements = browser.getText(ssElements.slides_Count.selector);
            for (var i = 1; i < parseInt(elements) - 1; i++) {
                browser.leftClick("//div[@class='controls secondary']/a[@class='next']/i");
                //browser.scroll(".//*[@id='ContentPane31']/div[2]/div[1]/p/a");
                browser.leftClick(".//*[@id='ContentPane31']/div[2]/div[1]/p/a");
                //browser.leftClick(".//*[@id='ContentPane31']/div[2]/div[1]/p/a");
                browser.leftClick(".//*[@id='ContentPane31']/div[2]/div[1]/div[1]/span");
                browser.pause(1000);
            }
                     for (var i = elements; ((i <= elements) && (i != 2)); i--) 
            {
                browser.leftClick('//div [@id="dyn-ss"]//div [@class="controls primary"]//a [@class="prev"]/i');
                browser.pause(1000); 
            }
        },
        background_color_primary: function () {
            var elements = browser.getText(ssElements.slides_Count.selector);
            console.log(elements);
            for (var i = 1; i < parseInt(elements) - 1; i++) {
                if (i == 1) {
                    var backgroundcolorp = browser.getCssProperty('//div [@id="dyn-ss"]//div [@class="controls primary"]//a [@class="prev first"]/i', 'background-color');
                    console.log(backgroundcolorp);
                    assert.equal(backgroundcolorp.parsed.hex, '#dbdad9');
                    var visible = browser.isVisible('//div [@id="dyn-ss"]//div [@class="controls primary"]//a [@class="prev"]/i');
                    assert.equal(visible, false);
                    console.log(visible);
                }
                browser.leftClick('//div [@class="controls primary"]//a [@class="next"]/i');
                var backgroundcolorn = browser.getCssProperty('//div [@class="controls primary"]//a [@class="next"]/i', 'background');
                //console.log(backgroundcolorn);
                assert.equal(backgroundcolorn.parsed.hex, '#1b88bf');
                browser.pause(1000);
            }
                      for (var i = elements; ((i <= elements) && (i != 2)); i--) 
            {
                browser.leftClick('//div [@id="dyn-ss"]//div [@class="controls primary"]//a [@class="prev"]/i');
                browser.pause(1000); 
            }
            //Not required
            /*
            for (var i = elements; ((i <= elements) && (i != 2)); i--) {
                browser.leftClick('//div [@id="dyn-ss"]//div [@class="controls primary"]//a [@class="prev"]/i');
                var backgroundcolorp = browser.getCssProperty('//div [@id="dyn-ss"]//div [@class="controls primary"]//a [@class="prev"]/i', 'background');
                console.log(backgroundcolorp.parsed.hex);
                assert.equal(backgroundcolorp.parsed.hex, '#1b88bf');
                browser.pause(1000);
            }*/
        },
        check_primary_next_previous_button: function () {
            var elements = browser.getText(ssElements.slides_Count.selector);
            for (var i = 1; i < parseInt(elements) - 1; i++) 
            {
                var currentslide = browser.getText(ssElements.secondary_currslide.selector);
                //console.log(currentslide);
                browser.leftClick('//div [@class="controls primary"]//a [@class="next"]/i');
                browser.pause(1000);
                currentslide++;
                var curr_slide = browser.getText(ssElements.secondary_currslide.selector);
                if ((currentslide) == (curr_slide)) 
                {
                    console.log("next button is working");
                }
                
            }
            for (var i = elements; ((i <= elements) && (i != 2)); i--) 
            {
                var currentslide = browser.getText(ssElements.secondary_currslide.selector);
                browser.leftClick('//div [@id="dyn-ss"]//div [@class="controls primary"]//a [@class="prev"]/i');
                browser.pause(1000);
                currentslide--;
                var curr_slide = browser.getText(ssElements.secondary_currslide.selector);
                if (currentslide == curr_slide) {
                    console.log("previous button is working");
                }
               
            }
        },
        check_secondary_next_previous_button: function () 
        {
            var elements = browser.getText(ssElements.slides_Count.selector);
            //console.log(elements);
            for (var i = 1; i < parseInt(elements) - 1; i++) 
            {
                var currentslide = browser.getText(ssElements.secondary_currslide.selector);
                browser.leftClick("//div[@class='controls secondary']/a[@class='next']/i");
                browser.pause(1000);
                currentslide++;
                var curr_slide = browser.getText(ssElements.secondary_currslide.selector);
                if ((currentslide) == (curr_slide)) {
                    console.log("next button is working");
            }
                
            }
            for (var i = elements; ((i <= elements) && (i != 2)); i--) 
            {
                var currentslide = browser.getText(ssElements.secondary_currslide.selector);
                //console.log(currentslide);
                browser.leftClick('//div [@id="dyn-ss"]//a [@class="prev"]/i');
                browser.pause(2000);
                currentslide--;
                var curr_slide = browser.getText(ssElements.secondary_currslide.selector);
                if (currentslide == curr_slide) 
                {
                    console.log("previous button is working");
                }
                
            }

        },
            get_primary_currslide: function (i) 
            {
    //socialshareIcons.open();

    var curr_slide = "//div[1]/div/div/div["+i+"]/div[2]/div/span[1]";
    return curr_slide;
  },

        check_image_validation: function () 
        {
            var primary_cur_slide, secondary_curr_slide, slide_num;
            var slides_Count = browser.getText(ssElements.slides_Count.selector);//r
            for (var i = 1; i <= parseInt(slides_Count) - 1; i++) {
                secondary_curr_slide = browser.getText(ssElements.secondary_currslide.selector);//get the bottom current slide num
                //click on the image on SS
                browser.pause(2000);
                browser.scroll(ssElements.image.selector);
                browser.click(ssElements.image.selector);//r
                if (get_primary_currslide(secondary_curr_slide))
                    secondary_curr_slide++; //increment the curr slide num   
                slide_num = browser.getText(ssElements.secondary_currslide.selector);//get the slide num of current slide
                primary_cur_slide =get_primary_currslide(slide_num);
                // top current slide number  and bottom current slide number shoulb be equal to slide num
                if ((primary_cur_slide === slide_num) && (secondary_curr_slide === slide_num))
                   return true;

                   // console.log("clicking on the image on desktop on slideshow moves to next slide");
                else
                return false;
                   // console.log("clicking on the image on desktop on slideshow not moving to next slide");
            }
        }
  
    }

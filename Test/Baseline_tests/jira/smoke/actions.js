   
/*var assert=require("assert");
describe("current slide validatio",function(){
   it("should validate image and title are visible on the page",function(){
        browser.url("http://www.preview.webmd.com/diet/ss/slideshow-healthy-eating-resolutions");
        //browser.refresh();
        browser.leftClick('//div[@id="colorbox"]//div[@id="webmdHoverWrapper"]//div[@id="webmdHoverContent"]//div[@id="webmdHoverClose"]');
        check_visibility();
        
    });
});*/
    
  module.exports = {

     imageandtitle_visibility : function(){
    
    var elements=browser.getText(".//*[@id='dyn-ss']/div[4]/div/div/span[3]");
        for (var i=1;i<elements-1;i++){
                browser.leftClick("//div[@class='controls secondary']/a[@class='next']/i");
                var imagevisible=browser.isVisible('//div [@id="dyn-ss"]//div [@class="bx-wrapper"]//div [@class="slide"]["+i+"]//div [@class="image"]/img');
                var titlevisible=browser.isVisible('//div [@class="slides"]//div [@class="slide"]["+i+"]//div [@class="caption"]/h2');
                var status=assert.equal(imagevisible[i],true);
                assert.equal(titlevisible[i],true);
                browser.pause(1000);     
        } 
        for (var i=elements;((i<=elements) && (i != 2));i--){
                browser.leftClick('//div [@id="dyn-ss"]//a [@class="prev"]/i');
         }

       }, 
       source_visibility : function(){
            var elements=browser.getText(".//*[@id='dyn-ss']/div[4]/div/div/span[3]");
            for (var i=1;i<elements-1;i++){
               if(i == 1 )
                {
                    var sourcerightvisible=browser.isVisible('//div [@class="sources"]//div [@class="sources-right"]//p [@class="disclaimer"]');
                    console.log(sourcerightvisible);
                    assert.equal(sourcerightvisible,true);
                }
                else
                {
                    var sourcerightvisible=browser.isVisible('//div [@class="sources"]//div [@class="sources-right"]//p [@class="disclaimer"]');
                    console.log(sourcerightvisible);
                    assert.equal(sourcerightvisible,false);
                }
            browser.leftClick("//div[@class='controls secondary']/a[@class='next']/i");
            var sourcevisible=browser.isVisible('//div [@id="ContentPane31"]//div [@class="sources"]//div [@class="sources-left"]/p/a');
            assert.equal(sourcevisible,true);
            browser.pause(1000);
        }
         for (var i=elements;((i<=elements) && (i != 2));i--){
                browser.leftClick('//div [@id="dyn-ss"]//a [@class="prev"]/i');
         }
       },
       background_color_secondary : function(){
           var elements=browser.getText(".//*[@id='dyn-ss']/div[4]/div/div/span[3]");
            for (var i=1;i<elements-1;i++){
                 if(i == 1)
                 {
                    var backgroundcolorp=browser.getCssProperty('//div [@id="dyn-ss"]//div [@class="controls-secondary-cont"]//a [@class="prev first"]/i','background-color');
                    console.log(backgroundcolorp);
                    assert.equal(backgroundcolorp.parsed.hex,'#dbdad9');
                    var visible=browser.isVisible('//div [@id="dyn-ss"]//a [@class="prev"]/i');
                    assert.equal(visible,false); 
                    console.log(visible); 
                }
                if(i > 2){
                    var leftarrowbuttonvisible=browser.isVisible('//div [@id="dyn-ss"]//a [@class="prev"]/i');
                    console.log(leftarrowbuttonvisible[0]);
                    assert.equal(leftarrowbuttonvisible[0],true)
                }
                browser.leftClick("//div[@class='controls secondary']/a[@class='next']/i");
                var backgroundcolorn=browser.getCssProperty("//div[@class='controls secondary']/a[@class='next']/i",'background');
                //console.log(backgroundcolorn);
                assert.equal(backgroundcolorn.parsed.hex,'#1b88bf');
                browser.pause(1000);
            }
            for (var i=elements;((i<=elements) && (i != 2));i--){
                browser.leftClick('//div [@id="dyn-ss"]//a [@class="prev"]/i');
                var backgroundcolorp=browser.getCssProperty('//div [@id="dyn-ss"]//a [@class="prev"]/i','background');
                //console.log(backgroundcolorp[0].parsed.hex);
                assert.equal(backgroundcolorp[0].parsed.hex,'#1b88bf'); 
                browser.pause(1000);
            }
       },
       source_working : function(){
           var elements=browser.getText(".//*[@id='dyn-ss']/div[4]/div/div/span[3]");
            for (var i=1;i<elements-1;i++){
                browser.leftClick("//div[@class='controls secondary']/a[@class='next']/i");
                //browser.scroll(".//*[@id='ContentPane31']/div[2]/div[1]/p/a");
                browser.leftClick(".//*[@id='ContentPane31']/div[2]/div[1]/p/a");
                //browser.leftClick(".//*[@id='ContentPane31']/div[2]/div[1]/p/a");
                browser.leftClick(".//*[@id='ContentPane31']/div[2]/div[1]/div[1]/span");
                browser.pause(1000);
            }
              for (var i=elements;((i<=elements) && (i != 2));i--){
                browser.leftClick('//div [@id="dyn-ss"]//a [@class="prev"]/i');
                browser.pause(1000);
            }
       },
       background_color_primary : function(){
           var elements=browser.getText(".//*[@id='dyn-ss']/div[4]/div/div/span[3]");
        console.log(elements);
            for (var i=1;i<elements-1;i++){
                if(i == 1)
                {
                    var backgroundcolorp=browser.getCssProperty('//div [@id="dyn-ss"]//div [@class="controls primary"]//a [@class="prev first"]/i','background-color');
                    console.log(backgroundcolorp);
                    assert.equal(backgroundcolorp.parsed.hex,'#dbdad9'); 
                    var visible=browser.isVisible('//div [@id="dyn-ss"]//div [@class="controls primary"]//a [@class="prev"]/i');
                    assert.equal(visible,false); 
                    console.log(visible);  
                }
                browser.leftClick('//div [@class="controls primary"]//a [@class="next"]/i');
                var backgroundcolorn=browser.getCssProperty('//div [@class="controls primary"]//a [@class="next"]/i','background');
                //console.log(backgroundcolorn);
                assert.equal(backgroundcolorn.parsed.hex,'#1b88bf');
                browser.pause(1000);
            }
            for (var i=elements;((i<= elements) && (i != 2));i--){
                browser.leftClick('//div [@id="dyn-ss"]//div [@class="controls primary"]//a [@class="prev"]/i');
                var backgroundcolorp=browser.getCssProperty('//div [@id="dyn-ss"]//div [@class="controls primary"]//a [@class="prev"]/i','background');
                console.log(backgroundcolorp.parsed.hex);
                assert.equal(backgroundcolorp.parsed.hex,'#1b88bf'); 
                browser.pause(1000);
            }
       },
       check_primary_next_previous_button : function(){
            var elements=browser.getText(".//*[@id='dyn-ss']/div[4]/div/div/span[3]");
        console.log(elements);
            for (var i=1;i<elements-1;i++){
                var currentslide=browser.getText(".//*[@id='dyn-ss']/div[4]/div/div/span[@class='current']");
                //console.log(currentslide);
                browser.leftClick('//div [@class="controls primary"]//a [@class="next"]/i');
                browser.pause(1000);
                currentslide++;
                var curr_slide = browser.getText(".//*[@id='dyn-ss']/div[4]/div/div/span[@class='current']");
                    if((currentslide) == (curr_slide)){
                    console.log("next button is working");
                    }
            console.log(currentslide);
            console.log(curr_slide);
            }
            for (var i=elements;((i<=elements) && (i != 2));i--){
                var currentslide=browser.getText(".//*[@id='dyn-ss']/div[4]/div/div/span[@class='current']");
                console.log(currentslide);
                browser.leftClick('//div [@id="dyn-ss"]//div [@class="controls primary"]//a [@class="prev"]/i');
                browser.pause(1000);
                currentslide--;
                var curr_slide = browser.getText(".//*[@id='dyn-ss']/div[4]/div/div/span[@class='current']");
                    if(currentslide == curr_slide){
                        console.log("previous button is working");
                    }
                console.log(currentslide);
                console.log(curr_slide);
            }
       },
       check_secondary_next_previous_button : function(){
           var elements=browser.getText(".//*[@id='dyn-ss']/div[4]/div/div/span[3]");
        //console.log(elements);
            for (var i=1;i<elements-1;i++){
                var currentslide=browser.getText(".//*[@id='dyn-ss']/div[4]/div/div/span[@class='current']");
                browser.leftClick("//div[@class='controls secondary']/a[@class='next']/i");
                browser.pause(1000);
                currentslide++;
                var curr_slide = browser.getText(".//*[@id='dyn-ss']/div[4]/div/div/span[@class='current']");
                if((currentslide) == (curr_slide)){
                    console.log("next button is working");
                }
            //console.log(currentslide);
            //console.log(curr_slide);
            }
            for (var i=elements;((i<=elements) && (i != 2));i--){
                var currentslide=browser.getText(".//*[@id='dyn-ss']/div[4]/div/div/span[@class='current']");
                //console.log(currentslide);
                browser.leftClick('//div [@id="dyn-ss"]//a [@class="prev"]/i');
                browser.pause(2000);
                currentslide--;
                var curr_slide = browser.getText(".//*[@id='dyn-ss']/div[4]/div/div/span[@class='current']");
                    if(currentslide == curr_slide){
                        console.log("previous button is working");
                    }
                console.log(currentslide);
                console.log(curr_slide);
            }
           
       },
       check_working_of_rightarrow: function () {
           var slides_Count = browser.getText(ssElements.slides_Count.selector);
           var primary_cur_slide, secondary_curr_slide, slide_num;
           for (var i = 1; i <= slides_Count - 1; i++) {
               secondary_curr_slide = browser.getText(ssElements.secondary_currslide.selector);
               //click on the boittom  next navigation button 
               browser.click(ssElements.secondary_next.selector);
               secondary_curr_slide++; //increment the curr slide num   
               slide_num = browser.getText(ssElements.secondary_currslide.selector);//get the slide num of current slide
               primary_cur_slide = ss_Actions.get_primary_currslide(slide_num);
               // top current slide number  and bottom current slide number shoulb be equal to slide num
               if ((primary_cur_slide === slide_num) && (secondary_curr_slide === slide_num))
                   console.log("bootom next navigation is working fine");
               else
                   console.log("bottom next navigtaion btton is not working");

               //click on the top  next navigation button 
               browser.click(ssElements.secondary_currslide.selector);
               secondary_currslide++; //increment the curr slide num   
               slide_num = browser.getText(ssElements.secondary_currslide.selector);//get the slide num of current slide
               primary_cur_slide = ss_Actions.get_primary_currslide(slide_num);
               // top current slide number  and bottom current slide number shoulb be equal to slide num
               if ((primary_cur_slide === slide_num) && (secondary_curr_slide === slide_num))
                   console.log("top next navigation is working fine");
               else
                   console.log("top  next navigtaion button is not working");
           }
       },
       check_working_of_leftarrow: function () {
           var slides_Count = browser.getText(ssElements.slides_Count.selector);
           var primary_cur_slide, secondary_curr_slide, slide_num;
           for (var i = 1; i <= slides_Count - 1; i++) {

               secondary_curr_slide = browser.getText(ssElements.secondary_currslide.selector);
               //click on the bottom  prev navigation button 
               browser.click(ssElements.secondary_prev.selector);
               secondary_curr_slide--; //decrement the curr slide num   
               slide_num = browser.getText(ssElements.secondary_currslide.selector);//get the slide num of current slide
               primary_cur_slide = ss_Actions.get_primary_currslide(slide_num);
               // top current slide number  and bottom current slide number shoulb be equal to slide num
               if ((primary_cur_slide === slide_num) && (secondary_curr_slide === slide_num))
                   console.log("bootom prev navigation is working fine");
               else
                   console.log("bottom prev navigtaion button is not working");

               //click on the top  next navigation button 
               browser.click(ssElements.secondary_currslide.selector);
               primary_cur_slide--; //decrement the curr slide num   
               slide_num = browser.getText(ssElements.primary_next.selector);//get the slide num of current slide
               primary_cur_slide = ss_Actions.get_primary_currslide(slide_num);
               // top current slide number  and bottom current slide number shoulb be equal to slide num
               if ((primary_cur_slide === slide_num) && (secondary_curr_slide === slide_num))
                   console.log("top prev navigation is working fine");
               else
                   console.log("top  prev navigtaion button is not working");
           }
       },
       check_image_validation : function () {
           var primary_cur_slide, secondary_curr_slide, slide_num;
           for (var i = 1; i <= slides_Count - 1; i++) {
               secondary_curr_slide = browser.getText(ssElements.secondary_currslide.selector);//get the bottom current slide num
               //click on the image on SS
               browser.click(ssElements.image.selector);
               if (ss_Actions.get_primary_currslide(secondary_curr_slide))
                   secondary_curr_slide++; //increment the curr slide num   
               slide_num = browser.getText(ssElements.secondary_currslide.selector);//get the slide num of current slide
               primary_cur_slide = ss_Actions.get_primary_currslide(slide_num);
               // top current slide number  and bottom current slide number shoulb be equal to slide num
               if ((primary_cur_slide === slide_num) && (secondary_curr_slide === slide_num))
                   console.log("clicking on the image on desktop on slideshow moves to next slide");
               else
                   console.log("clicking on the image on desktop on slideshow not moving to next slide");
           }
       }
  }       
   
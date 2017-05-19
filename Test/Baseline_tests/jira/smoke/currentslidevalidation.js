var actions=require('./actions');
var assert=require("assert");
describe("current slide validatio",function(){
   it("should validate secondary next slide is working",function(){
        browser.url("http://www.preview.webmd.com/diet/ss/slideshow-healthy-eating-resolutions");
        browser.leftClick('//div[@id="colorbox"]//div[@id="webmdHoverWrapper"]//div[@id="webmdHoverContent"]//div[@id="webmdHoverClose"]');
        actions.check_secondary_next_previous_button();  
    });
    it("should validate background color and visibility of secondary next and previous button",function(){
        //browser.url("http://www.preview.webmd.com/diet/ss/slideshow-healthy-eating-resolutions");
        //browser.leftClick('//div[@id="colorbox"]//div[@id="webmdHoverWrapper"]//div[@id="webmdHoverContent"]//div[@id="webmdHoverClose"]');
        actions.background_color_secondary(); 
    });
     it("should validate primary next slide",function(){
        //browser.url("http://www.preview.webmd.com/diet/ss/slideshow-healthy-eating-resolutions");
        //browser.leftClick('//div[@id="colorbox"]//div[@id="webmdHoverWrapper"]//div[@id="webmdHoverContent"]//div[@id="webmdHoverClose"]');
        actions.check_primary_next_previous_button();
    });
      it("should validate whether source is working or not ",function(){
        //browser.url("http://www.preview.webmd.com/diet/ss/slideshow-healthy-eating-resolutions");
        //browser.refresh();
        //browser.leftClick('//div[@id="colorbox"]//div[@id="webmdHoverWrapper"]//div[@id="webmdHoverContent"]//div[@id="webmdHoverClose"]');
        actions.source_working();
      });
        it("should validate left source and right source are visible on the page",function(){
        //browser.url("http://www.preview.webmd.com/diet/ss/slideshow-healthy-eating-resolutions");
        //browser.leftClick('//div[@id="colorbox"]//div[@id="webmdHoverWrapper"]//div[@id="webmdHoverContent"]//div[@id="webmdHoverClose"]');
        actions.source_visibility();
    });
     it("should validate background color and visibility of primary next and previous button",function(){
        //browser.url("http://www.preview.webmd.com/diet/ss/slideshow-healthy-eating-resolutions");
        //browser.leftClick('//div[@id="colorbox"]//div[@id="webmdHoverWrapper"]//div[@id="webmdHoverContent"]//div[@id="webmdHoverClose"]');
        actions.background_color_primary();
    });
    it("should validate image and title are visible on the page",function(){
        //browser.url("http://www.preview.webmd.com/diet/ss/slideshow-healthy-eating-resolutions");
        //browser.refresh();
        //browser.leftClick('//div[@id="colorbox"]//div[@id="webmdHoverWrapper"]//div[@id="webmdHoverContent"]//div[@id="webmdHoverClose"]');
        actions.imageandtitle_visibility();
    });
       /* it("PPE-109351:Verify clicking on 'right' arrow on Top and Bottom on desktop on slideshow moves to next slide", function () {
       actions.check_working_of_rightarrow();
    });
         it("PPE-109350:Verify clicking on 'left' arrow on Top or Bottom on desktop on slideshow moves to previous slide", function () {
        actions.check_working_of_leftarrow();
    });
         it("PPE-109352:Verify clicking on the image on desktop on slideshow moves to next slide", function () {
        actions.check_image_validation();
    });*/
});
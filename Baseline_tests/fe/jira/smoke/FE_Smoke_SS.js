var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
//var actions=require('./actions');
var assert = require("assert");
//var ss_Actions = require('./../../../common/functions/FE_Smoke_SS_Action');
var ss_Actions = require('./../../../common/functions/FE_Smoke_SS_Action');
var ssElements = require('./../../../common/elements/FE_Smoke_SS_Elements');
var Article_Elements = require('./../../../common/elements/FE_Smoke_Article_Elements');
var Article_Actions = require('./../../../common/functions/FE_Smoke_Article_Actions');
var Input = require('./../../../config/FE.testdata')[argv.env];
var URL = Input.SS_url;
browser.url(URL);

describe("SlideShow validations", function () {



    it("Should validate Slide Image and Slide title being visible for all slides", function () {
        browser.leftClick('//div[@id="colorbox"]//div[@id="webmdHoverWrapper"]//div[@id="webmdHoverContent"]//div[@id="webmdHoverClose"]');
        //browser.leftClick('//div[@id="colorbox"]//div[@id="webmdHoverWrapper"]//div[@id="webmdHoverContent"]//div[@id="webmdHoverClose"]');
        ss_Actions.imageandtitle_visibility();
    });

    it("Should validate Disclaimer for first slide and Source for all slides", function () {
        //browser.leftClick('//div[@id="colorbox"]//div[@id="webmdHoverWrapper"]//div[@id="webmdHoverContent"]//div[@id="webmdHoverClose"]');
        ss_Actions.Disclaimer_visibility();
    });

    it("Should validate Working of the Source for all slides", function () {
        //browser.leftClick('//div[@id="colorbox"]//div[@id="webmdHoverWrapper"]//div[@id="webmdHoverContent"]//div[@id="webmdHoverClose"]');
        ss_Actions.source_working();
    });

    it("Should validate Working of the background color of Primary navigation buttons", function () {
        //browser.leftClick('//div[@id="colorbox"]//div[@id="webmdHoverWrapper"]//div[@id="webmdHoverContent"]//div[@id="webmdHoverClose"]');
        ss_Actions.background_color_primary();
    });
    it("Should validate Working of the background color of Secondary navigation buttons", function () {
        //browser.leftClick('//div[@id="colorbox"]//div[@id="webmdHoverWrapper"]//div[@id="webmdHoverContent"]//div[@id="webmdHoverClose"]');
        ss_Actions.background_color_secondary();
    });


    it("Should check for working of next and previous Primary navigation buttons validation", function () {


        ss_Actions.check_primary_next_previous_button();

    });

    it("Should check for working of next and previous Secondary navigation buttons validation", function () {

        ss_Actions.check_secondary_next_previous_button();
    });

    /*it("Should check for Image validation",function()
       {
       
        var flag=true;
            flag= ss_Actions.check_image_validation();       
            flag.should.equal(true);
       });*/
    it("Validation for Breadcrumb Text", function () {
        //Verify the Breadcrumb title
        browser.leftClick('//div[@id="colorbox"]//div[@id="webmdHoverWrapper"]//div[@id="webmdHoverContent"]//div[@id="webmdHoverClose"]');
        var name1 = 'Diet & Weight Management';
        actions = ss_Actions.search(ssElements.Breadcrumb.selector, ssElements.Breadcrumb.selector).breadcrumb_text;
        actions.should.equal(name1);
        //actions.Home_Title.should.equal(name1);
    });
    it("Validation for elements visibile", function () {
        browser.leftClick('//div[@id="colorbox"]//div[@id="webmdHoverWrapper"]//div[@id="webmdHoverContent"]//div[@id="webmdHoverClose"]');
        var elements_visible = {
            "elements": [{ "locator": ssElements.Breadcrumb.selector, "scroll": ssElements.Breadcrumb.selector, "text": "Breadcrumb" },
            { "locator": ssElements.logo.selector, "scroll": ssElements.logo.selector, "text": "logo" },
            { "locator": ssElements.headerad.selector, "scroll": ssElements.headerad.selector, "text": "headerad" },
            { "locator": ssElements.rightasidead.selector, "scroll": ssElements.rightasidead.selector, "text": "rightasidead" },
            { "locator": ssElements.facebookicon.selector, "scroll": ssElements.facebookicon.selector, "text": "facebookicon" },
            { "locator": ssElements.twittericon.selector, "scroll": ssElements.twittericon.selector, "text": "twittericon" },
            { "locator": ssElements.pintresticon.selector, "scroll": ssElements.pintresticon.selector, "text": "pintresticon" },
            { "locator": ssElements.emailicon.selector, "scroll": ssElements.emailicon.selector, "text": "emailicon" },
            { "locator": ssElements.textelementforsearch.selector, "scroll": ssElements.textelementforsearch.selector, "text": "textelementforsearch" }

            ]
        };
        ss_Actions.Verify_ElementIsVisible(elements_visible);

    });
    describe('PPE-105397:New slider integration into SlideShows', function () 
    {
        it("PPE-109351:Verify clicking on 'right' arrow on Top and Bottom on desktop on slideshow moves to next slide", function () 
        {
            var slides_Count = browser.getText(ssElements.slides_Count.selector);
            var primary_cur_slide, secondary_curr_slide, slide_num, slide_type;
            for (var i = 1; i < slides_Count - 1; i++) {
                var image_size = Article_Actions.verify_width_height(ssElements.image.selector)
           // if ((image_size.height.value.equal("650px") && image_size.width.value.equal("250px")) || (image_size.height.value.equal("493px") && image_size.width.value.equal("335px"))) 
                if((image_size.height==650) && (image_size.height=250))
                {
                    slide_type = "large image";
                    console.log("This is a large image slide")
                } 
                //else if (image_size.height.value.should("216px") && image_size.width.value.should("185px")) 
                else if ((image_size.height==216) && (image_size.height=185))
                {
                    slide_type = "small image";
                    console.log("This is a small image slide")

                } else {
                    slide_type = "no image";
                    console.log("This is a no image slide")
                }

                secondary_curr_slide = browser.getText(ssElements.secondary_currslide.selector);
                if ((slide_type = "large image") || (slide_type = "large image") || ((slide_type = "large image")))
               //     secondary_curr_slide.value.should.equal(1);  -- need to check this
                //click on the boittom  next navigation button 
                browser.click(ssElements.secondary_next.selector);
                secondary_curr_slide++; //increment the curr slide num   
                slide_num = browser.getText(ssElements.secondary_currslide.selector);//get the slide num of current slide
                primary_cur_slide = ss_Actions.get_primary_currslide(slide_num);
                // top current slide number  and bottom current slide number shoulb be equal to slide num
                /* if ((primary_cur_slide === slide_num) && (secondary_curr_slide === slide_num))
                     console.log("bootom next navigation is working fine");
                 else
                     console.log("bottom next navigtaion btton is not working");
                 */
                //click on the top  next navigation button 
                browser.click(ssElements.secondary_currslide.selector);
                secondary_curr_slide++; //increment the curr slide num   
                slide_num = browser.getText(ssElements.secondary_currslide.selector);//get the slide num of current slide
                primary_cur_slide = ss_Actions.get_primary_currslide(slide_num);
                // top current slide number  and bottom current slide number shoulb be equal to slide num
                /*
                if ((primary_cur_slide === slide_num) && (secondary_curr_slide === slide_num))
                    console.log("top next navigation is working fine");
                else
                    console.log("top  next navigtaion button is not working");
                    */
            }
        

        });

        it("Validation of menuitems for A-Z Helath Link", function () {
            //browser.leftClick('//div[@id="colorbox"]//div[@id="webmdHoverWrapper"]//div[@id="webmdHoverContent"]//div[@id="webmdHoverClose"]');
            ss_Actions.menuitem_working(ssElements.healthmi.selector);
            var title = browser.getTitle();
            console.log(title);
            title.should.containEql('WebMD Common Health Topics A-Z - Find reliable health and medical information on common topics from A to Z');
            browser.back();
        });
        it("Validation of menuitems for WebMD Drugs Link", function () {
            //browser.leftClick('//div[@id="colorbox"]//div[@id="webmdHoverWrapper"]//div[@id="webmdHoverContent"]//div[@id="webmdHoverClose"]');
            ss_Actions.menuitem_working(ssElements.drugmi.selector);
            browser.pause(3000);
            var title = browser.getTitle();
            console.log(title);
            title.should.containEql('WebMD Drugs & Medications - Medical information on prescription drugs, vitamins and over-the-counter medicines');
            browser.back();
        });
        it("Validation of menuitems for Living Healthy Link", function () {
            //browser.leftClick('//div[@id="colorbox"]//div[@id="webmdHoverWrapper"]//div[@id="webmdHoverContent"]//div[@id="webmdHoverClose"]');
            ss_Actions.menuitem_working(ssElements.livingmi.selector);
            browser.pause(3000);
            var title = browser.getTitle();
            console.log(title);
            title.should.containEql('Living Healthy: Your Guide to Beauty, Food, Fitness, and Diet');
        });
        it("Validation of menuitems for Family and PRegnancy", function () {
            //browser.leftClick('//div[@id="colorbox"]//div[@id="webmdHoverWrapper"]//div[@id="webmdHoverContent"]//div[@id="webmdHoverClose"]');
            ss_Actions.menuitem_working(ssElements.familymi.selector);
            browser.pause(3000);
            var title = browser.getTitle();
            console.log(title);
            title.should.containEql('Family & Pregnancy Center');
            browser.back();
        });
        it.only("Validation of menuitemsfor WebMD Health News", function () {
            //browser.leftClick('//div[@id="colorbox"]//div[@id="webmdHoverWrapper"]//div[@id="webmdHoverContent"]//div[@id="webmdHoverClose"]');
            ss_Actions.menuitem_working(ssElements.newsmi.selector);
            browser.pause(3000);
            var title = browser.getTitle();
            console.log(title);
            title.should.containEql('WebMD Health News Center - The latest breaking health news and alerts');
            browser.back();
        });
       
        it("Validation of menuitems hover", function () 
        {
            browser.click('//div[@id="colorbox"]//div[@id="webmdHoverWrapper"]//div[@id="webmdHoverContent"]//div[@id="webmdHoverClose"]');
            browser.moveToObject(".//*[@id='ContentPane1']/nav/div[1]/div[2]/ul[2]/li[1]/a[1]");
            browser.pause(1000);
        });
    
    })});

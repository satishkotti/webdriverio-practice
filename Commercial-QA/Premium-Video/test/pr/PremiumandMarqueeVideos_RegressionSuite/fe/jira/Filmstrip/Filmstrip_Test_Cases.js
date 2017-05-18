var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var pvActions = require('./../../../common/functions/Premium_Video_Actions');
//var MarqueeVideoElements = require('./../../../common/elements/Marquee_variables');
var pvElements = require('./../../../common/elements/Premium_Video_Elements');
//var arrayTestData = ["Search and Destroy: Targeted Cancer Therapy", "Put Your Immune System on the Attack", "Fighting Cancer with Immunotherapy", "New Ways to Detect Diseased Cells Early On", "Treat the Whole You -- Physical, Emotional, and Spiritual", "The Power of Integrative Cancer Care", "From Survivor to Thriver: The Healing Power of Giving Back"];
var arrayTestData = ["Search and Destroy: Targeted Cancer Therapy", "Put Your Immune System on the Attack", "New Ways to Detect Diseased Cells Early On", "Treat the Whole You -- Physical, Emotional, and Spiritual", "From Survivor to Thriver: The Healing Power of Giving Back"];
var input = require('./../../../config/Premium_Video_TestData');

describe("Verifying functioality of the filmstrip", function () {

    it('Verify that filmstrip appears below the video player', function () {
        browser.url(input.PROD_Marquee_video_player.environment)
        expect(pvActions.Verify_element_exist(pvElements.filmstrip.selector)).to.be.true;
        browser.url(input.PROD_Marquee_video_player.environment)
        browser.pause(5000); // Keep the browser in waiting state till the page is loaded completely
        var filmstripVisibility = browser.isVisible(pvElements.filmstrip.selector); // Passing the boolean value based on the filmstrip visibility
        filmstripVisibility.should.equal(true); // Verifying the boolean value. if the value is "True" filmstrip iPremium_Video_TestDatas visible else doesn't visible         
    });

    it('Verify that "MORE FROM THIS SERIES (5)" appears below the video player', function () {
        expect(pvActions.element_gettext(pvElements.moreFromThisSeries.selector)).to.eql("MORE FROM THIS SERIES (5)");
        var moreFromTextVerification = browser.getText(pvElements.moreFromThisSeries.selector);
        moreFromTextVerification.should.equal("MORE FROM THIS SERIES (5)");
    });

    it('PPE-32302: Verify the leftmost video in the filmstrip is identified with next label', function () {
        expect(pvActions.Verify_element_exist(pvElements.nextLabel.selector)).to.be.true;
        var nextLabelVisibility = browser.isVisible(pvElements.nextLabel.selector); //Passing the boolean value based on the "Next" label visibility
        nextLabelVisibility.should.equal(true);// Verifying the boolean value. if the value is "True" "Next" label is visible else doesn't visible         
    });

    it('Verify that filmstrip contians left and right arrows', function () {
        expect(pvActions.Verify_element_exist(pvElements.leftArrow.selector)).to.be.true;
        expect(pvActions.Verify_element_exist(pvElements.rightArrow.selector)).to.be.true;
        var leftArrowButton = browser.isVisible(pvElements.leftArrow.selector); // Passing the boolean value based on the "left arrow" visibility
        leftArrowButton.should.equal(true); // Verifying the boolean value. if the value is "True" "left arrow" is visible else doesn't visible         
        var rightArrowButton = browser.isVisible(pvElements.rightArrow.selector);// Passing the boolean value based on the "right arrow" visibility
        rightArrowButton.should.equal(true);// Verifying the boolean value. if the value is "True" "right arrow" is visible else doesn't visible         
    });

    // We can't test this functionality as the filmstrip contains only 5 video thumbnails and all are visible. We need not to click on previous or Next arow buttons 
    // it('PPE-32297: Verify that next visible video thumbnail is displayed in the filmstrip when the user clicks on the right arrow button', function () {
    //     pvActions.element_click(pvElements.rightArrow.selector);    
    //     //browser.click(pvElements.rightArrow.selector); // Clicking on the right arrow in the filmstrip to see the video thumbnails which are not visible at the time of initial loading
    //     //var rightThumbnailVisibility = browser.isVisible(pvElements.rightArrownav.selector); // Passing the boolean value based on the video thumbnail visibility
    //     browser.pause(3000);
    //     var rightThumbnailVisibility = browser.isVisible("//div[@class='thumb-header']/h4[contains(text(), 'Put Your Immune System on the Attack')]");
    //     rightThumbnailVisibility.should.equal(true);// Verifying the boolean value. if the value is "True" video thumbnail is visible else doesn't visible         
    //     browser.pause(10000);
    // });

    // We can't test this functionality as the filmstrip contains only 5 video thumbnails and all are visible. We need not to click on previous or Next arow buttons
    // it('PPE-32297: Verify that previous video thumbnail is displayed in the filmstrip when the user clicks on the left arrow button', function () {
    //     browser.pause(5000); // Keeping the browser in waiting state untill the page is loaded
    //     browser.click(pvElements.leftArrow.selector);// Clicking on the right arrow in the filmstrip to see the video thumbnails which are not visible at the time of initial loading
    //     //var leftThumbnailVisibility = browser.isVisible(pvElements.leftArrownav.selector);// Passing the boolean value based on the video thumbnail visibility
    //     browser.pause(3000);
    //     var leftThumbnailVisibility = browser.isVisible("//div[@class='thumb-header']/h4[contains(text(), 'New Ways to Detect Diseased Cells Early On')]");
    //     //browser.pause(10000);
    //     leftThumbnailVisibility.should.equal(true);// Verifying the boolean value. if the value is "True" video thumbnail is visible else doesn't visible
    // });

    it('PPE-32300:Verify if the User able to see the videos in the filmstrip with a thumbnail, the video title and the time duration of the video', function () {
        var emntcnt = browser.getAttribute("//div[@class='playlist show-5']//li", "href").length; // Getting the elements count (video thumbnails) in the playlist
        var arrayVideoNames = []; // Delaring the empty array to pass the video thumbnails titles captured 
        for (var i = 1; i <= emntcnt; i++) { // Created a loop to get each and every thumbnails infroamtion from the playlist
            var cnt1 = browser.isVisible("//li[" + i + "]//div[@class='thumb']"); // Passing the boolean value based on the thumbnail image availability
            cnt1.should.equal(true); // Verifyin the boolean value. if it is true thumbnail image is available else not available
            var vidName = browser.getText("//li[" + i + "]//div[@class='thumb-header']//h4"); // Getting the video thumbnail title 
            if (vidName.length == 0) { // Checking the length of the video title. Sometimes empty title is passing if the tile is not visible
                browser.click(pvElements.leftArrow.selector); // if the video thumbnail is not visible navigating to other part of the playlist by clicking on the left arrow button
                browser.pause(1000); // Keep the browser in waiting state for a second to display the new thumbnails on the playlist
                vidName = browser.getText("//li[" + i + "]//div[@class='thumb-header']//h4"); // // Gettingthe video title from the playlist
            }
            arrayVideoNames.push(vidName); // Passing all the video thumbnails titles captured into a array
            var playIconBox = browser.isVisible("//li[" + i + "]//div[@class='thumb-header']//div[@class='play-iconbox']"); // Passing the boolean value based on the Play iconbox availability
            playIconBox.should.equal(true);// Verifyin the boolean value. if it is true play iconbox is available else not available
            //console.log(playIconBox);
            videoTimeSpan = browser.isVisible("//li[" + i + "]//div[@class='thumb-header']//div[@class='timespan']"); // Passing the boolean value based on the timespan of the video availability
            videoTimeSpan.should.equal(true); // Verifyin the boolean value. if it is true timespan is available else not available
            //console.log(videoTimeSpan);            
        }
        var result = true; // create a flag 
        if (arrayVideoNames.length == arrayTestData.length) { // Checking the length of the both arrays are equal (arrayVideoName captured in runtime and the test data captured before the code execution)
            for (var i = 0; i < arrayTestData.length; i++) { // Creating a loop based on the length of the array
                //console.log(arrayVideoNames[i] + " and " + arrayTestData[i]) 
                if (arrayVideoNames[i] != arrayTestData[i]) {// Comparing the each element of the one array to another array
                    result = false;// if the values are not the same the flag value is changed to false
                }
            }
        }
        else {
            result = false;
            console.log("Arrays are not equal length"); // Displaying in the console that "Arrays" are not equal
        }
        expect(result).to.be.true; // 
    });

    //Sponsored video thumbnails are not available. Hence we are unable to run the below script
    // it('PPE-32301: Verify if user see the designation If a video is sponsored', function () {
    //     var emntcnt = browser.getAttribute("//div[@class='playlist show-5']//li", "href").length; // Getting the elements count (video thumbnails) in the playlist
    //     for (var i = 0; i < emntcnt; i++) { //Creating a loop based on the length of the array elements captured in the above statement
    //         if (i == 3 || i == 6) { // Verifying the video thumbnail nuber is either in 3 or 6
    //             var fromOurSponsorText = browser.getText("//li[" + i + "]//div[contains(text(),'From our sponsor')]"); // Capturing the text from the loaction
    //             if (fromOurSponsorText.length == 0) { // Checking the length of the video title. Sometimes empty title is passing if the tile is not visible
    //                 browser.click(pvElements.leftArrow.selector); // if the video thumbnail is not visible navigating to other part of the playlist by clicking on the left arrow button
    //                 browser.pause(1000); // Keep the browser in waiting state for a second to display the new thumbnails on the playlist
    //                 fromOurSponsorText = browser.getText("//li[" + i + "]//div[contains(text(),'From our sponsor')]");//Capturing the text rom the loaction
    //                 fromOurSponsorText.should.equal("FROM OUR SPONSOR"); // Validating the text captured
    //             }
    //             fromOurSponsorText.should.equal("FROM OUR SPONSOR");// Validating the text captured
    //         }
    //     }
    // });

    it('PPE-32298: Verify if the filmstrip loops i.e when user gets to the end of the video list filmstrip start over from the beginning', function () {
        browser.pause(10000); // Keep the browser in waiting state for 10 second and video started auto played
        var videoCurrentTimetext = pvActions.element_gettext(pvElements.videoCurrentTime.selector); // Getting the video current time displayed in the video control bar
        var res = videoCurrentTimetext.split(":"); // Splitting the curent time based on the colon ":" 
        var urlCapturedonInitialLoad = browser.getUrl();
        if (res[0] > 0 || res[1] > 0) { //Verifying that mts and seconds values should be greater than "0". If the value is greated than "0" means video already started
            console.log("Video has alreay started playing" + res);
        }
        browser.pause(10000);
        //browser.click(pvElements.leftArrow.selector); // if the video thumbnail is not visible navigating to other part of the playlist by clicking on the left arrow button
        browser.click("//li[4]//div[@class='thumb']");// Clicking on the 4th video thumbnail from the playlist
        browser.pause(300000); // Keeping the browser in waiting state till the 7th video completes and navigated to 1st video in the filmstrip
        var videoCurrentTimetext = pvActions.element_gettext(pvElements.videoCurrentTime.selector); // Getting the video current time displayed in the video control bar when the user return to the first video in the playlist
        var res = videoCurrentTimetext.split(":"); // Splitting the curent time based on the colon ":" 
        var urlCapturedAfterLoop = browser.getUrl();  // Cpaturing the URL
        urlCapturedonInitialLoad.should.equal(urlCapturedAfterLoop);
    });

    it.only('PPE-32295: Verify if user clicks on any of the video thumbnails in the film strip, Subsequent selected Video screen loads in the leftmost position in the filmstrip and "NEXT" button on top of it', function () {
        browser.url(input.PROD_Marquee_video_player.environment);
        var emntcnt = browser.getAttribute("//div[@class='playlist show-5']//li", "href").length;
        for (var i = 1; i < emntcnt; i++) {
            var randNumber = Math.floor((Math.random() * emntcnt) + 1);
            console.log("initiai " + randNumber);
            for (var j = 1; j <= emntcnt; j++) {
                var vidName = pvActions.element_gettext("//li[" + randNumber + "]//div[@class='thumb-header']//h4");
                if (vidName.length == 0) {
                    //browser.pause(2000);
                    pvActions.element_click(pvElements.leftArrow.selector);
                }
                else {
                    //browser.pause(2000);
                    pvActions.element_click("//li[" + randNumber + "]//div[@class='thumb']");
                    browser.pause(2000);
                    break;
                }
                pvActions.element_click("//li[" + randNumber + "]//div[@class='thumb']");
            }

            randNumber = randNumber + 1;
            if (randNumber == 6) {
                randNumber = 1;
            }
            for (var j = 1; j <= emntcnt; j++) {

                var vidName = pvActions.element_gettext("//li[" + randNumber + "]//div[@class='thumb-header']//h4");
                if (vidName.length == 0) {
                    //browser.pause(2000);
                    pvActions.element_click(pvElements.leftArrow.selector);
                }
                else {
                    browser.pause(2000);
                    var nextLabel = pvActions.element_gettext("//div[@class='playlist show-5']//li[" + randNumber + "]//span[@class='next-label']");
                    nextLabel.should.equal("NEXT");
                    console.log(randNumber)
                    browser.pause(2000);
                    break;
                }
            }
        }
    });

      it('Verify that subsequent video thumbnail is loaded in the leftmost position of the filmstrip when the video is autoforwarded and "NEXT" button on top of it', function () {
        var emntcnt = browser.getAttribute("//div[@class='playlist show-5']//li", "href").length; // Getting the elements count (video thumbnails) in the playlist
        for (var i = 1; i <= emntcnt; i++) {
            var nextLabel = browser.getText("//div[@class='playlist show-5']//li[" + i + "]//span[@class='next-label']"); // Getting the video thumbnail title from the filmstrip
            nextLabel.should.equal("NEXT");
            browser.pause(550000);
        }
    });
});

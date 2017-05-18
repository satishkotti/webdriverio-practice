var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var pvActions = require('./../../../common/functions/Premium_Video_Actions');
var pvElements = require('./../../../common/elements/Premium_Video_Elements');
var input = require('./../../../config/Premium_Video_TestData');

describe("Verifying the grids appear below the video player", function () {

    it('PPE-28624: Verify whether Grids are stacked i.e all the Grid designs can be found in the same page', function () {
        browser.url(input.staging_ctca.environment); // Accessing the CTCA URL
        browser.pause(5000); // Keep the browser in waiting state for 5 seconds
        firstGridVisibility = pvActions.Verify_element_exist(pvElements.firstGrid.selector); // Verifying 8 tile grid exist by passing the boolean value 
        secondGridVisibility = pvActions.Verify_element_exist(pvElements.secondGrid.selector);// Verifying 7 tile grid exist by passing the boolean value
        firstGridVisibility.should.equal(true); // Verifying the boolean value passed. If the value is "True" 8 tile grid is exist else it doesnot exist
        secondGridVisibility.should.equal(true);// Verifying the boolean value passed. If the value is "True" 7 tile grid is exist else it doesnot exist
    });

    it('PPE-33578: Verify if Grid items contain a link to an asset, an image related to the asset, the title of the asset, they type of asset (Article, Slideshow), and an Sponsorship identifier if required.', function () {
        var attrbts = browser.getAttribute("//div[@class='art-group itemGroup8Pieces clearfix']//a[not(contains(@class,'see-all'))]", "href"); //Passing all the elements inforamtion into JSON object
        for (var i = 0; i < attrbts.length; i++) { // Looping specified number of time to verify the asset elements are available in each tile in "8 grid" element
            var assetType = browser.getText("//div[@class='art-group itemGroup8Pieces clearfix']//a[@href='" + attrbts[i] + "']//h4"); // Verifying that asset type title appears on each and every tile and passing boolean value
            assetType.should.equal("ARTICLE"); // Verifying the asset title exist and verifying that correct asset type is displayed
            var assetTitle = browser.getText("//div[@class='art-group itemGroup8Pieces clearfix']//a[@href='" + attrbts[i] + "']//h5"); // Verifying that title appears on each and every tile and passing boolean value
            console.log(assetTitle);
            var assetTitleExist = browser.isVisible("//div[@class='art-group itemGroup8Pieces clearfix']//a[@href='" + attrbts[i] + "']//h5"); // Passing the boolean value by verfiying the tile title exist or not 
            assetTitleExist.should.equal(true); // Checking the boolean value. if the value is "true" title exists else doesnot exist
            var assetImage = browser.isVisible("//div[@class='art-group itemGroup8Pieces clearfix']//a[@href='" + attrbts[i] + "']//img"); // Verifying that image appears on each and every tile and passing boolean value
            assetImage.should.equal(true); // Verifying the boolean value
        }

        var attrbts = browser.getAttribute("//div[@class='art-group itemGroup7Pieces clearfix']//a[not(contains(@class,'see-all'))]", "href"); //Passing all the elements inforamtion into JSON object
        for (var i = 0; i < attrbts.length; i++) { // Looping specified number of time to verify the asset elements are available in each tile in "7 grid"" element
            var assetType = browser.getText("//div[@class='art-group itemGroup7Pieces clearfix']//a[@href='" + attrbts[i] + "']//h4"); // Verifying that asset type title appears on each and every tile and passing boolean value
            assetType.should.equal("ARTICLE"); // Verifying the asset title exist and verifying that correct asset type is displayed
            var assetTitle = browser.getText("//div[@class='art-group itemGroup7Pieces clearfix']//a[@href='" + attrbts[i] + "']//h5"); // Verifying that title appears on each and every tile and passing boolean value
            console.log(assetTitle);
            var assetTitleExist = browser.isVisible("//div[@class='art-group itemGroup7Pieces clearfix']//a[@href='" + attrbts[i] + "']//h5"); // Passing the boolean value by verfiying the tile title exist or not 
            assetTitleExist.should.equal(true); // Checking the boolean value. if the value is "true" title exists else doesnot exist
            var assetImage = browser.isVisible("//div[@class='art-group itemGroup7Pieces clearfix']//a[@href='" + attrbts[i] + "']//img"); // Verifying that image appears on each and every tile and passing boolean value
            assetImage.should.equal(true); // Verifying the boolean value
        }
    });

    // it('PPE-28624: Verify the navigation of pages by clicking on the tiles in the Grid', function () {
    //     // browser.timeouts('pageLoad',90000)
    //     browser.url(input.staging_ctca.environment); // Accessing the CTCA URL
    //     var attrbts = browser.getAttribute("//div[@class='art-group itemGroup8Pieces clearfix']//a[not(contains(@class,'see-all'))]", "href"); //Passing all the link elements into JSON object
    //     var elmntsCount = browser.elements("//div[@class='art-group itemGroup8Pieces clearfix']//a[not(contains(@class,'see-all'))]").value.length; // Getting the length (no of objects) of the JSON object
    //     //browser.scroll(0,1000)
    //     for (var i = 0; i < elmntsCount; i++) { //Looping specified number of time to verify the asset elements are available in each tile in "8 grid"" element
    //       browser.scroll(0,1000)  
    //         browser.pause(5000); // Pausing the browser till the page is loaded completely
    //         browser.click("//div[@class='art-group itemGroup8Pieces clearfix']//a[@href='" + attrbts[i] + "']"); // Clicking on the each tile in the grid
    //         console.log(browser.getText("//header[@class='page-header']//h1"));
    //         pvActions.element_click(pvElements.ctcaDestinationLink.selector); // Clicking on the CTCA destination to come back to the landing page
    //     }
    //     var attrbts = browser.getAttribute("//div[@class='art-group itemGroup7Pieces clearfix']//a[not(contains(@class,'see-all'))]", "href"); //Passing all the link elements into JSON object
    //     var elmntsCount = browser.elements("//div[@class='art-group itemGroup7Pieces clearfix']//a[not(contains(@class,'see-all'))]").value.length; // Getting the length (no of objects) of the JSON object
        
    //     for (var i = 0; i < elmntsCount; i++) { //Looping specified number of time to verify the asset elements are available in each tile in "7 grid"" element
    //     browser.scroll(0,1000)
    //         browser.pause(5000); // Pausing the browser till the page is loaded completely
    //         browser.click("//div[@class='art-group itemGroup7Pieces clearfix']//a[@href='" + attrbts[i] + "']"); // Clicking on the each tile in the grid
    //         //browser.pause(2000); // Pausing the browser till the page is loaded completely
    //         console.log(browser.getText("//header[@class='page-header']//h1"));
    //         pvActions.element_click(pvElements.Cutting_edge_cancer_title.selector); // Clicking on the CTCA destination to come back to the landing page
    //     }
    // });

    it('Verifying the font size and color of the asset type (Article, Slideshow ect..) title displayed in grid tiles', function () {
        browser.url(input.staging_ctca.environment); // Accessing the CTCA URL
        var attrbts = browser.getAttribute("//div[@class='art-group itemGroup7Pieces clearfix']//a[not(contains(@class,'see-all'))]", "href"); //Passing all the link elements into JSON object from 7grid element
        var elmntsCount = browser.elements("//div[@class='art-group itemGroup7Pieces clearfix']//a[not(contains(@class,'see-all'))]").value.length; // Getting the length (no of objects) of the JSON object
        for (var i = 0; i < elmntsCount; i++) { // Executing the statements for a specified amount of time based on the elements count captured
            var fontSize = browser.getCssProperty("//div[@class='art-group itemGroup7Pieces clearfix']//a[@href='" + attrbts[i] + "']//h4", 'font-size').value; // Capturing the value of each element
            fontSize.should.equal("16px"); //Compating the actual value with expected value        
            var fontColor = browser.getCssProperty("//div[@class='art-group itemGroup7Pieces clearfix']//a[@href='" + attrbts[i] + "']//h4", 'color').parsed.hex; // Capturing the value of each element
            fontColor.should.equal("#45807c");
            var articleFontFamily = browser.getCssProperty("//div[@class='art-group itemGroup7Pieces clearfix']//a[@href='" + attrbts[i] + "']//h4", 'font-family').value; // Capturing the "font Family" value of each element
            articleFontFamily.should.equal("roboto condensed");
        }
        var attrbts = browser.getAttribute("//div[@class='art-group itemGroup8Pieces clearfix']//a[not(contains(@class,'see-all'))]", "href"); //Passing all the link elements into JSON object from 8grid element
        var elmntsCount = browser.elements("//div[@class='art-group itemGroup8Pieces clearfix']//a[not(contains(@class,'see-all'))]").value.length; // Getting the length (no of objects) of the JSON object
        for (var i = 0; i < elmntsCount; i++) {  // Executing the statements for a specified amount of time based on the elements count captured
            var fontSize = browser.getCssProperty("//div[@class='art-group itemGroup8Pieces clearfix']//a[@href='" + attrbts[i] + "']//h4", 'font-size').value;// Capturing the value of each element
            fontSize.should.equal("16px");//Compating the actual value with expected value            
            var fontColor = browser.getCssProperty("//div[@class='art-group itemGroup8Pieces clearfix']//a[@href='" + attrbts[i] + "']//h4", 'color').parsed.hex; // Capturing the value of each element
            fontColor.should.equal("#45807c");
            var articleFontFamily = browser.getCssProperty("//div[@class='art-group itemGroup8Pieces clearfix']//a[@href='" + attrbts[i] + "']//h4", 'font-family').value; // Capturing the "font Family" value of each element
            articleFontFamily.should.equal("roboto condensed");
        }
    });

    it('Verifying the font size and color of the asset title (Title of the article) displayed in grid tiles', function () {
        var attrbts = browser.getAttribute("//div[@class='art-group itemGroup8Pieces clearfix']//a[not(contains(@class,'see-all'))]", "href"); //Passing all the link elements into JSON object from 7grid element
        var elmntsCount = browser.elements("//div[@class='art-group itemGroup8Pieces clearfix']//a[not(contains(@class,'see-all'))]").value.length; // Getting the length (no of objects) of the JSON object
        for (var i = 0; i < elmntsCount; i++) { // Executing the statements for a specified amount of time based on the elements count captured
            var fontSize = browser.getCssProperty("//div[@class='art-group itemGroup8Pieces clearfix']//a[@href='" + attrbts[i] + "']//h5", 'font-size').value; // Capturing the value of each element
            fontSize.should.equal("22px"); //Compating the actual value with expected value        
            var fontColor = browser.getCssProperty("//div[@class='art-group itemGroup8Pieces clearfix']//a[@href='" + attrbts[i] + "']//h5", 'color').parsed.hex; // Capturing the value of each element
            fontColor.should.equal("#000000"); // Comparing the actual value with expected value
            console.log(fontColor);
            var fontFamily = browser.getCssProperty("//div[@class='art-group itemGroup8Pieces clearfix']//a[@href='" + attrbts[i] + "']//h5", 'font-family').value; // Capturing the "font family" value of each element
            fontFamily.should.equal("lato"); // Comparing the actual value with expected value
        }
        var attrbts = browser.getAttribute("//div[@class='art-group itemGroup7Pieces clearfix']//a[not(contains(@class,'see-all'))]", "href"); //Passing all the link elements into JSON object from 7grid element
        var elmntsCount = browser.elements("//div[@class='art-group itemGroup7Pieces clearfix']//a[not(contains(@class,'see-all'))]").value.length; // Getting the length (no of objects) of the JSON object
        for (var i = 0; i < elmntsCount; i++) { // Executing the statements for a specified amount of time based on the elements count captured
            var fontSize = browser.getCssProperty("//div[@class='art-group itemGroup7Pieces clearfix']//a[@href='" + attrbts[i] + "']//h5", 'font-size').value; // Capturing the value of each element
            fontSize.should.equal("22px"); //Compating the actual value with expected value        
            var fontColor = browser.getCssProperty("//div[@class='art-group itemGroup7Pieces clearfix']//a[@href='" + attrbts[i] + "']//h5", 'color').parsed.hex; // Capturing the value of each element
            fontColor.should.equal("#000000");
            console.log(fontColor);
            var fontFamily = browser.getCssProperty("//div[@class='art-group itemGroup7Pieces clearfix']//a[@href='" + attrbts[i] + "']//h5", 'font-family').value; // Capturing the "font family" value of each element
            fontFamily.should.equal("lato"); // Comparing the actual value with expected value
        }
    });     
});
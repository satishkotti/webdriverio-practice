var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var S = require('string');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var input = require('./../../../config/ArticlePage.testdata')[argv.env];
var ar = require('./../../../common/functions/Articlepage.actions');                     
var url = input.environment;

describe('Article Page Regression', function()  {

    before( function(){
        browser.url(url);
    }) ;

   it('Verify the URL of the page loaded', function() {
      
       ar.VerifyURL (url);
   });

   it('Verify the active page', function () {

       expect(ar.ActivePage()).to.eql(1);
  
   });

    it('Verify the Next Page', function (){

        let beforeClickingNext = ar.ActivePage();            // This gets the current page number

        // Clicking on Next Page button

         ar.NextPage();

             let afterClickingNext = ar.ActivePage();      // This gets the current page number

       // Comparing the loaded page number after clicking the Next page

             expect(afterClickingNext).to.eql(beforeClickingNext + 1 );

      
    });

    it('Verify the Previous Page', function () {

       let beforeClickingPrevious = ar.ActivePage();       // This gets the current page number

          // Clicking on Previous Page button

           ar.PreviousPage();

             let afterClickingPrevious = ar.ActivePage();   // This gets the current page number

        // Comparing the loaded page number after clicking the Previous page 

             expect(afterClickingPrevious).to.eql(beforeClickingPrevious - 1 );

    });
    
});





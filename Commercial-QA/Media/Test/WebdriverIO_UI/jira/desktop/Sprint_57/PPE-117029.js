var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var commonelements = require('./../../common/elements/COMMON.elements');
var input = require('./../../config/PPE-117029-Testdata')[argv.env];
var ICM = require('./../../common/functions/PPE-117029.actions');
var url = input.environment;

describe('PPE-117029 - ICM Double Stacked Placements', function () {
        it('Verify the placement of ICM module when the placements >= 8', function () {
                browser.url(url);
                browser.pause(10000);
               //var totaltags = ICM.Get_P_and_UL_tags_count.length;
                //var totaltags = browser.element('.article-page active-page').getElementsByTagName("p").value.length;
                //var totaltags = browser.elements();
               // console.log(totaltags);
                //var tagscount;
                 //tagscount('*').length;
                   //var tagscount = ICM.Get_P_and_UL_tags_count;
                   // var tagscount = browser.getElementSize("//div[@class='article-page active-page']/*[not(name()='section')and not(name()='div')]");
                //var totaltags = browser.getAttribute("//div[@class='article-page active-page']/*[not(name()='section')and not(name()='div')]",length);
                tagscount = browser.elements("//div[@class='article-page active-page']/*[not(name()='section')and not(name()='div')]").value.length; 

                tagscount = parseInt(tagscount);
                console.log(tagscount);
                
                ICM.tagscountmethod(tagscount);       

        })

});

var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var splashpage = require('./../../common/elements/splashpage')
var functions = require('./../../common/functions/Common_functions')
var input = require('./../../config/Webmd-tv')[argv.env];
var url = input.splash;
var email = 'testinvalid';
var dataentry = {};



module.exports = {

    grid: function () {
        var grid = {};
        browser.pause(50000);
        var element = browser.elements("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div");
        for (i = 1; i <= element.value.length; i++) {
            if (splashpage.watchnow(i).isExisting()) {
                grid.playbutton = functions.cssProperties(splashpage.watchnow(i));
                var textvalue = functions.get_Text(splashpage.text(i));
                console.log("textvalue" + textvalue);
                grid.text = functions.cssProperties(splashpage.text(i));
                grid.eposide = functions.cssProperties(splashpage.episode(i));
                grid.eposidetext = functions.get_Text(splashpage.episode(i));
                grid.overlay = functions.cssProperties(splashpage.overlay(i));
                grid.grid1 = functions.cssProperties(splashpage.grid1(i));
            }
            else if (splashpage.onlyquote(i).isExisting()) {
                grid.onlyquote = functions.cssProperties(splashpage.onlyquote(i));
                grid.Author = functions.cssProperties(splashpage.onlyquoteauthor(i));
                grid.authorcity = functions.cssProperties(splashpage.authorcity(i));
                grid.authorstate = functions.cssProperties(splashpage.authorcity(i));
                grid.bluelinecolor = functions.cssProperties(splashpage.bluelinecolor(i));
                grid.lineheight = functions.get_cssValue(splashpage.bluelinecolor(i), 'height');
                grid.bottombluelinecolor = functions.cssProperties(splashpage.bottombluelinecolor(i));

            }
            else {
                console.log('It is ad')
            }
            grid.sponsored = functions.cssProperties(splashpage.sponsorepisode);

        }
        return grid;
    }
}

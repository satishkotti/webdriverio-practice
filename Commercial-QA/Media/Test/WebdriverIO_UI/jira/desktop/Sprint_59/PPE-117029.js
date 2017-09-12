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
        before(function () {
                browser.url(url);
             //   browser.waitForVisible("//div[@id='webmdHoverClose']", 5000);
             //   var hover = browser.isVisible("//div[@id='webmdHoverClose']");
             //   console.log(hover);
             //   browser.click("//div[@id='webmdHoverClose']");
                //       browser.click("//*[@data-link='all']");
                //    browser.pause(10000);
                browser.pause(10000);
                //done();
        });

        if (argv.env === 'healthwise') {
                it('Verify that the new ICM Module placement changes are not applied to healthwise content', function () {
                        var height = browser.getCssProperty(".//*[@id='ContentPane30']/article/div[2]/div", 'height');
                        console.log("Height: " + JSON.stringify(height));
                        // console.log(height[0].parsed.value);
                        var ht = height[0].parsed.value;
                        console.log("ht: " + ht);
                        var location = ((75 / 100) * (ht));
                        console.log(location);
                        browser.scroll(0, location);
                        browser.pause(5000);
                        var b = browser.isVisibleWithinViewport("//div[@id='ads2-pos-5000-ad-cw1-icm']");
                        console.log(b);
                        b.should.equal(false);
                })
        }
        else if (argv.env === 'nonhealthwise') {
                it('Verify that for Non healthwise pages ICM is placed within the center well of the page and at the 75% of the way through the content on the page', function () {
                        //        var elem = $('.//*[@id="ContentPane30"]/article/div[2]/div[@class="article-page active-page"]');
                        var height = browser.getCssProperty(".//div[@class='article-page active-page']", 'height');
                        // var height = elem.getCssProperty('height');
                        console.log(height);
                        // console.log("Height: "+height.value);
                        // console.log(height[0].parsed.value);
                        var ht = height.parsed.value;
                        var location = ((75 / 100) * (ht));
                        console.log(location);
                        browser.scroll(0, location);
                        browser.pause(5000);
                        //                var b = browser.isVisibleWithinViewport("//div[@id='ads2-pos-5000-ad-cw1-icm']");
                        var b = browser.isExisting("//div[@id='ads2-pos-5000-ad-cw1-icm']");
                        console.log(b);
                        b.should.equal(true);
                })

                it('Verify the placement of ICM module in the pages other than 1st page', function () {

                        for (i = 0; i < 10; i++) {
                                if (browser.isVisible(".//li[@class='next']")) {
                                        browser.click((".//li[@class='next']"));
                                        browser.pause(5000);
                                        var height = browser.getCssProperty(".//div[@class='article-page active-page']", 'height');
                                        // var height = elem.getCssProperty('height');
                                        console.log("Height: " + height.value);
                                        // console.log(height[0].parsed.value);
                                        var ht = height.parsed.value;
                                        var location = ((75 / 100) * (ht));
                                        console.log(location);
                                        browser.scroll(0, location);
                                        browser.pause(5000);
                                        //                var b = browser.isVisibleWithinViewport("//div[@id='ads2-pos-5000-ad-cw1-icm']");
                                        var b = browser.isExisting("//div[@id='ads2-pos-5000-ad-cw1-icm']");
                                        console.log(b);
                                        b.should.equal(true);

                                }

                                else {
                                        break;
                                }
                        }
                })

                it('Verify that the ICM module is NOT appearing directly above or below the native stacked unit', function () {

                        for (i = 0; i < 10; i++) {

                                if (browser.isVisible(".//li[@class='previous']")) {
                                        browser.click((".//li[@class='previous']"));
                                        browser.pause(5000);

                                        var cn = browser.getAttribute("//div[@class='article-page active-page']//div[@class='responsive-sharethrough-wrapper']//following-sibling::*", "id");
                                        console.log(cn[0]);
                                        var b = cn[0].includes("ads2-pos-5000-ad-cw1-icm");
                                        console.log(b);
                                        b.should.equal(false);
                                        var ps = browser.getAttribute("//div[@class='article-page active-page']//div[@class='responsive-sharethrough-wrapper']//preceding-sibling::*", "id");
                                        console.log(ps[0]);
                                        var c = ps[0].includes("ads2-pos-5000-ad-cw1-icm");
                                        console.log(c);
                                        c.should.equal(false);
                                        browser.pause(5000);

                                }

                                else {
                                        break;
                                }
                        }
                })

                it('Verify the placement of ICM module after clicking on "View All" link in the pagination', function () {
                        browser.click("//*[@data-link='all']");
                         browser.pause(10000);
                                        var height = browser.getCssProperty(".//div[@class='article-page active-page']", 'height');
                                        // var height = elem.getCssProperty('height');
                                        console.log("Height: " + height.value);
                                        // console.log(height[0].parsed.value);
                                        var ht = height.parsed.value;
                                        var location = ((75 / 100) * (ht));
                                        console.log(location);
                                        browser.scroll(0, location);
                                        browser.pause(5000);
                                        //                var b = browser.isVisibleWithinViewport("//div[@id='ads2-pos-5000-ad-cw1-icm']");
                                        var b = browser.isExisting("//div[@id='ads2-pos-5000-ad-cw1-icm']");
                                        console.log(b);
                                        b.should.equal(true);
                })

        }

});
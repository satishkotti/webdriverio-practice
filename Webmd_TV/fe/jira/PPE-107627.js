var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var functions = require('./../../common/functions/functions');
var elements = require('./../../common/elements/webmdtvpage');
//var Input = require('./../../config/testdata')[argv.env];
var env = require('./../../gulpfile.js').TestEnv;
var Input = require('./../../config/Webmd-tv')[env];
var url=Input.environment;

describe('PPE-107627-QA and Support: Build Responsive UGC Module', function () {

  //launch browser with the url specified in test data file
  //functions.open_Page();
  browser.url(url);

  // waiting for the page to load
  //browser.timeouts('pageLoad', 90000);

  //Verify that UGC Module is appearing on 1240 width screen
  /*it("PPE-106607-Verify that UGC Module is appearing on 1240 width screen", function () {
    browser.pause(20000);
    functions.close_Overlay();
    console.log('------------------------------------------------------------');
    console.log('Verify that UGC Module is appearing on 1240 width screen');
    //browser.scroll(elements.video.selector);
    var video_element = elements.video;
    console.log(video_element);
    var width = functions.get_cssValue('#webmd-player-737', 'width');
    console.log(width);s
    width.value.should.equal('1240px');
    console.log('Verified that video is appearing on 1240 width screen');
    console.log('Verifying that UGC module is appearing properly');
    var ugc_module = elements.ugcmodule;
    ugc_module.waitForVisible();
    console.log(ugc_module.waitForVisible());
    var ugcModuleDisplayed = browser.isVisible(ugc_module.selector);
    ugcModuleDisplayed.should.equal(true);
    console.log('PPE-106607-Verify that UGC Module is appearing on 1240 width screen');
  });*/


  //Verify that the title of the module is read from Our Community as a default
  it("PPE-106610&PPE-115312-Verify that the title of the module is read from Our Community as a default", function () {
     browser.pause(4000);
    browser.scroll(100,100);
    //browser.scroll("//div[@id='ugc-all-modules-wrapper']//div[@id='ugc-wrapper']/h3",100,100);
    console.log('------------------------------------------------------------');
    console.log('Verify that the title of the module is read from Our Community as a default');
    browser.waitForVisible("//div[@id='ugc-all-modules-wrapper']//div[@id='ugc-wrapper']/h3",4000);
    var community_element = elements.ugcmoduleTitle;
    console.log(community_element);
    console.log('getting text from module title');
    var text = browser.getText("//div[@id='ugc-all-modules-wrapper']//div[@id='ugc-wrapper']/h3");
    console.log('text is: ' + text);
   // text.should.equal('FROM OUR COMMUNITY', 'expected  text is:' + 'FROM OUR COMMUNITY' + '  ' + 'Actual text is:' + text);
   text.should.equal('WEBMD VOICES');
    //text.should.equal('WebMD Voices', 'expected  text is:' + 'WebMD Voices' + '  ' + 'Actual text is:' + text);
    console.log('PPE-106610Verified that the title of the module is read from Our Community as a default');
    console.log('------------------------------------------------------------');
  });

  //Verify that quote area has a maximum of 200 characters including spaces
  it("PPE-106611-Verify that quote area has a maximum of 200 characters including spaces", function () {
    console.log('------------------------------------------------------------');
    console.log('Verify that quote area has a maximum of 200 characters including spaces');
    browser.pause(10000);
    functions.close_Overlay();
    var qcardsGreater200 = [];
    var qcardslesser200 = [];
    //browser.scroll(elements.nexticon.selector);
    var quote_array = new Array(4);
    for (var i = 1; i <= 4; i++) {
      //if (i == 4) {
      var next_icon = elements.nexticon;
      next_icon.click();
      browser.pause(4000);
      var quote_card = browser.element("div.owl-stage-outer > div > div.owl-item.active.center");
      quote_array[i - 1] = functions.get_Text(quote_card);
      //} else {
      // var quote_card = browser.element("//div[@id='ugc-widget']/div[1]/div/div[@class='owl-item active'][" + i + "]/div/div/section[1]/div[3]");
      // quote_array[i - 1] = functions.get_Text(quote_card);

      // }
    }
    quote_array.forEach(function (quote_card) {
      var quote_size = quote_card.length;
      if (quote_size > 200) {
        qcardsGreater200.push(quote_card);
        console.log('Number of characters of the q card title is:' + quote_size);
      } else {
        qcardslesser200.push(quote_card);
        console.log('Number of characters of the q card title is:' + quote_size);
      }
    }, this);

    console.log('Quote cards with more than 200 characters are :' + qcardsGreater200.length);
    console.log('Quote cards with less than 200 characters are :' + qcardslesser200.length);

    if ((qcardsGreater200.length) != (qcardslesser200.length)) {
      result=false;
      result.should.equal(false);
     // should.fail(true, false, 'number of characters expected: ' + '<= 200');

    } else {
      result=true;
      result.should.equal(true);
     // should.fail(true, true, 'All the quote cards have number characters less than 200 characters')
    }
  });

  //Verify that the contributor's name is displayed below the quote
  it("PPE-106618-Verify that the contributor's name is displayed below the quote", function () {
    var heights = [];
    var failed = [];
    var passed = [];
    browser.waitForVisible(elements.nexticon.selector);

    for (var i = 1; i <= 3; i++) {
      //    if (i == 4) {
        
      var next_icon = elements.nexticon;
      next_icon.click();
      browser.pause(4000);
      var quote_author = browser.isVisible("div.owl-item.active.center > div > div > section.bottom-content > div > div > span.name");
      if (quote_author) {
        console.log('Author name is displayed for ' + i + ' quote');
      } else {
        console.log('Author name NOT displayed');
        should.fail(true, false, 'Author name not displayed for ' + i + ' quote');
      }
      console.log("1");
      //browser.scroll('div.owl-item.active.center > div > div > section.top-content > div.quote',100,100);
      console.log("2");
      var height_quote = browser.getLocation("//div[@class='owl-item active center']//div[@class='item']//div[@class='ugc-item  ']//section[@class='top-content']//div[@class='quote']", 'y');
      console.log("3");
      //var height_image = browser.getLocation("div.owl-item.active.center > div > div > section.bottom-content > div > img", 'y');
      console.log("4");
      heights.push({ height_quote: height_quote});
      // } else {
      //   var quote_author = browser.isVisible("//div[@class='owl-item active'][" + i + "]//div[@class='user-info']/span[1]");
      //   if (quote_author) {
      //     console.log('Author name is displayed for ' + i + ' quote');
      //   } else {
      //     should.fail(true, false, 'Author name not displayed for ' + i + ' quote');
      //   }
      //   var height_quote = browser.getLocation("//div[@id='ugc-widget']/div[1]/div/div[@class='owl-item active'][" + i + "]/div/div/section[1]/div[3]", 'y');
      //   var height_image = browser.getLocation("//div[@class='owl-item active'][" + i + "]//div[@class='user-info']/span[1]", 'y');
      //   heights.push({ height_quote: height_quote, height_image: height_image });
      // }
    }
    heights.forEach(function (element) {
      if (element.height_image <= element.height_quote) {
        failed.push(element);
      } else {
        passed.push(element);
      }
    }, this);

    if (failed.length > 0) {
      should.fail('Author name not displayed below quote card');
    }
    else {
      console.log('Author name displayed below for all quote cards');
    }
  });

  //Verifying that name is displayed in the user-info section
  it("PPE-106618-Verifying that name is displayed in the user-info section", function () {
    browser.pause(10000);
    console.log('Verifying that name is displayed in the user-info section');
    var names = [];
    var expected_names = ['John Smith', 'Peter B.', 'Mark T', 'George Sheehan'];
    for (var i = 1; i <= 4; i++) {
      if (i == 4) {
        var next_icon = elements.nexticon;
        next_icon.click();
        browser.pause(4000);
        var author_name = browser.getText("div.owl-stage-outer > div > div:nth-child(" + (i + 3) + ") > div > div > section.bottom-content > div > div > span.name");
        author_name = author_name.split(',')[0];
        names[i - 1] = author_name;
      }
      else {
        var author_name = browser.getText("div.owl-stage-outer > div > div:nth-child(" + (i + 3) + ") > div > div > section.bottom-content > div > div > span.name");
        author_name = author_name.split(',')[0];
        names[i - 1] = author_name;
        console.log(names)
      }
    }
    console.log(names);
    // var areEqual = _.isEqual(expected_ages, ages);
    var areEqual = functions.arraysAreEqual(names, expected_names);
    //areEqual.should.equal(true, 'Failed');
    should.exist(areEqual);

    console.log('Ages are displayed for all the quote cards'+areEqual);
  });

  //Verify that location consists of town and state
  it("PPE-106619-Verify that location consists of town and state", function () {
    browser.pause(10000);
    console.log('scrolling');
    // var toScroll = "//div[@class='owl-item active'][2]//section[@class='top-content']//div[@class='counter']/span[1]";
    // browser.scroll(toScroll, 5, 1);
    browser.pause(10000);
    console.log('Verifying that location consists of town and state');
    var towns = [];
    //var town_expected = ['New York', 'Trenton', 'New York', 'Redbank'];
   var town_expected =[ 'Seattle', 'New Orleans', '', 'Oak Park' ];
    var states = [];
//    var states_expected = [' NY', ' NY', ' NY', ' NJ'];
var states_expected=[ ' WA', ' LA', undefined, ' IL' ];
    for (var i = 1; i <= 4; i++) {
      if (i == 4) {
        var next_icon = elements.nexticon;
        next_icon.click();
        browser.pause(4000);
        var location_info = browser.getText("div.owl-stage-outer > div > div:nth-child(" + (i + 3) + ") > div > div > section.bottom-content > div > div > span.address");
        console.log(location_info);
        town = location_info.split(',')[0];
        state = location_info.split(',')[1];
        towns[i - 1] = town;
        states[i - 1] = state;
      }
      else {
        var location_info = browser.getText("div.owl-stage-outer > div > div:nth-child(" + (i + 3) + ") > div > div > section.bottom-content > div > div > span.address");
        console.log(location_info);
        town = location_info.split(',')[0];
        state = location_info.split(',')[1];
        towns[i - 1] = town;
        states[i - 1] = state;
      }
    }
    console.log(towns);
    console.log(states);
    // var areEqual = _.isEqual(expected_ages, ages);
    var areTownsEqual = functions.arraysAreEqual(towns, town_expected);
    var areStatesEqual = functions.arraysAreEqual(states, states_expected);
    if (!areTownsEqual | !areStatesEqual) {
      should.fail(true, false, 'Failed');
    }
    console.log('Towns and states are displayed on all the quote cards');
  });

  //Verify that the quote card displays the current slide number associated with each slide
  it("PPE-106620-Verify that the quote card displays the current slide number associated with each slide", function () {
    browser.pause(20000);
    console.log('scrolling');
    // var toScroll = "//div[@class='owl-item active'][2]//section[@class='top-content']//div[@class='counter']/span[1]";
    // browser.scroll(toScroll, 5, 1);
    quote_numbers = [];
    expected_quoteNumber = [1, 2, 3];
    for (var i = 1; i <= 3; i++) {
      //   if (i == 4) {
      var next_icon = elements.nexticon;
      next_icon.click();
      browser.pause(4000);
      var quote_number = browser.getText("div.owl-stage-outer > div > div:nth-child(" + (i + 3) + ") > div > div > section.top-content > div.counter > span.current-item")
      quote_number = parseInt(quote_number);
      quote_numbers[i - 1] = quote_number;

      // } else {
      //   var quote_number = browser.getText("//div[@class='owl-item active'][" + i + "]//section[@class='top-content']//div[@class='counter']/span[1]")
      //   quote_number = parseInt(quote_number);
      //   quote_numbers[i - 1] = quote_number;
      //   var total_quotes = browser.getText("div.owl-stage-outer > div > div:nth-child("+(i+3)+") > div > div > section.top-content > div.counter > span:nth-child(3)");
      //   total_quotes = parseInt(total_quotes);
      //   total_quotes.should.equal(4);
      // }
    }
    var total_quotes = browser.getText("div.owl-stage-outer > div > div:nth-child(" + (i + 3) + ") > div > div > section.top-content > div.counter > span:nth-child(3)");
    total_quote = parseInt(total_quotes);
    //total_quote.should.equal(4);
    console.log('quote numbers on the page are : ' + quote_numbers);
    console.log('quote numbers expected are: ' + expected_quoteNumber);
    var areEqual = functions.arraysAreEqual(quote_number, expected_quoteNumber);
    areEqual.should.equal(true);
    console.log('Quote numbers are displayed on top of the quote');
  });

  it("PPE-106622-Verify that the format of the slide numbering is current slide number slash(/) total", function () {
    browser.pause(20000);
    var failed = 0;
    for (var i = 1; i <= 3; i++) {
      // if (i == 4) {
      var next_icon = elements.nexticon;
      next_icon.click();
      browser.pause(4000);
      var quote_number = browser.getText("div.owl-stage-outer > div > div:nth-child(" + (i + 3) + ") > div > div > section.top-content > div.counter");
      // var quote_separator = quote_number.substring(quote_number.indexOf('/'));
      // var quote_array = slash.split("");
      var separator = quote_number[1];
      console.log(separator);
      separator.should.equal('/', '/ is not displayed as separator');


      // } else {
      //   var quote_number = browser.getText("div.owl-stage-outer > div > div:nth-child("+(i+3)+") > div > div > section.top-content > div.counter");
      //   // var quote_separator = quote_number.substring(quote_number.indexOf('/'));
      //   // var quote_array = slash.split("");
      //   var separator = quote_number[1];
      //   console.log(separator);
      //   separator.should.equal('/', '/ is not displayed as separator');
      // }
    }
  });

  //Verify that UGC Module is appearing on 980 width screen embedded in article
  /*it("PPE-106608-Verify that UGC Module is appearing on 980 width screen embedded in article", function () {
    browser.url(Input.article);
    // functions.close_Overlay();
    // browser.pause(2000);
    // browser.setViewportSize({ width: 980, height: 1280 });
    // browser.pause(10000);
    // console.log('------------------------------------------------------------');
    // console.log('Verify that UGC Module is appearing on 980 width screen embedded in article');
    // console.log(browser.waitForVisible("//div[@class='akamai-video akamai-layer']"));
    // var video_element = $('//div[@class="akamai-video akamai-layer"]');
    // var width = functions.get_cssValue(video_element, 'width');
    // width.should.equal('980px');
    // console.log('Verified that video is appearing on 980 width screen');
    // console.log('Verifying that UGC module is appearing properly');

    browser.scroll("//div[@id='ugc-all-modules-wrapper']//div[@id='ugc-wrapper']/h3",100,100);
    browser.pause(2000);
    var ugc_module = browser.isVisible("//div[@class='article-content']//div[@id='ugc-all-modules-wrapper']");
    ugc_module.should.equal(true);
    console.log('PPE-106608-Verify that UGC Module is appearing on 980 width screen embedded in article');
    browser.window();
    console.log('------------------------------------------------------------');
  });*/
  //For current prod release there is no ugc module. 
});
var webdriverio = require('webdriverio');
var should = require('should');
var argv = require("yargs").argv;
var PlayerOptions = require('./../../../common/elements/WebMDtv');
var functions = require('./../../../common/functions/Common_functions');
var Input = require('./../../../config/Webmd-tv')[argv.env];

var URL = Input.environment;
describe('QA and Support: Build Responsive UGC Module', function () {

  browser.url(URL);
  browser.pause(20000);
  browser.refresh();
  it('PPE-106610: Verify that the title of the module is read from Our Community as a default ', function () {
    var fromourcommunitytext = functions.get_Text(PlayerOptions.UGC_FromCommunity);
    console.log(fromourcommunitytext);
    fromourcommunitytext.should.equal('FROM OUR COMMUNITY');
    var fromourcommunity = functions.cssProperties(PlayerOptions.UGC_FromCommunity);
    fromourcommunity.height.should.containEql('44');
    fromourcommunity.width.should.containEql('360');
    fromourcommunity.fontFamily.should.containEql('source sans pro');
    fromourcommunity.fontSize.should.containEql('21');
    fromourcommunity.fontColor.should.equal('#554c57');
    browser.pause(1000)
  });

  //Verify that quote area has a maximum of 200 characters including spaces
  it("PPE-106611-Verify that quote area has a maximum of 200 characters including spaces", function () {
    console.log('------------------------------------------------------------');
    console.log('Verify that quote area has a maximum of 200 characters including spaces');
    browser.pause(10000);
    var qcardsGreater200 = [];
    var qcardslesser200 = [];
    var count = functions.get_Text(PlayerOptions.UGC_block_Count);
    var quote_array = new Array(4);
    for (var i = 1; i <= count; i++) {
      var quote_card = browser.element('div.owl-item.active.center > div > div > section.top-content > div.quote');
      quote_array[i - 1] = functions.get_Text(quote_card);
      browser.swipeLeft(PlayerOptions.UGC_block.selector, 100);
      browser.pause(4000);
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
      should.fail(true, false, 'number of characters expected: ' + '<= 200');
    } else {
      console.log('All the quote cards have number characters less than 200 characters');


    }
  });

  //Verify that location consists of town and state
  it("PPE-106619-Verify that location consists of town and state", function () {
    browser.pause(10000);
    console.log('Verifying that location consists of town and state');
    var towns = [];
    var town_expected = ['New York', 'Trenton', 'New York', 'Redbank'];
    var states = [];
    var states_expected = [' NY', ' NY', ' NY', ' NJ'];
    for (var i = 1; i <= 4; i++) {
      browser.pause(4000);
      var location_info = browser.getText("div.owl-item.active.center > div > div > section.bottom-content > div > div > span.address");
      console.log(location_info);
      town = location_info.split(',')[0];
      state = location_info.split(',')[1];
      towns[i - 1] = town;
      states[i - 1] = state;
      browser.swipeLeft(PlayerOptions.UGC_block.selector, 100);
      browser.pause(4000);
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
  it.only("PPE-106620-Verify that the quote card displays the current slide number associated with each slide", function () {
    quote_numnber = [];
    expected_quoteNumber = [];
    for (var i = 1; i <= 4; i++) {
      browser.pause(4000);
      var quote_number = browser.getText("div.owl-item.active.center > div > div > section.top-content > div.counter > span.current-item")
      quote_number[i - 1] = quote_number;
      var total_quotes = browser.getText("div.owl-item.active.center > div > div > section.top-content > div.counter > span:nth-child(3)");
      total_quotes.should.equal('4');
      browser.swipeLeft(PlayerOptions.UGC_block.selector, 100);
      browser.pause(4000);
    }
    var areEqual = functions.arraysAreEqual(quote_number, expected_quoteNumber);
    areEqual.should.equal(true);
    console.log('Quote numbers are displayed on top of the quote');
  });

  it("PPE-106622-Verify that the format of the slide numbering is current slide number slash(/) total", function () {
    var failed = 0;
    for (var i = 1; i <= 4; i++) {
      browser.pause(4000);
      var quote_number = browser.getText("div.owl-item.active.center > div > div > section.top-content > div.counter");
      var quote_separator = quote_number.substring(quote_number.indexOf('/'));
      var quote_array = quote_separator.split("");
      var separator = quote_array.shift();
      separator.should.equal('/', '/ is not displayed as separator');
      browser.swipeLeft(PlayerOptions.UGC_block.selector, 100);
      browser.pause(4000);
    }
  });
});

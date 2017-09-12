//verify_width_height : used to get the height and width of an element
//open : used to  navigate to page
//click_getWindowTitle :click on element and get the new window title and close the new opened window

var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var commonelements = require('./../elements/Common.elements');


var self = module.exports = {

  /* This Method is to get number of pages available for the URL
  Arguments: NA
  Return Type: NA
  */
  getNumberOfPages: function () {
    var temp = browser.elements("#ContentPane30 > article > div.article-body > div.article-page");
  // var temp2 = temp.value;
  // console.log(temp2);
   var pg = temp.value.length;
   console.log(pg);
   return pg;
  },

  getAllPageHeights: function (pages) {
    var ht=[];
    // var temp = browser.elements("#ContentPane30 > article > div.article-body > div.article-page");
    // var pages = temp.value.length;
  
    for (var i=1;i<=pages;i++){
      var t1 =browser.getCssProperty("div.article-body > div:nth-child("+i+")",'height');
      var t = t1.parsed.value;
     ht.push(t);
     //console.log( i +":"+ ht[i].parsed.value );
    
    }
    console.log("-----------");
    console.log(ht);
    return ht;
  },

  verifyAdsonAllPages: function (hts,pgs) {
    for (var i=0;i<pgs;i++) {
      var s= self.calculateScrollht(hts[i]);
      browser.scroll(0,200);
      var temp = hts[i]-200;
      var t1 = browser.isVisible('#ads2-pos-2026-ad-right');
      var t2 = browser.isVisible('.inStreamAd');
      if(t1==true || t2 == true) {
        
      }
      else {
        t1.should.be.equal(true);
        t2.should.be.equal(true);
      }
      browser.scroll(0,temp)
    }
  },

  verifySTAds: function (hts,pgs){
    for (var i = 0; i < pgs; i++) {
      var s = self.calculateScrollht(hts[i]);
      browser.scroll(0, s);
      var temp = hts[i] - s;
      var t1 = browser.isVisible(commonelements.stwrapper.selector);
      t1.should.be.equal(true);
      var t2 = browser.isVisible(commonelements.continueread.selector);
      t2.should.be.equal(true);
      var t3 = browser.isVisible(commonelements.youmightlike.selector);
      t3.should.be.equal(true);
      var t4 = browser.isVisible(commonelements.stunitad1.selector);
      t4.should.be.equal(true);
      var t5 = browser.isVisible(commonelements.stunitad2.selector);
      t5.should.be.equal(true);
      var t6 = browser.isVisible(commonelements.stunitad3.selector);
      t6.should.be.equal(true);
      browser.scroll(0, temp)
    }
  },

  verifyVisibility: function (select){
   var b = browser.isVisible(select);
   return b;
  },

  calculateScrollht: function (ht) {
      var sc = ht*20/100;
      console.log("20%"+sc);
      return sc;
  }


}
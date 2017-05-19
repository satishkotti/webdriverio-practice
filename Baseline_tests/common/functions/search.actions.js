var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var searchhomepage = require('./../elements/searchpage');
var input = require('./../../config/rxtestdata');



module.exports = {

search: function (drugname) {
  searchhomepage.open();
searchhomepage.search.waitForVisible(4000);
searchhomepage.search.setValue(drugname);
searchhomepage.drug.waitForVisible(4000);
searchhomepage.drug.click();
searchhomepage.drugheader.waitForVisible(4000);
var sasank=searchhomepage.drugheader.getText();

var actions={
  sasank:sasank,
  
}
return actions;
},
}

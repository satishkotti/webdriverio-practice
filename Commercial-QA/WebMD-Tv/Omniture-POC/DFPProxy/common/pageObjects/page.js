function Page () {
}
Page.prototype.open = function (url) {
    //browser.windowHandleMaximize('current');
    browser.url(url);
}
Page.prototype.quize = function(){
			return("//li[@class='next']");
};
module.exports = new Page()
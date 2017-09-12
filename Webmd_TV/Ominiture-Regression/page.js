function Page () {
}

Page.prototype.open = function (url) {
    //browser.windowHandleMaximize('current');
    browser.url(url);

}

module.exports = new Page()

function Page () {
}

Page.prototype.open = function (url) {
    browser.url(url);

}



module.exports = new Page()
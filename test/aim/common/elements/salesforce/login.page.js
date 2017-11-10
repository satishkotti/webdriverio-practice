var page = require('./../../../../../page');
var wdioConf = require('./../../../../../wdio.conf.js');
var maxTimeOut= 3000;
var username='#username';// sales force  admin user
var pwd='#password';  // sales force admin pasword
var loginbutton='#Login';  // sales force login button
var tabbar='#tabBar'; // check tab after login
var logout ='//div[@id="userNav-menuItems"]/a[3]';



var sfLoginPg = Object.create(page, {

    username: { get: function () { return browser.element(username); } },
    password: { get: function () { return browser.element(pwd); } },

    passwordvisible: { get: function () { return browser.isVisible(pwd); } },
    usernamevisible: { get: function () { return browser.isVisible(username); } },
    login: { get: function () { return browser.element(loginbutton); } },
     logout: { get: function () { return browser.element(logout); } },
 tabbar: { get: function () { return browser.element(tabbar); } },
   Validationlogin: {value: function () { browser.waitForVisible(tabbar); } },
     logoutValidation: {get: function () { browser.waitForVisible(username); return browser.isExisting(username);} },
    //loginValidation: {get: function () { browser.waitForVisible(header); return browser.isExisting(header);} },
    title: { get: function () { return browser.getTitle(); } },
    failLoginText: {
        get: function () {
            return browser.getText("//div[@id='content']/form/div/fieldset//ul/li");
        }
    },


    open: {
        value: function (url) {
            page.open(url);
        }
    },


});

module.exports = sfLoginPg
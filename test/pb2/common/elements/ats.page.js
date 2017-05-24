var page = require('./../../../common/page');

var button = '//input[@value="***"]'; //All Buttons in ATS page
var stage = "//a[string()='***']";
var downloadLink = '#lnk***File';
var locator = "";

var ats = Object.create(page, {

    UntilExist: { value: () => { browser.waitForExist(locator, 30000); } },
    UntilVisible: { value: () => { browser.waitForVisible(locator, 30000); } },
    gotoURL: {
        value:
            function (chronID, stage) {
                var currentURL= browser.getUrl();
                switch(stage)
                {
                    case 'Live':
                }
                switch(global.testEnv)
                {
                    case 'qa02':
                    case 'QA02':
                    case 'Qa02':
                    if(stage.toLowerCase() != 'live')
                    browser.url("http://ats." + stage + ".perf.webmd.com/StatusChecker.aspx?ID=" + chronID);
                    else
                    browser.url("http://ats.perf.webmd.com/StatusChecker.aspx?ID=" + chronID);
                    break;

                    default:
                    if(stage.toLowerCase() != 'live')
                     //browser.url("http://ats." + global.testEnv + ".webmd.com/StatusChecker.aspx?ID=" + chronID);
                    browser.url("http://ats." + stage + "." +global.testEnv + ".webmd.com/StatusChecker.aspx?ID=" + chronID);
                    else
                    browser.url("http://ats." + global.testEnv + ".webmd.com/StatusChecker.aspx?ID=" + chronID); 
                    break;
                }
                
                return currentURL;
        }
    },
    button: {
        value: {
            get: function (buttonText) {
                locator = button.replace('***', buttonText);
                ats.UntilExist();
                ats.UntilVisible();
                return browser.element(locator);
            }
        }
    },
    stage: {
        value: {
            get: function (stageText) {
                locator = stage.replace('***', stageText);
                if (browser.isExisting(locator)) {
                    return browser.element(locator);
                }
                else {
                    locator = "//td[String()='***']".replace('***', stageText);
                    return browser.element(locator);
                }
            }
        }
    },
    downloadLink:
    {
        value: (fileType, refreshTime) =>
        {
            switch (fileType)
            {
                default:
                locator = downloadLink.replace('***', 'ATS');
                browser.waitUntil( () => {
                    browser.refresh();
                    return browser.isExisting(locator) == true;
                }, 1800000, 'ATS Output is not available yet', refreshTime); break;
            }
        }


    }
});

module.exports = ats;
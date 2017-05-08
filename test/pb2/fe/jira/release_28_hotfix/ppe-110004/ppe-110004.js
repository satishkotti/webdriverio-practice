var d2app = require('./../../../../../d2/cons/common/actions/login.actions');
var repbrowser = require('./../../../../../d2/cons/common/actions/repositoryBrowserTab.actions');


describe('PPE-110004', () => {

    var testArticlePath = 'webmddoc01/webmd_uk/consumer_assets/editorial/articles/news/care_giving/caregiver_stress';
    var testArticle = 'cancer_carers_neglect_own_health.xml';
    var isExisting = function (locator) {
        return browser.isExisting(locator);
    };
    var UntilVisible = function (locator) {
        isExisting(locator);
        browser.waitForVisible(locator);
    };
    var UntilExist = function (locator) {
        browser.waitForExist(locator);
    }
    var SelectArticle = function (article) {
        var locator = '//div[@id="x3-docList-panel"]//span[@title="' + article + '"]';
        UntilVisible(locator);
        browser.click(locator);
    };

    //var crosslinkTabHeading = '//li[@tag_id="Crosslink-widgetTab"]//span[contains(@class,"label") and string()="Crosslink"]';
    var widgetTab = function (tabHeading) {
        return '//li[@tag_id="' + tabHeading + '-widgetTab"]//span[contains(@class,"label") and string()="' + tabHeading + '"]';
    }
    var crosslinkwidgetIFrame = '(//div[@widget_type="ExternalWidget"]//iframe)[1]';
    var crosslinkSummary = '#sideBarContents';
    var crosslinked = '.crossLinked';
    var crosslink = 'a.crossLink';
    var crosslinkOptions = {
        none: '//tr[@class="Row" and contains(.,"None")]',
        canLink: '//tr[@class="Row" and not(contains(.,"None"))]'

    };
    var openCrosslinker = '//button[contains(.,"Open CrossLinker")]';
    var saveCrosslink = '#btnSave';
    var success = '#divSuccess';
    var closeBtn = '//button[contains(.,"Close")]';
    var wcm_layout_template = '//div[@tag_id="Relations-widget"]//span[@title="wcm_layout_template"]';

    before(() => {
        //Launch App and Login
        d2app.login({
            url: 'http://d2.' + global.testEnv + '.webmd.com',
            username: 'QAPublication',
            password: 'QA-Doc#1'
        });

        //Traverse to the required folder
        repbrowser.openFolder(testArticlePath);

        /*
        browser.execute(function(){
            return document.querySelectorAll('span[title="caregiver_stress"]')[0].scrollIntoView();
        });
        browser.click(span[title="caregiver_stress"]);
        */

        //Select the asset
        try {
            SelectArticle(testArticle);
        } catch (err) { };

        //Switch to Crosslink Tab
        browser.click(widgetTab('Crosslink'));

        //Crosslink
        UntilVisible(crosslinkwidgetIFrame);
        var iFrameId = browser.getAttribute(crosslinkwidgetIFrame, 'id');
        browser.frame(iFrameId);
        browser.click(openCrosslinker);
        browser.pause(5000);

        var tabs = browser.getTabIds();
        if (tabs[1] != browser.getCurrentTabId()) {
            browser.switchTab(tabs[1]);
        }
        UntilExist(crosslinkSummary);

        if (isExisting(crosslinked)) {

            browser.click(crosslinked);
            UntilVisible(crosslinkOptions.none);
            browser.click(crosslinkOptions.none);

        }
        else if (isExisting(crosslink)) {
            browser.click(crosslink);
            browser.pause(1000);
            if (browser.isExisting(crosslinkOptions.canLink)) {
                browser.click(crosslinkOptions.canLink);
            }
        }

        //Save
        browser.click(saveCrosslink);
        UntilVisible(success);
        browser.click(closeBtn);

        //Refresh the session
        browser.switchTab();
        browser.refresh();

        //Switch to Relations Tab
        //browser.frame();
        browser.click(widgetTab('Relations'));

        //Validation
        UntilExist(wcm_layout_template);
        var elementsCount = browser.elements(wcm_layout_template).value.length;
        it('Verify whether the relation "wcm_layout_template" exists only once', () => {
            expect(browser.elements(wcm_layout_template).value.length).to.eql(1);

        });
    });

});

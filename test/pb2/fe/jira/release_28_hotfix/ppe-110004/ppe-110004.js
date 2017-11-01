var d2app = require('./../../../../../d2/cons/common/actions/login.actions');
var bottomwidgets = require('./../../../../../d2/cons/common/actions/bottomwidgets.actions');
var crosslinker = require('./../../../../../d2/cons/common/actions/crosslink.actions');
var relations = require('./../../../../../d2/cons/common/actions/relations.actions');
var repbrowser = require('./../../../../../d2/cons/common/actions/repositoryBrowserTab.actions');


describe('PPE-110004: PROD: Publishing UK article fails', () => {

    var testArticlePath = 'webmddoc01/webmd_uk/consumer_assets/editorial/articles/news/care_giving/caregiver_stress';
    var testArticle = 'cancer_carers_neglect_own_health.xml';

    var SelectArticle = function (article) {
        var locator = '//div[@id="x3-docList-panel"]//span[@title="' + article + '"]';
        UntilVisible(locator);
        browser.click(locator);
    };
    var crosslinked = '.crossLinked';
    var crosslink = 'a.crossLink';
    var crosslinkOptions = {
        none: '//tr[@class="Row" and contains(.,"None")]',
        canLink: '//tr[@class="Row" and not(contains(.,"None"))]'

    };

    before(() => {
        //Launch App and Login
        d2app.login({
            url: 'http://d2.' + global.testEnv + '.webmd.com',
            username: 'QAPublication',
            password: 'QA-Doc#1'
        });

        //Traverse to the required folder
        //repbrowser.openFolder(testArticlePath);

        //Select the asset
        SelectArticle(testArticle);

        //Switch to Crosslink Tab
        bottomwidgets.SwitchTo('Crosslink');

        //Crosslink
        crosslinker.crosslinkArticle();

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
        crosslinker.saveCrosslink();

        //Refresh the session
        browser.refresh();

        //Traverse
        //--- ---
        SelectArticle(testArticle);

        //Switch to Relations Tab
        bottomwidgets.SwitchTo('Relations');
    });

    it('PPE-110004: Verify whether the relation "wcm_layout_template" exists only once', () => {
        //Validation
        var wcm_layout_template_relations = relations.getRelation('wcm_layout_template');
        expect(wcm_layout_template_relations.length).to.eql(1);

    });

});

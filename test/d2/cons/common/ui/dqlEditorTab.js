var maxWaitTimeInMs = 100000;
var dqlEditorFrameSelector = "//div[@tag_id='DQL Editor-widget']//iframe[contains(@id,'ExternalWidget')]";

var dqlEditorTabUIObj = {

    dqlEditorWidget: function () {
        browser.pause(maxWaitTimeInMs);
        var audit = browser.isExisting("//span[text()='DQL Editor' and @aria-hidden=not('true')]");
        if (audit == false) {
            browser.click("//div[@id='tab-container-1']//ul[@role='tablist']//span[@id='addTool-button']");
            browser.pause(3000);
            browser.scroll("//center[//table]//following-sibling::center//big[contains(.,'DQL Editor')]");
            browser.pause(3000);
            browser.doubleClick("//center[//table]//following-sibling::center//big[contains(.,'DQL Editor')]", maxWaitTimeInMs);
            browser.click("//center[//table]//following-sibling::center//big[contains(.,'DQL Editor')]", maxWaitTimeInMs);
            browser.click("//center[//table]//following-sibling::center//big[contains(.,'DQL Editor')]", maxWaitTimeInMs);
            browser.waitForVisible("//span[text()='DqlEditor' and @aria-hidden=not('true')]", maxWaitTimeInMs);
        }
        browser.leftClick("//span[text()='DQL Editor' and @aria-hidden=not('true')]");
        dqlEditorTabUIObj.switchToExternalWidgetFrame();
        browser.waitForVisible("//h2[contains(.,'DQL Editor')]", maxWaitTimeInMs);
        browser.frameParent();

    },
    switchToExternalWidgetFrame: function () {
        browser.frame();
        var dqlEditorWidgetIFrameElement = browser.element(dqlEditorFrameSelector);
        browser.frame(dqlEditorWidgetIFrameElement.value);
    },
    dqlEditorQuery: function (query) {
        browser.setValue('#dqlEditor', query);
        browser.pause(3000);
    },
    dqlEditorRun: function () {
        browser.click("//button[contains(.,'Run DQL')]");
        browser.pause(3000);
    },
    dqlEditorClear: function () {
        browser.click("//button[contains(.,'Clear Editor')]");
        browser.pause(3000);
    },
    dqlEditorQueryExecution: function (query, queryresult) {
        dqlEditorTabUIObj.switchToExternalWidgetFrame();
        dqlEditorTabUIObj.dqlEditorQuery(query);
        dqlEditorTabUIObj.dqlEditorRun();
        var query = browser.isExisting("//td[string()='" + queryresult + "']");
        expect(query).to.be.true
        browser.frameParent();

    },
    dqlEditorQueryUpdate: function (updatequery, selectquery, randomSubject) {
        dqlEditorTabUIObj.switchToExternalWidgetFrame();
        dqlEditorTabUIObj.dqlEditorClear();
        dqlEditorTabUIObj.dqlEditorQuery(updatequery);
        dqlEditorTabUIObj.dqlEditorRun();
        var query = browser.isExisting("//td[contains(.,'1')][2]");
        expect(query).to.be.true;
        dqlEditorTabUIObj.dqlEditorClear();
        dqlEditorTabUIObj.dqlEditorQuery(selectquery);
        dqlEditorTabUIObj.dqlEditorRun();
        var query = browser.isExisting("//td[string()='" + randomSubject + "']");
        expect(query).to.be.true;
        browser.frameParent();
    },
    dqlEditiorOption() {
        dqlEditorTabUIObj.switchToExternalWidgetFrame();
        var run = browser.isExisting("//button[contains(.,'Run DQL')]");
        expect(run).to.be.true;
        var clear = browser.isExisting("//button[contains(.,'Clear Editor')]");
        expect(clear).to.be.true;
        var exportoption = browser.isExisting("//button[contains(.,'Export DQL Results To CSV File')]");
        expect(exportoption).to.be.true;
        var results = browser.isExisting("#maxresult");
        expect(results).to.be.true;
        var sql = browser.isExisting("#sqlcheckbox");
        expect(sql).to.be.true;
        browser.frameParent();
    },
    dqlEditorSQLQuery: function (query, WPSQLQuery) {
        dqlEditorTabUIObj.switchToExternalWidgetFrame();
        dqlEditorTabUIObj.dqlEditorQuery(query);
        browser.click("#sqlcheckbox");
        dqlEditorTabUIObj.dqlEditorRun();
        browser.pause(10000);
        var sql = browser.getText("#dqlResults");
        var sqlStartString = sql.search("select");
        var sqlEndString = sql.search(" No.");
        var sqlEndString = sql.search("Row");
        var sqlQuery = sql.substring(sqlStartString, sqlEndString);
        var sqlQuery = sqlQuery.trim();
        expect(sqlQuery).to.equal(WPSQLQuery);

    },
      dqlQueryExecution: function (query) {
        dqlEditorTabUIObj.switchToExternalWidgetFrame();
        dqlEditorTabUIObj.dqlEditorQuery(query);
        dqlEditorTabUIObj.dqlEditorRun();
        browser.waitForVisible("//table[@id='dql']//tr[2]/td[2]",maxWaitTimeInMs);
        var id= browser.getText("//table[@id='dql']//tr[2]/td[2]");
        var count = ('//table[@id="dql"]//tr.length');
      // browser.pause(1000);
        console.log(id);
        browser.frameParent();
        return id;

    },

  
}

module.exports = dqlEditorTabUIObj;
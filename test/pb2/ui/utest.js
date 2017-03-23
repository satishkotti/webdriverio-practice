
var func = require('./../common/functions/functions');
var pageTestData = require('./../data/page.assets');
var templateTestData = require('./../data/template.assets');
var smTestData = require('./../data/sm.assets');
var pmTestData = require('./../data/pagemodule.assets');
var momentTz = require('moment-timezone');
var moment = require('moment');

describe('Unit Tests', () => {

    it.skip('Launch App and login', () => {
        func.LaunchAppAndLogin();
    });

    it.skip('Enter Interior Workcenter', () => {
        func.EnterIWC('Create', 'Templates & Pages');
    });

    it.skip('Traverse Site Structure', () => {
        func.TraverseSS('Level 0/zTest/zSubTest1');
    });

    it.skip('Add Normal Standalone Page to the Node', () => {
        func.Create('Page', pageTestData.normalStandalonePage);
    });

    it.skip('Add a page module', () => {
        func.AddModule('ContentPane0', pmTestData.adModule);
    });

    it.skip('Add another page module', () => {
        func.AddModule('ContentPane1', pmTestData.adModule);
    });

    it.skip('Publish the page to Live', () => {
        func.SaveOrPublishTheAsset('Save', 'Test');
    });

    it.skip('Add Normal Standalone Template to the Node', () => { 
        func.Create('Template', templateTestData.normalStandaloneTemplate);
    });

    it.skip('Create a Shared Module', () => { 
        func.Create('Shared Module', smTestData.adModule);
    });

    it.skip('Search using Chronicle ID in global search', () => {
        func.SearchFor(null, '091e9c5e81521752', 'Global Search', null);
        expect(browser.getTitle()).to.equal('QA-Test-Page-SponsorBox-omOCG - WebMD PageBuilder');
    });

    it.skip('Search using Keyword in global search', () => {
        func.SearchFor('Page', 'test', 'Global Search', null);
        expect(browser.elements('span[data-ng-hide="pLoading"]').value.length).to.equal(1);
        browser.pause(20000);
    });

    it.skip('Search using Interior Workcenter', () => {
        func.SearchFor(null, '02QATestPage002', 'Interior Workcenter', 'Level 0/zTest/zSubTest1');
        expect(browser.elements('//tr[@aria-selected="true"]//td[contains(.,"02QATestPage002")]').value.length).to.equal(1);
    });

    it('Working with timezones', () => {
        var ind = momentTz().tz('Asia/Kolkata');
        var indFormatted = ind.format('MMM DD, YYYY h:mm:ss A');
        var nyc = ind.clone().tz('America/New_York');
        var nycFormatted = ind.clone().tz('America/New_York').format('MMM DD, YYYY h:mm:ss A');

        var nycTestTime = momentTz('Mar 23, 2017 5:57:18 AM');
        var nycTestTimeFormatted = momentTz('Mar 23, 2017 5:57:18 AM').format('MMM DD, YYYY h:mm:ss A');

        console.log('IST: ' + indFormatted);
        console.log('EST: ' + nycFormatted);
        console.log('EST: ' + nycTestTimeFormatted);
        //console.log(ind.isBefore(nyc));
        console.log(nyc);
        console.log(nycTestTime);
        console.log(nycTestTime < nyc);
        //console.log(indFormatted < nycFormatted);
    })
    
});
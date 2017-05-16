var test = require('./../../../common/functions/functions');
var smTestData = require('./../../../../common/config/api.config');
var manualRedirectSqlService = require('./../../../../common/component/redirectapidb/apidb');
var envSettings = require('./../../../../common/config/envSettings.js');
var Promise = require("bluebird");
var rp = require('request-promise');
var fs = require('fs');
var testAssetProps = smTestData.ApiTestData;
var config = envSettings.getConfig();
manualRedirectSqlService.connection = config.dbRtLive;


describe('PPE-81172:Get All Redirects For Entire System (optionally include Deleted)', () => {

    var GetAllRedirectsForEntireSystem = {};
    var _GetAllRedirectsForEntireSystem = {};


    before(() => {

        return Promise.resolve
            (
            manualRedirectSqlService.GetAllRedirectsForEntireSystem().then(function (records) {
                _GetAllRedirectsForEntireSystem = records;

            })
            );

    });

    describe('Get All Redirects For Entire System', () => {
        it('Get the Results from Api', () => {

            GetAllRedirectsForEntireSystem = test.GetResult(_GetAllRedirectsForEntireSystem[0].apiGetAllRedirectsForEntireSystem);

        });


        it('Verify Get All Redirects For Entire System (optionally include Deleted)', () => {
            expect(GetAllRedirectsForEntireSystem.statusCode).to.equal(200);

        });
    });

});

describe('PPE-81172:Get All Redirects For Site ID (optionally include Deleted)', () => {

    var GetAllRedirectsForSiteID = {};
    var _GetAllRedirectsForSiteID = {};


    before(() => {

        return Promise.resolve
            (
            manualRedirectSqlService.GetAllRedirectsForSiteID().then(function (records) {
                _GetAllRedirectsForSiteID = records;

            })
            );

    });

    describe('Get All Redirects For Site ID ', () => {
        it('Get the Results from Api', () => {

            GetAllRedirectsForSiteID = test.GetResult(_GetAllRedirectsForSiteID[0].apiGetAllRedirectsForSiteID);

        });


        it('Verify Get All Redirects For Site ID (optionally include Deleted', () => {

            expect(GetAllRedirectsForSiteID.statusCode).to.equal(200);

        });
    });

});

describe('PPE-81172:Get One Redirect By ID', () => {

    var GetOneRedirectByID = {};
    var _getByID = {};


    before(() => {

        return Promise.resolve
            (
            manualRedirectSqlService.getByID().then(function (records) {
                _getByID = records;

            })
            );

    });

    describe('Get One Redirect By ID', () => {
        it('Get the Results from Api', () => {

            GetOneRedirectByID = test.GetResult(_getByID[0].apigetByID);

        });


        it('Verify Get One Redirect By ID', () => {

            expect(GetOneRedirectByID.statusCode).to.equal(200);
            expect(GetOneRedirectByID.body.Data.Id).to.equal(_getByID[0].Id);
            expect(GetOneRedirectByID.body.Data.FromChronicId).to.equal(_getByID[0].FromChronicId);
            expect(GetOneRedirectByID.body.Data.FromSiteId).to.equal(_getByID[0].FromSiteId);
            expect(GetOneRedirectByID.body.Data.FromPrefix).to.equal(_getByID[0].FromPrefix);
            expect(GetOneRedirectByID.body.Data.FromUrl).to.equal(_getByID[0].FromUrl);
            expect(GetOneRedirectByID.body.Data.ToSiteId).to.equal(_getByID[0].ToSiteId);
            expect(GetOneRedirectByID.body.Data.ToChronicId).to.equal(_getByID[0].ToChronicId);
            expect(GetOneRedirectByID.body.Data.ToUrl).to.equal(_getByID[0].ToUrl);
            expect(GetOneRedirectByID.body.Data.IsExternal).to.equal(_getByID[0].IsExternal);
            expect(GetOneRedirectByID.body.Data.ModifiedBy).to.equal(_getByID[0].ModifiedBy);
            expect(GetOneRedirectByID.body.Data.Status).to.equal(_getByID[0].Status);
            expect(GetOneRedirectByID.body.Data.FromPage_ChronicID).to.equal(_getByID[0].FromPage_ChronicID);
            expect(GetOneRedirectByID.body.Data.FromPage_SiteId).to.equal(_getByID[0].FromPage_SiteId);
            expect(GetOneRedirectByID.body.Data.FromPage_Prefix).to.equal(_getByID[0].FromPage_Prefix);
            expect(GetOneRedirectByID.body.Data.FromPage_Url).to.equal(_getByID[0].FromPage_Url);
            expect(GetOneRedirectByID.body.Data.FromPage_Status).to.equal(_getByID[0].FromPage_Status);
            expect(GetOneRedirectByID.body.Data.ToPage_Url).to.equal(_getByID[0].ToPage_Url);
            expect(GetOneRedirectByID.body.Data.ToPage_Prefix).to.equal(_getByID[0].ToPage_Prefix);
            expect(GetOneRedirectByID.body.Data.ToPage_SiteID).to.equal(_getByID[0].ToPage_SiteID);
            expect(GetOneRedirectByID.body.Data.ToPage_Status).to.equal(_getByID[0].ToPage_Status);
            expect(GetOneRedirectByID.body.Data.ToQString).to.equal(_getByID[0].ToQString);

        });
    });

});

describe('PPE-81172:Get One Redirect By From Url', () => {

    var GetOneRedirectByFromUrl = {};
    var _GetOneRedirectByFromUrl = {};


    before(() => {

        return Promise.resolve
            (
            manualRedirectSqlService.GetOneRedirectByFromUrl().then(function (records) {
                _GetOneRedirectByFromUrl = records;

            })
            );

    });

    describe('Get One Redirect By From Url', () => {
        it('Get the Results from Api', () => {

           GetOneRedirectByFromUrl = test.GetResult(_GetOneRedirectByFromUrl[0].apiGetOneRedirectByFromUrl);

        });


        it('Verify Get One Redirect By From Url', () => {
            expect(GetOneRedirectByFromUrl.statusCode).to.equal(200);

        });
    });

});


describe('PPE-81172:Get All Redirect From Url Pattern (must include the start of the url)', () => {

    var GetAllRedirectFromUrlPattern = {};
    var _GetAllRedirectFromUrlPattern = {};


    before(() => {

        return Promise.resolve
            (
            manualRedirectSqlService.GetAllRedirectFromUrlPattern().then(function (records) {
                _GetAllRedirectFromUrlPattern = records;

            })
            );

    });

    describe('Get All Redirect From Url Pattern', () => {
        it('Get the Results from Api', () => {

           GetAllRedirectFromUrlPattern = test.GetResult(_GetAllRedirectFromUrlPattern[0].apiGetAllRedirectFromUrlPattern);

        });


        it('Verify Get All Redirect From Url Pattern (must include the start of the url)', () => {
            expect(GetAllRedirectFromUrlPattern.statusCode).to.equal(200);

        });
    });

});


describe('PPE-81172:Get All Redirect To Url Pattern (must include the start of the url)', () => {

    var GetAllRedirectToUrlPattern = {};
    var _GetAllRedirectToUrlPattern = {};


    before(() => {

        return Promise.resolve
            (
            manualRedirectSqlService.GetAllRedirectToUrlPattern().then(function (records) {
                _GetAllRedirectToUrlPattern = records;

            })
            );

    });

    describe('Get All Redirect To Url Pattern', () => {
        it('Get the Results from Api', () => {

            GetAllRedirectToUrlPattern = test.GetResult(_GetAllRedirectToUrlPattern[0].apiGetAllRedirectToUrlPattern);

        });


        it('Verify Get All Redirect To Url Pattern (must include the start of the url)', () => {
            expect(GetAllRedirectToUrlPattern.statusCode).to.equal(200);

        });
    });

});


describe('PPE-81172:Get All Redirect From a ChronicleID', () => {

    var GetAllRedirectFromaChronicleID = {};
    var _GetAllRedirectFromaChronicleID = {};


    before(() => {

        return Promise.resolve
            (
            manualRedirectSqlService.GetAllRedirectFromaChronicleID().then(function (records) {
                _GetAllRedirectFromaChronicleID = records;

            })
            );

    });

    describe('Get All Redirect From a ChronicleID', () => {
        it('Get the Results from Api', () => {

            GetAllRedirectFromaChronicleID = test.GetResult(_GetAllRedirectFromaChronicleID[0].apiGetAllRedirectFromaChronicleID);

        });


        it('Verify Get All Redirect From a ChronicleID', () => {
            expect(GetAllRedirectFromaChronicleID.statusCode).to.equal(200);

        });
    });

});


describe('PPE-81172:Get All Redirects Redirected to a ChronicleID', () => {

    var GetAllRedirectsRedirectedtoaChronicleID = {};
    var _GetAllRedirectsRedirectedtoaChronicleID = {};


    before(() => {

        return Promise.resolve
            (
            manualRedirectSqlService.GetAllRedirectsRedirectedtoaChronicleID().then(function (records) {
                _GetAllRedirectsRedirectedtoaChronicleID = records;

            })
            );

    });

    describe('Get All Redirects Redirected to a ChronicleID', () => {
        it('Get the Results from Api', () => {

            GetAllRedirectsRedirectedtoaChronicleID = test.GetResult(_GetAllRedirectsRedirectedtoaChronicleID[0].apiGetAllRedirectsRedirectedtoaChronicleID);

        });


        it('Verify Get All Redirects Redirected to a ChronicleID', () => {
            expect(GetAllRedirectsRedirectedtoaChronicleID.statusCode).to.equal(200);

        });
    });

});

describe('PPE-81172:Get All Redirects To a Url', () => {

    var GetAllRedirectsToaUrl = {};
    var _GetAllRedirectsToaUrl = {};


    before(() => {

        return Promise.resolve
            (
            manualRedirectSqlService.GetAllRedirectsToaUrl().then(function (records) {
                _GetAllRedirectsToaUrl = records;

            })
            );

    });

    describe('Get All Redirects To a Url', () => {
        it('Get the Results from Api', () => {

            GetAllRedirectsToaUrl = test.GetResult(_GetAllRedirectsToaUrl[0].apiGetAllRedirectsToaUrl);

        });


        it('Verify Get All Redirects To a Url', () => {
            expect(GetAllRedirectsToaUrl.statusCode).to.equal(200);

        });
    });

});

describe('PPE-81172:Export All Redirects To Csv File', () => {

    var ExportAllRedirectsToCsvFile = {};
    var _ExportAllRedirectsToCsvFile = {};


    before(() => {

        return Promise.resolve
            (
            manualRedirectSqlService.ExportAllRedirectsToCsvFile().then(function (records) {
                _ExportAllRedirectsToCsvFile = records;

            })
            );

    });

    describe('Export All Redirects To Csv File', () => {
        it('Get the Results from Api', () => {

            ExportAllRedirectsToCsvFile = test.GetResult(_ExportAllRedirectsToCsvFile[0].apiExportAllRedirectsToCsvFile);

        });

        it('Verify Export All Redirects To Csv File', () => {
            expect(ExportAllRedirectsToCsvFile.statusCode).to.equal(200);

        });
    });

});
describe('PPE-81172:Export All Redirects For Site To Csv File', () => {

    var ExportAllRedirectsForSiteToCsvFile = {};
    var _ExportAllRedirectsForSiteToCsvFile = {};


    before(() => {

        return Promise.resolve
            (
            manualRedirectSqlService.ExportAllRedirectsForSiteToCsvFile().then(function (records) {
                _ExportAllRedirectsForSiteToCsvFile = records;

            })
            );

    });

    describe('Export All Redirects For Site To Csv File', () => {
        it('Get the Results from Api', () => {

            ExportAllRedirectsForSiteToCsvFile = test.GetResult(_ExportAllRedirectsForSiteToCsvFile[0].apiExportAllRedirectsForSiteToCsvFile);

        });


        it('Verify Export All Redirects For Site To Csv File', () => {
            expect(ExportAllRedirectsForSiteToCsvFile.statusCode).to.equal(200);

        });
    });

});


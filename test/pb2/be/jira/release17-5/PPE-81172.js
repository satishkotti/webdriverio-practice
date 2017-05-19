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

    before(() => {

        GetAllRedirectsForEntireSystem = test.GetResult(testAssetProps.GetAll_Redirects_For_EntireSystem);

    });

    it('Verify Get All Redirects For Entire System (optionally include Deleted)', () => {
        expect(GetAllRedirectsForEntireSystem.statusCode).to.equal(200);

    });

});

describe('PPE-81172:Get All Redirects For Site ID (optionally include Deleted)', () => {

    before(() => {

        GetAllRedirectsForSiteID = test.GetResult(testAssetProps.GetAll_Redirects_ForSiteID);

    });

    it('Verify Get All Redirects For Site ID (optionally include Deleted)', () => {
        expect(GetAllRedirectsForSiteID.statusCode).to.equal(200);

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

            GetOneRedirectByID = test.GetResult(testAssetProps.GetOne_RedirectByID + _getByID[0].Id);

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

            GetOneRedirectByFromUrl = test.GetResult(testAssetProps.GetOne_RedirectBy_FromUrl + _GetOneRedirectByFromUrl[0].apiGetOneRedirectByFromUrl + testAssetProps.IncludeDeleted);

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

            GetAllRedirectFromUrlPattern = test.GetResult(testAssetProps.GetAll_RedirectFromUrl_Pattern + _GetAllRedirectFromUrlPattern[0].apiGetAllRedirectFromUrlPattern + testAssetProps.IncludeDeleted);

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

    before(() => {

        ExportAllRedirectsToCsvFile = test.GetResult(testAssetProps.Export_AllRedirects_ToCsv_File);

    });

    it('Verify Export All Redirects To Csv File', () => {

        expect(ExportAllRedirectsToCsvFile.statusCode).to.equal(200);
    });

});

describe('PPE-81172:Export All Redirects For Site To Csv File', () => {

    before(() => {

        ExportAllRedirectsForSiteToCsvFile = test.GetResult(testAssetProps.Export_AllRedirects_ForSiteToCsv_File);

    });

    it('Verify Export All Redirects For Site To Csv File', () => {

        expect(ExportAllRedirectsForSiteToCsvFile.statusCode).to.equal(200);
    });

});

describe('PPE-81172:Create Redirect on Urls', () => {

    var CreateRedirectonUrlsInvalidURLCombination = {};
    var CreateByURLInvalidURLCombination = {};
    var _CreateByURLInvalidURLCombination = {};

    var CreateRedirectonUrlsInvalidToURLInternal = {};
    var CreateByURLInvalidToURLInternal = {};
    var _CreateByURLInvalidToURLInternal = {};


    var CreateRedirectonUrlsInvalidFormToURL = {};
    var CreateByURLInvalidFormToURL = {};
    var _CreateByURLInvalidFormToURL = {};

    var CreateRedirectonUrlsInvalidAnotherLifecyle = {};
    var CreateByURLInvalidAnotherLifecyleToURL = {};
    var _CreateByURLInvalidAnotherLifecyleToURL = {};

    var CreateRedirectonUrlsInvalidExtraSlash = {};
    var CreateByURLInvalidExtraSlashToURL = {};
    var _CreateByURLInvalidExtraSlashToURL = {};

    var CreateRedirectonUrlsDoesNoStartWithhttp = {};
    var CreateByURLInvalidDoesNoStartWithhttpToURL = {};
    var _CreateByURLInvalidDoesNoStartWithhttpToURL = {};


    var CreateRedirectonUrlsInvalidFromExtraSlash = {};
    var CreateByURLInvalidExtraSlashFromURL = {};
    var _CreateByURLInvalidExtraSlashFromURL = {};

    var CreateRedirectonUrlsFormDoesNoStartWithhttp = {};
    var CreateByURLInvalidDoesNoStartWithhttpFormURL = {};
    var _CreateByURLInvalidDoesNoStartWithhttpFormURL = {};

    var CreateRedirectonUrlsFromInvalidAnotherLifecyle = {};
    var CreateByURLInvalidAnotherLifecyleFromURL = {};
    var _CreateByURLInvalidAnotherLifecyleFromURL = {};


    var CreateByURLRedirectExists_CreateaRedirectwhereanotherredirect = {};
    var CreateByURLRedirectExists = {};
    var _CreateByURLRedirectExists = {};

    var CreateRedirectonUrlsCreateByURL_CreateExists = {};
    var CreateExists = {};
    var _CreateExists = {};

    var CreateRedirectonUrlsCreateByURL_ActivePage = {};
    var CreateByURLActivePage = {};
    var _CreateByURLActivePage = {};

    var CreateRedirectonUrlsCreateByURL_DeletedPage = {};
    var CreateByURLDeletedPage = {};
    var _CreateByURLDeletedPage = {};

    var CreateRedirectonUrlsCreateByURL_NonExistantPage = {};
    var CreateByURLNonExistantPage = {};
    var _CreateByURLNonExistantPage = {};

    var CreateRedirectonUrlsCreateByURL_ToNonExistantPage = {};
    var CreateByURLToNonExistantPage = {};
    var _CreateByURLToNonExistantPage = {};

    var CreateRedirectonUrlsCreateByURL_Confirmurlsaretrimmed = {};
    var CreateByURLConfirmurlsaretrimmed = {};
    var _CreateByURLConfirmurlsaretrimmed = {};

    var CreateRedirectonUrlsCreateByURL_Testlowercasing = {};
    var CreateByURLTestlowercasing = {};
    var _CreateByURLTestlowercasing = {};

    var CreateRedirectonUrlsCreateByURL_TestToQuerystring = {};
    var CreateByURLTestToQuerystring = {};
    var _CreateByURLTestToQuerystring = {};


    var CRU_CreateByUrlResurrectDeletedRedirect = {};
    var CreateByUrlResurrectDeletedRedirect = {};
    var _CreateByUrlResurrectDeletedRedirect = {};




    before(() => {

        return Promise.resolve
            (
            manualRedirectSqlService.CreateByURLInvalidURLCombination().then(function (records) {
                _CreateByURLInvalidURLCombination = records;

            })
                .then(function () {
                    return manualRedirectSqlService.CreateByURLInvalidToURLInternal()
                })
                .then(function (records) {
                    _CreateByURLInvalidToURLInternal = records;

                })
                .then(function () {
                    return manualRedirectSqlService.CreateByURLInvalidFormToURL()
                })
                .then(function (records) {
                    _CreateByURLInvalidFormToURL = records;

                })

                .then(function () {
                    return manualRedirectSqlService.CreateByURLInvalidAnotherLifecyleToURL()
                })
                .then(function (records) {
                    _CreateByURLInvalidAnotherLifecyleToURL = records;

                })
                .then(function () {
                    return manualRedirectSqlService.CreateByURLInvalidExtraSlashToURL()
                })
                .then(function (records) {
                    _CreateByURLInvalidExtraSlashToURL = records;

                })
                .then(function () {
                    return manualRedirectSqlService.CreateByURLInvalidDoesNoStartWithhttpToURL()
                })
                .then(function (records) {
                    _CreateByURLInvalidDoesNoStartWithhttpToURL = records;

                })
                .then(function () {
                    return manualRedirectSqlService.CreateByURLInvalidExtraSlashFromURL()
                })
                .then(function (records) {
                    _CreateByURLInvalidExtraSlashFromURL = records;

                })
                .then(function () {
                    return manualRedirectSqlService.CreateByURLInvalidDoesNoStartWithhttpFormURL()
                })
                .then(function (records) {
                    _CreateByURLInvalidDoesNoStartWithhttpFormURL = records;

                })
                .then(function () {
                    return manualRedirectSqlService.CreateByURLInvalidAnotherLifecyleFromURL()
                })
                .then(function (records) {
                    _CreateByURLInvalidAnotherLifecyleFromURL = records;

                })
                .then(function () {
                    return manualRedirectSqlService.CreateByURLRedirectExists()
                })
                .then(function (records) {
                    _CreateByURLRedirectExists = records;

                })
                .then(function () {
                    return manualRedirectSqlService.CreateExists()
                })
                .then(function (records) {
                    _CreateExists = records;

                })
                .then(function () {
                    return manualRedirectSqlService.CreateByURLActivePage()
                })
                .then(function (records) {
                    _CreateByURLActivePage = records;

                })

                .then(function () {
                    return manualRedirectSqlService.CreateByURLDeletedPage()
                })
                .then(function (records) {
                    _CreateByURLDeletedPage = records;

                })
                .then(function () {
                    return manualRedirectSqlService.CreateByURLNonExistantPage()
                })
                .then(function (records) {
                    _CreateByURLNonExistantPage = records;

                })
                .then(function () {
                    return manualRedirectSqlService.CreateByURLToNonExistantPage()
                })
                .then(function (records) {
                    _CreateByURLToNonExistantPage = records;

                })
                .then(function () {
                    return manualRedirectSqlService.CreateByURLToExternalURL()
                })
                .then(function (records) {
                    _CreateByURLToExternalURL = records;

                })
                .then(function () {
                    return manualRedirectSqlService.CreateByURLConfirmurlsaretrimmed()
                })
                .then(function (records) {
                    _CreateByURLConfirmurlsaretrimmed = records;

                })
                .then(function () {
                    return manualRedirectSqlService.CreateByURLTestlowercasing()
                })
                .then(function (records) {
                    _CreateByURLTestlowercasing = records;

                })
                .then(function () {
                    return manualRedirectSqlService.CreateByURLTestToQuerystring()
                })
                .then(function (records) {
                    _CreateByURLTestToQuerystring = records;

                })
                .then(function () {
                    return manualRedirectSqlService.CreateByURLTestlowercasingwithquerystring()
                })
                .then(function (records) {
                    _CreateByURLTestlowercasingwithquerystring = records;

                })
                .then(function () {
                    return manualRedirectSqlService.CreateByUrlResurrectDeletedRedirect()
                })
                .then(function (records) {
                    _CreateByUrlResurrectDeletedRedirect = records;

                })



            );

    });

    describe('Create Redirect on Urls', () => {
        it('Get the Results from Api', () => {

            CreateRedirectonUrlsInvalidURLCombination = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLInvalidURLCombination);
            CreateRedirectonUrlsInvalidToURLInternal = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLInvalidToURLInternal);
            CreateRedirectonUrlsInvalidFormToURL = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLInvalidFormToURL);
            CreateRedirectonUrlsInvalidAnotherLifecyle = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLInvalidAnotherLifecyleToURL);
            CreateRedirectonUrlsInvalidExtraSlash = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLInvalidExtraSlashToURL);
            CreateRedirectonUrlsDoesNoStartWithhttp = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLInvalidDoesNoStartWithhttpToURL);
            CreateRedirectonUrlsInvalidFromExtraSlash = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLInvalidExtraSlashFromURL);
            CreateRedirectonUrlsFormDoesNoStartWithhttp = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLInvalidDoesNoStartWithhttpFormURL);
            CreateRedirectonUrlsFromInvalidAnotherLifecyle = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLInvalidAnotherLifecyleFromURL);
            CreateByURLRedirectExists_CreateaRedirectwhereanotherredirect = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLRedirectExists);
            CreateRedirectonUrlsCreateByURL_CreateExists = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateExists);
            CreateRedirectonUrlsCreateByURL_ActivePage = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLActivePage);
            CreateRedirectonUrlsCreateByURL_DeletedPage = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLDeletedPage);
            CreateRedirectonUrlsCreateByURL_NonExistantPage = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLNonExistantPage);
            CreateRedirectonUrlsCreateByURL_ToNonExistantPage = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLToNonExistantPage);
            CreateRedirectonUrlsCreateByURL_ToExternalURL = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLToExternalURL);
            CreateRedirectonUrlsCreateByURL_Confirmurlsaretrimmed = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLConfirmurlsaretrimmed);
            CreateRedirectonUrlsCreateByURL_Testlowercasing = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLTestlowercasing);
            CreateRedirectonUrlsCreateByURL_TestToQuerystring = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLTestToQuerystring);
            CRU_CreateByURLTestlowercasingwithquerystring = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLTestlowercasingwithquerystring);
            CRU_CreateByUrlResurrectDeletedRedirect = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByUrlResurrectDeletedRedirect);

        });

        it('1)Verify From Url is the same as To Url', () => {
            console.log(CreateRedirectonUrlsInvalidURLCombination.body.Message);
            expect(CreateRedirectonUrlsInvalidURLCombination.body.StatusCode).to.not.equal(1);

        });

        it('2)Verify There is already a redirect ID ', () => {
            console.log(CreateRedirectonUrlsInvalidToURLInternal.body.Message);
            expect(CreateRedirectonUrlsInvalidToURLInternal.body.StatusCode).to.not.equal(1);

        });
        it('3)Verify Invalid To Url (// is invalid)', () => {
            console.log(CreateRedirectonUrlsInvalidFormToURL.body.Message);
            expect(CreateRedirectonUrlsInvalidFormToURL.body.StatusCode).to.not.equal(1);

        });
        it('4)Verify There is already a redirect', () => {
            console.log(CreateRedirectonUrlsInvalidAnotherLifecyle.body.Message);
            expect(CreateRedirectonUrlsInvalidAnotherLifecyle.body.StatusCode).to.not.equal(1);

        });
        it('5)Verify Invalid To Url (// is invalid)', () => {
            console.log(CreateRedirectonUrlsInvalidExtraSlash.body.Message);
            expect(CreateRedirectonUrlsInvalidExtraSlash.body.StatusCode).to.not.equal(1);

        });
        it('6)Verify To URL must start with http:// or https://', () => {
            console.log(CreateRedirectonUrlsDoesNoStartWithhttp.body.Message);
            expect(CreateRedirectonUrlsDoesNoStartWithhttp.body.StatusCode).to.not.equal(1);

        });
        it('7)Verify Invalid From Url (// is invalid)', () => {
            console.log(CreateRedirectonUrlsInvalidFromExtraSlash.body.Message);
            expect(CreateRedirectonUrlsInvalidFromExtraSlash.body.StatusCode).to.not.equal(1);

        });
        it('8)From URL must start with http:// or https://', () => {
            console.log(CreateRedirectonUrlsFormDoesNoStartWithhttp.body.Message);
            expect(CreateRedirectonUrlsFormDoesNoStartWithhttp.body.StatusCode).to.not.equal(1);

        });
        it('9)Verify From URL is invalid', () => {
            console.log(CreateRedirectonUrlsFromInvalidAnotherLifecyle.body.Message);
            expect(CreateRedirectonUrlsFromInvalidAnotherLifecyle.body.StatusCode).to.not.equal(1);

        });
        it('10)Verify There is already a redirect)', () => {
            console.log(CreateByURLRedirectExists_CreateaRedirectwhereanotherredirect.body.Message);
            expect(CreateByURLRedirectExists_CreateaRedirectwhereanotherredirect.body.StatusCode).to.not.equal(1);

        });
        it('11)Verify To Page is redirected', () => {
            console.log(CreateRedirectonUrlsCreateByURL_CreateExists.body.Message);
            expect(CreateRedirectonUrlsCreateByURL_CreateExists.body.StatusCode).to.not.equal(1);

        });
        it('12)Verify Create By URL - Active Page to Active Page', () => {
            console.log(CreateRedirectonUrlsCreateByURL_ActivePage.body.Message);
            expect(CreateRedirectonUrlsCreateByURL_ActivePage.body.StatusCode).to.equal(1);
            expect(CreateRedirectonUrlsCreateByURL_ActivePage.FromChronicId).to.equal(CreateRedirectonUrlsCreateByURL_ActivePage.FromPage_ChronicID);
            expect(CreateRedirectonUrlsCreateByURL_ActivePage.FromSiteId).to.equal(CreateRedirectonUrlsCreateByURL_ActivePage.FromPage_SiteId);
            expect(CreateRedirectonUrlsCreateByURL_ActivePage.FromPrefix).to.equal(CreateRedirectonUrlsCreateByURL_ActivePage.FromPage_Prefix);
            expect(CreateRedirectonUrlsCreateByURL_ActivePage.FromUrl).to.equal(CreateRedirectonUrlsCreateByURL_ActivePage.FromPage_Url);
            expect(CreateRedirectonUrlsCreateByURL_ActivePage.body.ToChronicId).to.equal(1);
            expect(CreateRedirectonUrlsCreateByURL_ActivePage.body.ToUrl).to.equal('null');

        });
        it('13)Verify Create By URL - Deleted Page to Active Page', () => {
            console.log(CreateRedirectonUrlsCreateByURL_DeletedPage.body.Message);
            expect(CreateRedirectonUrlsCreateByURL_DeletedPage.body.StatusCode).to.not.equal(1);

        });
        it('14)Verify Create By URL - Non Existant Page to Active Page', () => {
            console.log(CreateRedirectonUrlsCreateByURL_NonExistantPage.body.Message);
            expect(CreateRedirectonUrlsCreateByURL_NonExistantPage.body.StatusCode).to.not.equal(1);

        });
        it('15)Verify Create By URL - To Non Existant Page', () => {
            console.log(CreateRedirectonUrlsCreateByURL_ToNonExistantPage.body.Message);
            expect(CreateRedirectonUrlsCreateByURL_ToNonExistantPage.body.StatusCode).to.not.equal(1);

        });
        it('16)Verify Create By URL - To External URL', () => {
            console.log(CreateRedirectonUrlsCreateByURL_ToExternalURL.body.Message);
            expect(CreateRedirectonUrlsCreateByURL_ToExternalURL.body.StatusCode).to.not.equal(1);

        });
        it('17)Create By URL - Confirm urls are trimmed', () => {
            console.log(CreateRedirectonUrlsCreateByURL_Confirmurlsaretrimmed.body.Message);
            expect(CreateRedirectonUrlsCreateByURL_Confirmurlsaretrimmed.body.StatusCode).to.not.equal(1);

        });
        it('18)Verify Create By URL- Test lowercasing', () => {
            console.log(CreateRedirectonUrlsCreateByURL_Testlowercasing.body.Message);
            expect(CreateRedirectonUrlsCreateByURL_Testlowercasing.body.StatusCode).to.not.equal(1);

        });
        it('19)Verify Create By URL - Test To Querystring', () => {
            console.log(CreateRedirectonUrlsCreateByURL_Testlowercasing.body.Message);
            expect(CreateRedirectonUrlsCreateByURL_Testlowercasing.body.StatusCode).to.not.equal(1);

        });
        it('20)Verify Create By URL - Test lowercasing with querystring', () => {
            console.log(CRU_CreateByURLTestlowercasingwithquerystring.body.Message);
            expect(CRU_CreateByURLTestlowercasingwithquerystring.body.StatusCode).to.not.equal(1);

        });
        it('21)Verify Create By Url - Resurrect Deleted Redirect', () => {
            console.log(CRU_CreateByUrlResurrectDeletedRedirect.body.Message);
            expect(CRU_CreateByUrlResurrectDeletedRedirect.body.StatusCode).to.not.equal(1);

        });
    });

});

describe('PPE-81172:Create Redirect on Chronicle IDS', () => {

    var CreateByIDChronicleIDsSame = {};
    var ChronicleIDsSame = {};
    var _ChronicleIDsSame = {};

    var CreateByIDChronicleIDsSame = {};
    var ChronicleIDsSame = {};
    var _ChronicleIDsSame = {};


    before(() => {

        return Promise.resolve
            (
            manualRedirectSqlService.ChronicleIDsSame().then(function (records) {
                _ChronicleIDsSame = records;

            })
               


            );

    });

    describe('Create Redirect on Chronicle IDS', () => {
        it('Get the Results from Api', () => {

           
            CreateByIDChronicleIDsSame = test.PostResult(testAssetProps.Create_Redirect_on_ChronicleIDS,_ChronicleIDsSame);


        });

        it('1)Confirm Failure - ChronicleIDs Same', () => {
            console.log(CreateByIDChronicleIDsSame.body.Message);
            expect(CreateByIDChronicleIDsSame.body.StatusCode).to.not.equal(1);

        });

    });
});


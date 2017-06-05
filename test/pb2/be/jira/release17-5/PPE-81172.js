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

            GetAllRedirectToUrlPattern = test.GetResult(testAssetProps.GetAll_RedirectToUrl_Pattern + _GetAllRedirectToUrlPattern[0].apiGetAllRedirectToUrlPattern + testAssetProps.IncludeDeleted);

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

            GetAllRedirectFromaChronicleID = test.GetResult(testAssetProps.GetAll_RedirectFroma_ChronicleID + _GetAllRedirectFromaChronicleID[0].apiGetAllRedirectFromaChronicleID);

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

            GetAllRedirectsRedirectedtoaChronicleID = test.GetResult(testAssetProps.GetAll_RedirectsRedirectedtoa_ChronicleID + _GetAllRedirectsRedirectedtoaChronicleID[0].apiGetAllRedirectsRedirectedtoaChronicleID);


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

            GetAllRedirectsToaUrl = test.GetResult(testAssetProps.GetAll_Redirects_ToaUrl + _GetAllRedirectsToaUrl[0].apiGetAllRedirectsToaUrl + testAssetProps.IncludeDeleted);

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
    var CreateByURLActivePageDomain = {};
    var _CreateByURLActivePageDomain = {};

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

    var CreateRedirectonUrlsCreateByURL_Testlowercasing = {};

    var CreateRedirectonUrlsCreateByURL_TestToQuerystring = {};

    var CRU_CreateByUrlResurrectDeletedRedirect = {};
    var CreateByUrlResurrectDeletedRedirect = {};
    var _CreateByUrlResurrectDeletedRedirect = {};

    describe('Create By URL - Invalid URL Combination', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.CreateByURLActivePage().then(function (records) {

                    _CreateByURLActivePage = {

                        FromUrl: records[0].Url, toUrl: records[0].Url

                    };

                })
                );
        });

        it('Get the Results from Api', () => {

            CreateRedirectonUrlsInvalidURLCombination = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLActivePage);

        });

    });
    describe('Create By URL - Invalid To URL ', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.CreateByURLInvalidToURLInternal().then(function (records) {

                    _CreateByURLInvalidToURLInternal = {

                        FromUrl: records[0].FromUrl, toUrl: records[0].ToUrl

                    };

                })
                );
        });

        it('Get the Results from Api', () => {

            CreateRedirectonUrlsInvalidToURLInternal = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLInvalidToURLInternal);

        });

    });
    describe('Create By URL - Invalid To URL', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.CreateByURLInvalidFormToURL().then(function (records) {

                    _CreateByURLInvalidFormToURL = {

                        FromUrl: records[0].FromUrl, toUrl: records[0].ToUrl

                    };

                })
                );
        });

        it('Get the Results from Api', () => {

            CreateRedirectonUrlsInvalidFormToURL = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLInvalidFormToURL);

        });

    });
    describe('Create By URL - Invalid To URL', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.CreateByURLInvalidAnotherLifecyleToURL().then(function (records) {

                    _CreateByURLInvalidAnotherLifecyleToURL = {

                        FromUrl: records[0].FromUrl, toUrl: records[0].ToUrl

                    };

                })
                );
        });

        it('Get the Results from Api', () => {

            CreateRedirectonUrlsInvalidAnotherLifecyle = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLInvalidAnotherLifecyleToURL);

        });

    });
    describe('Create By URL - Invalid To URL', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.CreateByURLInvalidExtraSlashToURL().then(function (records) {

                    _CreateByURLInvalidExtraSlashToURL = {

                        FromUrl: records[0].FromUrl, toUrl: records[0].ToUrl

                    };

                })
                );
        });

        it('Get the Results from Api', () => {

            CreateRedirectonUrlsInvalidExtraSlash = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLInvalidExtraSlashToURL);

        });

    });
    describe('Create By URL - Invalid To URL', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.CreateByURLInvalidDoesNoStartWithhttpToURL().then(function (records) {

                    _CreateByURLInvalidDoesNoStartWithhttpToURL = {

                        FromUrl: records[0].FromUrl, toUrl: records[0].ToUrl

                    };

                })
                );
        });

        it('Get the Results from Api', () => {

            CreateRedirectonUrlsDoesNoStartWithhttp = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLInvalidDoesNoStartWithhttpToURL);

        });

    });
    describe('Create By URL - Invalid From URL', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.CreateByURLInvalidExtraSlashFromURL().then(function (records) {

                    _CreateByURLInvalidExtraSlashFromURL = {

                        FromUrl: records[0].FromUrl, toUrl: records[0].ToUrl

                    };

                })
                );
        });

        it('Get the Results from Api', () => {

            CreateRedirectonUrlsInvalidFromExtraSlash = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLInvalidExtraSlashFromURL);

        });

    });
    describe('Create By URL - Invalid From URL', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.CreateByURLInvalidDoesNoStartWithhttpFormURL().then(function (records) {

                    _CreateByURLInvalidDoesNoStartWithhttpFormURL = {

                        FromUrl: records[0].FromUrl, toUrl: records[0].ToUrl

                    };

                })
                );
        });

        it('Get the Results from Api', () => {

            CreateRedirectonUrlsFormDoesNoStartWithhttp = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLInvalidDoesNoStartWithhttpFormURL);

        });

    });
    describe('Create By URL - Invalid From URL', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.CreateByURLInvalidAnotherLifecyleFromURL().then(function (records) {

                    _CreateByURLInvalidAnotherLifecyleFromURL = {

                        FromUrl: records[0].FromUrl, toUrl: records[0].ToUrl

                    };

                })
                );
        });

        it('Get the Results from Api', () => {

            CreateRedirectonUrlsFromInvalidAnotherLifecyle = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLInvalidAnotherLifecyleFromURL);

        });

    });
    describe('Create By URL - Redirect Exists', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.CreateByURLRedirectExists().then(function (records) {

                    _CreateByURLRedirectExists = {

                        FromUrl: records[0].Url, toUrl: records[1].Url

                    };

                })
                );
        });

        it('Get the Results from Api', () => {

            CreateByURLRedirectExists_CreateaRedirectwhereanotherredirect = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLRedirectExists);

        });

    });
    describe('Create By URL - Create A->B When B->C Exists ', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.CreateExists().then(function (records) {

                    _CreateExists = {

                        FromUrl: records[0].FromUrl, toUrl: records[0].ToUrl

                    };

                })
                );
        });

        it('Get the Results from Api', () => {

            CreateRedirectonUrlsCreateByURL_CreateExists = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateExists);

        });

    });
    describe('Create By URL - Active Page to Active Page', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.CreateByURLActivePage().then(function (records) {

                    _CreateByURLActivePage = {

                        FromUrl: records[0].Url, toUrl: records[1].Url

                    };

                })
                    .then(function () {
                        return manualRedirectSqlService.CreateByURLActivePageDomain()

                    })
                    .then(function (records) {
                        _CreateByURLActivePageDomain = records;

                    })
                );
        });

        it('Get the Results from Api', () => {

            CreateRedirectonUrlsCreateByURL_ActivePage = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLActivePage);

        });

    });
    describe('Create By URL - Deleted Page to Active Page', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.CreateByURLDeletedPage().then(function (records) {

                    _CreateByURLDeletedPage = {

                        FromUrl: records[0].FromUrl, toUrl: records[0].ToUrl

                    };

                })

                );
        });

        it('Get the Results from Api', () => {

            CreateRedirectonUrlsCreateByURL_DeletedPage = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLDeletedPage);

        });

    });
    describe('Create By URL - Non Existant Page to Active Page', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.CreateByURLNonExistantPage().then(function (records) {

                    _CreateByURLNonExistantPage = {

                        FromUrl: records[0].FromUrl, toUrl: records[0].ToUrl

                    };

                })

                );
        });

        it('Get the Results from Api', () => {

            CreateRedirectonUrlsCreateByURL_NonExistantPage = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLNonExistantPage);

        });

    });
    describe('Create By URL - To Non Existant Page', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.CreateByURLToNonExistantPage().then(function (records) {

                    _CreateByURLToNonExistantPage = {

                        FromUrl: records[0].FromUrl, toUrl: records[0].ToUrl

                    };

                })

                );
        });

        it('Get the Results from Api', () => {

            CreateRedirectonUrlsCreateByURL_ToNonExistantPage = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLToNonExistantPage);

        });

    });
    describe('Create By URL - To External URL', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.CreateByURLToExternalURL().then(function (records) {

                    _CreateByURLToExternalURL = {

                        FromUrl: records[0].FromUrl, toUrl: records[0].ToUrl

                    };

                })

                );
        });

        it('Get the Results from Api', () => {

            CreateRedirectonUrlsCreateByURL_ToExternalURL = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLToExternalURL);

        });

    });
    describe('Create By URL - Confirm urls are trimmed', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.CreateByURLActivePage().then(function (records) {

                    _CreateByURLActivePage = {

                        FromUrl: '     ' + records[0].Url + '     ', toUrl: '     ' + records[1].Url + '     '

                    };

                })

                );
        });

        it('Get the Results from Api', () => {

            CreateRedirectonUrlsCreateByURL_Confirmurlsaretrimmed = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLActivePage);

        });

    });
    describe('Create By URL- Test lowercasing', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.CreateByURLActivePage().then(function (records) {

                    _CreateByURLActivePage = {

                        FromUrl: records[0].Url.toUpperCase(), toUrl: records[1].Url.toUpperCase()

                    };

                })

                );
        });

        it('Get the Results from Api', () => {

            CreateRedirectonUrlsCreateByURL_Testlowercasing = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLActivePage);

        });

    });
    describe('Create By URL - Test To Querystring', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.CreateByURLActivePage().then(function (records) {

                    _CreateByURLActivePage = {

                        FromUrl: records[0].Url, toUrl: records[1].Url + '?a=b&c=d'

                    };

                })

                );
        });

        it('Get the Results from Api', () => {

            CreateRedirectonUrlsCreateByURL_TestToQuerystring = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLActivePage);

        });

    });
    describe('Create By URL - Test lowercasing with querystring', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.CreateByURLActivePage().then(function (records) {

                    _CreateByURLActivePage = {

                        FromUrl: records[0].Url, toUrl: records[1].Url.toUpperCase() + '?A=b&C=d'

                    };

                })

                );
        });

        it('Get the Results from Api', () => {

            CRU_CreateByURLTestlowercasingwithquerystring = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByURLActivePage);

        });

    });
    describe('Create By Url ', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.CreateByURLActivePage().then(function (records) {

                    _CreateByURLActivePage = {

                        FromUrl: records[0].Url, toUrl: records[1].Url

                    };

                })

                );
        });

        it('Get the Results from Api', () => {

            CRU_CreateByUrlResurrectDeletedRedirect = test.PostResult(testAssetProps.Create_Redirect_on_Urls, _CreateByUrlResurrectDeletedRedirect);

        });
        it('1)Verify From Url is the same as To Url', () => {
            console.log(CreateRedirectonUrlsInvalidURLCombination.body.Message);
            expect(CreateRedirectonUrlsInvalidURLCombination.body.StatusCode).to.not.equal(1);

        });
        it('2)Verify To Page is redirected', () => {
            console.log(CreateRedirectonUrlsInvalidToURLInternal.body.Message);
            expect(CreateRedirectonUrlsInvalidToURLInternal.body.StatusCode).to.not.equal(1);

        });
        it('3)Verify Invalid To Url (// is invalid)', () => {
            console.log(CreateRedirectonUrlsInvalidFormToURL.body.Message);
            expect(CreateRedirectonUrlsInvalidFormToURL.body.StatusCode).to.not.equal(1);

        });
        it('4)Verify To Page cannot point to another WebMD Environment or another Documentum Lifecycle', () => {
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
        it('8)Verify From URL must start with http:// or https://', () => {
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
            expect(CreateRedirectonUrlsCreateByURL_ActivePage.body.Data[0].FromChronicId).to.equal(CreateRedirectonUrlsCreateByURL_ActivePage.body.Data[0].FromPage_ChronicID);
            expect(CreateRedirectonUrlsCreateByURL_ActivePage.body.Data[0].FromSiteId).to.equal(CreateRedirectonUrlsCreateByURL_ActivePage.body.Data[0].FromPage_SiteId);
            expect(CreateRedirectonUrlsCreateByURL_ActivePage.body.Data[0].FromPrefix).to.equal(CreateRedirectonUrlsCreateByURL_ActivePage.body.Data[0].FromPage_Prefix);
            expect(CreateRedirectonUrlsCreateByURL_ActivePage.body.Data[0].FromUrl).to.equal(CreateRedirectonUrlsCreateByURL_ActivePage.body.Data[0].FromPage_Url);
            console.log(CreateRedirectonUrlsCreateByURL_ActivePage.body.Data[0].ToChronicId);
            console.log(CreateRedirectonUrlsCreateByURL_ActivePage.body.Data[0].ToUrl);
            expect(CreateRedirectonUrlsCreateByURL_ActivePage.body.Data[0].ToChronicId).to.not.equal(null);
            expect(CreateRedirectonUrlsCreateByURL_ActivePage.body.Data[0].ToUrl).to.equal(null);
            console.log('http://' + CreateRedirectonUrlsCreateByURL_ActivePage.body.Data[0].FromPrefix + _CreateByURLActivePageDomain[0].domain + CreateRedirectonUrlsCreateByURL_ActivePage.body.Data[0].FromPage_Url);
            console.log(CreateRedirectonUrlsCreateByURL_ActivePage.body.Data[0].FullFromUrl);
            expect('http://' + CreateRedirectonUrlsCreateByURL_ActivePage.body.Data[0].FromPrefix + _CreateByURLActivePageDomain[0].domain + CreateRedirectonUrlsCreateByURL_ActivePage.body.Data[0].FromPage_Url).to.equal(CreateRedirectonUrlsCreateByURL_ActivePage.body.Data[0].FullFromUrl);

        });
        it('13)Verify Create By URL - Deleted Page to Active Page', () => {
            console.log(CreateRedirectonUrlsCreateByURL_DeletedPage.body.Message);
            expect(CreateRedirectonUrlsCreateByURL_DeletedPage.body.StatusCode).to.equal(1);
            expect(CreateRedirectonUrlsCreateByURL_DeletedPage.body.Data[0].FromPage_ChronicID).to.equal(null);
            expect(CreateRedirectonUrlsCreateByURL_DeletedPage.body.Data[0].FromPage_SiteId).to.equal(null);
            expect(CreateRedirectonUrlsCreateByURL_DeletedPage.body.Data[0].FromPage_Prefix).to.equal(null);
            expect(CreateRedirectonUrlsCreateByURL_DeletedPage.body.Data[0].FromPage_Url).to.equal(null);
            expect(CreateRedirectonUrlsCreateByURL_DeletedPage.body.Data[0].FromPage_Status).to.equal(null);
            expect(CreateRedirectonUrlsCreateByURL_DeletedPage.body.Data[0].ToChronicId).to.not.equal(null);
            expect(CreateRedirectonUrlsCreateByURL_DeletedPage.body.Data[0].ToUrl).to.equal(null);
            console.log('http://' + CreateRedirectonUrlsCreateByURL_DeletedPage.body.Data[0].FromPrefix + _CreateByURLActivePageDomain[0].domain + CreateRedirectonUrlsCreateByURL_DeletedPage.body.Data[0].FromUrl);
            console.log(CreateRedirectonUrlsCreateByURL_DeletedPage.body.Data[0].FullFromUrl);
            expect('http://' + CreateRedirectonUrlsCreateByURL_DeletedPage.body.Data[0].FromPrefix + _CreateByURLActivePageDomain[0].domain + CreateRedirectonUrlsCreateByURL_DeletedPage.body.Data[0].FromUrl).to.equal(CreateRedirectonUrlsCreateByURL_DeletedPage.body.Data[0].FullFromUrl);

        });
        it('14)Verify Create By URL - Non Existant Page to Active Page', () => {
            console.log(CreateRedirectonUrlsCreateByURL_NonExistantPage.body.Message);
            expect(CreateRedirectonUrlsCreateByURL_NonExistantPage.body.StatusCode).to.equal(1);
            expect(CreateRedirectonUrlsCreateByURL_NonExistantPage.body.Data[0].FromPage_ChronicID).to.equal(null);
            expect(CreateRedirectonUrlsCreateByURL_NonExistantPage.body.Data[0].FromPage_SiteId).to.equal(null);
            expect(CreateRedirectonUrlsCreateByURL_NonExistantPage.body.Data[0].FromPage_Prefix).to.equal(null);
            expect(CreateRedirectonUrlsCreateByURL_NonExistantPage.body.Data[0].FromPage_Url).to.equal(null);
            expect(CreateRedirectonUrlsCreateByURL_NonExistantPage.body.Data[0].FromPage_Status).to.equal(null);
            expect(CreateRedirectonUrlsCreateByURL_NonExistantPage.body.Data[0].ToChronicId).to.not.equal(null);
            expect(CreateRedirectonUrlsCreateByURL_NonExistantPage.body.Data[0].ToUrl).to.equal(null);
            console.log('http://' + CreateRedirectonUrlsCreateByURL_NonExistantPage.body.Data[0].FromPrefix + _CreateByURLActivePageDomain[0].domain + CreateRedirectonUrlsCreateByURL_NonExistantPage.body.Data[0].FromUrl);
            console.log(CreateRedirectonUrlsCreateByURL_NonExistantPage.body.Data[0].FullFromUrl);
            expect('http://' + CreateRedirectonUrlsCreateByURL_NonExistantPage.body.Data[0].FromPrefix + _CreateByURLActivePageDomain[0].domain + CreateRedirectonUrlsCreateByURL_NonExistantPage.body.Data[0].FromUrl).to.equal(CreateRedirectonUrlsCreateByURL_NonExistantPage.body.Data[0].FullFromUrl);

        });
        it('15)Verify Create By URL - To Non Existant Page', () => {
            console.log(CreateRedirectonUrlsCreateByURL_ToNonExistantPage.body.Message);
            expect(CreateRedirectonUrlsCreateByURL_ToNonExistantPage.body.StatusCode).to.equal(1);
            expect(CreateRedirectonUrlsCreateByURL_ToNonExistantPage.body.Data[0].ToPage_Url).to.equal(null);
            expect(CreateRedirectonUrlsCreateByURL_ToNonExistantPage.body.Data[0].ToPage_Prefix).to.equal(null);
            expect(CreateRedirectonUrlsCreateByURL_ToNonExistantPage.body.Data[0].ToPage_SiteID).to.equal(null);
            expect(CreateRedirectonUrlsCreateByURL_ToNonExistantPage.body.Data[0].ToPage_Status).to.equal(null);
            expect(CreateRedirectonUrlsCreateByURL_ToNonExistantPage.body.Data[0].ToChronicId).to.equal(null);
            console.log(CreateRedirectonUrlsCreateByURL_ToNonExistantPage.body.Data[0].ToUrl);
            console.log(CreateRedirectonUrlsCreateByURL_ToNonExistantPage.body.Data[0].FullToUrl);
            expect(CreateRedirectonUrlsCreateByURL_ToNonExistantPage.body.Data[0].ToUrl).to.equal(CreateRedirectonUrlsCreateByURL_ToNonExistantPage.body.Data[0].FullToUrl);

        });
        it('16)Verify Create By URL - To External URL', () => {
            console.log(CreateRedirectonUrlsCreateByURL_ToExternalURL.body.Message);
            expect(CreateRedirectonUrlsCreateByURL_ToExternalURL.body.StatusCode).to.equal(1);
            expect(CreateRedirectonUrlsCreateByURL_ToExternalURL.body.Data[0].ToChronicId).to.equal(null);
            expect(CreateRedirectonUrlsCreateByURL_ToExternalURL.body.Data[0].ToUrl).to.not.equal(null);

        });
        it('17)Create By URL - Confirm urls are trimmed', () => {
            console.log(CreateRedirectonUrlsCreateByURL_Confirmurlsaretrimmed.body.Message);
            expect(CreateRedirectonUrlsCreateByURL_Confirmurlsaretrimmed.body.StatusCode).to.equal(1);
            console.log('http://' + CreateRedirectonUrlsCreateByURL_Confirmurlsaretrimmed.body.Data[0].FromPrefix + _CreateByURLActivePageDomain[0].domain + CreateRedirectonUrlsCreateByURL_Confirmurlsaretrimmed.body.Data[0].FromUrl);
            console.log(CreateRedirectonUrlsCreateByURL_Confirmurlsaretrimmed.body.Data[0].FullFromUrl);
            expect('http://' + CreateRedirectonUrlsCreateByURL_Confirmurlsaretrimmed.body.Data[0].FromPrefix + _CreateByURLActivePageDomain[0].domain + CreateRedirectonUrlsCreateByURL_Confirmurlsaretrimmed.body.Data[0].FromUrl).to.equal(CreateRedirectonUrlsCreateByURL_Confirmurlsaretrimmed.body.Data[0].FullFromUrl);
            console.log('http://' + CreateRedirectonUrlsCreateByURL_Confirmurlsaretrimmed.body.Data[0].ToPage_Prefix + _CreateByURLActivePageDomain[0].domain + CreateRedirectonUrlsCreateByURL_Confirmurlsaretrimmed.body.Data[0].ToPage_Url);
            console.log(CreateRedirectonUrlsCreateByURL_Confirmurlsaretrimmed.body.Data[0].FullToUrl);
            expect('http://' + CreateRedirectonUrlsCreateByURL_Confirmurlsaretrimmed.body.Data[0].ToPage_Prefix + _CreateByURLActivePageDomain[0].domain + CreateRedirectonUrlsCreateByURL_Confirmurlsaretrimmed.body.Data[0].ToPage_Url).to.equal(CreateRedirectonUrlsCreateByURL_Confirmurlsaretrimmed.body.Data[0].FullToUrl);

        });
        it('18)Verify Create By URL- Test lowercasing', () => {
            console.log(CreateRedirectonUrlsCreateByURL_Testlowercasing.body.Message);
            expect(CreateRedirectonUrlsCreateByURL_Testlowercasing.body.StatusCode).to.equal(1);
            console.log(CreateRedirectonUrlsCreateByURL_Testlowercasing.body.Data[0].FullFromUrl);
            console.log(CreateRedirectonUrlsCreateByURL_Testlowercasing.body.Data[0].FullToUrl);
            console.log('http://' + CreateRedirectonUrlsCreateByURL_Testlowercasing.body.Data[0].FromPrefix + _CreateByURLActivePageDomain[0].domain + CreateRedirectonUrlsCreateByURL_Testlowercasing.body.Data[0].FromUrl);
            console.log(CreateRedirectonUrlsCreateByURL_Testlowercasing.body.Data[0].FullFromUrl);
            expect('http://' + CreateRedirectonUrlsCreateByURL_Testlowercasing.body.Data[0].FromPrefix + _CreateByURLActivePageDomain[0].domain + CreateRedirectonUrlsCreateByURL_Testlowercasing.body.Data[0].FromUrl).to.equal(CreateRedirectonUrlsCreateByURL_Testlowercasing.body.Data[0].FullFromUrl);
            console.log('http://' + CreateRedirectonUrlsCreateByURL_Testlowercasing.body.Data[0].ToPage_Prefix + _CreateByURLActivePageDomain[0].domain + CreateRedirectonUrlsCreateByURL_Testlowercasing.body.Data[0].ToPage_Url);
            console.log(CreateRedirectonUrlsCreateByURL_Testlowercasing.body.Data[0].FullToUrl);
            expect('http://' + CreateRedirectonUrlsCreateByURL_Testlowercasing.body.Data[0].ToPage_Prefix + _CreateByURLActivePageDomain[0].domain + CreateRedirectonUrlsCreateByURL_Testlowercasing.body.Data[0].ToPage_Url).to.equal(CreateRedirectonUrlsCreateByURL_Testlowercasing.body.Data[0].FullToUrl);


        });
        it('19)Verify Create By URL - Test To Querystring', () => {
            console.log(CreateRedirectonUrlsCreateByURL_TestToQuerystring.body.Message);
            expect(CreateRedirectonUrlsCreateByURL_TestToQuerystring.body.StatusCode).to.equal(1);
            console.log('http://' + CreateRedirectonUrlsCreateByURL_TestToQuerystring.body.Data[0].ToPage_Prefix + _CreateByURLActivePageDomain[0].domain + CreateRedirectonUrlsCreateByURL_TestToQuerystring.body.Data[0].ToPage_Url + CreateRedirectonUrlsCreateByURL_TestToQuerystring.body.Data[0].ToQString);
            console.log(CreateRedirectonUrlsCreateByURL_TestToQuerystring.body.Data[0].FullToUrl);
            expect('http://' + CreateRedirectonUrlsCreateByURL_TestToQuerystring.body.Data[0].ToPage_Prefix + _CreateByURLActivePageDomain[0].domain + CreateRedirectonUrlsCreateByURL_TestToQuerystring.body.Data[0].ToPage_Url + CreateRedirectonUrlsCreateByURL_TestToQuerystring.body.Data[0].ToQString).to.equal(CreateRedirectonUrlsCreateByURL_TestToQuerystring.body.Data[0].FullToUrl);

        });
        it('20)Verify Create By URL - Test lowercasing with querystring', () => {
            console.log(CRU_CreateByURLTestlowercasingwithquerystring.body.Message);
            expect(CRU_CreateByURLTestlowercasingwithquerystring.body.StatusCode).to.equal(1);
            console.log('http://' + CRU_CreateByURLTestlowercasingwithquerystring.body.Data[0].ToPage_Prefix + _CreateByURLActivePageDomain[0].domain + CRU_CreateByURLTestlowercasingwithquerystring.body.Data[0].ToPage_Url + CRU_CreateByURLTestlowercasingwithquerystring.body.Data[0].ToQString);
            console.log(CRU_CreateByURLTestlowercasingwithquerystring.body.Data[0].FullToUrl);
            expect('http://' + CRU_CreateByURLTestlowercasingwithquerystring.body.Data[0].ToPage_Prefix + _CreateByURLActivePageDomain[0].domain + CRU_CreateByURLTestlowercasingwithquerystring.body.Data[0].ToPage_Url + CRU_CreateByURLTestlowercasingwithquerystring.body.Data[0].ToQString).to.equal(CRU_CreateByURLTestlowercasingwithquerystring.body.Data[0].FullToUrl);

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

    var CreateByIDInvalidFromChroniclID = {};
    var InvalidFromChroniclID = {};
    var _InvalidFromChroniclID = {};

    var CreateByIDInvalidToChroniclID = {};
    var InvalidToChroniclID = {};
    var _InvalidToChroniclID = {};

    var CreateByID_A_B_whereB_C_exists = {};
    var A_B_whereB_C_exists = {};
    var _A_B_whereB_C_exists = {};

    var CreateByIDCreateTwoRedirectswithOneCall = {};
    var CreateTwoRedirectswithOneCall = {};
    var _CreateTwoRedirectswithOneCall = {};

    var CreateByID_B_C_Where_A_B_Exists = {};
    var B_C_Where_A_B_Exists = {};
    var _B_C_Where_A_B_Exists = {};

    describe('Create By ID - ChronicleIDs Same', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.ChronicleIDsSame().then(function (records) {
                    _ChronicleIDsSame = records;

                })
                );
        });

        it('Get the Results from Api', () => {

            CreateByIDChronicleIDsSame = test.PostResult(testAssetProps.Create_Redirect_on_ChronicleIDS, _ChronicleIDsSame);

        });

    });

    describe('Create By ID - Invalid From ChroniclID', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.InvalidFromChroniclID().then(function (records) {
                    _InvalidFromChroniclID = records;

                })
                );
        });

        it('Get the Results from Api', () => {

            CreateByIDInvalidFromChroniclID = test.PostResult(testAssetProps.Create_Redirect_on_ChronicleIDS, _InvalidFromChroniclID);

        });

    });
    describe('Create By ID - Invalid To ChroniclID', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.InvalidToChroniclID().then(function (records) {
                    _InvalidToChroniclID = records;

                })
                );
        });

        it('Get the Results from Api', () => {

            CreateByIDInvalidToChroniclID = test.PostResult(testAssetProps.Create_Redirect_on_ChronicleIDS, _InvalidToChroniclID);

        });

    });

    describe('Create By ID - A->B where B->C exists ', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.A_B_whereB_C_exists().then(function (records) {
                    _A_B_whereB_C_exists = records;

                })
                );
        });

        it('Get the Results from Api', () => {

            CreateByID_A_B_whereB_C_exists = test.PostResult(testAssetProps.Create_Redirect_on_ChronicleIDS, _A_B_whereB_C_exists);

        });

    });

    describe('Create By ID - Create 2 Redirects with One Call', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.CreateTwoRedirectswithOneCall().then(function (records) {
                    _CreateTwoRedirectswithOneCall = records;

                })
                );
        });

        it('Get the Results from Api', () => {

            CreateByIDCreateTwoRedirectswithOneCall = test.PostResult(testAssetProps.Create_Redirect_on_ChronicleIDS, _CreateTwoRedirectswithOneCall);

        });

    });
    describe('Create By ID ', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.B_C_Where_A_B_Exists().then(function (records) {
                    _B_C_Where_A_B_Exists = records;

                })
                );
        });

        it('Get the Results from Api', () => {

            CreateByID_B_C_Where_A_B_Exists = test.PostResult(testAssetProps.Create_Redirect_on_ChronicleIDS, _B_C_Where_A_B_Exists);

        });
        it('1)Verify From Chronicle ID is the same as the To Chronicle ID', () => {
            console.log(CreateByIDChronicleIDsSame.body.Message);
            expect(CreateByIDChronicleIDsSame.body.StatusCode).to.not.equal(1);

        });
        it('2)Verify No active pages found for from chronicleID', () => {
            console.log(CreateByIDInvalidFromChroniclID.body.Message);
            expect(CreateByIDInvalidFromChroniclID.body.StatusCode).to.not.equal(1);

        });
        it('3)Verify There is already 1 redirect from ChronicleID', () => {
            console.log(CreateByIDInvalidToChroniclID.body.Message);
            expect(CreateByIDInvalidToChroniclID.body.StatusCode).to.not.equal(1);

        });
        it('4)Verify To Page is redirected', () => {
            console.log(CreateByID_A_B_whereB_C_exists.body.Message);
            expect(CreateByID_A_B_whereB_C_exists.body.StatusCode).to.not.equal(1);

        });
        it('4)Verify There are already 2 redirects from ChronicleID', () => {
            console.log(CreateByIDCreateTwoRedirectswithOneCall.body.Message);
            expect(CreateByIDCreateTwoRedirectswithOneCall.body.StatusCode).to.not.equal(1);

        });
        it('5)Verify that redirect A->B gets updated to A->C', () => {
            console.log(CreateByID_B_C_Where_A_B_Exists.body.Message);
            expect(CreateByID_B_C_Where_A_B_Exists.body.StatusCode).to.equal(1);

        });
    });
});


describe('PPE-81172:Update To Url', () => {

    var UpdateToUrlInternal_Internal = {};
    var Internal_Internal = {};
    var _Internal_Internal = {};

    var UpdateToUrlInternal_External = {};
    var Internal_External = {};
    var _Internal_External = {};

    var UpdateToUrl_External_Internal = {};
    var External_Internal = {};
    var _External_Internal = {};

    var UpdateToUrlAlready_Redirected = {};
    var Already_Redirected = {};
    var _Already_Redirected = {};

    var UpdateToUrlSameasFromURL = {};
    var SameasFromURL = {};
    var _SameasFromURL = {};

    describe('Update To Url - Internal -> Internal', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.Internal_Internal().then(function (records) {
                    _Internal_Internal = records;

                })
                );
        });

        it('Get the Results from Api', () => {

            UpdateToUrlInternal_Internal = test.PutResult(testAssetProps.Update_To_Url, _Internal_Internal);

        });

    });

    describe('Update To Url - Internal -> External', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.Internal_External().then(function (records) {
                    _Internal_External = records;

                })
                );
        });

        it('Get the Results from Api', () => {

            UpdateToUrlInternal_External = test.PutResult(testAssetProps.Update_To_Url, _Internal_External);

        });

    });
    describe('Update To Url - External-> Internal', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.External_Internal().then(function (records) {
                    _External_Internal = records;

                })
                );
        });

        it('Get the Results from Api', () => {

            UpdateToUrl_External_Internal = test.PutResult(testAssetProps.Update_To_Url, _External_Internal);

        });

    });

    describe('Update To Url - Already Redirected ', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.Already_Redirected().then(function (records) {
                    _Already_Redirected = records;

                })
                );
        });

        it('Get the Results from Api', () => {

            UpdateToUrlAlready_Redirected = test.PutResult(testAssetProps.Update_To_Url, _Already_Redirected);

        });

    });

    describe('Update To Url ', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.SameasFromURL().then(function (records) {
                    _SameasFromURL = records;

                })
                );
        });

        it('Get the Results from Api', () => {

            UpdateToUrlSameasFromURL = test.PutResult(testAssetProps.Update_To_Url, _SameasFromURL);

        });
        it('1)Verify Update To Url - Internal -> Internal', () => {
            console.log(UpdateToUrlInternal_Internal.body.Message);
            expect(UpdateToUrlInternal_Internal.body.StatusCode).to.equal(1);

        });
        it('2)Verify Update To Url - Internal -> External', () => {
            console.log(UpdateToUrlInternal_External.body.Message);
            expect(UpdateToUrlInternal_External.body.StatusCode).to.equal(1);
            expect(UpdateToUrlInternal_External.body.Data.ToPage_SiteID).to.equal(null);
            expect(UpdateToUrlInternal_External.body.Data.ToPage_Prefix).to.equal(null);
            expect(UpdateToUrlInternal_External.body.Data.ToChronicId).to.equal(null);
            expect(UpdateToUrlInternal_External.body.Data.ToUrl).to.not.equal(null);

        });
        it('3)Verify Update To Url - External-> Internal', () => {
            console.log(UpdateToUrl_External_Internal.body.Message);
            expect(UpdateToUrl_External_Internal.body.StatusCode).to.equal(1);
            expect(UpdateToUrl_External_Internal.body.Data.ToPage_Url).to.not.equal(null);
            expect(UpdateToUrl_External_Internal.body.Data.ToPage_Prefix).to.not.equal(null);
            expect(UpdateToUrl_External_Internal.body.Data.ToPage_SiteID).to.not.equal(null);
            expect(UpdateToUrl_External_Internal.body.Data.ToPage_Status).to.not.equal(null);
            expect(UpdateToUrl_External_Internal.body.Data.ToChronicId).to.not.equal(null);
            expect(UpdateToUrl_External_Internal.body.Data.ToUrl).to.equal(null);

        });
        it('4)Verify Update To Url - Already Redirected(To Page is redirected)', () => {
            console.log(UpdateToUrlAlready_Redirected.body.Message);
            expect(UpdateToUrlAlready_Redirected.body.StatusCode).to.not.equal(1);

        });
        it('5)Verify Update To Url - Same as From URL', () => {
            console.log(UpdateToUrlSameasFromURL.body.Message);
            expect(UpdateToUrlSameasFromURL.body.StatusCode).to.not.equal(1);

        });

    });

});

describe('PPE-81172:Replace To ChronicleID for All', () => {

    var ReplaceToChronicleIDForAll_InvalidOldChronicleID = {};
    var InvalidOldChronicleID = {};
    var _InvalidOldChronicleID = {};

    var ReplaceToChronicleIDForAll_InvalidNewChronicleID = {};
    var InvalidNewChronicleID = {};
    var _InvalidNewChronicleID = {};

    var ReplaceToChronicleIDForAll_NoActivePage = {};
    var NoActivePage = {};
    var _NoActivePage = {};

    var ReplaceToChronicleIDForAll_Succeed = {};
    var Succeed = {};
    var _Succeed = {};

    describe('Replace To ChronicleID For All - Invalid Old ChronicleID', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.InvalidOldChronicleID().then(function (records) {
                    _InvalidOldChronicleID = records;

                })
                );
        });

        it('Get the Results from Api', () => {

            ReplaceToChronicleIDForAll_InvalidOldChronicleID = test.PutResult(testAssetProps.Replace_To_ChronicleID_for_All, _InvalidOldChronicleID);

        });

    });

    describe('Replace To ChronicleID For All - Invalid New ChronicleID', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.InvalidNewChronicleID().then(function (records) {
                    _InvalidNewChronicleID = records;

                })
                );
        });

        it('Get the Results from Api', () => {

            ReplaceToChronicleIDForAll_InvalidNewChronicleID = test.PutResult(testAssetProps.Replace_To_ChronicleID_for_All, _InvalidNewChronicleID);

        });

    });
    describe('Replace To ChronicleID For All - No Active Page', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.NoActivePage().then(function (records) {
                    _NoActivePage = records;

                })
                );
        });

        it('Get the Results from Api', () => {

            ReplaceToChronicleIDForAll_NoActivePage = test.PutResult(testAssetProps.Replace_To_ChronicleID_for_All, _NoActivePage);

        });

    });

    describe('Replace To ChronicleID For All  ', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.Succeed().then(function (records) {
                    _Succeed = records;

                })
                );
        });

        it('Get the Results from Api', () => {

            ReplaceToChronicleIDForAll_Succeed = test.PutResult(testAssetProps.Replace_To_ChronicleID_for_All, _Succeed);

        });

        it('1)Verify Replace To ChronicleID For All - Invalid Old ChronicleID', () => {
            console.log(ReplaceToChronicleIDForAll_InvalidOldChronicleID.body.Message);
            expect(ReplaceToChronicleIDForAll_InvalidOldChronicleID.body.StatusCode).to.not.equal(1);

        });
        it('2)Verify Replace To ChronicleID For All - Invalid New ChronicleID', () => {
            console.log(ReplaceToChronicleIDForAll_InvalidNewChronicleID.body.Message);
            expect(ReplaceToChronicleIDForAll_InvalidNewChronicleID.body.StatusCode).to.not.equal(1);

        });
        it('3)Verify Replace To ChronicleID For All - No Active Page', () => {
            console.log(ReplaceToChronicleIDForAll_NoActivePage.body.Message);
            expect(ReplaceToChronicleIDForAll_NoActivePage.body.StatusCode).to.not.equal(1);

        });
        it('4)Verify Replace To ChronicleID For All - Succeed', () => {
            console.log(ReplaceToChronicleIDForAll_Succeed.body.Message);
            expect(ReplaceToChronicleIDForAll_Succeed.body.StatusCode).to.equal(1);

        });

    });


});

describe('PPE-81172:Delete One or more (mark Deletd by id)', () => {

    var Delete_OneBogusID = {};
    var OneBogusID = {};
    var _OneBogusID = {};

    var Delete_MultipleBogusID = {};
    var MultipleBogusID = {};
    var _MultipleBogusID = {};

    var Delete_OneValidID = {};
    var OneValidID = {};
    var _OneValidID = {};

    var Delete_TwoValidIDS = {};
    var TwoValidIDS = {};
    var _TwoValidIDS = {};

    var Delete_OneValidIDandoneBogusID = {};
    var OneValidIDandoneBogusID = {};
    var _OneValidIDandoneBogusID = {};

    describe('Delete - 1 Bogus ID', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.OneBogusID().then(function (records) {
                    _OneBogusID = {

                        Ids: [records[0].Id1, records[0].Id2]

                    };

                })
                );
        });

        it('Get the Results from Api', () => {

            Delete_OneBogusID = test.DeleteResult(testAssetProps.Delete_One_or_more, _OneBogusID);

        });

    });

    describe('Delete - Multiple Bogus ID', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.MultipleBogusID().then(function (records) {
                    _MultipleBogusID = {

                        Ids: [records[0].Id1, records[0].Id2]

                    };

                })
                );
        });

        it('Get the Results from Api', () => {

            Delete_MultipleBogusID = test.DeleteResult(testAssetProps.Delete_One_or_more, _MultipleBogusID);

        });

    });
    describe('Delete - One Valid ID', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.OneValidID().then(function (records) {
                    _OneValidID = {

                        Ids: [records[0].Id1, records[0].Id2]

                    };

                })
                );
        });

        it('Get the Results from Api', () => {

            Delete_OneValidID = test.DeleteResult(testAssetProps.Delete_One_or_more, _OneValidID);

        });

    });
    describe('Delete - Two Valid IDS', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.TwoValidIDS().then(function (records) {
                    _TwoValidIDS = {

                        Ids: [records[0].Id1, records[0].Id2]

                    };

                })
                );
        });

        it('Get the Results from Api', () => {

            Delete_TwoValidIDS = test.DeleteResult(testAssetProps.Delete_One_or_more, _TwoValidIDS);

        });

    });

    describe('Delete ', () => {

        before(() => {

            return Promise.resolve
                (
                manualRedirectSqlService.OneValidIDandoneBogusID().then(function (records) {
                    _OneValidIDandoneBogusID = {

                        Ids: [records[0].Id1, records[0].Id2]

                    };

                })
                );
        });

        it('Get the Results from Api', () => {

            Delete_OneValidIDandoneBogusID = test.DeleteResult(testAssetProps.Delete_One_or_more, _OneValidIDandoneBogusID);

        });

        it('1)Verify Invalid Manual Redirect ID: | Invalid Manual Redirect ID: ', () => {
            console.log(Delete_OneBogusID.body.Message);
            expect(Delete_OneBogusID.body.StatusCode).to.not.equal(1);

        });
        it('2)Verify Invalid Manual Redirect ID: | Invalid Manual Redirect ID:', () => {
            console.log(Delete_MultipleBogusID.body.Message);
            expect(Delete_MultipleBogusID.body.StatusCode).to.not.equal(1);

        });
        it('3)Verify Delete - One Valid ID', () => {
            console.log(Delete_OneValidID.body.Message);
            expect(Delete_OneValidID.body.StatusCode).to.equal(2);

        });
        it('4)Verify Delete - Two Valid IDS', () => {
            console.log(Delete_TwoValidIDS.body.Message);
            expect(Delete_TwoValidIDS.body.StatusCode).to.equal(1);

        });
        it('5)Verify Delete - One Valid ID and one Bogus ID', () => {
            console.log(Delete_OneValidIDandoneBogusID.body.Message);
            expect(Delete_OneValidIDandoneBogusID.body.StatusCode).to.equal(2);

        });

    });


});

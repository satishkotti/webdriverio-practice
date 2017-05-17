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


// describe('PPE-81172:Get All Redirects For Entire System (optionally include Deleted)', () => {

//     var GetAllRedirectsForEntireSystem = {};
//     var _GetAllRedirectsForEntireSystem = {};


//     before(() => {

//         return Promise.resolve
//             (
//             manualRedirectSqlService.GetAllRedirectsForEntireSystem().then(function (records) {
//                 _GetAllRedirectsForEntireSystem = records;

//             })
//             );

//     });

//     describe('Get All Redirects For Entire System', () => {
//         it('Get the Results from Api', () => {

//             GetAllRedirectsForEntireSystem = test.GetResult(_GetAllRedirectsForEntireSystem[0].apiGetAllRedirectsForEntireSystem);

//         });


//         it('Verify Get All Redirects For Entire System (optionally include Deleted)', () => {
//             expect(GetAllRedirectsForEntireSystem.statusCode).to.equal(200);

//         });
//     });

// });

// describe('PPE-81172:Get All Redirects For Site ID (optionally include Deleted)', () => {

//     var GetAllRedirectsForSiteID = {};
//     var _GetAllRedirectsForSiteID = {};


//     before(() => {

//         return Promise.resolve
//             (
//             manualRedirectSqlService.GetAllRedirectsForSiteID().then(function (records) {
//                 _GetAllRedirectsForSiteID = records;

//             })
//             );

//     });

//     describe('Get All Redirects For Site ID ', () => {
//         it('Get the Results from Api', () => {

//             GetAllRedirectsForSiteID = test.GetResult(_GetAllRedirectsForSiteID[0].apiGetAllRedirectsForSiteID);

//         });


//         it('Verify Get All Redirects For Site ID (optionally include Deleted', () => {

//             expect(GetAllRedirectsForSiteID.statusCode).to.equal(200);

//         });
//     });

// });

// describe('PPE-81172:Get One Redirect By ID', () => {

//     var GetOneRedirectByID = {};
//     var _getByID = {};


//     before(() => {

//         return Promise.resolve
//             (
//             manualRedirectSqlService.getByID().then(function (records) {
//                 _getByID = records;

//             })
//             );

//     });

//     describe('Get One Redirect By ID', () => {
//         it('Get the Results from Api', () => {

//             GetOneRedirectByID = test.GetResult(_getByID[0].apigetRandomRedirectID);

//         });


//         it('Verify Get One Redirect By ID', () => {

//             expect(GetOneRedirectByID.statusCode).to.equal(200);
//             expect(GetOneRedirectByID.body.Data.Id).to.equal(_getByID[0].Id);
//             expect(GetOneRedirectByID.body.Data.FromChronicId).to.equal(_getByID[0].FromChronicId);
//             expect(GetOneRedirectByID.body.Data.FromSiteId).to.equal(_getByID[0].FromSiteId);
//             expect(GetOneRedirectByID.body.Data.FromPrefix).to.equal(_getByID[0].FromPrefix);
//             expect(GetOneRedirectByID.body.Data.FromUrl).to.equal(_getByID[0].FromUrl);
//             expect(GetOneRedirectByID.body.Data.ToSiteId).to.equal(_getByID[0].ToSiteId);
//             expect(GetOneRedirectByID.body.Data.ToChronicId).to.equal(_getByID[0].ToChronicId);
//             expect(GetOneRedirectByID.body.Data.ToUrl).to.equal(_getByID[0].ToUrl);
//             expect(GetOneRedirectByID.body.Data.IsExternal).to.equal(_getByID[0].IsExternal);
//             expect(GetOneRedirectByID.body.Data.ModifiedBy).to.equal(_getByID[0].ModifiedBy);
//             expect(GetOneRedirectByID.body.Data.Status).to.equal(_getByID[0].Status);
//             expect(GetOneRedirectByID.body.Data.FromPage_ChronicID).to.equal(_getByID[0].FromPage_ChronicID);
//             expect(GetOneRedirectByID.body.Data.FromPage_SiteId).to.equal(_getByID[0].FromPage_SiteId);
//             expect(GetOneRedirectByID.body.Data.FromPage_Prefix).to.equal(_getByID[0].FromPage_Prefix);
//             expect(GetOneRedirectByID.body.Data.FromPage_Url).to.equal(_getByID[0].FromPage_Url);
//             expect(GetOneRedirectByID.body.Data.FromPage_Status).to.equal(_getByID[0].FromPage_Status);
//             expect(GetOneRedirectByID.body.Data.ToPage_Url).to.equal(_getByID[0].ToPage_Url);
//             expect(GetOneRedirectByID.body.Data.ToPage_Prefix).to.equal(_getByID[0].ToPage_Prefix);
//             expect(GetOneRedirectByID.body.Data.ToPage_SiteID).to.equal(_getByID[0].ToPage_SiteID);
//             expect(GetOneRedirectByID.body.Data.ToPage_Status).to.equal(_getByID[0].ToPage_Status);
//             expect(GetOneRedirectByID.body.Data.ToQString).to.equal(_getByID[0].ToQString);

//         });
//     });

// });

// describe('PPE-81172:Get One Redirect By From Url', () => {

//     var GetOneRedirectByFromUrl = {};
//     var _GetOneRedirectByFromUrl = {};


//     before(() => {

//         return Promise.resolve
//             (
//             manualRedirectSqlService.GetOneRedirectByFromUrl().then(function (records) {
//                 _GetOneRedirectByFromUrl = records;

//             })
//             );

//     });

//     describe('Get One Redirect By From Url', () => {
//         it('Get the Results from Api', () => {

//            GetOneRedirectByFromUrl = test.GetResult(_GetOneRedirectByFromUrl[0].apiGetOneRedirectByFromUrl);

//         });


//         it('Verify Get One Redirect By From Url', () => {
//             expect(GetOneRedirectByFromUrl.statusCode).to.equal(200);

//         });
//     });

// });


// describe('PPE-81172:Get All Redirect From Url Pattern (must include the start of the url)', () => {

//     var GetAllRedirectFromUrlPattern = {};
//     var _GetAllRedirectFromUrlPattern = {};


//     before(() => {

//         return Promise.resolve
//             (
//             manualRedirectSqlService.GetAllRedirectFromUrlPattern().then(function (records) {
//                 _GetAllRedirectFromUrlPattern = records;

//             })
//             );

//     });

//     describe('Get All Redirect From Url Pattern', () => {
//         it('Get the Results from Api', () => {

//            GetAllRedirectFromUrlPattern = test.GetResult(_GetAllRedirectFromUrlPattern[0].apiGetAllRedirectFromUrlPattern);

//         });


//         it('Verify Get All Redirect From Url Pattern (must include the start of the url)', () => {
//             expect(GetAllRedirectFromUrlPattern.statusCode).to.equal(200);

//         });
//     });

// });


// describe('PPE-81172:Get All Redirect To Url Pattern (must include the start of the url)', () => {

//     var GetAllRedirectToUrlPattern = {};
//     var _GetAllRedirectToUrlPattern = {};


//     before(() => {

//         return Promise.resolve
//             (
//             manualRedirectSqlService.GetAllRedirectToUrlPattern().then(function (records) {
//                 _GetAllRedirectToUrlPattern = records;

//             })
//             );

//     });

//     describe('Get All Redirect To Url Pattern', () => {
//         it('Get the Results from Api', () => {

//             GetAllRedirectToUrlPattern = test.GetResult(_GetAllRedirectToUrlPattern[0].apiGetAllRedirectToUrlPattern);

//         });


//         it('Verify Get All Redirect To Url Pattern (must include the start of the url)', () => {
//             expect(GetAllRedirectToUrlPattern.statusCode).to.equal(200);

//         });
//     });

// });


// describe('PPE-81172:Get All Redirect From a ChronicleID', () => {

//     var GetAllRedirectFromaChronicleID = {};
//     var _GetAllRedirectFromaChronicleID = {};


//     before(() => {

//         return Promise.resolve
//             (
//             manualRedirectSqlService.GetAllRedirectFromaChronicleID().then(function (records) {
//                 _GetAllRedirectFromaChronicleID = records;

//             })
//             );

//     });

//     describe('Get All Redirect From a ChronicleID', () => {
//         it('Get the Results from Api', () => {

//             GetAllRedirectFromaChronicleID = test.GetResult(_GetAllRedirectFromaChronicleID[0].apiGetAllRedirectFromaChronicleID);

//         });


//         it('Verify Get All Redirect From a ChronicleID', () => {
//             expect(GetAllRedirectFromaChronicleID.statusCode).to.equal(200);

//         });
//     });

// });


// describe('PPE-81172:Get All Redirects Redirected to a ChronicleID', () => {

//     var GetAllRedirectsRedirectedtoaChronicleID = {};
//     var _GetAllRedirectsRedirectedtoaChronicleID = {};


//     before(() => {

//         return Promise.resolve
//             (
//             manualRedirectSqlService.GetAllRedirectsRedirectedtoaChronicleID().then(function (records) {
//                 _GetAllRedirectsRedirectedtoaChronicleID = records;

//             })
//             );

//     });

//     describe('Get All Redirects Redirected to a ChronicleID', () => {
//         it('Get the Results from Api', () => {

//             GetAllRedirectsRedirectedtoaChronicleID = test.GetResult(_GetAllRedirectsRedirectedtoaChronicleID[0].apiGetAllRedirectsRedirectedtoaChronicleID);

//         });


//         it('Verify Get All Redirects Redirected to a ChronicleID', () => {
//             expect(GetAllRedirectsRedirectedtoaChronicleID.statusCode).to.equal(200);

//         });
//     });

// });

// describe('PPE-81172:Get All Redirects To a Url', () => {

//     var GetAllRedirectsToaUrl = {};
//     var _GetAllRedirectsToaUrl = {};


//     before(() => {

//         return Promise.resolve
//             (
//             manualRedirectSqlService.GetAllRedirectsToaUrl().then(function (records) {
//                 _GetAllRedirectsToaUrl = records;

//             })
//             );

//     });

//     describe('Get All Redirects To a Url', () => {
//         it('Get the Results from Api', () => {

//             GetAllRedirectsToaUrl = test.GetResult(_GetAllRedirectsToaUrl[0].apiGetAllRedirectsToaUrl);

//         });


//         it('Verify Get All Redirects To a Url', () => {
//             expect(GetAllRedirectsToaUrl.statusCode).to.equal(200);

//         });
//     });

// });

// describe('PPE-81172:Export All Redirects To Csv File', () => {

//     var ExportAllRedirectsToCsvFile = {};
//     var _ExportAllRedirectsToCsvFile = {};


//     before(() => {

//         return Promise.resolve
//             (
//             manualRedirectSqlService.ExportAllRedirectsToCsvFile().then(function (records) {
//                 _ExportAllRedirectsToCsvFile = records;

//             })
//             );

//     });

//     describe('Export All Redirects To Csv File', () => {
//         it('Get the Results from Api', () => {

//             ExportAllRedirectsToCsvFile = test.GetResult(_ExportAllRedirectsToCsvFile[0].apiExportAllRedirectsToCsvFile);

//         });

//         it('Verify Export All Redirects To Csv File', () => {
//             expect(ExportAllRedirectsToCsvFile.statusCode).to.equal(200);

//         });
//     });

// });
// describe('PPE-81172:Export All Redirects For Site To Csv File', () => {

//     var ExportAllRedirectsForSiteToCsvFile = {};
//     var _ExportAllRedirectsForSiteToCsvFile = {};


//     before(() => {

//         return Promise.resolve
//             (
//             manualRedirectSqlService.ExportAllRedirectsForSiteToCsvFile().then(function (records) {
//                 _ExportAllRedirectsForSiteToCsvFile = records;

//             })
//             );

//     });

//     describe('Export All Redirects For Site To Csv File', () => {
//         it('Get the Results from Api', () => {

//             ExportAllRedirectsForSiteToCsvFile = test.GetResult(_ExportAllRedirectsForSiteToCsvFile[0].apiExportAllRedirectsForSiteToCsvFile);

//         });


//         it('Verify Export All Redirects For Site To Csv File', () => {
//             expect(ExportAllRedirectsForSiteToCsvFile.statusCode).to.equal(200);

//         });
//     });

// });
describe('PPE-81172:Create Redirect on Urls', () => {

    var CreateRedirectonUrlsInvalidURLCombination = {};
    var CreateByURLInvalidURLCombination={};
    var _CreateByURLInvalidURLCombination = {};

    var CreateRedirectonUrlsInvalidToURLInternal  = {};
    var CreateByURLInvalidToURLInternal ={};
    var _CreateByURLInvalidToURLInternal ={};


    var CreateRedirectonUrlsInvalidFormToURL  = {};
    var CreateByURLInvalidFormToURL ={};
    var _CreateByURLInvalidFormToURL ={};

    var CreateRedirectonUrlsInvalidAnotherLifecyle  = {};
    var CreateByURLInvalidAnotherLifecyleToURL ={};
    var _CreateByURLInvalidAnotherLifecyleToURL ={};

    var CreateRedirectonUrlsInvalidExtraSlash  = {};
    var CreateByURLInvalidExtraSlashToURL ={};
    var _CreateByURLInvalidExtraSlashToURL ={};
    
    var CreateRedirectonUrlsDoesNoStartWithhttp  = {};
    var CreateByURLInvalidDoesNoStartWithhttpToURL ={};
    var _CreateByURLInvalidDoesNoStartWithhttpToURL ={};


    var CreateRedirectonUrlsInvalidFromExtraSlash  = {};
    var CreateByURLInvalidExtraSlashFromURL ={};
    var _CreateByURLInvalidExtraSlashFromURL ={};

    var CreateRedirectonUrlsFormDoesNoStartWithhttp  = {};
    var CreateByURLInvalidDoesNoStartWithhttpFormURL ={};
    var _CreateByURLInvalidDoesNoStartWithhttpFormURL ={};

    var CreateRedirectonUrlsFromInvalidAnotherLifecyle  = {};
    var CreateByURLInvalidAnotherLifecyleFromURL ={};
    var _CreateByURLInvalidAnotherLifecyleFromURL ={};

    before(() => {

        return Promise.resolve
            (
            manualRedirectSqlService.CreateByURLInvalidURLCombination().then(function (records) {
                _CreateByURLInvalidURLCombination = records;

            })
             .then(function()
            {
                return manualRedirectSqlService.CreateByURLInvalidToURLInternal()
            })
            .then(function(records)
            {
                _CreateByURLInvalidToURLInternal = records;
                 
            })
            .then(function()
            {
                return manualRedirectSqlService.CreateByURLInvalidFormToURL()
            })
            .then(function(records)
            {
                _CreateByURLInvalidFormToURL = records;
                 
            })

            .then(function()
            {
                return manualRedirectSqlService.CreateByURLInvalidAnotherLifecyleToURL()
            })
            .then(function(records)
            {
                _CreateByURLInvalidAnotherLifecyleToURL = records;
                 
            })
            .then(function()
            {
                return manualRedirectSqlService.CreateByURLInvalidExtraSlashToURL()
            })
            .then(function(records)
            {
                _CreateByURLInvalidExtraSlashToURL = records;
                 
            })
            .then(function()
            {
                return manualRedirectSqlService.CreateByURLInvalidDoesNoStartWithhttpToURL()
            })
            .then(function(records)
            {
                _CreateByURLInvalidDoesNoStartWithhttpToURL = records;
                 
            })
             .then(function()
            {
                return manualRedirectSqlService.CreateByURLInvalidExtraSlashFromURL()
            })
            .then(function(records)
            {
                _CreateByURLInvalidExtraSlashFromURL = records;
                 
            })
            .then(function()
            {
                return manualRedirectSqlService.CreateByURLInvalidDoesNoStartWithhttpFormURL()
            })
            .then(function(records)
            {
                _CreateByURLInvalidDoesNoStartWithhttpFormURL = records;
                 
            })
            .then(function()
            {
                return manualRedirectSqlService.CreateByURLInvalidAnotherLifecyleFromURL()
            })
            .then(function(records)
            {
                _CreateByURLInvalidAnotherLifecyleFromURL = records;
                 
            })

            );

    });

    describe('Create Redirect on Urls', () => {
        it('Get the Results from Api', () => {

            CreateRedirectonUrlsInvalidURLCombination = test.PostResult(testAssetProps.Create_Redirect_on_Urls,_CreateByURLInvalidURLCombination);
            CreateRedirectonUrlsInvalidToURLInternal = test.PostResult(testAssetProps.Create_Redirect_on_Urls,_CreateByURLInvalidToURLInternal);
            CreateRedirectonUrlsInvalidFormToURL = test.PostResult(testAssetProps.Create_Redirect_on_Urls,_CreateByURLInvalidFormToURL);
            CreateRedirectonUrlsInvalidAnotherLifecyle = test.PostResult(testAssetProps.Create_Redirect_on_Urls,_CreateByURLInvalidAnotherLifecyleToURL);
            CreateRedirectonUrlsInvalidExtraSlash = test.PostResult(testAssetProps.Create_Redirect_on_Urls,_CreateByURLInvalidExtraSlashToURL);
            CreateRedirectonUrlsDoesNoStartWithhttp = test.PostResult(testAssetProps.Create_Redirect_on_Urls,_CreateByURLInvalidDoesNoStartWithhttpToURL);
            CreateRedirectonUrlsInvalidFromExtraSlash = test.PostResult(testAssetProps.Create_Redirect_on_Urls,_CreateByURLInvalidExtraSlashFromURL);
            CreateRedirectonUrlsFormDoesNoStartWithhttp = test.PostResult(testAssetProps.Create_Redirect_on_Urls,_CreateByURLInvalidDoesNoStartWithhttpFormURL);
            CreateRedirectonUrlsFromInvalidAnotherLifecyle = test.PostResult(testAssetProps.Create_Redirect_on_Urls,_CreateByURLInvalidAnotherLifecyleFromURL);

        });

         it('1)Verify From Url is the same as To Url', () => {
          console.log(CreateRedirectonUrlsInvalidURLCombination.body.Message);
          expect(CreateRedirectonUrlsInvalidURLCombination.body.StatusCode).to.not.equal(1);

        });

        it('2)Verify There is already a redirect ID : FromUrl', () => {
           console.log(CreateRedirectonUrlsInvalidToURLInternal.body.Message);
           expect(CreateRedirectonUrlsInvalidToURLInternal.body.StatusCode).to.not.equal(1);

        });
        it('3)Verify Invalid To Url (// is invalid)', () => {
           console.log(CreateRedirectonUrlsInvalidFormToURL.body.Message);
           expect(CreateRedirectonUrlsInvalidFormToURL.body.StatusCode).to.not.equal(1);

        });
         it('4)Verify There is already a redirect ID : FromUrl', () => {
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

    });

});



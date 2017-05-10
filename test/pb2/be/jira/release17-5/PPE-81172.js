var test = require('./../../../common/functions/functions');
var smTestData = require('./../../../config/api.config');
var sqldata = require('./../../Apidb/apidb');
var fs = require('fs');
const sql = require('mssql')
var testAssetProps = smTestData.ApiTestData;
var testEnvProps = smTestData.testEnv;
var env = testEnvProps.dev;



describe('PPE-81172:Get All Redirects For Entire System (optionally include Deleted)', () => {

    before(() => {

        GetAllRedirectsForEntireSystem = test.GetResult(env, testAssetProps.GetAll_Redirects_For_EntireSystem);

    });

    it('Verify Get All Redirects For Entire System (optionally include Deleted)', () => {
        expect(GetAllRedirectsForEntireSystem.statusCode).to.equal(200);

    });

});

describe('PPE-81172:Get All Redirects For Site ID (optionally include Deleted)', () => {

    before(() => {

        GetAllRedirectsForSiteID = test.GetResult(env, testAssetProps.GetAll_Redirects_ForSiteID);

    });

    it('Verify Get All Redirects For Site ID (optionally include Deleted)', () => {
        expect(GetAllRedirectsForSiteID.statusCode).to.equal(200);
    });

});

describe('PPE-81172:Get One Redirect By ID', () => {

    before(() => {

        GetOneRedirectByID = test.GetResult(env, testAssetProps.GetOne_RedirectByID);
        var res = sqldata.getOneRedirectByID();

    });


    it('Verify Get One Redirect By ID', () => {

        expect(GetOneRedirectByID.statusCode).to.equal(200);
    });

});

describe('PPE-81172:Get One Redirect By From Url', () => {

    before(() => {

        GetOneRedirectByFromUrl = test.GetResult(env, testAssetProps.GetOne_RedirectBy_FromUrl);

    });

    it('Verify Get One Redirect By From Url', () => {

        expect(GetOneRedirectByFromUrl.statusCode).to.equal(200);
    });

});


describe('PPE-81172:Get All Redirect From Url Pattern (must include the start of the url)', () => {

    before(() => {

        GetAllRedirectFromUrlPattern = test.GetResult(env, testAssetProps.GetAll_RedirectFromUrl_Pattern);

    });

    it('Verify Get All Redirect From Url Pattern (must include the start of the url)', () => {

        expect(GetAllRedirectFromUrlPattern.statusCode).to.equal(200);
    });

});

describe('PPE-81172:Get All Redirect To Url Pattern (must include the start of the url)', () => {

    before(() => {

        GetAllRedirectToUrlPattern = test.GetResult(env, testAssetProps.GetAll_RedirectToUrl_Pattern);

    });

    it('Verify Get All Redirect To Url Pattern (must include the start of the url)', () => {

        expect(GetAllRedirectToUrlPattern.statusCode).to.equal(200);
    });

});

describe('PPE-81172:Get All Redirect From a ChronicleID', () => {

    before(() => {

        GetAllRedirectFromaChronicleID = test.GetResult(env, testAssetProps.GetAll_RedirectFroma_ChronicleID);

    });

    it('Verify Get All Redirect From a ChronicleID', () => {

        expect(GetAllRedirectFromaChronicleID.statusCode).to.equal(200);
    });

});


describe('PPE-81172:Get All Redirects Redirected to a ChronicleID', () => {

    before(() => {

        GetAllRedirectsRedirectedtoaChronicleID = test.GetResult(env, testAssetProps.GetAll_RedirectsRedirectedtoa_ChronicleID);

    });

    it('Verify Get All Redirects Redirected to a ChronicleID', () => {

        expect(GetAllRedirectsRedirectedtoaChronicleID.statusCode).to.equal(200);
    });

});

describe('PPE-81172:Get All Redirects To a Url', () => {

    before(() => {

        GetAllRedirectsToaUrl = test.GetResult(env, testAssetProps.GetAll_Redirects_ToaUrl);

    });

    it('Verify Get All Redirects To a Url', () => {

        expect(GetAllRedirectsToaUrl.statusCode).to.equal(200);
    });

});

describe('PPE-81172:Export All Redirects To Csv File', () => {

    before(() => {

        ExportAllRedirectsToCsvFile = test.GetResult(env, testAssetProps.Export_AllRedirects_ToCsv_File);

    });

    it('Verify Export All Redirects To Csv File', () => {

        expect(ExportAllRedirectsToCsvFile.statusCode).to.equal(200);
    });

});

describe('PPE-81172:Export All Redirects For Site To Csv File', () => {

    before(() => {

        ExportAllRedirectsForSiteToCsvFile = test.GetResult(env, testAssetProps.Export_AllRedirects_ForSiteToCsv_File);

    });

    it('Verify Export All Redirects For Site To Csv File', () => {

        expect(ExportAllRedirectsForSiteToCsvFile.statusCode).to.equal(200);
    });

});

describe('PPE-81172:Create Redirect on Urls', () => {

    before(() => {

        CreateRedirectonUrls = test.PostResult(env, testAssetProps.Create_Redirect_on_Urls);

    });

    it('Verify Create Redirect on Urls', () => {
        expect(CreateRedirectonUrls.body.StatusCode).to.equal(1);
    });

});

describe('PPE-81172:Create Redirect on Chronicle IDS', () => {

    before(() => {

        CreateRedirectonChronicleIDS = test.PostResult(env, testAssetProps.Create_Redirect_on_ChronicleIDS);

    });

    it('Verify Create Redirect on Chronicle IDS', () => {
        expect(CreateRedirectonChronicleIDS.body.StatusCode).to.equal(1);
    });

});

describe('PPE-81172:Update To Url', () => {

    before(() => {

        UpdateToUrl = test.PutResult(env, testAssetProps.Update_To_Url);

    });

    it('Verify Update To Url', () => {
        expect(UpdateToUrl.body.StatusCode).to.equal(1);
    });

});

describe('PPE-81172:Replace To ChronicleID for All', () => {

    before(() => {

        ReplaceToChronicleIDforAll = test.PutResult(env, testAssetProps.Replace_To_ChronicleID_for_All);

    });

    it('Verify Replace To ChronicleID for All', () => {
        expect(ReplaceToChronicleIDforAll.body.StatusCode).to.equal(1);
    });

});

describe('PPE-81172:Delete One or more (mark Deletd by id)', () => {

    before(() => {

        DeleteOneormoreid = test.DeleteResult(env, testAssetProps.Delete_One_or_more);

    });

    it('Verify Delete One or more (mark Deletd by id)', () => {
        expect(DeleteOneormoreid.body.StatusCode).to.equal(1);
    });

});
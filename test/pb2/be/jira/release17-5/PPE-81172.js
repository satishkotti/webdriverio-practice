var test = require('./../../../common/functions/functions');
var fs = require('fs');


describe('PPE-81172:Redirect API', () => {


    var smProps = {};
    smProps =
        {

            'true': 1,
            'false': 0,
            'webmdcom': 3,
            'webmdbootscom': 7,
            'mwebmdcom': 8,
            'mwebmdbootscom': 9,
            'RedirectByID': 'A19338F8-DA37-4ED6-9FCC-00312C79465A',
            'searchfromurl': 'http://www.dev01.webmd.com/cancer',
            'searchtourl': 'http://www.dev01.webmd.com/a-to-z-guides/clinical-trials-related-information',
            'fromchronicleid': '091e9c5e8004aaff',
            'tochronicleid': '091e9c5e80e6de16',

        }

    var env = "Dev";
    var GetAllRedirectsForEntireSystem = {};
    var GetAll_Redirects_For_EntireSystem = "get-all?&includeDeleted=" + smProps.true;
    var GetAllRedirectsForSiteID = {};
    var GetAll_Redirects_ForSiteID = "get-all-for-site?siteID=" + smProps.webmdcom + "&includeDeleted=" + smProps.true;
    var GetOneRedirectByID = {};
    var GetOne_RedirectByID = "get-by-id?id=" + smProps.RedirectByID;
    var GetAllRedirectFromUrlPattern = {};
    var GetAll_RedirectFromUrl_Pattern = "search-start-of-from-url?startsWith=" + smProps.searchfromurl + "&includeDeleted=" + smProps.false;
    var GetAllRedirectToUrlPattern = {};
    var GetAll_RedirectToUrl_Pattern = "search-start-of-to-url?startsWith=" + smProps.searchtourl + "&includeDeleted=" + smProps.false;
    var GetAllRedirectFromaChronicleID = {};
    var GetAll_RedirectFroma_ChronicleID = "get-by-from-chronicle-id?chronicleid=" + smProps.fromchronicleid;
    var GetAllRedirectsRedirectedtoaChronicleID = {};
    var GetAll_RedirectsRedirectedtoa_ChronicleID = "get-by-to-chronicle-id?chronicleid=" + smProps.tochronicleid;
    var ExportAllRedirectsToCsvFile = {};
    var Export_AllRedirects_ToCsv_File = "export-all-to-csv?includeAllFields=" + smProps.true + "&includeDeleted=" + smProps.true;
    var ExportAllRedirectsForSiteToCsvFile = {};
    var Export_AllRedirects_ForSiteToCsv_File = "export-all-for-site-to-csv?siteID=" + smProps.webmdcom + "&includeAllFields=" + smProps.true + "&includeDeleted=" + smProps.true;
    var CreateRedirectonUrls = {};
    var Create_Redirect_on_Urls = "create-by-url";
    var CreateRedirectonChronicleIDS = {};
    var Create_Redirect_on_ChronicleIDS = "create-by-ids";
    var UpdateToUrl = {};
    var Update_To_Url = "update-to-url";
    var ReplaceToChronicleIDforAll = {};
    var Replace_To_ChronicleID_for_All = "replace-to-chronicle-id-for-all";
    var DeleteOneormoreid = {};
    var Delete_One_or_more = "delete-many-by-id";

    before(() => {

        GetAllRedirectsForEntireSystem = test.GetResult(env, GetAll_Redirects_For_EntireSystem);
        GetAllRedirectsForSiteID = test.GetResult(env, GetAll_Redirects_ForSiteID);
        GetOneRedirectByID = test.GetResult(env, GetOne_RedirectByID);
        GetAllRedirectFromUrlPattern = test.GetResult(env, GetAll_RedirectFromUrl_Pattern);
        GetAllRedirectToUrlPattern = test.GetResult(env, GetAll_RedirectToUrl_Pattern);
        GetAllRedirectFromaChronicleID = test.GetResult(env, GetAll_RedirectFroma_ChronicleID);
        GetAllRedirectsRedirectedtoaChronicleID = test.GetResult(env, GetAll_RedirectsRedirectedtoa_ChronicleID);
        ExportAllRedirectsToCsvFile = test.GetResult(env, Export_AllRedirects_ToCsv_File);
        ExportAllRedirectsForSiteToCsvFile = test.GetResult(env, Export_AllRedirects_ForSiteToCsv_File);
        CreateRedirectonUrls = test.PostResult(env, Create_Redirect_on_Urls);
        CreateRedirectonChronicleIDS = test.PostResult(env, Create_Redirect_on_ChronicleIDS);
        UpdateToUrl = test.PutResult(env, Update_To_Url);
        ReplaceToChronicleIDforAll = test.PutResult(env, Replace_To_ChronicleID_for_All);
        DeleteOneormoreid = test.DeleteResult(env, Delete_One_or_more);
    });

    //assertions

    it('Verify Get All Redirects For Entire System (optionally include Deleted)', () => {
        expect(GetAllRedirectsForEntireSystem.statusCode).to.equal(200);

    });


    it('Verify Get All Redirects For Site ID (optionally include Deleted)', () => {
        expect(GetAllRedirectsForSiteID.statusCode).to.equal(200);
    });

    it('Verify Get One Redirect By ID', () => {

        expect(GetOneRedirectByID.statusCode).to.equal(200);
    });

    it('Verify Get All Redirect From Url Pattern (must include the start of the url)', () => {
        expect(GetAllRedirectFromUrlPattern.statusCode).to.equal(200);
    });

    it('Verify Get All Redirect To Url Pattern (must include the start of the url)', () => {
        expect(GetAllRedirectToUrlPattern.statusCode).to.equal(200);
    });
    it('Verify Get All Redirect From a ChronicleID', () => {
        expect(GetAllRedirectFromaChronicleID.statusCode).to.equal(200);
    });
    it('Verify Get All Redirects Redirected to a ChronicleID', () => {
        expect(GetAllRedirectsRedirectedtoaChronicleID.statusCode).to.equal(200);
    });

    it('Verify Export All Redirects To Csv File', () => {
        expect(ExportAllRedirectsToCsvFile.statusCode).to.equal(200);
    });

    it('Verify Export All Redirects For Site To Csv File', () => {
        expect(ExportAllRedirectsForSiteToCsvFile.statusCode).to.equal(200);
    });

    it('Verify Create Redirect on Urls', () => {
        expect(CreateRedirectonUrls.body.StatusCode).to.equal(1);
    });

    it('Verify Create Redirect on Chronicle IDS', () => {
        expect(CreateRedirectonChronicleIDS.body.StatusCode).to.equal(1);
    });
    it('Verify Update To Url', () => {
        expect(UpdateToUrl.body.StatusCode).to.equal(1);
    });
    it('Verify Replace To ChronicleID for All', () => {
        expect(ReplaceToChronicleIDforAll.body.StatusCode).to.equal(1);
    });
    it('Verify Delete One or more (mark Deletd by id)', () => {
        expect(DeleteOneormoreid.body.StatusCode).to.equal(1);
    });

});

var page = require('./../../common/page');

var smdata = Object.create(page, {

    ApiTestData: {

        get: () => {
            var smProps = {};
            var webmdcom = 3;
            var webmdbootscom = 7;
            var mwebmdcom = 8;
            var mwebmdbootscom = 9;
            var booltrue = 1;
            var boolfalse = 0;
            // var RedirectByID = 'A19338F8-DA37-4ED6-9FCC-00312C79465A';
            var searchfromurl = 'http://www.dev01.webmd.com/video/blind-sleep-disorders';
            var searchtourl = 'http://www.dev01.webmd.com/a-to-z-guides/clinical-trials-related-information';
            var fromchronicleid = '091e9c5e8004aaff';
            var tochronicleid = '091e9c5e80e6de16';
            var fromfullUrl = 'http://www.dev01.webmd.com/video/blind-sleep-disorders';
            var tofullUrl = 'http://www.dev01.webmd.com/a-to-z-guides/clinical-trials-related-information';


            return smProps =
                {
                   
                    "GetAll_Redirects_For_EntireSystem": "get-all?&includeDeleted=" + booltrue,
                    "GetAll_Redirects_ForSiteID": "get-all-for-site?siteID=" + webmdcom + "&includeDeleted=" + booltrue,
                    "GetOne_RedirectByID": "get-by-id?id=",
                    "GetOne_RedirectBy_FromUrl": "get-by-from-url?fromUrl=",
                     "IncludeDeleted":"?includeDeleted=" + booltrue,
                    "GetAll_RedirectFromUrl_Pattern": "search-start-of-from-url?startsWith=",
                    "GetAll_RedirectToUrl_Pattern": "search-start-of-to-url?startsWith=" + searchtourl + "&includeDeleted=" + boolfalse,
                    "GetAll_RedirectFroma_ChronicleID": "get-by-from-chronicle-id?chronicleid=" + fromchronicleid,
                    "GetAll_RedirectsRedirectedtoa_ChronicleID": "get-by-to-chronicle-id?chronicleid=" + tochronicleid,
                    "GetAll_Redirects_ToaUrl": "get-by-from-url-id?toUrl=" + tofullUrl + "&includeDeleted=" + booltrue,
                    "Export_AllRedirects_ToCsv_File": "export-all-to-csv?includeAllFields=" + booltrue + "&includeDeleted=" + booltrue,
                    "Export_AllRedirects_ForSiteToCsv_File": "export-all-for-site-to-csv?siteID=" + webmdcom + "&includeAllFields=" + booltrue + "&includeDeleted=" + booltrue,
                    "Create_Redirect_on_Urls": "create-by-url",
                    "Create_Redirect_on_ChronicleIDS": "create-by-ids",
                    "Update_To_Url": "update-to-url",
                    "Replace_To_ChronicleID_for_All": "replace-to-chronicle-id-for-all",
                    "Delete_One_or_more": "delete-many-by-id",


                }

        }
    },
   


});

module.exports = smdata;
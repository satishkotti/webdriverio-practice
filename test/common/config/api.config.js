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

                    "CreateRedirectonUrls":

                    {
                        "fromUrl": 'http://www.dev01.webmd.com/cancer/features/cancer-living-with-talking-to-your-kids-about-cancer',
                        "toUrl": 'http://www.cancercenter.com/cancer/',
                    },


                    "CreateRedirectonChronicleIDS":

                    {
                        "fromChronID": '091e9c5e8000a4f1',
                        "toChronID": '091e9c5e8000ab6f',
                    },


                    "updatetourl":

                    {
                        "id": 'C35FFC22-5469-40EB-94AF-85E057629692',
                        "toUrl": 'http://www.cancercenter.com/cancer/',
                    },


                    "replacetochronicleidforall":

                    {
                        "oldToChronicleID": '091e9c5e80005962',
                        "newToChronicleID": '091e9c5e80038ec9',
                    },


                    "DeleteOneormoreid":

                    {
                        "Ids": ['2D79A320-04B0-43B9-A77D-A8946AEAF4B4', '5EC133C0-3AF4-4B71-97DA-DA01D59A5548']

                    },


                    "GetAll_Redirects_For_EntireSystem": "get-all?&includeDeleted=" + booltrue,
                    "GetAll_Redirects_ForSiteID": "get-all-for-site?siteID=" + webmdcom + "&includeDeleted=" + booltrue,
                    "GetOne_RedirectByID": "get-by-id?id=",
                    "GetOne_RedirectBy_FromUrl": "get-by-from-url?fromUrl=" + fromfullUrl + "?includeDeleted=" + booltrue,
                    "GetAll_RedirectFromUrl_Pattern": "search-start-of-from-url?startsWith=" + searchfromurl + "&includeDeleted=" + boolfalse,
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
    testEnv: {

        get: () => {
            return {
                dev: 'dev01',
                dev03: 'dev03',
                qa: 'qa02',
                preprod: 'qa00'
            }
        }
    },
    testEnvUrl: {
        get: () => {
            return {
                dev: 'http://redirect.dev01.webmd.com/api/redirect/',
                dev03: 'http://redirect.dev03.webmd.com/api/redirect/',
                qa: 'http://redirect.qa02.webmd.com/api/redirect/',
                preprod: 'http://redirect.qa00.webmd.com/api/redirect/'
            }

        }
    },
   

});

module.exports = smdata;
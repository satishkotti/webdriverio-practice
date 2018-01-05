module.exports = {
     DBconfig : {
            user: 'qaautomation1',
            password: 'qaautomation1',
            server: 'sqlvp-cq01-08.portal.webmd.com',
            database: 'URLGrouping',
            requestTimeout: 12000000,
        },
   //  SqlQuery:  "select  * from [ODS].[Temp_DataToVerify] where Source_AssetId = '091e9c5e80039e89'",
     //091e9c5e80039e89  , 091e9c5e8000e913
     //SqlQuery:  "select  top 3 * from [ODS].[Temp_DataToVerify] where COMMENT='Not Exists - Expired/Deleted'",
     SqlQuery:  "select top 1000 * from [ODS].[Temp_DataToVerify] ",
    SQLQuery:  {
        fetchAssetIds: 'select top 1000 Source_AssetID, Target_AssetID from  URLGrouping.[ODS].[Temp_DataToVerify]',
        fetchAssetData: {
            Source_AssetID: "select  * from  URLGrouping.[ODS].[Temp_DataToVerify] where Source_AssetId = '***'",
            Target_AssetID: "select  * from  URLGrouping.[ODS].[Temp_DataToVerify] where Target_AssetId = '***'"
        }
    },
    SQLQuerys:  {
        fetchAssetIds: 'select top 1000 Source_AssetID, Target_AssetID ,Source_URI,Target_URI from  URLGrouping.[ODS].[Temp_DataToVerify]',
        fetchAssetData: {
            Source_AssetID: "select  * from  URLGrouping.[ODS].[Temp_DataToVerify] where Source_AssetId = '***'",
            Target_AssetID: "select  * from  URLGrouping.[ODS].[Temp_DataToVerify] where Target_AssetId = '***'",
            Source_URI: "select  * from  URLGrouping.[ODS].[Temp_DataToVerify] where Source_URI = '***'",
            Target_URI: "select  * from  URLGrouping.[ODS].[Temp_DataToVerify] where Target_URI  = '***'",

        }
    },

    AssetIdExists: '091e9c5e8000776d',
    UrlExists: 'www.qa01.webmd.com/men/guide/prostatitis',
    AssetIdExistsDiffStatusDel: '091e9c5e800067a5',
    UrlExistsDiffStatusDel: 'www.qa01.m.webmd.com/a-to-z-guides/news/20010307/cell-transplant-surgery-parkinsons-not-always-effective',
    AssetIdExistsDiffStatusAct: '091e9c5e800113db',
    UrlExistsDiffStatusAct: 'www.qa01.m.webmd.com/a-to-z-guides/diaper-rash-treatment',
    AssetIdNotExistsExpDel: '091e9c5e800067a5',
    UrlNotExistsExpDel: 'www.qa01.m.webmd.com/a-to-z-guides/news/20010307/cell-transplant-surgery-parkinsons-not-always-effective',
     AssetIdNew: '091e9c5e800083f9',
    UrlNew: 'www.qa01.webmd.com/cancer/common-cancers-16/breast/breast-cancer-choosing-doctors',
    rowOne: '1',
    rowTwo: '2',
    rowThree: '3',
    rowFour: '4',
    //solrBaseUrl: 'http://searchsvc-web.con.sea1.webmd.com/search/2/passthrough/cms_content/',
    solrBaseUrl: 'http://searchsvc-web-qa01.con.iad1.webmd.com/search/2/passthrough/cms_content/',
    queryString: '?q=id:(%22DCTM_***%22)&wt=json&indent=true&fl=id,%20urls',
}
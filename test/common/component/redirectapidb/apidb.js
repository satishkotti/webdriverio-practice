var mssql = require('./../db/sqlDb');
var Promise = require('bluebird');

module.exports = {

    connection:
    {
        user: "",
        password: "",
        server: "",
        database: ""
    },
    GetAllRedirectsForEntireSystem: function () {
        mssql.connection = this.connection;

        var sql = `
                select top 1 ('get-all?&includeDeleted=' + CAST(is_core_site AS varchar(10))) As apiGetAllRedirectsForEntireSystem from webmd_domains where is_core_site=1
                      
                    `;

        return Promise.resolve
            (
            mssql.executeSql(sql)
            );
    },
     GetAllRedirectsForSiteID: function () {
        mssql.connection = this.connection;

        var sql = `
                select top 1 ('get-all-for-site?siteID=' + CAST(site_id AS varchar(10)) + '&includeDeleted=' + CAST(is_core_site AS varchar(10))) As apiGetAllRedirectsForSiteID from webmd_domains where site_id=7 and is_core_site=1
                      
                    `;

        return Promise.resolve
            (
            mssql.executeSql(sql)
            );
    },
    getByID: function () {
        mssql.connection = this.connection;

        var sql = `
              SELECT Top 1 ('get-by-id?id=' + CAST(R.id AS varchar(100))) AS apigetByID,
           LOWER(R.id) AS 'Id',
           R.From_Chronic_Id AS 'FromChronicId',
           CAST(R.From_Site_Id AS int) AS 'FromSiteId',
           R.From_Prefix AS 'FromPrefix',
           R.From_Url AS 'FromUrl',
           CAST(R.To_Site_Id AS int) AS 'ToSiteId',
           R.To_Chronic_Id AS 'ToChronicId',
           R.To_Url AS 'ToUrl',
           R.Is_External AS 'IsExternal',
           R.Modified_By AS 'ModifiedBy',
           R.Modified_Date AS 'ModifiedDate',
           R.Status AS 'Status',
           R.ToQString AS 'ToQString',
           FromPage.content_chronic_id AS 'FromPage_ChronicID',
           CAST(FromPage.site_id AS int) AS 'FromPage_SiteId',
           FromPage.prefix AS 'FromPage_Prefix',
           FromPage.friendly_url AS 'FromPage_Url',
           FromPage.status AS 'FromPage_Status',
           CAST(ToPage.site_id AS int) AS 'ToPage_SiteID',
           ToPage.prefix AS 'ToPage_Prefix',
           ToPage.friendly_url AS 'ToPage_Url',
           ToPage.Status AS 'ToPage_Status'
FROM Manual_Redirect R
LEFT OUTER JOIN RT_PageUrlMap FromPage ON FromPage.redirect_id = R.id
LEFT OUTER JOIN RT_PageUrlMap ToPage ON R.To_chronic_id = ToPage.content_chronic_id
AND R.To_Site_Id = ToPage.site_id 
                      
                    `;

        return Promise.resolve
            (
            mssql.executeSql(sql)
            );
    },
   
    GetOneRedirectByFromUrl: function () {
        mssql.connection = this.connection;

        var sql = `
               SELECT TOP 1 ('get-by-from-url?fromUrl='+'http://' + PFrom.Prefix + '.' + D.domain + PFrom.friendly_url + '?includeDeleted='+CAST(D.is_core_site AS varchar(10))) AS apiGetOneRedirectByFromUrl
FROM Manual_Redirect R
INNER JOIN RT_PageUrlMap PFrom ON R.ID = PFrom.redirect_ID
INNER JOIN RT_PageUrlMap PTo ON R.To_Chronic_ID = PTo.content_chronic_id
AND R.To_Site_ID = PTo.Site_ID
INNER JOIN webmd_Domains D ON PFrom.site_id = D.site_id
AND D.is_core_site = 1
WHERE R.status <> 'd'
  AND PFrom.Status <> 'd'
  AND PTo.Status <> 'd'
                      
                    `;

        return Promise.resolve
            (
            mssql.executeSql(sql)
            );
    },
    GetAllRedirectFromUrlPattern: function () {
        mssql.connection = this.connection;

        var sql = `
               SELECT TOP 1 ('search-start-of-from-url?startsWith='+'http://' + PFrom.Prefix + '.' + D.domain + PFrom.friendly_url + '&includeDeleted='+CAST(D.is_core_site AS varchar(10))) AS apiGetAllRedirectFromUrlPattern
FROM Manual_Redirect R
INNER JOIN RT_PageUrlMap PFrom ON R.ID = PFrom.redirect_ID
INNER JOIN RT_PageUrlMap PTo ON R.To_Chronic_ID = PTo.content_chronic_id
AND R.To_Site_ID = PTo.Site_ID
INNER JOIN webmd_Domains D ON PFrom.site_id = D.site_id
AND D.is_core_site = 1
WHERE R.status <> 'd'
  AND PFrom.Status <> 'd'
  AND PTo.Status <> 'd'
                      
                    `;

        return Promise.resolve
            (
            mssql.executeSql(sql)
            );
    },
    GetAllRedirectToUrlPattern: function () {
        mssql.connection = this.connection;

        var sql = `
              SELECT TOP 1 ('search-start-of-to-url?startsWith='+'http://' + PTo.Prefix + '.' + D.Domain + PTo.friendly_url + '&includeDeleted='+CAST(D.is_core_site AS varchar(10))) AS apiGetAllRedirectToUrlPattern
FROM Manual_Redirect R
INNER JOIN RT_PageUrlMap PFrom ON R.ID = PFrom.redirect_ID
INNER JOIN RT_PageUrlMap PTo ON R.To_Chronic_ID = PTo.content_chronic_id
AND R.To_Site_ID = PTo.Site_ID
INNER JOIN webmd_Domains D ON PFrom.site_id = D.site_id
AND D.is_core_site = 1
WHERE R.status <> 'd'
  AND PFrom.Status <> 'd'
  AND PTo.Status <> 'd'
                      
                    `;

        return Promise.resolve
            (
            mssql.executeSql(sql)
            );
    },
    
};

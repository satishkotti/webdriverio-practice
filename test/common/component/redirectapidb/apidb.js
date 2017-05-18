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
       
    getByID: function () {
        mssql.connection = this.connection;

        var sql = `
              SELECT Top 1 
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
                        SELECT TOP 1 'http://' + PFrom.Prefix + '.' + D.domain + PFrom.friendly_url AS 'apiGetOneRedirectByFromUrl'
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
               SELECT TOP 1 ('http://' + PFrom.Prefix + '.' + D.domain + PFrom.friendly_url ) AS apiGetAllRedirectFromUrlPattern
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
    GetAllRedirectFromaChronicleID: function () {
        mssql.connection = this.connection;

        var sql = `
                        SELECT TOP 1 ('get-by-from-chronicle-id?chronicleid='+CAST(R.From_Chronic_Id AS varchar(100))) AS apiGetAllRedirectFromaChronicleID
                        FROM Manual_Redirect R
                        WHERE R.status <> 'd'
                      
                    `;

        return Promise.resolve
            (
            mssql.executeSql(sql)
            );
    },
    GetAllRedirectsRedirectedtoaChronicleID: function () {
        mssql.connection = this.connection;

        var sql = `
                        SELECT TOP 1 ('get-by-to-chronicle-id?chronicleid='+CAST(R.To_Chronic_Id AS varchar(100))) AS apiGetAllRedirectsRedirectedtoaChronicleID
                        FROM Manual_Redirect R
                        WHERE R.status <> 'd'
                      
                    `;

        return Promise.resolve
            (
            mssql.executeSql(sql)
            );
    },
    GetAllRedirectsToaUrl: function () {
        mssql.connection = this.connection;

        var sql = `
                            SELECT TOP 1 ('get-by-to-url?toUrl='+ R.To_URL + '&includeDeleted='+CAST(D.is_core_site AS varchar(10))) AS apiGetAllRedirectsToaUrl
                            FROM Manual_Redirect R
                            INNER JOIN RT_PageUrlMap PFrom ON R.ID = PFrom.redirect_ID
                            INNER JOIN webmd_Domains D ON PFrom.site_id = D.site_id
                            AND D.is_core_site = 1
                            WHERE R.To_URL IS NOT NULL and  R.status <> 'd'
                      
                    `;

        return Promise.resolve
            (
            mssql.executeSql(sql)
            );
    },
    
    CreateByURLInvalidURLCombination: function () {
        mssql.connection = this.connection;

        var sql = `
                             SELECT TOP 1 
                           
                            'http://' + PFrom.Prefix + '.' + D.domain + PFrom.friendly_url AS 'fromUrl',
                            'http://' + PFrom.Prefix + '.' + D.Domain + PFrom.friendly_url AS 'toUrl'
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
    CreateByURLInvalidToURLInternal: function () {
        mssql.connection = this.connection;

        var sql = `
                       SELECT TOP 1 'http://' + PFrom.Prefix + '.' + D.domain + PFrom.friendly_url AS 'FromUrl',
                        'http://' + PTo.Prefix + '.' + D.Domain + PTo.friendly_url AS 'ToUrl'
                        FROM Manual_Redirect R
                        INNER JOIN RT_PageUrlMap PFrom ON R.ID = PFrom.redirect_ID
                        INNER JOIN RT_PageUrlMap PTo ON R.To_Chronic_ID = PTo.content_chronic_id
                        AND R.To_Site_ID = PTo.Site_ID
                        INNER JOIN webmd_Domains D ON PFrom.site_id = D.site_id
                        AND D.is_core_site = 1
                        LEFT OUTER JOIN RT_UrlRedirects SysR ON SysR.old_prefix = R.From_Prefix
                        AND SysR.old_friendly_url = R.From_Url
                        LEFT OUTER JOIN RT_PageUrlMap PFromOnUrl ON R.To_Url = PFromOnUrl.friendly_url
                        AND R.From_Site_id = PFromOnUrl.Site_ID
                        AND R.From_Prefix = PFromOnUrl.Prefix
                        WHERE PFromOnUrl.status = 'D'
                                               
                    `;

        return Promise.resolve
            (
            mssql.executeSql(sql)
            );
    },
    CreateByURLInvalidFormToURL: function () {
        mssql.connection = this.connection;

            var sql = `
                            SELECT TOP 1 'http://' + PFrom.Prefix + '.' + D.domain + PFrom.friendly_url AS 'FromUrl',
                            'http://' + PTo.Prefix + '.' + D.Domain + '?click?id=http://www.cnn.com' AS 'ToUrl'
                            FROM Manual_Redirect R
                            INNER JOIN RT_PageUrlMap PFrom ON R.ID = PFrom.redirect_ID
                            INNER JOIN RT_PageUrlMap PTo ON R.To_Chronic_ID = PTo.content_chronic_id
                            AND R.To_Site_ID = PTo.Site_ID
                            INNER JOIN webmd_Domains D ON PFrom.site_id = D.site_id
                            AND D.is_core_site = 1
                            LEFT OUTER JOIN RT_UrlRedirects SysR ON SysR.old_prefix = R.From_Prefix
                            AND SysR.old_friendly_url = R.From_Url
                            LEFT OUTER JOIN RT_PageUrlMap PFromOnUrl ON R.From_Url = PFromOnUrl.friendly_url
                            AND R.From_Site_id = PFromOnUrl.Site_ID
                            AND R.From_Prefix = PFromOnUrl.Prefix
                                                                        
                    `;

        return Promise.resolve
            (
            mssql.executeSql(sql)
            );
    },

     CreateByURLInvalidAnotherLifecyleToURL: function () {
        mssql.connection = this.connection;

            var sql = `
                            SELECT TOP 1 'http://' + PFrom.Prefix + '.' + D.domain + PFrom.friendly_url AS 'FromUrl',
                            'http://' + PTo.Prefix + '.' +
                            (SELECT DOMAIN
                            FROM webmd_Domains
                            WHERE domain_id =2) + PTo.friendly_url AS 'ToUrl'
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

CreateByURLInvalidExtraSlashToURL: function () {
        mssql.connection = this.connection;

            var sql = `
                                SELECT TOP 1 'http://' + PFrom.Prefix + '.' + D.domain + PFrom.friendly_url AS 'fromUrl',
                                'http://' + PTo.Prefix + '.' + D.Domain +'/'+ PTo.friendly_url AS 'toUrl'
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
    CreateByURLInvalidDoesNoStartWithhttpToURL: function () {
        mssql.connection = this.connection;

            var sql = `
                            SELECT TOP 1 'http://' + PFrom.Prefix + '.' + D.domain + PFrom.friendly_url AS 'fromUrl',
                            PTo.Prefix + '.' + D.Domain + PTo.friendly_url AS 'toUrl'
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
    CreateByURLInvalidExtraSlashFromURL: function () {
        mssql.connection = this.connection;

            var sql = `
                                SELECT TOP 1 'http://' + PFrom.Prefix + '.' + D.domain+'/' + PFrom.friendly_url AS 'fromUrl',
                                'http://' + PTo.Prefix + '.' + D.Domain + PTo.friendly_url AS 'toUrl'
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
    CreateByURLInvalidDoesNoStartWithhttpFormURL: function () {
        mssql.connection = this.connection;

            var sql = `
                                SELECT TOP 1 PFrom.Prefix + '.' + D.domain + PFrom.friendly_url AS 'FromUrl',
                                'http://' + PTo.Prefix + '.' + D.Domain + PTo.friendly_url AS 'ToUrl'
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
    CreateByURLInvalidAnotherLifecyleFromURL: function () {
        mssql.connection = this.connection;

            var sql = `
                                    SELECT TOP 1 'http://' + PFrom.Prefix + '.' +
                                    (SELECT DOMAIN
                                    FROM webmd_Domains
                                    WHERE domain_id =2) + PFrom.friendly_url AS 'FromUrl',
                                            'http://' + PTo.Prefix + '.' + D.Domain + PTo.friendly_url AS 'ToUrl'
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
    CreateByURLRedirectExists: function () {
        mssql.connection = this.connection;

            var sql = `
                                SELECT top 1 'http://' + FromPage.prefix + '.' + FromPageDomain.domain + FromPage.friendly_url AS 'FromUrl',
                                'http://' + PTo.Prefix + '.' + FromPageDomain.Domain + PTo.friendly_url AS 'ToUrl'
                                FROM Manual_Redirect R
                                INNER JOIN RT_PageUrlMap FromPage ON FromPage.redirect_id = R.id
                                INNER JOIN RT_PageUrlMap PTo ON R.To_Chronic_ID = PTo.content_chronic_id
                                AND R.To_Site_ID = PTo.Site_ID
                                INNER JOIN webmd_Domains FromPageDomain ON FromPage.Site_id = FromPagedomain.site_id
                                AND FrompageDomain.is_core_site = 1
                                LEFT OUTER JOIN RT_PageUrlMap ToPage ON R.To_chronic_id = ToPage.content_chronic_id
                                AND R.To_Site_Id = ToPage.site_id
                                WHERE FromPage.Status <> 'd'
                                AND PTo.Status <> 'd'
                                AND R.Status <> 'd'        
                                                                        
                    `;

        return Promise.resolve
            (
            mssql.executeSql(sql)
            );
    },
    CreateExists: function () {
        mssql.connection = this.connection;

            var sql = `
                            SELECT top 1 'http://' + PTo.Prefix + '.' + FromPageDomain.Domain + PTo.friendly_url AS 'FromUrl',
                            'http://' + FromPage.prefix + '.' + FromPageDomain.domain + FromPage.friendly_url AS 'ToUrl'
                            FROM Manual_Redirect R
                            INNER JOIN RT_PageUrlMap FromPage ON FromPage.redirect_id = R.id
                            INNER JOIN RT_PageUrlMap PTo ON R.To_Chronic_ID = PTo.content_chronic_id
                            AND R.To_Site_ID = PTo.Site_ID
                            INNER JOIN webmd_Domains FromPageDomain ON FromPage.Site_id = FromPagedomain.site_id
                            AND FrompageDomain.is_core_site = 1
                            LEFT OUTER JOIN RT_PageUrlMap ToPage ON R.To_chronic_id = ToPage.content_chronic_id
                            AND R.To_Site_Id = ToPage.site_id
                            WHERE FromPage.Status <> 'd'
                            AND PTo.Status <> 'd'
                            AND R.Status <> 'd'
                                                                        
                    `;

        return Promise.resolve
            (
            mssql.executeSql(sql)
            );
    },
    CreateByURLActivePage: function () {
        mssql.connection = this.connection;

            var sql = `
                                SELECT top 1 'http://' + p.prefix + '.' + d.Domain + P.friendly_url AS 'FromUrl',
                                (SELECT top 1 'http://' + p.prefix + '.' + d.Domain + P.friendly_url
                                FROM RT_PageUrlMap P
                                INNER JOIN webmd_Domains D ON P.site_id = D.site_id
                                AND d.is_core_site = 1
                                WHERE P.status <> 'd') AS 'ToUrl'
                                FROM RT_PageUrlMap P
                                INNER JOIN webmd_Domains D ON P.site_id = D.site_id
                                AND d.is_core_site = 1
                                LEFT OUTER JOIN Manual_Redirect RedirectHard ON P.redirect_id = RedirectHard.id
                                LEFT OUTER JOIN Manual_Redirect RedirectOnUrl ON P.site_id = RedirectOnUrl.From_Site_Id
                                AND P.prefix = RedirectOnUrl.From_Prefix
                                AND P.friendly_url = RedirectOnUrl.From_Url
                                WHERE RedirectHard.id IS NULL
                                AND RedirectOnUrl.ID IS NULL
                                AND P.status <> 'd'         
                                                                        
                    `;

        return Promise.resolve
            (
            mssql.executeSql(sql)
            );
    },
    CreateByURLDeletedPage: function () {
        mssql.connection = this.connection;

            var sql = `
                                SELECT top 1 'http://' + R.From_Prefix + '.' + FromDomain.domain + R.From_Url AS 'FromUrl',

                                (SELECT Top 1 'http://' + FromPage.prefix + '.' + FromPageDomain.domain + FromPage.friendly_url
                                FROM Manual_Redirect R
                                INNER JOIN RT_PageUrlMap FromPage ON FromPage.redirect_id = R.id
                                INNER JOIN webmd_Domains FromPageDomain ON FromPage.Site_id = FromPagedomain.site_id
                                AND FrompageDomain.is_core_site = 1
                                LEFT OUTER JOIN RT_PageUrlMap ToPage ON R.To_chronic_id = ToPage.content_chronic_id
                                AND R.To_Site_Id = ToPage.site_id
                                WHERE FromPage.Status <> 'd'
                                    AND R.Status <> 'd') AS 'ToUrl'
                                FROM Manual_Redirect R
                                INNER JOIN RT_PageUrlMap FromPage ON FromPage.redirect_id = R.id
                                INNER JOIN webmd_Domains FromDomain ON R.From_Site_Id = FromDomain.site_id
                                WHERE FromPage.Status = 'd'
                                AND R.Status <> 'd'     
                                                                        
                    `;

        return Promise.resolve
            (
            mssql.executeSql(sql)
            );
    },
     CreateByURLNonExistantPage: function () {
        mssql.connection = this.connection;

            var sql = `
                                  
                                                                        
                    `;

        return Promise.resolve
            (
            mssql.executeSql(sql)
            );
    },
    CreateByURLToNonExistantPage: function () {
        mssql.connection = this.connection;

            var sql = `
                                  
                                                                        
                    `;

        return Promise.resolve
            (
            mssql.executeSql(sql)
            );
    },
     CreateByURLToExternalURL: function () {
        mssql.connection = this.connection;

            var sql = `
                                SELECT TOP 1 'http://' + PFrom.Prefix + '.' + D.domain + PFrom.friendly_url AS 'FromUrl',
                                'http://' + 'microsoft' + '.' + 'com' AS 'ToUrl'
                                FROM Manual_Redirect R
                                INNER JOIN RT_PageUrlMap PFrom ON R.ID = PFrom.redirect_ID
                                INNER JOIN RT_PageUrlMap PTo ON R.To_Chronic_ID = PTo.content_chronic_id
                                AND R.To_Site_ID = PTo.Site_ID
                                INNER JOIN webmd_Domains D ON R.From_Site_ID = D.site_id
                                AND D.is_core_site = 1
                                LEFT OUTER JOIN RT_UrlRedirects SysR ON SysR.old_prefix = R.From_Prefix
                                AND SysR.old_friendly_url = R.From_Url
                                LEFT OUTER JOIN RT_PageUrlMap PFromOnUrl ON R.From_Url = PFromOnUrl.friendly_url
                                AND R.From_Site_id = PFromOnUrl.Site_ID
                                AND R.From_Prefix = PFromOnUrl.Prefix
                                AND PFromOnUrl.status = 'a'
                                WHERE R.status <> 'd'
                                AND PFrom.Status = 'd'
                                AND PTo.Status <> 'd'
                                AND SysR.pagemap_id IS NULL --no system redirects on from
                                AND PFromOnUrl.pagemap_id IS NULL --no active pages using url     
                                                                        
                    `;

        return Promise.resolve
            (
            mssql.executeSql(sql)
            );
    },
     CreateByURLConfirmurlsaretrimmed: function () {
        mssql.connection = this.connection;

            var sql = `
                                  
                                                                        
                    `;

        return Promise.resolve
            (
            mssql.executeSql(sql)
            );
    },
    CreateByURLTestlowercasing: function () {
        mssql.connection = this.connection;

            var sql = `
                                  
                                                                        
                    `;

        return Promise.resolve
            (
            mssql.executeSql(sql)
            );
    },
    CreateByURLTestToQuerystring: function () {
        mssql.connection = this.connection;

            var sql = `
                                  
                                                                        
                    `;

        return Promise.resolve
            (
            mssql.executeSql(sql)
            );
    },
    CreateByURLTestlowercasingwithquerystring: function () {
        mssql.connection = this.connection;

            var sql = `
                                  
                                                                        
                    `;

        return Promise.resolve
            (
            mssql.executeSql(sql)
            );
    },
    CreateByUrlResurrectDeletedRedirect: function () {
        mssql.connection = this.connection;

            var sql = `
                                  
                                                                        
                    `;

        return Promise.resolve
            (
            mssql.executeSql(sql)
            );
    },
};

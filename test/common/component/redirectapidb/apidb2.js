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

    getActiveUrlThatIsNotRedirected: function(count)
    {
        var sql = `
            select TOP ` + count + `
                'http://' + p.prefix + '.' + d.Domain + P.friendly_url as 'Url'
            FROM
                RT_PageUrlMap P
                    INNER JOIN
                webmd_Domains D
                        ON P.site_id = D.site_id
                                AND
                            d.is_core_site = 1
                    LEFT OUTER JOIN
                Manual_Redirect RedirectHard
                        ON P.redirect_id = RedirectHard.id
                    LEFT OUTER Join
                Manual_Redirect RedirectOnUrl
                        ON
                            P.site_id = RedirectOnUrl.From_Site_Id
                                and
                            P.prefix = RedirectOnUrl.From_Prefix
                                and
                            P.friendly_url = RedirectOnUrl.From_Url
                        
            WHERE
                RedirectHard.id IS NULL
                    AND
                RedirectOnUrl.ID IS NULL
                    AND
                P.status <> 'd'
        `;

        return Promise.resolve
        (
            mssql.executeSql(sql)
        );

        
    },

    getDeletedUrlThatIsNotRedirected: function(count)
    {
        var sql = `
            select TOP ` + count + `
                'http://' + p.prefix + '.' + d.Domain + P.friendly_url as 'Url'
            FROM
                RT_PageUrlMap P
                    INNER JOIN
                webmd_Domains D
                        ON P.site_id = D.site_id
                                AND
                            d.is_core_site = 1
                    LEFT OUTER JOIN
                Manual_Redirect RedirectHard
                        ON P.redirect_id = RedirectHard.id
                    LEFT OUTER Join
                Manual_Redirect RedirectOnUrl
                        ON
                            P.site_id = RedirectOnUrl.From_Site_Id
                                and
                            P.prefix = RedirectOnUrl.From_Prefix
                                and
                            P.friendly_url = RedirectOnUrl.From_Url
                        
            WHERE
                RedirectHard.id IS NULL
                    AND
                RedirectOnUrl.ID IS NULL
                    AND
                P.status = 'd'
        `;

        return Promise.resolve
        (
            mssql.executeSql(sql)
        );

    },

    getRedirectedFromUrlForActivePage: function(count)
    {
        var sql =
            `
            SELECT TOP ` + count + `
                'http://' + FromPage.prefix + '.' + FromPageDomain.domain + FromPage.friendly_url as 'Url'
            FROM  
                Manual_Redirect R
                    INNER JOIN
                RT_PageUrlMap FromPage
                        on 
                            FromPage.redirect_id = R.id
                    INNER JOIN
                webmd_Domains FromPageDomain
                        ON FromPage.Site_id = FromPagedomain.site_id
                            and
                            FrompageDomain.is_core_site = 1
                    LEFT OUTER JOIN
                RT_PageUrlMap ToPage
                        ON 
                            R.To_chronic_id = ToPage.content_chronic_id
                                AND
                            R.To_Site_Id = ToPage.site_id
            WHERE
                FromPage.Status <> 'd'
                    AND
                R.Status <> 'd'
            `
    },

    getRedirectedFromUrlForDeletedPage: function(count)
    {
        var sql =
            `
            SELECT TOP ` + count +  `
                'http://' + R.From_Prefix + '.' + FromDomain.domain + R.From_Url as 'Url'
            FROM  
                Manual_Redirect R
                    INNER JOIN
                RT_PageUrlMap FromPage
                        on 
                            FromPage.redirect_id = R.id
                    INNER JOIN
                webmd_Domains FromDomain
                        ON R.From_Site_Id = FromDomain.site_id
            WHERE
                FromPage.Status = 'd'
                    and
                R.Status <> 'd'
            `
    },

    getRedirectedFromUrlForNonExistantPage: function(count)
    {
        var sql =
            `
            SELECT TOP ` + count + `
                'http://' + R.From_Prefix + '.' + FromDomain.domain + R.From_Url as 'Url'
            FROM  
                Manual_Redirect R
                    INNER JOIN
                webmd_Domains FromDomain
                        ON R.From_Site_Id = FromDomain.site_id
                            and
                        FromDomain.is_core_site = 1
                    LEFT OUTER JOIN
                RT_PageUrlMap FromPage
                        on 
                            FromPage.redirect_id = R.id
            WHERE
                FromPage.pagemap_id is null 
                    and
                R.Status <> 'd'
            `
    },
};
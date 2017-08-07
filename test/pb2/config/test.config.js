var user = require('./users');

module.exports.config = {
    testEnv: {
        dev01: 'dev01',
        dev03: 'dev03',
        qa02: 'qa02',
        qa00: 'qa00',
        qa01: 'qa01'
    },
    appAccess: {
        users: {
            default: {
                username: user.users.superuser1.username,
                password: user.users.superuser1.password
            }
        }
    },
    site: {
        webmd:
        {
            desktop: "WebMD Desktop",
            mobile: "WebMD Mobile"
        },
        boots:
        {
            desktop: "Boots Desktop",
            mobile: "Boots Mobile"
        }
    },
     siteStructureLevel: function (site) {
        let sslevel;
        switch (site) {
            case 'WebMD Desktop': sslevel =  'Level 0/zzTest/QA and Dev'; break;
            case 'WebMD Mobile': sslevel =  'zTest/QA and Dev'; break;
            case 'Boots Desktop': sslevel =  'Level 0/zTest/QA and Dev'; break;
            case 'Boots Mobile': sslevel =  'Level 0/zTest/Dev Test'; break;
        }
        return sslevel;
    }
}
